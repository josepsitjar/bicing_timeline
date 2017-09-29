var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
var osmAttrib = '&copy; <a href="http://openstreetmap.org/copyright">' +
	'OpenStreetMap</a> contributors';
var osm = L.tileLayer(osmUrl, {
	maxZoom: 18,
	attribution: osmAttrib,
	noWrap: true
});
var map = L.map('map', {
	layers: [osm],
	center: new L.LatLng(41.4, 2.15),
	zoom: 12
	//maxBounds: [[2.278786,41.45106],[2.0924,41.341664]]
});


function updateList(timeline){
	var displayed = timeline.getLayers();
	var list = document.getElementById('displayed-list');
	list.innerHTML = "";
	displayed.forEach(function(quake){
		var li = document.createElement('li');
		li.innerHTML = quake.feature.properties.title;
		list.appendChild(li);
	});
}

// eqfeed_callback is called once the earthquake geojsonp file below loads
function eqfeed_callback(data){
	var getInterval = function(quake) {
		// earthquake data only has a time, so we'll use that as a "start"
		// and the "end" will be that + some value based on magnitude
		// 18000000 = 30 minutes, so a quake of magnitude 5 would show on the
		// map for 150 minutes or 2.5 hours
		return {
			start: quake.properties.time,
			end:   quake.properties.time + quake.properties.mag * 1800000
		};
	};
	var timelineControl = L.timelineSliderControl({
		formatOutput: function(date) {
			return new Date(date).toString();
		}
	});
	var timeline = L.timeline(data, {
		getInterval: getInterval,
		pointToLayer: function(data, latlng){
			var hue_min = 120;
			var hue_max = 0;
			var hue = data.properties.mag / 10 * (hue_max - hue_min) + hue_min;
			return L.circleMarker(latlng, {
				radius: data.properties.mag * 3,
				color: "hsl("+hue+", 100%, 50%)",
				fillColor: "hsl("+hue+", 100%, 50%)"
			}).bindPopup('<a href="'+data.properties.url+'">click for more info</a>');
		}
	});
	//timelineControl.addTo(map);
	//timelineControl.addTimelines(timeline);
	//timeline.addTo(map);

}


var url ="http://localhost/bicing/server/bicing_json.py";
jQuery.ajax({
	url: url,
	type: 'GET',
	contentType: 'application/jsonp',
	success: function (data){
			//console.log('eqfeed_callback('+JSON.parse(data)+')');
			//console.log(JSON.parse(data).features[1].properties);
			var getInterval = function(data) {
				// earthquake data only has a time, so we'll use that as a "start"
				// and the "end" will be that + some value based on magnitude
				// 18000000 = 30 minutes, so a quake of magnitude 5 would show on the
				// map for 150 minutes or 2.5 hours
				return {
					start: data.properties.hora,
					end: data.properties.hora + 100
				};
			};
			var timelineControl = L.timelineSliderControl({
				formatOutput: function(date) {
					return new Date(date).toString();
				}
			});

			//animate marker: http://piratefsh.github.io/mta-maps/public
			var timeline = L.timeline(JSON.parse(data), {
				getInterval: getInterval,
				pointToLayer: function(feature, latlng){
					return L.circleMarker(latlng,{
						//radius:8,
						radius:feature.properties.bikes * 2,
						fillColor:"#ff7800",
						color:"#000",
						weight:1,
						opacity:1,
						fillOpacity:0.8
					});
				}
			});
			timelineControl.addTo(map);
			timelineControl.addTimelines(timeline);
			timeline.addTo(map);
	}
});
