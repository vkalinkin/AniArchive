/* global data */
/* exported data */
var $resultsList = document.querySelector('.resultsList');
var $searchBox = document.querySelector('#searchBox');

var $searchSelect = document.querySelector('.searchSelect');
var $seasonSearch = document.querySelector('.seasonSearch');
var $termSearch = document.querySelector('.termSearch');

var $termButton = document.querySelector('.termButton');
var $seasonButton = document.querySelector('.seasonButton');

var $animeRadio = document.querySelector('#anime');
var $mangaRadio = document.querySelector('#manga');

var $pastOrPresent = document.querySelector('.pastOrPresent');
var $latestRadio = document.querySelector('#latest');
var $previousRadio = document.querySelector('#previous');
var $dropDowns = document.querySelector('.dropDowns');
var $yearDropDown = document.querySelector('#yearDropDown');
var $seasonDropDown = document.querySelector('#seasonDropDown');

var $modal = document.querySelector('.modal');
var $modalContent = document.querySelector('.modalContent');

var $myList = document.querySelector('.myList');
var $goSearchBut = document.querySelector('.goSearchBut');
var $searches = document.querySelector('.searches');

var $radioYesFilter = document.querySelector('#yesFilter');
var $radioNoFilter = document.querySelector('#noFilter');

var $resultsTitle = document.querySelector('.resultsTitle');

var searchTerm = '';
var season = '2021spring';

function buildAnime(searchResults, type) {
  for (var a = 0; a < searchResults.length; a++) {
    var seriesObj = {};
    seriesObj = searchResults[a];
    var $series50 = document.createElement('div');
    $series50.className = 'series50';

    var showImage = document.createElement('img');
    showImage.setAttribute('src', seriesObj.image_url);
    $series50.appendChild(showImage);

    var titleDiv = document.createElement('div');
    titleDiv.textContent = seriesObj.title;
    $series50.appendChild(titleDiv);

    var typeDiv = document.createElement('div');
    typeDiv.textContent = seriesObj.type;
    $series50.appendChild(typeDiv);

    var yr;
    var yearDiv = document.createElement('div');
    if (type === 'term') {
      var yearString = String(seriesObj.start_date);
      yearString = yearString.slice(0, 4);
      yearDiv.textContent = yearString;
      yr = yearString;
    } else {
      var yearAirString = String(seriesObj.airing_start);
      yearAirString = yearAirString.slice(0, 4);
      yearDiv.textContent = yearAirString;
      yr = yearAirString;
    }

    $series50.appendChild(yearDiv);

    var episodesDiv = document.createElement('div');
    episodesDiv.textContent = 'Episode(s): ' + seriesObj.episodes;
    $series50.appendChild(episodesDiv);

    var butDiv = document.createElement('div');
    butDiv.className = 'butDiv';
    $series50.appendChild(butDiv);

    var moreInfoButtonSpan = document.createElement('span');
    moreInfoButtonSpan.textContent = 'More Info';
    moreInfoButtonSpan.className = 'moreInfoButton';
    moreInfoButtonSpan.setAttribute('id', seriesObj.mal_id);
    moreInfoButtonSpan.setAttribute('medium', 'anime');
    butDiv.appendChild(moreInfoButtonSpan);

    var iStar = document.createElement('i');
    iStar.className = 'far fa-star';
    var currentId = seriesObj.mal_id.toString();

    for (var b = 0; b < data.animeIDs.length; b++) {
      var currentCheckAgainst = data.animeIDs[b];

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

function xhrReqAnime() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://lfz-cors.herokuapp.com/?url=https://api.jikan.moe/v3/search/anime?q=' + searchTerm);
  xhr.setRequestHeader('token', 'abc123');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    var searchResults = xhr.response.results;
    buildAnime(searchResults, 'term');
  });

  xhr.send();
}

function xhrReqAnimeFiltered() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://lfz-cors.herokuapp.com/?url=https://api.jikan.moe/v3/search/anime?q=' + searchTerm);
  xhr.setRequestHeader('token', 'abc123');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    var searchResults = xhr.response.results;
    var filteredResults = [];
    for (var a = 0; a < searchResults.length; a++) {
      var currentSeries = {};
      currentSeries = searchResults[a];
      if (currentSeries.rated !== 'Rx') {
        filteredResults.push(currentSeries);
      }
    }
    buildAnime(filteredResults, 'term');
  });

  xhr.send();
}

