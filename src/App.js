import { useEffect, useState } from "react";
import "./App.css";
import Calender from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useDispatch } from "react-redux";

function App() {
  const [selectSlot, slotHandler] = useState("");
  const [selected, setDate] = useState(new Date());
  const [drop, setDrop] = useState("Tello");
  const [userName, setUserName] = useState("");
  const [desc, setDesc] = useState("");
  const [slot, setSlot] = useState({
    "10:00_AM": false,
    "10:30_AM": false,
    "11:00_AM": false,
    "11:30_AM": false,
    "12:00_PM": false,
    "12:30_PM": false,
    "01:00_PM": false,
    "01:30_PM": false,
    "02:00_PM": false,
    "02:30_PM": false,
    "03:00_PM": false,
    "03:30_PM": false,
    "04:00_PM": false,
    "04:30_PM": false,
    "05:00_PM": false,
    "05:30_PM": false,
    "06:00_PM": false,
    "06:30_PM": false,
    "07:00_PM": false,
  });
  const dispatch = useDispatch();
  const [change, setChange] = useState(true);
  const submitHandler = () => {
    console.log("Im_Back_Nigga");
    dispatch({
      type: "ADD_MEET",
      payload: {
        date: "7",
        data: selectSlot,
      },
    });
  };
  useEffect(() => {}, [change]);
  const handeler = (e) => setDrop(e.target.value);
  return (
    <div className="App">
      <div className="form">
        <div className="dropdown">
          <label>Meeting Type</label>
          <select onChange={(e) => handeler(e)} value={drop}>
            <option value="project">Project</option>
            <option value="client">Client</option>
            <option value="interview">Interview</option>
            <option value="others">Others</option>
          </select>
        </div>
        <div className="name">
          <label>Name</label>
          <input
            placeholder="Enter your name or ID"
            onChange={(e) => setUserName(e.target.value)}
          ></input>
        </div>
        <div className="description">
          <label>Meeting Description</label>
          <textarea
            placeholder="Enter meeting description"
            onChange={(e) => setDesc(e.target.value)}
            rows={3}
          ></textarea>
        </div>
      </div>
      <div className="call">
        <Calender
          minDate={new Date()}
          onChange={(v, e) => setDate(v)}
          value={selected}
        />
      </div>
      <div className="slots">
        {Object.keys(slot).map((el) => (
          <div
            className="slot"
            key={el}
            style={{
              borderColor:
                el === selectSlot ? "crimson" : slot[el] ? "crimson" : "grey",
              color:
                el === selectSlot ? "crimson" : slot[el] ? "crimson" : "grey",
            }}
            onClick={() => slotHandler(el)}
          >
            {el}
          </div>
        ))}
      </div>
      <button className="btn" onClick={() => submitHandler()}>
        Set Meeting
      </button>
    </div>
  );
}

export default App;
