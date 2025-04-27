import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieCredits } from '/src/services/tmdbApi.js';
import styles from './MovieCast.module.css';

export default function MovieCast() {
    const { movieId } = useParams();
    const [cast, setCast] = useState([]);

    useEffect(() => {
        getMovieCredits(movieId)
            .then(data => setCast(data.cast))
            .catch(error => console.error(error));
    }, [movieId]);

    if (!cast.length) {
        return <p>No cast information available.</p>;
    }

    return (
        <ul className={styles.list}>
            {cast.map(actor => (
                <li key={actor.id}>
                    {actor.profile_path && (
                        <img
                            src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                            alt={actor.name}
                            className={styles.actorImage}
                        />
                    )}
                    <p>{actor.name} as {actor.character}</p>
                </li>
            ))}
        </ul>
    );
}
