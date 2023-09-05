import { render } from "preact";
import preactLogo from "./assets/preact.svg";
import "./style.css";
import Calender from "./components/Calender";

export function App() {
  return (
    <div>
      <Calender />
    </div>
  );
}

render(<App />, document.getElementById("app"));
