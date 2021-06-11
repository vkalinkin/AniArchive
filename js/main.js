/* global data */
/* exported data */
var $resultsList = document.querySelector('.resultsList');
var $searchBox = document.querySelector('#searchBox');
// var $searchButton = document.querySelector('.searchButton');

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
var $searches = document.querySelector('.searches');

var searchTerm = '';
var season = '2021spring';

function xhrReqAnime() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://lfz-cors.herokuapp.com/?url=https://api.jikan.moe/v3/search/anime?q=' + searchTerm);
  xhr.setRequestHeader('token', 'abc123');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {

    var searchResults = xhr.response.results;
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

      var yearDiv = document.createElement('div');
      var yearString = String(seriesObj.start_date);
      yearString = yearString.slice(0, 4);
      yearDiv.textContent = yearString;
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
      iStar.setAttribute('title', seriesObj.title);
      iStar.setAttribute('type', seriesObj.type);
      iStar.setAttribute('year', yearString);
      iStar.setAttribute('episodes', seriesObj.episodes);
      iStar.setAttribute('id', seriesObj.mal_id);
      iStar.setAttribute('img', seriesObj.image_url);
      butDiv.appendChild(iStar);
      // <i class="far fa-star"></i>

      $resultsList.appendChild($series50);
    }
  });
  xhr.send();
}

function xhrReqManga() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://lfz-cors.herokuapp.com/?url=https://api.jikan.moe/v3/search/manga?q=' + searchTerm);
  xhr.setRequestHeader('token', 'abc123');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {

    var searchResults = xhr.response.results;
    for (var a = 0; a < searchResults.length; a++) {
      var seriesObj = {};
      seriesObj = searchResults[a];
      var $series50 = document.createElement('div');
      $series50.className = 'div series50';

      var showImage = document.createElement('img');
      showImage.setAttribute('src', seriesObj.image_url);
      $series50.appendChild(showImage);

      var titleDiv = document.createElement('div');
      titleDiv.textContent = seriesObj.title;
      $series50.appendChild(titleDiv);

      var typeDiv = document.createElement('div');
      typeDiv.textContent = seriesObj.type;
      $series50.appendChild(typeDiv);

      var yearDiv = document.createElement('div');
      var yearString = String(seriesObj.start_date);
      yearString = yearString.slice(0, 4);
      yearDiv.textContent = yearString;
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
      iStar.setAttribute('title', seriesObj.title);
      iStar.setAttribute('type', seriesObj.type);
      iStar.setAttribute('year', yearString);
      iStar.setAttribute('chapters', seriesObj.chapters);
      iStar.setAttribute('id', seriesObj.mal_id);
      iStar.setAttribute('img', seriesObj.image_url);

      butDiv.appendChild(iStar);

      $resultsList.appendChild($series50);
    }
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
    for (var a = 0; a < searchResults.length; a++) {
      var seriesObj = {};
      seriesObj = searchResults[a];
      var $series50 = document.createElement('div');
      $series50.className = 'div series50';

      var showImage = document.createElement('img');
      showImage.setAttribute('src', seriesObj.image_url);
      $series50.appendChild(showImage);

      var titleDiv = document.createElement('div');
      titleDiv.textContent = seriesObj.title;
      $series50.appendChild(titleDiv);

      var typeDiv = document.createElement('div');
      typeDiv.textContent = seriesObj.type;
      $series50.appendChild(typeDiv);

      var yearDiv = document.createElement('div');
      var yearString = String(seriesObj.airing_start);
      yearString = yearString.slice(0, 4);
      yearDiv.textContent = yearString;
      $series50.appendChild(yearDiv);

      var episodesDiv = document.createElement('div');
      episodesDiv.textContent = 'Episodes: ' + seriesObj.episodes;
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
      iStar.setAttribute('title', seriesObj.title);
      iStar.setAttribute('type', seriesObj.type);
      iStar.setAttribute('year', yearString);
      iStar.setAttribute('episodes', seriesObj.episodes);
      iStar.setAttribute('id', seriesObj.mal_id);
      iStar.setAttribute('img', seriesObj.image_url);
      butDiv.appendChild(iStar);

      $resultsList.appendChild($series50);
    }
  });
  xhr.send();
}

function xhrReqIDAnime(id) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://lfz-cors.herokuapp.com/?url=https://api.jikan.moe/v3/anime/' + id);
  xhr.setRequestHeader('token', 'abc123');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    var currentAnime = xhr.response;

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
  });
  xhr.send();
}

function xhrReqIDManga(id) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://lfz-cors.herokuapp.com/?url=https://api.jikan.moe/v3/manga/' + id);
  xhr.setRequestHeader('token', 'abc123');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    // console.log(xhr.response);

    var currentManga = xhr.response;

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
    var pub = currentManga.published;
    var fromPub = pub.from;
    var year = fromPub.slice(0, 4);
    yearDiv.textContent = year;
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

  });
  xhr.send();
}

