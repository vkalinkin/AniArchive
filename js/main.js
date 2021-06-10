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
      moreInfoButtonSpan.setAttribute('malID', seriesObj.mal_id);
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
      moreInfoButtonSpan.setAttribute('malID', seriesObj.mal_id);
      moreInfoButtonSpan.setAttribute('medium', 'manga');
      butDiv.appendChild(moreInfoButtonSpan);

      $resultsList.appendChild($series50);
    }
  });
  xhr.send();
}

// https://lfz-cors.herokuapp.com/?url=https://api.jikan.moe/v3/season/2021/spring
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
      moreInfoButtonSpan.setAttribute('malID', seriesObj.mal_id);
      moreInfoButtonSpan.setAttribute('medium', 'anime');
      butDiv.appendChild(moreInfoButtonSpan);

      $resultsList.appendChild($series50);
    }
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
