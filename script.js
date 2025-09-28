// script.js - Movie Data and Interactive Features

// --- 1. MOVIE CATALOG CREATION (Data) ---
const movies = [
    {
        id: 101,
        title: "The Dream Weaver",
        genre: "Sci-Fi",
        year: 2010,
        image: "posters/movie1.jpg", 
        ratings: [4, 5, 3], // Example user scores (out of 5)
        reviews: [],
    },
    {
        id: 102,
        title: "The Grand Adventure",
        genre: "Action",
        year: 2023,
        image: "posters/movie2.jpg",
        ratings: [5, 5, 4, 5],
        reviews: [],
    },
    {
        id: 103,
        title: "Silent Witness",
        genre: "Drama",
        year: 2020,
        image: "posters/movie3.jpg",
        ratings: [3, 4, 3],
        reviews: [],
    }
    // Add more movies here!
];

let selectedMovieId = null; // Used to track which movie is being reviewed

// --- 2. MOVIE DISPLAY LOGIC (Interactive Features) ---

// Function to calculate the average rating 
function calculateAverage(ratings) {
    if (ratings.length === 0) return 0;
    const sum = ratings.reduce((acc, rating) => acc + rating, 0);
    return (sum / ratings.length).toFixed(1); // One decimal place
}

// Function to dynamically generate and display all movie cards
function displayMovies(movieArray = movies) {
    const gallery = document.getElementById('movie-gallery');
    gallery.innerHTML = ''; // Clear gallery before loading

    movieArray.forEach(movie => {
        const avgRating = calculateAverage(movie.ratings);
        
        const card = document.createElement('div');
        card.className = 'movie-card';
        card.innerHTML = `
            <img src="${movie.image}" alt="${movie.title} Poster">
            <h3>${movie.title} (${movie.year})</h3>
            <p>Genre: ${movie.genre}</p>
            <p style="font-weight: bold; color: #3f51b5;">
                ⭐ Avg Rating: ${avgRating} / 5 (${movie.ratings.length} votes)
            </p>
            <button onclick="openReviewModal(${movie.id})">Add Your Review</button>
        `;
        gallery.appendChild(card);
    });
}

// Function to handle opening the review modal
function openReviewModal(movieId) {
    selectedMovieId = movieId; // Store the ID globally
    const movie = movies.find(m => m.id === movieId);
    document.getElementById('modal-movie-title').textContent = movie.title;
    document.getElementById('review-modal').classList.remove('hidden');
}


// --- RUN THE DISPLAY FUNCTION ---
displayMovies();
// script.js - Part 3: Genre Filtering Logic

// Function to dynamically fill the genre dropdown and set up the filter listener
function setupGenreFilter() {
    const genreFilter = document.getElementById('genre-filter');
    
    // 1. Get all unique genres from the movie list
    const uniqueGenres = [...new Set(movies.map(movie => movie.genre))];

    // 2. Add each unique genre as an <option>
    uniqueGenres.forEach(genre => {
        const option = document.createElement('option');
        option.value = genre;
        option.textContent = genre;
        genreFilter.appendChild(option);
    });
    
    // 3. Listen for changes in the dropdown
    genreFilter.addEventListener('change', (e) => {
        const selectedGenre = e.target.value;
        filterMovies(selectedGenre);
    });
}

// Function to filter the array and refresh the display
function filterMovies(genre) {
    let filteredMovies = [];
    if (genre === 'all') {
        filteredMovies = movies;
    } else {
        filteredMovies = movies.filter(movie => movie.genre === genre);
    }
    // Re-render the gallery using the displayMovies function you already wrote
    displayMovies(filteredMovies);
}

// RUN the setup function when the script loads
setupGenreFilter();

// script.js - Part 4: Review Submission and Modal Handlers

// Function to update data and display
function updateMovieData(movieId, newRating, newReviewText) {
    const movieIndex = movies.findIndex(m => m.id === movieId);
    if (movieIndex === -1) return;

    // 1. Add the new rating to the movie object
    movies[movieIndex].ratings.push(newRating);
    
    // 2. Add the review text
    if (newReviewText) {
        movies[movieIndex].reviews.push(newReviewText);
    }

    // 3. Re-render the gallery to show the new average rating
    displayMovies();
}

// --- Event Listener for the Review Form Submission ---
document.getElementById('review-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevents the page from reloading

    // Get values from the form inputs
    const ratingInput = this.elements['rating'].value;
    const reviewText = document.getElementById('review-text').value.trim();
    
    const newRating = parseInt(ratingInput, 10);

    // Call the function to update the data using the ID stored when the modal opened
    updateMovieData(selectedMovieId, newRating, reviewText);

    // Close the modal and reset the form
    document.getElementById('review-modal').classList.add('hidden');
    this.reset();
    
    alert(`Thank you! Review submitted for: ${document.getElementById('modal-movie-title').textContent}`);
});

// --- Event Listener for closing the modal button ---
document.getElementById('close-modal-btn').addEventListener('click', () => {
    document.getElementById('review-modal').classList.add('hidden');
    document.getElementById('review-form').reset();
});
