import network from '@/services/network.services.js'

const getUsuarios = async () => {
    const response = await network.get('/users')
    return response
}

export default {
    getUsuarios
}