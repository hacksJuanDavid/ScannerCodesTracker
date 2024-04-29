import L from "leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import { useMap } from "react-leaflet";
import { useEffect, useState } from "react";
import { useDataQrStore } from '../../store/DataQrStore';

// RoutingMap component
export default function RoutingMap() {
    // Use store DataQrStore
    const { dataQRs } = useDataQrStore();
    // Use map
    const map = useMap();
    // State to waypoints coordinates
    const [waypoints, setWaypoints] = useState<any>([]);

    // useEffect to add waypoint
    useEffect(() => {
        setWaypoints(dataQRs.map((dataQR: any) => L.latLng(dataQR.coords.latitude, dataQR.coords.longitude)));
    }, [dataQRs]);

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