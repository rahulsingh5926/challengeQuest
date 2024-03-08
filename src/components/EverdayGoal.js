import React, { useState } from "react";
// import { db } from "./configure/configure";
// import { collection, addDoc } from "firebase/firestore";
function EverdayGoal({ showGoal, setShowGoal }) {
  const [content, setContent] = useState("");
  const [list, setList] = useState([]);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  return (
    <div>
      {showGoal && (
        <div
          style={{
            width: "200px",
            minHeight: "300px",
            backgroundColor: "#FFCEB1",
            zIndex: "2",
            marginLeft: "50px",
            position: "relative",
          }}
          className="d-flex align-items-center  flex-column"
        >
          <h6 className="mt-3">Add Todays Goal</h6>
          <div className="d-flex ">
            <input
              style={{ width: "120px", height: "40px", cursor: "pointer" }}
              type="text"
              className="form-control "
              placeholder=""
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
              }}
            />
            <button
              onClick={() => {
                if (content) setList((prevList) => [...prevList, content]);
                setContent("");
              }}
              style={{ width: "40px" }}
            >
              ADD
            </button>
          </div>
          {list &&
            list.map((item, index) => {
              const handleDelete = () => {
                // Create a copy of the list array
                const updatedList = [...list];
                // Remove the item at the current index
                console.log(index);
                updatedList.splice(index, 1);
                // Update the list state with the new array
                setList(updatedList);
              };

              return (
                <div
                  key={index}
                  style={{
                    width: "180px",
                    position: "relative",
                    margin: "4px",
                  }}
                >
                  {item}
                  <button
                    style={{ position: "absolute", right: "0" }}
                    onClick={handleDelete}
                  >
                    delete
                  </button>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
}

export default EverdayGoal;
