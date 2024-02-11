import { useEffect, useCallback, useRef, useState } from "react"

export const useClientFetchData = <DataType>(fetch: any, payload: any): {
  result: DataType
  isLoading: boolean
  resetFetch: typeof resetFetch
} => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [result, setResult] = useState<DataType | any>()
  const isMounted = useRef(false)
  const fetchResult = useCallback(async (params: any = {}) => {
    try {
      setIsLoading(true); 
      const query = Object.assign(payload, params)
      const Post = await fetch(query)
      if (Post) {
        setResult(Post)
      }
    } catch (error) {

    } finally {
      setIsLoading(false)
    }
  }, [fetch, payload])
  const resetFetch = (params: any = {}) => {
    // 
    fetchResult({...params})
  }
  useEffect(() => {
    if (isMounted.current) return 
    isMounted.current = true
    fetchResult()
  }, [fetchResult])
  return {
    isLoading,
    result,
    resetFetch,
  }
}