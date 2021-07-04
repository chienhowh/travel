import React from 'react';
import style from './App.module.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { DetailPage, Homepage, Register, SearchPage, SignIn } from './pages';
function App() {
  return (
    <div className={style.App}>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Homepage}></Route>
          <Route path='/signIn' component={SignIn}></Route>
          <Route path='/register' component={Register}></Route>
          <Route path='/detail/:touristRouteId' component={DetailPage}></Route>
          <Route path='/search/:keyword?' component={SearchPage}></Route>
          <Route render={() => <h1>404</h1>}></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