function buildManga(searchResults) {
  for (var a = 0; a < searchResults.length; a++) {
    var seriesObj = {};
    seriesObj = searchResults[a];
    var $series50 = document.createElement('div');
    $series50.className = 'div series50';

    var showImage = document.createElement('img');
    showImage.setAttribute('src', seriesObj.images.jpg.image_url);
    $series50.appendChild(showImage);

    var titleDiv = document.createElement('div');
    titleDiv.textContent = seriesObj.title;
    $series50.appendChild(titleDiv);

    var typeDiv = document.createElement('div');
    typeDiv.textContent = seriesObj.type;
    $series50.appendChild(typeDiv);

    var yearDiv = document.createElement('div');
    if (seriesObj.published.from === null) {
      yearDiv.textContent = 'Unknown date';
    } else {
      var yearString = String(seriesObj.published.from);
      yearString = yearString.slice(0, 4);
      yearDiv.textContent = yearString;
    }
    $series50.appendChild(yearDiv);

    var chaptersDiv = document.createElement('div');
    chaptersDiv.textContent = 'Chapter(s): ' + seriesObj.chapters;
    $series50.appendChild(chaptersDiv);

    var butDiv = document.createElement('div');
    butDiv.className = 'butDiv';
    $series50.appendChild(butDiv);

    var moreInfoButtonSpan = document.createElement('span');
    moreInfoButtonSpan.textContent = 'More Info';
    moreInfoButtonSpan.className = 'moreInfoButton';
    moreInfoButtonSpan.setAttribute('id', seriesObj.mal_id);
    moreInfoButtonSpan.setAttribute('medium', 'manga');
    butDiv.appendChild(moreInfoButtonSpan);

    var iStar = document.createElement('i');
    iStar.className = 'far fa-star';
    var currentId = seriesObj.mal_id.toString();

    for (var b = 0; b < data.mangaIDs.length; b++) {
      var currentCheckAgainst = data.mangaIDs[b];

      if (currentId === currentCheckAgainst) {
        iStar.className = 'fas fa-star';
        break;
      }
    }
    iStar.setAttribute('title', seriesObj.title);
    iStar.setAttribute('type', seriesObj.type);
    iStar.setAttribute('year', yearString);
    iStar.setAttribute('chapters', seriesObj.chapters);
    iStar.setAttribute('id', seriesObj.mal_id);
    iStar.setAttribute('img', seriesObj.images.jpg.image_url);

    butDiv.appendChild(iStar);

    $resultsList.appendChild($series50);
  }
}

function xhrReqManga() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://lfz-cors.herokuapp.com/?url=https://api.jikan.moe/v4/manga?q=' + searchTerm);
  xhr.setRequestHeader('token', 'abc123');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    var searchResults = xhr.response.data;
    buildManga(searchResults);
  });
  xhr.send();
}

function xhrReqMangaFiltered() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://lfz-cors.herokuapp.com/?url=https://api.jikan.moe/v4/manga?q=' + searchTerm);
  xhr.setRequestHeader('token', 'abc123');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    var searchResults = xhr.response.data;
    var filteredResults = [];
    for (var a = 0; a < searchResults.length; a++) {
      var current = searchResults[a];
      var currentPass = true;
      var genres = current.genres;
      for (var b = 0; b < genres.length; b++) {
        var currentGenreObj = {};
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
  xhr.send();
}

function xhrReqSeason(year, seas) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://lfz-cors.herokuapp.com/?url=https://api.jikan.moe/v3/season/' + year + '/' + seas);
  xhr.setRequestHeader('token', 'abc123');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {

    var searchResults = xhr.response.anime;
    buildAnime(searchResults, 'season');
  });
  xhr.send();
}

