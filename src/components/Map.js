import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";

const Map = () => {
  mapboxgl.accessToken =
    "pk.eyJ1Ijoic3dhc2h0aWNrZXQiLCJhIjoiY2xkeG5vNGlhMGlmZTQybnZwOHB1MTYyNCJ9.lioI3WWVgFtdPRCGmSZFpg";
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(28.975069);
  const [lat, setLat] = useState(41.031253);
  const [zoom, setZoom] = useState(10);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/dark-v11",
      center: [lng, lat],
      zoom: zoom,
    });
  });
  return (
    <div>
      <div ref={mapContainer} className='h-96' />
    </div>
  );
};

export default Map;
