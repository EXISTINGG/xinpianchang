// 存数据
export const setItem = (key: string, value: any) => {
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(key,value)
}

// 取数据
export const getItem = (key: string) => {
  const data = window.localStorage.getItem(key)
  try {
    return JSON.parse(data || '')
  } catch (e) {
    return data || ''
  }
}

// 删数据
export const removeItem = (key: string) => {
  window.localStorage.removeItem(key)
}