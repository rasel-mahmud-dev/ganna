import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.scss";
import Navigation from "./components/navigation/Navigation";
import HomePage from "./pages/homePage/HomePage";
import Player from "./components/player/Player";
import LoginPage from "./pages/login/LoginPage";
import { Router, Routes, Route } from "react-router-dom";
import { loginWihToken } from "./store/actions/userAction";
import useStore from "./store/useStore";
import AddSong from "./pages/admin/AddSong";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ArtistList from "./pages/admin/ArtistList";
import SongList from "./pages/admin/SongList";
import DashboardHome from "./pages/admin/DashboardHome";
import Artists from "./pages/artists/Artists";
import Footer from "./components/footer/Footer";
import SongDetail from "./pages/songDetail/SongDetail";
import LeftSidebar from "./components/leftSidebar/LeftSidebar";
import { ACTION_TYPES } from "./store/types";
import FavoriteMusic from "./pages/favoriteMusic/FavoriteMusic";
import { fetchFavoriteListAction } from "./store/actions/songAction";
import Details from "./pages/artists/Details";
import Alert from "./components/alert/Alert";
import AlbumList from "./pages/admin/albumList/AlbumList";
import Geners from "./pages/genres/Geners";
import PlayList from "./pages/playList/PlayList";

function App() {
  const [count, setCount] = useState(0);
  const [{ isOpenLeftSidebar, auth, alertMessage }, dispatch] = useStore();

  useEffect(() => {
    loginWihToken(dispatch);

    fetchFavoriteListAction(dispatch);
  }, []);

  function handleCloseSidebar() {
    dispatch({
      type: ACTION_TYPES.TOGGLE_LEFT_SIDEBAR,
    });
  }

  return (
    <div className="App">
      
      { alertMessage && <Alert message={alertMessage}  /> }
      <Navigation />

      <div className="app-root">
        
        <LeftSidebar
            auth={auth}
            onClose={handleCloseSidebar}
            isOpenLeftSidebar={isOpenLeftSidebar}
        />

        <div className="app-content">
          <Routes>
            <Route path="/auth/login" element={<LoginPage />} />

            <Route path="/" element={<HomePage />} />
            <Route path="/admin" element={<AdminDashboard />}>
              <Route path="dashboard" element={<DashboardHome />} />
              <Route path="add-song" element={<AddSong />} />
              <Route path="update-song/:id" element={<AddSong />} />
              <Route path="songs" element={<SongList />} />
              <Route path="artist" element={<ArtistList />} />
              <Route path="playlist" element={<PlayList />} />
              <Route path="albums" element={<AlbumList />} />
              <Route path="genres" element={<Geners />} />
            </Route>
            <Route path="/artists" element={<Artists />} />
            <Route path="/artists/:name" element={<Details />} />
            <Route path="/favorite" element={<FavoriteMusic />} />
            <Route path="albums" element={<AlbumList />} />
            <Route path="/genres" element={<Geners />} />
            <Route path="/playlist" element={<PlayList />} />
            <Route path="/song/:title" element={<SongDetail />} />
          </Routes>
          <Footer />
        </div>

        <Player />
      </div>
    </div>
  );
}

export default App;
