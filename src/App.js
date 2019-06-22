import React from 'react';
import {HashRouter,Route,Switch,Redirect} from 'react-router-dom';
import Menu from './components/Menu';
import NotFound from './components/NotFound';
import './App.css';



function App() {
  return (
    <>
    <HashRouter>
      <Switch>
        <Route exact path="/" render={ () => (<Redirect to="/employees" />) }   />
        <Route exact path="/employees" component={Menu} />
        <Route exact path="/employees/id" component={Menu} />
        <Route exact path="/prizes" component={Menu} />
        <Route exact path="/prizes/id" component={Menu} />
        <Route exact path="/achievements" component={Menu} />
       {/*en caso de que no se encuentre la ruta*/}
        <Route component={NotFound} />
      </Switch>
      </HashRouter>
{/* 
    <ul className="MenuContainer">
                    <li  className="itemMenu">
                        <p>Team Int</p>
                    </li >
                    <li   className="itemMenu">
                        <p>Employees</p>
                    </li >
                    <li  className="itemMenu">
                        <p>Prizes</p>
                    </li >
                    <li   className="itemMenu">
                        <p>archivements</p>
                    </li >
                    <li   className="itemMenu">
                        <p>Profile</p>
                    </li >
                    <li   className="itemMenu">
                        <p>Logout</p>
                    </li >
                   
            </ul>
            */}
    </>
  );
}

export default App;
