import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"

import { AuthContext } from "../../contexts/AuthContext"

function Perfil() {
  const navigate = useNavigate()

  const { usuario } = useContext(AuthContext)

  useEffect(() => {
    if (usuario.token === "") {
      alert("Você precisa estar logado")
      navigate("/")
    }
  }, [usuario.token])

  const fotoPerfil = usuario.foto && usuario.foto.trim() !== ""
    ? usuario.foto
    : "https://static.vecteezy.com/system/resources/previews/005/544/770/original/profile-icon-design-free-vector.jpg"

  return (
    <div className="flex justify-center mx-4">
      <div className="container mx-auto my-4 rounded-2xl overflow-hidden shadow-lg shadow-purple-700/50">
        <img
          className="w-full h-72 object-cover border-b-8 border-purple-700"
          src="https://i.imgur.com/ZZFAmzo.jpg"
          alt="Capa do Perfil"
        />

        <img
          className="rounded-full w-56 mx-auto mt-[-8rem] border-8 border-purple-300 relative z-10"
          src={fotoPerfil}
          alt={`Foto de perfil de ${usuario.nome || "Usuário"}`}
        />

        <div
          className="relative mt-[-6rem] h-72 flex flex-col 
            bg-gradient-to-br from-purple-700 to-purple-900 
            text-white text-2xl items-center justify-center"
        >
          <p>Nome: {usuario.nome || "Usuário não informado"} </p>
          <p>Email: {usuario.usuario || "Email não informado"}</p>
        </div>
      </div>
    </div>
  )
}

export default Perfil
