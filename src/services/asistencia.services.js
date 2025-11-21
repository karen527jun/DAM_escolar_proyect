import network from '@/services/network.services.js'

const generarHoja = async (body) => {
    const response = await network.post('/asistencia/start', body)
    return response
}

const getHojas = async (body) => {
    const params = new URLSearchParams(body)
    const response = await network.get('/asistencia/get', {params})
    return response
}

export default {
    generarHoja,
    getHojas
}