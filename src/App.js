import { createContext } from "react";
import { useState } from "react";
import "./App.css";
import Form from "./Components/Form";
import Table from "./Components/Table";
export const AppContext = createContext();
function App() {
  const [data, setData] = useState([]);
  const [formType, seFormType] = useState(null);
  const [toupdateData, setToUpdateData] = useState("");

  const deleteData = (id) => {
    setData(data.filter((d) => d.id !== id));
  };
  const editData = async (id) => {
    seFormType("Update");
    data.map((data) => {
      if (data.id === id) {
        setToUpdateData(data);
      }
    });

    console.log(toupdateData);
  };

  return (
    <AppContext.Provider
      value={{
        data,
        setData,
        editData,
        deleteData,
        formType,
        setToUpdateData,
        toupdateData,
      }}
    >
      <div className="container">
        <header className="header">
          <h1>User Manager</h1>
        </header>
        <div className="wrapper">
          <Form />
          <Table />
        </div>
      </div>
    </AppContext.Provider>
  );
}

export default App;
