import { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent } from "@ionic/react";
import RewardBigMacCombo from "/images/rewardBigMacCombo.png"

// Component rewarForUser
export default function RewarForUser() {
    return (
        <div>
            <IonCard>
                <img alt="Silhouette of mountains" src={RewardBigMacCombo} />
                <IonCardHeader>
                    <IonCardTitle>Reward for you!</IonCardTitle>
                    <IonCardSubtitle>You are win a cupon for go to dinner in nigh!!!</IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent>Is you momment for shared with you friends a best food in Mc donalds</IonCardContent>
            </IonCard>
        </div>
    );
}