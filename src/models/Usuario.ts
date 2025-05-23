import type Postagem from "./Postagem";

export default interface Usuario {
  nome: string;
  usuario: string;
  foto: string;
  senha: string;
  postagem?: Postagem[] | null;
}