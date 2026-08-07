import { createContext, useContext } from "react";

export const LanguageContext = createContext(null);

export function useTranslation() {
  return useContext(LanguageContext);
}
