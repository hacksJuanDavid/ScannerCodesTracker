import { IonButton, IonCard, IonCardContent, IonCardTitle, IonGrid, IonRow, IonText } from '@ionic/react';
import { useState } from 'react';
import { Barcode, BarcodeFormat, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { FilePicker } from '@capawesome/capacitor-file-picker';
import GetGeolocation from '../geolocation/GetGeolocation';

// Component ScannerCodesWithImages
export default function ScannerCodesWithImages() {
    // State to store barcode results
    const [barcodeResults, setBarcodeResults] = useState<Barcode[]>([]);
    // State to track if scanning has been done
    const [scanningDone, setScanningDone] = useState<boolean>(false);

    // Function to handle file selection and barcode scanning
    const handleScanBarcodeFromImage = async () => {
        try {
            // Pick image from device
            const { files } = await FilePicker.pickImages({ multiple: false });

            // Get path of selected image
            const path = files[0]?.path;

            // Check if image is selected
            if (!path) {
                console.warn('No image selected');
                return;
            }

            // Read barcodes from image
            const { barcodes } = await BarcodeScanner.readBarcodesFromImage({
                path,
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
                ], // Specify desired format(s)
            });

            // Set barcode results and scanning done
            setBarcodeResults(barcodes);
            setScanningDone(true);
        } catch (error) {
            console.error('Error scanning barcode:', error);
        }
    };
    
    // Render
    return (
        <div>
            <IonCard>
                <IonCardContent>
                    <IonCardTitle className='ion-text-center'>Scanner Codes With File</IonCardTitle>
                    <IonGrid>
                        <IonRow>
                            <IonButton onClick={handleScanBarcodeFromImage}>Scan Barcode By Image</IonButton>
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
            {scanningDone && <GetGeolocation />}
        </div>
    );
}
