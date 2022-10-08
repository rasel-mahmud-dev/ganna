import { createBrowserRouter, Route, RouterProvider } from 'react-router-dom'
import App from './App'
import AddSong from './pages/admin/AddSong'
import FavoriteMusic from './pages/favoriteMusic/FavoriteMusic'
import SongDetail from './pages/songDetail/SongDetail'
import PlayList from './pages/playList/PlayList'
import Geners from './pages/genres/Geners'
import AlbumList from './pages/admin/albumList/AlbumList'
import CurrentPlayQueue from './pages/currentPlayQueue/CurrentPlayQueue'
import Details from './pages/artists/Details'
import NewSongs from './pages/new-songs/NewSongs'
import TrendingSongs from './pages/trending-songs/TrendingSongs'
import LoginPage from './pages/login/LoginPage'
import AdminDashboard from './pages/admin/AdminDashboard'
import DashboardHome from './pages/admin/DashboardHome'
import SongList from './pages/admin/SongList'
import ArtistList from './pages/admin/ArtistList'
import HomePage from './pages/homePage/HomePage'
import Artists from './pages/artists/Artists'

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { path: '/', element: <HomePage /> },
            { path: '/auth/login', element: <LoginPage /> },
            { path: '/auth/registration', element: <LoginPage /> },
            {
                path: '/admin',
                element: <AdminDashboard />,
                children: [
                    { path: 'dashboard', element: <DashboardHome /> },
                    { path: 'add-song', element: <AddSong /> },
                    { path: 'update-song/:id', element: <AddSong /> },
                    { path: 'songs', element: <SongList /> },
                    { path: 'artist', element: <ArtistList /> },
                    { path: 'playlist', element: <PlayList /> },
                    { path: 'albums', element: <AlbumList /> },
                    { path: 'genres', element: <Geners /> },
                ],
            },

            { path: '/artists', element: <Artists /> },
            { path: '/trending-songs', element: <TrendingSongs /> },
            { path: '/new-releases', element: <NewSongs /> },
            { path: '/artists/:name', element: <Details /> },
            { path: '/favorite', element: <FavoriteMusic /> },
            { path: 'albums', element: <AlbumList /> },
            { path: '/genres', element: <Geners /> },
            { path: '/playlist', element: <PlayList /> },
            { path: '/song/:title', element: <SongDetail /> },
            { path: '/player', element: <CurrentPlayQueue /> },
        ],
    },
])

export default function () {
    return <RouterProvider router={router} />
}