$termSearch.addEventListener('submit', function (event) {
  event.preventDefault();
  $resultsList.replaceChildren();
  searchTerm = $searchBox.value;

  if ($animeRadio.checked === true) {
    xhrReqAnime();
  } else if ($mangaRadio.checked === true) {
    xhrReqManga();
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
  xhrReqSeason(year, seas);
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
  // console.log('clicked!');
  if (event.target.className === 'moreInfoButton') {
    // console.log('more info button clicked');
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
    // console.log("Star clicked!");
    // var currentTitle = event.target.getAttribute('title');
    // var currentYear = event.target.getAttribute('year');
    // var currentType = event.target.getAttribute('type');
    // var currentChapters = event.target.getAttribute('chapters');
    // console.log('current title:', currentTitle);
    // console.log('current year:', currentYear);
    // console.log('current type:', currentType);
    // console.log('current chapters:', currentChapters);

    var newFave = {};
    newFave.type = event.target.getAttribute('type');
    newFave.id = event.target.getAttribute('id');
    newFave.title = event.target.getAttribute('title');
    newFave.year = event.target.getAttribute('year');
    newFave.img = event.target.getAttribute('img');
    // var chapters = event.target.getAttribute('chapters');
    if (newFave.type === 'Manga' || newFave.type === 'Light Novel') {
      newFave.chapters = event.target.getAttribute('chapters');
    } else {
      newFave.episodes = event.target.getAttribute('episodes');
    }
    // if (episodes !== null){
    //   newFave.episodes = event.target.getAttribute('episodes');
    // } else {
    //   newFave.chapters = event.target.getAttribute('chapters');
    // }

    data.faves.push(newFave);
    event.target.className = 'fas fa-star';
  }
});

$modalContent.addEventListener('click', function (event) {
  if (event.target.className === 'modalOkButton') {
    $modal.className = 'modal hidden';
  }
});

$myList.addEventListener('click', function (event) {
  $searches.className = 'row searches hidden';

  for (var a = 0; a < data.faves.length; a++) {
    var seriesObj = {};
    seriesObj = data.faves[a];
    var $series50 = document.createElement('div');
    $series50.className = 'div series50';

    var showImage = document.createElement('img');
    showImage.setAttribute('src', seriesObj.img);
    $series50.appendChild(showImage);

    // var showImage = document.createElement('img');
    // showImage.setAttribute('src', seriesObj.image_url);
    // $series50.appendChild(showImage);

    var titleDiv = document.createElement('div');
    titleDiv.textContent = seriesObj.title;
    $series50.appendChild(titleDiv);

    var typeDiv = document.createElement('div');
    typeDiv.textContent = seriesObj.type;
    $series50.appendChild(typeDiv);

    var yearDiv = document.createElement('div');
    yearDiv.textContent = seriesObj.year;
    $series50.appendChild(yearDiv);

    var episodesDiv = document.createElement('div');
    episodesDiv.textContent = 'Episodes: ' + seriesObj.episodes;
    $series50.appendChild(episodesDiv);

    var butDiv = document.createElement('div');
    butDiv.className = 'butDiv';
    $series50.appendChild(butDiv);

    var moreInfoButtonSpan = document.createElement('span');
    moreInfoButtonSpan.textContent = 'More Info';
    moreInfoButtonSpan.className = 'moreInfoButton';
    moreInfoButtonSpan.setAttribute('id', seriesObj.id);
    // fix v
    moreInfoButtonSpan.setAttribute('medium', 'anime');
    butDiv.appendChild(moreInfoButtonSpan);

    $resultsList.appendChild($series50);

    // var showImage = document.createElement('img');
    // showImage.setAttribute('src', seriesObj.image_url);
    // $series50.appendChild(showImage);

    // var titleDiv = document.createElement('div');
    // titleDiv.textContent = seriesObj.title;
    // $series50.appendChild(titleDiv);

    // var typeDiv = document.createElement('div');
    // typeDiv.textContent = seriesObj.type;
    // $series50.appendChild(typeDiv);

    // var yearDiv = document.createElement('div');
    // var yearString = String(seriesObj.airing_start);
    // yearString = yearString.slice(0, 4);
    // yearDiv.textContent = yearString;
    // $series50.appendChild(yearDiv);

    // var episodesDiv = document.createElement('div');
    // episodesDiv.textContent = 'Episodes: ' + seriesObj.episodes;
    // $series50.appendChild(episodesDiv);

    // var butDiv = document.createElement('div');
    // butDiv.className = 'butDiv';
    // $series50.appendChild(butDiv);

    // var moreInfoButtonSpan = document.createElement('span');
    // moreInfoButtonSpan.textContent = 'More Info';
    // moreInfoButtonSpan.className = 'moreInfoButton';
    // moreInfoButtonSpan.setAttribute('id', seriesObj.id);
    // moreInfoButtonSpan.setAttribute('medium', 'anime');
    // butDiv.appendChild(moreInfoButtonSpan);

    // modalData.appendChild(modalTopDiv);

    // $modalContent.appendChild(modalTopDiv);
  }

});
