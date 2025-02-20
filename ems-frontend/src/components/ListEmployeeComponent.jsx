import React, {useEffect, useState} from 'react'
import { deleteEmployee, listEmployees } from '../services/EmployeeService';
import { useNavigate } from 'react-router-dom';

const ListEmployeeComponent = () => {

    const [employees,setEmployees] = useState([]);// store a list of employee data 
                                                  //and update the list dynamically

    const navigator = useNavigate();

    useEffect(() => {   //logic to get response from rest api and store data in 'employees' variable
        getAllEmployees();
    },[])

    function getAllEmployees(){
        listEmployees().then ((response) => {
            setEmployees(response.data);
        }) .catch(error => {
            console.error(error);
        })
    }

    function addNewEmployee(){
        navigator('/add-employee');
    }

    function updateEmployee(id){
        navigator(`/edit-employee/${id}`);
    }

    function removeEmployee(id){
        console.log(id);
        deleteEmployee(id).then((response) => {
            getAllEmployees();
        }) .catch (error => {
            console.error(error);
        })
    }

  return (
    <div className='container'>
        <h2 className='text-center'> List of employees</h2>
        <button className='btn btn-primary mb-2' onClick={addNewEmployee}>Add Employee</button>
        <table className='table table-striped table-bordered'>
            <thead>
                <tr>
                    <th>Employee ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>E-mail ID</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
               {
                employees.map(employee => 
                    <tr key={employee.id}>
                        <td>{employee.id}</td>
                        <td>{employee.firstName}</td>
                        <td>{employee.lastName}</td>
                        <td>{employee.email}</td>
                        <td>
                            <button className='btn btn-info' onClick={ () => updateEmployee(employee.id) }> UPDATE </button>
                            <button className='btn btn-danger' onClick={ () => removeEmployee (employee.id) }
                                style={{marginLeft:'10px'}}
                                > DELETE </button>
                        </td>
                    </tr>
                )
               }
            </tbody>
        </table>
    </div>
  )
}

export default ListEmployeeComponent