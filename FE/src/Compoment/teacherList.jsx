import React, { useState, useEffect } from "react";
import axios from "axios";
import TeacherForm from "./addteacher";


const TeacherList = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showForm, setShowForm] = useState(false); 
  const [selectedTeacher, setSelectedTeacher] = useState(null);



  
  const loginUser = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/login", { username, password });
      const tokenFromServer = response.data.token; 
      localStorage.setItem("jwt", tokenFromServer); 
      console.log("Token saved:", tokenFromServer);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };
  
  const fetchTeachers = async (currentPage) =>{ 
    setLoading(true);
    try {
      // const token = localStorage.getItem("jwt"); 
      // if (!token) {
      //   throw new Error("Token not found. Please login again."); 
      // }
  
      const response = await axios.get(
        `http://localhost:3000/api/teachers/list?page=${currentPage}&limit=10`,
      );
  
      const { data, total, limit } = response.data; 
      setTeachers(response.data);
      setTotalPages(Math.ceil(total / limit));
      console.log(response)
      // setTotalPages(Math.ceil(total / limit)); 
    } catch (error) {
    
      if (error.response) {
        console.error("Server responded with an error:", error.response.data);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error occurred during setup:", error.message);
      }
    } finally {
      setLoading(false);
    }
  };
  
  
  useEffect(() => {
    fetchTeachers(page);
  }, [page]);

  const handleAddTeacher = (newTeacher) => {
    console.log("Adding new teacher:", newTeacher); // In ra log
    setTeachers((prevTeachers) => [...prevTeachers, newTeacher]); // Cập nhật danh sách
    setShowForm(false); // Ẩn form sau khi lưu
  };

  if (showForm) {
    return <TeacherForm onSubmit={handleAddTeacher} onBack={() => setShowForm(false)} />;
  }
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };
  

  if (showForm) {
    return <TeacherForm onBack={() => setShowForm(false)} />;
  }

  if (loading) return <p>Loading...</p>;
  if (selectedTeacher) {
    return (
      <div className="teacher-detail">
        <h2>Thông tin chi tiết giáo viên</h2>
        <div className="teacher-detail-card">
          <p><strong>Mã:</strong> {selectedTeacher.code}</p>
          <p><strong>Họ và Tên:</strong> {selectedTeacher.userId.name}</p>
          <p><strong>Trình độ cao nhất:</strong> {selectedTeacher.degrees.map(degree => degree.type).join(", ")}</p>
          <p><strong>Bộ môn:</strong> N/A</p>
          <p><strong>Vị trí công tác:</strong> {selectedTeacher.teacherPositionsId ? selectedTeacher.teacherPositionsId.des : "loading"}</p>
          <p><strong>Địa chỉ:</strong> {selectedTeacher.userId.address}</p>
          <p><strong>Trạng thái:</strong> {selectedTeacher.status ? "Active" : "Inactive"}</p>
          <button className="back-button" onClick={() => setSelectedTeacher(null)}>Quay lại danh sách</button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="header">
        <h1>Danh sách giáo viên</h1>
           <button onClick={() => setShowForm(true)}>Tạo mới</button>
      </div>
      <table className="teacher-table">
        <thead>
          <tr>
            <th>Mã</th>
            <th>Giáo viên</th>
            <th>Trình độ (cao nhất)</th>
            <th>Bộ môn</th>
            <th>Vị trí công tác</th>
            <th>Địa chỉ</th>
            <th>Trạng thái</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {teachers? teachers.map((teacher) => (
            <tr key={teacher.id}>
              <td>{teacher.code}</td>
              <td>{teacher.userId.name}</td>
              {teacher.degrees.map(item => <td>{item.type}</td>)}
              <td>N/A</td>
             <td>{teacher.teacherPositionsId ? teacher.teacherPositionsId.des: `loading`}</td> 

              <td>{teacher.userId.address}</td> 
              <td>{teacher.status ? "Active" : "Inactive"}</td>


    
              <td>
              <button onClick={() => setSelectedTeacher(teacher)}>Xem chi tiết</button>              </td>
            </tr>
          )):<p>loading</p>}
        </tbody>
      </table>

      <div className="pagination">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
        >
          &laquo; Prev
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
        >
          Next &raquo;
        </button>
      </div>
    </div>
  );
};
  export default TeacherList;