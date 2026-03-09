import { DefaultTemplate } from '@payloadcms/next/templates'
import React from 'react'
import { BulkUploadClient } from './BulkUploadClient'

type Props = {
  initPageResult: {
    locale?: Parameters<typeof DefaultTemplate>[0]['locale']
    permissions?: Parameters<typeof DefaultTemplate>[0]['permissions']
    req: {
      i18n: Parameters<typeof DefaultTemplate>[0]['i18n']
      payload: Parameters<typeof DefaultTemplate>[0]['payload']
      user?: Parameters<typeof DefaultTemplate>[0]['user']
    }
    visibleEntities?: Parameters<typeof DefaultTemplate>[0]['visibleEntities']
  }
  params?: Parameters<typeof DefaultTemplate>[0]['params']
  searchParams?: Parameters<typeof DefaultTemplate>[0]['searchParams']
}

export const BulkUploadView: React.FC<Props> = ({ initPageResult, params, searchParams }) => {
  return (
    <DefaultTemplate
      i18n={initPageResult.req.i18n}
      locale={initPageResult.locale}
      params={params}
      payload={initPageResult.req.payload}
      permissions={initPageResult.permissions}
      searchParams={searchParams}
      user={initPageResult.req.user}
      visibleEntities={initPageResult.visibleEntities ?? { collections: [], globals: [] }}
    >
      <BulkUploadClient />
    </DefaultTemplate>
  )
}
