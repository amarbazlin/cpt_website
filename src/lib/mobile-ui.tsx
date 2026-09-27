import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

type MobileUiContext = {
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
};

const Ctx = createContext<MobileUiContext | null>(null);

export function MobileUiProvider({ children }: { children: ReactNode }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const value = useMemo(() => ({ searchOpen, setSearchOpen }), [searchOpen]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useMobileUi() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useMobileUi must be used inside MobileUiProvider");
  return ctx;
}

/** Bottom nav + floating actions sit above this inset on small screens. */
export const MOBILE_BOTTOM_INSET = "calc(4rem + env(safe-area-inset-bottom, 0px))";
