import { ImageOverlay, useMap } from "react-leaflet";
import mapImg from '../images/map/map.png'

function Map({bounds}) {
    const map = useMap()
    map.on('drag', function() {
      map.panInsideBounds(bounds, { animate: false });
    });

    return (
      <ImageOverlay url={mapImg}
          bounds={bounds}
          opacity={1}
          zIndex={10}
      />
    )
    
  }

  export default Map;