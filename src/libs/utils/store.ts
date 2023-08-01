
const storage = (bool?: Boolean): Storage => {
  return bool ? window.sessionStorage : window.localStorage
}

export const setStore = (key: string, value: any, bool?: boolean) => {
  storage(bool).setItem(key, JSON.stringify(value))
}

export const getStore = (key: string, bool?: boolean): any => {
  const value = storage(bool).getItem(key)
  return value ? JSON.parse(value) : undefined
}

export const clearStore = (bool?: boolean) => {
  storage(bool).clear()
}