import axios from 'axios'
import storage from './storage'

function buildURLParams(params) {
	if (!params || !Object.keys(params).length) return ''
	return '?' + new URLSearchParams(params).toString()
}


const url_header = process.env.REACT_APP_API_URL

const Api = {
    get: async (url, params) => {
        try {
            const connectionString = url_header + url + buildURLParams(params),
                token = await storage.getItem('token'),
                config = { headers: {} }

            if(token) {
                config.headers.Authorization = `Bearer ${token}`
            }

            const res = await axios.get(
                connectionString,
                config
            )

            if(res?.data?.err) {
                window.alert(res.data.err)

                if(res.data.removeToken) {
                    storage.removeItem('token')
                }
                return null
            }

            return res.data   
        } catch (error) {
            console.log(error)
        }
    },
    post: async (url, data) => {
        try {
            const connectionString = url_header + url,
                token = await storage.getItem('token'),
                config = { headers: {} }

            if(token) {
                config.headers.Authorization = `Bearer ${token}`
            }

            const res = await axios.post(
                connectionString, 
                data,
                config
            )

            if(res?.data?.err) {
                window.alert(res.data.err)

                if(res.data.removeToken) {
                    storage.removeItem('token')
                }
                return null
            }

            return res.data
        } catch (error) {
            console.log(error)
        }
    }
}

export default Api