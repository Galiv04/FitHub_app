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

import firebase from "../firebase";
import { useEffect, useState } from "react";

const ExerciseList = () => {
  let pageName = "List of Exercises";
  let [content, setContent] = useState(undefined);
  let exerciseArr = [];

  function generateContent(exerciseArr) {
    content = [];
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
    setContent([...content])
  }

  useEffect(() => {

    const db = firebase.firestore();

    db.collection("exercises")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(`${doc.id} => ${doc.data()}`);
          let doc_data = doc.data();
          exerciseArr.push({ name: doc_data.name, imgHref: doc_data.imgHref });
        });
        generateContent(exerciseArr);
        // console.log(exerciseArr);
      });

      exerciseArr = [];
  }, []);

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
            <IonTitle size="large">{pageName}</IonTitle>
          </IonToolbar>
        </IonHeader>
        {content ? content : <p> Loading Exercises...</p> }
      </IonContent>
    </IonPage>
  );
};

export default ExerciseList;
