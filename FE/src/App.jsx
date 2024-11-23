import React, { useState, useEffect } from 'react';
import { loginUser, getTeacherPositions } from '../api.config';
import TeachersList from './Compoment/teacherList';
import TeacherForm from './Compoment/addteacher';
import TeacherPositions from './Compoment/teacherPosition';


function App() {
  return (
    <div className="App">
      <h1>Welcome to Teacher Dashboard</h1>
      <TeachersList />
   
     
    </div>
  );
}

export default App
