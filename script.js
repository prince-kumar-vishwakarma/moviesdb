let IMG_URL = 'https://image.tmdb.org/t/p/w342'
let MOVIE_URL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=1d3b93f2bc047a14fbfc9655f66b9e1e&page=`;
let MOVIE_SEARH_URL = 'https://api.themoviedb.org/3/search/movie?api_key=1d3b93f2bc047a14fbfc9655f66b9e1e&query=';
let MOVIE_POPULAR_URL = `https://api.themoviedb.org/3/movie/popular?sort_by=popularity.desc&api_key=1d3b93f2bc047a14fbfc9655f66b9e1e&page=`;
let MOVIE_UPCOMING_URL = `https://api.themoviedb.org/3/movie/upcoming?sort_by=popularity.desc&api_key=1d3b93f2bc047a14fbfc9655f66b9e1e&page=`;
let MOVIE_TOP_URL = `https://api.themoviedb.org/3/movie/top_rated?sort_by=popularity.desc&api_key=1d3b93f2bc047a14fbfc9655f66b9e1e&page=`;


const container = document.querySelector(".container");
const inp = document.querySelector(".rightNav input");

var main_URL = MOVIE_URL;
moivesDes(main_URL);

async function moivesDes(url) {
    console.log(url);
    let moviesRaw = await fetch(url);
    let moviesJson = await moviesRaw.json();
    var { page, total_pages } = moviesJson;
    console.log(page);
    const pageUpdate = document.querySelector('.page-update');
    if (total_pages == 1) {
        pageUpdate.style.display = 'none';
    }
    else {
        pageUpdate.style.display = 'flex';
    }
    console.log(moviesJson.results.length)
    if (moviesJson.results.length === 0)
        alert('No Result Found for ' + inp.value);
    else
        showMovies(moviesJson.results);
}

function showMovies(movies) {
    container.innerHTML = '';
    movies.forEach(movieJson => {
        let { poster_path, release_date, title, vote_average, overview, type } = movieJson;
        const movieEl = document.createElement('div');
        movieEl.classList.add('movieCard');
        movieEl.innerHTML =
            `
            <div class="moviePoster">
            <title>${title}</title>
                <img src="${poster_path == null ? 'no_image_alt.jpg' : IMG_URL + poster_path}" alt="">
            </div>
            <div class="movieInfo">
                <h1>${title}</h1>
                <h2>Release Year: <span>${release_date}</span></h2>
                <h2>Type: <span>Movie</span></h2>
                <h2>imdb: <span>${vote_average}</span></h2>
                </div>
            <div class="overview">
                <h2>Overview</h2>
                <p>${overview}</p>
            </div>
                `;
        container.appendChild(movieEl);
        inp.value = '';
    });
}

let pageNo = 1;

function search() {
    let btn = document.querySelector(".searchBtn");
    let inp = document.querySelector(".rightNav input");
    let con = document.querySelector(".rightNav");
    const form = document.querySelector(".rightNav");

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        main_URL = MOVIE_SEARH_URL + inp.value + '&page=';
        moivesDes(inp.value === '' ? window.location.reload() : main_URL + pageNo);
    });

}
search();

document.querySelector('header span').addEventListener('click', () => { moivesDes(MOVIE_URL); })
document.querySelector('nav .leftNav ul li:first-child').addEventListener('click', () => { moivesDes(MOVIE_URL); })


const popular = document.querySelector('#popular');
const topURL = document.querySelector('#top');
const upcoming = document.querySelector('#upcoming');

popular.addEventListener('click', () => {
    pageNo = 1;
    main_URL = MOVIE_POPULAR_URL;
    moivesDes(main_URL + pageNo);

});

topURL.addEventListener('click', () => {
    pageNo = 1;
    main_URL = MOVIE_TOP_URL;
    moivesDes(main_URL + pageNo);
});

upcoming.addEventListener('click', () => {
    pageNo = 1;
    main_URL = MOVIE_UPCOMING_URL;
    moivesDes(main_URL + pageNo);
});


function pageChange() {
    const nextPage = document.querySelector('.next-page');
    const prevPage = document.querySelector('.prev-page');
    const currentPageValue = document.querySelector('.current-page-value');
    const nextPageValue = document.querySelector('.next-page-value');
    nextPage.addEventListener('click', () => {
        pageNo++;
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        currentPageValue.innerHTML = pageNo;
        nextPageValue.innerHTML = pageNo + 1;
        moivesDes(main_URL + `${pageNo}`);
    });

    prevPage.addEventListener('click', () => {
        if (pageNo == 1) {
            return;
        }
        else {
            pageNo--;
        }
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        currentPageValue.innerHTML = pageNo;
        nextPageValue.innerHTML = pageNo + 1;
        moivesDes(main_URL + `${pageNo}`);
    });
}

pageChange();
