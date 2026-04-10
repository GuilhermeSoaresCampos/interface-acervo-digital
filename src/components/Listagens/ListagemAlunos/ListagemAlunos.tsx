
import { type JSX } from "react";

function ListagemAlunos(): JSX.Element {
  return (
    <main> {/* Web Semântica SEO (Search Engine Optimizer) */}
        <h1>Alunos</h1>
        <table>
            <thead>
            <tr>
                    <th>ID</th>
                    <th>RA</th>
                    <th>Nome</th>
                    <th>E-mail</th>
                    <th>Telefone</th>
                    <th>Ações</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                    <td>1</td>
                    <td>123456</td>
                    <td>João da Silva</td>
                    <td>joao.silva@email.com</td>
                    <td>(16) 99199-1490</td>
                    <td>
                        <a href="#">Atualizar</a>
                        <a href="#">Detalhes</a>
                        <a href="#">Deletar</a>
                    </td>
            </tr>
                    
            <tr>

            </tr>
            </tbody>
        </table>
    </main>
  );
}

export default ListagemAlunos;