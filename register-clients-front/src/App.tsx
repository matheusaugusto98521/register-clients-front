import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import RegisterCLient from './components/Register';
import Dashboard from './components/pages/Dashboard';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/client/register' element={<RegisterCLient />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
