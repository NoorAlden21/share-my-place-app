export class Map {
  constructor(coords) {
    this._containerId = "map";
    this._map = null;
    this._marker = null;
    this._initMap(coords);
  }

  _initMap(coords) {
    // initialize once
    this._map = L.map(this._containerId, {
      dragging: true,
      inertia: true,
      inertiaDeceleration: 3000,
      inertiaMaxSpeed: 2500,
      easeLinearity: 0.2,

      zoomControl: true,
      zoomAnimation: true,
      zoomSnap: 0,
      zoomDelta: 0.5,
      wheelDebounceTime: 20,
      wheelPxPerZoomLevel: 80,
      scrollWheelZoom: true,
      doubleClickZoom: true,

      touchZoom: true,
      tapTolerance: 10,
      keyboard: true,
    }).setView([coords.lat, coords.lng], 16);

    // OSM tiles
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(this._map);

    this._marker = L.marker([coords.lat, coords.lng]).addTo(this._map);

    // ensures sizing after layout changes
    setTimeout(() => this._map.invalidateSize(), 0);
  }

  render(coords) {
    if (!this._map) return;
    const latlng = [coords.lat, coords.lng];
    this._map.setView(latlng, 16);
    if (this._marker) this._marker.setLatLng(latlng);
    else this._marker = L.marker(latlng).addTo(this._map);
  }
}
