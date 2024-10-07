export function useLocalStorage() {
    const setItem = (key: string, value: string) => {
        try {
            localStorage.setItem(key, value)
        } catch (error) {
            console.error('Error saving to localStorage:', error)
        }
    }

    const getItem = (key: string) => {
        try {
            return localStorage.getItem(key)
        } catch (error) {
            console.error('Error getting from localStorage:', error)
            return null
        }
    }

    return { setItem, getItem }
}