import { type JSX } from "react";
import Navegacao from "../../../components/Navegacao/Navegacao";
import ListagemAlunos from "../../../components/Listagens/ListagemAlunos/ListagemAlunos";
import Rodape from "../../../components/Rodape/Rodape";

function PListagemAluno(): JSX.Element {
  return (
    <> 
      <a href="/cadastro/aluno" className="w-full sm:w-auto px-4 py-2 md:px-6 md:py-3 text-sm md:text-base bg-slate-700 rounded-md text-center text-white font-bold flex items-center justify-center hover:cursor-pointer hover:bg-slate-600 transition-all shadow-md hover:shadow-lg active:scale-95">
                    Novo Aluno
                </a>
      <Navegacao />
      <ListagemAlunos />
      <Rodape />
    </>
  );
}

export default PListagemAluno;