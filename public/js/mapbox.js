const mapBox = document.getElementById('map');

if (mapBox) {
  const locations = JSON.parse(
    document.getElementById('map').dataset.locations
  );
  displayMap(locations);
}

function displayMap(locations) {
  mapboxgl.accessToken =
    'pk.eyJ1IjoiY3BlcmV6bGVjYXJvcyIsImEiOiJjbG42Y2JqYnowZHk5MmlxejFpbHFxaHVzIn0.bPLGX8Alcs_V6sUE7oOHMw';
  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/cperezlecaros/cln6wqn1f006x01r7fl04a462',
    scrollZoom: false,
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach((loc) => {
    //crear marcador
    const el = document.createElement('div');
    el.className = 'marker';
    //añadir marcador
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom',
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    //añadir popup
    new mapboxgl.Popup({
      offset: 30,
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);
    //extender map bound para incluir la ubicación actual
    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100,
    },
  });
}
