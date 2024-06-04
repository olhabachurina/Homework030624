import MovieService from './MovieService.js';
import DOMHandler from './DOMHandler.js';

const apiKey = '5e96da99';
const movieService = new MovieService(apiKey);
const domHandler = new DOMHandler();

let currentPage = 1;
let currentTitle = '';
let currentType = '';
let totalResults = 0;

document.getElementById('searchForm').addEventListener('submit', function (event) {
    event.preventDefault();
    searchMovies(1);
});

async function searchMovies(page) {
    const title = document.getElementById('movieTitle').value;
    const type = document.getElementById('movieType').value;

    if (page === 1) {
        currentTitle = title;
        currentType = type;
        domHandler.clearResults();
    }

    currentPage = page;

    try {
        showLoadingSpinner();
        const data = await movieService.search(currentTitle, currentType, currentPage);
        if (data.Response === "True") {
            totalResults = parseInt(data.totalResults);
            domHandler.displayResults(data.Search, currentPage);
            if (totalResults > currentPage * 10) {
                domHandler.showMoreButton();
            } else {
                domHandler.hideMoreButton();
            }
        } else {
            if (page === 1) {
                domHandler.clearResults();
                domHandler.resultsDiv.innerHTML = '<p>Movie not found!</p>';
            }
        }
    } catch (error) {
        console.error('Error:', error);
    } finally {
        hideLoadingSpinner();
    }
}

async function loadMoreMovies() {
    currentPage++;
    await searchMovies(currentPage);
}

async function getDetails(imdbID) {
    try {
        showLoadingSpinner();
        const data = await movieService.getMovie(imdbID);
        domHandler.displayDetails(data);
    } catch (error) {
        console.error('Error:', error);
    } finally {
        hideLoadingSpinner();
    }
}

function showLoadingSpinner() {
    document.getElementById('loadingSpinner').style.display = 'block';
}

function hideLoadingSpinner() {
    document.getElementById('loadingSpinner').style.display = 'none';
}

window.getDetails = getDetails;
window.loadMoreMovies = loadMoreMovies;