function xhrReqSeasonFiltered(year, seas) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://lfz-cors.herokuapp.com/?url=https://api.jikan.moe/v3/season/' + year + '/' + seas);
  xhr.setRequestHeader('token', 'abc123');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    var searchResults = xhr.response.anime;
    var filteredResults = [];
    for (var a = 0; a < searchResults.length; a++) {
      var currentSeries = {};
      currentSeries = searchResults[a];
      if (currentSeries.r18 === false) {
        filteredResults.push(currentSeries);
      }
    }
    buildAnime(filteredResults, 'season');
  });
  xhr.send();
}

function buildModalAnime(currentAnime) {
  var modalData = document.createElement('div');

  var modalTopDiv = document.createElement('div');
  modalTopDiv.className = 'modalTop row';

  var imgSpan = document.createElement('span');
  modalTopDiv.appendChild(imgSpan);

  var modalImg = document.createElement('img');
  modalImg.setAttribute('src', currentAnime.image_url);
  modalImg.className = 'infoImg';
  imgSpan.appendChild(modalImg);

  var textSpan = document.createElement('span');
  textSpan.className = 'textSpan';
  modalTopDiv.appendChild(textSpan);

  var titleDiv = document.createElement('div');
  titleDiv.textContent = currentAnime.title;
  titleDiv.className = 'infoRow';
  textSpan.appendChild(titleDiv);

  var titleEngDiv = document.createElement('div');
  titleEngDiv.textContent = currentAnime.title_english;
  titleEngDiv.className = 'infoRow';
  textSpan.appendChild(titleEngDiv);

  var yearDiv = document.createElement('div');
  var airTimes = currentAnime.aired.from;
  var year = airTimes.slice(0, 4);
  yearDiv.textContent = year;
  yearDiv.className = 'infoRow';
  textSpan.appendChild(yearDiv);

  var typeDiv = document.createElement('div');
  typeDiv.textContent = currentAnime.type;
  typeDiv.className = 'infoRow';
  textSpan.appendChild(typeDiv);

  var episodesDiv = document.createElement('div');
  episodesDiv.textContent = 'Episode(s): ' + currentAnime.episodes;
  episodesDiv.className = 'infoRow';
  textSpan.appendChild(episodesDiv);

  var durationDiv = document.createElement('div');
  durationDiv.textContent = currentAnime.duration;
  durationDiv.className = 'infoRow';
  textSpan.appendChild(durationDiv);

  var sourceDiv = document.createElement('div');
  sourceDiv.textContent = 'Source: ' + currentAnime.source;
  sourceDiv.className = 'infoRow';
  textSpan.appendChild(sourceDiv);

  var ratingDiv = document.createElement('div');
  ratingDiv.textContent = 'Rated ' + currentAnime.rating;
  ratingDiv.className = 'infoRow';
  textSpan.appendChild(ratingDiv);

  var studiosDiv = document.createElement('div');
  var currentStudios = currentAnime.studios;
  studiosDiv.className = 'infoRow';
  studiosDiv.textContent = 'Studio(s): ';
  for (var b = 0; b < currentStudios.length; b++) {
    var curStudio = currentStudios[b];
    if (b === currentStudios.length - 1) {
      studiosDiv.textContent += curStudio.name;
    } else {
      studiosDiv.textContent += curStudio.name + ', ';
    }

  }
  textSpan.appendChild(studiosDiv);

  modalData.appendChild(modalTopDiv);

  var genresDiv = document.createElement('div');
  var currentGenres = currentAnime.genres;
  genresDiv.className = 'infoRow';
  genresDiv.textContent = 'Genre(s): ';
  for (var a = 0; a < currentGenres.length; a++) {
    var curGenre = currentGenres[a];
    if (a === currentGenres.length - 1) {
      genresDiv.textContent += curGenre.name;
    } else {
      genresDiv.textContent += curGenre.name + ', ';
    }
  }
  modalData.appendChild(genresDiv);

  var synopDiv = document.createElement('div');
  synopDiv.textContent = 'Synopsis: ' + currentAnime.synopsis;
  synopDiv.className = 'infoRow synop';
  modalData.appendChild(synopDiv);

  var modalBut = document.createElement('div');
  modalBut.className = 'modalBut';

  var modalOkButtonSpan = document.createElement('span');
  modalOkButtonSpan.textContent = 'OK';
  modalOkButtonSpan.className = 'modalOkButton';
  modalBut.appendChild(modalOkButtonSpan);

  modalData.appendChild(modalBut);

  $modalContent.appendChild(modalData);
}

