if(localStorage.getItem("loggedIn") !== "true"){

window.location.href="login.html";

}

let leads =
JSON.parse(localStorage.getItem("leads")) || [];

let editIndex = null;

const form =
document.getElementById("leadForm");

form.addEventListener("submit",function(e){

e.preventDefault();

const lead={

name:document.getElementById("name").value,

email:document.getElementById("email").value,

phone:document.getElementById("phone").value,

source:document.getElementById("source").value,

status:document.getElementById("status").value,

notes:document.getElementById("notes").value,

date:new Date().toLocaleString()

};

if(editIndex === null){

leads.push(lead);

}else{

leads[editIndex]=lead;

editIndex=null;

}

saveData();

form.reset();

});

function saveData(){

localStorage.setItem(
"leads",
JSON.stringify(leads)
);

displayLeads();
updateStats();

}

function displayLeads(){

const table =
document.getElementById("leadTable");

table.innerHTML="";

const search =
document.getElementById("search")
.value.toLowerCase();

const filter =
document.getElementById("filterStatus")
.value;

leads.forEach((lead,index)=>{

const matchSearch=

lead.name.toLowerCase()
.includes(search)

||

lead.email.toLowerCase()
.includes(search);

const matchFilter=

filter==="" ||
lead.status===filter;

if(matchSearch && matchFilter){

table.innerHTML+=`

<tr>

<td>${lead.name}</td>

<td>${lead.email}</td>

<td>${lead.phone}</td>

<td>${lead.status}</td>

<td>${lead.source}</td>

<td>${lead.date}</td>

<td>

<button
class="edit-btn"
onclick="editLead(${index})">
Edit
</button>

<button
class="delete-btn"
onclick="deleteLead(${index})">
Delete
</button>

</td>

</tr>

`;

}

});

}

function editLead(index){

const lead=leads[index];

document.getElementById("name").value=
lead.name;

document.getElementById("email").value=
lead.email;

document.getElementById("phone").value=
lead.phone;

document.getElementById("source").value=
lead.source;

document.getElementById("status").value=
lead.status;

document.getElementById("notes").value=
lead.notes;

editIndex=index;

}

function deleteLead(index){

if(confirm("Delete Lead?")){

leads.splice(index,1);

saveData();

}

}

function updateStats(){

document.getElementById("totalLeads")
.innerText=leads.length;

document.getElementById("newLeads")
.innerText=
leads.filter(l=>l.status==="New").length;

document.getElementById("contactedLeads")
.innerText=
leads.filter(l=>l.status==="Contacted").length;

document.getElementById("convertedLeads")
.innerText=
leads.filter(l=>l.status==="Converted").length;

}

function exportCSV(){

let csv=
"Name,Email,Phone,Status,Source,Date\n";

leads.forEach(lead=>{

csv +=
`${lead.name},
${lead.email},
${lead.phone},
${lead.status},
${lead.source},
${lead.date}\n`;

});

const blob=
new Blob([csv],
{type:"text/csv"});

const a=
document.createElement("a");

a.href=
URL.createObjectURL(blob);

a.download="leads.csv";

a.click();

}

function toggleTheme(){

document.body.classList.toggle(
"dark-mode"
);

}

function logout(){

localStorage.removeItem("loggedIn");

window.location.href="login.html";

}

document.getElementById("search")
.addEventListener("keyup",
displayLeads);

document.getElementById("filterStatus")
.addEventListener("change",
displayLeads);

displayLeads();
updateStats();