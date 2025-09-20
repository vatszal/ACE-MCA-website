import React, { useEffect, useState, useRef } from 'react'
import { FlexCenter } from '../../../styles/sharedStyles'
import styled from 'styled-components'

export default function MembersSort ({ startingYear, setYear }) {
  const [optionYears, setOptionYears] = useState()
  const optionRef = useRef()

  const handleOptionChange = () => {
    setYear(optionRef.current.value)
  }

  useEffect(() => {
    let latestYear = new Date().getFullYear()
    const yearArr = []
    while (startingYear <= latestYear) {
      yearArr.push(latestYear--)
    }
    setOptionYears(yearArr)
  }, [startingYear])

  return (
    <>
      <SortWrapper>
        <SortText>Filter by Year </SortText>
        <SortSelect ref={optionRef} onChange={handleOptionChange}>
          {optionYears?.map((e, key) => {
            return (
              <SortOption value={e} key={key}>
                {e}
              </SortOption>
            )
          })}
        </SortSelect>
      </SortWrapper>
    </>
  )
}

const SortWrapper = styled(FlexCenter)`
  width: 100%;
  justify-content: flex-end;
  padding: 0 calc(5vw + 0.5rem);
  gap: 0;

  @media (max-width: 768px) {
    flex-direction: row;
    justify-content: center;
  }
`
const SortText = styled.p`
  font-size: 1rem;
  letter-spacing: 0.5px;
  border: 1px solid ${props => props.theme.font + '75'};
  border-right: none;
  padding: 0.05rem 0 0.05rem 0.5rem;
`
const SortSelect = styled.select`
  width: 7rem;
  text-align: center;
  font-size: 1rem;
  border: 1px solid ${props => props.theme.font + '75'};
  background: ${props => props.theme.bg};
  border-left: none;
  color: ${props => props.theme.font};

  &:hover,
  &:focus {
    outline: none;
  }
`
const SortOption = styled.option``