function xhrReqIDAnime(id) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://lfz-cors.herokuapp.com/?url=https://api.jikan.moe/v3/anime/' + id);
  xhr.setRequestHeader('token', 'abc123');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    var currentAnime = xhr.response;
    buildModalAnime(currentAnime);
  });
  xhr.send();
}

function buildModalManga(currentManga) {
  var modalTopDiv = document.createElement('div');
  modalTopDiv.className = 'modalTop row';

  var imgSpan = document.createElement('span');
  modalTopDiv.appendChild(imgSpan);

  var modalImg = document.createElement('img');
  modalImg.setAttribute('src', currentManga.image_url);
  modalImg.className = 'infoImg';
  imgSpan.appendChild(modalImg);

  var textSpan = document.createElement('span');
  textSpan.className = 'textSpan';
  modalTopDiv.appendChild(textSpan);

  var titleDiv = document.createElement('div');
  titleDiv.textContent = currentManga.title;
  titleDiv.className = 'infoRow';
  textSpan.appendChild(titleDiv);

  var titleEngDiv = document.createElement('div');
  titleEngDiv.textContent = currentManga.title_english;
  titleEngDiv.className = 'infoRow';
  textSpan.appendChild(titleEngDiv);

  var yearDiv = document.createElement('div');
  yearDiv.className = 'infoRow';
  if (currentManga.published.from === null) {
    yearDiv.textContent = 'Unknown date';
  } else {
    var pub = currentManga.published;
    var fromPub = pub.from;
    var year = fromPub.slice(0, 4);
    yearDiv.textContent = year;
  }
  textSpan.appendChild(yearDiv);

  var typeDiv = document.createElement('div');
  typeDiv.textContent = currentManga.type;
  typeDiv.className = 'infoRow';
  textSpan.appendChild(typeDiv);

  var chaptersDiv = document.createElement('div');
  chaptersDiv.textContent = 'Chapter(s): ' + currentManga.chapters;
  chaptersDiv.className = 'infoRow';
  textSpan.appendChild(chaptersDiv);

  var authorDiv = document.createElement('div');
  authorDiv.className = 'infoRow';
  var currentAuthors = currentManga.authors;

  authorDiv.textContent = 'Author(s): ';
  for (var b = 0; b < currentAuthors.length; b++) {
    var curAuthor = currentAuthors[b];
    var author = curAuthor.name;
    if (b === currentAuthors.length - 1) {
      authorDiv.textContent += author;
    } else {
      authorDiv.textContent += author + ' | ';
    }

  }
  textSpan.appendChild(authorDiv);

  var serialDiv = document.createElement('div');
  var currentSerial = currentManga.serializations;
  serialDiv.className = 'infoRow';
  serialDiv.textContent = 'Serialization(s): ';
  for (var c = 0; c < currentSerial.length; c++) {
    var serial = currentSerial[c].name;
    serialDiv.textContent += serial + ' ';
  }
  textSpan.appendChild(serialDiv);

  $modalContent.appendChild(modalTopDiv);

  var genresDiv = document.createElement('div');
  genresDiv.className = 'infoRow';
  var currentGenres = currentManga.genres;
  genresDiv.textContent = 'Genre(s): ';
  for (var a = 0; a < currentGenres.length; a++) {
    var curGenre = currentGenres[a];
    if (a === currentGenres.length - 1) {
      genresDiv.textContent += curGenre.name;
    } else {
      genresDiv.textContent += curGenre.name + ', ';
    }
  }
  $modalContent.appendChild(genresDiv);

  var synopDiv = document.createElement('div');
  synopDiv.textContent = 'Synopsis: ' + currentManga.synopsis;
  synopDiv.className = 'infoRow synop';
  $modalContent.appendChild(synopDiv);

  var modalBut = document.createElement('div');
  modalBut.className = 'modalBut';

  var modalOkButtonSpan = document.createElement('span');
  modalOkButtonSpan.textContent = 'OK';
  modalOkButtonSpan.className = 'modalOkButton';
  modalBut.appendChild(modalOkButtonSpan);

  $modalContent.appendChild(modalBut);

}

