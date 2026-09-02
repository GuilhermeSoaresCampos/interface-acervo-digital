import { type JSX } from 'react';
import Navegacao from '../../components/Navegacao/Navegacao';
import Rodape from '../../components/Rodape/Rodape';
import FormAtualizarLivro from '../../components/Formularios/FormAtualizarLivro/FormAtualizarLivro';

function PAtualizarLivro(): JSX.Element {
    return <div className="min-h-screen flex flex-col"><Navegacao /><FormAtualizarLivro /><Rodape /></div>;
}

export default PAtualizarLivro;
