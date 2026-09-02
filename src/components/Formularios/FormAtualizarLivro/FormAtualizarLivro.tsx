import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import LivroRequests from '../../../fetch/LivroRequests';
import type LivroDTO from '../../../dto/LivroDTO';

const livroInicial: LivroDTO = {
    titulo: '', autor: '', editora: '', ano_publicacao: '', isbn: '',
    quant_total: 0, quant_disponivel: 0, quant_aquisicao: 0, valor_aquisicao: 0
};

function FormAtualizarLivro() {
    const navigate = useNavigate();
    const { id_livro } = useParams<{ id_livro: string }>();
    const [formData, setFormData] = useState<LivroDTO>(livroInicial);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const carregarLivro = async () => {
            const id = Number(id_livro);
            if (!id_livro || !Number.isInteger(id) || id <= 0) {
                window.alert('Livro não encontrado');
                navigate('/lista/livros');
                return;
            }
            try {
                const livro = await LivroRequests.obterlivroPorId(id);
                if (!livro) {
                    window.alert('Livro não encontrado');
                    navigate('/lista/livros');
                    return;
                }
                setFormData(livro);
            } catch (error) {
                console.error(`Erro ao carregar livro. ${error}`);
                window.alert('Erro ao carregar livro');
                navigate('/lista/livros');
            } finally {
                setLoading(false);
            }
        };
        void carregarLivro();
    }, [id_livro, navigate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({ ...prev, [name]: type === 'number' ? Number(value) : value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await LivroRequests.enviarFormularioAtualizacaoLivro(Number(id_livro), formData);
            window.alert('Livro atualizado com sucesso');
            navigate('/lista/livros');
        } catch (error) {
            const mensagem = error instanceof Error ? error.message : String(error);
            window.alert(mensagem || 'Erro ao atualizar livro');
        }
    };

    if (loading) return <div className="flex justify-center items-center h-[76vh]">Processando...</div>;

    return (
        <main className="bg-gray-200 flex-1 py-6 sm:py-10 px-4 overflow-y-auto">
            <div className="w-full max-w-6xl mx-auto bg-white rounded-xl shadow-xl border border-slate-300 p-6 sm:p-10">
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 text-center mb-8">Atualizar Livro</h1>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                        ['titulo', 'Título', 'text'], ['autor', 'Autor', 'text'], ['editora', 'Editora', 'text'],
                        ['ano_publicacao', 'Ano de Publicação', 'text'], ['isbn', 'ISBN', 'text'],
                        ['quant_total', 'Quantidade Total', 'number'], ['quant_disponivel', 'Quantidade Disponível', 'number'],
                        ['quant_aquisicao', 'Quantidade de Aquisição', 'number'], ['valor_aquisicao', 'Valor de Aquisição', 'number']
                    ].map(([name, label, type]) => (
                        <div className="flex flex-col gap-1.5" key={name}>
                            <label htmlFor={name} className="text-sm font-bold text-slate-700">{label}</label>
                            <input id={name} name={name} type={type} required={['titulo', 'autor', 'editora', 'ano_publicacao', 'isbn'].includes(name)} min={type === 'number' ? 0 : undefined} step={name === 'valor_aquisicao' ? '0.01' : undefined} value={String(formData[name as keyof LivroDTO] ?? '')} onChange={handleChange} className="w-full border-2 border-slate-200 rounded-lg p-2.5 focus:border-slate-500 focus:outline-none bg-slate-50" />
                        </div>
                    ))}
                    <div className="md:col-span-2 flex flex-col sm:flex-row gap-4 mt-4">
                        <input type="submit" value="ATUALIZAR LIVRO" className="flex-1 bg-slate-700 text-white font-bold py-3.5 rounded-lg cursor-pointer hover:bg-slate-600" />
                        <button type="button" onClick={() => navigate('/lista/livros')} className="flex-1 bg-white border-2 border-slate-200 text-slate-600 font-bold py-3.5 rounded-lg">VOLTAR</button>
                    </div>
                </form>
            </div>
        </main>
    );
}

export default FormAtualizarLivro;
