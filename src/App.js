import logo from './logo.svg';
import './App.css';
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import HomePet from './petfinder/HomePet/HomePet'
import Login from './petfinder/Login/Login';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={HomePet} />
        <Route exact path="/home" component={HomePet} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
