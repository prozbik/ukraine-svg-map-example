var Map = (function($) {
	var _mapInstance, _static = new Object();

	/*
		@params options = object
		@ url = request address
	*/
	function Region(options) {
		this.config = options == null ? new Object() : options;

		this.config.flag = false;

 }

	Region.prototype.getAll = function() {
		var self = this;
		$.get(this.config.url).done(function(response) {
			self.regions = response;
		}).fail(function(error) {
			console.error(error);
		});
	};

	Region.prototype.getById = function(id) {
		var self = this;
		$.ajax({
			url: this.config.url,
			method: 'get',
			dataType: 'json',
			data: { id: id }
		}).done(function(response) {
			self.currentRegion = response;
			self.writeToDom();
		}).fail(function(error) {
			console.error('No such data for this region');
		});
	};

	Region.prototype.writeToDom = function () {
		if(!this.currentRegion) {
			return false;
		}

		this.clearDom();

		var domMarkUp = $('<div>');

		$.each(this.currentRegion, function(key, value) {
			domMarkUp.append('<p>' + value + '</p>');
		});

		$('.current-region').append(domMarkUp);

	};

	Region.prototype.clearDom = function () {
		$('.current-region div').remove();
	};

	Region.prototype.init = function() {
		var self = this;

		document.querySelector('object').addEventListener('load',function () {

			var p = this.contentDocument.documentElement.querySelectorAll('path');

				for(i=0;i<p.length;i++){

					p[i].addEventListener('click', function(){

						self.getById(this.id);

				});

			}

		});
	};


	_static.getInstance = function(options) {
		if( !_mapInstance) {
			_mapInstance = new Region(options);
		}

		return _mapInstance;
	}

	return _static;

}(jQuery));



var map = Map.getInstance({url: 'http://localhost:3000/api'});



 // working with DOM

$(document).ready(function() {

	$('span.open').on('click', function() {

		var height = $('header.outer').height() > 0 ? 0 : '450px';

		map.config.flag = map.config.flag ? false: true;

			$('header.outer').animate({
				height: height
			}, function() {

				var mapSvg = $('<object>').attr({
					type: 'image/svg+xml',
					data: '/uk.svg',
					id: 'map-svg'
				});

				if(map.config.flag) {
					$('.map').append(mapSvg);
					// add event listener on each path in svg document
					map.init();

				} else {
					map.clearDom();
					$('object#map-svg').remove();
				}

			});
	});
});
