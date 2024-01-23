//receive input from the form for days, months and years
// make sure only possible number of days can be inputed i.e from 1 - 31 depending on the month
// ensure only possible number of months will be accepted i.e from 1 - 12.
// ensure only possible number of digits for the year i.e 4 digits and years that have already occured.
// Receive validation errors if:
  // Any field is empty when the form is submitted i.e this field is required and the form text and borders are red.
  //The day number is not between 1-31 i.e Must be a valid date
  //- The month number is not between 1-12 i.e must be a valid month
  //- The date is in the future i.e must be a valid year
  //- The date is invalid e.g. 31/04/1991 (there are 30 days in April)
// Result - - View an age in years, months, and days after submitting a valid date through the form and add animation
// so the -- span should be automatically changed to the age in months, days and years when the form is submitted.



const fieldError = document.querySelectorAll('.fieldError')
const inputs = document.querySelectorAll('input');
const dayError = document.getElementById('dayError');
const monthError = document.getElementById('monthError');
const yearError = document.getElementById('yearError');
const yearsResult = document.getElementById('yearsResult');
const monthsResult = document.getElementById('monthsResult');
const daysResult = document.getElementById('daysResult');


function validateForm() {
  inputs.forEach((input, index) => {
    input.addEventListener('keyup', function(event) {
      if (event.key === 'Enter') {
        event.preventDefault();

        // Reset all errors and styles before revalidation
        fieldError.forEach(error => {
          error.innerHTML = '';
        });
        inputs.forEach(input => {
          input.style.borderColor = '';
          input.previousElementSibling.style.color = '';
        });

        // check for empty input fields
        const emptyInputs = Array.from(inputs).filter(input => input.value === '');

        if (emptyInputs.length > 0) {
          // display error messages
          emptyInputs.forEach(emptyInput => {
            const emptyIndex = Array.from(inputs).indexOf(emptyInput);
            fieldError[emptyIndex].innerHTML = 'This field is required';
          });

          // change color of border and label to red for empty Inputs
          inputs.forEach((input, i) => {
            if (emptyInputs.includes(input)) {
              fieldError[i].style.color = 'hsl(0, 100%, 67%)';
              input.style.borderColor = 'hsl(0, 100%, 67%)';
              input.previousElementSibling.style.color = 'hsl(0, 100%, 67%)'; //changes the label color
            } 
          });

          // abort form submission
          return; 
        }

         // checks for invalid day input
         const day = inputs[0];
         // ensures that the input is treated as a whole number, regardless of whether the user enters it with leading zeros or not.
         const dayValue = parseInt(day.value, 10);

         if(isNaN(dayValue) || dayValue < 1 || dayValue > 31) {
          dayError.innerHTML = 'Must be a valid day';
          dayError.style.color = 'hsl(0, 100%, 67%)';
          day.style.borderColor = 'hsl(0, 100%, 67%)';
          day.previousElementSibling.style.color = 'hsl(0, 100%, 67%)'; 
         } else {
          dayError.innerHTML = '';
          dayError.style.color = '';
          day.style.borderColor = '';
        };

        // checks for invalid month input
        const month = inputs[1];
        // ensures that the input is treated as a whole number, regardless of whether the user enters it with leading zeros or not.
        const monthValue = parseInt(month.value, 10);

        if(isNaN(monthValue) || monthValue < 1 || monthValue > 12) {
         monthError.innerHTML = 'Must be a valid month';
         monthError.style.color = 'hsl(0, 100%, 67%)';
         month.style.borderColor = 'hsl(0, 100%, 67%)';
         month.previousElementSibling.style.color = 'hsl(0, 100%, 67%)';
        } else {
         monthError.innerHTML = '';
         monthError.style.color = '';
         month.style.borderColor = '';
       }

         // checks for invalid year input
         const year = inputs[2];
         // ensures that the input is treated as a whole number, regardless of whether the user enters it with leading zeros or not.
         const yearValue = parseInt(year.value, 10);
         const currentYear = new Date().getFullYear();

         if(isNaN(yearValue) || yearValue.toString().length !== 4 || yearValue > currentYear) {
          yearError.innerHTML = 'Must be in the past';
          yearError.style.color = 'hsl(0, 100%, 67%)';
          year.style.borderColor = 'hsl(0, 100%, 67%)';
          year.previousElementSibling.style.color = 'hsl(0, 100%, 67%)'; 
         } else {
          yearError.innerHTML = '';
          yearError.style.color = '';
          year.style.borderColor = '';
        }

        // validate the entire date
        const validDate = validateDate(dayValue, monthValue, yearValue);
          if (!validDate) {
            dayError.innerHTML = 'Must be a valid date';
            dayError.style.color = 'hsl(0, 100%, 67%)';
            inputs.forEach(input => {
              input.style.borderColor = 'hsl(0, 100%, 67%)';
              input.previousElementSibling.style.color = 'hsl(0, 100%, 67%)';
            });
          } else {
            const age = calculateAge(dayValue, monthValue, yearValue);
            updateAge(age);
          }
        


         // When validation passes the form is submitted
        if (dayError.innerHTML === '' && monthError.innerHTML === '' && yearError.innerHTML === '') {
          console.log('Form submitted');
        }
      } 
    });
  });
}

function validateDate(day, month, year) {
  // creates a Date object with the entered values
  const testDate = new Date(year, month - 1, day);
// Check if the resulting date object is valid
  return (
    testDate.getDate() === day && testDate.getMonth() === month - 1 && testDate.getFullYear() === year
  );
}
validateForm();

function calculateAge(day, month, year) {
  const currentDate = new Date();
  const birthDate = new Date(year, month - 1, day);

  // Calculate the difference in years, months, and days
  let years = currentDate.getFullYear() - birthDate.getFullYear();
  let months = currentDate.getMonth() - birthDate.getMonth();
  let days = currentDate.getDate() - birthDate.getDate();

  if (days < 0) {
    months--; // decrease the months variable by 1
    // lastMonth represents last day of the previous mont, the 0 means the last day of the previous month
    const lastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
    days += lastMonth.getDate();
  }
  if (months < 0) {
    years--;
    months += 12;
  }

  return { years, months, days };
}

function updateAge(age) {
  yearsResult.innerHTML = `${age.years}`;
  monthsResult.innerHTML = `${age.months}`;
  daysResult.innerHTML = `${age.days}`
}

