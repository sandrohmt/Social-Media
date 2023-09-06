import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'

import './App.css'
import { Main } from "./pages/Main"
import { Login } from "./pages/Login"
import { Navbar } from "./components/Navbar"
import { CreatePost } from './pages/create-post/CreatePost'


function App() {

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/createpost" element={<CreatePost />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
