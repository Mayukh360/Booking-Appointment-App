function saveToLocalStorage(event){
  event.preventDefault();
 //Saving the data input of 3 fields, inside variables
  const name=document.getElementById('nameInput').value;
  const email=document.getElementById('emailInput').value;
  const phonenumber=document.getElementById('phoneInput').value;
  
 //Creating object of Particular variables
  const obj={
      name,
      email,
      phonenumber
  }

  axios.post("https://crudcrud.com/api/4296548dd82c4705b70c3ad8bdf34b44/appointmentsData",obj)
  .then((response) => {
    console.log(response);
    const newData = response.data;
    localStorage.setItem(newData.email, JSON.stringify(newData));
    displayItems();
  }).catch((err) => {
    console.log(err);
  });

  //Converting the object to String and storing into Local Storage
  //localStorage.setItem(obj.email,JSON.stringify(obj))
 //Calling display items
  //displayItems();
  
}

//Creating Display function
function displayItems(){
  //Storing DOM id of ul inside ul variable
let ul= document.getElementById("listOfitems");
ul.innerHTML = '';

for (let i = 0; i < localStorage.length; i++) {
  const key = localStorage.key(i);
  let obj;
  try {
    obj = JSON.parse(localStorage.getItem(key));
  } catch (e) {
    localStorage.removeItem(key);
    continue;
  }
  //Creating li tag in the name of li variable
  let li = document.createElement("li");
  
//Creating 3 input types which is going to be added in 'li' tag later
//creating name Input inside nameInput variable
  let nameInput = document.createElement('input');
  nameInput.type = 'text';
  nameInput.value = obj.name;

  //Creating email Input inside emailInput variable
  let emailInput = document.createElement('input');
  emailInput.type = 'email';
  emailInput.value = obj.email;
// Creating phoneInput inside phoneInput  variable
  let phoneInput = document.createElement('input');
  phoneInput.type = 'tel';
  phoneInput.value = obj.phonenumber;

  //Creating delete button
  let dltBtn = document.createElement('input');
  dltBtn.type = 'button';
  dltBtn.value = 'Delete';
  dltBtn.onclick = () => {
    localStorage.removeItem(obj.email);
    ul.removeChild(li);
  };

   //Creating edit button
  let editBtn = document.createElement('input');
  editBtn.type = 'button';
  editBtn.value = 'Edit';
  editBtn.onclick = () => {
    //Populating the values
    document.getElementById('nameInput').value = obj.name;
    document.getElementById('emailInput').value = obj.email;
    document.getElementById('phoneInput').value = obj.phonenumber;
   //Removing the values
    localStorage.removeItem(obj.email);
    ul.removeChild(li);
  };
  
  //When name, email,phn is filled and submitted those will be added inside li
  li.appendChild(nameInput);
  li.appendChild(emailInput);
  li.appendChild(phoneInput);
  li.textContent = obj.name+'----- '+obj.email+' -----   '+obj.phonenumber ;
  li.appendChild(editBtn);
  li.appendChild(dltBtn);
  //li added inside ul
  ul.appendChild(li);
}
}




