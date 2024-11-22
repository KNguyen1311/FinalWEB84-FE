import React, { useState } from "react";

const TeacherForm = () => {
  const [showForm, setShowForm] = useState(false);  // State điều khiển việc hiển thị form
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [education, setEducation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !position || !education || !startDate || !email) {
      setMessage("All fields are required!");
      return;
    }

    const teacherData = { name, position, education, startDate, email };
    try {
      const response = await fetch("http://localhost:3000/api/teachers/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(teacherData),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("Teacher created successfully!");
      } else {
        setMessage(data.error || "An error occurred while creating the teacher");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Error connecting to the server");
    }
  };

  return (
    <div className="form-container">
      {!showForm && (
        <button className="create-btn" onClick={() => setShowForm(true)}>
          Create Teacher
        </button>
      )}

      {showForm && (
        <>
          <h2>Create New Teacher</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Position</label>
              <input
                type="text"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Education</label>
              <input
                type="text"
                value={education}
                onChange={(e) => setEducation(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="submit-btn">Create Teacher</button>
          </form>
        </>
      )}

      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default TeacherForm;
