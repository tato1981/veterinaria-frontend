import {useState, useEffect, createContext} from 'react'
//import {useNavigate} from 'react-router-dom'
import clienteAxios from '../../config/axios';

const AuthContext = createContext();

const AuthProvider = ({children}) => {

    const [cargando, setCargando] = useState(true)
    const [auth, setAuth] = useState({})
    const [userEmail, setUserEmail] = useState('');  

   // const navigate = useNavigate()

    useEffect(() => {

        const autenticarUsuario = async () => {
            const token = localStorage.getItem('token')
            
            if(!token) {
                setCargando(false)
                return;
            }

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            try {
                const {data} = await clienteAxios('/veterinarios/perfil', config)
                    setAuth(data)
                    //navigate('/admin') 
                    setUserEmail(data.email)               

            } catch (error) {
                console.log(error.response.data.msg)
                    setAuth({})
            }
            setCargando(false)
            
        }
        autenticarUsuario()

    }, [])

    //cerrar sesion veterinario

    const cerrarSesion = () => {
        localStorage.removeItem('token')
        setAuth({});
    }

    //actualizar perfil

    const actualizarPerfil = async (datos) => {

        const token = localStorage.getItem('token')
            
        if(!token) {
            setCargando(false)
            return;
        }

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {

            const url = `/veterinarios/perfil/${datos._id}`
            const {data} = await clienteAxios.put(url, datos, config)

            return {
                msg: 'Almacenado Correctamente',
                
            }
            
        } catch (error) {
            return {
                msg: error.response.data.msg,
                error: true
            }
        }        
    }

    const guardarPassword = async (datos) => {
        const token = localStorage.getItem('token')
            
        if(!token) {
            setCargando(false)
            return;
        }

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const url = `/veterinarios/actualizar-password`
            const {data} = await clienteAxios.put(url, datos, config)
            //console.log(data)
            
            return {
                msg: data.msg
            }
            
        } catch (error) {
            return {
                msg: error.response.data.msg,
                error: true
            }
        }
    }

   
    
    


    return (

        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                cargando,
                cerrarSesion,
                actualizarPerfil,
                guardarPassword,
                userEmail, setUserEmail
                
            }}
        
        >
            {children}
        </AuthContext.Provider>

    )

}

export {
    AuthProvider
}



export default AuthContext;