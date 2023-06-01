import { Switch, Route } from "react-router-dom";
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

          <Route exact path="/games/:gameId" component={GameShowPage} />
          <Route exact path="/cart" component={Cart} />
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
