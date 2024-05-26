import { useState } from "react";

// localStorage.setItem('students', JSON.stringify([{id: 'SV001',name: 'Sơn', birthDate: '05/06/2005', email: 's@gmail.com', status: true, isBlock: false},{id: 'SV002', name: 'Ao', birthDate: '06/04/2004', email: 'a@gmail.com', status: false, isBlock: false}]))
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
}
export default function List(props: Props) {
  const [count, setCount] = useState<number>(0);
  const { students } = props;
  const handleBlock = (id: string) => {
    const updatedStudents = students.map((student) => {
      if (student.id === id) {
        return { ...student, isBlock: !student.isBlock };
      }
      return student;
    });
    localStorage.setItem("students", JSON.stringify(updatedStudents));
  };

  const handleEdit = (id: string) => {
    const updatedStudents = students.map((student) => {
      if (student.id === id) {
      }
    });
  };
  const handleDelete = (id: string) => {
    // console.log("h");
    
    const foundIndex = students.findIndex((student) => {
      if (student.id === id) {
        return student;
      }
    });
    // console.log(foundIndex);
    if (foundIndex === -1) {
      return alert("Không có dữ liệu");
    }
    if (students.length === 1) {
      localStorage.setItem("students", JSON.stringify([]));
      window.location.reload();
      return;
    }
    const updateStudents = students.splice(foundIndex, 1);
    localStorage.setItem("students", JSON.stringify(updateStudents));
    window.location.reload();
    return;
  };
  return (
    <>
      {students.length > 0
        ? students.map((e, i) => {
            return (
              <tr key={e.id}>
                <td>{i + 1}</td>
                <td>{e.id}</td>
                <td>{e.name}</td>
                <td>{e.birthDate}</td>
                <td>{e.email}</td>
                <td>
                  {e.isBlock ? (
                    <button className="blocked">Bị chặn</button>
                  ) : e.status ? (
                    <button className="online">Đang hoạt động</button>
                  ) : (
                    <button className="offline">Ngừng hoạt động</button>
                  )}
                </td>
                <td className="tools">
                  {e.isBlock ? (
                    <button onClick={() => handleBlock(e.id)} className="block">
                      Bỏ Chặn
                    </button>
                  ) : (
                    <button onClick={() => handleBlock(e.id)} className="block">
                      Chặn
                    </button>
                  )}
                  <button onClick={() => handleEdit(e.id)} className="edit">
                    Sửa
                  </button>
                  <button onClick={() => handleDelete(e.id)} className="delete">
                    Xóa
                  </button>
                </td>
              </tr>
            );
          })
        : ""}
    </>
  );
}
