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
import { addOutline, ellipse } from "ionicons/icons";
import { useRef } from "react";
import { useState } from "react"; 

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
  let [selectedIntervals, setSelectedIntervals] = useState(undefined);

  let pageName = "Workout of the Day";
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>pageName</IonTitle>
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
            <IonTitle size="large">pageName</IonTitle>
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
                  <IonSelect onIonChange={(e) => { console.log(`Selected Number of Intervals: ${e.detail.value}`); setSelectedIntervals(e.detail.value) }} interface="popover" placeholder="Number of Intervals">
                    {

                      Array(maxNumIntervals).fill(0).map((_, i) => {
                        return <IonSelectOption key={"select-intervals-number-option" + i} value={i + 1}> {i + 1} </IonSelectOption>
                      })

                    }
                  </IonSelect>
                </IonItem>
              </IonItemGroup>

              <IonItemGroup>
                <IonItemDivider color="primary">
                  <IonLabel>Interval 1</IonLabel>
                </IonItemDivider>    
                <ExerciseListComponent headerTitle="Select exercise" modalName={pageName}/>          
                  
                  {/* <ExerciseListElement
                    key={`${"name"}${1}`}
                    imgAlt={`${"name"}${1}`}
                    imgHref={"https://ionicframework.com/docs/img/demos/thumbnail.svg"}
                    repsNumber={""}
                    exerciseName={"name"}
                    isTimeConstrained={false}
                    time={null}
                  /> */}
                
              </IonItemGroup>
            {/* </IonList> */}


          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
