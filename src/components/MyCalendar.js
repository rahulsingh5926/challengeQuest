import React, { useState, useEffect } from "react";
import AddGoals from "./AddGoals";
import EverdayGoal from "./EverdayGoal";
let i = 0;
function MyCalendar() {
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

  const handleDateClick = (id) => {
    setClickedDates((prevClickedDates) =>
      prevClickedDates.includes(id)
        ? prevClickedDates.filter((data) => {
            return data !== id;
          })
        : [...prevClickedDates, id]
    );
  };
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

    // Attach a click event listener to each icon
    // prenexIcons.forEach((icon) => {
    //   // When an icon is clicked
    //   icon.addEventListener("click", () => {
    //     // Check if the icon is "calendar-prev"
    //     // or "calendar-next"
    //     month = icon.id === "calendar-prev" ? month - 1 : month + 1;

    //     // Check if the month is out of range
    //     if (month < 0 || month > 11) {
    //       // Set the date to the first day of the
    //       // month with the new year
    //       date = new Date(year, month, new Date().getDate());

    //       // Set the year to the new year
    //       year = date.getFullYear();

    //       // Set the month to the new month
    //       month = date.getMonth();
    //     } else {
    //       // Set the date to the current date
    //       date = new Date();
    //     }

    //     // Call the manipulate function to
    //     // update the calendar display
    //     manipulate();
    //   });
    // });
  }
  useEffect(() => {
    update();
  }, []);
  // function handleClick(id) {
  //   const element = document.getElementById(id);
  //   console.log(id);

  //   if (element.classList.contains("click")) element.classList.remove("click");
  //   else element.classList.add("click");
  // }
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

  const [green, setGreen] = useState(false);
  return (
    <>
      <h1 className="d-flex justify-content-center py-4  ">ChallengeQuest</h1>
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
                    style={{ lineHeight: "22px" }}
                    id={id}
                    className={`${isToday} ${isClicked ? "click" : ""}`}
                  >
                    {elem}
                    <div className="d-flex  ">
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
