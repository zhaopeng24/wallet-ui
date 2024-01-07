'use client'

import FullScreenLoading from '@/components/FullScreenLoading';
import { NextUIProvider } from '@nextui-org/react'
import { createContext, useCallback, useState } from 'react'

interface ILoadingContextProps {
  loading: boolean;
  setLoading: (loading: boolean) => void;
}
export const LoadingContext = createContext<ILoadingContextProps>({
  loading: false,
  setLoading: () => {}
})

export function Providers({ children }: { children: React.ReactNode }) {

  const [loading, setLoading] = useState(false)

  return (
    <NextUIProvider className='h-full'>
      <LoadingContext.Provider value={{ loading, setLoading }}>
        { children }
        { loading ? <FullScreenLoading /> : null }
      </LoadingContext.Provider>
    </NextUIProvider>
  )
}