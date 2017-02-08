'use strict';

class Debugger {
	constructor() {
		this.customDebugging = false;
		this.debugId = false;
	}

	static geoErrorHandler(code, message) {
		this.logMessage(`geo.js error ${code}: ${message}`);
	}

	static logMessage(message) {
		return (this.customDebugging && this.debugId) ? this.debugElement() : console.log(message);
	}

	debugElement() {
		return document.getElementById(this.debugId).innerHTML;
	}

	set customDebugging(debugId) {
		this.debugId = debugId;
		this.customDebugging = true;
	}
}

class GPS {
	constructor(app) {
		this.app = app;
		this.refreshRate = 1000;
		this.currentPosition = false;
		this.currentPositionMarker = false;

		this.checkLocations = this.checkLocations.bind(this);
		this.initialize = this.initialize.bind(this);
		this.startPollingPosition = this.startPollingPosition.bind(this);
		this.setPosition = this.setPosition.bind(this);
	}

	initialize() {
		console.log('GPS.initialize()');
		Debugger.logMessage('Controleer of GPS beschikbaar is...');

		if (navigator.geolocation) {
			this.startPollingPosition();
		}
	}

	bindMap(map) {
		this.map = map;
	}

	startPollingPosition() {
		Debugger.logMessage('GPS is beschikbaar, vraag positie.');
		navigator.geolocation.watchPosition(this.setPosition, Debugger.logMessage);
	}

	setPosition(position) {
		Debugger.logMessage(`GPS.setPosition(), ${position}`);

		this.currentPosition = position;
		Debugger.logMessage(`position latitude: ${position.coords.latitude}, longitude: ${position.coords.longitude}`);

		this.app.initMap(this);

		if (this.map.currentPositionMarker) {
			// this.checkLocations();
			this.map.updateUserPosition(position);
		}
	}

	getPosition() {
		return this.currentPosition;
	}

	checkLocations() {
		// the locations variable is defined externally
		locations.forEach(location => {
			const loc = {
				coords: {
					latitude: location[3],
					longitude: location[4],
				},
			};

			if (this.calculateDistance(loc, this.currentPosition) < loc[2]) {
				if (window.location !== loc[1] && localStorage[loc[0]] === 'false') {
					try {
						localStorage[loc[0]] = localStorage[loc[0]] === 'false' ? 1 : localStorage[loc[0]]++;
					} catch (error) {
						Debugger.logMessage(`localStorage kan niet aangesproken worden: ${error}`);
					}

					window.location = loc[1];
					Debugger.logMessage(`Speler is binnen een straal van ${loc[2]} meter van ${loc[0]}`);
				}
			}
		});
	}

	calculateDistance(p1, p2) {
		const pos1 = new google.maps.LatLng(p1.coords.latitude, p1.coords.longitude);
		const pos2 = new google.maps.LatLng(p2.coords.latitude, p2.coords.longitude);
		return Math.round(google.maps.geometry.spherical.computeDistanceBetween(pos1, pos2), 0);
	}
}

class GoogleMap {
	constructor(canvasId = 'map', mapOptions, gps) {
		this.canvasId = canvasId;
		this.map = null;
		this.gps = gps;
		this.mapOptions = mapOptions || {};
		this.routeList = [];
		this.currentPositionMarker = null;

		this.initialize = this.initialize.bind(this);
		this.getMapElement = this.getMapElement.bind(this);
	}

	initialize() {
		Debugger.logMessage(`Genereer een Google Maps kaart en toon deze in #${this.canvasId}`);
		this.map = new google.maps.Map(this.getMapElement(), this.mapOptions);
		this.drawUser();
	}

	getMapElement() {
		return document.getElementById(this.canvasId);
	}

	drawUser() {
		const currentPosition = this.gps.getPosition();
		const position = {
			lat: currentPosition.coords.latitude,
			lng: currentPosition.coords.longitude
		};

		// Voeg de locatie van de persoon door
		this.currentPositionMarker = new google.maps.Marker({
			position,
			map: this.map,
			title: 'U bevindt zich hier'
		});
	}

	updateUserPosition(position) {
		const newPosition = new google.maps.LatLng(
			position.coords.latitude,
			position.coords.longitude
		);

		this.map.setCenter(newPosition);
		this.currentPositionMarker.setPosition(newPosition);
	}

	drawRoute() {
		Debugger.logMessage(`Locaties intekenen, tourtype is ${tourType}`);
		locations.forEach((location, index) => {
			try {
				if (localStorage.visited === undefined || this.isNumber(localStorage.visited)) {
					localStorage[location[0]] = false;
				}
			} catch (err) {
				Debugger.logMessage(`localStorage kan niet aangesproken worden ${err}`);
			}

			const markerLatLng = new google.maps.LatLng(location[3], location[4]);
			routeList.push(markerLatLng);

			this.markerRow[index] = {};

			for (let attr in locationMarker) {
				this.markerRow[i][attr] = locatieMarker[attr];
			}

			this.markerRow[index].scale = location[2] / 3;

			const marker = new google.maps.Marker({
				position: markerLatLng,
				map: this.map,
				icon: markerRow[index],
				title: location[0],
			});
		});

		if (this.tourType === 'linear'){
			// Trek lijnen tussen de punten
			Debugger.logMessage("Route intekenen");
			var route = new google.maps.Polyline({
				clickable: false,
				map: this.map,
				path: this.routeList,
				strokeColor: 'Black',
				strokeOpacity: .6,
				strokeWeight: 3
			});
		}
	}

	isNumber(n) {
		return !isNaN(parseFloat(n)) && isFinite(n);
	}
}

class App {
	constructor() {
		this.geolocation = null;
		this.map = null;

		this.initGPS = this.initGPS.bind(this);
		this.initMap = this.initMap.bind(this);
		this.bindMaptoGPS = this.bindMaptoGPS.bind(this);
	}

	initGPS() {
		this.geolocation = new GPS(this);
		this.geolocation.initialize();
	}

	initMap(gps) {
		const position = this.geolocation.getPosition();

		const center = {
			lat: position.coords.latitude,
			lng: position.coords.longitude,
		};

		this.map = new GoogleMap('map', {
			zoom: 8,
			center
		}, gps);

		this.map.initialize();
		this.bindMaptoGPS();
	}

	bindMaptoGPS() {
		this.geolocation.bindMap(this.map);
	}
}

function initMap() {
	const app = new App();
	app.initGPS();
}
