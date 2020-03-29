const mymap = L.map('issMap').setView([0, 0], 1);
const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tileUrl);
tiles.addTo(mymap);

const layer = new L.StamenTileLayer("watercolor");
mymap.addLayer(layer);

const issIcon = L.icon({
    iconUrl: 'iss.png',
    iconSize: [50, 32],
    iconAnchor: [25, 16]
});
const marker = L.marker([0, 0], { icon: issIcon }).addTo(mymap);

const apiUrl = 'https://api.wheretheiss.at/v1/satellites/25544';

const getISS = () => {
    fetch(apiUrl)
        .then((response) => response.json())
        .then(function (data) {
            const { latitude, longitude } = data;
            marker.setLatLng([latitude, longitude]);
            mymap.setView([latitude, longitude]);
            document.getElementById('lat').textContent = latitude.toFixed(2);
            document.getElementById('lon').textContent = longitude.toFixed(2);
        })
        .catch(function (e) {
            console.error(e);
            alert("oops, something went wrong with the data! try refreshing the page")
        })
}
getISS();
mymap.setZoom(2);
setInterval(getISS, 1000);
