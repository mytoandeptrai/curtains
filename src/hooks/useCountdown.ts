import { getCountdownToTime } from '@/utils/common'
import { useEffect, useState } from 'react'

interface Props {
  endTime: string | undefined
  format?: 'HH:mm' | 'HH:mm:ss'
}

export const useCountdown = ({ endTime, format = 'HH:mm' }: Props) => {
  const [countdown, setCountdown] = useState(getCountdownToTime(endTime, format))

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(getCountdownToTime(endTime, format))
    }, 1000)

    return () => clearInterval(interval)
  }, [endTime, format])

  return countdown
}
