import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login'
import Panel from './pages/panel'
import Wrapper from './pages/wapper'
import { ToastContainer } from 'react-toastify'
import { AppProvider } from './hooks/appContext'

export default function App() {
  return (
    <Router>
      <AppProvider>
        <Routes>
          <Route path='/' element={<Panel/>}/>
          <Route path='/auth' element={<Login/>}/>
          <Route path='/wrapper' element={<Wrapper/>}/>
        </Routes>
      </AppProvider>
      <ToastContainer position='top-center'/>
    </Router>
  )
}