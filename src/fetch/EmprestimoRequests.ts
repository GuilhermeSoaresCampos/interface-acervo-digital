// Classe responsável por fazer requisições à API - emprestimo

import type EmprestimoDTO from "../dto/EmprestimoDTO";

// Classe responsável por fazer requisições à API - emprestimo
class EmprestimoRequests {
    private serverUrl;
    private endpointEmprestimo;

    constructor() {
        this.serverUrl = 'https://api-acervo-digital.onrender.com';
        this.endpointEmprestimo = '/api/emprestimos';
    }

    async obterListaDeEmprestimos() {
        try {
            const token = localStorage.getItem('token');

            const respostaAPI = await fetch(`${this.serverUrl}${this.endpointEmprestimo}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': `${token}`
                }
            });

            if (respostaAPI.ok) {
                const listaDeEmprestimos = await respostaAPI.json();
                return listaDeEmprestimos;
            } else {
                throw new Error(`Não foi possível listar os emprestimos.`);
            }
        } catch (error) {
            console.error(`Erro ao fazer a consulta de emprestimos. ${error}`);
            return;
        }
    }

    async enviarFormularioEmprestimo(formEmprestimo: Record<string, unknown>): Promise<boolean> {
        try {
            const token = localStorage.getItem('token');
            const respostaAPI = await fetch(`${this.serverUrl}${this.endpointEmprestimo}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': `${token}`
                },
                body: JSON.stringify(formEmprestimo)
            });

            return respostaAPI.ok;
        } catch (error) {
            console.error(`Erro ao cadastrar emprestimo. ${error}`);
            return false;
        }
    }

    async obtePorId(id_emprestimo: number): Promise<EmprestimoDTO | undefined> {
        try {
            const token = localStorage.getItem('token');
            const respostaAPI = await fetch(`${this.serverUrl}${this.endpointEmprestimo}/${id_emprestimo}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': `${token}`
                }
            });

            if (respostaAPI.ok) {
                const emprestimo: EmprestimoDTO = await respostaAPI.json();
                return emprestimo;
            } else {
                throw new Error("Não foi possível buscar o emprestimo.");
            }
        } catch (error) {
            console.error(`Erro ao fazer a consulta de emprestimo por ID. ${error}`);
            return;
        }
    }

    async enviarFormularioAtualizacaoEmprestimo(id_emprestimo: number, formEmprestimo: Record<string, unknown>): Promise<boolean> {
        try {
            const token = localStorage.getItem('token');
            const respostaAPI = await fetch(`${this.serverUrl}${this.endpointEmprestimo}/${id_emprestimo}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': `${token}`
                },
                body: JSON.stringify(formEmprestimo)
            });

            if (!respostaAPI.ok) {
                const errorData = await respostaAPI.json().catch(() => ({}));
                throw new Error(errorData.mensagem || `Erro ${respostaAPI.status}: ${respostaAPI.statusText}`);
            }

            return true;
        } catch (error) {
            console.error(`Erro ao atualizar empréstimo. ${error}`);
            throw error;
        }
    }

        async removerEmprestimo(id_emprestimo: number): Promise<boolean> {
            try {
                const token = localStorage.getItem('token');
                const respostaAPI = await fetch(`${this.serverUrl}${this.endpointEmprestimo}/${id_emprestimo}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-access-token': `${token}`
                    }
                });

                if (!respostaAPI.ok) {
                    const errorData = await respostaAPI.json().catch(() => ({}));
                    const errorMessage = errorData.mensagem || `Erro ${respostaAPI.status}: ${respostaAPI.statusText}`;
                    throw new Error(errorMessage);
                }

                console.info(`${respostaAPI.status} ${respostaAPI.statusText}`);

                return true;
            } catch (error) {
                console.error(`Erro ao fazer consulta à API. ${error}`);
                throw error;
            }
        }
}

export default new EmprestimoRequests;