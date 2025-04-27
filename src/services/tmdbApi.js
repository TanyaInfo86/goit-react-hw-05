import axios from 'axios';

const API_KEY = '0e85687544affdaa5039f112a4bc2bd9'; // ключ який виглядає типу: 0e85687544affdaa5039f112a4bc2bd9

const instance = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
});

// Отримати популярні фільми
export const getTrendingMovies = async () => {
    const response = await instance.get('/trending/movie/day', {
        params: { api_key: API_KEY },
    });
    return response.data;
};

// Пошук фільмів за запитом
export const searchMovies = async query => {
    const response = await instance.get('/search/movie', {
        params: { query, include_adult: false, language: 'en-US', page: 1, api_key: API_KEY },
    });
    return response.data;
};

// Детальна інформація про фільм
export const getMovieDetails = async movieId => {
    const response = await instance.get(`/movie/${movieId}`, {
        params: { language: 'en-US', api_key: API_KEY },
    });
    return response.data;
};

// Акторський склад фільму
export const getMovieCredits = async movieId => {
    const response = await instance.get(`/movie/${movieId}/credits`, {
        params: { api_key: API_KEY },
    });
    return response.data;
};

// Огляди фільму
export const getMovieReviews = async movieId => {
    const response = await instance.get(`/movie/${movieId}/reviews`, {
        params: { api_key: API_KEY },
    });
    return response.data;
};
