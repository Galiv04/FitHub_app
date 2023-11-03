import {
  IonButton,
  IonButtons,
  IonContent,
  IonDatetime,
  IonHeader,
  IonIcon,
  IonItem,
  IonItemDivider,
  IonItemGroup,
  IonItemSliding,
  IonLabel,
  IonModal,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "../theme/variables.css";
import "./Tab2.css";
import ExerciseCard from "../components/ExerciseCard";
import ExerciseListComponent from "../components/ExerciseListComponent";
import { Link } from "react-router-dom";
import { addOutline, close, ellipse } from "ionicons/icons";
import { useEffect, useRef } from "react";
import { useState } from "react";
import VerticalStepper from "../components/VerticalStepper";
import ExerciseListElement from "../components/ExerciseListElement";
import SelectInterval from "../components/SelectInterval";

//data to test TBD
let workoutArray = [
  {
    name: "Riscaldamento",
    duration: "10 min",
    exerciseArr: [
      {
        name: "High Knees",
        imgHref: "https://ionicframework.com/docs/img/demos/thumbnail.svg",
        isTimeConstrained: false,
        reps: 10,
        time: 0,
      },
      {
        name: "Rest",
        imgHref: "https://ionicframework.com/docs/img/demos/thumbnail.svg",
        isTimeConstrained: true,
        reps: 0,
        time: 30,
      },
      {
        name: "Jumping Jacks",
        imgHref: "https://ionicframework.com/docs/img/demos/thumbnail.svg",
        isTimeConstrained: false,
        reps: 10,
        time: 0,
      },
    ],
  },
  {
    name: "Upper Body",
    duration: "10 min",
    exerciseArr: [
      {
        name: "Bench Press",
        imgHref: "https://ionicframework.com/docs/img/demos/thumbnail.svg",
        isTimeConstrained: false,
        reps: 10,
        time: 0,
      },
      {
        name: "Rest",
        imgHref: "https://ionicframework.com/docs/img/demos/thumbnail.svg",
        isTimeConstrained: true,
        reps: 0,
        time: 30,
      },
      {
        name: "Reclied Bench Press",
        imgHref: "https://ionicframework.com/docs/img/demos/thumbnail.svg",
        isTimeConstrained: false,
        reps: 10,
        time: 0,
      },
    ],
  },
  {
    name: "Lower Body",
    duration: "10 min",
    exerciseArr: [
      {
        name: "Squat",
        imgHref: "https://ionicframework.com/docs/img/demos/thumbnail.svg",
        isTimeConstrained: false,
        reps: 10,
        time: 0,
      },
      {
        name: "Rest",
        imgHref: "https://ionicframework.com/docs/img/demos/thumbnail.svg",
        isTimeConstrained: true,
        reps: 0,
        time: 30,
      },
      {
        name: "Lunges",
        imgHref: "https://ionicframework.com/docs/img/demos/thumbnail.svg",
        isTimeConstrained: false,
        reps: 10,
        time: 0,
      },
    ],
  },
];
let content = [];

if (!workoutArray) {
  // do not render anything if no workoutArray available
} else {
  workoutArray.forEach((el, i) => {
    content.push(
      <Link
        key={`link${i}`}
        className="link"
        to={{
          pathname: "/workout",
          state: {
            pageName: workoutArray[i].name,
            exerciseArr: workoutArray[i].exerciseArr,
          }, // TBD
        }}
      >
        <ExerciseCard
          key={`item${i}`}
          number={i + 1}
          title={el.name}
          subtitle={el.duration}
        />
      </Link>
    );
  });
}

let todayDate = new Date();

function getDaysInMonthFromNumber(dayNumber, monthNumber, year) {
  var d = new Date(`${year}-${monthNumber + 1}`),
    month = d.getMonth(),
    days = [];

  d.setDate(1);

  // Get the first day in the month corresponding to the dayNumber
  while (d.getDay() !== dayNumber) {
    d.setDate(d.getDate() + 1);
  }

  // Get all the other days in the month
  while (d.getMonth() === month) {
    days.push(new Date(d.getTime()).toISOString().substring(0, 10)); //only date - no time
    d.setDate(d.getDate() + 7);
  }

  return days;
}

// calendar data
let weeklyWorkoutDays = [1, 3, 5]; // 0:sunday, 1:monday, ...  //from DB
let weeklyDays_thisMonth = [];
weeklyWorkoutDays.map((el, i) => {
  let dates = getDaysInMonthFromNumber(
    el,
    todayDate.getMonth(),
    todayDate.getFullYear()
  );
  weeklyDays_thisMonth = [...weeklyDays_thisMonth, ...dates];
});

// console.log(weeklyDays_thisMonth); //debug

let customWorkoutDays_thisMonth = ["2023-10-01", "2023-10-04", "2023-10-24"]; //from DB
let executedWorkouts_thisMonth = ["2023-10-03", "2023-10-06", "2023-10-8"]; //from DB

let weeklyTextColor = "var(--ion-color-secondary-contrast)";
let weeklyBackgroundColor = "var(--ion-color-secondary-shade)";

let customTextColor = "var(--ion-color-warning-contrast)";
let customBackgroundColor = "var(--ion-color-warning-shade)";

let executedTextColor = "var(--ion-color-success-contrast)";
let executedBackgroundColor = "var(--ion-color-success)";

let highlightedDatesArr = [];

// order of executed, custom, weekly... is important because if there are duplicates the first ones wins
executedWorkouts_thisMonth.map((el, i) => {
  highlightedDatesArr.push({
    date: el,
    textColor: executedTextColor,
    backgroundColor: executedBackgroundColor,
  });
});

customWorkoutDays_thisMonth.map((el, i) => {
  highlightedDatesArr.push({
    date: el,
    textColor: customTextColor,
    backgroundColor: customBackgroundColor,
  });
});

weeklyDays_thisMonth.map((el, i) => {
  highlightedDatesArr.push({
    date: el,
    textColor: weeklyTextColor,
    backgroundColor: weeklyBackgroundColor,
  });
});

// console.log(highlightedDatesArr); //debug

const Tab2 = () => {
  // Modal functions

  const addWorkoutModal = useRef(null);

  function cancel() {
    // resetAddWorkout();
    // generateFilteredContent(exerciseArr);
    addWorkoutModal.current?.dismiss();
  }

  function resetAddWorkout() {
    // isBeginner = false;
    // isIntermediate = false;
    // isAdvanced = false;
    // refreshStates();
  }

  function checkAddWorkoutIsValid() {
    //empty
  }

  function confirm() {
    checkAddWorkoutIsValid();
    // generateFilteredContent(exerciseArr);
    addWorkoutModal.current?.dismiss();
  }

  function onWillDismiss(ev) {
    if (ev.detail.role === "confirm") {
      // setMessage(`Hello, ${ev.detail.data}!`);
    }
  }

  const maxNumIntervals = 10;

  const repsRange = [...Array(16).keys(), 20, 25, 30, 40, 50, 100];
  repsRange.shift();
  // console.log(repsRange);

  const restTimeRange = [15, 30, 45, 60, 90, 120, 150, 180];
  // console.log(restTimeRange);

  let [selectedIntervals, setSelectedIntervals] = useState(undefined);
  let [currentIntervalData, setCurrentIntervalData] = useState([]);
  let [intervalsData, setIntervalsData] = useState([]);
  // currentIntervalData = [{exercise: name, reps: number || restTime: number}, obj2, obj3, ...]
  // intervalsData = [{exercises: [], reps: [], restTime: []}, {}, {}, ...]

  let [selectionStepCounter, setSelectionStepCounter] = useState(0);
  let [selectedItem, setSelectedItem] = useState(undefined);
  // console.log("selectedItem: ", selectedItem);
  let [selectedReps, setSelectedReps] = useState(undefined);
  let [selectedRestTime, setSelectedRestTime] = useState(undefined);

  let [currentIntervalContent, setCurrentIntervalContent] = useState([]);
  let [selectionContent, setSelectionContent] = useState(undefined);

  function resetSelectionStates() {
    selectedItem.setAttribute("data-selected", false);
    setSelectedItem(undefined);
    setSelectedReps(undefined);
    setSelectedRestTime(undefined);
  }

  // display selected content
  useEffect(() => {
    currentIntervalContent = [];
    currentIntervalData.forEach((el, i) => {
      console.log(el.time);
      currentIntervalContent.push(
        <div key={el.name + i.toString()}>
          <ExerciseListElement
            // key={el.name}
            imgAlt={el.name}
            imgHref={el.imgHref}
            repsNumber={el.reps + "x"}
            exerciseName={el.name}
            isTimeConstrained={typeof el.time !== "undefined"}
            time={el.time}
            lineStyle="none"
            icon={close}
            onClickFcn={() => {
              currentIntervalData.splice(i, 1);
              setCurrentIntervalData([...currentIntervalData]);
              if (currentIntervalData.length == 0) {
                setCurrentIntervalContent([]);
              }
            }}
          />
        </div>
      );
      setCurrentIntervalContent([...currentIntervalContent]);
    });
  }, [currentIntervalData]);

  // generate selection form
  useEffect(() => {
    selectionContent = [];
    var exerciseInIntervalCounter = currentIntervalData.length; // used variable

    if (selectedItem) {
      var selectedExerciseName = selectedItem.getAttribute("name"); // used variable
      var selectedExerciseImgHref =
        selectedItem.children[0].children[0].children[0].src;

      // console.log(selectedItem); // debug
      if (selectedExerciseName == "Rest") {
        setSelectedReps(undefined);
        selectionContent.push(
          <IonItem key="select-time" id="select-reps-number">
            <IonSelect
              onIonChange={(e) => {
                console.log(`Selected Rest Time: ${e.detail.value}`);
                setSelectedRestTime(e.detail.value);
              }}
              interface="popover"
              placeholder="Rest time"
            >
              {restTimeRange.map((el, _) => {
                return (
                  <IonSelectOption key={el} value={el}>
                    {el + "s"}
                  </IonSelectOption>
                );
              })}
            </IonSelect>
          </IonItem>
        );
      } else {
        setSelectedRestTime(undefined);
        selectionContent.push(
          <IonItem key="select-reps" id="select-reps-number">
            <IonSelect
              onIonChange={(e) => {
                console.log(`Selected Number of Reps: ${e.detail.value}`);
                setSelectedReps(e.detail.value);
              }}
              interface="popover"
              placeholder="Reps number"
            >
              {repsRange.map((el, _) => {
                return (
                  <IonSelectOption key={el} value={el}>
                    {el}
                  </IonSelectOption>
                );
              })}
            </IonSelect>
          </IonItem>
        );
      }

      // return reset/confirm buttons and, if confirm, return back and add-exercise buttons to repeat the selection step
      if (selectedItem && (selectedReps || selectedRestTime)) {
        // if (selectionStepCounter<exerciseInIntervalCounter) { // we are still selecting the current exercise

        selectionContent.push(
          <div
            key="cancel-confirm-buttons"
            className="interval-select-nav-buttons"
          >
            <IonButton
              className="interval-select-exercise-button"
              onClick={() => {
                // console.log(selectedItem);
                resetSelectionStates();
              }}
              fill="outline"
              // expand="block"
            >
              <IonItem lines="none">
                <IonLabel>Reset</IonLabel>
              </IonItem>
            </IonButton>
            <IonButton
              className="interval-select-exercise-button"
              onClick={() => {
                // currentIntervalData = [{exercise: name, reps: number || time: number}, obj2, obj3, ...]
                if (selectedReps) {
                  currentIntervalData.push({
                    name: selectedExerciseName,
                    imgHref: selectedExerciseImgHref,
                    reps: selectedReps,
                  });
                } else {
                  currentIntervalData.push({
                    name: selectedExerciseName,
                    imgHref: selectedExerciseImgHref,
                    time: selectedRestTime,
                  });
                }
                console.log(currentIntervalData);
                setCurrentIntervalData([...currentIntervalData]);
                resetSelectionStates();
                setSelectionStepCounter(currentIntervalData.length);
              }}
              fill="solid"
              // expand="block"
            >
              <IonItem lines="none">
                <IonLabel>Confirm</IonLabel>
              </IonItem>
            </IonButton>
          </div>
        );
      }
    }
    setSelectionContent([...selectionContent]);
  }, [selectedItem, selectedReps, selectedRestTime]);

  // console.log(selectedReps);
  // console.log(selectedRestTime);

  let pageName = "Workout of the Day";
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{pageName}</IonTitle>
          <IonButton
            // onClick={() => {
            //   if (!isFilterValid) {
            //     resetFilter();
            //   }
            // }}
            fill="clear"
            size="large"
            slot="end"
            id="open-add-modal"
          >
            {" "}
            <IonIcon icon={addOutline}></IonIcon>
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{pageName}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div className="datetimeCalendarContainer">
          <IonDatetime
            firstDayOfWeek={1}
            className="datetimeCalendar center"
            presentation="date"
            value={todayDate.toISOString()}
            highlightedDates={highlightedDatesArr}
          ></IonDatetime>
        </div>
        <div className="legend-container center">
          <IonItem lines="none" id="legend-item">
            <div className="ionIcon">
              {" "}
              <IonIcon icon={ellipse} id="weeklyIconColor"></IonIcon>
            </div>
            Weekly{" "}
            <div className="ionIcon">
              {" "}
              <IonIcon icon={ellipse} id="customIconColor"></IonIcon>
            </div>{" "}
            Custom{" "}
            <div className="ionIcon">
              {" "}
              <IonIcon icon={ellipse} id="executedIconColor"></IonIcon>
            </div>{" "}
            Executed
            <div className="ionIcon"></div>
          </IonItem>
        </div>
        <div className="workout-container center">{content}</div>

        <IonModal
          ref={addWorkoutModal}
          trigger="open-add-modal"
          onWillDismiss={(ev) => onWillDismiss(ev)}
        >
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonButton onClick={cancel}>Cancel</IonButton>
              </IonButtons>
              <IonTitle style={{ textAlign: "center" }}>Add Workout</IonTitle>
              <IonButtons slot="end">
                <IonButton strong={true} onClick={() => confirm()}>
                  Confirm
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            {/* Modal content */}

            {/* <IonList> */}
            <IonItemGroup>
              <IonItemDivider color="primary">
                <IonLabel>Select Number of Intervals</IonLabel>
              </IonItemDivider>
              <IonItem id="select-intervals-number">
                <IonSelect
                  onIonChange={(e) => {
                    console.log(
                      `Selected Number of Intervals: ${e.detail.value}`
                    );
                    setSelectedIntervals(e.detail.value);
                  }}
                  interface="popover"
                  placeholder="Number of Intervals"
                >
                  {Array(maxNumIntervals)
                    .fill(0)
                    .map((_, i) => {
                      return (
                        <IonSelectOption
                          key={"select-intervals-number-option" + i}
                          value={i + 1}
                        >
                          {" "}
                          {i + 1}{" "}
                        </IonSelectOption>
                      );
                    })}
                </IonSelect>
              </IonItem>
            </IonItemGroup>

            {/* <div key="interval-1">
              <IonItemGroup>
                <IonItemDivider color="primary">
                  <IonLabel>Interval 1</IonLabel>
                </IonItemDivider>
                {currentIntervalContent}
                <br />
                <div className="interval-select-exercise">
                  <ExerciseListComponent
                    headerTitle="Select exercise"
                    modalName={pageName}
                    handleOnclickCallback={(item) => {
                      setSelectedItem(item);
                    }}
                  />
                </div>

                {selectionContent}
              </IonItemGroup>
            </div> */}

            <VerticalStepper
              steps={Array(selectedIntervals)
                .fill(0)
                .map((_, i) => {
                  return {
                    label: "Interval " + (i + 1),
                    content: (
                      <SelectInterval
                        i={i + 1}
                        currentIntervalContent={currentIntervalContent}
                        handleOnclickFcn={(item) => {
                          setSelectedItem(item);
                        }}
                        selectionContent={selectionContent}
                      />
                    ),
                  };
                })}
            />

            {/* </IonList> */}
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
