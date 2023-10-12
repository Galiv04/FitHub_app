import {
  IonContent,
  IonDatetime,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./Tab2.css";
import ExerciseCard from "../components/exerciseCard";
import { Link } from "react-router-dom";

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

const Tab2 = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Workout of the Day</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Workout of the Day</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div className="datetimeCalendarContainer">
          <IonDatetime
            className="datetimeCalendar center"
            presentation="date"
            value="2023-01-01"
            highlightedDates={[
              {
                date: "2023-01-05",
                textColor: "#800080",
                backgroundColor: "#ffc0cb",
              },
              {
                date: "2023-01-10",
                textColor: "#09721b",
                backgroundColor: "#c8e5d0",
              },
              {
                date: "2023-01-20",
                textColor: "var(--ion-color-secondary-contrast)",
                backgroundColor: "var(--ion-color-secondary)",
              },
              {
                date: "2023-01-23",
                textColor: "rgb(68, 10, 184)",
                backgroundColor: "rgb(211, 200, 229)",
              },
            ]}
          ></IonDatetime>
        </div>
        {content}
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
