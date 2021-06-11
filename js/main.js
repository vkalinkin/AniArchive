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
      chaptersDiv.textContent = 'Chapters: ' + seriesObj.chapters;
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
    // console.log(xhr.response);
    var currentAnime = xhr.response;
    // console.log('currentAnime', currentAnime);

    var modalTopDiv = document.createElement('div');
    modalTopDiv.className = 'modalTop row';

    var imgSpan = document.createElement('span');
    modalTopDiv.appendChild(imgSpan);

    var modalImg = document.createElement('img');
    modalImg.setAttribute('src', currentAnime.image_url);
    imgSpan.appendChild(modalImg);

    var textSpan = document.createElement('span');
    modalTopDiv.appendChild(textSpan);

    var titleDiv = document.createElement('div');
    titleDiv.textContent = currentAnime.title;
    textSpan.appendChild(titleDiv);

    var titleEngDiv = document.createElement('div');
    titleEngDiv.textContent = currentAnime.title_english;
    textSpan.appendChild(titleEngDiv);

    var yearDiv = document.createElement('div');
    var airTimes = currentAnime.aired.from;
    var year = airTimes.slice(0, 4);
    yearDiv.textContent = year;
    textSpan.appendChild(yearDiv);

    var typeDiv = document.createElement('div');
    typeDiv.textContent = currentAnime.type;
    textSpan.appendChild(typeDiv);

    var episodesDiv = document.createElement('div');
    episodesDiv.textContent = 'Episodes: ' + currentAnime.episodes;
    textSpan.appendChild(episodesDiv);

    var durationDiv = document.createElement('div');
    durationDiv.textContent = currentAnime.duration;
    textSpan.appendChild(durationDiv);

    var sourceDiv = document.createElement('div');
    sourceDiv.textContent = 'Source: ' + currentAnime.source;
    textSpan.appendChild(sourceDiv);

    var ratingDiv = document.createElement('div');
    ratingDiv.textContent = currentAnime.rating;
    textSpan.appendChild(ratingDiv);

    var studiosDiv = document.createElement('div');
    var currentStudios = currentAnime.studios;
    studiosDiv.textContent = 'Studio(s): ';
    for (var b = 0; b < currentStudios.length; b++) {
      var curStudio = currentStudios[b];
      studiosDiv.textContent += curStudio.name + ' ';
    }
    textSpan.appendChild(studiosDiv);

    $modalContent.appendChild(modalTopDiv);

    var genresDiv = document.createElement('div');
    var currentGenres = currentAnime.genres;
    genresDiv.textContent = 'Genre(s): ';
    for (var a = 0; a < currentGenres.length; a++) {
      var curGenre = currentGenres[a];
      genresDiv.textContent += curGenre.name + ' ';
    }
    $modalContent.appendChild(genresDiv);

    var synopDiv = document.createElement('div');
    synopDiv.textContent = 'Synopsis: ' + currentAnime.synopsis;
    $modalContent.appendChild(synopDiv);

    var modalBut = document.createElement('div');

    var modalOkButtonSpan = document.createElement('span');
    modalOkButtonSpan.textContent = 'OK';
    modalOkButtonSpan.className = 'modalOkButton';
    modalBut.appendChild(modalOkButtonSpan);

    $modalContent.appendChild(modalBut);
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
    imgSpan.appendChild(modalImg);

    var textSpan = document.createElement('span');
    modalTopDiv.appendChild(textSpan);

    var titleDiv = document.createElement('div');
    titleDiv.textContent = currentManga.title;
    textSpan.appendChild(titleDiv);

    var titleEngDiv = document.createElement('div');
    titleEngDiv.textContent = currentManga.title_english;
    textSpan.appendChild(titleEngDiv);

    var yearDiv = document.createElement('div');
    var pub = currentManga.published;
    // console.log('pub', pub);
    var fromPub = pub.from;
    // console.log('fromPub:', fromPub);
    var year = fromPub.slice(0, 4);
    yearDiv.textContent = year;
    textSpan.appendChild(yearDiv);

    var typeDiv = document.createElement('div');
    typeDiv.textContent = currentManga.type;
    textSpan.appendChild(typeDiv);

    var chaptersDiv = document.createElement('div');
    chaptersDiv.textContent = 'Chapters: ' + currentManga.chapters;
    textSpan.appendChild(chaptersDiv);

    // var durationDiv = document.createElement('div');
    // durationDiv.textContent = currentAnime.duration;
    // textSpan.appendChild(durationDiv);

    // var sourceDiv = document.createElement('div');
    // sourceDiv.textContent = 'Source: ' + currentAnime.source;
    // textSpan.appendChild(sourceDiv);

    // var ratingDiv = document.createElement('div');
    // ratingDiv.textContent = currentAnime.rating;
    // textSpan.appendChild(ratingDiv);

    // var studiosDiv = document.createElement('div');
    // var currentStudios = currentAnime.studios;
    // studiosDiv.textContent = 'Studio(s): ';
    // for (var b = 0; b < currentStudios.length; b++) {
    //   var curStudio = currentStudios[b];
    //   studiosDiv.textContent += curStudio.name + ' ';
    // }
    // textSpan.appendChild(studiosDiv);
    var authorDiv = document.createElement('div');
    var currentAuthors = currentManga.authors;
    // console.log('currentAuthors:', currentAuthors);
    authorDiv.textContent = 'Author(s): ';
    for (var b = 0; b < currentAuthors.length; b++) {
      // console.log('curAuthor:', curAuthor);
      var curAuthor = currentAuthors[b];
      var author = curAuthor.name;
      authorDiv.textContent += author + ' ';
    }
    textSpan.appendChild(authorDiv);

    var serialDiv = document.createElement('div');
    var currentSerial = currentManga.serializations;
    serialDiv.textContent = 'Serialization(s): ';
    for (var c = 0; c < currentSerial.length; c++) {
      var serial = currentSerial[c].name;
      serialDiv.textContent += serial + ' ';
    }
    textSpan.appendChild(serialDiv);

    $modalContent.appendChild(modalTopDiv);

    var genresDiv = document.createElement('div');
    var currentGenres = currentManga.genres;
    genresDiv.textContent = 'Genre(s): ';
    for (var a = 0; a < currentGenres.length; a++) {
      var curGenre = currentGenres[a];
      genresDiv.textContent += curGenre.name + ' ';
    }
    $modalContent.appendChild(genresDiv);

    var synopDiv = document.createElement('div');
    synopDiv.textContent = 'Synopsis: ' + currentManga.synopsis;
    $modalContent.appendChild(synopDiv);

    var modalBut = document.createElement('div');

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
  // console.log('year:', year);
  var seas = season.slice(4);
  // console.log('season:', seas);
  xhrReqSeason(year, seas);
});

