import { useState, useEffect } from 'react'
const useRWD = () => {
  const [screen, setScreen] = useState('pc')

  const handleRWD = () => {
    if (window.innerWidth > 1500) setScreen('pc')
    else if (window.innerWidth > 1200) setScreen('1500')
    else if (window.innerWidth > 768) setScreen('pad')
    else setScreen('mobile')
  }
  useEffect(() => {
    window.addEventListener('resize', handleRWD)
    return () => {
      window.removeEventListener('resize', handleRWD)
    }
  }, [])

  return screen
}
export default useRWD

//  pc(1920) 1500  tablet(平板1000下)  mobile(手機)
