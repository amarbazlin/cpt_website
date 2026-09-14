-- ============================================================
-- CPT WEBSITE — ROW LEVEL SECURITY & HELPERS
-- Run this in the Supabase SQL editor AFTER the base schema.
-- Safe to re-run (idempotent).
-- ============================================================

-- 1. Enable RLS on every table --------------------------------------------

ALTER TABLE customers              ENABLE ROW LEVEL SECURITY;
ALTER TABLE customer_addresses     ENABLE ROW LEVEL SECURITY;
ALTER TABLE products               ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders                 ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items            ENABLE ROW LEVEL SECURITY;
ALTER TABLE whatsapp_leads         ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_contacts         ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users            ENABLE ROW LEVEL SECURITY;

-- 2. Admin helper -----------------------------------------------------------
-- TRUE for a logged-in (authenticated) user whose email is an active admin.

CREATE OR REPLACE FUNCTION public.is_cpt_admin()
RETURNS BOOLEAN
LANGUAGE SQL
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM admin_users a
    WHERE a.email = (SELECT email FROM auth.users WHERE id = auth.uid())
      AND a.is_active
  );
$$;

-- 3. Anonymous (public website) access ---------------------------------------
-- The website may only INSERT new rows. It cannot read customers, orders,
-- addresses, saved contacts or leads. Prices/totals are computed by the app
-- from its bundled catalogue, never accepted from the browser.

DROP POLICY IF EXISTS "public insert customers"          ON customers;
DROP POLICY IF EXISTS "public insert addresses"          ON customer_addresses;
DROP POLICY IF EXISTS "public insert orders"             ON orders;
DROP POLICY IF EXISTS "public insert order_items"        ON order_items;
DROP POLICY IF EXISTS "public insert leads"              ON whatsapp_leads;
DROP POLICY IF EXISTS "public insert saved_contacts"     ON saved_contacts;

CREATE POLICY "public insert customers"
  ON customers FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "public insert addresses"
  ON customer_addresses FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "public insert orders"
  ON orders FOR INSERT TO anon WITH CHECK (payment_method = 'Cash on Delivery');

CREATE POLICY "public insert order_items"
  ON order_items FOR INSERT TO anon WITH CHECK (quantity > 0);

CREATE POLICY "public insert leads"
  ON whatsapp_leads FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "public insert saved_contacts"
  ON saved_contacts FOR INSERT TO anon WITH CHECK (true);

-- 4. SECURITY DEFINER helpers (so the anon checkout can find an existing
--    customer / de-duplicate saved contacts WITHOUT blanket read access) ----

CREATE OR REPLACE FUNCTION public.find_or_create_customer(
  p_contact_no TEXT,
  p_first_name TEXT,
  p_last_name  TEXT,
  p_email      TEXT DEFAULT NULL
)
RETURNS customers
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_customer customers;
BEGIN
  IF p_contact_no IS NULL OR length(btrim(p_contact_no)) < 7 THEN
    RAISE EXCEPTION 'invalid contact number';
  END IF;

  SELECT * INTO v_customer FROM customers WHERE contact_no = p_contact_no LIMIT 1;

  IF NOT FOUND THEN
    INSERT INTO customers (contact_no, first_name, last_name, email)
    VALUES (p_contact_no, btrim(p_first_name), btrim(p_last_name), p_email)
    RETURNING * INTO v_customer;
  ELSE
    UPDATE customers
       SET first_name = COALESCE(NULLIF(btrim(p_first_name), ''), first_name),
           last_name  = COALESCE(NULLIF(btrim(p_last_name), ''), last_name),
           email      = COALESCE(p_email, email)
     WHERE id = v_customer.id
    RETURNING * INTO v_customer;
  END IF;

  RETURN v_customer;
END;
$$;

CREATE OR REPLACE FUNCTION public.save_saved_contact(p_row JSON)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF p_row->>'contact_no' IS NULL THEN
    RAISE EXCEPTION 'invalid contact number';
  END IF;

  UPDATE saved_contacts
     SET first_name = COALESCE(p_row->>'first_name', first_name),
         last_name  = COALESCE(p_row->>'last_name', last_name),
         email      = COALESCE(p_row->>'email', email),
         city       = COALESCE(p_row->>'city', city)
   WHERE contact_no = p_row->>'contact_no';

  IF NOT FOUND THEN
    INSERT INTO saved_contacts (first_name, last_name, contact_no, email, city, source)
    VALUES (
      p_row->>'first_name',
      p_row->>'last_name',
      p_row->>'contact_no',
      p_row->>'email',
      p_row->>'city',
      COALESCE(p_row->>'source', 'Website')
    );
  END IF;
END;
$$;

GRANT EXECUTE ON FUNCTION public.find_or_create_customer(TEXT, TEXT, TEXT, TEXT) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.save_saved_contact(JSON) TO anon, authenticated;



-- 5. Admin (authenticated) full access ---------------------------------------
-- Admins log in via Supabase Auth (/admin/login); their email must exist and
-- be active in admin_users. RLS then grants full CRUD on business tables.

DROP POLICY IF EXISTS "admins manage customers"         ON customers;
DROP POLICY IF EXISTS "admins manage addresses"         ON customer_addresses;
DROP POLICY IF EXISTS "admins manage products"          ON products;
DROP POLICY IF EXISTS "admins manage orders"            ON orders;
DROP POLICY IF EXISTS "admins manage order_items"       ON order_items;
DROP POLICY IF EXISTS "admins manage leads"             ON whatsapp_leads;
DROP POLICY IF EXISTS "admins manage saved_contacts"    ON saved_contacts;
DROP POLICY IF EXISTS "admins manage admin_users"       ON admin_users;

CREATE POLICY "admins manage customers"
  ON customers FOR ALL TO authenticated
  USING (public.is_cpt_admin()) WITH CHECK (public.is_cpt_admin());

CREATE POLICY "admins manage addresses"
  ON customer_addresses FOR ALL TO authenticated
  USING (public.is_cpt_admin()) WITH CHECK (public.is_cpt_admin());

CREATE POLICY "admins manage products"
  ON products FOR ALL TO authenticated
  USING (public.is_cpt_admin()) WITH CHECK (public.is_cpt_admin());

CREATE POLICY "admins manage orders"
  ON orders FOR ALL TO authenticated
  USING (public.is_cpt_admin()) WITH CHECK (public.is_cpt_admin());

CREATE POLICY "admins manage order_items"
  ON order_items FOR ALL TO authenticated
  USING (public.is_cpt_admin()) WITH CHECK (public.is_cpt_admin());

CREATE POLICY "admins manage leads"
  ON whatsapp_leads FOR ALL TO authenticated
  USING (public.is_cpt_admin()) WITH CHECK (public.is_cpt_admin());

CREATE POLICY "admins manage saved_contacts"
  ON saved_contacts FOR ALL TO authenticated
  USING (public.is_cpt_admin()) WITH CHECK (public.is_cpt_admin());

CREATE POLICY "admins manage admin_users"
  ON admin_users FOR ALL TO authenticated
  USING (public.is_cpt_admin()) WITH CHECK (public.is_cpt_admin());

-- 6. Public catalogue read (optional) ----------------------------------------
-- The public website currently uses its own bundled catalogue. If you later
-- want it to read live products from the DB, uncomment:
--
-- CREATE POLICY "public read active products"
--   ON products FOR SELECT TO anon
--   USING (is_active = true);
