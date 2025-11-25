let nextId = 1;
let employees = [{
    id: nextId++, name: "Salma Alami", role: "Receptionnistes", photoUrl: "https://randomuser.me/api/portraits/women/68.jpg", email: "salma@worksphere.ma", phone: "0612365478", experiences: [{ poste: "Receptionnistes", entreprise: "Hotel", startdate: "30-03-2020", enddate: "30-03-2025" }], zoneassigne: null
}, {
    id: nextId++, name: "Youssef Benali", role: "Techniciens IT", photoUrl: "https://randomuser.me/api/portraits/men/32.jpg", email: "youssef@worksphere.ma", phone: "0654321987", experiences: [{ poste: "Support IT", entreprise: "Orange", startdate: "2-08-2019", enddate: "30-03-2022" }], zoneassigne: null
}, {
    id: nextId++, name: "Morad Yousfi", role: "Agent de securite", photoUrl: "https://randomuser.me/api/portraits/men/68.jpg", email: "moad@worksphere.ma", phone: "0678901234", experiences: [{ poste: "Agent de securite", entreprise: "OCP", startdate: "2-08-2011", enddate: "30-03-2020" }], zoneassigne: null
}, {
    id: nextId++, name: "Mohammed Ali", role: "Manager", photoUrl: "https://randomuser.me/api/portraits/men/69.jpg", email: "mohamed@worksphere.ma", phone: "0601234598", experiences: [{ poste: "Manager", entreprise: "JESA", startdate: "2-08-2018", enddate: "30-03-2022" }], zoneassigne: null
}, {
    id: nextId++, name: "Sara Benani", role: "Nettoyage", photoUrl: "https://randomuser.me/api/portraits/women/13.jpg", email: "sara@worksphere.ma", phone: "0601734598", experiences: [{ poste: "Nettoyage", entreprise: "SOGEA", startdate: "2-08-2023", enddate: "30-03-2025" }], zoneassigne: null
}
];

let zone = [
    { id: 1, name: "reception", allowedzone: ["reception"], maxperson: 2 },
    { id: 2, name: "servers", allowedzone: ["salle des serveurs"], maxperson: 2 },
    { id: 3, name: "security", allowedzone: ["salle de securite"], maxperson: 2 },
    { id: 4, name: "archives", allowedzone: ["salle archives"], maxperson: 2 },
    { id: 5, name: "conference", allowedzone: ["salle conference"], maxperson: 2 },
    { id: 6, name: "personel", allowedzone: ["salle personel"], maxperson: 2 },
]

const modal = document.getElementById('add-worker-modal');
const openbtn = document.getElementById('add-worker-btn');
const cancelbtn = document.getElementById('btn-cancel-form');
const form = document.getElementById('add-worker-form');
const photoUrl = document.getElementById('photo');
const photopreview = document.getElementById('photo-live');
const experiencescontainer = document.getElementById('experiences-container');
const addexperiencebtn = document.getElementById('add-experience-btn');
const openbtnemp = document.getElementById('add-btn-emp');
const modalworker = document.getElementById('assignmodal');
const modallist = document.getElementById('modallist');

function createEmployee(name, role, photoUrl, email, phone, experiences) {
    return {
        id: nextId++,
        name: name,
        role: role,
        photoUrl: photoUrl,
        email: email,
        phone: phone,
        experiences: experiences,
        zoneassigne: null
    };
}

function addEmployee(name, role, photoUrl, email, phone, experiences) {
    const newEmployee = createEmployee(name, role, photoUrl, email, phone, experiences);
    employees.push(newEmployee);
    console.log("employe ajoute :", newEmployee);
    return newEmployee;
}

function removeEmployee(id) {
    employees = employees.filter(emp => emp.id !== id);
    console.log("employe supprime, id :", id);
}

function displayEmployee(emp) {
    const modal = document.getElementById('cvModal');
    const content = document.getElementById('cvContent');

    let experiencesHTML = '';
    experiencesHTML = emp.experiences.map(exp => `
        <div class="experience-item2">
            <p><strong>Post :</strong> ${exp.poste}</p>
            <p><strong>Entreprise :</strong> ${exp.entreprise}</p>
            <p><strong>Start Date :</strong> ${exp.startdate}</p>
            <p><strong>End Date :</strong> ${exp.enddate}</p>
        </div>
        <hr>
    `).join('');

    content.innerHTML = `
        <div class="cv-header">
            <img src="${emp.photoUrl}">
             <div class="cv-header-title">
            <h2>${emp.name}</h2>
            <h3>${emp.role}</h3>
            </div>
        </div>

        <hr>
       <div class="cv-center">
        <h3>Personal Informations</h3>
        <p><strong>Email :</strong> ${emp.email}</p>
        <p><strong>Phone :</strong> ${emp.phone}</p>
         </div>
        <hr>

        <h3 class="pro-exp">Professional Experiences</h3>
        ${experiencesHTML}
    `;

    modal.style.display = 'block';

    window.onclick = (e) => {
        if (e.target === modal) modal.style.display = 'none';
    };
}

