import { useSelector } from 'react-redux'

const lastAgentLevelId = 3

const useUser = () => {
  const { user } = useSelector((state) => state.app)
  const { agentInfo } = user || {}
  const isLastAgentLevel = agentInfo?.currLevelId === lastAgentLevelId

  return { isLastAgentLevel }
}

export default useUser
