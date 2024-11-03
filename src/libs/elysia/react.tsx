'use client'

import type { QueryClient } from '@tanstack/react-query'
import { treaty } from '@elysiajs/eden'
import { QueryClientProvider } from '@tanstack/react-query'

import type { AppRouter } from '~/server/api/root'
import { createQueryClient } from '~/libs/elysia/query-client'
import { getBaseUrl } from '~/libs/utils'

export const api = treaty<AppRouter>(getBaseUrl()).api.elysia

let clientQueryClientSingleton: QueryClient | undefined = undefined
const getQueryClient = () => {
  if (typeof window === 'undefined') {
    return createQueryClient()
  } else {
    return (clientQueryClientSingleton ??= createQueryClient())
  }
}

export const QueryProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const queryClient = getQueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}
