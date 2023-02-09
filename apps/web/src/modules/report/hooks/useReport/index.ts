import { zodResolver } from '@hookform/resolvers/zod'
import { FormEventHandler } from 'react'
import { useForm } from 'react-hook-form'

import { IReportSchemaType, ReportSchema } from './schema'

const useReport = () => {
  const { control, handleSubmit } = useForm<IReportSchemaType>({
    criteriaMode: 'all',
    resolver: zodResolver(ReportSchema),
    defaultValues: {
      description: '',
    },
  })

  const handleSuccess = () => {
    console.log('success')
  }
  const handleClickSubmit: FormEventHandler<HTMLFormElement> =
    handleSubmit(handleSuccess)
  return { control, handleClickSubmit }
}

export default useReport
