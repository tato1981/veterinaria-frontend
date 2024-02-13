import { useState, useEffect } from "react"
import clienteAxios from "../../config/axios"
import Alerta from "../components/Alerta"
import usePacientes from "../hook/usePacientes"


const Formulario = () => {

const  [nombre, setNombre] = useState('')
const  [propietario, setPropietario] = useState('')
const  [email, setEmail] = useState('')
const  [fecha_alta, setFechaAlta] = useState('')
const  [sintomas, setSintomas] = useState('')
const  [id, setId] = useState(null)



const  [alerta, setAlerta] = useState({})

const {guardarPaciente, paciente} = usePacientes()


useEffect(() => {
    if(paciente?.nombre){
        setNombre(paciente.nombre)
        setPropietario(paciente.propietario)
        setEmail(paciente.email)
        setFechaAlta(paciente.fecha_alta.split('T')[0])
        setSintomas(paciente.sintomas)        
        setId(paciente._id)

    }

    

}, [paciente])




const handleSubmit = async (e) => {
    e.preventDefault();

        //validar formulario
    if([nombre, propietario, email, fecha_alta, sintomas,].includes('')){
        setAlerta({msg: "Los campos son obligatorios", error: true})
        return;
    }

    
    
    guardarPaciente({
        nombre, 
        propietario, 
        email, 
        fecha_alta, 
        sintomas,
        id
    })

    setAlerta({msg: "Paciente Guardado Correctamente"})

    setNombre('')
    setPropietario('')
    setEmail('')
    setFechaAlta('')
    setSintomas('')
    setId('')

    
}





const {msg} = alerta;




  return (
    <>  
             <h2 className='font-black text-3xl text-center'>Administrador de Pacientes</h2>
            <p className='text-xl mt-5 mb-10 text-center'>
                Añade tus pacientes y {''}
                <span className='text-indigo-600 font-bold'>administrarlos</span>
            </p>
        
            <form
                className="bg-white py-10 px-5 mb-10 lg:mb-5 shadow-md rounded-md"
                onSubmit={handleSubmit}
            >
                <div className="mb-5">
                    <label 
                        htmlFor="mascota"
                        className="text-gray-700 uppercase font-bold"                    
                    >Nombre Mascota</label>
                
                    <input 
                        id="mascota"
                        type="text"
                        placeholder="Nombre de la Mascota"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={nombre}
                        onChange={ e => setNombre(e.target.value)}                
                    />
                </div>


                <div className="mb-5">
                    <label 
                        htmlFor="propietario"
                        className="text-gray-700 uppercase font-bold"
                    >Propietario</label>

                    <input 
                        id="propietario"
                        type="text"
                        placeholder="Nombre Propietario"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" 
                        value={propietario}
                        onChange={ e => setPropietario(e.target.value)}                  
                    />
                </div>


                <div className="mb-5">
                    <label 
                        htmlFor="email"
                        className="text-gray-700 uppercase font-bold"                    
                    >Email</label>

                    <input 
                        id="Email"
                        type="email"
                        placeholder="Email"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={email}
                        onChange={ e => setEmail(e.target.value)}                   
                    />
                </div>


                <div className="mb-5">
                    <label 
                        htmlFor="fecha_alta"
                        className="text-gray-700 uppercase font-bold"
                    >Fecha Alta</label>

                    <input 
                        id="fecha_alta"
                        type="date"                       
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={fecha_alta}
                        onChange={ e => setFechaAlta(e.target.value)}                   
                    />
                </div>


                <div className="mb-5">
                    <label 
                        htmlFor="sintomas"
                        className="text-gray-700 uppercase font-bold"
                    >Síntomas</label>

                    <textarea 
                        id="sintomas"  
                        placeholder="Describe los sintomas de tu mascota"                                          
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={sintomas}
                        onChange={ e => setSintomas(e.target.value)}                   
                    />
                </div>

                
                <input 
                    type="submit" 
                    value={id ? 'Guardar Cambios' : "Agregar Mascota"}
                    className="bg-indigo-700 w-full p-3 rounded-md text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 "
                />           

            </form>

            {msg && <Alerta
                alerta={alerta}
            />}

        

    </>

  )
}

export default Formulario