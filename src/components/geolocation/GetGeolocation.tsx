import { lazy, Suspense, useEffect, useState } from 'react';
import { IonCard, IonCardContent, IonCardTitle, IonText } from '@ionic/react';
import { Geolocation } from '@capacitor/geolocation';

// Component Map 
const Map = lazy(() => import('./Map'));

// Component GetGeolocation
export default function GetGeolocation() {
    // State to store geolocation
    const [geolocation, setGeolocation] = useState<any>(null);

    // Function to get current position
    const getCurrentPosition = async () => {
        try {
            const position = await Geolocation.getCurrentPosition();
            console.log('Current position:', position);
            setGeolocation(position);
        } catch (error) {
            console.error('Error getting current position:', error);
        }
    };

    // UseEffect to get current position
    useEffect(() => {
        getCurrentPosition();
    } , []);

    return (
        <div>
            <IonCard>
                <IonCardContent>
                    <IonCardTitle className='ion-text-center'>
                        Geolocation
                    </IonCardTitle>
                    {geolocation && (
                        <IonText className='ion-text-center'>
                            <h1>Current Position:</h1>
                            <h3>Latitude: {geolocation.coords.latitude}</h3>
                            <h3>Longitude: {geolocation.coords.longitude}</h3>
                        </IonText>
                    )}
                    <Suspense fallback={<div>Loading...</div>}>
                        {geolocation && <Map geoData={geolocation} />}
                    </Suspense>
                </IonCardContent>
            </IonCard>
        </div>
    );
}