export default class DOMHandler {
    constructor() {
        this.resultsDiv = document.getElementById('results');
        this.moreButtonContainer = document.getElementById('moreButtonContainer');
        this.detailsDiv = document.getElementById('movieDetails');
    }

    clearResults() {
        this.resultsDiv.innerHTML = '';
        this.moreButtonContainer.style.display = 'none';
    }

    displayResults(movies, currentPage) {
        const pageContainer = document.createElement('div');
        pageContainer.classList.add('movies-container');
        pageContainer.id = `page-${currentPage}`;
        this.resultsDiv.appendChild(pageContainer);

        const pageHeader = document.createElement('h3');
        pageHeader.textContent = `Page ${currentPage}`;
        pageContainer.appendChild(pageHeader);

        movies.forEach(movie => {
            const movieDiv = document.createElement('div');
            movieDiv.classList.add('movie-item');
            const poster = movie.Poster !== "N/A" ? movie.Poster : 'no-photo.jpg';
            movieDiv.innerHTML = `
                <img src="${poster}" alt="${movie.Title}">
                <h3>${movie.Title}</h3>
                <p>${movie.Year}</p>
                <button onclick="getDetails('${movie.imdbID}')">Details</button>
            `;
            pageContainer.appendChild(movieDiv);
        });

        for (let i = 1; i < currentPage; i++) {
            const previousPageContainer = document.getElementById(`page-${i}`);
            if (previousPageContainer) {
                previousPageContainer.style.display = 'none';
            }
        }

        pageContainer.style.display = 'flex';
    }

    showMoreButton() {
        this.moreButtonContainer.style.display = 'block';
    }

    hideMoreButton() {
        this.moreButtonContainer.style.display = 'none';
    }

    displayDetails(movie) {
        const poster = movie.Poster !== "N/A" ? movie.Poster : 'no-photo.jpg';
        this.detailsDiv.innerHTML = `
            <div class="movie-info">
                <img src="${poster}" alt="Poster">
                <div class="info">
                    <h2>${movie.Title}</h2>
                    <p><strong>Released:</strong> ${movie.Released}</p>
                    <p><strong>Genre:</strong> ${movie.Genre}</p>
                    <p><strong>Country:</strong> ${movie.Country}</p>
                    <p><strong>Director:</strong> ${movie.Director}</p>
                    <p><strong>Writer:</strong> ${movie.Writer}</p>
                    <p><strong>Actors:</strong> ${movie.Actors}</p>
                    <p><strong>Awards:</strong> ${movie.Awards}</p>
                </div>
            </div>
        `;
    }
}