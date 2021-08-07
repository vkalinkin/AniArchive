/* global data */
/* exported data */
const $resultsList = document.querySelector('.resultsList');
const $searchBox = document.querySelector('#searchBox');

const $searchSelect = document.querySelector('.searchSelect');
const $seasonSearch = document.querySelector('.seasonSearch');
const $termSearch = document.querySelector('.termSearch');

const $termButton = document.querySelector('.termButton');
const $seasonButton = document.querySelector('.seasonButton');

const $animeRadio = document.querySelector('#anime');
const $mangaRadio = document.querySelector('#manga');

const $pastOrPresent = document.querySelector('.pastOrPresent');
const $latestRadio = document.querySelector('#latest');
const $previousRadio = document.querySelector('#previous');
const $dropDowns = document.querySelector('.dropDowns');
const $yearDropDown = document.querySelector('#yearDropDown');
const $seasonDropDown = document.querySelector('#seasonDropDown');

const $modal = document.querySelector('.modal');
const $modalContent = document.querySelector('.modalContent');

const $myList = document.querySelector('.myList');
const $goSearchBut = document.querySelector('.goSearchBut');
const $searches = document.querySelector('.searches');

const $radioYesFilter = document.querySelector('#yesFilter');
const $radioNoFilter = document.querySelector('#noFilter');

const $resultsTitle = document.querySelector('.resultsTitle');

const $splash = document.querySelector('.splash');
const $standardView = document.querySelector('.standardView');
const $myListSplash = document.querySelector('.myListSplash');
const $goSearchButSplash = document.querySelector('.goSearchButSplash');

const $headerImage = document.querySelector('.headerImage');

let searchTerm = '';

let season = '2021summer';

function buildAnime(searchResults, type) {
  $resultsList.replaceChildren();
  if (searchResults === undefined || searchResults.length === 0) {
    const noResults = document.createElement('h3');
    noResults.textContent = 'Sorry, no results found for ' + searchTerm + ', try a different term.';
    $resultsList.appendChild(noResults);
  } else {
    for (let a = 0; a < searchResults.length; a++) {
      let seriesObj = {};
      seriesObj = searchResults[a];
      const $series50 = document.createElement('div');
      $series50.className = 'series50';

      const showImage = document.createElement('img');
      showImage.setAttribute('src', seriesObj.image_url);
      $series50.appendChild(showImage);

      const titleDiv = document.createElement('div');
      titleDiv.textContent = seriesObj.title;
      $series50.appendChild(titleDiv);

      const typeDiv = document.createElement('div');
      typeDiv.textContent = seriesObj.type;
      $series50.appendChild(typeDiv);

      let yr;
      const yearDiv = document.createElement('div');
      if (type === 'term') {
        if (seriesObj.start_date === null) {
          yearDiv.textContent = 'Unknown date';
          yr = null;
        } else {
          let yearString = String(seriesObj.start_date);
          yearString = yearString.slice(0, 4);
          yearDiv.textContent = yearString;
          yr = yearString;
        }

      } else {
        let yearAirString = String(seriesObj.airing_start);
        yearAirString = yearAirString.slice(0, 4);
        yearDiv.textContent = yearAirString;
        yr = yearAirString;
      }

      $series50.appendChild(yearDiv);

      const episodesDiv = document.createElement('div');
      episodesDiv.textContent = 'Episode(s): ' + seriesObj.episodes;
      $series50.appendChild(episodesDiv);

      const butDiv = document.createElement('div');
      butDiv.className = 'butDiv';
      $series50.appendChild(butDiv);

      const moreInfoButtonSpan = document.createElement('span');
      moreInfoButtonSpan.textContent = 'More Info';
      moreInfoButtonSpan.className = 'moreInfoButton';
      moreInfoButtonSpan.setAttribute('id', seriesObj.mal_id);
      moreInfoButtonSpan.setAttribute('medium', 'anime');
      butDiv.appendChild(moreInfoButtonSpan);

      const iStar = document.createElement('i');
      iStar.className = 'far fa-star';
      const currentId = seriesObj.mal_id.toString();

      for (let b = 0; b < data.animeIDs.length; b++) {
        const currentCheckAgainst = data.animeIDs[b];

        if (currentId === currentCheckAgainst) {
          iStar.className = 'fas fa-star';
          break;
        }
      }
      iStar.setAttribute('title', seriesObj.title);
      iStar.setAttribute('type', seriesObj.type);
      iStar.setAttribute('year', yr);
      iStar.setAttribute('episodes', seriesObj.episodes);
      iStar.setAttribute('id', seriesObj.mal_id);
      iStar.setAttribute('img', seriesObj.image_url);

      butDiv.appendChild(iStar);

      $resultsList.appendChild($series50);
    }
  }

}

