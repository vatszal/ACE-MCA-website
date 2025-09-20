import { SyncOutlined } from '@ant-design/icons'
import React, { useState } from 'react'
import styled, { keyframes } from 'styled-components'
import useUserInfo from '../../../../contexts/UserInfoContext'
import { IUserItem } from '../../../../interfaces/user.interface'
import { setTableUserInfo } from '../../../../utils/firebase'
import { Td } from '../inputs/styles/table-elements.styles'

const Updater: React.FC = () => {
  const [trigger, setTrigger] = useState(false)
  const { userInfo, clearUserInfo } = useUserInfo()

  const updateUserInfo = () => {
    setTrigger(prev => !prev)
    setTableUserInfo(userInfo as IUserItem)
    clearUserInfo!()
  }

  return (
    <UpdateWrapper triggerAnimation={trigger}>
      <div>
        <UpdateIcon onClick={updateUserInfo} />
      </div>
    </UpdateWrapper>
  )
}

export default Updater

const UpdateIconAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(360deg);
  }
`
export const UpdateWrapper = styled(Td)<{ triggerAnimation?: boolean }>`
  width: max-content;

  div {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    animation-duration: 1s;
    animation-name: ${props =>
      props.triggerAnimation ? UpdateIconAnimation : ''};
  }

  @media (max-width: 768px) {
    div {
      height: 4.75rem;
    }
  }
`
export const UpdateIcon = styled(SyncOutlined)`
  cursor: pointer;
  font-size: 1.25rem;
  padding: 0 0.25rem;
  color: ${props => props.theme.font};
`
