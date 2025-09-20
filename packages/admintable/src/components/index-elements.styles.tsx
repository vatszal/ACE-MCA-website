import styled, { css } from 'styled-components'

export const Wrapper = styled.div`
  gap: 1rem;
  display: flex;
  padding: 1rem;
  min-width: 100vw;
  min-height: 100vh;
  width: max-content;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
  background-color: ${props => props.theme.bg};
`

export const LoginWrapper = styled.div`
  gap: 1rem;
  width: 25rem;
  height: 15rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-evenly;
  padding: 1rem 0.5rem;
  border: 1px solid ${props => props.theme.font + '75'};

  @media (max-width: 768px) {
    width: 80vw;
  }
`

export const LoginImage = styled.img`
  width: 25%;
  height: 25%;
`

export const LoginHeading = styled.h1`
  font-size: 1.4rem;
  font-weight: 300;
  text-transform: capitalize;
`

export const ButtonComponent = styled.button<{
  md?: boolean
  sm?: boolean
  lg?: boolean
}>`
  text-align: center;
  text-decoration: none;
  line-height: 80px;
  position: relative;
  display: block;
  overflow: hidden;
  width: 100%;
  height: 80px;
  max-width: 250px;
  border: 1px solid ${props => props.theme.font + '75'};
  color: ${props => props.theme.font};
  background: ${props => props.theme.font + 25};
  cursor: pointer;
  font-size: 0.9rem;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    color: ${props => props.theme.font};
    background-color: ${props => props.theme.font + '25'};
    transform: translateX(-100%);
    transition: 0.375s all ease-in-out;
  }

  &:hover:before {
    transform: translateX(0);
  }

  ${({ sm }) =>
    sm &&
    css`
      width: 100%;
      height: 50px;
      max-width: 150px;
      line-height: 50px;
    `}

  ${({ md }) =>
    md &&
    css`
      width: 100%;
      height: 60px;
      max-width: 180px;
      line-height: 60px;
    `}

    ${({ lg }) =>
    lg &&
    css`
      width: 100%;
      height: 90px;
      max-width: 250px;
      line-height: 90px;
    `}
`
