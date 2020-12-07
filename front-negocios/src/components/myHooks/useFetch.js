import { useEffect, useState } from 'react'

const useFetch = url => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchResource = async () => {
            try {
                const res = await fetch(url)
                const data = await res.json()
                
                setData(data)
                setLoading(false)
            } catch (error) {
                setLoading(true)
                setError(error)
            }
        }
        fetchResource()
    }, [url])

    return { data, loading, error }
}

export default useFetch
