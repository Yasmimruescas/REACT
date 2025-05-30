import { type ChangeEvent, useContext, useEffect, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import type Tema from "../../../models/Tema";
import { atualizar, buscar, cadastrar } from "../../../services/Service";

function FormTema() {

    const navigate = useNavigate();

    const [tema, setTema] = useState<Tema>({} as Tema)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token

    const { id } = useParams<{ id: string }>();

    async function buscarPorId(id: string) {
        try {
            await buscar(`/temas/${id}`, setTema, {
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
        if (id !== undefined) {
            buscarPorId(id)
        }
    }, [id])

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setTema({
            ...tema,
            [e.target.name]: e.target.value
        })
    }

    function retornar() {
        navigate("/temas")
    }

    async function gerarNovoTema(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()
        setIsLoading(true)

        if (id !== undefined) {
            try {
                await atualizar(`/temas`, tema, setTema, {
                    headers: { 'Authorization': token }
                })
                alert('O Tema foi atualizado com sucesso!')
            } catch (error: any) {
                if (error.toString().includes('403')) {
                    handleLogout();
                } else {
                    alert('Erro ao atualizar o tema.')
                }

            }
        } else {
            try {
                await cadastrar(`/temas`, tema, setTema, {
                    headers: { 'Authorization': token }
                })
                alert('O Tema foi cadastrado com sucesso!')
            } catch (error: any) {
                if (error.toString().includes('403')) {
                    handleLogout();
                } else {
                    alert('Erro ao cadastrar o tema.')
                }

            }
        }

        setIsLoading(false)
        retornar()
    }

    return (
        <div className="container flex flex-col items-center justify-center mx-auto p-4">
            <h1 className="text-4xl font-bold text-indigo-700 mb-6 text-center">
                {id === undefined ? 'Cadastrar Tema' : 'Editar Tema'}
            </h1>

            <form
                className="w-full max-w-xl bg-white shadow-lg rounded-2xl p-6 space-y-6 border border-indigo-200"
                onSubmit={gerarNovoTema}
            >
                <div className="flex flex-col gap-2">
                    <label
                        htmlFor="descricao"
                        className="text-sm font-semibold text-indigo-800"
                    >
                        Descrição do Tema
                    </label>
                    <input
                        type="text"
                        placeholder="Descreva aqui seu tema"
                        name="descricao"
                        className="border-2 border-indigo-300 focus:border-indigo-500 outline-none rounded-xl p-3 text-gray-800"
                        value={tema.descricao}
                        onChange={atualizarEstado}
                    />
                </div>

                <button
                    className="bg-indigo-600 text-white font-semibold rounded-xl py-2 px-6 hover:bg-indigo-800 transition-colors flex justify-center items-center mx-auto w-40"
                    type="submit"
                >
                    {isLoading ? (
                        <RotatingLines
                            strokeColor="white"
                            strokeWidth="5"
                            animationDuration="0.75"
                            width="24"
                            visible={true}
                        />
                    ) : (
                        <span>{id === undefined ? 'Cadastrar' : 'Atualizar'}</span>
                    )}
                </button>
            </form>
        </div>
    );
}

export default FormTema;
