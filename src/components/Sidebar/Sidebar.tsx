import { useState } from 'react'
import FileTree from './FileTree'
import { File } from '../types'

interface SidebarProps {
    files: File[]
    currentFile: File | null
    createFile: (name: string) => void
    deleteFile: (id: number) => void
    openFile: (id: number) => void
    selectFile: (id: number) => void  // Add selectFile here
}

export default function Sidebar({ files, currentFile, createFile, deleteFile, openFile }: SidebarProps) {
    const [newFileName, setNewFileName] = useState('')

    const handleCreateFile = () => {
        if (newFileName) {
            createFile(newFileName)
            setNewFileName('')  // Reset the input field after creating the file
        }
    }

    return (
        <div className="w-64 bg-gray-100 p-4">
            <h2 className="text-lg font-semibold mb-4">Files</h2>
            
            {/* Input field for new file creation */}
            <div className="mb-4">
                <input
                    type="text"
                    value={newFileName}
                    onChange={(e) => setNewFileName(e.target.value)}
                    placeholder="New file name"
                    className="w-full px-2 py-1 border rounded"
                />
                <button
                    onClick={handleCreateFile}
                    className="mt-2 w-full bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Create File
                </button>
            </div>
            
            {/* File tree rendering */}
            <FileTree
                files={files}
                currentFile={currentFile}
                onSelectFile={openFile}  // Selecting a file
                onDeleteFile={deleteFile}  // Deleting a file
            />
        </div>
    )
}
