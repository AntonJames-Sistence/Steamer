import { Switch, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import MainCarousel from "./components/MainCarousel";
import StoreNavBar from "./components/StoreNavBar";
import CategoryCarousel from "./components/CategoryCarousel";
import LoginInvite from "./components/LoginInvite";
import Footer from "./components/Footer";

function App() {

  return (
    <>
      <Navigation />
        <Switch>
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
