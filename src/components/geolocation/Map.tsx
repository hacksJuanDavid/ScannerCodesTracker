import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { useEffect, useState } from 'react';
import { useDataQrStore } from '../../store/DataQrStore';
import RoutingMap from './RoutingMap';
import RewarForUser from '../rewards/RewardForUser';

/*
Example coords
[
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
    ]
*/

// Custom marker
L.Marker.prototype.options.icon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png"
});

// Componente Map
export default function Map() {
    // Use store DataQrStore
    const { dataQRs } = useDataQrStore();
    // State to waypoints coordinates
    const [waypoints, setWaypoints] = useState<any>([]);
    // State to count waypoints
    const [count, setCount] = useState<number>(0);

    // useEffect to set waypoints
    useEffect(() => {
        setWaypoints(dataQRs);
        setCount(dataQRs.length);
    }, [dataQRs]);

    // Render map
    return (
        <div>
            {/* Geo data */}
            <h2>Geo Data</h2>
            <ul>
                {waypoints.map((waypoint: any, index: number) => (
                    <li key={index}>
                        <p>Latitude: {waypoint.coords.latitude}</p>
                        <p>Longitude: {waypoint.coords.longitude}</p>
                    </li>
                ))}
            </ul>

            {/* Verfiy if exist coord after rendering MapContainer */}
            {waypoints.length > 0 && (
                <MapContainer center={[waypoints[0].coords.latitude, waypoints[0].coords.longitude]} zoom={12} style={{ height: "500px" }}>
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
            )}
            {/* Render reward for user */}
            {count === 4 && <RewarForUser />}
        </div>
    );
}


