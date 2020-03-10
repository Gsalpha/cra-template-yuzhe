export const hasToken = (): boolean => !!localStorage.getItem('token')
export const getToken = (): string | null => localStorage.getItem('token')
