import axios from 'axios'

const isDev = import.meta.env.DEV

export const backend = isDev ? 'http://192.168.255.224:8888' : 'https://gungun-api.netlify.app/.netlify/functions/app'
export const base = isDev ? 'http://192.168.255.224:8888' : 'https://gungun-api.netlify.app'

// export const backend = isDev ? 'http:localhost:8888' : 'https://gungun-api.netlify.app/.netlify/functions/app'
// export const base = isDev ? 'http:localhost:8888' : 'https://gungun-api.netlify.app'

// export const backend = isDev
//     ? 'http://localhost:8888/.netlify/functions/app'
//     : 'https://gungun-api.netlify.app/.netlify/functions/app'
// export const base = isDev ? 'http://localhost:8888' : 'https://gungun-api.netlify.app'

// export const backend = 'https://gungun-api.netlify.app/.netlify/functions/app'
// export const base = 'https://gungun-api.netlify.app'

// export const backend = 'http://192.168.255.224:1000'

const token = localStorage.getItem('token') || ''

const api = axios.create({
    baseURL: backend,
    headers: {
        authorization: token,
    },
})

export default api
