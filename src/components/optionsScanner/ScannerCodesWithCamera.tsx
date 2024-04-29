import { lazy, Suspense, useEffect, useState } from 'react';
import { IonButton, IonCard, IonCardContent, IonCardTitle, IonCol, IonGrid, IonRow, IonText } from '@ionic/react';
import { BarcodeScanner, BarcodeFormat, Barcode } from '@capacitor-mlkit/barcode-scanning';
import { useDataQrStore } from '../../store/DataQrStore';
import { nanoid } from 'nanoid';
import { Geolocation } from '@capacitor/geolocation';

// Component Map 
const Map = lazy(() => import('../geolocation/Map'));

// Component ScannerCodesWithCamera
export default function ScannerCodesWithCamera() {
    // Use store DataQrStore
    const { dataQRs, addDataQR } = useDataQrStore();
    // State to store barcode results
    const [barcodeResults, setBarcodeResults] = useState<Barcode[]>([]);
    // State to track if scanning has been done
    const [scanningDone, setScanningDone] = useState<boolean>(false);
    // State to store geolocation
    const [geolocation, setGeolocation] = useState<any>(null);
    // State to store location info
    const [locationInfo, setLocationInfo] = useState<any>(null);

    // Function to check if Google Barcode Scanner module is available
    const isGoogleBarcodeScannerModuleAvailable = async () => {
        const { available } =
            await BarcodeScanner.isGoogleBarcodeScannerModuleAvailable();
        return available;
    };

    // Function to install Google Barcode Scanner module
    const installGoogleBarcodeScannerModule = async () => {
        await BarcodeScanner.installGoogleBarcodeScannerModule();
    };

    // Function to handle barcode scanning
    const scan = async () => {
        // Check if Google Barcode Scanner module is available
        const available = await isGoogleBarcodeScannerModuleAvailable();
        // If not available, install Google Barcode Scanner module
        if (!available) {
            await installGoogleBarcodeScannerModule();
        }

        // Scan barcodes
        const { barcodes } = await BarcodeScanner.scan({
            formats: [
                BarcodeFormat.QrCode,
                BarcodeFormat.Aztec,
                BarcodeFormat.Codabar,
                BarcodeFormat.Code128,
                BarcodeFormat.Code39,
                BarcodeFormat.Code93,
                BarcodeFormat.DataMatrix,
                BarcodeFormat.Ean13,
                BarcodeFormat.Ean8,
                BarcodeFormat.Itf,
                BarcodeFormat.Pdf417,
                BarcodeFormat.UpcA,
                BarcodeFormat.UpcE,
            ],
        });
        // Set barcode results and scanning done
        setBarcodeResults(barcodes);
        setScanningDone(true);
        return barcodes;
    };

    // Function to open settings
    const openSettings = async () => {
        await BarcodeScanner.openSettings();
    };

    // Function to request permissions
    const requestPermissions = async () => {
        const { camera } = await BarcodeScanner.requestPermissions();
        return camera;
    };

    // Function to get current position
    const getCurrentPosition = async () => {
        try {
            // Get current position
            const position = await Geolocation.getCurrentPosition();
            // Set geolocation
            setGeolocation(position);
        } catch (error) {
            console.error('Error getting current position:', error);
        }
    };

    // Function to get current country
    const getCurrentCountryAndCity = async () => {
        try {
            // Get current position
            const position = await Geolocation.getCurrentPosition();
            // Get city and country based on geolocation
            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json`);
            const data = await response.json();
            const city = data.address.city;
            const country = data.address.country;
            // Set location info
            setLocationInfo({ city, country });
        } catch (error) {
            console.error('Error getting current country:', error);
        }
    };

    // UseEffect to get current position and country
    useEffect(() => {
        if (scanningDone && barcodeResults.length > 0) {
            getCurrentPosition(); 
            getCurrentCountryAndCity();
        }
    }, [scanningDone]);

    // UseEffect to add scanned barcode to store
    useEffect(() => {
        // Verificar si hay resultados de código de barras y agregar al almacén
        if (barcodeResults.length > 0 && geolocation) {
            barcodeResults.forEach((barcode) => {
                addDataQR({
                    id: nanoid(),
                    dataQRContent: barcode.rawValue,
                    date: new Date().toISOString(),
                    coords: {
                        latitude: geolocation.coords.latitude,
                        longitude: geolocation.coords.longitude
                    }
                });
            });
        }
    }, [barcodeResults, geolocation]);

    // Render
    return (
        <div>
            <IonCard>
                <IonCardContent>
                    <IonCardTitle className='ion-text-center'>Scanner Codes With Camera</IonCardTitle>
                    <IonGrid>
                        <IonRow>
                            <IonCol size='12' sizeLg='12'>
                                <IonButton onClick={scan}>Scan</IonButton>
                            </IonCol>
                            <IonCol size='12' sizeLg='12'>
                                <IonButton onClick={openSettings}>Open Settings</IonButton>
                            </IonCol>
                            <IonCol size='12' sizeLg='12'>
                                <IonButton onClick={requestPermissions}>Request Permissions</IonButton>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                    {barcodeResults.length > 0 && (
                        <IonText className='ion-text-center'>
                            <h2>Scanned Barcodes:</h2>
                            {barcodeResults.map((barcode, index) => (
                                <div key={index}>
                                    <p>Barcode: {barcode.rawValue}</p>
                                </div>
                            ))}
                        </IonText>
                    )}
                </IonCardContent>
            </IonCard>
            {scanningDone && (
                <Suspense fallback={<div>Loading...</div>}>
                    {dataQRs && <Map />}
                </Suspense>
            )}
        </div>
    );
}   