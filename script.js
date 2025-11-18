let employees = [{ }];
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
const cancelbtn = document.getElementById('btn-cancel-form');
const form = document.getElementById('add-worker-form');
const photoUrl = document.getElementById('photo');
const photopreview  = document.getElementById('photo-live');
const experiencescontainer = document.getElementById('experiences-container');
const addexperiencebtn = document.getElementById('add-experience-btn');

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


openbtn.addEventListener('click', () => {
    modal.style.display = 'flex';
});


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
const role = document.getElementById('select-role').value;
const photoUrl = document.getElementById('photo').value.trim();
const email = document.getElementById('email').value.trim();
const phone = document.getElementById('phone').value.trim();

const experiences = [];
document.querySelectorAll('.experience-item').forEach(item => {
    const poste = item.children[0].value.trim();
    const entreprise = item.children[1].value.trim();
      const annees = item.children[2].value.trim();

      if (poste && entreprise && annees) {
        experiences.push({ poste, entreprise, annees });
      }
});
addEmployee(name , role , photoUrl, email , phone , experiences);
unsignedStaff();
closeModal();
}
});


function unsignedStaff() {
const list = document.getElementById('unassigned-list');
list.innerHTML= '';
const unassigned = employees.filter(emp => emp.zoneassigne === null);

if(unassigned.length === 0){
    list.innerHTML = `
          <li class="empty-message">
          Aucun employe non assigne
          </li> `;
          return;
}
unassigned.forEach(emp => {
const item = document.createElement('li');
item.className = 'staff-list';
item.innerHTML = `
 <img src="${emp.photo}" alt="${emp.name}">
 <div>
 <strong>${emp.name}</strong>
 <span>${emp.role}</span>
 </div>
 `;
 list.appendChild(item);
});
}

document.addEventListener('DOMContentLoaded' , unsignedStaff);

function validateForm(){
    let isvalid = true;
    const errors = [];

    const role = document.getElementById('role').value;
    if(!role){
    errors.push("please select a role");
    isvalid = false;
    }

    const email = document.getElementById('email').value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!email){
    errors.push("please select a email");
    isvalid = false;
    }  else if(!emailRegex.test(email)){
        errors.push("enter a valide email like this (example@gmail.com)");
        isvalid = false;
    }

    const phone = document.getElementById('phone').value;
    const phoneRegex = /^\d{10}$/;
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

photoUrl.addEventListener('input', () => {
  const url = photoUrl.value.trim();
  if (url && url.startsWith('http')) {
    photopreview.src = url;
    photopreview.onerror = () => {
      photopreview.src = 'https://via.placeholder.com/150?text=Invalid';
    };
  } else {
    photopreview.src = 'https://via.placeholder.com/150?text=Photo';
  }
});

function addExperience() {
    const div = document.createElement('div');
    div.className = 'experience-item';

    div.innerHTML=`
    <input type="text" placeholder="Post">
    <input type="text" placeholder="Entreprise">
    <input type="text" placeholder="Years">
    <button type="button" class="remove-exp">x</button>
    `;

    div.querySelector('.remove-exp').addEventListener('click', () => {
        div.remove();
    });
    experiencescontainer.appendChild(div);
}

addexperiencebtn.addEventListener('click' , addExperience);
openbtn.addEventListener('click', addExperience);
openbtn.addEventListener('click', () => {
    modal.style.display = 'flex';
    experiencescontainer.innerHTML = '';
    addExperience();
});