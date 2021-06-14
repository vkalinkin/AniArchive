/* exported data */
var data = {
  faves: [],
  mangaIDs: [],
  animeIDs: []
};

var previousEntries = localStorage.getItem('javascript-local-storage');

if (previousEntries !== null) {
  data = JSON.parse(previousEntries);
}

window.addEventListener('beforeunload', function (event) {
  var dataJson = JSON.stringify(data);
  localStorage.setItem('javascript-local-storage', dataJson);
});