function xhrReqAnime() {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://lfz-cors.herokuapp.com/?url=https://api.jikan.moe/v3/search/anime?q=' + searchTerm);
  xhr.setRequestHeader('token', 'abc123');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    const searchResults = xhr.response.results;
    buildAnime(searchResults, 'term');
  });
  xhr.addEventListener('error', function () {
    const networkErrorMessage = document.createElement('h3');
    networkErrorMessage.textContent = 'Sorry, there was an error connecting to the network! Please check your internet connection.';
    $resultsList.replaceChildren();
    $resultsList.appendChild(networkErrorMessage);
  });
  xhr.send();
}

function xhrReqAnimeFiltered() {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://lfz-cors.herokuapp.com/?url=https://api.jikan.moe/v3/search/anime?q=' + searchTerm);
  xhr.setRequestHeader('token', 'abc123');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    const searchResults = xhr.response.results;
    const filteredResults = [];
    for (let a = 0; a < searchResults.length; a++) {
      let currentSeries = {};
      currentSeries = searchResults[a];
      if (currentSeries.rated !== 'Rx') {
        filteredResults.push(currentSeries);
      }
    }
    buildAnime(filteredResults, 'term');
  });
  xhr.addEventListener('error', function () {
    const networkErrorMessage = document.createElement('h3');
    networkErrorMessage.textContent = 'Sorry, there was an error connecting to the network! Please check your internet connection.';
    $resultsList.replaceChildren();
    $resultsList.appendChild(networkErrorMessage);
  });
  xhr.send();
}

function buildManga(searchResults) {
  $resultsList.replaceChildren();
  if (searchResults === undefined || searchResults.length === 0) {
    const noResults = document.createElement('h3');
    noResults.textContent = 'Sorry, no results found for ' + searchTerm + ', try a different term.';
    $resultsList.appendChild(noResults);
  } else {
    for (let a = 0; a < searchResults.length; a++) {
      let seriesObj = {};
      seriesObj = searchResults[a];
      const $series50 = document.createElement('div');
      $series50.className = 'div series50';

      const showImage = document.createElement('img');
      showImage.setAttribute('src', seriesObj.images.jpg.image_url);
      $series50.appendChild(showImage);

      const titleDiv = document.createElement('div');
      titleDiv.textContent = seriesObj.title;
      $series50.appendChild(titleDiv);

      const typeDiv = document.createElement('div');
      typeDiv.textContent = seriesObj.type;
      $series50.appendChild(typeDiv);

      let yearPub;
      const yearDiv = document.createElement('div');
      if (seriesObj.published.from === null) {
        yearDiv.textContent = 'Unknown date';
      } else {
        let yearString = String(seriesObj.published.from);
        yearString = yearString.slice(0, 4);
        yearDiv.textContent = yearString;
        yearPub = yearString;
      }
      $series50.appendChild(yearDiv);

      const chaptersDiv = document.createElement('div');
      chaptersDiv.textContent = 'Chapter(s): ' + seriesObj.chapters;
      $series50.appendChild(chaptersDiv);

      const butDiv = document.createElement('div');
      butDiv.className = 'butDiv';
      $series50.appendChild(butDiv);

      const moreInfoButtonSpan = document.createElement('span');
      moreInfoButtonSpan.textContent = 'More Info';
      moreInfoButtonSpan.className = 'moreInfoButton';
      moreInfoButtonSpan.setAttribute('id', seriesObj.mal_id);
      moreInfoButtonSpan.setAttribute('medium', 'manga');
      butDiv.appendChild(moreInfoButtonSpan);

      const iStar = document.createElement('i');
      iStar.className = 'far fa-star';
      const currentId = seriesObj.mal_id.toString();

      for (let b = 0; b < data.mangaIDs.length; b++) {
        const currentCheckAgainst = data.mangaIDs[b];

        if (currentId === currentCheckAgainst) {
          iStar.className = 'fas fa-star';
          break;
        }
      }
      iStar.setAttribute('title', seriesObj.title);
      iStar.setAttribute('type', seriesObj.type);
      iStar.setAttribute('year', yearPub);
      iStar.setAttribute('chapters', seriesObj.chapters);
      iStar.setAttribute('id', seriesObj.mal_id);
      iStar.setAttribute('img', seriesObj.images.jpg.image_url);

      butDiv.appendChild(iStar);

      $resultsList.appendChild($series50);
    }
  }

}

