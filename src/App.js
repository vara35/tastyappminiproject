import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'
import LoginRoute from './components/LoginRoute'
import ProtectedRoute from './components/ProtectedRoute'
import SpecificRestaurant from './components/SpecificRestaurant'
import Cart from './components/Cart'
import Notfound from './components/Notfound'

import Home from './components/Home'
import './App.css'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" component={LoginRoute} />
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute
        exact
        path="/restaurant/:id"
        component={SpecificRestaurant}
      />
      <ProtectedRoute exact path="/cart" component={Cart} />
      <Route path="/not-found" component={Notfound} />
      <Redirect to="/not-found" />
    </Switch>
  </BrowserRouter>
)

export default App
