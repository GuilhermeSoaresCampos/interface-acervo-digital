import { type JSX } from 'react';
import Navegacao from '../../components/Navegacao/Navegacao';
import Rodape from '../../components/Rodape/Rodape';
import FormAtualizarAluno from '../../components/Formularios/FormAtualizarAluno/FormAtualizarAluno';

function PAtualizarAluno(): JSX.Element {
    return (
        <div className="min-h-screen flex flex-col">
            <Navegacao />
            <FormAtualizarAluno />
            <Rodape />
        </div>
    );
}

export default PAtualizarAluno;