function xhrReqManga() {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://lfz-cors.herokuapp.com/?url=https://api.jikan.moe/v4/manga?q=' + searchTerm);
  xhr.setRequestHeader('token', 'abc123');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    const searchResults = xhr.response.data;
    buildManga(searchResults);
  });
  xhr.addEventListener('error', function () {
    const networkErrorMessage = document.createElement('h3');
    networkErrorMessage.textContent = 'Sorry, there was an error connecting to the network! Please check your internet connection.';
    $resultsList.replaceChildren();
    $resultsList.appendChild(networkErrorMessage);
  });
  xhr.send();
}

function xhrReqMangaFiltered() {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://lfz-cors.herokuapp.com/?url=https://api.jikan.moe/v4/manga?q=' + searchTerm);
  xhr.setRequestHeader('token', 'abc123');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    const searchResults = xhr.response.data;
    const filteredResults = [];
    for (let a = 0; a < searchResults.length; a++) {
      const current = searchResults[a];
      let currentPass = true;
      const genres = current.genres;
      for (let b = 0; b < genres.length; b++) {
        let currentGenreObj = {};
        currentGenreObj = genres[b];
        if (currentGenreObj.name === 'Hentai') {
          currentPass = false;
        }
      }
      if (currentPass === true) {
        filteredResults.push(current);
      }
    }
    buildManga(filteredResults);
  });
  xhr.addEventListener('error', function () {
    const networkErrorMessage = document.createElement('h3');
    networkErrorMessage.textContent = 'Sorry, there was an error connecting to the network! Please check your internet connection.';
    $resultsList.replaceChildren();
    $resultsList.appendChild(networkErrorMessage);
  });
  xhr.send();
}

function xhrReqSeason(year, seas) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://lfz-cors.herokuapp.com/?url=https://api.jikan.moe/v3/season/' + year + '/' + seas);
  xhr.setRequestHeader('token', 'abc123');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    const searchResults = xhr.response.anime;
    buildAnime(searchResults, 'season');
  });
  xhr.addEventListener('error', function () {
    const networkErrorMessage = document.createElement('h3');
    networkErrorMessage.textContent = 'Sorry, there was an error connecting to the network! Please check your internet connection.';
    $resultsList.replaceChildren();
    $resultsList.appendChild(networkErrorMessage);
  });
  xhr.send();
}

function xhrReqSeasonFiltered(year, seas) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://lfz-cors.herokuapp.com/?url=https://api.jikan.moe/v3/season/' + year + '/' + seas);
  xhr.setRequestHeader('token', 'abc123');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    const searchResults = xhr.response.anime;
    const filteredResults = [];
    for (let a = 0; a < searchResults.length; a++) {
      let currentSeries = {};
      currentSeries = searchResults[a];
      if (currentSeries.r18 === false) {
        filteredResults.push(currentSeries);
      }
    }
    buildAnime(filteredResults, 'season');
  });
  xhr.addEventListener('error', function () {
    const networkErrorMessage = document.createElement('h3');
    networkErrorMessage.textContent = 'Sorry, there was an error connecting to the network! Please check your internet connection.';
    $resultsList.replaceChildren();
    $resultsList.appendChild(networkErrorMessage);
  });
  xhr.send();
}

