var googleMap = function(){};

$(function(){
	window.gMap = new googleMap();
	window.gMap.init();
});


googleMap.prototype.init = function(){
	this._bindEvents();
	this.initMap(39.81999969482422, -105.5);
};

googleMap.prototype._bindEvents = function(){
	$("#btn").on("click", $.proxy(this._getData, this) );
};

googleMap.prototype._getData = function(){
	var zipData = $("#zipData").val();
	this._request(zipData);
};

googleMap.prototype._request = function(param){
	var self = this;
	$.ajax({
		url: "https://api.meetup.com/2/cities",
		type: "GET",
		data: {query:param},
		dataType: "jsonp",
		success: function(data) {
			self.initMap(data.results[0].lat, data.results[0].lon );
		},
		failure:function(){
			alert("Failed");
		}
	});
};

googleMap.prototype.initMap = function(param1, param2){
	var uluru = {lat:param1, lng:param2};
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 4,
      center: uluru
    });
    var marker = new google.maps.Marker({
      position: uluru,
      map: map
    });
};
