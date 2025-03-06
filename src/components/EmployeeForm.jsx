import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { IoMdCloseCircle } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { submitEmployeeToFirebase } from "./redux/employeeSlice";
import { Link, useNavigate } from "react-router-dom";

const EmployeeForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.employee.loading);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      skills: [""],
      education: [],
    },
  });

  const { fields: skills, append: addSkill, remove: removeSkill } = useFieldArray({
    control,
    name: "skills",
  });

  const { fields: education, append: addEducation, remove: removeEducation } = useFieldArray({
    control,
    name: "education",
  });

  const onSubmit = (data) => {
    dispatch(submitEmployeeToFirebase(data));
    if (!loading) {
      navigate("/");
    }
  };

  return (
    <div className="max-w-full p-6 bg-white flex flex-col justify-center items-center shadow-md rounded-lg">
     <div className="flex  gap-5">
     <h2 className="text-xl text-blue-500 font-bold mb-4">Employee Registration</h2>
     <Link to="/" className="underline  text-bold">Check employee data list </Link>
     </div>

      <form onSubmit={handleSubmit(onSubmit)} className="w-[400px] p-4 shadow-2xl rounded-xl">

        <label className="block font-semibold">First Name</label>
        <input
          type="text"
          placeholder="First Name"
          {...register("first", { required: "First name is required" })}
          className={`w-full p-2 outline-none border rounded mb-2 `}
        />
        <p className="text-red-500">{errors.first?.message}</p>


        <label className="block font-semibold">Last Name</label>
        <input type="text"
          placeholder="Last Name"
          {...register("last", { required: "Last name is required" })}
          className={`w-full p-2 outline-none border rounded mb-2 `}
        />
        <p className="text-red-500">{errors.last?.message}</p>

        <label className="block font-semibold">Email</label>
        <input
          type="email"
          placeholder="Email"
          {...register("email", {
            required: "Email is required",

            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: "Enter a valid email address"
            }
          })}
          className={`w-full p-2 outline-none border rounded mb-2`}
        />
        <p className="text-red-500">{errors.email?.message}</p>

        <label className="block font-semibold">Contact</label>
        <input
          type="text"
          placeholder="Contact"

          {...register("contact", {
            required: "Contact is required",
            pattern: { value: /^[0-9]+$/, message: "Only numbers are allowed" }
          })}
          className={`w-full p-2 outline-none border rounded mb-2`}
        />
        <p className="text-red-500">{errors.contact?.message}</p>


        {/* skills flieds here  */}


        <label className="block font-semibold">Skills</label>
        {skills.map((skill, index) => (

          <>
            <div key={skill.id} className="flex items-center gap-2 mb-2">
              <input {...register(`skills.${index}`, { required: "skill is required" })}
                className={`w-full p-2 outline-none border rounded mb-2`}
                placeholder="Enter skill" />

              {skills.length > 1 && (
                <button type="button" onClick={() => removeSkill(index)}>
                  <IoMdCloseCircle className="text-red-500" />
                </button>
              )}
            </div>
            <p className="text-red-500">{errors.skills?.[index]?.message}</p>

          </>
        ))}
        <button type="button" onClick={() => addSkill("")}
          className="text-blue-500 px-3 py-1 rounded mb-4">
          + Add More Skills
        </button>



        {/* education fields  here */}


        <label className="block font-semibold">Education</label>
        {education.map((edu, index) => (
          <div key={edu.id} className="border p-4 mb-2 rounded">
            <label>Degree</label>
            <input placeholder="degree" {...register(`education.${index}.degree`, { required: "Degree is required" })}

              className="w-full p-2 border rounded mb-2" />
            <p className="text-red-500">{errors.education?.[index]?.degree?.message}</p>

            <label>Start Date</label>
            <input type="date" {...register(`education.${index}.startDate`, { required: "Start date is required" })}

              className="w-full p-2 border rounded mb-2" />
            <p className="text-red-500">{errors.education?.[index]?.startDate?.message}</p>

            <label>End Date</label>
            <input type="date" {...register(`education.${index}.endDate`, { required: "End date is required" })}
              className="w-full p-2 border rounded mb-2" />
            <p className="text-red-500">{errors.education?.[index]?.endDate?.message}</p>

            <label>Percentage</label>
            <input placeholder="percentage" type="number"
              {...register(`education.${index}.percentage`,
                {
                  required: "Percentage is required",
                  min: { value: 0, message: "Percentage cannot be negative" },
                  max: { value: 100, message: "Percentage cannot exceed 100" }
                })}
              className="w-full p-2 border rounded" />
            <p className="text-red-500">{errors.education?.[index]?.percentage?.message}</p>

            {education.length > 1 && (
              <button type="button" onClick={() => removeEducation(index)}>
                <IoMdCloseCircle className="text-red-500" />
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={() => addEducation({ degree: "", startDate: "", endDate: "", percentage: "" })}
          className="text-blue-500 px-3 py-1 rounded mb-4">
          + Add Education
        </button>

        <button type="submit" className="text-green-500 border border-black px-4 py-2 rounded w-full mt-4">
          {loading ? "Submitting..." : "Submit"}
        </button>

      </form>
    </div>
  );
};

export default EmployeeForm;