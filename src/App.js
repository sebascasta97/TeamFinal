import React from 'react';
import {HashRouter,Route,Switch,Redirect} from 'react-router-dom';
import Menu from './components/Menu';
import NotFound from './components/NotFound';
import ListEmployees from './Containers/ListEmployees';
import ListAchievement from './Containers/ListAchievements';
import ListPrizes from './Containers/ListPrizes';
import DetailEmploye from './Containers/DetailsEmploye';
import DetailsPrize from './Containers/DetailsPrize';
import './App.css';
import './animate.css';



function App() {
  return (
    <>
   
    <HashRouter>
      <Menu/>
      <Switch>
        <Route exact path="/" render={ () => (<Redirect to="/employees" />) }   />
        <Route exact path="/employees" component={ListEmployees} />
        <Route exact path="/employees/:id" component={DetailEmploye} />
        <Route exact path="/prizes" component={ListPrizes} />
        <Route exact path="/prizes/:id" component={DetailsPrize} />
        <Route exact path="/achievements" component={ListAchievement} />
       {/*en caso de que no se encuentre la ruta*/}
        <Route component={NotFound} />
      </Switch>
      </HashRouter>

  

    </>
  );
}

export default App;
