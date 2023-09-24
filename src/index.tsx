import { render } from "preact";
import preactLogo from "./assets/preact.svg";
import "./style.css";
import Calender from "./components/Calender";

export function App() {
  return (
    <div style={{ padding: "10%" }}>
      <Calender
        eventDetails={{
          title: "Meeting",
          startDate: new Date("2023-09-26"),
          endDate: new Date("2023-09-27"),
        }}
        currentDateBackground="#D1C4E9"
        currentDateColor="#311B92"
      />
    </div>
  );
}

render(<App />, document.getElementById("app"));
