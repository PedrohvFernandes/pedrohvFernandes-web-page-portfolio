import React, { useCallback } from 'react'

import { InputMask } from '@components/index'

import { ConfigValues } from '@config/index'

import { formatText } from '@utils/formatters'
import { toastify } from '@utils/notifiers'

import { IProps } from './typing'

type IPropsValidateCep = {
  ceps: string
  cidade: string
}

const FormPersonalData: React.FC<IProps> = () => {
  const validateZipCodeAvailable = (
    // Não precisa dar replace no cep, pois o cep já vem sem máscara(-) e em number
    cepNumberUser: number,
    authorizedCep: IPropsValidateCep[]
  ) => {
    let cepFound = false

    console.log('CepUser: ', cepNumberUser)
    for (const city of authorizedCep) {
      const ceps = city.ceps.split(' ')
      // const cepsItervalEnd = Number(ceps[0].replace('-', ''));
      const cepsIntervalStart = Number(formatText.removeAllNonDigits(ceps[0]))
      // const cepsItervalEnd = Number(ceps[1].replace('-', ''));
      const cepsIntervalEnd = Number(formatText.removeAllNonDigits(ceps[1]))
      if (
        cepNumberUser >= cepsIntervalStart &&
        cepNumberUser <= cepsIntervalEnd
      ) {
        cepFound = true
        break
      }
    }
    if (!cepFound) {
      throw new Error(
        toastify(
          `Ops! Não estamos comercializando planos para essa região`,
          'error'
        )
      )
    }
  }

  const handleGetAddressByZipcode = useCallback(async (cepText: string) => {
    try {
      validateZipCodeAvailable(
        Number(cepText),
        ConfigValues.rebox.zipCodeRegionAuthorized
      )
    } catch (error) {
      toastify(
        'Ops! Não estamos comercializando planos para essa região.',
        'error'
      )
    }
  }, [])
  return (
    <Container>
      <InputMask
        name="zip_code"
        placeholder="Informe o CEP"
        mask="99999-999"
        // required
        tabIndex={6}
        onChange={event => {
          const cep = event.target.value
          handleGetAddressByZipcode(formatText.removeAllNonDigits(cep))
        }}
      />
    </Container>
  )
}

export default FormPersonalData
