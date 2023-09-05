import { produce } from "immer";
import { useEffect, useState } from "preact/hooks";

type CalenderProps = {
  cellClass?: string;
};
const Calender = (props: CalenderProps) => {
  const [calenderList, setCalenderList] = useState([]);
  const getCalender = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();

    const lastMonthdates = new Date(year, month, 1).getDay();
    const lastdateOfCurrentMonth = new Date(year, month + 1, 0).getDate();
    const dayend = new Date(year, month, lastdateOfCurrentMonth).getDay();
    const previousMonthlastdate = new Date(year, month, 0).getDate();
    const dateArray = produce([], (state) => {
      for (let i = lastMonthdates; i > 0; i--) {
        state.push(previousMonthlastdate - i + 1);
      }
      for (let i = 1; i <= lastdateOfCurrentMonth; i++) {
        // Check if the current date is today
        // let isToday = i === date.getDate()
        //     && month === new Date().getMonth()
        //     && year === new Date().getFullYear()
        //     ? "active"
        //     : "";
        state.push(i);
      }
      for (let i = dayend; i < 6; i++) {
        state.push(i - dayend + 1);
      }
    });
    setCalenderList(dateArray);
    // // Loop to add the first dates of the next month
  };
  useEffect(() => {
    getCalender();
  }, []);
  return (
    <div style={{ display: "flex", width: "100%", flexWrap: "wrap" }}>
      {calenderList.map((item: number, index: number) => (
        <div
          style={{
            width: "calc(100% / 7)",
            boxShadow:
              "1px 0 0 0 #888,0 1px 0 0 #888,1px 1px 0 0 #888,1px 0 0 0 #888 inset,0 2px 0 0 #888 inset",
          }}
          key={index}
        >
          <p>{item}</p>
        </div>
      ))}
    </div>
  );
};

export default Calender;
