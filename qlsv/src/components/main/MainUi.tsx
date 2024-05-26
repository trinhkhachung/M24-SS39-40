import Add from "../add/Add";
import List from "../list/List";
import { useState } from "react";

interface Student {
  id: string;
  name: string;
  birthDate: string;
  email: string;
  status: boolean;
  isBlock: boolean;
}
export default function MainUi() {
  const [students, setStudents] = useState<Student[]>(() => {
    const data = localStorage.getItem("students");
    return data ? JSON.parse(data) : [];
  });
  const [showAddButton, setShowAddButton] = useState<boolean>(false);
  return (
    <>
      <h1>Quản lí sinh viên</h1>
      <Add students={students} showAddButton={showAddButton} />
      <table>
        <thead>
          <tr>
            <th>STT</th>
            <th>Mã sinh viên</th>
            <th>Tên sinh viên</th>
            <th>Ngày sinh</th>
            <th>Email</th>
            <th>Trạng thái</th>
            <th>Chức năng</th>
          </tr>
        </thead>
        <tbody>
          <List students={students} />
          {/* <tr>
            <td>1</td>
            <td>SV001</td>
            <td>Nguyễn Văn A</td>
            <td>01/02/2005</td>
            <td>nva@gmail.com</td>
            <td>
              <button className="offline">Ngừng hoạt động</button>
            </td>
            <td className="tools">
              <button className="block">Chặn</button>
              <button className="edit">Sửa</button>
              <button className="delete">Xóa</button>
            </td>
          </tr> */}
        </tbody>
      </table>
    </>
  );
}
