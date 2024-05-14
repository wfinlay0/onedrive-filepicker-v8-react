import "./App.css";
import PickerButton from "./components/PickerButton";
import { IFilePickerOptions } from "./lib/@pnp/picker-api";
import { getToken } from "./main";

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

function App() {
  return (
    <div>
      <PickerButton
        baseUrl="https://06ckq-my.sharepoint.com/"
        getToken={getToken}
        options={paramsTest}
        onResults={console.log}
      />
    </div>
  );
}

export default App;
