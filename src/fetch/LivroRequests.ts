// Classe responsável por fazer requisições à API - livro

import type LivroDTO from "../dto/LivroDTO";

// Classe responsável por fazer requisições à API - livro
class LivroRequests {
    private serverUrl;
    private endpointLivro;

    constructor() {
        this.serverUrl = 'http://localhost:3333';
        this.endpointLivro = '/api/livros';
    }

    async obterListaDeLivros() {
        try {
            const token = localStorage.getItem('token');

            const respostaAPI = await fetch(`${this.serverUrl}${this.endpointLivro}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': `${token}`
                }
            });

            if (respostaAPI.ok) {
                const listaDelivros = await respostaAPI.json();
                return listaDelivros;
            } else {
                throw new Error(`Não foi possível listar os livros.`);
            }
        } catch (error) {
            console.error(`Erro ao fazer a consulta de livros. ${error}`);
            return;
        }
    }

    async enviarFormularioLivro(formLivro: LivroDTO): Promise<boolean> {
        try {
            const token = localStorage.getItem('token');
            const respostaAPI = await fetch(`${this.serverUrl}${this.endpointLivro}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': `${token}`
                },
                body: JSON.stringify(formLivro)
            });

            return respostaAPI.ok;
        } catch (error) {
            console.error(`Erro ao cadastrar livro. ${error}`);
            return false;
        }
    }

    async obterlivroPorId(id_livro: number): Promise<LivroDTO | undefined> {
        try {
            const token = localStorage.getItem('token');
            const respostaAPI = await fetch(`${this.serverUrl}${this.endpointLivro}/${id_livro  }`, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': `${token}`
                }
            });

            if (respostaAPI.ok) {
                const aluno: LivroDTO = await respostaAPI.json();
                return aluno;
            } else {
                throw new Error("Não foi possível buscar o livro.");
            }
        } catch (error) {
            console.error(`Erro ao fazer a consulta de livro por ID. ${error}`);
            return;
        }
    }

}

export default new LivroRequests;