import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const EmployeeDataList = () => {
  const submittedData = useSelector((state) => state.employee.submittedData);
  const Loading = useSelector((state) => state.employee.loading);


if(Loading){
    return <h1>Loading.....</h1>
}


  if (!submittedData || submittedData.length === 0) {
    return <p className=" flex  gap-5 text-gray-500">No employee data available.
    <Link to="/employee-form" className="underline text-blue-500 text-bold">Apply</Link>
    </p>;
  }
 

  return (
    <div className="max-w-6xl mx-auto mt-6 overflow-x-auto">
   <div className="flex justify-between">
   <h2 className="text-xl font-bold mb-4">Employee List</h2>
      <Link to="/employee-form" className="underline text-blue-500 text-bold">Apply</Link>

   </div>
      <table className="w-full border-collapse border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">Full Name</th>
            <th className="border border-gray-300 px-4 py-2">Email</th>
            <th className="border border-gray-300 px-4 py-2">Contact</th>
            <th className="border border-gray-300 px-4 py-2">Skills</th>
            <th className="border border-gray-300 px-4 py-2">Education</th>
          </tr>
        </thead>
        <tbody>
          {submittedData.map((employee, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
              <td className="border border-gray-300 px-4 py-2">
                {employee.first} {employee.last}
              </td>
              <td className="border border-gray-300 px-4 py-2">{employee.email}</td>
              <td className="border border-gray-300 px-4 py-2">{employee.contact}</td>
              <td className="border border-gray-300 px-4 py-2">
                {employee.skills ? employee.skills.join(", ") : "N/A"}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {employee.education && employee.education.length > 0 ? (
                  <ul className="list-disc pl-4">
                    {employee.education.map((edu, eduIndex) => (
                      <li key={eduIndex}>
                        <strong>{edu.degree}</strong> ({edu.startDate} - {edu.endDate}) - {edu.percentage}%
                      </li>
                    ))}
                  </ul>
                ) : (
                  "N/A"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeDataList;
