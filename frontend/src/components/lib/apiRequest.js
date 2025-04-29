import { useCallback } from 'react'
import { useAuth } from '../../contexts/AuthContext'

const useApiRequest = () => {

    const { getToken } = useAuth()

    const apiRequest = useCallback(async (route, method = 'GET', body = null) => {
        const fastApi = 'https://shopping-list-fastapi-94310770586.europe-west2.run.app'
        const url = fastApi + route

        
        const token = await getToken()
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }

        const options = {
            method,
            headers,
            body: body ? JSON.stringify(body) : null,
        }

        const response = await fetch(url, options)

        if (!response.ok) {
            const errorMessage = await response.text()
            throw new Error(
                `Request failed with status ${response.status}: ${errorMessage}`
        )}
        
        return response.json()
    }, [getToken])

    return apiRequest

}

export default useApiRequest