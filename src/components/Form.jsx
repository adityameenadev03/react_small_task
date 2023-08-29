import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Form = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [editing, setEditing] = useState(false);
  const [editingId, setEditingId] = useState(false);

  const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  const [error, setError] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    gender: null,
    personId: null,
  });

  useEffect(() => {
    if (location.state != null) {
      let currentArray = location.state;
      setEditing(true);
      setEditingId(currentArray.personId);
      setFormData({ ...currentArray });
    }
  }, []);

  const updateInfo = (id) => {
    let formsArray = JSON.parse(localStorage.getItem("formsArray"));
    let index = formsArray.findIndex((item, i) => item.personId == id);
    formsArray.splice(index, 1, { ...formData });
    localStorage.setItem("formsArray", JSON.stringify([...formsArray]));

    setFormData({
      name: "",
      email: "",
      phone: "",
      personId: null,
      gender: null,
    });
    navigate("/");
  };

  const SubmitForm = (id) => {
    const result = validateForm();

    if (result) {
      let dataArray = JSON.parse(localStorage.getItem("formsArray"));
      dataArray.push({ ...formData, personId: dataArray.length + 1 });
      localStorage.setItem("formsArray", JSON.stringify(dataArray));
      setFormData({
        name: "",
        email: "",
        phone: "",
        gender: null,
        personId: null,
      });
      navigate("/");
    }
  };

  const handleChange = (e) => {
    setError(false)
    
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    console.log(formData);
  };

  const validateEmail = () => {
    console.log("hello");
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address");
      return false;
    } else {
      setError(false);
      return true;
    }
  };

  const validatePhone = () => {
    const phoneRegex = /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/i;

    if (!phoneRegex.test(formData.phone)) {
      setError("Please enter a valid Phone Number");
      console.log("error");
      return false;
    } else {
      setError(false);
      return true;
    }
  };

  const validateForm = () => {
    if (formData.name.length < 1) {
       setError("Name can not be empty");
       return false
    } else if (validateEmail() == false) {
      return false;
    }
    // validatePhone()
    else if (validatePhone() == false) {
      return false;
    }
    else if (formData.gender == null) {
      setError("Selecting Gender is Must");
      return false;
    }
    else{
      return true
    }
  };



  return (
    <div>
      <>
        <div className="input mb-5">
          <h2>Enter Your details</h2>
          <div className="mb-3">
            <label htmlFor="formGroupExampleInput" className="form-label">
              Name
            </label>
            <input
              type="text"
              required
              value={formData.name}
              className="form-control"
              onChange={(e) => handleChange(e)}
              id="name"
              placeholder="Enter Your Name"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="formGroupExampleInput2" className="form-label">
              Email
            </label>
            <input
              type="text"
              value={formData.email}
              onFocus={() => setError(false)}
              onChange={(e) => handleChange(e)}
              className="form-control"
              id="email"
              placeholder="Enter Your Email"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="formGroupExampleInput" className="form-label">
              Phone Number
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleChange(e)}
              className="form-control"
              id="phone"
              maxlength={10}
              placeholder="Enter Your Phone"
            />
          </div>
          <div className="mb-3">
            <h6 className="mb-3">Gender</h6>
            <label htmlFor="gender" className="form-label me-3">
              Male
            </label>
            <input
              type="radio"
              required
              className=" me-3"
              checked={formData.gender === "male"}
              onChange={(e) => handleChange(e)}
              id="gender"
              value="male"
            ></input>
            <label htmlFor="gender" className="form-label me-3">
              Female
            </label>
            <input
              type="radio"
              checked={formData.gender === "female"}
              onChange={(e) => handleChange(e)}
              id="gender"
              value="female"
              className=" me-3"
            ></input>
          </div>

          <p type="button">
            {editing ? (
              <button
                type="submit"
                className="button btn bg-success text-white pb-1 pt-1"
                onClick={() => updateInfo(editingId)}
              >
                Save
              </button>
            ) : (
              <button
                type="submit"
                className="button btn bg-success text-white pb-1 pt-1"
                onClick={() => SubmitForm()}
              >
                Submit
              </button>
            )}
          </p>

          {error && <p className="m-0 text-danger">{error}</p>}
        </div>
       
      </>
    </div>
  );
};

export default Form;
