import { useEffect, useCallback, useRef, useState } from "react"

export const useClientFetchData = <DataType>(fetch: any, payload: any): {
  result: DataType
  isLoading: boolean
} => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [result, setResult] = useState<DataType | any>()
  const isMounted = useRef(false)
  const fetchResult = useCallback(async () => {
    try {
      setIsLoading(true); 
      const Post = await fetch(payload)
      if (Post) {
        setResult(Post)
      }
    } catch (error) {

    } finally {
      setIsLoading(false)
    }
  }, [fetch, payload])
  useEffect(() => {
    if (isMounted.current) return 
    isMounted.current = true
    fetchResult()
  }, [fetchResult])
  return {
    isLoading,
    result
  }
}