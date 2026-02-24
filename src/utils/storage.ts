const PREFIX = 'h5_'

function getKey(key: string) {
  return `${PREFIX}${key}`
}

const storage = {
  get<T = string>(key: string): T | null {
    const raw = localStorage.getItem(getKey(key))
    if (!raw) return null
    try {
      return JSON.parse(raw) as T
    } catch {
      return raw as unknown as T
    }
  },

  set(key: string, value: unknown): void {
    localStorage.setItem(getKey(key), JSON.stringify(value))
  },

  remove(key: string): void {
    localStorage.removeItem(getKey(key))
  },

  clear(): void {
    const keys = Object.keys(localStorage)
    keys.forEach((k) => {
      if (k.startsWith(PREFIX)) {
        localStorage.removeItem(k)
      }
    })
  },
}

export default storage
