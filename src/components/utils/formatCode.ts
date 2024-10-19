import prettier from 'prettier/standalone';
import parserBabel from 'prettier/parser-babel';
import parserTypeScript from 'prettier/parser-typescript';

export async function formatCode(code: string, language: string): Promise<string> {
    try {
        const formattedCode = prettier.format(code, {
            parser: language === 'ts' ? 'typescript' : 'babel',
            plugins: [parserBabel, parserTypeScript],
        });
        return Promise.resolve(formattedCode);
    } catch (error) {
        console.error('Error formatting code:', error);
        return Promise.resolve(code);  
    }
}
