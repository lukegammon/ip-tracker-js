const corsBypass = "https://cors-anywhere.herokuapp.com/"
const ipapiURL = "http://ip-api.com/json/";
const fields = "fstatus,message,region,city,zip,lat,lon,isp,query,offset"

// Location elements to update
let page_ip = document.querySelector(".ip");
let page_location = document.querySelector(".location");
let page_timezone = document.querySelector(".timezone");
let page_isp = document.querySelector(".isp");

// Form elements
const input = document.querySelector(".hero__input");
const inputBtn = document.querySelector(".hero__input-btn");

const headers_option = {
  headers: {
    'Access-Control-Allow-Origin': '*',
  }
}

//Map Initialization
let mymap = L.map('mapid', {
  center: [51.505, -0.09],
  zoom:  13
});

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibHVrZWdhbW1vbiIsImEiOiJja29jeXlrM3MzZWt4MndscDJ3c2t6bWN5In0.foff0b_WTBNyxmUTYfHrIw',
    zoomControl: false
}).addTo(mymap);


async function getData(ipAddress) {
  const response = await fetch(`${corsBypass}${ipapiURL}/${ipAddress}?fields=${fields}`);
  const data = await response.json();
  setData(data)
  console.log(data);
}

function setData(data) {
  const ip = data.query;
  const location = `${data.city}, ${data.region} ${data.zip}`;
  const timezoneHours = data.offset / 3600;
  const timezone = timezoneHours < 0 ? `UTC ${timezoneHours}:00` : `UTC +${timezoneHours}:00`;
  const isp = data.isp;
  const lat = data.lat;
  const lon = data.lon;
  page_ip.innerHTML = ip;
  page_location.innerHTML = location;
  page_timezone.innerHTML = timezone;
  page_isp.innerHTML = isp;
  mymap.flyTo([lat,lon], 14, {
    animate: true,
    duration: 3
  });
  L.marker([lat, lon]).addTo(mymap);
}


getData("1.1.1.1");



//TODO
  //toggle zoom on mobile