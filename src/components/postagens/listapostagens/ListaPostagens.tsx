import { useNavigate } from "react-router-dom";
import CardPostagem from "../cardpostagens/CardPostagens";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import type Postagem from "../../../models/Postagem";
import { buscar } from "../../../services/Service";
import { DNA } from "react-loader-spinner";

function ListaPostagens() {
    const navigate = useNavigate();
    const [postagens, setPostagens] = useState<Postagem[]>([]);
    const [loading, setLoading] = useState(true);

    const { usuario, handleLogout } = useContext(AuthContext);
    const token = usuario.token;

    async function buscarPostagens() {
        try {
            setLoading(true);
            await buscar('/postagens', setPostagens, {
                headers: {
                    Authorization: token,
                },
            });
        } catch (error: any) {
            if (error.toString().includes('403')) {
                handleLogout();
            }
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (token === '') {
            alert('Você precisa estar logado');
            navigate('/');
            return;
        }
        buscarPostagens();
    }, []); 

    if (loading) {
        return (
            <div className="flex justify-center my-8">
                <DNA
                    visible={true}
                    height="200"
                    width="200"
                    ariaLabel="dna-loading"
                    wrapperClass="dna-wrapper mx-auto"
                />
            </div>
        );
    }

    if (postagens.length === 0) {
        return (
            <div className="text-center text-indigo-600 text-xl mt-10">
                <p>Não há postagens ainda.</p>
            </div>
        );
    }

    return (
        <div className="flex justify-center w-full my-4">
            <div className="container flex flex-col mx-2">
                <div className='container mx-auto my-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                    {postagens.map((postagem) => (
                        <CardPostagem key={postagem.id} postagem={postagem} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ListaPostagens;
