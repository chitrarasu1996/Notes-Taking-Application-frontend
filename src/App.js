import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import { Routes,Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/Home';
import Editnote from './components/Editnote';

function App() {
  return (
    <div className="App">
      <Routes>
     <Route path="/login" element={<Login/>}/>
      <Route path='/' element={<Register/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/edit-content' element={<Editnote/>}/>
      </Routes>
    </div>
  );
}

export default App;
