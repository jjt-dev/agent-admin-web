import { AGENT_CODE, local } from './storage'

// login
export const loginPath = (username, password) =>
  `/common/login?username=${username}&password=${password}&agentCode=${local.getItem(
    AGENT_CODE
  )}`
export const useAccountPath = `/user/accounts`

export const changePsdPath = (oldPsd, newPsd) =>
  `/user/changePsw?oldPassword=${oldPsd}&newPsw=${newPsd}`

// agent
export const agentUpdOrderPath = (orderId, type) =>
  `/client/account/branchAgent/${type}?orderId=${orderId}`

export const agentAccountPath = (agentId) =>
  `/client/account/branchAgent/accountInfos?agentId=${agentId}`

export const agentInfoPath = (courseId, agentId, useType) =>
  `/client/account/branchAgent/agentInfo?courseId=${courseId}&agentId=${agentId}&useType=${useType}`

// school
export const schoolUpdOrderPath = (orderId, type) =>
  `/client/account/school/${type}?orderId=${orderId}`

export const schoolAccountPath = (schoolId) =>
  `/client/account/school/accountInfos?schoolId=${schoolId}`