cancelbtn.addEventListener('click', closeModal);

window.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
});

function closeModal() {
    modal.style.display = 'none';
    form.reset();
    experiencescontainer.innerHTML = '';
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = validateForm();
    let isValid2 = validateExperiences();
    if (isValid && isValid2) {

        const name = document.getElementById('name').value.trim();
        const role = document.getElementById('select-role').value;
        const photoUrl = document.getElementById('photo').value.trim() || "https://static.vecteezy.com/system/resources/thumbnails/005/544/718/small/profile-icon-design-free-vector.jpg";
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();

        const experiences = [];
        document.querySelectorAll('.experience-item').forEach(item => {
            const poste = item.querySelector('.post').value.trim();
            const entreprise = item.querySelector('.entreprise').value.trim();
            const debut = item.querySelector('.date-debut').value;
            const fin = item.querySelector('.date-fin').value;

            if (poste && entreprise && debut && fin) {
                experiences.push({ "poste": poste, "entreprise": entreprise, "startdate": debut, "enddate": fin });
            }
        });
        addEmployee(name, role, photoUrl, email, phone, experiences);
        unsignedStaff();
        closeModal();
    }
});

function unsignedStaff() {
    const list = document.getElementById('unassigned-list');
    list.innerHTML = '';
    const unassigned = employees.filter(emp => emp.zoneassigne === null);

    if (unassigned.length === 0) {
        list.innerHTML = `
          <li class="empty-message">
          No unassigned employees
          </li> `;
        return;
    }
    unassigned.forEach(emp => {
        const item = document.createElement('li');
        item.className = 'staff-item';
        item.innerHTML = `

 <img src="${emp.photoUrl}" alt="${emp.name}">
 <strong>${emp.name}</strong>
 <p>${emp.role}</p>
 </div>
 `;
        item.addEventListener('click', function () {
            displayEmployee(emp);
        });

        list.appendChild(item);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    unsignedStaff();
});

function validateForm() {
    let isvalid = true;

    const name = document.getElementById('name');
    const nameRegex = /^[A-Za-z]{3,}$/;
    if (!name.value) {
        name.nextElementSibling.innerHTML = "please select a name";
        isvalid = false;
    } else if (!nameRegex.test(name.value)) {
        name.nextElementSibling.innerHTML = "name doit contenir au moins 3 lettres";
        isvalid = false;
    } else {
        console.log("condition entered");

        name.nextElementSibling.innerHTML = '';
    }

    const role = document.getElementById('select-role');
    if (!role.value) {
        role.nextElementSibling.innerHTML = "please select a role";
        isvalid = false;
    }

    const email = document.getElementById('email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value) {
        email.nextElementSibling.innerHTML = "please select email";
        isvalid = false;
    } else if (!emailRegex.test(email.value)) {
        email.nextElementSibling.innerHTML = "email must have @ and .";
        isvalid = false;
    }

    const phone = document.getElementById('phone');
    const phoneRegex = /^\d{10}$/;
    if (!phone.value) {
        phone.nextElementSibling.innerHTML = "please select phone";
        isvalid = false;
    } else if (!phoneRegex.test(phone.value)) {
        phone.nextElementSibling.innerHTML = "phone must have 10 numbers and begin 06 or 07";
        isvalid = false;
    }

    return isvalid;
}

function validateExperience(experience) {

    let isvalid = true;
    const post = experience.querySelector('.post');
    const entreprise = experience.querySelector('.entreprise');
    const debut = experience.querySelector('.date-debut');
    const fin = experience.querySelector('.date-fin');

    experience.querySelectorAll('.error').forEach(e => e.innerHTML = '');
    const textRegex = /^[A-Za-z]{3,}$/;

    if (!post.value) {
        post.nextElementSibling.innerHTML = "please select post";
        isvalid = false;
    }
    else if (!textRegex.test(post.value)) {
        post.nextElementSibling.innerHTML = "post doit contenir au moins 3 lettres";
        isvalid = false;
    }
    if (!entreprise.value) {
        entreprise.nextElementSibling.innerHTML = "please select entreprise";
        isvalid = false;
    }
    else if (!textRegex.test(entreprise.value)) {
        entreprise.nextElementSibling.innerHTML = "entreprise doit contenir au moins 3 lettres";
        isvalid = false;
    }

    const d1 = new Date(debut.value);
    const d2 = new Date(fin.value);
    const today = new Date();

    if (!debut.value) {
        debut.nextElementSibling.innerHTML = "please select start date";
        isvalid = false;
    }
    else if (d1 >= today) {
        debut.nextElementSibling.innerHTML = "start date must be before today";
        isvalid = false;
    }
    if (!fin.value) {
        fin.nextElementSibling.innerHTML = "please select fin date";
        isvalid = false;
    }
    if (d2 >= today) {
        fin.nextElementSibling.innerHTML = "end date must be before today";
        isvalid = false;
    }

    if (d1 >= d2) {
        debut.nextElementSibling.innerHTML = "start date must be before end date";
        isvalid = false;
    }
    return isvalid;
}

function validateExperiences() {
    let isvalid = true;

    const experiences = document.querySelectorAll('.experience-item');
    experiences.forEach((e) => {
        if (!validateExperience(e)) {
            isvalid = false;
        }
    });

    return isvalid;
}

function getzonebyId(id) {
    return zone.find(z => z.id === id);
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

    div.innerHTML = `
    <input type="text" name = "post" class="post" placeholder="Post">
    <div class="error"></div>
    <input type="text" class="entreprise" placeholder="Entreprise">
    <div class="error"></div>
    <p class="fromt">From</p>
    <input type="date" class="date-debut" placeholder="Years">
    <div class="error"></div>
    <p class="fromt">To</p>
    <input type="date" class="date-fin" placeholder="Years">
    <div class="error"></div>
    <div class="remove-exp-div">
    <button type="button" class="remove-exp">Close Experience</button>
    </div>
    `;

    div.querySelector('.remove-exp').addEventListener('click', () => {
        div.remove();
    });
    if (experiencescontainer.innerHTML == '') {
        div.querySelector('.remove-exp').remove();
    }
    experiencescontainer.appendChild(div);
}

addexperiencebtn.addEventListener('click', addExperience);

openbtn.addEventListener('click', () => {
    modal.style.display = 'flex';
    const olderrors = document.querySelectorAll('.error');
    olderrors.forEach(e => e.innerHTML = "");
    addExperience();
});

modalworker.addEventListener('click', (e) => {
    if (e.target === modalworker) {
        modalworker.style.display = 'none';
    }
});

function renderzoneemployees() {
    document.querySelectorAll('.zone').forEach(zone => {
        const employeesdiv = zone.querySelector('.employees');
        employeesdiv.innerHTML = '';

        employees.forEach(emp => {
            if (emp.zoneassigne === zone.id) {
                const empdiv = document.createElement('div');
                empdiv.className = 'assigned-employee';
                empdiv.innerHTML = `
                    <img src="${emp.photoUrl}" alt="${emp.name}">
                    <div class="assigned-name-role">
                        <strong>${emp.name}</strong>
                        <p>${emp.role}</p>
                    </div>     
                `;
                empdiv.addEventListener('click', () => {
                    emp.zoneassigne = null;
                    renderzoneemployees();
                    unsignedStaff();
                });
                employeesdiv.appendChild(empdiv);
            }
        });
    });
}

document.querySelectorAll('.add-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const zoneelement = btn.closest('.zone');
        const zoneid = zoneelement.id;
        modallist.innerHTML = '';

        if (employees.length === 0) {
            modallist.innerHTML += '<p style="text-align:center; color:#999;">No worker available</p>';
            modalworker.style.display = 'flex';
            return;
        }
        employees.forEach(emp => {
            const role = emp.role;

            let canaccess = false;

            if (zoneid === 'reception') {
                canaccess = role === 'Receptionnistes' || role === 'Manager' || role === 'Nettoyage';
            }
            else if (zoneid === 'servers') {
                canaccess = role === 'Techniciens IT' || role === 'Manager' || role === 'Nettoyage';
            }
            else if (zoneid === 'security') {
                canaccess = role === 'Agent de securite' || role === 'Manager' || role === 'Nettoyage';
            }
            else if (zoneid === 'archives') {
                canaccess = role !== 'Nettoyage' || role === 'Manager';
            }
            else {
                canaccess = true;
            }
            if (canaccess && emp.zoneassigne === null) {
                const item = document.createElement('div');
                item.className = 'worker-item';

                item.innerHTML = `
                    <img src="${emp.photoUrl}">
                    <div class="name-role">
                        <strong>${emp.name}</strong><br>
                        <small>${emp.role}</small> 
                    </div>
                `;

                item.addEventListener('click', () => {
                    if (maxEmployeeZone(zoneid)) {
                        emp.zoneassigne = zoneid;
                        modalworker.style.display = 'none';
                        renderzoneemployees();
                        unsignedStaff();
                    }
                });

                modallist.appendChild(item);
            }
        });

        modalworker.style.display = 'flex';
    });
});

function maxEmployeeZone(zoneid) {
    const zoneConfig = zone.find(z => z.name === zoneid);
    const assignedCount = employees.filter(emp => emp.zoneassigne === zoneid).length;

    if (assignedCount >= zoneConfig.maxperson) {
        alert('zone is full');
        return false;
    }

    return true;
}
