import React, { useState, useEffect } from "react";
import axios from "axios";

const TeacherList = () => {
    const [teachers, setTeachers] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
  
    const fetchTeachers = async (page = 1) => {
      try {
        setLoading(true); 
        const response = await axios.get(`http://localhost:3000/api/teachers/list`, {
            method:"GET",
        //   params: {
        //     page: page,
        //     limit: 10,
        //   }
        });
        
        setTeachers(response.data.teachers); 
        setTotalPages(response.data.totalPages); 
        setCurrentPage(response.data.page); 
      } catch (error) {
        console.error('Error fetching teachers:', error);
      } finally {
        setLoading(false); 
      }
    };
  
    
    useEffect(() => {
      fetchTeachers(currentPage);
    }, [currentPage]);
  
    return (
      <div>
        <h2>Danh sách Giáo viên</h2>
        
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul>
            {teachers.map((teacher) => (
              <li key={teacher._id}>
                {teacher.name} - {teacher.position} - {teacher.education}
              </li>
            ))}
          </ul>
        )}
  
        <div>
          <button 
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          <span>{currentPage} / {totalPages}</span>
          <button 
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    );
  };
  
  export default TeacherList;