import axios from 'axios'


//crear url base con axios
const clienteAxios = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`

})

export default clienteAxios