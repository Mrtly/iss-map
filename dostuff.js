const mymap = L.map('issMap').setView([0, 0], 1);
const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tileUrl);
tiles.addTo(mymap);

 const layer = new L.StamenTileLayer("watercolor");
 mymap.addLayer(layer);

const issIcon = L.icon({
iconUrl: 'iss.png',
iconSize: [50, 32],
iconAnchor: [25, 16]});
const marker = L.marker([0, 0], { icon : issIcon }).addTo(mymap);

const apiUrl = 'https://api.wheretheiss.at/v1/satellites/25544';

async function getISS(){
    const response = await fetch(apiUrl);
    const data = await response.json();
    const { latitude, longitude } = data;

    marker.setLatLng([latitude, longitude]);
    mymap.setView([latitude, longitude], 3);

    document.getElementById('lat').textContent = latitude.toFixed(2);
    document.getElementById('lon').textContent = longitude.toFixed(2);
};

getISS();
setInterval(getISS, 1000);
