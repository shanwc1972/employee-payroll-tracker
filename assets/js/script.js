// Get a reference to the #add-employees-btn element
const addEmployeesBtn = document.querySelector('#add-employees-btn');

// Collect employee data
const collectEmployees = function () {
  // Get user input to create and return an array of employee objects
  //Define are variables
  const arrEmployees = [];
  let objEmployee = {};
  let strFirstname = '';
  let strSurname = '';
  let strSalary = '';
  let nSalary = 0;
  let bFinished = false;
  
  do {
    //Prompt for first name
    strFirstname = prompt('Enter a first name:');
    objEmployee.firstName = strFirstname;
    //Prompt for last name
    strSurname = prompt('Enter a surname:');
    objEmployee.lastName = strSurname;
    //prompt for salary
    strSalary = prompt('Enter a salary:');
    //convert salary to a number. If salary entered is not a number, then set the salry to zero
    nSalary = Number(strSalary);
    if(isNaN(nSalary)) {
      nSalary = 0;
    };
    objEmployee.salary = nSalary;
    //add the new object to our array
    arrEmployees.push(objEmployee);
    //reset our temporary employee element for the next loop
    objEmployee = {};
    //prompt if another employee needs to be added
    bFinished = confirm('Do you want to enter another employee?');
  }
  while (bFinished);
  return arrEmployees;
};

// Display the average salary
const displayAverageSalary = function (employeesArray) {
  let nNumEmployees = employeesArray.length;
  let flTotalSalary = 0;
  //Add up the total salary by looping through the array 
  for(i=0; i<nNumEmployees; i++){
    flTotalSalary = flTotalSalary + employeesArray[i].salary; 
  };
  //Derive the average salary
  let flAverageSalary = flTotalSalary / nNumEmployees; 
  //Use the toFIxed method to limit to two decimal places
  console.log(`The average employee salary between the ${nNumEmployees} employess is: $${flAverageSalary.toFixed(2)}`);
};

// Select a random employee
const getRandomEmployee = function (employeesArray) {
  //Randomly generate a number between zero and the length of the employeesArray
  const nRandomIndex = Math.floor(Math.random() * employeesArray.length);
  //Use the randomly generated index to select the fir and last anme ofthe employee
  const strRandomFirstname = employeesArray[nRandomIndex].firstName;
  const strRandomLastname = employeesArray[nRandomIndex].lastName;
  console.log(`Congratulations to ${strRandomFirstname} ${strRandomLastname}, our random drawing winner!`)
};

/*
  ====================
  STARTER CODE
  Do not modify any of the code below this line:
*/

// Display employee data in an HTML table
const displayEmployees = function (employeesArray) {
  // Get the employee table
  const employeeTable = document.querySelector('#employee-table');

  // Clear the employee table
  employeeTable.innerHTML = '';

  // Loop through the employee data and create a row for each employee
  for (let i = 0; i < employeesArray.length; i++) {
    const currentEmployee = employeesArray[i];

    const newTableRow = document.createElement('tr');

    const firstNameCell = document.createElement('td');
    firstNameCell.textContent = currentEmployee.firstName;
    newTableRow.append(firstNameCell);

    const lastNameCell = document.createElement('td');
    lastNameCell.textContent = currentEmployee.lastName;
    newTableRow.append(lastNameCell);

    const salaryCell = document.createElement('td');
    // Format the salary as currency
    salaryCell.textContent = currentEmployee.salary.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });

    newTableRow.append(salaryCell);

    employeeTable.append(newTableRow);
  }
};

const trackEmployeeData = function () {
  const employees = collectEmployees();
  
  console.table(employees);

  displayAverageSalary(employees);

  console.log('==============================');

  getRandomEmployee(employees);

  employees.sort(function (a, b) {
    if (a.lastName < b.lastName) {
      return -1;
    } else {
      return 1;
    }
  });

  displayEmployees(employees);
};

// Add event listener to 'Add Employees' button
addEmployeesBtn.addEventListener('click', trackEmployeeData);
