import { type JSX } from 'react';
import Navegacao from '../../components/Navegacao/Navegacao';
import Rodape from '../../components/Rodape/Rodape';
import FormAtualizarEmprestimo from '../../components/Formularios/FormAtualizarEmprestimo/FormAtualizarEmprestimo';

function PAtualizarEmprestimo(): JSX.Element {
    return <div className="min-h-screen flex flex-col"><Navegacao /><FormAtualizarEmprestimo /><Rodape /></div>;
}

export default PAtualizarEmprestimo;
