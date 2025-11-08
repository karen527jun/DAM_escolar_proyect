import network from '@/services/network.services.js'

const postProfesores = async (body) => {
    const response = await network.post('/profes/insert', body)
    return response
}

const getProfesores = async () => {
    const response = await network.get('/profes')
    return response
}

export default {
    postProfesores,
    getProfesores
}