import { memo, useEffect, useRef, useState } from 'react'
import Button from 'remote/Button'
import useOutsideTouch from 'remote/useOutsideTouch'
import styled from 'styled-components'
import useTableProps from '../../../../../contexts/TableContext'
import { IUser } from '../../../../../interfaces/user.interface'
import {
  filterEquals,
  filterIncludes,
  filterNotEquals,
  filterNotIncludes,
} from '../../../helpers/helper-functions'
import FilterMenu from './FilterMenu'

export type FilterType = {
  property: string
  conditional: string
  value: string
}

const FilterWrapper = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  gap: 1rem;
  border: 1px solid ${prop => prop.theme.font};
  user-select: none;
  cursor: pointer;
  width: max-content;
  transition: 0.375s all ease-in-out;

  &:hover {
    border: 1px solid ${prop => prop.theme.active};
  }
`

function Filter({
  filter: { property, conditional, value },
  setFilters,
}: {
  filter: FilterType
  setFilters: React.Dispatch<React.SetStateAction<FilterType[]>>
}) {
  let temp = property.split('.').at(-1)
  const handleFilterDelete = () => {
    setFilters(curr =>
      curr.filter(
        f =>
          JSON.stringify(f) !== JSON.stringify({ property, conditional, value })
      )
    )
  }
  return (
    <FilterWrapper onClick={handleFilterDelete}>
      {temp} {conditional} {value}
    </FilterWrapper>
  )
}

function FilterContainer() {
  const [show, setShow] = useState<boolean>(false)
  const [filters, setFilters] = useState<FilterType[]>([])
  const [isFiltered, setIsFiltered] = useState<boolean>(false)
  const { tableData, setFilteredData } = useTableProps()
  const filterMenuRef = useRef()
  useOutsideTouch(filterMenuRef, setShow)

  const handleFilter = () => {
    let fd: IUser[] = tableData !== undefined ? [...tableData] : []

    const getFilterHelper = (filter: FilterType) => {
      switch (filter.conditional) {
        case 'equals':
          return filterEquals({
            data: fd,
            property: filter.property,
            token: filter.value,
          })
        case 'notequals':
          return filterNotEquals({
            data: fd,
            property: filter.property,
            token: filter.value,
          })
        case 'includes':
          return filterIncludes({
            data: fd,
            property: filter.property,
            token: filter.value,
          })
        case 'notincludes':
          return filterNotIncludes({
            data: fd,
            property: filter.property,
            token: filter.value,
          })
        default:
          return []
      }
    }
    for (let i = 0; i < filters.length; i++) {
      fd = getFilterHelper(filters[i])
    }
    if (fd !== undefined) setFilteredData!(fd)
  }

  const handleFilterStatus = () => {
    if (filters === undefined || filters.length === 0) setIsFiltered(true)
    else setIsFiltered(false)
  }

  const filtersDeps = JSON.stringify(filters)
  useEffect(() => {
    handleFilterStatus()
    handleFilter()
    // eslint-disable-next-line
  }, [filtersDeps])

  const handleShowState = () => {
    setShow(curr => !curr)
  }

  return (
    <>
      <Button
        onClick={handleShowState}
        md
        value={!isFiltered ? 'Filtered' : 'Filter'}
      />
      {filters.map((f, idx) => (
        <Filter key={idx} filter={f} setFilters={setFilters} />
      ))}
      {show ? (
        <FilterMenu
          filters={filters}
          setFilters={setFilters}
          filterRef={filterMenuRef}
        />
      ) : null}
    </>
  )
}

export default memo(FilterContainer)
