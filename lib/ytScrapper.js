const axios = require('axios');
const cheerio = require('cheerio');

// Function to get YouTube trailer for a movie
export async function getMovieTrailer(movie) {
    try {
        const searchQuery = `${movie.title} trailer`;
        console.log("searchQuery", searchQuery);
        const encodedSearchQuery = searchQuery.split(' ').join('+')
        console.log("encodedSearchQuery", encodedSearchQuery);
        const searchUrl = `https://www.youtube.com/results?search_query=${encodedSearchQuery}`;

        const response = await fetch(searchUrl)
        const $ = cheerio.load(response.data);
        const videoLink = $('a#thumbnail').attr('href');

        if (videoLink) {
            const videoId = videoLink.split('=')[1].split('&')[0];
            const trailerLink = `https://www.youtube.com/watch?v=${videoId}`;
            console.log(`Trailer Link for '${movie.title}': ${trailerLink}`);
        } else {
            console.log(`No trailer found for '${movie.title}'`);
        }
    } catch (error) {
        console.error(`Error retrieving trailer for '${movie.title}':`, error);
    }
}


