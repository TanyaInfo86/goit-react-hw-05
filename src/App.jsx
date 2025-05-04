import { Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Navigation from './components/Navigation/Navigation';
import styles from './App.module.css';

// Lazy loading components
const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const MoviesPage = lazy(() => import('./pages/MoviesPage/MoviesPage'));
const MovieDetailsPage = lazy(() => import('./pages/MovieDetailsPage/MovieDetailsPage'));
const MovieCast = lazy(() => import('./components/MovieCast/MovieCast'));
const MovieReviews = lazy(() => import('./components/MovieReviews/MovieReviews'));

export default function App() {
    return (
        <div className={styles.wrapper}>
            <Navigation />
            <Suspense fallback={<div className={styles.loading}>Завантаження...</div>}>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/movies" element={<MoviesPage />} />
                    <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
                        <Route path="cast" element={<MovieCast />} />
                        <Route path="reviews" element={<MovieReviews />} />
                    </Route>
                    <Route path="*" element={<div className={styles.loading}>404 Not Found</div>} />
                </Routes>
            </Suspense>
        </div>
    );
}
