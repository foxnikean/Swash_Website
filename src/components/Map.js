import React, { useEffect, useRef, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
// Leaflet
import { OpenStreetMapProvider } from "leaflet-geosearch";
import {Icon} from 'leaflet';
import marker from "../assets/pin.png"


const Map = ({ address }) => {
  const [coord, setCoord] = useState([]);
  // Leaflet
  const provider = new OpenStreetMapProvider();
  const handleAddress = async () => {
    const results = await provider.search({
      query: address,
    });
    console.log(results);
    setCoord([results[0].bounds[0][0], results[0].bounds[0][1]]);
  };

  //Pin
  const myIcon = new Icon({
    iconUrl: marker,
    iconSize: [32,32]
   })

  useEffect(() => {
    handleAddress();
  }, []);
  return (
    <div>
      {coord.length === 0 ? null : (
        <MapContainer
          style={{ height: "200px", width: "100wh" }}
          center={coord.length === 0 ? [40, 40] : coord}
          zoom={13}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          />
          <Marker icon={new Icon({iconUrl: marker, iconSize: [25, 41], iconAnchor: [12, 41]})} position={coord.length === 0 ? [40, 40] : coord}>
          </Marker>
        </MapContainer>
      )}
    </div>
  );
};

export default Map;
