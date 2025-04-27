import { useEffect, useState, Suspense } from 'react';
import { useParams, Link, Outlet, useLocation } from 'react-router-dom';
import { getMovieDetails } from '/src/services/tmdbApi.js';
import { FaArrowLeft } from 'react-icons/fa';
import styles from './MovieDetailsPage.module.css';

export default function MovieDetailsPage() {
    const { movieId } = useParams();
    const location = useLocation();
    const from = location.state?.from ?? '/movies';
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        getMovieDetails(movieId)
            .then(data => setMovie(data))
            .catch(error => console.error(error));
    }, [movieId]);

    if (!movie) return <p>Loading...</p>;

    const posterUrl = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : '';

    return (
        <div className={styles.container}>
            <Link to={from} className={styles.backLink}>
                <FaArrowLeft className={styles.icon} />
                Go back
            </Link>

            <div className={styles.details}>
                {posterUrl && <img src={posterUrl} alt={movie.title} className={styles.poster} />}
                <div className={styles.info}>
                    <h2>{movie.title}</h2>
                    <p>User Score: {Math.round(movie.vote_average * 10)}%</p>
                    <h3>Overview</h3>
                    <p>{movie.overview}</p>
                    <h3>Genres</h3>
                    <p>{movie.genres.map(genre => genre.name).join(', ')}</p>
                </div>
            </div>

            <div className={styles.additional}>
                <h3>Additional information</h3>
                <ul>
                    <li><Link to="cast" state={{ from }}>Cast</Link></li>
                    <li><Link to="reviews" state={{ from }}>Reviews</Link></li>
                </ul>
            </div>

            <Suspense fallback={<div>Loading additional info...</div>}>
                <Outlet />
            </Suspense>
        </div>
    );
}
