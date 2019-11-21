import React from 'react';
import Header from './Header'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Dashboard from './manager/dashboard/Dashboard'
import TodoList from './biker/todolist/TodoList'
import PrivateRoute from './auth/PrivateRoute';
import Login from './auth/Login';

function App() {

  return (
    <Router>
      <Route exact path="/" render={()=>(
          <Login>
            <Header />
          </Login>
        )} />          
        
        <PrivateRoute path="/dashboard" component={Dashboard}/>
        <PrivateRoute path="/todo-list" component={TodoList}/>
        
    </Router>
  );
}

export default App;
