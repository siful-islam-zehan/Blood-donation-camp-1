let users = JSON.parse(localStorage.getItem('users') || '[]');
let currentUser = null;

function showSection(id){
  document.querySelectorAll('.section').forEach(s=>s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

function registerDonor(){
  let user = {
    name: r_name.value,
    location: r_location.value,
    phone: r_phone.value,
    email: r_email.value,
    password: r_password.value,
    blood: r_blood.value,
    last: r_lastdonate.value,
    image: ""
  };
  users.push(user);
  localStorage.setItem('users', JSON.stringify(users));
  alert("Registered Successfully");
}

function findDonor(){
  let loc = f_location.value.toLowerCase();
  let blood = f_blood.value.toLowerCase();

  let filtered = users.filter(u =>
    u.location.toLowerCase().includes(loc) &&
    u.blood.toLowerCase().includes(blood)
  );

  let html = filtered.map(u =>
    `<div style='background:white;padding:10px;margin:5px'>
      <h3>${u.name}</h3>
      <p>${u.location}</p>
      <p>${u.blood}</p>
      <p>${u.phone}</p>
    </div>`
  ).join("");

  results.innerHTML = html || "No donor found";
}

function login(){
  let email = l_email.value;
  let pass = l_password.value;

  currentUser = users.find(u => u.email==email && u.password==pass);
  if(currentUser){
    alert("Login success");
    showProfile();
  } else {
    alert("Invalid login");
  }
}

function showProfile(){
  if(!currentUser) return;
  profileData.innerHTML = `
    <h3>${currentUser.name}</h3>
    <p>${currentUser.location}</p>
    <p>${currentUser.blood}</p>
  `;
}

function uploadPic(){
  if(!currentUser) return alert("Login first");
  let file = p_image.files[0];
  let reader = new FileReader();
  reader.onload = function(){
    currentUser.image = reader.result;
    localStorage.setItem('users', JSON.stringify(users));
    alert("Image uploaded");
  };
  reader.readAsDataURL(file);
}
