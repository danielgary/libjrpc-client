import { useCallback, useState } from 'react'

export const useProcedure = <TParams, TResult>(methodName: string) => {
	/* Probably where we would have a useContext(JRPCProvider)*/
	const url = `http://localhost:7071/api/jsonrpc`
	const token = 'YOUR TOKEN HERE'

	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<Error | null>(null)
	const [result, setResult] = useState<TResult | null>(null)

	const execute = useCallback(
		(params: TParams) => {
			const id = new Date().getTime()
			const body = {
				method: methodName,
				id,
				jsonrpc: '2.0',
				params
			}

			const headers = {
				authorization: `Bearer ${token}`
			}
			setResult(null)
			setError(null)
			setLoading(true)
			fetch(url, { body: JSON.stringify(body), method: 'POST', headers })
				.then(async (response) => {
					const result = await response.json()

					if (result.result && !result.error) {
						setResult(result.result as TResult)
					} else {
						setError({ message: result.error.message, name: `JRPCError` })
					}
				})
				.catch((err) => {
					setError(err)
				})
				.finally(() => {
					setLoading(false)
				})
		},
		[methodName, setLoading, setError, setResult]
	)

	return {
		loading,
		error,
		result,
		execute
	}
}