function xhrReqIDManga(id) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://lfz-cors.herokuapp.com/?url=https://api.jikan.moe/v3/manga/' + id);
  xhr.setRequestHeader('token', 'abc123');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {

    var currentManga = xhr.response;
    buildModalManga(currentManga);
  });
  xhr.send();
}

$termSearch.addEventListener('submit', function (event) {
  event.preventDefault();
  $resultsList.replaceChildren();
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
  event.preventDefault();
  $resultsList.replaceChildren();
  if ($latestRadio.checked === true) {
    season = '2021spring';
  } else if ($previousRadio.checked === true) {
    var yr = $yearDropDown.value;
    var sea = $seasonDropDown.value;
    season = yr + sea;
  }
  var year = season.slice(0, 4);
  var seas = season.slice(4);
  var cap = seas.charAt(0).toUpperCase() + seas.slice(1);

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
    var currentMedium = event.target.getAttribute('medium');
    var currentId = event.target.getAttribute('id');
    if (currentMedium === 'anime') {
      xhrReqIDAnime(currentId);
    } else if (currentMedium === 'manga') {
      xhrReqIDManga(currentId);
    }
  }
  if (event.target.className === 'far fa-star') {
    var newFave = {};
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
    var oldFave = {};
    oldFave.type = event.target.getAttribute('type');
    oldFave.id = event.target.getAttribute('id');
    var oldFaveIndex;
    for (var a = 0; a < data.faves.length; a++) {
      var currentFave = {};
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
      var oldMangaId;
      oldMangaId = oldFave.id;
      var oldMangaIndex;
      var currentMangaID;
      for (var b = 0; b < data.mangaIDs.length; b++) {
        currentMangaID = data.mangaIDs[b];
        if (oldMangaId === currentMangaID) {
          oldMangaIndex = b;
          break;
        }
      }
      data.mangaIDs.splice(oldMangaIndex, 1);
    } else {
      var oldAnimeId;
      oldAnimeId = oldFave.id;
      var oldAnimeIndex;
      var currentAnimeID;
      for (var c = 0; c < data.animeIDs.length; c++) {
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
  $searches.className = 'row searches hidden';
  $resultsTitle.textContent = 'Current favorites in My List:';
  $resultsList.replaceChildren();

  for (var a = 0; a < data.faves.length; a++) {
    var seriesObj = {};
    seriesObj = data.faves[a];
    var $series50 = document.createElement('div');
    $series50.className = 'div series50';

    var showImage = document.createElement('img');
    showImage.setAttribute('src', seriesObj.img);
    $series50.appendChild(showImage);

    var titleDiv = document.createElement('div');
    titleDiv.textContent = seriesObj.title;
    $series50.appendChild(titleDiv);

    var typeDiv = document.createElement('div');
    typeDiv.textContent = seriesObj.type;
    $series50.appendChild(typeDiv);

    var yearDiv = document.createElement('div');
    yearDiv.textContent = seriesObj.year;
    $series50.appendChild(yearDiv);

    if (seriesObj.type === 'Manga' || seriesObj.type === 'Light Novel' || seriesObj.type === 'One-shot' || seriesObj.type === 'Manhwa' ||
      seriesObj.type === 'Manhua' || seriesObj.type === 'Doujinshi' || seriesObj.type === 'Novel') {
      var chaptersDiv = document.createElement('div');
      chaptersDiv.textContent = 'Chapter(s): ' + seriesObj.chapters;
      $series50.appendChild(chaptersDiv);
    } else {
      var episodesDiv = document.createElement('div');
      episodesDiv.textContent = 'Episodes: ' + seriesObj.episodes;
      $series50.appendChild(episodesDiv);
    }

    var butDiv = document.createElement('div');
    butDiv.className = 'butDiv';
    $series50.appendChild(butDiv);

    var moreInfoButtonSpan = document.createElement('span');
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

    var iStar = document.createElement('i');
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
});

$goSearchBut.addEventListener('click', function (event) {
  $searches.className = 'row searches';
  $myList.className = 'myList inactive';
  $goSearchBut.className = 'goSearchBut active';
});
