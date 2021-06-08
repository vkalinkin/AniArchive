var $resultsList = document.querySelector('.resultsList');
var $searchBox = document.querySelector('#searchBox');
var $searchButton = document.querySelector('.searchButton');

var searchTerm = '';

function xhrReq() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://lfz-cors.herokuapp.com/?url=https://api.jikan.moe/v3/search/anime?q=' + searchTerm);
  xhr.setRequestHeader('token', 'abc123');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    // console.log(xhr.response);
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

$searchButton.addEventListener('click', function (event) {
  $resultsList.replaceChildren();
  // event.preventDefault();
  searchTerm = $searchBox.value;
  // console.log('searchTerm:', searchTerm);
  xhrReq();
});
