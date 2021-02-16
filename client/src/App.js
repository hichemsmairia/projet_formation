import logo from './logo.svg';
import './App.css';
import Home from './components/home';
import Login from './components/login';
import Register from './components/register';

import {BrowserRouter,Route,Switch} from 'react-router-dom'

function App () {
  return (
    <div className="App">
      <BrowserRouter>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/home" component={Home} />
        <Route path="/register" component={Register}/>
        <Route path="/" component={Home} />
      </Switch>
    
      </BrowserRouter>
      
      
    </div>
  );
}

export default App;
