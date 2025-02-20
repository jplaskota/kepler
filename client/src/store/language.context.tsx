import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import {
  createContext,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from "react";
import { initReactI18next, useTranslation } from "react-i18next";
import enTranslations from "../locales/en.json";
import plTranslations from "../locales/pl.json";

i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslations },
      pl: { translation: plTranslations },
    },
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
});

interface LanguageProviderProps {
  children: ReactElement | ReactElement[];
}

export default function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem("kepler-language") || "en";
  });

  useEffect(() => {
    i18next.changeLanguage(language);
    localStorage.setItem("kepler-language", language);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLanguage() {
  const context = useContext(LanguageContext);
  const { t } = useTranslation();

  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }

  return { ...context, t };
}
