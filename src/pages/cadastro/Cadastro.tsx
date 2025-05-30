import { useState, type ChangeEvent, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import type Usuario from '../../models/Usuario';
import { cadastrarUsuario } from '../../services/Service';
import './Cadastro.css';
import { RotatingLines } from 'react-loader-spinner';

function Cadastro() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [confirmaSenha, setConfirmaSenha] = useState<string>("");

  const [usuario, setUsuario] = useState<Usuario>({
    nome: '',
    usuario: '',
    senha: '',
    foto: ''
  });

  function retornar() {
    navigate('/login');
  }

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value
    });
  }

  function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>) {
    setConfirmaSenha(e.target.value);
  }

  async function cadastrarNovoUsuario(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (confirmaSenha === usuario.senha && usuario.senha.length >= 8) {
      setIsLoading(true);
      try {
        await cadastrarUsuario(`/usuarios/cadastrar`, usuario, setUsuario);
        alert('Usuário cadastrado com sucesso!');
        navigate('/login');
      } catch (error) {
        alert('Erro ao cadastrar o usuário!');
      }
    } else {
      alert('Dados do usuário inconsistentes! Verifique as informações do cadastro.');
      setUsuario({ ...usuario, senha: '' });
      setConfirmaSenha('');
    }

    setIsLoading(false);
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 h-screen overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-800 to-indigo-700 text-white font-semibold">
      <form
        onSubmit={cadastrarNovoUsuario}
        className="flex justify-center items-center flex-col w-full max-w-md gap-4 p-6 mx-auto h-screen"
      >
        <h2 className="text-4xl font-bold mb-2">Cadastrar</h2>

        <div className="flex flex-col w-full">
          <label htmlFor="nome" className="text-sm mb-1">Nome</label>
          <input
            type="text"
            id="nome"
            name="nome"
            placeholder="Digite seu nome"
            className="bg-white text-gray-800 border border-purple-400 rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
            value={usuario.nome}
            onChange={atualizarEstado}
          />
        </div>

        <div className="flex flex-col w-full">
          <label htmlFor="usuario" className="text-sm mb-1">Usuário</label>
          <input
            type="text"
            id="usuario"
            name="usuario"
            placeholder="Digite seu usuário"
            className="bg-white text-gray-800 border border-purple-400 rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
            value={usuario.usuario}
            onChange={atualizarEstado}
          />
        </div>

        <div className="flex flex-col w-full">
          <label htmlFor="foto" className="text-sm mb-1">Foto (URL)</label>
          <input
            type="text"
            id="foto"
            name="foto"
            placeholder="Link da foto de perfil"
            className="bg-white text-gray-800 border border-purple-400 rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
            value={usuario.foto}
            onChange={atualizarEstado}
          />
        </div>

        <div className="flex flex-col w-full">
          <label htmlFor="senha" className="text-sm mb-1">Senha</label>
          <input
            type="password"
            id="senha"
            name="senha"
            placeholder="Crie uma senha"
            className="bg-white text-gray-800 border border-purple-400 rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
            value={usuario.senha}
            onChange={atualizarEstado}
          />
        </div>

        <div className="flex flex-col w-full">
          <label htmlFor="confirmarSenha" className="text-sm mb-1">Confirmar Senha</label>
          <input
            type="password"
            id="confirmarSenha"
            name="confirmarSenha"
            placeholder="Confirme sua senha"
            className="bg-white text-gray-800 border border-purple-400 rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
            value={confirmaSenha}
            onChange={handleConfirmarSenha}
          />
        </div>

        <div className="flex justify-between w-full mt-2 gap-4">
          <button
            type="reset"
            className="w-1/2 py-2 bg-red-500 hover:bg-red-700 text-white rounded-xl transition-all duration-300"
            onClick={retornar}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="w-1/2 py-2 bg-purple-600 hover:bg-purple-800 text-white rounded-xl flex justify-center transition-all duration-300"
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
              <span>Cadastrar</span>
            )}
          </button>
        </div>
      </form>

      <div className="hidden lg:flex items-center justify-center h-screen overflow-hidden">
                <div className="fundoCadastro hidden lg:block"></div>
      </div>
    </div>
  );
}

export default Cadastro;