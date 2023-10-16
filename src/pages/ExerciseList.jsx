import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonFab,
  IonFabButton,
  IonFabList,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonModal,
  IonPage,
  IonRadio,
  IonRadioGroup,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import ExerciseListElement from "../components/ExerciseListElement";
import "./ExerciseList.css";

import { colorPalette, document, filter, filterCircleSharp, globe, optionsOutline } from 'ionicons/icons';

import firebase from "../firebase";
import { useEffect, useRef, useState } from "react";

const ExerciseList = () => {
  let pageName = "List of Exercises";
  let [content, setContent] = useState(undefined);

  const db = firebase.firestore();

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
  }, []);

  // Modal functions

  const modal = useRef(null);
  const input = useRef(null);

  function confirm() {
    modal.current?.dismiss(input.current?.value, 'confirm');
  }

  function onWillDismiss(ev) {
    if (ev.detail.role === 'confirm') {
      // setMessage(`Hello, ${ev.detail.data}!`);
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>
          <IonTitle>{pageName}</IonTitle>
          <IonButton fill="clear" size="large" slot="end" id="open-modal"> <IonIcon icon={optionsOutline}></IonIcon></IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{pageName}</IonTitle>
          </IonToolbar>
        </IonHeader>
        {content ? content : <p> Loading Exercises...</p> }

        <IonModal ref={modal} trigger="open-modal" onWillDismiss={(ev) => onWillDismiss(ev)}>
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonButton onClick={() => modal.current?.dismiss()}>Cancel</IonButton>
              </IonButtons>
              <IonTitle style={{textAlign: "center"}}>Filter Search</IonTitle>
              <IonButtons slot="end">
                <IonButton strong={true} onClick={() => confirm()}>
                  Confirm
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <IonItem>
              <IonInput
                label="Enter your name"
                labelPlacement="stacked"
                ref={input}
                type="text"
                placeholder="Your name"
              />
            </IonItem>

            <IonGrid>
              <IonText >
                <h3 className="filter-title">Difficulty</h3>
              </IonText>
              <IonRow>
                <IonCol >
                  <IonButton id="ciao" className="filter-button" disabled={false} onClick={(e)=>{console.log(e.target.id);}} >Disabled</IonButton>
                </IonCol>
                <IonCol>
                  <IonButton className="filter-button" disabled={true}>Disabled</IonButton>
                </IonCol>
              </IonRow>
            </IonGrid>

          </IonContent>
        </IonModal>

      </IonContent>
    </IonPage>
  );
};

export default ExerciseList;
