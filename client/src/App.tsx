import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.scss";
import Navigation from "./components/navigation/Navigation";
import HomePage from "./pages/homePage/HomePage";
import Player from "./components/player/Player";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Navigation />
      <HomePage />
      <Player />
    </div>
  );
}

export default App;
