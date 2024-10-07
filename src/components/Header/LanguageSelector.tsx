import { Language } from "../types"

interface LanguageSelectorProps {
    language: Language
    setLanguage: (lang: Language) => void
}

const languages: Language[] = [
    { code: 'js', name: 'JavaScript' },
    { code: 'ts', name: 'TypeScript' },
]

export default function LanguageSelector({ language, setLanguage }: LanguageSelectorProps) {
    return (
        <select
            value={language.code}
            onChange={(e) => setLanguage(languages.find(lang => lang.code === e.target.value) || languages[0])}
            className="bg-gray-100 border border-gray-300 rounded px-2 py-1"
        >
            {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                    {lang.name}
                </option>
            ))}
        </select>
    )
}