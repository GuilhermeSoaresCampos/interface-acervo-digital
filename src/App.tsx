import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PHome from './pages/PHome/PHome'
import PLogin from './pages/PLogin/PLogin'
import PListagemAluno from './pages/PListagem/PListagemAluno/PListagemAluno'
import PLivro from './pages/PListagem/PLivro/PLivro'
import PEmprestimo from './pages/PListagem/PEmprestimo/PEmprestimo'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<PHome />} /> 
        <Route path='/login' element={<PLogin />} />
        <Route path='/lista/alunos' element={<PListagemAluno />} />
        <Route path='/lista/livros' element={<PLivro />} />
        <Route path='/lista/emprestimos' element={<PEmprestimo />} />

      </Routes> 
    </BrowserRouter>
  )
}

export default App
