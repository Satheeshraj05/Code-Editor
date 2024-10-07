import { useEffect, useRef } from 'react'
import Prism from 'prismjs'
import 'prismjs/themes/prism.css'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-typescript'

interface SyntaxHighlighterProps {
    code: string
    language: string
    theme: 'light' | 'dark'
}

export default function SyntaxHighlighter({ code, language, theme }: SyntaxHighlighterProps) {
    const codeRef = useRef<HTMLPreElement>(null)

    useEffect(() => {
        if (codeRef.current) {
            Prism.highlightElement(codeRef.current)
        }
    }, [code, language])

    return (
        <pre className={`language-${language} ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
            <code ref={codeRef} className={`language-${language}`}>
                {code}
            </code>
        </pre>
    )
}