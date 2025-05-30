import { useContext, useEffect, useState } from "react";
import { DNA } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import type Tema from "../../../models/Tema";
import CardTemas from "../cardtemas/CardTemas";
import { buscar } from "../../../services/Service";

function ListaTemas() {

    const navigate = useNavigate();

    const [temas, setTemas] = useState<Tema[]>([])

    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token

    async function buscarTemas() {
        try {
            await buscar('/temas', setTemas, {
                headers: { Authorization: token }
            })
        } catch (error: any) {
            if (error.toString().includes('403')) {
                handleLogout()
            }
        }
    }

    useEffect(() => {
        if (token === '') {
            alert('Você precisa estar logado!')
            navigate('/')
        }
    }, [token])

    useEffect(() => {
        buscarTemas()    
    }, [temas.length])
    
    return (
        <>
            {temas.length === 0 && (
                <div className="flex justify-center items-center h-[50vh]">
                    <DNA
                        visible={true}
                        height="120"
                        width="120"
                        ariaLabel="dna-loading"
                        wrapperClass="dna-wrapper"
                    />
                </div>
            )}
            <div className="flex justify-center w-full px-4 bg-gradient-to-r from-purple-600 to-purple-900">
                <div className="container my-8">
                    <h2 className="text-4xl text-white font-bold mb-6 text-center">
                        Temas Disponíveis
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {temas.map((tema) => (
                            <CardTemas key={tema.id} tema={tema} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ListaTemas;
