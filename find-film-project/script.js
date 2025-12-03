document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const movieImage = document.getElementById('movieImage');
    const movieTitle = document.getElementById('movieTitle');
    const movieQuote = document.getElementById('movieQuote');

    const movies = [
        {
            title: "Джон Уик",
            quote: "Я дитя Беларуси",
            image: "web/john_wick.jpg"
        },
        {
            title: "Криминальное чтиво",
            quote: "Английский, ублюдок, ты говоришь на нём?",
            image: "web/CriminalChtivo.png"
        },
        {
            title: "Побег из Шоушенка",
            quote: "Надежда - хорошая вещь, может, лучшая из вещей",
            image: "web/pobegIzShow.jpg"
        },
        {
            title: "Начало",
            quote: "Идея - как вирус",
            image: "web/nachalo.jpg"
        },
        {
            title: "Форрест Гамп",
            quote: "Жизнь как коробка шоколадных конфет",
            image: "web/forestGump.jpg"
        }
    ];

    function getRandomMovie() {
        return movies[Math.floor(Math.random() * movies.length)];
    }

    function updateMovieInfo(movie) {
        movieTitle.textContent = movie.title;
        movieQuote.textContent = `"${movie.quote}"`;
        
        if (movie.image.startsWith('http')) {
            movieImage.src = movie.image;
            movieImage.alt = movie.title;
        } else {
            movieImage.src = movie.image;
            movieImage.alt = movie.title;
        }
        
        movieImage.classList.add('fade-in');
        setTimeout(() => {
            movieImage.classList.remove('fade-in');
        }, 500);
    }

    function searchMovie(query) {
        if (!query.trim()) {
            showMessage("Введите фразу для поиска", "error");
            return;
        }

        const queryLower = query.toLowerCase();
        const foundMovies = movies.filter(movie => 
            movie.quote.toLowerCase().includes(queryLower) ||
            movie.title.toLowerCase().includes(queryLower)
        );

        if (foundMovies.length > 0) {
            const randomMovie = foundMovies[Math.floor(Math.random() * foundMovies.length)];
            updateMovieInfo(randomMovie);
            showMessage(`Найден фильм: ${randomMovie.title}`, "success");
        } else {
            const randomMovie = getRandomMovie();
            updateMovieInfo(randomMovie);
            showMessage("Фильм не найден. Показываем случайный", "info");
        }
    }

    function showMessage(text, type) {
        const message = document.createElement('div');
        message.className = `message message-${type}`;
        message.textContent = text;
        message.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 25px;
            border-radius: 7px;
            color: white;
            font-weight: bold;
            z-index: 1000;
            animation: slideIn 0.3s ease-out;
        `;

        if (type === 'success') {
            message.style.background = '#27ae60';
        } else if (type === 'error') {
            message.style.background = '#e74c3c';
        } else {
            message.style.background = '#3498db';
        }

        document.body.appendChild(message);

        setTimeout(() => {
            message.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => {
                document.body.removeChild(message);
            }, 300);
        }, 3000);
    }

    function addAnimationStyles() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
            
            .fade-in {
                animation: fadeIn 0.5s ease-out;
            }
            
            @keyframes fadeIn {
                from {
                    opacity: 0;
                }
                to {
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);
    }

    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const query = searchInput.value.trim();
        searchMovie(query);
        searchInput.blur();
    });

    searchButton.addEventListener('click', function() {
        const query = searchInput.value.trim();
        searchMovie(query);
        searchInput.blur();
    });

    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            const query = searchInput.value.trim();
            searchMovie(query);
            searchInput.blur();
        }
    });

    searchInput.addEventListener('input', function() {
        if (this.value.trim()) {
            this.style.borderBottomColor = '#FC4100';
        } else {
            this.style.borderBottomColor = '#B77862';
        }
    });

    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.key === 'k') {
            e.preventDefault();
            searchInput.focus();
        }
    });

    addAnimationStyles();
    updateMovieInfo(getRandomMovie());
});