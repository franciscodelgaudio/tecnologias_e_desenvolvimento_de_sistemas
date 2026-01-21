import { useCallback, useState } from 'react'

async function readResponseBody(response) {
  const contentType = response.headers.get('content-type') || ''
  if (contentType.includes('application/json')) {
    return response.json()
  }
  return response.text()
}

export function useHttp() {
  const [loadingGet, setLoadingGet] = useState(false)
  const [loadingPost, setLoadingPost] = useState(false)
  const [error, setError] = useState(null)

  const clearError = useCallback(() => setError(null), [])

  const get = useCallback(async (url, options = {}) => {
    setLoadingGet(true)
    setError(null)

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: { Accept: 'application/json' },
        ...options,
      })

      const body = await readResponseBody(response)

      if (!response.ok) {
        const message =
          (body && body.message) || `Erro HTTP ${response.status} ao buscar dados.`
        throw new Error(message)
      }

      return body
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err))
      throw err
    } finally {
      setLoadingGet(false)
    }
  }, [])

  const post = useCallback(async (url, payload, options = {}) => {
    setLoadingPost(true)
    setError(null)

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
        ...options,
      })

      const body = await readResponseBody(response)

      if (!response.ok) {
        const message =
          (body && body.message) || `Erro HTTP ${response.status} ao enviar dados.`
        throw new Error(message)
      }

      return body
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err))
      throw err
    } finally {
      setLoadingPost(false)
    }
  }, [])

  const loading = loadingGet || loadingPost

  return { loading, loadingGet, loadingPost, error, clearError, get, post }
}
