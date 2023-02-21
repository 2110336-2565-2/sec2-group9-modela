import useNavbarSearch from 'common/hooks/useNavbarSearch'
import useSwitch from 'common/hooks/useSwitch'

const useFilter = () => {
  const modal = useSwitch()
  useNavbarSearch(modal.open)

  return { modal }
}

export default useFilter
