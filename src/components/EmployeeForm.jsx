import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { IoMdCloseCircle } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import {submitEmployeeToFirebase } from "./redux/employeeSlice";

const EmployeeForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const loading = useSelector((state) => state.employee.loading); 
  const submittedData = useSelector((state) => state.employee.submittedData); 
  console.log(submittedData)



  const dispatch = useDispatch()
  const [skills, setSkills] = useState([]);

  const [education, setEducation] = useState([]);

  const addSkill = () => setSkills([...skills, ""]);
  const removeSkill = (index) => setSkills(skills.filter((_, i) => i !== index));

  const addEducation = () => setEducation([...education, { degree: "", startDate: "", endDate: "", percentage: "" }]);

  const removeEducation = (index) => setEducation(education.filter((_, i) => i !== index));




  const onSubmit = (data) => {
    data.skills = skills;
    data.education = education;
    dispatch(submitEmployeeToFirebase(data)); 
  };

 
  return (
    <div className="max-w-full p-6 border border-black bg-white justify-center items-center flex flex-col shadow-md rounded-lg">
      <h2 className="text-xl text-blue-500 font-bold mb-4 ">Employee Registration</h2>
      <form onSubmit={handleSubmit(onSubmit)} className=" border-black p-4 shadow-2xl rounded-xl">
        
        <label className="block font-semibold ">First Name</label>
        <input
          type="text"
          {...register("first")}
          placeholder="First name"
          className="w-full p-2 border rounded mb-2"
        />

        <label className="block font-semibold">Last Name</label>
        <input
          type="text"
          {...register("last")}
          placeholder="Last name"
          className="w-full p-2 border rounded mb-2"
        />

        <label className="block font-semibold">Email</label>
        <input
          type="email"
          {...register("email")}
          placeholder="Email"
          className="w-full p-2 border rounded mb-2"
        />
        <p className="text-red-500">{errors.email?.message}</p>

        <label className="block font-semibold">Contact Number</label>
        <input
          type="text"
          {...register("contact")}
          placeholder="Contact"
          className="w-full p-2 border rounded mb-2"
        />

        <button type="button" onClick={addSkill} className="text-red-500 px-3 py-1 rounded mb-4">
          + Add More Skills
        </button>

 
        <label className="block font-semibold">Skills</label>

        {skills.map((skill, index) => (

          <div key={index} className="flex items-center gap-2 mb-2">
            <input
              type="text"
              value={skill}
              onChange={(e) => {
                const updatedSkills = [...skills];
                updatedSkills[index] = e.target.value;
                setSkills(updatedSkills);
              }}
              placeholder="Enter skill"
              className="w-full p-2 border rounded"
            />

            {skills.length > 1 && (
              <button type="button" onClick={() => removeSkill(index)}>
                <IoMdCloseCircle className="text-red-500" />
              </button>
            )}
          </div>
        ))}
      
        <button type="button" onClick={addEducation} className="text-red-500 px-4 py-2 rounded mb-4">
          + Add Education
        </button>

        <label className="block font-semibold">Education</label>
        {education.map((edu, index) => (
          <div key={index} className="border p-4 mb-2 rounded">
            <label className="block font-semibold">Degree</label>
            <input
              type="text"
              value={edu.degree}
              onChange={(e) => {
                const updatedEducation = [...education];
                updatedEducation[index].degree = e.target.value;
                setEducation(updatedEducation);
              }}
              placeholder="Highest Education"
              className="w-full p-2 border rounded mb-2"
            />
            <label className="block font-semibold">Start Date</label>
            <input
              type="date"
              value={edu.startDate}
              onChange={(e) => {
                const updatedEducation = [...education];
                updatedEducation[index].startDate = e.target.value;
                setEducation(updatedEducation);
              }}
              className="w-full p-2 border rounded mb-2"
            />

            <label className="block font-semibold">End Date</label>
            <input
              type="date"
              value={edu.endDate}
              onChange={(e) => {
                const updatedEducation = [...education];
                updatedEducation[index].endDate = e.target.value;
                setEducation(updatedEducation);
              }}
              className="w-full p-2 border rounded mb-2"
            />
            <label className="block font-semibold">Percentage</label>
            <input
              type="number"
              value={edu.percentage}
              onChange={(e) => {
                const updatedEducation = [...education];
                updatedEducation[index].percentage = e.target.value;
                setEducation(updatedEducation);
              }}
              placeholder="Percentage"
              className="w-full p-2 border rounded"
            />

            {education.length > 1 && (
              <button type="button" onClick={() => removeEducation(index)} className="mt-2">
                <IoMdCloseCircle className="text-red-500" />
              </button>
            )}
          </div>
        ))}
  
        <button type="submit" className="text-green-500 border border-black px-4 py-2 rounded w-full mt-4">
          {loading ? "submiting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default EmployeeForm;
