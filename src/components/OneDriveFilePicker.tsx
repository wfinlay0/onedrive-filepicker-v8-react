import * as React from "react";
import styles from "./OneDriveFilePicker.module.scss";

export interface IOneDriveFilePickerProps {}

const OneDriveFilePicker: React.FunctionComponent<
  IOneDriveFilePickerProps
> = () => {
  return (
    <div className={styles.OneDriveFilePicker}>
      <h1>OneDrive File Picker</h1>
    </div>
  );
};

export default OneDriveFilePicker;
