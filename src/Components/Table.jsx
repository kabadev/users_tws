import { useContext } from "react";
import { AppContext } from "../App";
const Table = () => {
  const { data, editData, deleteData } = useContext(AppContext);
  return (
    <div className="data__table">
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((row, index) => (
            <tr key={index}>
              <td>{row.firstName}</td>
              <td>{row.lastName}</td>
              <td>{row.email}</td>
              <td>{row.phoneNumber}</td>
              <td className="action_btns">
                <button
                  className="action__btn"
                  onClick={() => editData(row.id)}
                >
                  Edit
                </button>
                <button
                  className="action__btn"
                  onClick={() => deleteData(row.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
