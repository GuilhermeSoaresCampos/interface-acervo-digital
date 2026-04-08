// Classe responsável por fazer requisições à API - aluno

class AlunoRequests {
    private serverUrl: string;
    private endpointListarAlunos: string;

    constructor() {
        this.serverUrl = 'http://localhost:3333';
        this.endpointListarAlunos = '/api/alunos';
    }

    async listarAlunos() {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${this.serverUrl}${this.endpointListarAlunos}`, {
                headers: {
                    'x-access-token': `${token}`
                }
            });

            if(!response.ok) {
                throw new Error('Não foi possível listar os alunos.');
            }

            return response.json();
        } catch (error) {
            console.error(`Erro ao fazer consulta à API: ${error}`);
            return null;
        }
    }

}

export default new AlunoRequests();