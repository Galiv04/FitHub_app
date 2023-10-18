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
  IonItem,
  IonLabel,
  IonModal,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import ExerciseListElement from "./ExerciseListElement";
import SelectionButton from "./selectionButton";
import "./ExerciseListComponent.css";

import {
  chevronBackCircle,
  chevronForwardCircle,
  close,
  optionsOutline,
} from "ionicons/icons";

import firebase from "../firebase";
import { useEffect, useRef, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";

const ExerciseListComponent = ({ headerTitle }) => {
  let [content, setContent] = useState(undefined);
  let [exerciseArr, setExerciseArr] = useState([]);

  const db = firebase.firestore();

  useEffect(() => {
    exerciseArr = [];

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
        setExerciseArr([...exerciseArr]);
        console.log(exerciseArr);
        generateContent(exerciseArr);
      });
  }, []);

  function generateContent(exerciseArr) {
    content = [];
    exerciseArr.forEach((el, i) => {
      content.push(
          <ExerciseListElement
            key={`${el.name}`}
            imgAlt={`${el.name}`}
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

  function generateFilteredContent(exerciseArr) {
    content = [];
    exerciseArr.forEach((el, i) => {
      let filterLogic =
        // difficulty block
        ((el.difficulty == "beginner" && isBeginner) ||
          (el.difficulty == "intermediate" && isIntermediate) ||
          (el.difficulty == "advanced" && isAdvanced)) &&
        // equipment block
        ((el.equipment.some((el) => {
          return el == "none";
        }) &&
          noEquipment) ||
          (el.equipment.some((el) => {
            return el == "dumbells";
          }) &&
            dumbells) ||
          (el.equipment.some((el) => {
            return el == "barbell";
          }) &&
            barbell) ||
          (el.equipment.some((el) => {
            return el == "pullup";
          }) &&
            pullup) ||
          (el.equipment.some((el) => {
            return el == "box";
          }) &&
            box) ||
          (el.equipment.some((el) => {
            return el == "bench";
          }) &&
            bench) ||
          (el.equipment.some((el) => {
            return el == "rack";
          }) &&
            rack) ||
          (el.equipment.some((el) => {
            return el == "parallelBars";
          }) &&
            parellelBars) ||
          (el.equipment.some((el) => {
            return el == "jumpingRope";
          }) &&
            jumpingRope) ||
          (el.equipment.some((el) => {
            return el == "kettlebells";
          }) &&
            kettlebells) ||
          (el.equipment.some((el) => {
            return el == "weightPlates";
          }) &&
            weightPlates)) &&
        // muscleGroup block
        ((el.muscleGroup.some((el) => {
          return el == "abs";
        }) &&
          isAbs) ||
          (el.muscleGroup.some((el) => {
            return el == "total";
          }) &&
            isTotal) ||
          (el.muscleGroup.some((el) => {
            return el == "upper";
          }) &&
            isUpper) ||
          (el.muscleGroup.some((el) => {
            return el == "lower";
          }) &&
            isLower));

      console.log(el.equipment);

      if (filterLogic) {
        content.push(
          <ExerciseListElement
            key={`${el.name}`}
            imgAlt={`${el.name}`}
            imgHref={el.imgHref}
            repsNumber={""}
            exerciseName={el.name}
            isTimeConstrained={false}
            time={null}
          />
        );
      }
    });
    setContent([...content]);
  }

  // Modal functions

  const modal = useRef(null);

  let [isFilterValid, setIsFilterValid] = useState(false);

  // Difficulty filter
  let [isBeginner, setIsBeginner] = useState(false);
  let [isIntermediate, setIsIntermediate] = useState(false);
  let [isAdvanced, setIsAdvanced] = useState(false);

  // Muscle Group filter
  let [isAbs, setIsAbs] = useState(false);
  let [isTotal, setIsTotal] = useState(false);
  let [isUpper, setIsUpper] = useState(false);
  let [isLower, setIsLower] = useState(false);

  // Equipment filter
  let [noEquipment, setNoEquipment] = useState(false);
  let [dumbells, setDumbells] = useState(false);
  let [barbell, setBarbell] = useState(false);
  let [pullup, setPullup] = useState(false);
  let [box, setBox] = useState(false);
  let [bench, setBench] = useState(false);
  let [rack, setRack] = useState(false);
  let [parellelBars, setParallelBars] = useState(false);
  let [jumpingRope, setJumpingRope] = useState(false);
  let [kettlebells, setKettlebells] = useState(false);
  let [weightPlates, setWeightPlates] = useState(false);

  function refreshStates() {
    setIsBeginner(isBeginner);
    setIsIntermediate(isIntermediate);
    setIsAdvanced(isAdvanced);

    setIsAbs(isAbs);
    setIsTotal(isTotal);
    setIsUpper(isUpper);
    setIsLower(isLower);

    setNoEquipment(noEquipment);
    setDumbells(dumbells);
    setBarbell(barbell);
    setPullup(pullup);
    setBox(box);
    setBench(bench);
    setRack(rack);
    setParallelBars(parellelBars);
    setJumpingRope(jumpingRope);
    setKettlebells(kettlebells);
    setWeightPlates(weightPlates);
  }

  function cancel() {
    resetFilter();
    makeFilterValid();
    generateFilteredContent(exerciseArr);
    modal.current?.dismiss();
  }

  function resetFilter() {
    isBeginner = false;
    isIntermediate = false;
    isAdvanced = false;

    isAbs = false;
    isTotal = false;
    isUpper = false;
    isLower = false;

    noEquipment = false;
    dumbells = false;
    barbell = false;
    pullup = false;
    box = false;
    bench = false;
    rack = false;
    parellelBars = false;
    jumpingRope = false;
    kettlebells = false;
    weightPlates = false;

    refreshStates();
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
      isBeginner = true;
      isIntermediate = true;
      isAdvanced = true;
    }

    if (!isMuscleGroupSelected) {
      isAbs = true;
      isTotal = true;
      isUpper = true;
      isLower = true;
    }

    if (!isEquipmentSelected) {
      noEquipment = true;
      dumbells = true;
      barbell = true;
      pullup = true;
      box = true;
      bench = true;
      rack = true;
      parellelBars = true;
      jumpingRope = true;
      kettlebells = true;
      weightPlates = true;
    }

    let isAnyFilterValid = [
      isDifficultySelected,
      isMuscleGroupSelected,
      isEquipmentSelected,
    ].some((el) => {
      return el == true;
    });

    setIsFilterValid(isAnyFilterValid);

    refreshStates();
  }

  function confirm() {
    makeFilterValid();
    generateFilteredContent(exerciseArr);
    modal.current?.dismiss();
  }

  function onWillDismiss(ev) {
    if (ev.detail.role === "confirm") {
      // setMessage(`Hello, ${ev.detail.data}!`);
    }
  }

  return (
    <>
      <IonToolbar id="toolbar">
        <IonButtons slot="start">
          <IonBackButton></IonBackButton>
        </IonButtons>
        <IonItem>
          {" "}
          {headerTitle}
          <IonButton
            onClick={() => {
              if (!isFilterValid) {
                resetFilter();
              }
            }}
            fill="clear"
            size="large"
            slot="end"
            id="open-filter-modal"
          >
            {" "}
            <IonIcon icon={optionsOutline}></IonIcon>
          </IonButton>
        </IonItem>
      </IonToolbar>

      {content ? content : <LoadingSpinner />}

      <IonModal
        ref={modal}
        trigger="open-filter-modal"
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
                  document.getElementById("scroll-container").scrollLeft -= 50;
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
                  document.getElementById("scroll-container").scrollLeft += 50;
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
    </>
  );
};

export default ExerciseListComponent;
