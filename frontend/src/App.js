import { Switch, Route, Redirect } from "react-router-dom";
import Navigation from "./components/Navigation";
import StoreNavBar from "./components/StoreNavBar";
import LoginInvite from "./components/LoginInvite";
import Footer from "./components/Footer";
import GameShowPage from "./components/GameShowPage";
import { useSelector } from "react-redux";
import HomePage from "./components/HomePage";
import Cart from "./components/Cart";

function App() {
  const currentUser = useSelector(state => state.session.user);

  return (
    <>
      <Navigation />
      <StoreNavBar />

        <Switch>

          <Route exact path="/games/:gameId">
            <GameShowPage />
          </Route>

          <Route exact path="/cart">
            {currentUser ? <Cart /> : <Redirect to="/" />}
          </Route>

          <Route path="/"> 
            <HomePage />
          </Route>

        </Switch>

      {!currentUser ? <LoginInvite /> : <></>}
      <Footer />
    </>
  );
}

export default App;
