import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import EmprestimoRequests from '../../../fetch/EmprestimoRequests';
import LivroRequests from '../../../fetch/LivroRequests';
import AlunoRequests from '../../../fetch/AlunoRequests';
import type AlunoDTO from '../../../dto/AlunoDTO';
import type LivroDTO from '../../../dto/LivroDTO';

type FormData = { aluno: { id_aluno: number }; livro: { id_livro: number }; data_emprestimo: string };

function FormAtualizarEmprestimo() {
    const navigate = useNavigate();
    const { id_emprestimo } = useParams<{ id_emprestimo: string }>();
    const [alunos, setAlunos] = useState<AlunoDTO[]>([]);
    const [livros, setLivros] = useState<LivroDTO[]>([]);
    const [formData, setFormData] = useState<FormData>({ aluno: { id_aluno: 0 }, livro: { id_livro: 0 }, data_emprestimo: '' });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const carregarDados = async () => {
            const id = Number(id_emprestimo);
            if (!id_emprestimo || !Number.isInteger(id) || id <= 0) {
                window.alert('Empréstimo não encontrado');
                navigate('/lista/emprestimos');
                return;
            }
            try {
                const [emprestimo, listaAlunos, listaLivros] = await Promise.all([
                    EmprestimoRequests.obtePorId(id), AlunoRequests.obterListaDeAlunos(), LivroRequests.obterListaDeLivros()
                ]);
                if (!emprestimo) {
                    window.alert('Empréstimo não encontrado');
                    navigate('/lista/emprestimos');
                    return;
                }
                setFormData({
                    aluno: { id_aluno: emprestimo.aluno.id_aluno },
                    livro: { id_livro: emprestimo.livro.id_livro },
                    data_emprestimo: new Date(emprestimo.data_emprestimo).toISOString().split('T')[0]
                });
                setAlunos(listaAlunos || []);
                setLivros(listaLivros || []);
            } catch (error) {
                console.error(`Erro ao carregar empréstimo. ${error}`);
                window.alert('Erro ao carregar empréstimo');
                navigate('/lista/emprestimos');
            } finally {
                setLoading(false);
            }
        };
        void carregarDados();
    }, [id_emprestimo, navigate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (name === 'id_aluno') setFormData(prev => ({ ...prev, aluno: { id_aluno: Number(value) } }));
        else if (name === 'id_livro') setFormData(prev => ({ ...prev, livro: { id_livro: Number(value) } }));
        else setFormData(prev => ({ ...prev, data_emprestimo: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await EmprestimoRequests.enviarFormularioAtualizacaoEmprestimo(Number(id_emprestimo), formData);
            window.alert('Empréstimo atualizado com sucesso');
            navigate('/lista/emprestimos');
        } catch (error) {
            const mensagem = error instanceof Error ? error.message : String(error);
            window.alert(mensagem || 'Erro ao atualizar empréstimo');
        }
    };

    if (loading) return <div className="flex justify-center items-center h-[76vh]">Processando...</div>;
    return (
        <main className="bg-gray-200 flex-1 py-6 sm:py-10 px-4">
            <div className="w-full max-w-6xl mx-auto bg-white rounded-xl shadow-xl border border-slate-300 p-6 sm:p-10">
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 text-center mb-8">Atualizar Empréstimo</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <label className="flex flex-col gap-1.5 text-sm font-bold text-slate-700">Aluno
                            <select name="id_aluno" required value={formData.aluno.id_aluno || ''} onChange={handleChange} className="border-2 border-slate-200 rounded-lg p-2.5 font-normal">
                                <option value="" disabled>Selecione...</option>
                                {alunos.map(aluno => <option key={aluno.id_aluno} value={aluno.id_aluno}>{aluno.nome} {aluno.sobrenome}</option>)}
                            </select>
                        </label>
                        <label className="flex flex-col gap-1.5 text-sm font-bold text-slate-700">Livro
                            <select name="id_livro" required value={formData.livro.id_livro || ''} onChange={handleChange} className="border-2 border-slate-200 rounded-lg p-2.5 font-normal">
                                <option value="" disabled>Selecione...</option>
                                {livros.map(livro => <option key={livro.id_livro} value={livro.id_livro}>{livro.titulo}</option>)}
                            </select>
                        </label>
                    </div>
                    <label className="flex flex-col gap-1.5 text-sm font-bold text-slate-700">Data do Empréstimo
                        <input type="date" name="data_emprestimo" required value={formData.data_emprestimo} onChange={handleChange} className="border-2 border-slate-200 rounded-lg p-2.5 font-normal" />
                    </label>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <input type="submit" value="ATUALIZAR EMPRÉSTIMO" className="flex-1 bg-slate-700 text-white font-bold py-3.5 rounded-lg cursor-pointer hover:bg-slate-600" />
                        <button type="button" onClick={() => navigate('/lista/emprestimos')} className="flex-1 bg-white border-2 border-slate-200 text-slate-600 font-bold py-3.5 rounded-lg">VOLTAR</button>
                    </div>
                </form>
            </div>
        </main>
    );
}

export default FormAtualizarEmprestimo;
