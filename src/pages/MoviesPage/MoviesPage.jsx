import { useState } from 'react';
import { searchMovies } from '/src/services/tmdbApi.js';
import MovieList from '/src/components/MovieList/MovieList';
import styles from './MoviesPage.module.css';

export default function MoviesPage() {
    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState([]);

    const handleSubmit = async event => {
        event.preventDefault();
        if (!query.trim()) return;
        try {
            const data = await searchMovies(query);
            setMovies(data.results);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <main className={styles.main}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <input
                    type="text"
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    placeholder="Search movies..."
                    className={styles.input}
                />
                <button type="submit" className={styles.button}>Search</button>
            </form>
            <MovieList movies={movies} />
        </main>
    );
}
