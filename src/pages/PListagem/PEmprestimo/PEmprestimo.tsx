import { type JSX } from "react";
import Navegacao from "../../../components/Navegacao/Navegacao";
import ListagemEmprestimos from "../../../components/Listagens/ListagemEmprestimos/ListagemEmprestimos";
import Rodape from "../../../components/Rodape/Rodape";

function PEmprestimo(): JSX.Element {
  return (
    <>
      <Navegacao />
      <ListagemEmprestimos />
      <Rodape />
    </>
  );
}

export default PEmprestimo;