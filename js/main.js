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

var searchTerm = '';

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

      var episodesDiv = document.createElement('div');
      episodesDiv.textContent = 'Episodes: ' + seriesObj.episodes;
      $series50.appendChild(episodesDiv);

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

$searchSelect.addEventListener('click', function (event) {
  event.preventDefault();
  if (event.target === $termButton) {
    // console.log('term button clicked!');
    $termSearch.className = 'row termSearch';
    $seasonSearch.className = 'row seasonSearch hidden';
  } else if (event.target === $seasonButton) {
    // console.log('season button clicked!');
    $termSearch.className = 'row termSearch hidden';
    $seasonSearch.className = 'row seasonSearch';
  }
});
