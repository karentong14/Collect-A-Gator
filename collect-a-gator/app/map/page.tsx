import Link from 'next/link';
// import {createRoot} from "react-dom/client"; //idk what this does
import {APIProvider, Map, MapCameraChangedEvent} from '@vis.gl/react-google-maps';

const App = () => (
 <APIProvider apiKey={'AIzaSyDzlnZvBWEtR8J_jA-VMy32fsa5M9YREls'} onLoad={() => console.log('Maps API has loaded.')}>
   <Map
      defaultZoom={13}
      defaultCenter={ { lat: -33.860664, lng: 151.208138 } }
      onCameraChanged={ (ev: MapCameraChangedEvent) =>
        console.log('camera changed:', ev.detail.center, 'zoom:', ev.detail.zoom)
      }>
   </Map>
 </APIProvider>
);

const root = createRoot(document.getElementById('app'));
root.render(<App />);

export default App;