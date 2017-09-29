// Provide your access token
L.mapbox.accessToken = 'pk.eyJ1Ijoiam9zZXBzaXRqYXIiLCJhIjoiNXhaUDE0byJ9.f72o2M2gG-g0TqZlIemYvg';
// Create a map in the div #map
var map = L.mapbox.map('map', 'piratefsh.nknilk08');

// Create a divicon
var icon = L.divIcon({
  iconSize: [30, 30],
  iconAnchor: [15, 15],
  popupAnchor: [10, 0],
  shadowSize: [0, 0],
  className: 'animated-icon my-icon',
  html: ''
});

//marker latlng
var ll = L.latLng(40.795, -73.953)

// create marker
var marker = L.marker(ll, {
  icon: icon,
  title: 'look at me!'
})

marker.addTo(map)

// do stuff after marker has been added
marker.on('add', function(){

  doAnimations()
  // putting this in setInterval so it runs forever
  setInterval(function(){
    doAnimations()
  }, 5000)
})
  
function doAnimations(){
   var myIcon = document.querySelector('.my-icon')
  
   setTimeout(function(){
      myIcon.style.width = '50px'
      myIcon.style.height = '50px'
      myIcon.style.marginLeft = '-25px'
      myIcon.style.marginTop = '-25px'
    }, 1000)

    setTimeout(function(){
      myIcon.style.borderRadius = '10%'
      myIcon.style.backgroundColor = 'skyblue'
    }, 2000)

    setTimeout(function(){
      myIcon.style.width = '30px'
      myIcon.style.height = '30px'
      myIcon.style.borderRadius = '50%'
      myIcon.style.marginLeft = '-15px'
      myIcon.style.marginTop = '-15px'
    }, 3000)
}
