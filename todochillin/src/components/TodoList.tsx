import { useEffect, useReducer, useState } from "react";

// Khai báo interface
interface State {
  tasks: Task[];
  taskStatus: Task[];
  task: Task;
  isloading: boolean;
}
interface Task {
  id: number;
  name: string;
  status: boolean;
}
interface Action {
  type: string;
  payload: any;
}
export default function TodoList() {
  // Khai báo hàm reducer
  const reducer = (state: State, action: Action) => {
    switch (action.type) {
      case "CHANGEINPUT":
        return { ...state, task: { ...state.task, name: action.payload } };
      case "ADDTODO":
        return { ...state, tasks: [...state.tasks, action.payload] };
      case "DELETETODO":
        return {
          ...state,
          tasks: state.tasks.filter((task) => task.id !== action.payload),
        };
      case "EDITTODO":
        return {
          ...state,
          tasks: state.tasks.map((task) =>
            task.id === action.payload.id
              ? { ...task, name: action.payload.name }
              : task
          ),
        };
      case "SHOWCOMPLETED":
        return {
          ...state,
          taskStatus: state.tasks.filter((task) => task.status),
        };
      case "SHOWINCOMPLETED":
        return {
          ...state,
          taskStatus: state.tasks.filter((task) => !task.status),
        };
      case "SETLOADING":
        return {
          ...state,
          isloading: true,
        };
      case "ALLTASK":
        return { ...state, taskStatus: state.tasks };
      case "SETTODOS":
        return {
          ...state,
          tasks: action.payload,
          taskStatus: action.payload,
        };
      default:
        return state;
    }
  };

  // Khai báo giá trị khởi tạo
  const initialState = {
    tasks: [],
    task: { id: 0, name: "", status: false },
    taskStatus: [],
    isloading: false,
  };

  // Hàm hành động của reducer
  const action = (type: string, payload: any) => {
    return { type, payload };
  };

  // Khai báo state và reducer
  const [state, dispatch] = useReducer(reducer, initialState);
  const [showModalEmptyInput, setShowModalEmptyInput] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [currentId, setCurrentId] = useState<number>(0);
  const [completed, setCompleted] = useState<number>(0);

  // Hàm thêm công việc
  const handleAddTodo = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (inputValue) {
      dispatch(
        action("ADDTODO", {
          ...state.task,
          id: Math.floor(Math.random() * 10000000),
          name: inputValue,
        })
      );
      setInputValue("");
    } else {
      setShowModalEmptyInput(true);
    }
  };

  // Hàm xóa
  const handleDelete = (id: number) => {
    setCurrentId(id);
    setShowDeleteModal(true);
  };

  const deleteTodo = () => {
    dispatch(action("DELETETODO", currentId));
    setShowDeleteModal(false);
    setCurrentId(0);
  };

  // Hàm sửa
  const handleEdit = (id: number, name: string) => {
    setCurrentId(id);
    setInputValue(name);
    setShowEditModal(true);
  };

  const editTodo = () => {
    dispatch(action("EDITTODO", { id: currentId, name: inputValue }));
    setShowEditModal(false);
    setInputValue("");
    setCurrentId(0);
  };

  // Hàm set input
  const changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(action("CHANGEINPUT", e.target.value));
    setInputValue(e.target.value);
  };

  // Hàm xem tác vụ
  const handleView = () => {
    if (completed === 0) {
      dispatch(action("ALLTASK", null));
    } else if (completed === 1) {
      dispatch(action("SHOWCOMPLETED", null));
    } else if (completed === 2) {
      dispatch(action("SHOWINCOMPLETED", null));
    }
  };

  // Hàm thay đổi trạng thái
  const changeStatus = (id: number) => {
    const updatedTasks = state.tasks.map((task: Task) =>
      task.id === id ? { ...task, status: !task.status } : task
    );
    dispatch(action("SETTODOS", updatedTasks));
  };

  useEffect(() => {
    handleView();
  }, [completed, state.tasks]);

  // Tác vụ phụ
  useEffect(() => {
    const taskStored = localStorage.getItem("tasks");
    if (taskStored) {
      dispatch({ type: "SETTODOS", payload: JSON.parse(taskStored) });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(state.tasks));
  }, [state.tasks]);

  return (
    <>
      <section className="vh-100 gradient-custom">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-10">
              <div className="card">
                <div className="card-body p-5">
                  <form className="d-flex justify-content-center align-items-center mb-4">
                    <div className="form-outline flex-fill">
                      <input
                        onChange={changeInput}
                        value={inputValue}
                        type="text"
                        id="form2"
                        className="form-control"
                      />
                      <label className="form-label" htmlFor="form2">
                        Nhập tên công việc
                      </label>
                    </div>
                    <button
                      onClick={handleAddTodo}
                      type="submit"
                      className="btn btn-info ms-2"
                    >
                      Thêm
                    </button>
                  </form>

                  {/* <!-- Tabs navs --> */}
                  <ul className="nav nav-tabs mb-4 pb-2">
                    <li className="nav-item" role="presentation">
                      <a
                        onClick={() => setCompleted(0)}
                        className={
                          completed === 0 ? "nav-link active" : "nav-link"
                        }
                      >
                        Tất cả
                      </a>
                    </li>
                    <li className="nav-item" role="presentation">
                      <a
                        onClick={() => setCompleted(1)}
                        className={
                          completed === 1 ? "nav-link active" : "nav-link"
                        }
                      >
                        Đã hoàn thành
                      </a>
                    </li>
                    <li className="nav-item" role="presentation">
                      <a
                        onClick={() => setCompleted(2)}
                        className={
                          completed === 2 ? "nav-link active" : "nav-link"
                        }
                      >
                        Chưa hoàn thành
                      </a>
                    </li>
                  </ul>
                  {/* <!-- Tabs navs --> */}

                  {/* <!-- Tabs content --> */}
                  <div className="tab-content" id="ex1-content">
                    <div className="tab-pane fade show active">
                      <ul className="list-group mb-0">
                        {state.taskStatus.map((task: Task) => (
                          <li
                            key={task.id}
                            className="list-group-item d-flex align-items-center justify-content-between border-0 mb-2 rounded"
                            style={{ backgroundColor: "#f4f6f7" }}
                          >
                            <div>
                              <input
                                onChange={() => changeStatus(task.id)}
                                checked={task.status}
                                className="form-check-input me-2"
                                type="checkbox"
                              />
                              <span>{task.name}</span>
                            </div>
                            <div className="d-flex gap-3">
                              <i
                                onClick={() => handleEdit(task.id, task.name)}
                                className="fas fa-pen-to-square text-warning"
                              ></i>
                              <i
                                onClick={() => handleDelete(task.id)}
                                className="far fa-trash-can text-danger"
                              ></i>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  {/* <!-- Tabs content --> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- Modal xác nhận xóa --> */}
      {showDeleteModal && (
        <div className="overlay">
          <div className="modal-custom">
            <div className="modal-header-custom">
              <h5>Xác nhận</h5>
              <i
                onClick={() => setShowDeleteModal(false)}
                className="fas fa-xmark"
              ></i>
            </div>
            <div className="modal-body-custom">
              <p>Bạn chắc chắn muốn xóa công việc này?</p>
            </div>
            <div className="modal-footer-custom">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="btn btn-light"
              >
                Hủy
              </button>
              <button onClick={deleteTodo} className="btn btn-danger">
                Xóa
              </button>
            </div>
          </div>
        </div>
      )}

      {/* <!-- Modal cảnh báo lỗi --> */}
      {showModalEmptyInput && (
        <div className="overlay">
          <div className="modal-custom">
            <div className="modal-header-custom">
              <h5>Cảnh báo</h5>
              <i
                onClick={() => setShowModalEmptyInput(false)}
                className="fas fa-xmark"
              ></i>
            </div>
            <div className="modal-body-custom">
              <p>Tên công việc không được phép để trống.</p>
            </div>
            <div className="modal-footer-custom">
              <button
                onClick={() => setShowModalEmptyInput(false)}
                className="btn btn-light"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* <!-- Modal chỉnh sửa công việc --> */}
      {showEditModal && (
        <div className="overlay">
          <div className="modal-custom">
            <div className="modal-header-custom">
              <h5>Chỉnh sửa công việc</h5>
              <i
                onClick={() => setShowEditModal(false)}
                className="fas fa-xmark"
              ></i>
            </div>
            <div className="modal-body-custom">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="modal-footer-custom">
              <button
                onClick={() => setShowEditModal(false)}
                className="btn btn-light"
              >
                Hủy
              </button>
              <button onClick={editTodo} className="btn btn-primary">
                Lưu
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
