import { IonItemDivider, IonItemGroup, IonLabel } from "@ionic/react";
import "./SelectInterval.css";
import ExerciseListComponent from "./ExerciseListComponent";

const SelectInterval = ({
  i,
  currentIntervalContent,
  handleOnclickFcn,
  selectionContent,
}) => {
  return (
    <div key={"interval-" + i}>
      <IonItemGroup>
        {/* <IonItemDivider color="primary">
          <IonLabel>{"Interval " + i}</IonLabel>
        </IonItemDivider> */}
        {currentIntervalContent}
        <br />
        <div className="interval-select-exercise">
          <ExerciseListComponent
            headerTitle="Select exercise"
            modalName={"filter-modal-" + i}
            handleOnclickCallback={handleOnclickFcn}
          />
        </div>

        {selectionContent}
      </IonItemGroup>
    </div>
  );
};

export default SelectInterval;
