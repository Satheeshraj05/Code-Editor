import { useState } from 'react';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import Editor from './components/Editor/Editor';
import { useCodeEditor } from './components/hooks/useCodeEditor';

export default function App() {
    const [theme, setTheme] = useState<'light' | 'dark'>('light');
    const {
        code,
        language,
        setLanguage,
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
    } = useCodeEditor();

    return (
        <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
            <Header
                language={language}
                setLanguage={setLanguage}
                saveCode={saveCode}
                resetCode={resetCode}
                theme={theme}
                setTheme={setTheme}
            />
            <div className="flex">
                <Sidebar
                    files={files}
                    currentFile={currentFile}
                    createFile={createFile}
                    deleteFile={deleteFile}
                    openFile={openFile}
                    selectFile={selectFile}
                    theme={theme}  // Pass theme to Sidebar
                />
                <Editor
                    code={code}
                    setCode={setCode}
                    language={language}
                    theme={theme}
                    formatCode={formatCurrentCode}
                />
            </div>
        </div>
    );
}