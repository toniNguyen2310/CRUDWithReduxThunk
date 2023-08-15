import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { Button } from "antd";
// import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import {
  fetchAllData,
  fetchCreateRequest,
  fetchDeleteRequest,
  fetchEditRequest,
} from "./redux/action/actions";

function App() {
  const listDataName = useSelector((state) => state.listName.listData);
  const isLoading = useSelector((state) => state.listName.isLoading);
  const isError = useSelector((state) => state.listName.isError);
  const [nameValue, setNameValue] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [idFake, setIdFake] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllData());
  }, []);

  //SUBMIT
  const handleSubmit = () => {
    let newData = {
      name: nameValue,
    };
    dispatch(fetchCreateRequest(newData));
    setNameValue("");
  };

  //DELETE
  const handleDelete = (data) => {
    dispatch(fetchDeleteRequest(data));
  };

  //EDIT BTN
  const editClick = (data) => {
    setNameValue(data.name);
    setIsEdit(true);
    setIdFake(data.id);
  };

  //SAVE VALUE
  const handleSaveEdit = () => {
    let newData = {
      id: idFake,
      name: nameValue,
    };
    dispatch(fetchEditRequest(newData));
    setIsEdit(false);
    setNameValue("");
  };

  if (isLoading && isError === false) {
    return (
      <>
        <h1>Loading...</h1>
      </>
    );
  }
  if ((isLoading === false, isError === false)) {
    return (
      <>
        <div>
          <a href="https://vitejs.dev" target="_blank">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <h1>TodoList With Redux Thunk</h1>
        <div>
          <span>
            <input
              type="text"
              value={nameValue}
              onChange={(e) => setNameValue(e.target.value)}
            />
            {isEdit ? (
              <Button type="primary" onClick={handleSaveEdit}>
                SAVE
              </Button>
            ) : (
              <Button type="primary" onClick={handleSubmit}>
                ADD
              </Button>
            )}
          </span>
        </div>
        <div>
          <table>
            <thead>
              <tr>
                <th>STT</th>
                <th>Tên</th>
                <th>Sửa</th>
                <th>Xóa</th>
              </tr>
            </thead>
            <tbody>
              {listDataName &&
                listDataName.length > 0 &&
                listDataName.map((data, index) => {
                  return (
                    <tr key={data.id}>
                      <td>{index}</td>
                      <td>{data.name}</td>
                      <td>
                        <Button type="primary" onClick={() => editClick(data)}>
                          Edit
                        </Button>
                      </td>
                      <td>
                        <Button
                          type="primary"
                          danger
                          onClick={() => handleDelete(data)}
                        >
                          DELETE
                        </Button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
        <div className="card"></div>
      </>
    );
  }
}

export default App;
