import network from '@/services/network.services.js'

const postGrado = async (body) => {
  const response = await network.post('/grados/insert', body)
  return response
}

const getGrados = async () => {
  const response = await network.get('/grados')
  return response
}

const getGradoById = async (id) => {
  const response = await network.get(`/grados/${id}`)
  return response
}

const updateGrado = async (id, body) => {
  const response = await network.put(`/grados/update/${id}`, body)
  return response
}

const deleteGrado = async (id) => {
  const response = await network.delete(`/grados/delete/${id}`)
  return response
}

export default {
  postGrado,
  getGrados,
  getGradoById,
  updateGrado,
  deleteGrado
}
