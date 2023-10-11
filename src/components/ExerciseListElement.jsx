import "./ExerciseListElement.css";
import React from "react";
import { IonItem, IonLabel, IonList, IonThumbnail } from '@ionic/react';

const ExerciseListElement = ({ imgAlt, imgHref, repsNumber, exerciseName}) => {
  return (
    <>
      <IonList>
        <IonItem>
          <IonThumbnail slot="start">
            <img alt={imgAlt} src={imgHref} />
          </IonThumbnail>
          <IonLabel>{`${repsNumber}x ${exerciseName}`}</IonLabel>
        </IonItem>
      </IonList>
    </>
  );
};

export default ExerciseListElement;
