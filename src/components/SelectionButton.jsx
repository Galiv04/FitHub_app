import "./SelectionButton.css";
import { IonButton } from "@ionic/react";

const SelectionButton = ({ text, isActive }) => {
  let fill;

  if (!isActive) {
    fill = "outline";
  } else {
    fill = "solid";
  }

  return (
    <>
      <IonButton className="filter-button" fill={fill}>
        {text}
      </IonButton>
    </>
  );
};

export default SelectionButton;
