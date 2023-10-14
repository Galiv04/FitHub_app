import "./ExerciseListElement.css";
import React from "react";
import { IonItem, IonLabel, IonList, IonThumbnail } from "@ionic/react";

const ExerciseListElement = ({
  imgAlt,
  imgHref,
  repsNumber,
  exerciseName,
  isTimeConstrained,
  time,
}) => {
  let label = isTimeConstrained
    ? `${exerciseName} ${time} s`
    : `${repsNumber} ${exerciseName}`;
  return (
    <>
      <IonList>
        <IonItem>
          <IonThumbnail id="list-thumbnail" slot="start">
            <img alt={imgAlt} src={imgHref} />
          </IonThumbnail>
          <IonLabel id="list-label">{label}</IonLabel>
        </IonItem>
      </IonList>
    </>
  );
};

export default ExerciseListElement;
