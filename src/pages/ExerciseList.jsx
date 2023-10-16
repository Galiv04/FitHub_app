import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
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
import ExerciseListElement from "../components/ExerciseListElement";
import SelectionButton from "../components/selectionButton";
import "./ExerciseList.css";

import {
  airplane,
  chevronBackCircle,
  chevronBackCircleOutline,
  chevronForwardCircle,
  optionsOutline,
} from "ionicons/icons";

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
    setContent([...content]);
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

  const [isBeginner, setIsBeginner] = useState(false);
  const [isIntermediate, setIsIntermediate] = useState(false);
  const [isAdvanced, setIsAdvanced] = useState(false);

  const [isAbs, setIsAbs] = useState(false);
  const [isTotal, setIsTotal] = useState(false);
  const [isUpper, setIsUpper] = useState(false);
  const [isLower, setIsLower] = useState(false);

  function confirm() {
    modal.current?.dismiss(input.current?.value, "confirm");
  }

  function onWillDismiss(ev) {
    if (ev.detail.role === "confirm") {
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
          <IonButton fill="clear" size="large" slot="end" id="open-modal">
            {" "}
            <IonIcon icon={optionsOutline}></IonIcon>
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{pageName}</IonTitle>
          </IonToolbar>
        </IonHeader>

        {content ? content : <p> Loading Exercises...</p>}

        <IonModal
          ref={modal}
          trigger="open-modal"
          onWillDismiss={(ev) => onWillDismiss(ev)}
        >
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonButton onClick={() => modal.current?.dismiss()}>
                  Cancel
                </IonButton>
              </IonButtons>
              <IonTitle style={{ textAlign: "center" }}>Filter Search</IonTitle>
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

            <div id="filter-equipment">
              <IonItem lines="none">
                <IonIcon
                  size="large"
                  onClick={() => {
                    document.getElementById(
                      "scroll-container"
                    ).scrollLeft -= 50;
                  }}
                  aria-hidden="true"
                  icon={chevronBackCircle}
                  slot="start"
                ></IonIcon>
                <IonLabel>
                  <div className="horizontal-scroll-container center">
                    {" "}
                    <div
                      id="scroll-container"
                      className="horizontal-scroll-content"
                    >
                      <div>
                        <img
                          src="https://ionicframework.com/docs/img/demos/thumbnail.svg"
                          alt=""
                        />{" "}
                        <IonText>
                          <p>No equipment</p>
                        </IonText>
                      </div>
                      <div>
                        <img
                          src="https://ionicframework.com/docs/img/demos/thumbnail.svg"
                          alt=""
                        />{" "}
                        <IonText>
                          <p>Dumbells</p>
                        </IonText>
                      </div>
                      <div>
                        <img
                          src="https://ionicframework.com/docs/img/demos/thumbnail.svg"
                          alt=""
                        />{" "}
                        <IonText>
                          <p>Barbell</p>
                        </IonText>
                      </div>
                      <div>
                        <img
                          src="https://ionicframework.com/docs/img/demos/thumbnail.svg"
                          alt=""
                        />{" "}
                        <IonText>
                          <p>Pull-up bar</p>
                        </IonText>
                      </div>
                      <div>
                        <img
                          src="https://ionicframework.com/docs/img/demos/thumbnail.svg"
                          alt=""
                        />{" "}
                        <IonText>
                          <p>Box</p>
                        </IonText>
                      </div>
                      <div>
                        <img
                          src="https://ionicframework.com/docs/img/demos/thumbnail.svg"
                          alt=""
                        />{" "}
                        <IonText>
                          <p>Bench</p>
                        </IonText>
                      </div>
                      <div>
                        <img
                          src="https://ionicframework.com/docs/img/demos/thumbnail.svg"
                          alt=""
                        />{" "}
                        <IonText>
                          <p>Rack</p>
                        </IonText>
                      </div>
                      <div>
                        <img
                          src="https://ionicframework.com/docs/img/demos/thumbnail.svg"
                          alt=""
                        />{" "}
                        <IonText>
                          <p>Parallel bars</p>
                        </IonText>
                      </div>
                      <div>
                        <img
                          src="https://ionicframework.com/docs/img/demos/thumbnail.svg"
                          alt=""
                        />{" "}
                        <IonText>
                          <p>Jumping rope</p>
                        </IonText>
                      </div>
                      <div>
                        <img
                          src="https://ionicframework.com/docs/img/demos/thumbnail.svg"
                          alt=""
                        />{" "}
                        <IonText>
                          <p>Kettlebells</p>
                        </IonText>
                      </div>
                      <div>
                        <img
                          src="https://ionicframework.com/docs/img/demos/thumbnail.svg"
                          alt=""
                        />{" "}
                        <IonText>
                          <p>Weight plates</p>
                        </IonText>
                      </div>
                    </div>
                  </div>
                </IonLabel>
                <IonIcon
                  size="large"
                  onClick={() => {
                    document.getElementById(
                      "scroll-container"
                    ).scrollLeft += 50;
                  }}
                  aria-hidden="true"
                  icon={chevronForwardCircle}
                  slot="end"
                ></IonIcon>
              </IonItem>
            </div>

            <div id="filter-difficulty">
              <IonText>
                <h3 className="filter-title">Difficulty</h3>
              </IonText>
              <IonGrid>
                <IonRow>
                  <IonCol>
                    <div
                      onClick={() => {
                        setIsBeginner(!isBeginner);
                      }}
                    >
                      <SelectionButton text="Beginner" isActive={isBeginner} />
                    </div>
                  </IonCol>
                  <IonCol>
                    <a
                      onClick={() => {
                        setIsIntermediate(!isIntermediate);
                      }}
                    >
                      <SelectionButton
                        text="Intermediate"
                        isActive={isIntermediate}
                      />
                    </a>
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol>
                    <a
                      onClick={() => {
                        setIsAdvanced(!isAdvanced);
                      }}
                    >
                      <SelectionButton text="Advanced" isActive={isAdvanced} />
                    </a>
                  </IonCol>
                  <IonCol></IonCol>
                </IonRow>
              </IonGrid>
            </div>

            <div id="filter-muscles">
              <IonText>
                <h3 className="filter-title">Muscle Group</h3>
              </IonText>
              <IonGrid>
                <IonRow>
                  <IonCol>
                    <div
                      onClick={() => {
                        setIsAbs(!isAbs);
                      }}
                    >
                      <SelectionButton text="Abs" isActive={isAbs} />
                    </div>
                  </IonCol>
                  <IonCol>
                    <a
                      onClick={() => {
                        setIsTotal(!isTotal);
                      }}
                    >
                      <SelectionButton text="Total Body" isActive={isTotal} />
                    </a>
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol>
                    <a
                      onClick={() => {
                        setIsUpper(!isUpper);
                      }}
                    >
                      <SelectionButton text="Upper Body" isActive={isUpper} />
                    </a>
                  </IonCol>
                  <IonCol>
                    <a
                      onClick={() => {
                        setIsLower(!isLower);
                      }}
                    >
                      <SelectionButton text="Lower Body" isActive={isLower} />
                    </a>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </div>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default ExerciseList;
