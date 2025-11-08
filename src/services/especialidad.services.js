import network from '@/services/network.services.js'


const getEspecialidades = async () => {
    const response = await network.get('/especialidades')
    return response
}
const postEspecialidades = async (body) => {
    const response = await network.post('/especialidades/insert', body)
    return response
}

export default {
    postEspecialidades,
    getEspecialidades
}