import { IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { scanOutline } from 'ionicons/icons';
import ScannerCodes from '../components/scanner/ScannerCodes';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
             Scanner Codes Tracker
            <IonIcon icon={scanOutline} color='primary'/>
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Scanner Codes Tracker</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ScannerCodes />
      </IonContent>
    </IonPage>
  );
};

export default Home;
