import React from 'react';
import {HashRouter,BrowserRouter,Switch,Redirect} from 'react-router-dom';
import Menu from './components/Menu';
import NotFound from './components/NotFound';
import './App.css';



function App() {
  return (
    <>
    <BrowserRouter>
      <Switch>
        <HashRouter
            exact
            path="/"
            render={() => (
                <Redirect to="/employees" />
            )}
        />
        <HashRouter exact path="/employees" component={Menu} />
        <HashRouter exact path="/employees/id" component={Menu} />
        <HashRouter exact path="/prizes" component={Menu} />
        <HashRouter exact path="/prizes/id" component={Menu} />
        <HashRouter exact path="/achievements" component={Menu} />

        <HashRouter component={NotFound} />
      </Switch>
    </BrowserRouter>

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
    </>
  );
}

export default App;
