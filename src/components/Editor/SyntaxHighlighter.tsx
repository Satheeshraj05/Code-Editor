import { useEffect, useRef } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css'; // Default light theme
import 'prismjs/themes/prism-okaidia.css'; // Dark theme

interface SyntaxHighlighterProps {
    code: string;
    language: string;
    theme: 'light' | 'dark';  // Use theme to adjust styles
}

export default function SyntaxHighlighter({ code, language, theme }: SyntaxHighlighterProps) {
    const codeRef = useRef<HTMLPreElement>(null);

    useEffect(() => {
        if (codeRef.current) {
            Prism.highlightElement(codeRef.current);
        }
    }, [code, language]);

    return (
        <pre
            className={`language-${language} ${
                theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'
            }`}
        >
            <code ref={codeRef} className={`language-${language}`}>
                {code}
            </code>
        </pre>
    );
}
