import { useCallback, useState } from 'react'

// Lida com respostas JSON ou texto simples.
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

  // Limpa erros para permitir nova tentativa.
  const clearError = useCallback(() => setError(null), [])

  // Requisicao GET com tratamento de erro padrao.
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

  // Requisicao POST enviando JSON e tratando resposta.
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

  // Flag unica de carregamento para telas com estado global.
  const loading = loadingGet || loadingPost

  return { loading, loadingGet, loadingPost, error, clearError, get, post }
}
