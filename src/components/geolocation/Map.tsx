import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine';
import { MapContainer, TileLayer, Marker, Tooltip } from 'react-leaflet';
import { useEffect, useState } from 'react';
import { useDataQrStore } from '../../store/DataQrStore';
import RoutingMap from './RoutingMap';
import RewarForUser from '../rewards/RewardForUser';
import { IonCard, IonCardTitle, IonCol, IonGrid, IonInput, IonItem, IonRow } from '@ionic/react';

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
            {/* Geo data list info */}
            <IonCard>
                <IonCardTitle className='ion-text-center'>Geo Data List Info</IonCardTitle>
                {dataQRs.map((dataQR: any, index: number) => (
                    <IonGrid key={index}>
                        <IonCard>
                            <IonRow>
                                <IonCol sizeXs='12'>
                                    <IonItem>Id: {dataQR.id}</IonItem>
                                </IonCol>
                                <IonCol sizeXs='12'>
                                    <IonItem>Data QR Content:
                                        <IonInput value={dataQR.dataQRContent} readonly></IonInput>
                                    </IonItem>
                                </IonCol>
                                <IonCol sizeXs='12'>
                                    <IonItem>Date: {dataQR.date}</IonItem>
                                </IonCol>
                                <IonCol sizeXs='12'>
                                    <IonItem>Country: {dataQR.country}</IonItem>
                                </IonCol>
                                <IonCol sizeXs='12'>
                                    <IonItem>City: {dataQR.city}</IonItem>
                                </IonCol>
                                <IonCol sizeXs='12'>
                                    <IonItem>Latitude: {dataQR.coords.latitude}</IonItem>
                                </IonCol>
                                <IonCol sizeXs='12'>
                                    <IonItem>Longitude: {dataQR.coords.longitude}</IonItem>
                                </IonCol>
                            </IonRow>
                        </IonCard>
                    </IonGrid>
                ))}
            </IonCard>

            {/* Verfiy if exist coord after rendering MapContainer */}
            {waypoints.length > 0 && (
                <MapContainer center={[waypoints[0].coords.latitude, waypoints[0].coords.longitude]} zoom={12} style={{ height: "500px" }}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {/* Render markers */}
                    {waypoints.map((waypoint: any, index: number) => (
                        <Marker key={index} position={[waypoint.coords.latitude, waypoint.coords.longitude]}>
                            <Tooltip direction="top" offset={[0, -20]} opacity={1} permanent>
                                <span>{index === 0 ? 'origin' : index === waypoints.length - 1 ? 'destiny' : index}</span>
                            </Tooltip>
                        </Marker>
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


