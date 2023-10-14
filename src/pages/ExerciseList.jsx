import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import ExerciseListElement from "../components/ExerciseListElement";

const ExerciseList = () => {
  let content = [];
  let pageName = "List of Exercises";

  let exerciseArr = [{name: "Squat", imgHref: "https://workoutlabs.com/train/svg.php?id=84742"}];

  if (!exerciseArr) {
    // do not render anything if no state available
  } else {
 
    // console.log(exerciseArr);
    exerciseArr.forEach((el, i) => {
      content.push(
        <ExerciseListElement
          key={`${el.name}${i}`}
          imgAlt={`${el.name}${i}`}
          imgHref={el.imgHref}
          repsNumber={""}
          exerciseName={el.name}
          isTimeConstrained={false}
          time={null}
        />
      );
    });
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          {/* <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons> */}
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

export default ExerciseList;
