import { useEffect, useRef } from 'react'
import SyntaxHighlighter from './SyntaxHighlighter'
import { Language } from '../types'

interface EditorProps {
  code: string
  setCode: (code: string) => void
  language: Language
  theme: 'light' | 'dark'
  formatCode: () => void
}

export default function Editor({ code, setCode, language, theme, formatCode }: EditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 's' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault()
        // Trigger save action
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCode(e.target.value)
  }

  return (
    <div className="flex-1 relative">
      <textarea
        ref={textareaRef}
        value={code}
        onChange={handleChange}
        className="w-full h-full p-4 font-mono text-sm resize-none outline-none"
        style={{ position: 'absolute', top: 0, left: 0, zIndex: 1, background: 'transparent', color: 'transparent', caretColor: theme === 'dark' ? 'white' : 'black' }}
      />
      <SyntaxHighlighter code={code} language={language.code} theme={theme} />
      <button
        onClick={formatCode}
        className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded"
      >
        Format
      </button>
    </div>
  )
}