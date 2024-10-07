import { File } from "../types"

interface FileTreeProps {
    files: File[]
    currentFile: File | null
    onSelectFile: (id: number) => void
    onDeleteFile: (id: number) => void
}

export default function FileTree({ files, currentFile, onSelectFile, onDeleteFile }: FileTreeProps) {
    return (
        <ul className="space-y-2">
            {files.map((file) => (
                <li
                    key={file.id}
                    className={`flex justify-between items-center p-2 rounded cursor-pointer ${currentFile && currentFile.id === file.id ? 'bg-blue-100' : 'hover:bg-gray-200'
                        }`}
                    onClick={() => onSelectFile(file.id)}
                >
                    <span>{file.name}</span>
                    <button
                        onClick={(e) => {
                            e.stopPropagation()
                            onDeleteFile(file.id)
                        }}
                        className="text-red-500 hover:text-red-700"
                    >
                        Delete
                    </button>
                </li>
            ))}
        </ul>
    )
}