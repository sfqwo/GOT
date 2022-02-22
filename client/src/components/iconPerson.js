import L from 'leaflet';

function createIcon(hero){
  let DefaultIcon = L.icon({
    iconUrl: require(`../images/coat-of-arms/${hero}.png`),
    iconSize: new L.Point(30, 35),

  });
  L.Marker.prototype.options.icon = DefaultIcon;
  
  return DefaultIcon;
}


export default createIcon;