import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';

const customMarker = L.icon({
    iconUrl: "data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24'%3E%3Ccircle cx='12' cy='12' r='8' fill='red' /%3E%3C/svg%3E",
    iconSize: [24, 24],
    iconAnchor: [12, 24],
})

export default function Map({ geoData }: any) {
    return (
        <MapContainer center={[geoData.coords.latitude, geoData.coords.longitude]} zoom={12} style={{ height: "500px" }}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {geoData.coords.latitude && geoData.coords.longitude && <Marker position={[geoData.coords.latitude, geoData.coords.longitude]} icon={customMarker} />}
        </MapContainer>
    )
}