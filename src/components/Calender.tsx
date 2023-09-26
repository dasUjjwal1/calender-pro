import { produce } from "immer";
import { useEffect, useState } from "preact/hooks";

type CalenderProps = {
  currentDateBackground?: string;
  currentDateColor?: string;
  background?: string;
  textColor?: string;
  backgroundDisable?: string;
  textDisable?: string;
  eventDetails?: Event;
};
type Event = {
  title?: string;
  description?: string;
  startTime?: string;
  endTime?: string;
  startDate?: Date;
  endDate?: Date;
  backgroundColor?: string;
  textColor?: string;
};

type ItemProps = {
  date: number;
  month?: number;
  year?: number;
  background?: string;
  textColor?: string;
  eventDetails?: Event[];
};
const Calender = (props: CalenderProps) => {
  const [calenderList, setCalenderList] = useState<ItemProps[]>([]);
  const [dialog, setDialog] = useState(false);
  const getCalender = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();

    const lastMonthdates = new Date(year, month, 1);
    const lastdateOfCurrentMonth = new Date(year, month + 1, 0);
    const dayend = new Date(year, month, lastdateOfCurrentMonth.getDate());
    const previousMonthlastdate = new Date(year, month, 0);
    const isToday =
      month === new Date().getMonth() &&
      year === new Date().getFullYear() &&
      date.getDate();

    const dateArray: ItemProps[] = produce([], (state) => {
      for (let i = lastMonthdates.getDay(); i > 0; i--) {
        const item: ItemProps = {
          date: previousMonthlastdate.getDate() - i + 1,
          month: previousMonthlastdate.getMonth(),
          year: previousMonthlastdate.getFullYear(),
          background: props?.background,
          textColor: props?.textColor,
          eventDetails: [props?.eventDetails],
        };
        state.push(item);
      }
      for (let i = 1; i <= lastdateOfCurrentMonth.getDate(); i++) {
        // Check if the current date is today

        const item: ItemProps = {
          date: i,
          month: lastdateOfCurrentMonth.getMonth(),
          year: lastdateOfCurrentMonth.getFullYear(),
          textColor: i === isToday ? props?.currentDateColor : props.textColor,
          background:
            i === isToday ? props?.currentDateBackground : props.background,
        };
        state.push(item);
      }
      for (let i = dayend.getDay(); i < 6; i++) {
        const item: ItemProps = {
          date: i - dayend.getDay() + 1,
          month: dayend.getMonth(),
          year: dayend.getFullYear(),
          textColor: props.currentDateColor
            ? props.currentDateBackground
            : "#311B92",
          background: props.currentDateBackground
            ? props.currentDateBackground
            : "#D1C4E9",
        };
        state.push();
      }
    });
    console.log(dateArray);
    setCalenderList(dateArray);
    // // Loop to add the first dates of the next month
  };
  useEffect(() => {
    getCalender();
  }, []);
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "auto auto auto auto auto auto auto ",
        width: "100%",
      }}
    >
      {calenderList.map((item, index: number) => (
        <div
          key={index}
          style={{
            width: "100%",
            position: "relative",
          }}
        >
          <button
            style={{
              width: "100%",
              aspectRatio: "1 / 0.7",
              backgroundColor: item.background,
              color: item.textColor,
              outline: "none",
              // boxShadow:
              //   "1px 0 0 0 #888,0 1px 0 0 #888,1px 1px 0 0 #888,1px 0 0 0 #888 inset,0 2px 0 0 #888 inset",
            }}
          >
            <p style={{ fontSize: "1rem" }}>{item.date}</p>
          </button>
          {item.month === props.eventDetails.startDate.getMonth() &&
            props.eventDetails.startDate.getFullYear() === item.year &&
            item.date >= props.eventDetails.startDate.getDate() &&
            item.date <= props.eventDetails.endDate.getDate() && (
              <div
                onMouseEnter={() => {
                  setDialog(true);
                }}
                style={{
                  position: "absolute",
                  top: "10%",
                  left: 0,
                  backgroundColor: "#DCEDC8",
                  width: "100%",
                  color: "#33691E",
                  fontWeight: "900",
                  height: 15,
                  fontSize: 10,
                  padding: "0 10px",
                }}
              >
                {item.date === props.eventDetails.startDate.getDate() &&
                  "event"}
                {item.date === props.eventDetails.startDate.getDate() && (
                  <dialog
                    class={"dialog"}
                    style={{
                      backgroundColor: "#DCEDC8",
                      borderRadius: "10px",
                      color: "#33691E",
                      padding: 20,
                      marginTop: 5,
                      width: 200,
                      zIndex: 9999999,
                    }}
                    open={dialog}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-end",
                      }}
                    >
                      <button
                        title={"Close"}
                        style={{
                          backgroundColor: "#33691E",
                          color: "#DCEDC8",
                          border: "none",
                          outline: "none",
                          display: "flex",
                          alignItems: "center",
                          height: 30,
                          width: 30,
                          justifyContent: "center",
                          borderRadius: "50%",
                          fontSize: 18,
                          cursor: "pointer",
                        }}
                        onClick={() => setDialog(false)}
                      >
                        &#9967;
                      </button>
                    </div>
                    <div>
                      <h3>{props.eventDetails.title}</h3>
                    </div>
                  </dialog>
                )}
              </div>
            )}
        </div>
      ))}
    </div>
  );
};

export default Calender;
