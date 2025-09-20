import React, { memo, useEffect, useState } from 'react'
import useTableProps from '../../contexts/TableContext'
import useUserInfo from '../../contexts/UserInfoContext'
import { IInput } from '../../interfaces/input.interface'
import { ITableHeader } from '../../interfaces/table.interface'
import { IUser } from '../../interfaces/user.interface'
import { InputDate, InputImage, InputText } from './components/inputs'
import {
  Table,
  Tbody,
  Th,
  Thead,
} from './components/inputs/styles/table-elements.styles'
import RegistrationsButton from './components/registrations/RegistrationsButton'
import RegistrationsModal from './components/registrations/RegistrationsModal'
import Updater from './components/updater/Updater'
import { getNestedValue } from './helpers/helper-functions'

type TablePropTypes = {
  headers: ITableHeader[]
  data: IUser[]
}

function TableComponent({ headers, data }: TablePropTypes) {
  const { setUserInfo } = useUserInfo()
  const { filteredData } = useTableProps()
  const [currentData, setCurrentData] = useState<IUser[]>(data)
  const [isRegistrationsModalOpen, setIsRegistrationsModalOpen] =
    useState(false)

  useEffect(() => {
    if (filteredData !== undefined) {
      setCurrentData([...filteredData])
    }
  }, [filteredData])

  useEffect(() => {
    setCurrentData([...data])
  }, [data])

  const getRow = (obj: any) => {
    const inputs: JSX.Element[] = []
    for (let i = 0; i < headers.length; i++) {
      let inputProps: IInput = {
        customVal: getNestedValue(obj, headers[i].accessor) ?? '',
        cellId: headers[i].accessor ?? '',
      }
      let currentInput = getInputComponent({
        inputProps: inputProps,
        type: headers[i].type,
      })
      if (currentInput !== null) inputs.push(currentInput)
    }
    return inputs
  }

  return (
    <>
      <Table>
        <Thead>
          <tr>
          {headers.map(header => (
            <Th key={header.Header}>{header.Header}</Th>
          ))}
          </tr>
        </Thead>
        <Tbody>
          {currentData?.map(obj => (
            <tr onClick={() => setUserInfo!(obj)} key={obj.uid}>
              {getRow(obj).map((input, idx) => {
                let cloned = React.cloneElement(input, {
                  key: idx,
                })
                return cloned
              })}
              <RegistrationsButton
                size="md"
                value="Check Submission"
                onClick={() => setIsRegistrationsModalOpen(prev => !prev)}
              />
              <Updater />
            </tr>
          ))}
        </Tbody>
        {isRegistrationsModalOpen && (
          <RegistrationsModal setState={setIsRegistrationsModalOpen} />
        )}
      </Table>
    </>
  )
}

export default memo(TableComponent)

export function getInputComponent({
  inputProps: { customVal, cellId },
  type,
}: {
  inputProps: IInput
  type: string
}): JSX.Element | null {
  switch (type) {
    case 'string':
      return <InputText customVal={customVal} cellId={cellId} />
    case 'date':
      return <InputDate customVal={customVal} cellId={cellId} />
    case 'image':
      return <InputImage customVal={customVal} cellId={cellId} />
    default:
      return null
  }
}
