import React, { useState, useEffect } from 'react'
import loading from './loading.json'
import { FlexCenter } from '../../styles/sharedStyles'

export default function Loading({ loop = true, autoplay = true }) {
  const [isClient, setIsClient] = useState(false)
  
  useEffect(() => {
    setIsClient(true)
  }, [])

  const defaultOptions = {
    loop,
    autoplay,
    animationData: loading,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  }

  if (!isClient) {
    return (
      <FlexCenter>
        <div style={{ height: '200px', width: '200px' }}>Loading...</div>
      </FlexCenter>
    )
  }

  const Lottie = require('react-lottie')
  return (
    <FlexCenter>
      <Lottie options={defaultOptions} height={200} width={200} />
    </FlexCenter>
  )
}
