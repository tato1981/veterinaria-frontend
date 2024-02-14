import { useState, useEffect } from "react";
import { useParams, Link } from 'react-router-dom'
import Alerta from "../components/Alerta"
import clienteAxios from "../../config/axios"


const NuevoPassword = () => {
  const [password, setPassword] = useState("");
  const [repetirPassword, setRepetirPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [alerta, setAlerta] = useState({});
  const [tokenValido, setTokenValido] = useState(false);
  const [passwordModificado, setPasswordModificado] = useState(false)

  const params = useParams();
  const { token } = params;

  useEffect(() => {
    const comprobarToken = async () => {
      try {
        await clienteAxios(`/veterinarios/olvide-password/${token}`);
        setAlerta({
          msg: "Coloca tu nuevo password",
        });
        setTokenValido(true);
      } catch (error) {
        setAlerta({ msg: "Hubo un error en el enlace", error: true });
      }
    };
    comprobarToken();
  }, []);

   const handleSubmit = async (e) => {
        e.preventDefault()

        if([password, repetirPassword].includes('')){
            setAlerta({msg: "hay campos vacíos", error: true})
            return;
        }
    
        if(password !== repetirPassword){
            setAlerta({msg: 'Los password no son iguales', error: true})
            return;
        }
    
        if(password.length < 6 ){
            setAlerta({msg: 'El password es muy corto, agrega mínimo 6 caracteres', error: true})
            return
        }

        setAlerta({})

        //crear nuevo password

        try {

            const url = `/veterinarios/olvide-password/${token}`
        
            const {data} = await clienteAxios.post(url, {password});       
  
            setAlerta({msg: data.msg})
            setPasswordModificado(true)
        } catch (error) {
              setAlerta({msg: error.response.data.msg, error: true}) //mensaje del backend
            }
            

    }

    //mostrar checkbox password
  const handleCheckboxChange = () => {
    setShowPassword(!showPassword);
  };
    

    const { msg } = alerta;

    return (
    <>
        <div>
            <h1 className="text-indigo-600 font-black text-6xl">
                Restablece tu Password y no Pierdas el Acceso a {""}
                <span className="text-black">tus Pacientes </span>
            </h1>
        </div>

      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        {msg && <Alerta alerta={alerta} />}
 
        {tokenValido && (

        <>
          <form
          onSubmit={handleSubmit}
          >
            <div className="my-5">
              <label
                htmlFor=""
                className="uppercase  text-gray-600 block text-xl font-bold"
              >
                Nuevo Password
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Tu Nuevo Password"
                className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            
            <div className="my-5">
              <label
                htmlFor=""
                className="uppercase  text-gray-600 block text-xl font-bold"
              >
                Repite tu Password
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Repite tu Password"
                className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                value={repetirPassword}
                onChange={(e) => setRepetirPassword(e.target.value)}
              />

                <input
                    type="checkbox"
                    id="showPassword"
                    className="ml-2 mt-5"
                    checked={showPassword}
                    onChange={handleCheckboxChange}
                  />
                  <label htmlFor="showPassword" className="ml-1  text-gray-500">
                    Mostrar Password
                  </label>
            </div>

            

            <input
              type="submit"
              value="Guardar Nuevo Password"
              className="bg-indigo-700 w-full p-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
            />
          </form>

            
            </>
        )}

        {passwordModificado && 

        <Link
            className="block text-center my-5 text-gray-500 no-underline hover:underline"
            to="/"
        >
            Inicia Sesión </Link>
        }
        
      </div>
    </>
  );
}

export default NuevoPassword