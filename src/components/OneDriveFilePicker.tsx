import * as React from "react";
import styles from "./OneDriveFilePicker.module.scss";
import PickerButton from "./PickerButton";
import { IFilePickerOptions } from "../lib/@pnp/picker-api/dist";
import { getToken } from "../main";

export interface IOneDriveFilePickerProps {}

const paramsTest: IFilePickerOptions = {
  sdk: "8.0",
  entry: {
    oneDrive: {},
  },
  authentication: {},
  messaging: {
    origin: "http://localhost:3000",
    channelId: "27",
  },
  selection: {
    mode: "multiple",
  },
  typesAndSources: {
    // filters: [".docx"],
    mode: "files",
    pivots: {
      oneDrive: true,
      recent: true,
    },
  },
};

const OneDriveFilePicker: React.FunctionComponent<
  IOneDriveFilePickerProps
> = () => {
  return (
    <div className={styles.OneDriveFilePicker}>
      <h1>OneDrive File Picker</h1>
      <PickerButton
        baseUrl="https://06ckq-my.sharepoint.com/"
        getToken={getToken}
        options={paramsTest}
        onResults={console.log}
      />
    </div>
  );
};

export default OneDriveFilePicker;
