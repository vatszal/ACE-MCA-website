import React, { useState, useEffect } from 'react'
import loading from './loading.json'
import { FlexCenter } from '../../styles/sharedStyles'

export default function Loading({ loop = true, autoplay = true }) {
  const [isClient, setIsClient] = useState(false)
  const [Lottie, setLottie] = useState(null)
  
  useEffect(() => {
    setIsClient(true)
    // Dynamic import instead of require
    import('react-lottie').then((LottieModule) => {
      setLottie(() => LottieModule.default)
    })
  }, [])

  const defaultOptions = {
    loop,
    autoplay,
    animationData: loading,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  }

  if (!isClient || !Lottie) {
    return (
      <FlexCenter>
        <div style={{ height: '200px', width: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          Loading...
        </div>
      </FlexCenter>
    )
  }

  return (
    <FlexCenter>
      <Lottie options={defaultOptions} height={200} width={200} />
    </FlexCenter>
  )
}
