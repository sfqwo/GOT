
import React, { useContext, useEffect, useRef} from 'react';
import { MapContainer, Marker, Tooltip} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import  Map  from './Map';
import { Context } from '..';
import {observer} from 'mobx-react-lite';
import createIcon from './iconPerson.js';

const App = observer( () =>  {
  const {heroes} = useContext(Context)
  const webSocket = useRef(null);

  useEffect(() => {
    webSocket.current = new WebSocket("ws://localhost:8081");
    webSocket.current.onmessage = (message) => {
      heroes.setHero(message.data);
    };
    return () => {
      webSocket.current.close()
    };
}, [heroes]);

const bounds = L.latLngBounds([0,0], [890, 1288])

  return (
    <>
      <MapContainer
        style={{ height: "890px" }}
        zoom={0}
        minZoom= {0}
        maxZoom={2}
        crs={L.CRS.Simple}
        center={bounds.getCenter()}> 
        <Map bounds={bounds}/>
        { heroes.allHeroes.map((el) =>
          <Marker 
            key={el.hero} 
            iconUrl={createIcon(el.house)}
            position={[el.y, el.x]}
            eventHandlers={{ mouseover: () => heroes.setOneHero(el) }}
          >
            <Tooltip 
              direction="right" 
              offset={[0, 0]} 
              opacity={el.showLabel}
            >
              {el.hero}
            </Tooltip>
          </Marker>
        )}
      </MapContainer>
    </>);
})


export default App;