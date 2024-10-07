import { useState, useEffect, useCallback } from 'react'
import { useLocalStorage } from './useLocalStorage'
import { Language, File } from '../types'
import { formatCode } from '../utils/formatCode'

const initialLanguages: Language[] = [
    { code: 'js', name: 'JavaScript' },
    { code: 'ts', name: 'TypeScript' },
]

export function useCodeEditor() {
    const [language, setLanguage] = useState<Language>(initialLanguages[0])
    const [code, setCode] = useState('')
    const [files, setFiles] = useState<File[]>([])
    const [currentFile, setCurrentFile] = useState<File | null>(null)
    const { getItem, setItem } = useLocalStorage()

    useEffect(() => {
        const savedFiles = getItem('files')
        if (savedFiles) {
            setFiles(JSON.parse(savedFiles))
        }
    }, [])

    useEffect(() => {
        if (currentFile) {
            setCode(atob(currentFile.code))
            setLanguage(initialLanguages.find(lang => lang.code === currentFile.langCode) || initialLanguages[0])
        }
    }, [currentFile])

    const saveCode = useCallback(() => {
        if (currentFile) {
            const updatedFiles = files.map(file =>
                file.id === currentFile.id
                    ? {
                        ...file,
                        code: btoa(code),
                        lines: code.split('\n').length,
                        size: new Blob([code]).size + ' bytes',
                    }
                    : file
            )
            setFiles(updatedFiles)
            setItem('files', JSON.stringify(updatedFiles))
            alert('Code saved successfully!')
        } else {
            alert('Please create or select a file before saving.')
        }
    }, [currentFile, files, code, setItem])

    const openFile = (id: number) => {
        const fileToOpen = files.find(file => file.id === id)
        if (fileToOpen) {
            setCurrentFile(fileToOpen)
            setCode(atob(fileToOpen.code))
            setLanguage(initialLanguages.find(lang => lang.code === fileToOpen.langCode) || initialLanguages[0])
        }
    }

    const resetCode = () => {
        setCode('')
    }

    const createFile = (name: string) => {
        const newFile: File = {
            id: Date.now(),
            name,
            langCode: language.code,
            code: btoa(''),
            lines: 0,
            size: '0 bytes',
        }
        const updatedFiles = [...files, newFile]
        setFiles(updatedFiles)
        setCurrentFile(newFile)
        setItem('files', JSON.stringify(updatedFiles))
    }

    const deleteFile = (id: number) => {
        const updatedFiles = files.filter(file => file.id !== id)
        setFiles(updatedFiles)
        setItem('files', JSON.stringify(updatedFiles))
        if (currentFile && currentFile.id === id) {
            setCurrentFile(updatedFiles[0] || null)
        }
    }

    const selectFile = (id: number) => {
        const file = files.find(f => f.id === id)
        if (file) {
            setCurrentFile(file)
        }
    }

    const formatCurrentCode = async () => {
        try {
            const formattedCode = await formatCode(code, language.code);  // Await the Promise
            setCode(formattedCode);  // Set the formatted code
        } catch (error) {
            console.error('Error formatting code:', error);
        }
    };
    

    return {
        language,
        setLanguage,
        code,
        setCode,
        saveCode,
        resetCode,
        files,
        currentFile,
        createFile,
        deleteFile,
        selectFile,
        formatCurrentCode,
        openFile,
    }
}