export const TOKEN = 'agentToken'
export const AGENT_CODE = 'agentCode'
export const PAGE_RELOADED = 'pageReloaded'

const local = {
  setItem(key, val) {
    let strVal = val
    if (typeof val === 'object') {
      strVal = JSON.stringify(val)
    }
    window.localStorage.setItem(key, strVal)
  },
  getItem(key) {
    const val = window.localStorage.getItem(key)
    try {
      return JSON.parse(val)
    } catch (error) {
      return val
    }
  },
  removeItem(key) {
    window.localStorage.removeItem(key)
  },
  clear() {
    window.localStorage.clear()
  },
}

const session = {
  setItem(key, val) {
    let strVal = val
    if (typeof val === 'object') {
      strVal = JSON.stringify(val)
    }
    window.sessionStorage.setItem(key, strVal)
  },
  getItem(key) {
    const val = window.sessionStorage.getItem(key)
    try {
      return JSON.parse(val)
    } catch (error) {
      return val
    }
  },
  removeItem(key) {
    window.sessionStorage.removeItem(key)
  },
  clear() {
    window.sessionStorage.clear()
  },
}

export { local, session }
