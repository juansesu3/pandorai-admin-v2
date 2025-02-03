// app/your-page/PageContent.tsx
'use client' // Este componente sí debe ser un cliente para usar hooks de React/Redux
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import Approved from '@/app/components/automattion/Approved'
import Editing from '@/app/components/automattion/Editing'
import IncialCreation from '@/app/components/automattion/IncialCreation'
import Loading from '@/app/components/automattion/Loading'
import Posted from '@/app/components/automattion/Posted'

export default function PageContent() {
  const status = useSelector((state: RootState) => state.contentCreation.status)

  return (
    <div className="flex flex-col items-center justify-center h-full">
      {status === 'initial' && <IncialCreation />}
      {status === 'loading' && <Loading />}
      {status === 'editing' && <Editing />}
      {status === 'approved' && <Approved />}
      {status === 'posted' && <Posted />}
    </div>
  )
}
