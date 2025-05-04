import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchMovies } from '/src/services/tmdbApi.js';
import MovieList from '/src/components/MovieList/MovieList';
import styles from './MoviesPage.module.css';

export default function MoviesPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get('query') || '';
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = event => {
        event.preventDefault();
        const form = event.currentTarget;
        const value = form.elements.query.value.trim();
        if (!value) return;
        setSearchParams({ query: value });
    };

    useEffect(() => {
        if (!query) return;

        async function fetchMovies() {
            setLoading(true);
            setError(null);
            try {
                const data = await searchMovies(query);
                setMovies(data.results);
            } catch (err) {
                setError('Сталася помилка під час завантаження фільмів.');
            } finally {
                setLoading(false);
            }
        }

        fetchMovies();
    }, [query]);

    return (
        <main className={styles.main}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <input
                    type="text"
                    name="query"
                    defaultValue={query}
                    placeholder="Search movies..."
                    className={styles.input}
                />
                <button type="submit" className={styles.button}>Search</button>
            </form>

            {loading && <p className={styles.status}>Завантаження...</p>}
            {error && <p className={styles.error}>{error}</p>}
            {!loading && !error && <MovieList movies={movies} />}
        </main>
    );
}
