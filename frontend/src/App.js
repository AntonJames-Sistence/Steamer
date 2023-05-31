import { Switch, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import MainCarousel from "./components/MainCarousel";
import StoreNavBar from "./components/StoreNavBar";
import CategoryCarousel from "./components/CategoryCarousel";

function App() {

  return (
    <>
      <Navigation />
        <Switch>
          <Route path="/">
            <StoreNavBar />
            <MainCarousel />
            <CategoryCarousel />
          </Route>
        </Switch>
    </>
  );
}

export default App;
