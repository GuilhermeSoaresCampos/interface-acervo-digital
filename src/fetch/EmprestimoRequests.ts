// Classe responsável por fazer requisições à API - emprestimo

import type EmprestimoDTO from "../dto/EmprestimoDTO";

// Classe responsável por fazer requisições à API - emprestimo
class EmprestimoRequests {
    private serverUrl;
    private endpointEmprestimo;

    constructor() {
        this.serverUrl = 'http://localhost:3333';
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
}

export default new EmprestimoRequests;