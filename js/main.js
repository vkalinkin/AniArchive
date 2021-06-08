var $resultsList = document.querySelector('.resultsList');

var searchTem = 'gundam';

var xhrTest = new XMLHttpRequest();
xhrTest.open('GET', 'https://lfz-cors.herokuapp.com/?url=https://api.jikan.moe/v3/search/anime?q=' + searchTem);
xhrTest.setRequestHeader('token', 'abc123');
xhrTest.responseType = 'json';
xhrTest.addEventListener('load', function () {
  // console.log(xhrTest.response);
  var searchResults = xhrTest.response.results;
  for (var a = 0; a < searchResults.length; a++) {
    var seriesObj = {};
    // console.log(searchResults[a]);
    seriesObj = searchResults[a];
    var $series50 = document.createElement('div');
    $series50.className = 'div series50';
    var titleDiv = document.createElement('div');
    // console.log(seriesObj);
    titleDiv.textContent = seriesObj.title;
    $series50.appendChild(titleDiv);
    $resultsList.appendChild($series50);

  }
});
xhrTest.send();

// WORKS!
// var xhr = new XMLHttpRequest();
// xhr.open('GET', "https://lfz-cors.herokuapp.com/?url=https://api.jikan.moe/v3/search/anime?q=Gundam&page=1");
// xhr.setRequestHeader('token', 'abc123');
// xhr.responseType = 'json';
// xhr.addEventListener('load', function () {
//   console.log(xhr.response);
// });
// xhr.send();
