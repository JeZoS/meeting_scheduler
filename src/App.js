import { useEffect, useState } from "react";
import "./App.css";
import Calender from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const dispatch = useDispatch();

  //
  //states
  const [show, setShow] = useState(false);
  const [eror, setError] = useState(false);
  const [message, setMessage] = useState("Meeting Scheduled");
  const [selectSlot, slotHandler] = useState("");
  const [selected, setDate] = useState(new Date());
  const [drop, setDrop] = useState("Project");
  const [userName, setUserName] = useState("");
  const [desc, setDesc] = useState("");

  //
  //time slots
  const [slot, setSlot] = useState({});

  //
  //for marking meetings already booked on selected date
  const DatesBooked = useSelector((state) => state.DatesBooked);
  const { dates: current } = DatesBooked;
  if (Object.keys(current).length > 0) {
    var array = current[selected.getDate()];
    if (array) {
      array.forEach((_, idx) => {
        slot[array[idx]] = true;
      });
    }
  }

  //
  //button Click SET MEETING
  const submitHandler = () => {
    if (
      userName.length === 0 ||
      selectSlot.length === 0 ||
      desc.length === 0 ||
      slot[selectSlot] === true
    ) {
      if (userName.length === 0) setMessage("Enter Username");
      else if (selectSlot.length === 0) setMessage("Select a Slot");
      else if (desc.length === 0) setMessage("Enter Description");
      else if (slot[selectSlot] === true) setMessage("Slot already Booked");
      else setMessage("Please Select ans Fill all the Necessary Details");
      setError(true);
      setShow(true);
      slotHandler("");
      setTimeout(() => {
        setShow(false);
      }, 1500);
      return;
    } else {
      dispatch({
        type: "USER_MEET",
        payload: {
          username: userName,
          time: selectSlot,
          desc: desc,
          mtype: drop,
          dte: selected,
        },
      });
      dispatch({
        type: "ADD_MEET",
        payload: {
          date: selected.getDate(),
          data: selectSlot,
        },
      });
      setMessage("Meeting Added");
      setError(false);
      setShow(true);
      setUserName("");
      slotHandler("");
      setDesc("");
      setTimeout(() => {
        setShow(false);
      }, 1500);
    }
  };

  //
  //initalizing all slots and selected slot as false and None respectively
  useEffect(() => {
    setSlot({
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
    slotHandler("");
  }, [dispatch, selected]);

  //
  //for DropDown
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
            value={userName.length ? userName : ""}
            onChange={(e) => setUserName(e.target.value)}
          ></input>
        </div>
        <div className="description">
          <label>Meeting Description</label>
          <textarea
            value={desc.length ? desc : ""}
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
                el === selectSlot ? "green" : slot[el] ? "crimson" : "grey",
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
      <div className="notification">
        <h3
          style={{
            backgroundColor: eror ? "tomato" : "teal",
            display: show ? "" : "none",
          }}
        >
          {message}
        </h3>
      </div>
    </div>
  );
}

export default App;
