
import './App.css';
import CreateAccountForm from './components/CreateAccount';
import BussinessInfo from './components/BussinessInfo';
import {Routes,Route} from 'react-router-dom';
import './index.css'
function App() {
  return (
    <div className="App">
   <Routes>
   <Route path='/' element={ <CreateAccountForm/>} />
   <Route path='/information' element={ <BussinessInfo/>} />
   </Routes>
    </div>
  );
}

export default App;