function buildModalAnime(currentAnime) {
  const modalData = document.createElement('div');

  const modalTopDiv = document.createElement('div');
  modalTopDiv.className = 'modalTop row';

  const imgSpan = document.createElement('span');
  modalTopDiv.appendChild(imgSpan);

  const modalImg = document.createElement('img');
  modalImg.setAttribute('src', currentAnime.image_url);
  modalImg.className = 'infoImg';
  imgSpan.appendChild(modalImg);

  const textSpan = document.createElement('span');
  textSpan.className = 'textSpan';
  modalTopDiv.appendChild(textSpan);

  const titleDiv = document.createElement('div');
  titleDiv.textContent = currentAnime.title;
  titleDiv.className = 'infoRow';
  textSpan.appendChild(titleDiv);

  const titleEngDiv = document.createElement('div');
  titleEngDiv.textContent = currentAnime.title_english;
  titleEngDiv.className = 'infoRow';
  textSpan.appendChild(titleEngDiv);

  const yearDiv = document.createElement('div');
  const airTimes = currentAnime.aired.from;
  if (airTimes === null) {
    yearDiv.textContent = 'Unknown date';
  } else {
    const year = airTimes.slice(0, 4);
    yearDiv.textContent = year;
  }

  yearDiv.className = 'infoRow';
  textSpan.appendChild(yearDiv);

  const typeDiv = document.createElement('div');
  typeDiv.textContent = currentAnime.type;
  typeDiv.className = 'infoRow';
  textSpan.appendChild(typeDiv);

  const episodesDiv = document.createElement('div');
  episodesDiv.textContent = 'Episode(s): ' + currentAnime.episodes;
  episodesDiv.className = 'infoRow';
  textSpan.appendChild(episodesDiv);

  const durationDiv = document.createElement('div');
  durationDiv.textContent = currentAnime.duration;
  durationDiv.className = 'infoRow';
  textSpan.appendChild(durationDiv);

  const sourceDiv = document.createElement('div');
  sourceDiv.textContent = 'Source: ' + currentAnime.source;
  sourceDiv.className = 'infoRow';
  textSpan.appendChild(sourceDiv);

  const ratingDiv = document.createElement('div');
  ratingDiv.textContent = 'Rated ' + currentAnime.rating;
  ratingDiv.className = 'infoRow';
  textSpan.appendChild(ratingDiv);

  const studiosDiv = document.createElement('div');
  const currentStudios = currentAnime.studios;
  studiosDiv.className = 'infoRow';
  studiosDiv.textContent = 'Studio(s): ';
  for (let b = 0; b < currentStudios.length; b++) {
    const curStudio = currentStudios[b];
    if (b === currentStudios.length - 1) {
      studiosDiv.textContent += curStudio.name;
    } else {
      studiosDiv.textContent += curStudio.name + ', ';
    }
  }
  textSpan.appendChild(studiosDiv);

  modalData.appendChild(modalTopDiv);

  const genresDiv = document.createElement('div');
  const currentGenres = currentAnime.genres;
  genresDiv.className = 'infoRow';
  genresDiv.textContent = 'Genre(s): ';
  for (let a = 0; a < currentGenres.length; a++) {
    const curGenre = currentGenres[a];
    if (a === currentGenres.length - 1) {
      genresDiv.textContent += curGenre.name;
    } else {
      genresDiv.textContent += curGenre.name + ', ';
    }
  }
  modalData.appendChild(genresDiv);

  const synopDiv = document.createElement('div');
  synopDiv.textContent = 'Synopsis: ' + currentAnime.synopsis;
  synopDiv.className = 'infoRow synop';
  modalData.appendChild(synopDiv);

  const modalBut = document.createElement('div');
  modalBut.className = 'modalBut';

  const modalOkButtonSpan = document.createElement('span');
  modalOkButtonSpan.textContent = 'OK';
  modalOkButtonSpan.className = 'modalOkButton';
  modalBut.appendChild(modalOkButtonSpan);

  modalData.appendChild(modalBut);

  $modalContent.appendChild(modalData);
}

