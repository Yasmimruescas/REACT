import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import { AuthContext } from '../../contexts/AuthContext';
import { type ChangeEvent, useContext, useEffect, useState } from 'react';
import type UsuarioLogin from '../../models/UsuarioLogin';
import { RotatingLines } from 'react-loader-spinner';

function Login() {

    const navigate = useNavigate();

    const { usuario, handleLogin, isLoading } = useContext(AuthContext);

    const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>(
        {} as UsuarioLogin
    );

    useEffect(() => {
        if (usuario.token !== "") {
            navigate('/home');
        }
    }, [usuario]);

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setUsuarioLogin({
            ...usuarioLogin,
            [e.target.name]: e.target.value
        });
    }

    function login(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault();
        handleLogin(usuarioLogin);
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-indigo-700 text-white font-semibold">
            <form 
                onSubmit={login}
                className="flex justify-center items-center flex-col w-full max-w-md gap-6 p-8 mx-auto"
            >
                <h2 className="text-4xl mb-4 font-bold">Entrar</h2>

                <div className="flex flex-col w-full">
                    <label htmlFor="usuario" className="mb-1 text-sm">Usuário</label>
                    <input
                        type="text"
                        id="usuario"
                        name="usuario"
                        placeholder="Digite seu usuário"
                        className="bg-white text-gray-800 border border-purple-400 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-purple-600 shadow-sm"
                        value={usuarioLogin.usuario}
                        onChange={atualizarEstado}
                    />
                </div>

                <div className="flex flex-col w-full">
                    <label htmlFor="senha" className="mb-1 text-sm">Senha</label>
                    <input
                        type="password"
                        id="senha"
                        name="senha"
                        placeholder="Digite sua senha"
                        className="bg-white text-gray-800 border border-purple-400 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-purple-600 shadow-sm"
                        value={usuarioLogin.senha}
                        onChange={atualizarEstado}
                    />
                </div>

                <button
                    type='submit'
                    className="w-full py-3 bg-purple-600 hover:bg-purple-800 text-white rounded-xl shadow-lg transition-all duration-300 flex justify-center items-center"
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
                        <span>Entrar</span>
                    )}
                </button>

                <hr className="border-purple-400 w-full" />

                <p className="text-sm">
                    Ainda não tem uma conta?{' '}
                    <Link to="/cadastro" className="text-purple-200 underline hover:text-white">
                        Cadastre-se
                    </Link>
                </p>
            </form>

            <div className="hidden lg:flex items-center justify-center h-full">
                <div className="fundoLogin hidden lg:block"></div>
            </div>
        </div>
    );
}

export default Login;