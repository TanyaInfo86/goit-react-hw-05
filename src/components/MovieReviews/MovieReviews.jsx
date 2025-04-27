import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieReviews } from '/src/services/tmdbApi.js';
import styles from './MovieReviews.module.css';

export default function MovieReviews() {
    const { movieId } = useParams();
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        getMovieReviews(movieId)
            .then(data => setReviews(data.results))
            .catch(error => console.error(error));
    }, [movieId]);

    if (!reviews.length) {
        return <p>We don`t have any reviews for this movie.</p>;
    }

    return (
        <ul className={styles.list}>
            {reviews.map(review => (
                <li key={review.id}>
                    <h4>{review.author}</h4>
                    <p>{review.content}</p>
                </li>
            ))}
        </ul>
    );
}
