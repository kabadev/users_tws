import { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { VscTriangleRight, VscTriangleDown } from "react-icons/vsc";
import { AppContext } from "../App";
import { useContext } from "react";

const Form = () => {
  const { data, setData, formType, toupdateData } = useContext(AppContext);
  const [firstName, setFirstName] = useState(
    formType === "Update" ? toupdateData.firstName : ""
  );
  const [lastName, setLastName] = useState(
    formType ? toupdateData.lastName : ""
  );
  const [userName, setUserName] = useState(
    formType ? toupdateData.userName : ""
  );
  const [phoneNumber, setPhoneNumber] = useState(
    formType ? toupdateData.phoneNumber : ""
  );
  const [email, setEmail] = useState(formType ? toupdateData.email : "");
  const [skills, setSkills] = useState(formType ? toupdateData.skills : []);
  const [fromDate, setFromDate] = useState(
    formType ? toupdateData.fromDate : ""
  );
  const [toDate, setToDate] = useState(formType ? toupdateData.toDate : "");
  const [description, setDescription] = useState(
    formType ? toupdateData.description : ""
  );
  const [showOpts, setShowOpts] = useState(false);

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    phoneNumber: "",
    email: "",
    skills: "",
    fromDate: "",
    toDate: "",
    description: "",
  });
  console.log(toupdateData.firstName);
  const skillsData = [
    "HTML",
    "CSS",
    "React",
    "TypeScript",
    "CSS3",
    "Javascript",
    "JQuery",
  ];

  const handleSelectChange = (skill) => {
    if (!skills.includes(skill)) {
      setSkills([...skills, skill]);
      skills.skill = true;
    } else {
      setSkills(skills.filter((s) => s !== skill));
      skills.skill = true;
    }
  };

  const handleDescriptionChange = (content, editor) => {
    setDescription(content);
  };
  const resetErrors = () => {
    setErrors({
      firstName: "",
      lastName: "",
      userName: "",
      phoneNumber: "",
      email: "",
      skills: "",
      fromDate: "",
      toDate: "",
      description: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errorsCopy = { ...errors };
    let hasErrors = false;

    // // validate user name
    if (!userName) {
      errorsCopy.userName = "User name is required.";
      hasErrors = true;
    } else if (!/^[a-z]+$/i.test(userName)) {
      errorsCopy.userName = "User name should only contain alphabets.";
      hasErrors = true;
    } else if (/\s/g.test(userName)) {
      errorsCopy.userName = "User name should not contain spaces.";
      hasErrors = true;
    }

    // validate phone number
    if (!phoneNumber) {
      errorsCopy.phoneNumber = "Phone number is required.";
      hasErrors = true;
    } else if (!/^\d{10}$/.test(phoneNumber)) {
      errorsCopy.phoneNumber = "Phone number should have 10 digits.";
      hasErrors = true;
    } else if (skills.some((d) => d.phoneNumber === phoneNumber)) {
      errorsCopy.phoneNumber = "Phone number already exists.";
      hasErrors = true;
    }

    // validate email
    if (!email) {
      errorsCopy.email = "Email is required.";
      hasErrors = true;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errorsCopy.email = "Invalid email format.";
      hasErrors = true;
    }

    // validate skills
    if (skills.length < 2) {
      errorsCopy.skills = "Please select at least 2 skills.";
      hasErrors = true;
    }

    // validate from date
    if (!fromDate) {
      errorsCopy.fromDate = "From date is required.";
      hasErrors = true;
    }

    // validate to date
    if (!toDate) {
      errorsCopy.toDate = "To date is required.";
      hasErrors = true;
    }
    // validate to date
    if (!description || description.trim().length < 10) {
      errorsCopy.description = "description is required.";
      hasErrors = true;
    }

    setErrors(errorsCopy);

    // submit form if there are no errors
    if (!hasErrors) {
      // add record to data table
      const newRecord = {
        id: Math.floor(Math.random() * 1000 + 1),
        firstName,
        lastName,
        userName,
        phoneNumber,
        email,
        skills,
        fromDate,
        toDate,
        description,
      };
      console.log(newRecord);
      setData([...data, newRecord]);
      resetErrors();
      // reset form
      setFirstName("");
      setLastName("");
      setUserName("");
      setPhoneNumber("");
      setEmail("");
      setSkills([]);
      setFromDate("");
      setToDate("");
      setDescription("");
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <p></p>
      <div className="form-control">
        <label htmlFor="">First Name</label>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div className="form-control">
        <label htmlFor="">Last Name</label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <div className="form-control">
        <label htmlFor="">Username</label>
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        {errors.userName && (
          <span style={{ color: "red" }}>{errors.userName}</span>
        )}
      </div>
      <div className="form-control">
        <label htmlFor="">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <span style={{ color: "red" }}>{errors.email}</span>}
      </div>
      <div className="form-control">
        <label htmlFor="">Phone Number</label>
        <input
          type="number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        {errors.phoneNumber && (
          <span style={{ color: "red" }}>{errors.phoneNumber}</span>
        )}
      </div>
      <div className="skills__section">
        <div className="skills__header" onClick={() => setShowOpts(!showOpts)}>
          {skills.length !== 0 ? (
            <div className="selected__skills">
              {skills.map((sk) => (
                <div className="skill" key={sk}>
                  {sk}
                </div>
              ))}
            </div>
          ) : (
            "Select Skills"
          )}

          <div className="angle__btn">
            {showOpts ? <VscTriangleDown /> : <VscTriangleRight />}
          </div>
        </div>
        <div className={`options__box ${showOpts ? "active" : ""}`}>
          {skillsData.map((sk) => (
            <div
              className="option"
              key={sk}
              onClick={() => handleSelectChange(sk)}
            >
              {sk}
            </div>
          ))}
        </div>
        {errors.skills && <span style={{ color: "red" }}>{errors.skills}</span>}
      </div>

      <div className="range__date">
        <div className="form-control">
          <label htmlFor="">From</label>
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
          {errors.fromDate && (
            <span style={{ color: "red" }}>{errors.fromDate}</span>
          )}
        </div>
        <div className="form-control">
          <label htmlFor="">TO</label>
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
          {errors.toDate && (
            <span style={{ color: "red" }}>{errors.toDate}</span>
          )}
        </div>
      </div>

      <div className="form-control">
        <label htmlFor="">Description</label>
        {errors.description && (
          <span style={{ color: "red" }}>{errors.description}</span>
        )}
        <Editor
          apiKey="cfrpx6yhwml5l6ay3t6lbwgkqo8cjzhj9ie0kkipkugqnixs"
          initialValue=""
          value={description}
          init={{
            height: 300,
            menubar: true,
            plugins: [
              "advlist autolink lists link image charmap print preview anchor",
              "searchreplace visualblocks code fullscreen",
              "insertdatetime media table paste code help wordcount",
            ],
            toolbar:
              "undo redo | formatselect | bold italic backcolor | \
          alignleft aligncenter alignright alignjustify | \
          bullist numlist outdent indent | removeformat | help",
          }}
          onEditorChange={handleDescriptionChange}
        />
      </div>

      <input type="submit" className="btn btn-block" />
    </form>
  );
};

export default Form;
