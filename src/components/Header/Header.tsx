import LanguageSelector from './LanguageSelector';
import { Language } from '../types';

interface HeaderProps {
    language: Language;
    setLanguage: (lang: Language) => void;
    saveCode: () => void;
    resetCode: () => void;
    theme: 'light' | 'dark';
    setTheme: (theme: 'light' | 'dark') => void;
}

export default function Header({ language, setLanguage, saveCode, resetCode, theme, setTheme }: HeaderProps) {
    return (
        <header className={`p-4 flex justify-between items-center ${theme === 'light' ? 'bg-gray-200 text-black' : 'bg-gray-800 text-white'}`}>
            <LanguageSelector language={language} setLanguage={setLanguage} />
            <div>
                <button
                    onClick={saveCode}
                    className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                >
                    Save
                </button>
                <button
                    onClick={resetCode}
                    className="bg-red-500 text-white px-4 py-2 rounded mr-2"
                >
                    Reset
                </button>
                <button
                    onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                    className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                    Toggle Theme
                </button>
            </div>
        </header>
    );
}
