import { useState } from "react";
import Edit from "../edit/Edit";
import { v4 as uuidv4 } from "uuid";

interface Student {
  id: string;
  name: string;
  birthDate: string;
  email: string;
  status: boolean;
  isBlock: boolean;
}
interface Props {
  students: Student[];
  showAddButton: boolean;
}
export default function Add(props: Props) {
  const { students } = props;
  const { showAddButton } = props;
  // const {}
  // const {showAddButtion}
  const [showForm, setShowForm] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);
  const [formData, setFormData] = useState<
    Omit<Student, "id" | "status" | "isBlock">
  >({
    name: "",
    birthDate: "",
    email: "",
  });
  const showFormAdd = () => {
    setShowForm(true);
  };
  const hideFormAdd = () => {
    setShowForm(false);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newStudent: Student = {
      id: uuidv4(),
      ...formData,
      status: true,
      isBlock: false,
    };
    const updatedStudents = [...students, newStudent];
    localStorage.setItem("students", JSON.stringify(updatedStudents));
    setShowForm(false);
    // e.preventDefault();
    window.location.reload();
  };
  return (
    <>
      {/* <Edit id={} /> */}
      <button
        style={{ cursor: "pointer" }}
        onClick={showFormAdd}
        className="add-button"
      >
        Thêm mới sinh viên
      </button>
      {showForm ? (
        <div className="modal">
          <form onSubmit={submit} className="form">
            <div style={{ display: "flex" }} className="title">
              <h2 style={{ display: "inline", marginRight: "100px" }}>
                Thêm mới sinh viên
              </h2>
              <p
                style={{ cursor: "pointer", textAlign: "center" }}
                onClick={hideFormAdd}
              >
                X
              </p>
            </div>
            <input
              onChange={handleChange}
              placeholder="Tên sinh viên"
              type="text"
              name="name"
              value={formData.name}
            />
            <input
              onChange={handleChange}
              placeholder="Ngày sinh"
              type="date"
              name="birthDate"
              value={formData.birthDate.split("/")}
            />
            <input
              onChange={handleChange}
              placeholder="Email"
              type="text"
              name="email"
              value={formData.email}
            />
            <button type="submit">Thêm</button>
          </form>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
