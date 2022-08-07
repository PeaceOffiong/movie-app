const API_URL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=edcc5c287f46064d8c993eb4a03ad87c&page=1";
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCH_URl = 'https://api.themoviedb.org/3/search/movie?api_key=edcc5c287f46064d8c993eb4a03ad87c&query=1"'

const form = document.getElementById("form")
const search = document.getElementById("search")
const main = document.getElementById("main")

getMovies(API_URL)

async function getMovies(url) {
    const res = await fetch(url)
    const data = await res.json()
    showMovies(data.results)
}

function showMovies(movies) {
    main.innerHtml = ''
    movies.forEach((movie) => {
        const { title, poster_path, vote_average, overview } = movie
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie')
        movieEl.innerHTML =`
                                    <img src="${IMG_PATH + poster_path}" srcset="${title}">
                                <div class="movie-info">
                                    <h3>${title}</h3>
                                    <span class="${getCLassByRate(vote_average)}">${vote_average}</span>
                                </div>
                                <div class="overview">${overview}</div>
                                </div>
                            `
        main.appendChild(movieEl)
    });
}

function getCLassByRate(vote) {
    if (vote >= 8) {
        return "green"
    } else if (vote >= 5) {
        return "orange"
    } else {
        return 'red'
    }

    
}

form.addEventListener("submit", (e) => {
    e.preventDefault()

    const searchTerm = search.value;
    if (searchTerm && searchTerm !== '') {
        getMovies(SEARCH_URl + searchTerm)

        search.value =""
    } else {
        window.location.reload()
    }
})

