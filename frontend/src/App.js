import { Switch, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Carousel from "./components/carousel";

function App() {
  return (
    <>
      <Navigation />
        <Switch>
          <Route path="/">
            <Carousel />
          </Route>
        </Switch>
    </>
  );
}

export default App;