function xhrReqIDAnime(id) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://lfz-cors.herokuapp.com/?url=https://api.jikan.moe/v3/anime/' + id);
  xhr.setRequestHeader('token', 'abc123');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    const currentAnime = xhr.response;
    buildModalAnime(currentAnime);
  });
  xhr.addEventListener('error', function () {
    const networkErrorMessage = document.createElement('h3');
    networkErrorMessage.textContent = 'Sorry, there was an error connecting to the network! Please check your internet connection.';
    $modalContent.appendChild(networkErrorMessage);

    const modalBut = document.createElement('div');
    modalBut.className = 'modalBut';

    const modalOkButtonSpan = document.createElement('span');
    modalOkButtonSpan.textContent = 'OK';
    modalOkButtonSpan.className = 'modalOkButton';
    modalBut.appendChild(modalOkButtonSpan);

    $modalContent.appendChild(modalBut);
  });
  xhr.send();
}

function buildModalManga(currentManga) {
  const modalTopDiv = document.createElement('div');
  modalTopDiv.className = 'modalTop row';

  const imgSpan = document.createElement('span');
  modalTopDiv.appendChild(imgSpan);

  const modalImg = document.createElement('img');
  modalImg.setAttribute('src', currentManga.image_url);
  modalImg.className = 'infoImg';
  imgSpan.appendChild(modalImg);

  const textSpan = document.createElement('span');
  textSpan.className = 'textSpan';
  modalTopDiv.appendChild(textSpan);

  const titleDiv = document.createElement('div');
  titleDiv.textContent = currentManga.title;
  titleDiv.className = 'infoRow';
  textSpan.appendChild(titleDiv);

  const titleEngDiv = document.createElement('div');
  titleEngDiv.textContent = currentManga.title_english;
  titleEngDiv.className = 'infoRow';
  textSpan.appendChild(titleEngDiv);

  const yearDiv = document.createElement('div');
  yearDiv.className = 'infoRow';
  if (currentManga.published.from === null) {
    yearDiv.textContent = 'Unknown date';
  } else {
    const pub = currentManga.published;
    const fromPub = pub.from;
    const year = fromPub.slice(0, 4);
    yearDiv.textContent = year;
  }
  textSpan.appendChild(yearDiv);

  const typeDiv = document.createElement('div');
  typeDiv.textContent = currentManga.type;
  typeDiv.className = 'infoRow';
  textSpan.appendChild(typeDiv);

  const chaptersDiv = document.createElement('div');
  chaptersDiv.textContent = 'Chapter(s): ' + currentManga.chapters;
  chaptersDiv.className = 'infoRow';
  textSpan.appendChild(chaptersDiv);

  const authorDiv = document.createElement('div');
  authorDiv.className = 'infoRow';
  const currentAuthors = currentManga.authors;

  authorDiv.textContent = 'Author(s): ';
  for (let b = 0; b < currentAuthors.length; b++) {
    const curAuthor = currentAuthors[b];
    const author = curAuthor.name;
    if (b === currentAuthors.length - 1) {
      authorDiv.textContent += author;
    } else {
      authorDiv.textContent += author + ' | ';
    }
  }
  textSpan.appendChild(authorDiv);

  const serialDiv = document.createElement('div');
  const currentSerial = currentManga.serializations;
  serialDiv.className = 'infoRow';
  serialDiv.textContent = 'Serialization(s): ';
  for (let c = 0; c < currentSerial.length; c++) {
    const serial = currentSerial[c].name;
    serialDiv.textContent += serial + ' ';
  }
  textSpan.appendChild(serialDiv);

  $modalContent.appendChild(modalTopDiv);

  const genresDiv = document.createElement('div');
  genresDiv.className = 'infoRow';
  const currentGenres = currentManga.genres;
  genresDiv.textContent = 'Genre(s): ';
  for (let a = 0; a < currentGenres.length; a++) {
    const curGenre = currentGenres[a];
    if (a === currentGenres.length - 1) {
      genresDiv.textContent += curGenre.name;
    } else {
      genresDiv.textContent += curGenre.name + ', ';
    }
  }
  $modalContent.appendChild(genresDiv);

  const synopDiv = document.createElement('div');
  synopDiv.textContent = 'Synopsis: ' + currentManga.synopsis;
  synopDiv.className = 'infoRow synop';
  $modalContent.appendChild(synopDiv);

  const modalBut = document.createElement('div');
  modalBut.className = 'modalBut';

  const modalOkButtonSpan = document.createElement('span');
  modalOkButtonSpan.textContent = 'OK';
  modalOkButtonSpan.className = 'modalOkButton';
  modalBut.appendChild(modalOkButtonSpan);

  $modalContent.appendChild(modalBut);
}

