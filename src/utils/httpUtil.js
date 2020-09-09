import { AGENT_CODE, local } from './storage'

// login
export const loginPath = (username, password) =>
  `/common/login?username=${username}&password=${password}&agentCode=${local.getItem(
    AGENT_CODE
  )}`
