import { createContext, useState, useEffect } from "react";
import clienteAxios from "../../config/axios";
import useAuth from "../hook/useAuth";

const PacientesContext = createContext()

const PacientesProvider = ({children}) => {

    const [pacientes, setPacientes] = useState([])
    const [paciente, setPaciente] = useState({})

    const {auth} = useAuth()

    useEffect(() => {

        const obtenerPacientes = async () =>{

            try {
                const token = localStorage.getItem('token')
                if(!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const {data} = await clienteAxios('/pacientes', config)
                setPacientes(data)


            } catch (error) {
                console.error(error)
            }
        }
        obtenerPacientes()

    },[auth])

    const guardarPaciente = async (paciente) => {

        //console.log(paciente)

        const token = localStorage.getItem('token')
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }

        //paciente editado
        if(paciente.id) {
            try {
                const {data} = await clienteAxios.put(`/pacientes/${paciente.id}`, paciente, config)
                
                const pacienteActualizado =pacientes.map( pacienteState => pacienteState._id === data._id ? data : pacienteState)
                setPacientes(pacienteActualizado)

            } catch (error) {
                console.log(error.response.data.msg)
            }
        }else{
             //agregar nuevo paciente a la DB

            try {
                
                const {data} = await clienteAxios.post('/pacientes', paciente, config)
                const { createAt, updateAt, __v, ...pacienteAlmacenado } = data
                
                setPacientes([
                    pacienteAlmacenado, ...pacientes
                ])
                
            } catch (error) {
            console.log(error.response.data.msg)
            }
        }                     
    
    }

    //editar paciente

    const setEdicion = (paciente) => {
        setPaciente(paciente)
    }


    //Eliminar paciente
    const eliminarPaciente = async (id) => {

        const confirmar = confirm(`Confirmas si deseas eliminar este paciente`)

        if(confirmar) {
            try {

                const token = localStorage.getItem('token')
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }

                const {data} = await clienteAxios.delete(`/pacientes/${id}`, config)
                
                const pacientesActualizados = pacientes.filter(pacientesState => pacientesState._id !== id)
                setPacientes(pacientesActualizados)

                
            } catch (error) {
                console.log(error.response.data.msg)
            }
        }
        
        
    }

    

    return (
        <PacientesContext.Provider
            value={{
                pacientes,
                guardarPaciente,
                setEdicion,
                paciente,
                eliminarPaciente
                

            }}
        >
            {children}

        </PacientesContext.Provider>
    )
}



export {
    PacientesProvider
}


export default PacientesContext



