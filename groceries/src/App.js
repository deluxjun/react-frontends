import React, { useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";

const getStorageItems = (params) => {
  const items = localStorage.getItem("items");
  if (items) {
    console.log("STORAGE2:", items);
    return JSON.parse(items);
  }
  return [];
};

function App() {
  const [name, setName] = useState("");
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [alert, setAlert] = useState({ open: false, message: "" });
  const [data, setData] = useState(getStorageItems());
  const [isEditing, setEditing] = useState(false);

  const addData = (e) => {
    e.preventDefault();
    if (name && name.length > 0) {
      if (!isEditing) {
        setData((old) => {
          const newRow = { id: new Date().getTime().toString(), text: name };
          const newData = [...data, newRow];
          setAlert({ open: true, message: "item has been added" });
          return newData;
        });
      } else {
        // edit mode
        setData((old) => {
          const row = old.find((d) => d.id === currentIndex);
          row.text = name;
          setAlert({ open: true, message: "item has been changed" });
          return old;
        });
      }

      setCurrentIndex(-1);
    }
    setName("");
    setEditing(false);
  };

  // useEffect(() => {}, []);

  useEffect(() => {
    console.log("data changed: ", data);
    if (data) {
      localStorage.setItem("items", JSON.stringify(data));
    }
  }, [data]);

  const editItem = (index) => {
    const item = data.find((d) => d.id === index);
    console.log(item);
    setName(item.text);
    setEditing(true);
    setCurrentIndex(item.id);
  };
  const removeItem = (index) => {
    setData((old) => {
      setAlert({ open: true, message: "item has been changed" });
      return old.filter((d) => d.id !== index);
    });
  };

  return (
    <>
      <div className="section">
        <form className="grocery-form" onSubmit={addData}>
          <Alert
            message={alert.message}
            open={alert.open}
            close={() => setAlert({ open: false, message: "" })}
          ></Alert>
          <input
            className="grocery"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit">{isEditing ? "Edit" : "Add"}</button>
        </form>
        {data.length > 0 && (
          <List items={data} editItem={editItem} removeItem={removeItem}></List>
        )}
      </div>
    </>
  );
}

export default App;
