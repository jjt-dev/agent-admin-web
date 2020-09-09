import { useSelector } from 'react-redux'

/**
 * 代理商创建下级代理商。等级必须低于当前代理商
 *
 * 目前三级代理id为1，2，3。数字越大，等级越低
 */
const useAvailableLevels = () => {
  const { agentLevels, user } = useSelector((state) => state.app)

  if (!user) return agentLevels

  const { agentInfo } = user
  return agentLevels.filter((level) => level.id > agentInfo.currLevelId)
}

export default useAvailableLevels
