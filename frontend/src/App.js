import { Switch, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import MainCarousel from "./components/MainCarousel";
import StoreNavBar from "./components/StoreNavBar";
import CategoryCarousel from "./components/CategoryCarousel";
import LoginInvite from "./components/LoginInvite";
import Footer from "./components/Footer";
import GameShowPage from "./components/GameShowPage";
import { useSelector } from "react-redux";

function App() {
  const currentUser = useSelector(state => state.session.user);

  return (
    <>
      <Navigation />
      <StoreNavBar />

        <Switch>
          <Route exact path="/games/:gameId" component={GameShowPage} />
          <Route path="/">
            
            <MainCarousel />
            <CategoryCarousel />
            
          </Route>
        </Switch>

      {!currentUser ? <LoginInvite /> : <></>}
      <Footer />
    </>
  );
}

export default App;
