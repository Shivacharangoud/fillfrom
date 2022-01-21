let myFormE = document.getElementById("myForm");
let formData = {
    name: "",
    email: "",
    status: "Active",
    gender: "Male"
};
let addedPara = document.getElementById("added");
let nameE = document.getElementById("name");
let nameErrorMessageE = document.getElementById("nameErrorMessage");
let emailE = document.getElementById("email");
let emailErrorMessageE = document.getElementById("emailErrorMessage");



let workingStatusE = document.getElementById("status");
workingStatusE.addEventListener("change", function(event) {
    formData.status = event.target.value;
    addedPara.textContent = "";

});

let genderMaleE = document.getElementById("genderMale");
genderMaleE.addEventListener("change", function(event) {
    formData.gender = event.target.value;
    addedPara.textContent = "";

})
let genderFemaleE = document.getElementById("genderFemale");
genderFemaleE.addEventListener("change", function(event) {
    formData.gender = event.target.value;
    addedPara.textContent = "";

})



myFormE.addEventListener("submit", function(event) {
    event.preventDefault();
    if (formData.name === "" || formData.email === "") {
        if (formData.name === "") {
            nameErrorMessageE.textContent = "Required*";
        }
        if (formData.email === "") {
            emailErrorMessageE.textContent = "Required*";
        }
    } else {
        submitFormData(formData);
    }
})


nameE.addEventListener("change", function(event) {
    if (event.target.value === "") {
        // show warning
        nameErrorMessageE.textContent = "Required*";
    } else {
        //nothing
        nameErrorMessageE.textContent = "";
    }
    formData.name = event.target.value;
    addedPara.textContent = "";

})




function submitFormData(formData) {
    let options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer 8040cc975db7d37225f8119c701c2cabfa36079296d056a97a440f3eba088573"
        },
        body: JSON.stringify(formData)
    };
    let url = "https://gorest.co.in/public-api/users";

    fetch(url, options)
        .then(function(response) {
            console.log(response.status);
            return response.json();

        })
        .then(function(jsonData) {
            console.log(jsonData);
            if (jsonData.code === 422) {
                if (jsonData.data[0].message === "has already been taken") {
                    emailErrorMessageE.textContent = "Email has already taken";
                }
            }
            if (jsonData.code === 201) {
                addedPara.textContent = "added successfully";
            }

        });

}

emailE.addEventListener("change", function(event) {
    if (event.target.value === "") {
        // show warning
        emailErrorMessageE.textContent = "Required*";
    } else {
        //nothing
        emailErrorMessageE.textContent = "";
    }
    formData.email = event.target.value;
    addedPara.textContent = "";





})