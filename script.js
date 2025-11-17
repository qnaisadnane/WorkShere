let employees = [];
let nextId = 1;
let zone =[
    { id : 1, name : "reception" , allowedzone : ["reception"]},
    { id : 2, name : "salle des serveurs " , allowedzone : ["salle des serveurs"]},
    { id : 3, name : "salle de securite" , allowedzone : ["salle de securite"]},
    { id : 4, name : "salle archivs" , allowedzone : ["salle archivs"]},
    { id : 5, name : "salle conference" , allowedzone : ["salle conference"]},
    { id : 6, name : "salle personel" , allowedzone : ["salle personel"]},
]

const modal = document.getElementById('add-worker-modal');
const openbtn = document.getElementById('add-worker-btn');
const closebtn = document.querySelector('.close-btn');
const cancelbtn = document.getElementById('btn-cancel-form');
const form = document.getElementById('add-worker-form');

openbtn.addEventListener('click', () => {
    modal.style.display = 'flex';
});

closebtn.addEventListener('click' , closeModal);
cancelbtn.addEventListener('click' , closeModal);

window.addEventListener('click' ,(e) => {
if(e.target === modal) closeModal;
});

function closeModal(){
    modal.style.display = 'none';
    form.reset();
}

form.addEventListener('submit' , (e) =>{
e.preventDefault();

if( validateForm()){
const name = document.getElementById('name').value.trim();
const role = document.getElementById('role').value;
const photoUrl = document.getElementById('photo').value.trim();
const email = document.getElementById('email').value.trim();
const phone = document.getElementById('phone').value.trim();

addEmployee(name , role , photoUrl, email , phone , []);

closeModal();
}
});


function validateForm(){
    let isvalid = true;
    const errors = [];

    const role = document.getElementById('role').value;
    if(!role){
    errors.push("please select a role");
    isvalid = false;
    }

    const email = document.getElementById('email').value;
    const emailRegex = /^$/;
    if(!email){
    errors.push("please select a email");
    isvalid = false;
    }  else if(!emailRegex.test(email)){
        errors.push("enter a valide email like this (example@gmail.com)");
        isvalid = false;
    }

    const phone = document.getElementById('phone').value;
    const phoneRegex = /^$/;
    if(!phone){
    errors.push("please select a email");
    isvalid = false;
    }  else if(!phoneRegex.test(phone)){
        errors.push("enter a valide phone number ");
        isvalid = false;
    }

    showerrors(errors);
    return isvalid;

}

function showerrors(errors){
    const olderrors = document.querySelectorAll('.error-message');
    olderrors.forEach(e => e.remove());

    errors.forEach(msg => {
        const errore = document.createElement('div');
        errore.className ='.error-message';
        errore.style.color = '#e74c3c';
        errore.textContent = msg;

        const formActions = document.querySelector('.form-actions');
        formActions.before(errore);
    });
}

function getzonebyId(id){
   return zone.find (z => z.id === id);
}

function createEmployee(name , role , photoUrl , email , phone , experiences = []) {
  return {
  id : nextId++,
  name : name,
  photoUrl : photoUrl,
  email : email,
  experiences : experiences,
  zoneassigne : null
  };
}

function addEmployee(name , role , photoUrl, email , phone , experiences){
const newEmployee = createEmployee(name , role , photoUrl, email , phone , experiences);
employees.push(newEmployee);
console.log("employe ajoute :" , newEmployee);
return newEmployee;
}

function removeEmployee(id){
    employees = employees.filter(emp => emp.id !== id);
    console.log("employe supprime, id :" , id);
}