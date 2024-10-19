import { useState } from 'react'
import FileTree from './FileTree'
import { File } from '../types'

interface SidebarProps {
    files: File[]
    currentFile: File | null
    createFile: (name: string) => void
    deleteFile: (id: number) => void
    openFile: (id: number) => void
    selectFile: (id: number) => void
    theme: 'light' | 'dark'  // Add theme prop
}

export default function Sidebar({ files, currentFile, createFile, deleteFile, openFile, theme }: SidebarProps) {
    const [newFileName, setNewFileName] = useState('')

    const handleCreateFile = () => {
        if (newFileName) {
            createFile(newFileName)
            setNewFileName('')
        }
    }

    return (
        <div className={`w-64 p-4 ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-black'}`}>
            <h2 className="text-lg font-semibold mb-4">Files</h2>
            
            <div className="mb-4">
                <input
                    type="text"
                    value={newFileName}
                    onChange={(e) => setNewFileName(e.target.value)}
                    placeholder="New file name"
                    className={`w-full px-2 py-1 border rounded ${
                        theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-black'
                    }`}
                />
                <button
                    onClick={handleCreateFile}
                    className="mt-2 w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Create File
                </button>
            </div>
            
            <FileTree
                files={files}
                currentFile={currentFile}
                onSelectFile={openFile}
                onDeleteFile={deleteFile}
                theme={theme}  // Pass theme to FileTree
            />
        </div>
    )
}