import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import List from './components/List';
import AddUser from './components/AddUser.js';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<List />} />
        <Route path='/add' element={<AddUser />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
