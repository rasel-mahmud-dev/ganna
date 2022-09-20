import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.scss";
import Navigation from "./components/navigation/Navigation";
import HomePage from "./pages/homePage/HomePage";
import Player from "./components/player/Player";
import LoginPage from "./pages/login/LoginPage";
import {Router, Routes, Route} from "react-router-dom"

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Navigation />
      <Routes>
        
        <Route path="/auth/login" element={ <LoginPage />} />
        
        <Route path="/" element={<HomePage />} />
        
        {/*<Player />*/}
      </Routes>
    </div>
  );
}

export default App;