function xhrReqIDManga(id) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://lfz-cors.herokuapp.com/?url=https://api.jikan.moe/v3/manga/' + id);
  xhr.setRequestHeader('token', 'abc123');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    const currentManga = xhr.response;
    buildModalManga(currentManga);
  });
  xhr.addEventListener('error', function () {
    const networkErrorMessage = document.createElement('h3');
    networkErrorMessage.textContent = 'Sorry, there was an error connecting to the network! Please check your internet connection.';
    // $resultsList.replaceChildren();
    $modalContent.appendChild(networkErrorMessage);

    const modalBut = document.createElement('div');
    modalBut.className = 'modalBut';

    const modalOkButtonSpan = document.createElement('span');
    modalOkButtonSpan.textContent = 'OK';
    modalOkButtonSpan.className = 'modalOkButton';
    modalBut.appendChild(modalOkButtonSpan);

    $modalContent.appendChild(modalBut);
  });
  xhr.send();
}

function generateFavorites() {
  $searches.className = 'row searches hidden';
  $resultsTitle.textContent = 'Current favorites in My List:';
  $resultsList.replaceChildren();

  for (let a = 0; a < data.faves.length; a++) {
    let seriesObj = {};
    seriesObj = data.faves[a];
    const $series50 = document.createElement('div');
    $series50.className = 'div series50';

    const showImage = document.createElement('img');
    showImage.setAttribute('src', seriesObj.img);
    $series50.appendChild(showImage);

    const titleDiv = document.createElement('div');
    titleDiv.textContent = seriesObj.title;
    $series50.appendChild(titleDiv);

    const typeDiv = document.createElement('div');
    typeDiv.textContent = seriesObj.type;
    $series50.appendChild(typeDiv);

    const yearDiv = document.createElement('div');
    yearDiv.textContent = seriesObj.year;
    $series50.appendChild(yearDiv);

    if (seriesObj.type === 'Manga' || seriesObj.type === 'Light Novel' || seriesObj.type === 'One-shot' || seriesObj.type === 'Manhwa' ||
      seriesObj.type === 'Manhua' || seriesObj.type === 'Doujinshi' || seriesObj.type === 'Novel') {
      const chaptersDiv = document.createElement('div');
      chaptersDiv.textContent = 'Chapter(s): ' + seriesObj.chapters;
      $series50.appendChild(chaptersDiv);
    } else {
      const episodesDiv = document.createElement('div');
      episodesDiv.textContent = 'Episodes: ' + seriesObj.episodes;
      $series50.appendChild(episodesDiv);
    }

    const butDiv = document.createElement('div');
    butDiv.className = 'butDiv';
    $series50.appendChild(butDiv);

    const moreInfoButtonSpan = document.createElement('span');
    moreInfoButtonSpan.textContent = 'More Info';
    moreInfoButtonSpan.className = 'moreInfoButton';
    moreInfoButtonSpan.setAttribute('id', seriesObj.id);

    if (seriesObj.type === 'Manga' || seriesObj.type === 'Light Novel' || seriesObj.type === 'One-shot' || seriesObj.type === 'Manhwa' ||
      seriesObj.type === 'Manhua' || seriesObj.type === 'Doujinshi' || seriesObj.type === 'Novel') {
      moreInfoButtonSpan.setAttribute('medium', 'manga');
    } else {
      moreInfoButtonSpan.setAttribute('medium', 'anime');
    }

    butDiv.appendChild(moreInfoButtonSpan);

    const iStar = document.createElement('i');
    iStar.className = 'fas fa-star';

    if (seriesObj.type === 'Manga' || seriesObj.type === 'Light Novel' || seriesObj.type === 'One-shot' || seriesObj.type === 'Manhwa' ||
      seriesObj.type === 'Manhua' || seriesObj.type === 'Doujinshi' || seriesObj.type === 'Novel') {
      iStar.setAttribute('title', seriesObj.title);
      iStar.setAttribute('type', seriesObj.type);
      iStar.setAttribute('year', seriesObj.year);
      iStar.setAttribute('chapters', seriesObj.chapters);
      iStar.setAttribute('id', seriesObj.id);
      iStar.setAttribute('img', seriesObj.img);
    } else {
      iStar.setAttribute('title', seriesObj.title);
      iStar.setAttribute('type', seriesObj.type);
      iStar.setAttribute('year', seriesObj.year);
      iStar.setAttribute('episodes', seriesObj.episodes);
      iStar.setAttribute('id', seriesObj.id);
      iStar.setAttribute('img', seriesObj.img);
    }

    butDiv.appendChild(iStar);

    $resultsList.appendChild($series50);

    $myList.className = 'myList active';
    $goSearchBut.className = 'goSearchBut inactive';
  }
}

