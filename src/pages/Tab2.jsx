import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./Tab2.css";
import ExerciseCard from "../components/exerciseCard";
import { Link } from "react-router-dom";

//data to test TBD
let exerciseArray = [
  { name: "squat", series: 5, reps: 20 },
  { name: "bench", series: 4, reps: 10 },
  { name: "pull", series: 3, reps: 12 },
];
let content = [];

exerciseArray.forEach((el, i) => {
  content.push(
    <Link key={`link${i}`}
      to={{
        pathname: "/workout",
        state: { testText: "testText" }, // TBD
      }}
    >
      <ExerciseCard
        key={`item${i}`}
        number={i + 1}
        title={el.name}
        subtitle={el.reps}
      />
    </Link>
  );
});

const Tab2 = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 2</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 2</IonTitle>
          </IonToolbar>
        </IonHeader>
        {/* <ExerciseCard
          number="1"
          title="ciao"
          subtitle="ciaociao"
        /> */}
        {content}
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
