import React, { useState, useEffect } from "react";
import AddGoals from "./AddGoals";
import EverdayGoal from "./EverdayGoal";
import { useLocation } from "react-router-dom";
import { db } from "./firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
let array;
let i = 0;
function MyCalendar() {
  // const location = useLocation();
  const dateSt = "01-03-2024";
  const dateEd = "01-05-2024";
 const a = collection(db, "accomplish");

  const [currMonth, setCurrMonth] = useState("");
  const [currYear, setCurrYear] = useState("");
  const [prevDates, setPrevDates] = useState([]);
  const [currDates, setCurrDates] = useState([]);
  const [nextDates, setNextDates] = useState([]);
  const [date, setDate] = useState();
  const [year, setYear] = useState();
  const [month, setMonth] = useState();
  const [color, setColor] = useState("yellow");
  const [index, setIndex] = useState(1);
  const [clickedDates, setClickedDates] = useState([]);
  const [cond, setCond] = useState(false);


  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  console.log(months.includes("march"));
  function update() {
    setIndex(31);
    const currentDate1 = new Date();
    setDate(currentDate1);
    setYear(currentDate1.getFullYear());
    setMonth(currentDate1.getMonth());

    // setDate(new Date());
    // setYear(date.getFullYear());
    // setMonth(date.getMonth());
    // const day = document.querySelector(".calendar-dates");

    // const prenexIcons = document.querySelectorAll(".calendar-navigation span");

    // Array of month names

    // Function to generate the calendar
    const manipulate = () => {
      // Get the first day of the month
      let dayone = new Date(year, month, 1).getDay();

      // Get the last date of the month
      let lastdate = new Date(year, month + 1, 0).getDate();

      // Get the day of the last date of the month
      let dayend = new Date(year, month, lastdate).getDay();

      // Get the last date of the previous month
      let monthlastdate = new Date(year, month, 0).getDate();

      // Variable to store the generated calendar HTML
      // let lit = "";

      // Loop to add the last dates of the previous month

      var newElem = [];
      for (let i = dayone; i > 0; i--) {
        newElem.push(monthlastdate - i + 1);
        // lit += `<li class="inactive">${monthlastdate - i + 1}</li>`;
      }
      setPrevDates(newElem);
      newElem = [];

      // Loop to add the dates of the current month

      for (let i = 1; i <= lastdate; i++) {
        // Check if the current date is today

        newElem.push(i);
        // lit += `<li  class="${isToday}">${i}</li>`;
      }
      setCurrDates(newElem);
      newElem = [];
      // Loop to add the first dates of the next month
      for (let i = dayend; i < 6; i++) {
        // lit += `<li class="inactive">${i - dayend + 1}</li>`;
        newElem.push(i - dayend + 1);
      }
      setNextDates(newElem);

      // Update the text of the current date element
      // with the formatted current month and year

      setCurrMonth(months[month]);
      setCurrYear(year);

      // update the HTML of the dates element
      // with the generated calendar
      // day.innerHTML = lit;
    };

    manipulate();

    
  }
  useEffect(() => {
    update();
  }, []);

  const manipulate = () => {
    // Get the first day of the month
    let x = new Date(year, month, 1);
    let dayone = new Date(year, month, 1).getDay();

    // Get the last date of the month
    let lastdate = new Date(year, month + 1, 0).getDate();

    // Get the day of the last date of the month
    let dayend = new Date(year, month, lastdate).getDay();

    // Get the last date of the previous month
    let monthlastdate = new Date(year, month, 0).getDate();

    // Variable to store the generated calendar HTML
    // let lit = "";

    // Loop to add the last dates of the previous month

    var newElem = [];
    for (let i = dayone; i > 0; i--) {
      newElem.push(monthlastdate - i + 1);
      // lit += `<li class="inactive">${monthlastdate - i + 1}</li>`;
    }
    setPrevDates(newElem);
    newElem = [];

    // Loop to add the dates of the current month
    for (let i = 1; i <= lastdate; i++) {
      // Check if the current date is today

      newElem.push(i);
      // lit += `<li  class="${isToday}">${i}</li>`;
    }
    setCurrDates(newElem);
    newElem = [];
    // Loop to add the first dates of the next month
    for (let i = dayend; i < 6; i++) {
      // lit += `<li class="inactive">${i - dayend + 1}</li>`;
      newElem.push(i - dayend + 1);
    }
    setNextDates(newElem);

    // Update the text of the current date element
    // with the formatted current month and year

    setCurrMonth(months[month]);
    setCurrYear(year);

    // update the HTML of the dates element
    // with the generated calendar
    // day.innerHTML = lit;
  };
  function updateNext() {
    var y = month + 1;
    setMonth(y);

    if (y > 11) {
      setMonth(0);

      var x = new Date(year + 1, 0, new Date().getDate());

      setDate(x);

      // Set the year to the new year
      setYear(x.getFullYear());

      // Set the month to the new month
      setMonth(x.getMonth());
    } else {
      // Set the date to the current date

      setDate(new Date());
    }
  }
  function updatePrev() {
    let y = month - 1;
    setMonth(month - 1);

    if (y < 0) {
      setMonth(11);
      let x = new Date(year - 1, 11, new Date().getDate());
      setDate(x);

      // Set the year to the new year
      setYear(x.getFullYear());

      // Set the month to the new month
      setMonth(x.getMonth());
    } else {
      // Set the date to the current date

      setDate(new Date());
    }
  }
  useEffect(() => {
    manipulate();
  }, [month]);
  const handleDateClick = (id) => {
      setClickedDates((prevClickedDates) =>
        prevClickedDates.includes(id)
          ? prevClickedDates.filter((data) => {
              return data !== id;
            })
          : [...prevClickedDates, id]
      );
    };
 const clickOn = async () => {
   const data = await getDocs(a);
   const filteredData = data.docs.map((doc) => ({
     ...doc.data(),
     id: doc.id,
   }));
   array = filteredData;
  //  setClickedDates(filteredData);
 };
 const setClick = async (data) => {
   await addDoc(a, {
     b: data,
   });
 };
  const [green, setGreen] = useState(false);
  return (
    <>
      <h1 className="d-flex justify-content-center py-4  ">ChallengeQuest</h1>
      {/* {`start of challenge ${dateSt} and end of challenge ${dateEd}`} */}
      <div className="d-flex ">
        <div
          class="calendar-container mx-5"
          style={{ zIndex: "1", position: "relative" }}
        >
          <header class="calendar-header">
            <p class="calendar-current-date">
              <div className="d-flex justify-content-center align-items-center">
                {currMonth} {currYear}
                <div
                  style={{
                    borderRadius: "50%",
                    backgroundColor: "green",
                    width: "20px",
                    height: "20px",
                    marginLeft: "200px",
                  }}
                ></div>
                <div style={{ fontSize: "1rem" }}>-To check in</div>
                <div
                  style={{
                    borderRadius: "50%",
                    backgroundColor: "orange",
                    width: "20px",
                    height: "20px",
                    marginLeft: "10px",
                  }}
                ></div>{" "}
                <div style={{ fontSize: "1rem" }}>-To add goals</div>
              </div>
            </p>

            <div class="calendar-navigation">
              <span
                id="calendar-prev"
                class="material-symbols-rounded "
                onClick={updatePrev}
              >
                &lt;
              </span>
              <span
                id="calendar-next"
                class="material-symbols-rounded"
                onClick={updateNext}
              >
                &gt;
              </span>
            </div>
          </header>

          <div class="calendar-body">
            <ul class="calendar-weekdays">
              <li>Sun</li>
              <li>Mon</li>
              <li>Tue</li>
              <li>Wed</li>
              <li>Thu</li>
              <li>Fri</li>
              <li>Sat</li>
            </ul>
            <ul class="calendar-dates">
              {prevDates.map((elem, index) => {
                console.log(index);
                return <li class="inactive">{elem}</li>;
              })}
              {currDates.map((elem) => {
                let day1 = parseInt(dateSt[0] + dateSt[1]);
                let month1 = parseInt(dateSt[3] + dateSt[4]);
                let year1 = parseInt(
                  dateSt[6] + dateSt[7] + dateSt[8] + dateSt[9]
                );
                let day2 = parseInt(dateEd[0] + dateEd[1]);
                let month2 = parseInt(dateEd[3] + dateEd[4]);
                let year2 = parseInt(
                  dateEd[6] + dateEd[7] + dateEd[8] + dateEd[9]
                );

                let isActive =
                  (year === year1 &&
                    year === year2 &&
                    elem >= day1 &&
                    month === month1 - 1 &&
                    month < month2 - 1) ||
                  (year === year1 &&
                    year === year2 &&
                    elem >= day1 &&
                    elem <= day2 &&
                    month === month1 - 1 &&
                    month === month2 - 1) ||
                  (year === year1 &&
                    year === year2 &&
                    month > month1 - 1 &&
                    month < month2 - 1) ||
                  (year === year1 &&
                    year === year2 &&
                    elem <= day2 &&
                    month > month1 - 1 &&
                    month === month2 - 1) ||
                  (elem >= day1 &&
                    month >= month1 - 1 &&
                    year === year1 &&
                    year < year2) ||
                  (year > year1 && year < year2) ||
                  (year > year1 &&
                    year === year2 &&
                    elem <= day2 &&
                    month <= month2 - 1)
                    ? "borderActive"
                    : "";
                console.log(year1);
                let isToday =
                  elem === new Date().getDate() &&
                  month === new Date().getMonth() &&
                  year === new Date().getFullYear()
                    ? "active"
                    : "";
                const id = `${elem}_${month}_${year}`;
                const isClicked = clickedDates.includes(id);
                return (
                  <li
                    style={
                      isActive ? { lineHeight: "22px" } : { lineHeight: "39px" }
                    }
                    id={id}
                    className={`${isToday} ${
                      isClicked ? "click" : ""
                    } ${isActive}`}
                  >
                    {elem}
                    <div className="d-flex  ">
                      {isActive && (
                        <div
                          style={{
                            borderRadius: "50%",
                            backgroundColor: "green",
                            width: "15px",
                            height: "15px",
                            marginLeft: "50px",
                          }}
                          onClick={() => handleDateClick(id)}
                        ></div>
                      )}
                      {isToday && (
                        <div
                          style={{
                            borderRadius: "50%",
                            backgroundColor: "orange",
                            width: "15px",
                            height: "15px",
                            marginLeft: "5px",
                          }}
                          onClick={() => {
                            cond === true ? setCond(false) : setCond(true);
                          }}
                        >
                          {" "}
                        </div>
                      )}
                    </div>
                  </li>
                );
              })}
              <div>{cond && <AddGoals />}</div>

              {nextDates.map((elem) => {
                return <li className="inactive">{elem}</li>;
              })}
            </ul>
          </div>
        </div>
        <div></div>
      </div>
    </>
  );
}

export default MyCalendar;
