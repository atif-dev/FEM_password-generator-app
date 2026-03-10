let slider = document.querySelector("#slider");
let sliderValue = document.querySelector("#slider-value");
let strengthStatus = document.querySelector("#strength_status");
let password = document.querySelector("#password");
let generateBtn = document.querySelector("#generate_btn");
let strengthBars = document.querySelectorAll(".strength-bar");
const COPIED = document.querySelector("#copied_text");
let error = document.querySelector("#error");

slider.addEventListener("input", () => {
  let percent = (slider.value) / (slider.max) * 100;
  slider.style.background = `linear-gradient(to right, #A4FFAF 0%, #A4FFAF ${percent-1}%, #18171F ${percent}%, #18171F 100%)`;
  sliderValue.innerHTML = slider.value;
});

generateBtn.addEventListener("click", () => {
  password.innerText = "P4$5W0rD!";

  strengthStatus.innerHTML = "";
  strengthBars.forEach(strengthBar => {
  strengthBar.style.background = "#18171F";
  strengthBar.style.border = "2px solid #E6E5EA";
  })

  if(Number(slider.value) == 0){
    error.innerHTML = "--Please Increase Slider--";
    error.style.display = "block";
    return;
  }

  let checkboxCount = 0;
  let pool = [];
  let checkBoxes = document.querySelectorAll(".checkbox");
  checkBoxes.forEach(checkBox =>{
    if(checkBox.checked){
      pool.push(checkBox.value);
      checkboxCount++;
    }

  })

  //checkboxCount is zero, means no checkbox is selected.
  if(checkboxCount == 0){
    error.innerHTML = "--Please Select At Least One Checkbox--";
    error.style.display = "block";
    return;
  }

  COPIED.style.visibility = "hidden";
  strengthStatus.innerHTML = "";

  if(slider.value < checkboxCount){
    error.innerHTML = "--Please Increase Slider Or Uncheck Checkbox(s)--";
    error.style.display = "block";
  }else{
    error.style.display = "none";
    generateRandomPassword(pool,slider.value);
    showPasswordStrength();
  }
});

/*
Strong password logic:
  If a password has...
   at least one uppercase
   at least one lowercase
   at least one number
   at least one symbol 
  then it is considered to be STRONG.
*/
function generateRandomPassword(pool,charLength){
  let randomPassword = '';

  if(pool.length == charLength){
    pool.forEach((value,index)=> {
      randomPassword += pool[index].charAt(Math.floor(Math.random() * pool[index].length));
    })
  }else{
    /*
      Logic explanation:
        Chracters length is greater than number of selected checkbox. Ex: 3 checkboxs , slider value = 15
      -------------------------------------------------------------------------------------------
        Ex: 4 checkboxes, slider value = 10
      1)
        Generate a random password A of length 4 having four varieties.

        --3 checkboxes then password length will be 3--
        --4 checkboxes then password length will be 4--
        ...
      2)
        Password B length: slider value-4 = 6
        A)Create a pool of values based upon number of checkbox(s) selection.
        B)Generate a random password B from pool having length 6.
        C)Final Password: password A + password B.
    */
      
    if(charLength > pool.length){
      
      pool.forEach((value,index)=> {
      randomPassword += pool[index].charAt(Math.floor(Math.random() * pool[index].length));
      })

      let poolB = "";
      //create one pool for all.
       poolB = pool.join("");
      for(let a = 0; a<(charLength-pool.length); a++){
        randomPassword += poolB.charAt(Math.floor(Math.random() * poolB.length));
      }
    }
  }
  
  password.innerText = randomPassword;
}

function showPasswordStrength(){
  let strengthCount = 0;
  const PASSWORD = password.innerText;
  
  let hasUpperCase = /[A-Z]/.test(PASSWORD);
  if(hasUpperCase)
    strengthCount++;

  let hasLowerCase = /[a-z]/.test(PASSWORD);
  if(hasLowerCase)
    strengthCount++;

  let hasNumbers = /[0-9]/.test(PASSWORD);
  if(hasNumbers)
    strengthCount++;

  let hasSymbols = /[!@#$%^&*()_+\-=[\]{}|;:,.<>?]/.test(PASSWORD);
  if(hasSymbols)
    strengthCount++;

  switch (strengthCount){
    case 1:
      strengthStatus.innerHTML = "Too weak!";
      strengthBars[0].style.background = "#F64A4A";
      strengthBars[0].style.border = "#F64A4A";
      break;
    case 2:
      strengthStatus.innerHTML = "weak";
      for(let i=0; i<=strengthCount-1; i++){
        strengthBars[i].style.background = "#FB7C58";
        strengthBars[i].style.border = "2px solid #FB7C58";
      }
      break;
    case 3:
      strengthStatus.innerHTML = "medium";
      for(let i=0; i<=strengthCount-1; i++){
        strengthBars[i].style.background = "#F8CD65";
        strengthBars[i].style.border = "2px solid #F8CD65";
      }
      break;
    case 4:
      strengthStatus.innerHTML = "strong";
      strengthBars.forEach(strengthBar => {
      strengthBar.style.background = "#A4FFAF";
      strengthBar.style.border = "2px solid #A4FFAF";
      })
      break;
    default:
      strengthStatus.innerHTML = "";
  }
}

function copyToClipboard() {
  const samplePassword = "P4$5W0rD!";
  if(password.innerText === samplePassword){
    error.innerHTML = "--Please Generate New Password--"
    return;
  }
  navigator.clipboard.writeText(password.innerText);
  COPIED.style.visibility = "visible";
}
let copiedBtn = document.querySelector("#copied_btn");
copiedBtn.addEventListener("click", copyToClipboard);




  