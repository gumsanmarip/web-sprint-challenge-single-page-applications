import { Link, Route, Switch } from 'react-router-dom';

import Home from './Home';
import Form from './Form';


export default function App(props) {
  return (
    <div className='App'>
      <nav>
        <h1 className='header'>Bloom Pizza</h1>
        <div className='nav-links'>
          <Link to="/"><button id='home-button'>Home</button></Link>
          <Link to="/pizza"><button id='order-pizza'>Order Pizza</button></Link>
        </div>
      </nav>

      <Switch>
        <Route path="/pizza" component={Form}/>
          <Route path ="/" component={Home}/>
      </Switch>

    </div>
  )
}
