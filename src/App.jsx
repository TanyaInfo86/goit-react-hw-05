import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import MoviesPage from './pages/MoviesPage/MoviesPage';
import MovieDetailsPage from './pages/MovieDetailsPage/MovieDetailsPage';
import MovieCast from './components/MovieCast/MovieCast';
import MovieReviews from './components/MovieReviews/MovieReviews';
import Navigation from './components/Navigation/Navigation';
import styles from './App.module.css'; 

export default function App() {
    return (
        <div className={styles.wrapper}>
            <Navigation />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/movies" element={<MoviesPage />} />
                <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
                    <Route path="cast" element={<MovieCast />} />
                    <Route path="reviews" element={<MovieReviews />} />
                </Route>
                <Route path="*" element={<div className={styles.loading}>404 Not Found</div>} />
            </Routes>
        </div>
    );
}
