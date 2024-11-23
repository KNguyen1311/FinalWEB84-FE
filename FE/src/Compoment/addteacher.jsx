import React, { useState } from "react";

const TeacherForm = ({ onBack, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    phone: "",
    email: "",
    address: "",
    position: "",
    degree: "",
    major: "",
    status: false,
    graduationYear: "",
    image: null,
  });



  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting form with data:", formData); 
    if (onSubmit) {
      onSubmit(formData); 
    } else {
      console.error("onSubmit is not defined");
    }
  };
  

  return (
    <div className="teacher-form-container">
      <div className="teacher-form1">
        <h2>Tạo mới thông tin Giáo viên</h2>
        <form onSubmit={handleSubmit}>
    
          <div className="form-group image-upload">
            <label htmlFor="image">Chọn ảnh</label>
            <input type="file" id="image" onChange={handleImageChange} />
          </div>

        
          <div className="form-group grid-layout">
            <div>
              <label>Họ và tên</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Nhập họ và tên"
                required
              />
            </div>
            <div>
              <label>Ngày sinh</label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Số điện thoại</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Nhập số điện thoại"
                required
              />
            </div>
            <div>
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="example@school.edu.vn"
                required
              />
            </div>
            <div>
              <label>Địa chỉ</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Nhập địa chỉ"
              />
            </div>
          </div>

          {/* Vị trí công tác */}
          <div className="form-group">
            <label>Vị trí công tác</label>
            <select
              name="position"
              value={formData.position}
              onChange={handleInputChange}
            >
              <option value="">Chọn vị trí công tác</option>
              <option value="Giảng viên">Giảng viên</option>
              <option value="Trợ giảng">Trợ giảng</option>
              <option value="Cán bộ hành chính">Cán bộ hành chính</option>
            </select>
          </div>

    
          <div className="form-group grid-layout">
            <div>
              <label>Trạng thái</label>
              <input
                type="checkbox"
                name="status"
                checked={formData.status}
                onChange={handleInputChange}
              />
              Hoàn thành
            </div>
            <div>
              <label>Năm tốt nghiệp</label>
              <input
                type="number"
                name="graduationYear"
                value={formData.graduationYear}
                onChange={handleInputChange}
                placeholder="Nhập năm tốt nghiệp"
              />
            </div>
          </div>

    
          <div className="form-buttons">
            <button type="button" onClick={onBack}>
              Quay lại
            </button>
            <button type="submit">Lưu</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TeacherForm;
