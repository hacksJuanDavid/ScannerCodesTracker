import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { useState } from 'react';
import RoutingMap from './RoutingMap';
import RewarForUser from '../rewards/rewardForUser';

// Custom marker
L.Marker.prototype.options.icon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png"
});

// Componente Map
export default function Map({ geoData }: any) {
    // State to waypoints coordinates
    const [waypoints, setWaypoints] = useState<any>([
        {
            coords: {
                latitude: 3.425248,
                longitude: -76.5229917
            }
        },
        {
            coords: {
                latitude: 3.450099,
                longitude: -76.5485156
            }
        },
        {
            coords: {
                latitude: 3.392099,
                longitude: -76.5485156
            }
        },
        {
            coords: {
                latitude: 3.342099,
                longitude: -76.5285156
            }
        }
    ]);
    // State to count waypoints
    const [count, setCount] = useState<number>(waypoints.length);

    // Render map
    return (
        <div>
            <MapContainer center={[waypoints[0].coords.latitude, waypoints[0].coords.longitude]} zoom={12} style={{ height: "1000px" }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {/* Render markers */}
                {waypoints.map((waypoint: any, index: number) => (
                    <Marker key={index} position={[waypoint.coords.latitude, waypoint.coords.longitude]} />
                ))}

                {/* Render routing */}
                <RoutingMap />
            </MapContainer>
            {/* Render reward for user */}
            { count === 4 && <RewarForUser />}
        </div>
    );
}