$searchSelect.addEventListener('click', function (event) {
  event.preventDefault();
  if (event.target === $termButton) {
    // console.log('term button clicked!');
    $termSearch.className = 'row termSearch';
    $seasonSearch.className = 'row seasonSearch hidden';
    $termButton.className = 'termButton active';
    $seasonButton.className = 'seasonButton inactive';

  } else if (event.target === $seasonButton) {
    // console.log('season button clicked!');
    $termSearch.className = 'row termSearch hidden';
    $seasonSearch.className = 'row seasonSearch';
    $termButton.className = 'termButton inactive';
    $seasonButton.className = 'seasonButton active';
  }
});

$resultsList.addEventListener('click', function (event) {
  // console.log('clicked!');
  // console.log('event taget:', event.target);
  // console.log('$moreInfoButtonSpan', $moreInfoButtonSpan);
  // if (event.target === $moreInfoButtonSpan){
  //   console.log('more info button pressed!');
  // }
  // if (event.target === $butDiv){
  //   console.log('butDiv pressed!');
  // }
  if (event.target.className === 'moreInfoButton') {
    // console.log('CLICKED!')
    // console.log('target with class name of more Info button clicked!');
    $modalContent.replaceChildren();
    $modal.className = 'modal';
    var currentMedium = event.target.getAttribute('medium');
    var currentId = event.target.getAttribute('id');
    // console.log('current id:', currentId);
    if (currentMedium === 'anime') {
      xhrReqIDAnime(currentId);
    } else if (currentMedium === 'manga') {
      xhrReqIDManga(currentId);
    }

  }
});

$modalContent.addEventListener('click', function (event) {
  if (event.target.className === 'modalOkButton') {
    // console.log('modal ok button pressed!');
    $modal.className = 'modal hidden';
  }
});
