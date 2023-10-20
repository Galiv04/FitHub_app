import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonImg,
  IonInput,
  IonItem,
  IonLabel,
  IonModal,
  IonPage,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import ExerciseListComponent from "../components/ExerciseListComponent";
import SelectionButton from "../components/selectionButton";
import "./ExerciseList.css";

import {
  airplane,
  barbell,
  chevronBackCircle,
  chevronBackCircleOutline,
  chevronForwardCircle,
  close,
  optionsOutline,
} from "ionicons/icons";

import firebase from "../firebase";
import { useEffect, useRef, useState } from "react";

const ExerciseList = () => {
  let pageName = "List of Exercises";

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>
          <IonTitle>{pageName}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{pageName}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExerciseListComponent headerTitle="Filter Exercises" modalName={pageName} />
      </IonContent>
    </IonPage>
  );
};

export default ExerciseList;
