import { Link } from "react-router-dom"

function Navbar() {
    return (
        <>
            <div className='w-full flex justify-center py-4 bg-gradient-to-r from-purple-600 to-purple-900 text-white'>

                <div className="container flex justify-between text-lg">
                    <Link to='/home' className="text-2xl font-bold">Blog Yasmim</Link>

                    <div className='flex gap-6'>
                        <span>Postagens</span>
                        <span>Temas </span>
                        <span> Cadastrar Tema </span>
                        <span>Perfil</span>
                        <span>Sair</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar