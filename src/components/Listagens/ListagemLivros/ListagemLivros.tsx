import { type JSX } from "react";

function ListagemLivros(): JSX.Element {
  return (
    <main className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Livros</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-gray-600 font-semibold">ID</th>
              <th className="px-4 py-2 text-left text-gray-600 font-semibold">Título</th>
              <th className="px-4 py-2 text-left text-gray-600 font-semibold">Autor</th>
              <th className="px-4 py-2 text-left text-gray-600 font-semibold">Editora</th>
              <th className="px-4 py-2 text-left text-gray-600 font-semibold">Ano</th>
              <th className="px-4 py-2 text-left text-gray-600 font-semibold">ISBN</th>
              <th className="px-4 py-2 text-left text-gray-600 font-semibold">Total</th>
              <th className="px-4 py-2 text-left text-gray-600 font-semibold">Disponível</th>
              <th className="px-4 py-2 text-left text-gray-600 font-semibold">Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-gray-200 hover:bg-gray-50">
              <td className="px-4 py-2">1</td>
              <td className="px-4 py-2">Dom Casmurro</td>
              <td className="px-4 py-2">Machado de Assis</td>
              <td className="px-4 py-2">Editora A</td>
              <td className="px-4 py-2">1899</td>
              <td className="px-4 py-2">978-85-12345-67-8</td>
              <td className="px-4 py-2">10</td>
              <td className="px-4 py-2">8</td>
              <td className="px-4 py-2">
                <a href="#" className="text-blue-500 hover:underline mr-2">Atualizar</a>
                <a href="#" className="text-green-500 hover:underline mr-2">Detalhes</a>
                <a href="#" className="text-red-500 hover:underline">Deletar</a>
              </td>
            </tr>
            <tr className="border-t border-gray-200 hover:bg-gray-50">
              <td className="px-4 py-2">2</td>
              <td className="px-4 py-2">Memórias Póstumas de Brás Cubas</td>
              <td className="px-4 py-2">Machado de Assis</td>
              <td className="px-4 py-2">Editora B</td>
              <td className="px-4 py-2">1881</td>
              <td className="px-4 py-2">978-85-12345-68-5</td>
              <td className="px-4 py-2">5</td>
              <td className="px-4 py-2">3</td>
              <td className="px-4 py-2">
                <a href="#" className="text-blue-500 hover:underline mr-2">Atualizar</a>
                <a href="#" className="text-green-500 hover:underline mr-2">Detalhes</a>
                <a href="#" className="text-red-500 hover:underline">Deletar</a>
              </td>
            </tr>
            <tr className="border-t border-gray-200 hover:bg-gray-50">
              <td className="px-4 py-2">3</td>
              <td className="px-4 py-2">O Cortiço</td>
              <td className="px-4 py-2">Aluísio Azevedo</td>
              <td className="px-4 py-2">Editora C</td>
              <td className="px-4 py-2">1890</td>
              <td className="px-4 py-2">978-85-12345-69-2</td>
              <td className="px-4 py-2">7</td>
              <td className="px-4 py-2">5</td>
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

export default ListagemLivros;