$termSearch.addEventListener('submit', function (event) {
  $resultsList.replaceChildren();
  event.preventDefault();

  const loading = document.createElement('div');

  const loadingSpinner = document.createElement('div');
  loadingSpinner.className = 'div lds-ring';
  const div1 = document.createElement('div');
  loadingSpinner.appendChild(div1);
  const div2 = document.createElement('div');
  loadingSpinner.appendChild(div2);
  const div3 = document.createElement('div');
  loadingSpinner.appendChild(div3);
  const div4 = document.createElement('div');
  loadingSpinner.appendChild(div4);
  loading.appendChild(loadingSpinner);

  const loadingMessage = document.createElement('h3');
  loadingMessage.textContent = 'Please wait. Results are loading...';

  loading.appendChild(loadingMessage);
  $resultsList.appendChild(loading);

  searchTerm = $searchBox.value;

  if ($animeRadio.checked === true) {
    if ($radioYesFilter.checked === true) {
      xhrReqAnimeFiltered();
    } else if ($radioNoFilter.checked === true) {
      xhrReqAnime();
    }
    $resultsTitle.textContent = "Anime search results for term '" + searchTerm + "' :";

  } else if ($mangaRadio.checked === true) {

    if ($radioYesFilter.checked === true) {
      xhrReqMangaFiltered();
    } else if ($radioNoFilter.checked === true) {
      xhrReqManga();
    }
    $resultsTitle.textContent = "Manga search results for term '" + searchTerm + "' :";
  }
});

$pastOrPresent.addEventListener('click', function () {
  if ($latestRadio.checked === true) {
    $dropDowns.className = 'row dropDowns hidden';
  } else if ($previousRadio.checked === true) {
    $dropDowns.className = 'row dropDowns';
  }
});

$seasonSearch.addEventListener('submit', function (event) {
  $resultsList.replaceChildren();
  const loading = document.createElement('div');

  const loadingSpinner = document.createElement('div');
  loadingSpinner.className = 'div lds-ring';
  const div1 = document.createElement('div');
  loadingSpinner.appendChild(div1);
  const div2 = document.createElement('div');
  loadingSpinner.appendChild(div2);
  const div3 = document.createElement('div');
  loadingSpinner.appendChild(div3);
  const div4 = document.createElement('div');
  loadingSpinner.appendChild(div4);
  loading.appendChild(loadingSpinner);

  const loadingMessage = document.createElement('h3');
  loadingMessage.textContent = 'Please wait. Results are loading...';

  loading.appendChild(loadingMessage);

  $resultsList.appendChild(loading);

  event.preventDefault();

  if ($latestRadio.checked === true) {
    season = '2021summer';
  } else if ($previousRadio.checked === true) {
    const yr = $yearDropDown.value;
    const sea = $seasonDropDown.value;
    season = yr + sea;
  }
  const year = season.slice(0, 4);
  const seas = season.slice(4);
  const cap = seas.charAt(0).toUpperCase() + seas.slice(1);

  if ($radioYesFilter.checked === true) {
    xhrReqSeasonFiltered(year, seas);
  } else {
    xhrReqSeason(year, seas);
  }
  $resultsTitle.textContent = 'Season search results for ' + cap + ' ' + year + ':';
});

$searchSelect.addEventListener('click', function (event) {
  event.preventDefault();
  if (event.target === $termButton) {
    $termSearch.className = 'row termSearch';
    $seasonSearch.className = 'row seasonSearch hidden';
    $termButton.className = 'termButton active';
    $seasonButton.className = 'seasonButton inactive';

  } else if (event.target === $seasonButton) {
    $termSearch.className = 'row termSearch hidden';
    $seasonSearch.className = 'row seasonSearch';
    $termButton.className = 'termButton inactive';
    $seasonButton.className = 'seasonButton active';
  }
});

