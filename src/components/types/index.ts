export interface Language {
    code: string
    name: string
}

export interface File {
    id: number
    name: string
    langCode: string
    code: string
    lines: number
    size: string
}