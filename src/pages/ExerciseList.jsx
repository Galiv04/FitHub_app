import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonImg,
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
  barbell,
  chevronBackCircle,
  chevronBackCircleOutline,
  chevronForwardCircle,
  close,
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
          exerciseArr.push({
            name: doc_data.name,
            imgHref: doc_data.imgHref,
            difficulty: doc_data.difficulty,
            equipment: doc_data.equipment,
            muscleGroup: doc_data.muscleGroup,
          });
        });
        generateContent(exerciseArr);
        // console.log(exerciseArr);
      });
  }, []);

  // Modal functions

  const modal = useRef(null);
  const input = useRef(null);

  // Difficulty filter
  const [isBeginner, setIsBeginner] = useState(false);
  const [isIntermediate, setIsIntermediate] = useState(false);
  const [isAdvanced, setIsAdvanced] = useState(false);

  // Muscle Group filter
  const [isAbs, setIsAbs] = useState(false);
  const [isTotal, setIsTotal] = useState(false);
  const [isUpper, setIsUpper] = useState(false);
  const [isLower, setIsLower] = useState(false);

  // Equipment filter
  const [noEquipment, setNoEquipment] = useState(false);
  const [dumbells, setDumbells] = useState(false);
  const [barbell, setBarbell] = useState(false);
  const [pullup, setPullup] = useState(false);
  const [box, setBox] = useState(false);
  const [bench, setBench] = useState(false);
  const [rack, setRack] = useState(false);
  const [parellelBars, setParallelBars] = useState(false);
  const [jumpingRope, setJumpingRope] = useState(false);
  const [kettlebells, setKettlebells] = useState(false);
  const [weightPlates, setWeightPlates] = useState(false);

  function cancel() {
    modal.current?.dismiss();
  }

  function resetFilter() {
    setIsBeginner(false);
    setIsIntermediate(false);
    setIsAdvanced(false);

    setIsAbs(false);
    setIsTotal(false);
    setIsUpper(false);
    setIsLower(false);

    setNoEquipment(false);
    setDumbells(false);
    setPullup(false);
    setBox(false);
    setBench(false);
    setRack(false);
    setParallelBars(false);
    setJumpingRope(false);
    setKettlebells(false);
    setWeightPlates(false);
  }

  function makeFilterValid() {
    let isDifficultySelected = [isBeginner, isIntermediate, isAdvanced].some(
      (el) => {
        return el == true;
      }
    );

    let isMuscleGroupSelected = [isAbs, isTotal, isUpper, isLower].some(
      (el) => {
        return el == true;
      }
    );

    let isEquipmentSelected = [
      noEquipment,
      dumbells,
      barbell,
      pullup,
      box,
      bench,
      rack,
      parellelBars,
      jumpingRope,
      kettlebells,
      weightPlates,
    ].some((el) => {
      return el == true;
    });

    // console.log(isDifficultySelected);
    // console.log(isMuscleGroupSelected);
    // console.log(isEquipmentSelected);

    if (!isDifficultySelected) {
      setIsBeginner(true);
      setIsIntermediate(true);
      setIsAdvanced(true);
    }

    if (!isMuscleGroupSelected) {
      setIsAbs(true);
      setIsTotal(true);
      setIsUpper(true);
      setIsLower(true);
    }

    if (!isEquipmentSelected) {
      setNoEquipment(true);
      setDumbells(true);
      setBarbell(true);
      setPullup(true);
      setBox(true);
      setBench(true);
      setRack(true);
      setParallelBars(true);
      setJumpingRope(true);
      setKettlebells(true);
      setWeightPlates(true);
    }
  }

  function confirm() {
    makeFilterValid();
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
                <IonButton onClick={cancel}>Cancel</IonButton>
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

            <IonButton
              id="filter-reset-button"
              onClick={resetFilter}
              fill="clear"
              expand="block"
            >
              <IonItem lines="none">
                <IonIcon aria-hidden="true" icon={close} slot="start"></IonIcon>
                <IonLabel>Reset</IonLabel>
              </IonItem>
            </IonButton>

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
                      <div className="image-with-caption">
                        <IonImg
                          onClick={() => {
                            setNoEquipment(!noEquipment);
                          }}
                          src="https://ionicframework.com/docs/img/demos/thumbnail.svg"
                          alt=""
                          selected={noEquipment}
                        />
                        <IonText>
                          <p>No equipment</p>
                        </IonText>
                      </div>
                      <div className="image-with-caption">
                        <IonImg
                          onClick={() => {
                            setDumbells(!dumbells);
                          }}
                          src="https://ionicframework.com/docs/img/demos/thumbnail.svg"
                          alt=""
                          selected={dumbells}
                        />{" "}
                        <IonText>
                          <p>Dumbells</p>
                        </IonText>
                      </div>
                      <div className="image-with-caption">
                        <IonImg
                          onClick={() => {
                            setBarbell(!barbell);
                          }}
                          src="https://ionicframework.com/docs/img/demos/thumbnail.svg"
                          alt=""
                          selected={barbell}
                        />{" "}
                        <IonText>
                          <p>Barbell</p>
                        </IonText>
                      </div>
                      <div className="image-with-caption">
                        <IonImg
                          onClick={() => {
                            setPullup(!pullup);
                          }}
                          src="https://ionicframework.com/docs/img/demos/thumbnail.svg"
                          alt=""
                          selected={pullup}
                        />{" "}
                        <IonText>
                          <p>Pull-up bar</p>
                        </IonText>
                      </div>
                      <div className="image-with-caption">
                        <IonImg
                          onClick={() => {
                            setBox(!box);
                          }}
                          src="https://ionicframework.com/docs/img/demos/thumbnail.svg"
                          alt=""
                          selected={box}
                        />{" "}
                        <IonText>
                          <p>Box</p>
                        </IonText>
                      </div>
                      <div className="image-with-caption">
                        <IonImg
                          onClick={() => {
                            setBench(!bench);
                          }}
                          src="https://ionicframework.com/docs/img/demos/thumbnail.svg"
                          alt=""
                          selected={bench}
                        />{" "}
                        <IonText>
                          <p>Bench</p>
                        </IonText>
                      </div>
                      <div className="image-with-caption">
                        <IonImg
                          onClick={() => {
                            setRack(!rack);
                          }}
                          src="https://ionicframework.com/docs/img/demos/thumbnail.svg"
                          alt=""
                          selected={rack}
                        />{" "}
                        <IonText>
                          <p>Rack</p>
                        </IonText>
                      </div>
                      <div className="image-with-caption">
                        <IonImg
                          onClick={() => {
                            setParallelBars(!parellelBars);
                          }}
                          src="https://ionicframework.com/docs/img/demos/thumbnail.svg"
                          alt=""
                          selected={parellelBars}
                        />{" "}
                        <IonText>
                          <p>Parallel bars</p>
                        </IonText>
                      </div>
                      <div className="image-with-caption">
                        <IonImg
                          onClick={() => {
                            setJumpingRope(!jumpingRope);
                          }}
                          src="https://ionicframework.com/docs/img/demos/thumbnail.svg"
                          alt=""
                          selected={jumpingRope}
                        />{" "}
                        <IonText>
                          <p>Jumping rope</p>
                        </IonText>
                      </div>
                      <div className="image-with-caption">
                        <IonImg
                          onClick={() => {
                            setKettlebells(!kettlebells);
                          }}
                          src="https://ionicframework.com/docs/img/demos/thumbnail.svg"
                          alt=""
                          selected={kettlebells}
                        />{" "}
                        <IonText>
                          <p>Kettlebells</p>
                        </IonText>
                      </div>
                      <div className="image-with-caption">
                        <IonImg
                          onClick={() => {
                            setWeightPlates(!weightPlates);
                          }}
                          src="https://ionicframework.com/docs/img/demos/thumbnail.svg"
                          alt=""
                          selected={weightPlates}
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
