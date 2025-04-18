document.addEventListener("DOMContentLoaded", ()=> {
    let form=document.querySelector("form");

    let users=JSON.parse(localStorage.getItem("users")) || [];

    let name=document.querySelector("#name");
    let username=document.querySelector("#username");
    let email=document.querySelector("#email");
    let password=document.querySelector("#password");
    let confirmpassword=document.querySelector("#confirmpassword");


    form.addEventListener("submit", register);

    function register(e){
        e.preventDefault();

        if (!yoxlaUsername(username.value)) {
            toast("İstifadəci səhvdir");
            return;
          }
      
          if (!yoxlaEmail(email.value)) {
            toast("Email sehvdir");
            return;
          }
      
          if (!yoxlaPassword(password.value)) {
            toast("Şifrə zeifdir");
            return;
          }
      
          if (password.value !== confirmpassword.value) {
            toast("Parol sehvdir");
            return;
          }
        

        let uniqueUser=users.some(
            (user)=>user.username == username.value || user.email == email.value);
        

            if (uniqueUser) {
                toast("This username or email already exists");
                return;
              }
              
        let id =uuidv4();

        if(!uniqueUser){
            let newUser={
                name:name.value,
                username:username.value,
                email:email.value,
                password:password.value,
                confirmpassword:confirmpassword.value,
                isLogined:false,
                id,
                wishlist: [],
                basket:[],
            };

            users.push(newUser);
            localStorage.setItem("users",JSON.stringify(users));
            toast("Register Successfuly");
            
            setTimeout(()=>{
                window.location.href = "login.html";
            },3000);
            
        }else{
            toast("User already existed...")
        }
    }

    let toast= (text) => {
        Toastify({
            text:`${text}`,
            duration: 3000,
            position: "right", 
            stopOnFocus: true, 
            style: {
            background: "linear-gradient(to right, #00b09b,rgb(87, 132, 183))",
            },
            onClick: function(){} 
          }).showToast();
    };


    function yoxlaUsername(value) {
        if (value.length < 3 || value.length > 20) {
          return false;
        }
        for (let i = 0; i < value.length; i++) {
          let char = value[i];
          let yoxlaCharUsername =(char >= "a" && char <= "z") ||(char >= "A" && char <= "Z") ||(char >= "0" && char <= "9") ||
            char === "_" || char === "-";
      
          if (!yoxlaCharUsername) {
            return false; 
          }
        } return true;
      }

  let yoxlaEmail = (value) => {
    let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(value);
  };
  

  function yoxlaPassword(value) {
    if (!value || value.length < 8) {
      return false;
    }
  
    let kicikHerf,boyukHerf,reqem,simvol = false;
    let specialChars = "@#$%!^&*";
  
    for (let i = 0; i < value.length; i++) {
      let char = value[i];
  
      if (char >= "a" && char <= "z") {
        kicikHerf = true;
      }
      else if (char >= "A" && char <= "Z"){
        boyukHerf = true;
      } 
      else if (char >= "0" && char <= "9"){
        reqem = true;
      } 
      else if (specialChars.includes(char)){
        simvol = true;
      } 
    }
  
    return kicikHerf && boyukHerf && reqem && simvol;
  }


  let createIcon = (input) => {
    let icon = document.createElement("span");
    icon.classList.add("check-icon");
    input.parentElement.appendChild(icon);
    return icon;
  };

  let usernameIcon = createIcon(username);
  let passwordIcon = createIcon(password);

  username.addEventListener("input", () => {
    if (yoxlaUsername(username.value)) {
      usernameIcon.textContent = "✔️";
      usernameIcon.style.color = "green";
    } else {
      usernameIcon.textContent = "❌";
      usernameIcon.style.color = "red";
    }
  });

  password.addEventListener("input", () => {
    if (yoxlaPassword(password.value)) {
      passwordIcon.textContent = "✔️";
      passwordIcon.style.color = "green";
    } else {
      passwordIcon.textContent = "❌";
      passwordIcon.style.color = "red";
    }
  });

});
