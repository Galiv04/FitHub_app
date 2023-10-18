import "./ExerciseListElement.css";
import React, { useState } from "react";
import { IonItem, IonLabel, IonThumbnail } from "@ionic/react";

const ExerciseListElement = ({
  selectedExercise,
  callBackFcn,
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
      {/* <IonList> */}
        <IonItem>
          <IonThumbnail id="list-thumbnail" slot="start">
            <img alt={imgAlt} src={imgHref} />
          </IonThumbnail>
          <IonLabel class="ion-text-wrap" id="list-label">{label}</IonLabel>
        </IonItem>
      {/* </IonList> */}
    </>
  );
};

export default ExerciseListElement;
