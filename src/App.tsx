import React, { FunctionComponent, useEffect } from 'react';
import style from './App.module.css';
import { BrowserRouter, Route, Switch, Redirect,HashRouter } from 'react-router-dom'
import { DetailPage, Homepage, PlaceOrder, Register, SearchPage, SignIn } from './pages';
import { ShoppingCart } from './pages';
import { useSelector } from './redux/hooks';
import { useDispatch } from 'react-redux';
import { getShoppingCart } from './redux/shoppingCart/slice';


interface PropsType {
  component: FunctionComponent;
  Authenticated: boolean;
  path: string;
  [propName: string]: any;
}

// 如果有登入返回可連接route，沒有登入就redircet
const PrivatRoute: React.FC<PropsType> = ({ component, Authenticated, ...rest }) => {
  const routeComponent = (props: any) => {
    return Authenticated ? (
      React.createElement(component, props)
    ) : (
      <Redirect to={{ pathname: "/signIn" }} />
    );
  }
  return <Route render={routeComponent} {...rest}></Route>
}

function App() {
  const dispatch = useDispatch();
  const jwt = useSelector(s => s.user.token);

  useEffect(() => {
    // 確定登入，則去摳購物車清單
    if (jwt) {
      dispatch(getShoppingCart(jwt));
    }
  }, [jwt])

  return (
    <div className={style.App}>
      <HashRouter>
        <Switch>
          <Route exact path='/' component={Homepage}></Route>
          <Route path='/signIn' component={SignIn}></Route>
          <Route path='/register' component={Register}></Route>
          <Route path='/detail/:touristRouteId' component={DetailPage}></Route>
          <Route path='/search/:keywords?' component={SearchPage}></Route>
          <PrivatRoute path='/shoppingCart' component={ShoppingCart} Authenticated={jwt !== null}></PrivatRoute>
          <PrivatRoute path='/placeOrder' component={PlaceOrder} Authenticated={jwt !== null}></PrivatRoute>
          <Route render={() => <h1>404</h1>}></Route>
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
