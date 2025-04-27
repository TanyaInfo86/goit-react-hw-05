import { useState, useEffect } from 'react';
import { getTrendingMovies } from '/src/services/tmdbApi.js';
import MovieList from '/src/components/MovieList/MovieList';
import styles from './HomePage.module.css';

export default function HomePage() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        getTrendingMovies()
            .then(data => setMovies(data.results))
            .catch(error => console.error(error));
    }, []);

    return (
        <main className={styles.main}>
            <h1>Trending Movies</h1>
            <MovieList movies={movies} />
        </main>
    );
}
