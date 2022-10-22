import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import './App.css';

import Home from './components/home.jsx';
import TransactionForm from './components/transaction_form';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/transaction/new' element={<TransactionForm />} />
        <Route path='/' element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
