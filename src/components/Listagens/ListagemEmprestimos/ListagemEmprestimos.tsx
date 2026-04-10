import { type JSX } from "react";

function ListagemEmprestimos(): JSX.Element {
  return (
    <main className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Empréstimos</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-gray-600 font-semibold">ID</th>
              <th className="px-4 py-2 text-left text-gray-600 font-semibold">Aluno</th>
              <th className="px-4 py-2 text-left text-gray-600 font-semibold">Livro</th>
              <th className="px-4 py-2 text-left text-gray-600 font-semibold">Data Empréstimo</th>
              <th className="px-4 py-2 text-left text-gray-600 font-semibold">Data Devolução</th>
              <th className="px-4 py-2 text-left text-gray-600 font-semibold">Status</th>
              <th className="px-4 py-2 text-left text-gray-600 font-semibold">Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-gray-200 hover:bg-gray-50">
              <td className="px-4 py-2">1</td>
              <td className="px-4 py-2">João da Silva</td>
              <td className="px-4 py-2">Dom Casmurro</td>
              <td className="px-4 py-2">2023-10-01</td>
              <td className="px-4 py-2">2023-10-15</td>
              <td className="px-4 py-2">Devolvido</td>
              <td className="px-4 py-2">
                <a href="#" className="text-blue-500 hover:underline mr-2">Atualizar</a>
                <a href="#" className="text-green-500 hover:underline mr-2">Detalhes</a>
                <a href="#" className="text-red-500 hover:underline">Deletar</a>
              </td>
            </tr>
            <tr className="border-t border-gray-200 hover:bg-gray-50">
              <td className="px-4 py-2">2</td>
              <td className="px-4 py-2">Maria Oliveira</td>
              <td className="px-4 py-2">Memórias Póstumas de Brás Cubas</td>
              <td className="px-4 py-2">2023-10-05</td>
              <td className="px-4 py-2">-</td>
              <td className="px-4 py-2">Emprestado</td>
              <td className="px-4 py-2">
                <a href="#" className="text-blue-500 hover:underline mr-2">Atualizar</a>
                <a href="#" className="text-green-500 hover:underline mr-2">Detalhes</a>
                <a href="#" className="text-red-500 hover:underline">Deletar</a>
              </td>
            </tr>
            <tr className="border-t border-gray-200 hover:bg-gray-50">
              <td className="px-4 py-2">3</td>
              <td className="px-4 py-2">Pedro Santos</td>
              <td className="px-4 py-2">O Cortiço</td>
              <td className="px-4 py-2">2023-10-10</td>
              <td className="px-4 py-2">2023-10-20</td>
              <td className="px-4 py-2">Devolvido</td>
              <td className="px-4 py-2">
                <a href="#" className="text-blue-500 hover:underline mr-2">Atualizar</a>
                <a href="#" className="text-green-500 hover:underline mr-2">Detalhes</a>
                <a href="#" className="text-red-500 hover:underline">Deletar</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  );
}

export default ListagemEmprestimos;