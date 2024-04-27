import L from "leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import { useMap } from "react-leaflet";
import { useEffect, useState } from "react";

// RoutingMap component
export default function RoutingMap() {
    // Use map
    const map = useMap();
    // State to waypoints coordinates
    const [waypoints, setWaypoints] = useState<any>([
        L.latLng(3.425248, -76.5229917),
        L.latLng(3.450099, -76.5485156),
        L.latLng(3.392099, -76.5485156),
        L.latLng(3.342099, -76.5285156)
    ]);

    // UseEffect to render routing
    useEffect(() => {
        // If map is not null
        if (!map) return;

        // Routing
        const routingControl = L.Routing.control({
            waypoints: waypoints,
            routeWhileDragging: true,
            lineOptions: {
                styles: [{ color: '#00FF00', weight: 7 }],
                extendToWaypoints: true,
                missingRouteTolerance: 100
            }
        }).addTo(map);

        // return function to remove routing
        return () => {
            map.removeControl(routingControl);
        };

    }, [map, waypoints]);

    return null;
}