$resultsList.addEventListener('click', function (event) {

  if (event.target.className === 'moreInfoButton') {
    $modalContent.replaceChildren();
    $modal.className = 'modal';
    const currentMedium = event.target.getAttribute('medium');
    const currentId = event.target.getAttribute('id');
    if (currentMedium === 'anime') {
      xhrReqIDAnime(currentId);
    } else if (currentMedium === 'manga') {
      xhrReqIDManga(currentId);
    }
  }
  if (event.target.className === 'far fa-star') {
    const newFave = {};
    newFave.type = event.target.getAttribute('type');
    newFave.id = event.target.getAttribute('id');
    newFave.title = event.target.getAttribute('title');
    newFave.year = event.target.getAttribute('year');
    newFave.img = event.target.getAttribute('img');

    if (newFave.type === 'Manga' || newFave.type === 'Light Novel' || newFave.type === 'One-shot' || newFave.type === 'Manhwa' ||
    newFave.type === 'Manhua' || newFave.type === 'Doujinshi' || newFave.type === 'Novel') {
      newFave.chapters = event.target.getAttribute('chapters');
      data.mangaIDs.push(event.target.getAttribute('id'));
    } else {
      newFave.episodes = event.target.getAttribute('episodes');
      data.animeIDs.push(event.target.getAttribute('id'));
    }

    data.faves.push(newFave);

    event.target.className = 'fas fa-star';

  } else if (event.target.className === 'fas fa-star') {
    const oldFave = {};
    oldFave.type = event.target.getAttribute('type');
    oldFave.id = event.target.getAttribute('id');
    let oldFaveIndex;
    for (let a = 0; a < data.faves.length; a++) {
      let currentFave = {};
      currentFave = data.faves[a];
      if (oldFave.id === currentFave.id) {
        if (oldFave.type === currentFave.type) {
          oldFaveIndex = a;
          break;
        }
      }
    }
    data.faves.splice(oldFaveIndex, 1);

    if (oldFave.type === 'Manga' || oldFave.type === 'Light Novel' || oldFave.type === 'One-shot' || oldFave.type === 'Manhwa' ||
      oldFave.type === 'Manhua' || oldFave.type === 'Doujinshi' || oldFave.type === 'Novel') {
      const oldMangaId = oldFave.id;
      let oldMangaIndex;
      let currentMangaID;
      for (let b = 0; b < data.mangaIDs.length; b++) {
        currentMangaID = data.mangaIDs[b];
        if (oldMangaId === currentMangaID) {
          oldMangaIndex = b;
          break;
        }
      }
      data.mangaIDs.splice(oldMangaIndex, 1);
    } else {
      const oldAnimeId = oldFave.id;
      let oldAnimeIndex;
      let currentAnimeID;
      for (let c = 0; c < data.animeIDs.length; c++) {
        currentAnimeID = data.animeIDs[c];
        if (oldAnimeId === currentAnimeID) {
          oldAnimeIndex = c;
          break;
        }
      }
      data.animeIDs.splice(oldAnimeIndex, 1);
    }
    event.target.className = 'far fa-star';
  }
});

$modalContent.addEventListener('click', function (event) {
  if (event.target.className === 'modalOkButton') {
    $modal.className = 'modal hidden';
  }
});

$myList.addEventListener('click', function (event) {
  generateFavorites();
});

$goSearchBut.addEventListener('click', function (event) {
  $searches.className = 'row searches';
  $myList.className = 'myList inactive';
  $goSearchBut.className = 'goSearchBut active';
});

$myListSplash.addEventListener('click', function (event) {
  $splash.className = 'splash hidden';
  $headerImage.className = 'headerImage hidden';
  $standardView.className = 'standardView';
  generateFavorites();
});

$goSearchButSplash.addEventListener('click', function (event) {
  $splash.className = 'splash hidden';
  $headerImage.className = 'headerImage hidden';
  $standardView.className = 'standardView';
});
