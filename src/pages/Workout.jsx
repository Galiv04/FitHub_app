import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";
import ExerciseListElement from "../components/ExerciseListElement";

import { useLocation } from "react-router";

const Workout = () => {
  let content = [];
  let pageName = "Workout Page";

  const location = useLocation();

  if (!location.state) {
    // do not render anything if no state available
  } else {
    const parentData = location.state ? location.state : ""; // if undefined replace with empty string

    console.log(parentData.exerciseArr);

    pageName = parentData.pageName;

    parentData.exerciseArr.forEach((el, i) => {
      content.push(
        <ExerciseListElement
          key={`${el.name}${i}`}
          imgAlt={`${el.name}${i}`}
          imgHref={el.imgHref}
          repsNumber={el.reps}
          exerciseName={el.name}
          isTimeConstrained={el.isTimeConstrained}
          time={el.time}
        />
      );
    });
  }

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
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Workout</IonTitle>
          </IonToolbar>
        </IonHeader>
        {content}
      </IonContent>
    </IonPage>
  );
};

export default Workout;
