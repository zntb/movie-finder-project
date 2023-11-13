document.getElementById("search").onsubmit = async function (event) {
  event.preventDefault();
  let searchWord = event.target.elements.search.value;
  let year = event.target.elements.year.value;

  if (!searchWord) {
    alert("Keresomezo kitoltese kotelezo!");
    return;
  }

  let url = `https://www.omdbapi.com/?s=${encodeURI(
    searchWord
  )}&y=${year}i=tt3896198&apikey=27147d94`;

  try {
    let response = await fetch(url);

    if (!response.ok) {
      alert("Kereses sikertelen!");
      return;
    }

    let movieResponse = await response.json();

    if (!movieResponse.Search) {
      alert("Kereses sikertelen!");
      return;
    }

    renderMovieList(movieResponse.Search);
  } catch (error) {
    console.error("Hiba történt:", error);
  }
};

function renderMovieList(movies) {
  let movieListTemplate = "";

  for (let movie of movies) {
    movieListTemplate =
      movieListTemplate +
      `
    <li>
        <div class="poster-wrap">
          <a>
            <img src="${movie.Poster}" class="movie-poster" />
          </a>
        </div>
        <p data-imdbid="${movie.imdbID}" class="single-movie-btn">
          <span class="movie-title">
            ${movie.Title}
          </span>
        </p>
          <span class="movie-year">
            ${movie.Year}
          </span>
      </li>
    `;
  }

  document.getElementById("movies").innerHTML = movieListTemplate;

  let movieTitles = document.querySelectorAll(".single-movie-btn");

  for (let movieTitle of movieTitles) {
    movieTitle.onclick = function (event) {
      let url = `https://www.omdbapi.com/?i=${event.target.parentElement.dataset.imdbid}&apikey=27147d94`;

      fetch(url)
        .then(function (response) {
          return response.json();
        })
        .then(function (singleMovie) {
          document.getElementById("movie-description").innerHTML = `
          <h1>${singleMovie.Title}</h1>
          <p>${singleMovie.Plot}</p>
          `;
        })
        .catch(function (error) {
          console.error("Hiba történt:", error);
        });
    };
  }
}

