import { ReactNode, createContext, useContext, useState } from 'react';

type Language = 'de' | 'en';

interface LanguageContextType {
  language: Language;
  texts: typeof texts['de'];
  setLanguage: (lang: Language) => void;
}

const texts = {
  de: {
    greeting: 'Hallo',
    selectColor: 'Wähle eine Farbe',
    green: 'Grün',
    red: 'Rot',
    clickCell: 'Klicke auf eine Zelle',
    occupied: 'ist besetzt. Wähle eine andere.',
    resetColors: 'Farben zurücksetzen',
    row: 'Zeile',
    column: 'Spalte',
    lan1: 'Deutsch',
    lan2: 'Englisch',
    cellOccupied: (cellKey: string) => `Zelle ${cellKey} (besetzt)`,
  },
  en: {
    greeting: 'Hello',
    selectColor: 'Select a color',
    green: 'Green',
    red: 'Red',
    clickCell: 'Click on a cell',
    occupied: 'is occupied. Choose another.',
    resetColors: 'Reset colors',
    row: 'Row',
    column: 'Column',
    lan1: 'German',
    lan2: 'English',
    cellOccupied: (cellKey: string) => `Cell ${cellKey} (occupied)`,
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('de');
  const value = { language, texts: texts[language], setLanguage };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};