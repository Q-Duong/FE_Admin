import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import MainDash from './components/MainDash/MainDash';
import {BrowserRouter} from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from './components/Login/Login';

function App() {
  const token = useSelector(state => state.token)
  return (
    token && token !== '' ?
      <div className="App">
        <div className="AppGlass">
          <BrowserRouter>
            <MainDash/>
          </BrowserRouter>  
        </div>
      </div>  
    : <Login />
  );
}

export default App;
