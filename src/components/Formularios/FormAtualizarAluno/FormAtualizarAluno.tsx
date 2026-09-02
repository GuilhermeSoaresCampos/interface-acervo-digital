import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AlunoRequests from '../../../fetch/AlunoRequests';
import type AlunoDTO from '../../../dto/AlunoDTO';
import Utilitario from '../../../utils/Utilitario';

function FormAtualizarAluno() {
    const navigate = useNavigate();
    const { id_aluno } = useParams<{ id_aluno: string }>();
    const [formData, setFormData] = useState<AlunoDTO>({
        nome: '',
        sobrenome: '',
        data_nascimento: new Date(),
        endereco: '',
        email: '',
        celular: ''
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const carregarAluno = async () => {
            const id = Number(id_aluno);
            if (!id_aluno || !Number.isInteger(id) || id <= 0) {
                window.alert('Aluno não encontrado');
                navigate('/lista/alunos');
                return;
            }

            try {
                const aluno = await AlunoRequests.obterAlunoPorId(id);
                if (!aluno) {
                    window.alert('Aluno não encontrado');
                    navigate('/lista/alunos');
                    return;
                }
                setFormData(aluno);
            } catch (error) {
                console.error(`Erro ao carregar aluno. ${error}`);
                window.alert('Erro ao carregar aluno');
                navigate('/lista/alunos');
            } finally {
                setLoading(false);
            }
        };

        carregarAluno();
    }, [id_aluno, navigate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'celular' ? Utilitario.formatarTelefone(value) : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!Utilitario.validarEmail(formData.email)) {
            window.alert('E-mail inválido');
            return;
        }

        const id = Number(id_aluno);
        try {
            await AlunoRequests.enviarFormularioAtualizacaoAluno(id, formData);
            window.alert('Aluno atualizado com sucesso');
            const role = localStorage.getItem('role');
            navigate(role === 'admin' ? '/lista/alunos' : `/detalhes/aluno/${id_aluno}`);
        } catch (error) {
            const mensagem = error instanceof Error ? error.message : String(error);
            window.alert(mensagem || 'Erro ao atualizar aluno');
        }
    };

    const voltarDestino = localStorage.getItem('role') === 'admin'
        ? '/lista/alunos'
        : `/detalhes/aluno/${id_aluno}`;

    if (loading) {
        return <div className="flex justify-center items-center h-[76vh]">Processando...</div>;
    }

    return (
        <main className="bg-gray-200 flex-1 py-6 sm:py-10 px-4 overflow-y-auto">
            <div className="w-full max-w-6xl mx-auto bg-white rounded-xl shadow-xl border border-slate-300 overflow-hidden">
                <header className="bg-slate-700 p-6 text-white text-center">
                    <h1 className="text-2xl sm:text-3xl font-bold">Atualizar Aluno</h1>
                    <p className="text-slate-300 text-sm mt-1">Edite as informações do cadastro do aluno</p>
                </header>

                <form onSubmit={handleSubmit} className="p-6 sm:p-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="nome" className="text-sm font-bold text-slate-700 uppercase tracking-wider">Nome</label>
                            <input type="text" name="nome" id="nome" required minLength={3} value={formData.nome} onChange={handleChange} className="w-full border-2 border-slate-200 rounded-lg p-2.5 focus:border-slate-500 focus:outline-none transition-all bg-slate-50" />
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="sobrenome" className="text-sm font-bold text-slate-700 uppercase tracking-wider">Sobrenome</label>
                            <input type="text" name="sobrenome" id="sobrenome" required minLength={3} value={formData.sobrenome} onChange={handleChange} className="w-full border-2 border-slate-200 rounded-lg p-2.5 focus:border-slate-500 focus:outline-none transition-all bg-slate-50" />
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="data_nascimento" className="text-sm font-bold text-slate-700 uppercase tracking-wider">Data de Nascimento</label>
                            <input type="date" name="data_nascimento" id="data_nascimento" value={Utilitario.formatarDataParaInput(formData.data_nascimento)} onChange={handleChange} className="w-full border-2 border-slate-200 rounded-lg p-2.5 focus:border-slate-500 focus:outline-none transition-all bg-slate-50" />
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="celular" className="text-sm font-bold text-slate-700 uppercase tracking-wider">Celular</label>
                            <input type="tel" name="celular" id="celular" value={formData.celular || ''} onChange={handleChange} placeholder="(xx) x xxxx-xxxx" className="w-full border-2 border-slate-200 rounded-lg p-2.5 focus:border-slate-500 focus:outline-none transition-all bg-slate-50" />
                        </div>
                        <div className="flex flex-col gap-1.5 md:col-span-2">
                            <label htmlFor="endereco" className="text-sm font-bold text-slate-700 uppercase tracking-wider">Endereço Residencial</label>
                            <input type="text" name="endereco" id="endereco" minLength={6} value={formData.endereco} onChange={handleChange} className="w-full border-2 border-slate-200 rounded-lg p-2.5 focus:border-slate-500 focus:outline-none transition-all bg-slate-50" />
                        </div>
                        <div className="flex flex-col gap-1.5 md:col-span-2">
                            <label htmlFor="email" className="text-sm font-bold text-slate-700 uppercase tracking-wider">E-mail Acadêmico</label>
                            <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} className="w-full border-2 border-slate-200 rounded-lg p-2.5 focus:border-slate-500 focus:outline-none transition-all bg-slate-50" />
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 mt-10">
                        <input type="submit" value="ATUALIZAR CADASTRO" className="flex-1 bg-slate-700 text-white font-bold py-3.5 rounded-lg cursor-pointer hover:bg-slate-600 shadow-md transition-all uppercase tracking-wide text-sm" />
                        <button type="button" onClick={() => navigate(voltarDestino)} className="flex-1 bg-white border-2 border-slate-200 text-slate-600 font-bold py-3.5 rounded-lg hover:bg-slate-50 transition-all shadow-sm uppercase tracking-wide text-sm">
                            VOLTAR
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
}

export default FormAtualizarAluno;
