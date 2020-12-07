/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react'
import { useProcedure } from '../presentation/hooks/useProcedure'
const IndexPage: React.FC = () => {
	const { execute, error, result, loading } = useProcedure<never[], any>('identity')

	if (loading) {
		return <h4>Loading...</h4>
	}
	if (error) {
		return <h4 style={{ color: 'red' }}>{error.message}</h4>
	}
	if (result) {
		return <h1>Hello {result.data.given_name}</h1>
	}

	return (
		<button
			onClick={() => {
				execute([])
			}}>
			Get Identity
		</button>
	)
}
export default IndexPage
