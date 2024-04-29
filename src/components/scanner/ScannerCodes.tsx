import { IonCard, IonCardContent, IonCol, IonGrid, IonRow } from '@ionic/react';
import ScannerCodesWithImages from '../optionsScanner/ScannerCodesWithImages';
import ScannerCodesWithCamera from '../optionsScanner/ScannerCodesWithCamera';

// Component ScannerCodes
export default function ScannerCodes() {
    return (
        <div>
            <h1 className='ion-text-center'>Scanner Codes Tracker</h1>
            <IonCard>
                <IonCardContent>
                    <IonGrid>
                        <IonRow>
                            <IonCol size='12' sizeLg='6'>
                                <ScannerCodesWithCamera />
                            </IonCol>
                            <IonCol size='12' sizeLg='6'>
                                <ScannerCodesWithImages />
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </IonCardContent>
            </IonCard>
        </div>
    );
}
