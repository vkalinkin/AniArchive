/* exported data */
let data = {
  faves: [],
  mangaIDs: [],
  animeIDs: []
};

const previousEntries = localStorage.getItem('javascript-local-storage');

if (previousEntries !== null) {
  data = JSON.parse(previousEntries);
}

window.addEventListener('beforeunload', function (event) {
  const dataJson = JSON.stringify(data);
  localStorage.setItem('javascript-local-storage', dataJson);
});
