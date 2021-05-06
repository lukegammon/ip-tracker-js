
//Map Initialization
let mymap = L.map('mapid').setView([51.505, -0.09], 13);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibHVrZWdhbW1vbiIsImEiOiJja29jeXlrM3MzZWt4MndscDJ3c2t6bWN5In0.foff0b_WTBNyxmUTYfHrIw',
    zoomControl: false
}).addTo(mymap);

//toggle zoom on mobile
async function getIp() {
    const response = await fetch(`https://geo.ipify.org/api/v1?apiKey=at_ZO4JNRm9Sp2zzvxGk5VNGjwtQ2RCT&ipAddress=8.8.8.8`);
    const data = await response.json();
    console.log(data);
    SetIPData(data)
  }

getIp();