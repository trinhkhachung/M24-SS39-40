import { useEffect, useReducer, useState } from "react";

// Khởi tạo interface
interface User {
  id: number;
  name: string;
  email: string;
  address: string;
  status: boolean;
}
interface State {
  users: User[];
  user: User;
  isloading: boolean;
}
interface Action {
  type: string;
  payload: any;
}

export default function Student() {
  // Khởi tạo hàm reducer
  const reducer = (state: State, action: Action) => {
    switch (action.type) {
      case "SETUSERS":
        return { ...state, users: action.payload };
      case "BLOCK":
        return {
          ...state,
          users: state.users.map((user) =>
            user.id === action.payload
              ? { ...user, status: !user.status }
              : user
          ),
        };
      default:
        return state;
    }
  };
  // Khởi tạo state cho reducer
  const initialState = {
    users: [],
    user: {
      id: 0,
      name: "",
      email: "",
      address: "",
      status: false,
    },
    isloading: false,
  };

  // Khởi tạo reducer
  const [state, dispatch] = useReducer(reducer, initialState);
  // Khởi tạo state
  const [letBlock, setBlock] = useState<boolean>(true);
  // Khởi tạo hàm action
  const action = (type: string, payload: any) => {
    return {
      type,
      payload,
    };
  };
  const block = (id: number) => {
    dispatch(action("BLOCK", id));
  };

  // Tác vụ phụ
  useEffect(() => {
    const data = localStorage.getItem("users");
    data ? dispatch(action("SETUSERS", JSON.parse(data))) : null;
  }, []);
  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(state.users));
  }, [state.users]);
  return (
    <>
      <div className="w-[80%] m-auto mt-4 h-[100vh]">
        <main className="main">
          <header className="d-flex justify-content-between mb-3">
            <h3>Nhân viên</h3>
            <button className="btn btn-primary">Thêm mới nhân viên</button>
          </header>
          <div className="d-flex align-items-center justify-content-end gap-2 mb-3">
            <input
              style={{ width: "350px" }}
              type="text"
              className="form-control"
              placeholder="Tìm kiếm theo email"
            />
            <i className="fa-solid fa-arrows-rotate" title="Refresh"></i>
          </div>
          {/* <!-- Danh sách nhân viên --> */}
          <table className="table table-bordered table-hover table-striped">
            <thead>
              <tr>
                <th>STT</th>
                <th>Họ và tên</th>
                <th>Ngày sinh</th>
                <th>Email</th>
                <th>Địa chỉ</th>
                <th>Trạng thái</th>
                <th colSpan={2}>Chức năng</th>
              </tr>
            </thead>
            <tbody>
              {state.users.map((user: User, index: number) => {
                <tr>
                  <td>{index + 1}</td>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.address}</td>
                  <td>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <div className="status status-active"></div>
                      <span> {user.status}</span>
                    </div>
                  </td>
                  <td>
                    <span
                      onClick={() => block(user.id)}
                      className="button button-block"
                    >
                      Chặn
                    </span>
                  </td>
                  <td>
                    <span
                      onClick={() => block(user.id)}
                      className="button button-edit"
                    >
                      Sửa
                    </span>
                  </td>
                  <td>
                    <span className="button button-delete">Xóa</span>
                  </td>
                </tr>;
              })}
            </tbody>
          </table>
          <footer className="d-flex justify-content-end align-items-center gap-3">
            <select className="form-select">
              <option selected>Hiển thị 10 bản ghi trên trang</option>
              <option>Hiển thị 20 bản ghi trên trang</option>
              <option>Hiển thị 50 bản ghi trên trang</option>
              <option>Hiển thị 100 bản ghi trên trang</option>
            </select>
            <ul className="pagination">
              <li className="page-item">
                <a className="page-link" href="#">
                  Previous
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  1
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  2
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  3
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  Next
                </a>
              </li>
            </ul>
          </footer>
        </main>
      </div>

      {/* <!-- Form thêm mới nhân viên --> */}
      <div className="overlay" hidden>
        <form className="form">
          <div className="d-flex justify-content-between align-items-center">
            <h4>Chỉnh sửa nhân viên</h4>
            <i className="fa-solid fa-xmark"></i>
          </div>
          <div>
            <label className="form-label" htmlFor="userName">
              Họ và tên
            </label>
            <input id="userName" type="email" className="form-control" />
            <div className="form-text error">
              Họ và tên không được để trống.
            </div>
          </div>
          <div>
            <label className="form-label" htmlFor="dateOfBirth">
              Ngày sinh
            </label>
            <input id="dateOfBirth" type="date" className="form-control" />
          </div>
          <div className="form-text error">
            Ngày sinh không được lớn hơn ngày hiện tại.
          </div>
          <div>
            <label className="form-label" htmlFor="email">
              Email
            </label>
            <input id="email" type="text" className="form-control" />
          </div>
          <div className="form-text error">Email không được để trống.</div>
          <div>
            <label className="form-label" htmlFor="address">
              Địa chỉ
            </label>
            <textarea className="form-control" id="address" rows={3}></textarea>
          </div>
          <div>
            <button className="w-100 btn btn-primary">Thêm mới</button>
          </div>
        </form>
      </div>

      {/* <!-- Modal xác nhận chặn tài khoản --> */}
      <div className="overlay">
        <div className="modal-custom">
          <div className="modal-title">
            <h4>Cảnh báo</h4>
            <i className="fa-solid fa-xmark"></i>
          </div>
          <div className="modal-body-custom">
            <span>Bạn có chắc chắn muốn chặn tài khoản này?</span>
          </div>
          <div className="modal-footer-custom">
            <button className="btn btn-light">Hủy</button>
            <button className="btn btn-danger">Xác nhận</button>
          </div>
        </div>
      </div>

      {/* <!-- Modal xác nhận xóa tài khoản --> */}
      <div className="overlay">
        <div className="modal-custom">
          <div className="modal-title">
            <h4>Cảnh báo</h4>
            <i className="fa-solid fa-xmark"></i>
          </div>
          <div className="modal-body-custom">
            <span>Bạn có chắc chắn muốn xóa tài khoản này?</span>
          </div>
          <div className="modal-footer-custom">
            <button className="btn btn-light">Hủy</button>
            <button className="btn btn-danger">Xác nhận</button>
          </div>
        </div>
      </div>
    </>
  );
}
