import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PHome from './pages/PHome/PHome'
import PLogin from './pages/PLogin/PLogin'
import PListagemAluno from './pages/PListagem/PListagemAluno/PListagemAluno'
import PLivro from './pages/PListagem/PLivro/PLivro'
import PEmprestimo from './pages/PListagem/PEmprestimo/PEmprestimo'
import PDetalhesAluno from './pages/PDetalhes/PDetalhesAluno/PDetalhesAluno'
import PDetalhesEmprestimos from './pages/PDetalhes/PDetalhesEmprestimos/PDetalhesEmprestimos'
import PDetalhesLivro from './pages/PDetalhes/PDetalhesLivro/PDetalhesLivro'
import PCadastroAluno from './pages/PCadastro/PCadastroAluno/PCadastroAluno'
import PCadastroLivro from './pages/PCadastro/PCadastroLivro/PCadastroLivro'
import PCadastroEmprestimo from './pages/PCadastro/PCadastroEmprestimo/PCadastroEmprestimo'



function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<PHome />} /> 
        <Route path='/login' element={<PLogin />} />
        <Route path='/lista/alunos' element={<PListagemAluno />} />
        <Route path='/lista/livros' element={<PLivro />} />
        <Route path='/lista/emprestimos' element={<PEmprestimo />} />
        <Route path='/detalhes/aluno/:id_aluno' element={<PDetalhesAluno />} />
        <Route path='/detalhes/emprestimo/:id_emprestimo' element={<PDetalhesEmprestimos />} />
        <Route path='/detalhes/livro/:id_livro' element={<PDetalhesLivro />} />  {/* Rota para detalhes do livro, recebe o ID do livro como parâmetro */}
        <Route path='/cadastro/aluno' element={<PCadastroAluno />} />
        <Route path='/cadastro/livro' element={<PCadastroLivro />} />
        <Route path='/cadastro/emprestimo' element={<PCadastroEmprestimo />} />
      </Routes> 
    </BrowserRouter>
  )
  
}

export default App
