import React, { useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";

const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return JSON.parse(localStorage.getItem("list"));
  } else {
    return [];
  }
};

function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({
    show: false,
    msg: "",
    type: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      // display alert
      showAlert(true, "danger", "please enter task");
    } else if (name && isEditing) {
      // edit
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, title: name };
          }
          return item;
        })
      );
      setName("");
      setEditID(null);
      setIsEditing(false);
      showAlert(true, "success", "task edited successfully");
    } else {
      // show alert
      showAlert(true, "success", "task added to the list");
      const newItem = { id: new Date().getTime().toString(), title: name };
      setList([...list, newItem]);
      setName("");
    }
  };

  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };

  const clearList = () => {
    showAlert(true, "danger", "tasks cleared");
    setList([]);
  };

  const removeItem = (id) => {
    showAlert(true, "danger", "tasks removed");
    setList(list.filter((item) => item.id !== id));
  };

  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditID(id);
    setName(specificItem.title);
  };

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  return (
    <section className="section-center w-[90vw] my-0 mx-auto max-w-[35rem] mt-[8rem] bg-[#fff] rounded shadow-md transition-all duration-300 ease-linear p-[2rem] hover:shadow-xl">
      <form className="grocery-form" onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
        <h3 className="heading text-[#063251] text-[1.25rem] font-medium text-center ">
          to do app
        </h3>
        <div className="form-control flex justify-center">
          <input
            type="text"
            className="todo p-[0.25rem] pl-4 bg-[#f1f5f8] rounded-l-[0.25rem] border-transparent text-[1rem] flex-[1_0_auto] outline-[#a5d5f8]  "
            placeholder="Enter your tasks"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button
            type="submit"
            className="submit-btn bg-[#a5d5f8] flex-[0_0_5rem] grid items-center p-1 capitalize tracking-[2px] rounded-r-[0.25rem] cursor-pointer transition-all duration-300 ease-linear text-[0.85rem] hover:bg-[#49a6e9] hover:text-[#fff]  "
          >
            {isEditing ? "edit" : "submit"}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div className="grocery-container mt-[2rem] ">
          <List items={list} removeItem={removeItem} editItem={editItem} />
          <button className="clear-btn" onClick={clearList}>
            clear items
          </button>
        </div>
      )}
    </section>
  );
}

export default App;
