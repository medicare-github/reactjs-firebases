import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Dashboard from '../dashboard';
import Login from '../login';
import Register from '../register';
import { Provider} from 'react-redux';
import { store } from '../../../config/redux'





function App() {
  return (

    <Provider store={store}>
      <Router>
        <Route path="/" exact component={Dashboard} />
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
      </Router>
    </Provider>
  );
}

export default App;
