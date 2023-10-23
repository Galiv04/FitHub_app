import "./ExerciseListElement.css";
import React, { useState } from "react";
import { IonButton, IonIcon, IonItem, IonLabel, IonThumbnail } from "@ionic/react";

const ExerciseListElement = ({
  imgAlt,
  imgHref,
  repsNumber,
  exerciseName,
  isTimeConstrained,
  time,
  lineStyle,
  icon,
  onClickFcn,
}) => {
  let label = isTimeConstrained
    ? `${exerciseName} ${time} s`
    : `${repsNumber} ${exerciseName}`;

    let lines = lineStyle ? lineStyle : "default"

  return (
    <>
      {/* <IonList> */}
        <IonItem id="list-item" lines={lines}>
          <IonThumbnail id="list-thumbnail" slot="start">
            <img alt={imgAlt} src={imgHref} />
          </IonThumbnail>
          <IonLabel class="ion-text-wrap" id="list-label">{label}</IonLabel>
          {icon ? <button className="item-button" onClick={onClickFcn} fill="clear"> <IonIcon aria-hidden="true" icon={icon} slot="end"></IonIcon></button> : null}
        </IonItem>
      {/* </IonList> */}
    </>
  );
};

export default ExerciseListElement;
