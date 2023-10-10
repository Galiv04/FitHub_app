import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";
import "./Tab1.css";

import { useLocation } from "react-router";

const Workout = () => {
  const location = useLocation();
  const data = location.state ? location.state : ""; // if undefined replace with empty string

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Workout</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Workout</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name={data.testText} />
        <p>{data.textTest}</p>
      </IonContent>
    </IonPage>
  );
};

export default Workout;
