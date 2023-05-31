import { Switch, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import MainCarousel from "./components/MainCarousel";
import StoreNavBar from "./components/StoreNavBar";
import CategoryCarousel from "./components/CategoryCarousel";
import LoginInvite from "./components/LoginInvite";
import Footer from "./components/Footer";
import GameShowPage from "./components/GameShowPage";

function App() {

  return (
    <>
      <Navigation />
        <Switch>
          <Route exact path="/games/:gameId" component={GameShowPage} />
          <Route path="/">
            <StoreNavBar />
            <MainCarousel />
            <CategoryCarousel />
            <LoginInvite />
            <Footer />
          </Route>
        </Switch>
    </>
  );
}

export default App;
