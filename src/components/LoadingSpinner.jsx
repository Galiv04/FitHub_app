import { IonSpinner } from "@ionic/react";
import "./LoadingSpinner.css";

const LoadingSpinner = ({ name }) => {
  return (
    <div className="container">
      {/* <strong>{name}</strong> */}
      <p> Loading... {name} </p>
      {/* <br /> */}
      {/* <IonSpinner></IonSpinner> */}
    </div>
  );
};

export default LoadingSpinner;
