import CalculateId from '@/app/admin/components/adminManager/CalculateId'
import LoadingSpinner from '@/components/LoadingSpinner'
import { useHttpClient } from '@/utils/hooks/http-hook';
import React from 'react'

const Page = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  return (
    <div className="container flex flex-col justify-center py-8 gap-16">
      {isLoading && <LoadingSpinner />}
      <CalculateId />
    </div>
  )
}

export default Page