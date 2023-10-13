import "./ExerciseCard.css";
import React from "react";
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/react";

const ExerciseCard = ({ number, title, subtitle }) => {
  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>
          <IonGrid>
            <IonRow>
              <IonCol size="auto" className="center padding-right">
                <div className="circled-number "> {number} </div>
              </IonCol>
              <IonCol>
                {title}
                <IonCardSubtitle>{subtitle}</IonCardSubtitle>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonCardTitle>
      </IonCardHeader>
    </IonCard>
  );
};

export default ExerciseCard;
