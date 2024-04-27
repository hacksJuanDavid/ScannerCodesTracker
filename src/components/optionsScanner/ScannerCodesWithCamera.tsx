import { useState } from 'react';
import { IonButton, IonCard, IonCardContent, IonCardTitle, IonCol, IonGrid, IonRow, IonText } from '@ionic/react';
import { BarcodeScanner, BarcodeFormat, Barcode } from '@capacitor-mlkit/barcode-scanning';
import GetGeolocation from '../geolocation/GetGeolocation';

// Component ScannerCodesWithCamera
export default function ScannerCodesWithCamera() {
    // State to store barcode results
    const [barcodeResults, setBarcodeResults] = useState<Barcode[]>([]);
    // State to track if scanning has been done
    const [scanningDone, setScanningDone] = useState<boolean>(false);

    // Function to handle barcode scanning
    const scan = async () => {
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
            {/* GetGeolocation component */}
            {<GetGeolocation />}
        </div>
    );
}