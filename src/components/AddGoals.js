import React, { useEffect, useState } from "react";
import { db } from "./firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";

function AddGoals() {
  let st;
  const [content, setContent] = useState("");
  const [list, setList] = useState([]);
  const [startDate, setStartDate] = useState([]);
  const [endDate, setEndDate] = useState();
  const a = collection(db, "monthyGoal");
  const b = collection(db, "startdate");
  const startQuest = async () => {
    const data = await getDocs(b);
    const filteredData = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    console.log(filteredData);
    setStartDate(filteredData);
  };
  const setStartQuest = async (data) => {
    if (data && startDate.length === 0) {
      await addDoc(b, {
        startQuest: data,
      });
      startQuest();
    }
  };
  const deleteStartDate = async (id) => {
    const text = doc(db, "startdate", id);
    await deleteDoc(text);
    startQuest();
  };
  const getGoals = async () => {
    const data = await getDocs(a);
    const filteredData = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setList(filteredData);
  };
  const deleteContent = async (id) => {
    const text = doc(db, "monthyGoal", id);
    await deleteDoc(text);
    getGoals();
  };
  useEffect(() => {
    getGoals();
    startQuest();
  }, []);
  const onSubmitContent = async () => {
    if (content) {
      await addDoc(a, {
        text: content,
      });
    }
    getGoals();
  };
  return (
    <div style={{ display: "grid", justifyItems: "center" }}>
      <h3 className=" mt-5">Enter the start and end date of challenge</h3>

      <div className="d-flex align-items-center">
        <label for="birthday">Start Date:</label>
        <input
          style={{ width: "150px", margin: "20px", cursor: "pointer" }}
          type="date"
          className="form-control "
          placeholder="start date"
          onChange={(e) => {
            st = e.target.value;
            // setStartQuest(st);
          }}
          value={st}
          // onChange={userEnterFeet}
        />
        <button onClick={() => setStartQuest(st)}>set</button>

        <label>End Date:</label>
        <input
          style={{ width: "150px", margin: "20px", cursor: "pointer" }}
          type="date"
          className="form-control border-orange-600"
          placeholder="end date"
          // value={feet}
          // onChange={userEnterFeet}
        />
      </div>
      {startDate &&
        startDate.map((item) => {
          return (
            <div>
              {item.startQuest}
              <button onClick={() => deleteStartDate(item.id)}>delete</button>
            </div>
          );
        })}
      <div
        style={{
          width: "500px",
          minHeight: "300px",
          backgroundColor: "white",
          margin: "50px",
          padding: "20px",
        }}
        className="d-flex align-items-center  flex-column"
      >
        <h5 className="">Add Monthy Goal</h5>
        <div className="d-flex ">
          <input
            style={{ width: "300px", cursor: "pointer" }}
            type="text"
            className="form-control "
            placeholder="enter your goal....."
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
          />
          <button
            onClick={() => {
              // if (content) setList((prevList) => [...prevList, content]);
              onSubmitContent();
              setContent("");
            }}
          >
            ADD GOAL
          </button>
        </div>
        {list &&
          list.map((item, index) => {
            // const handleDelete = () => {
            //   // Create a copy of the list array
            //   const updatedList = [...list];
            //   // Remove the item at the current index
            //   console.log(index);
            //   updatedList.splice(index, 1);
            //   // Update the list state with the new array
            //   setList(updatedList);
            // };

            return (
              <div
                key={index}
                style={{
                  width: "400px",
                  position: "relative",
                  margin: "4px",
                }}
              >
                {item.text}
                <button
                  style={{ position: "absolute", right: "0" }}
                  onClick={() => deleteContent(item.id)}
                >
                  delete
                </button>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default AddGoals;
