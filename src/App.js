import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import MainDash from './components/MainDash/MainDash';
import Sidebar from './components/Sidebar/Sidebar';
import {BrowserRouter} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <div className="AppGlass">
        <BrowserRouter>
          <Sidebar/>
          <MainDash/>
        </BrowserRouter>  
      </div>
    </div>
  );
}

export default App;
