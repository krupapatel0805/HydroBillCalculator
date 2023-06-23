// Toggling between form and receipt 
document.querySelector("#submit").addEventListener("click", display)
function display() {
    document.querySelector("form").classList.add("display");
    document.querySelector(".receipt").classList.remove("display");
}
document.querySelector("#receipt-button").addEventListener("click", displayForm)
function displayForm() {
    document.querySelector("form").classList.remove("display");
    document.querySelector(".receipt").classList.add("display");
    location.reload();
}

// Validation of form
document.querySelector("button").addEventListener("click", validateForm)
function validateForm(e) {
    e.preventDefault();
    let validationEle = document.getElementsByClassName("validation");

    for (let x = 0; x < validationEle.length; x++) {
        if (validationEle[x].value == "") {
            validationEle[x].style.borderColor = "red"
            alert(validationEle[x].id + " needs to be filled.");
            return false;
        }
        else {
            validationEle[x].style.borderColor = "#ccc"
        }
    }
}


document.querySelector("button").addEventListener("click", value)
function value() {
    // Name 
    var name = document.getElementById("Name").value;
    document.getElementById("receipt-name").innerHTML = name;

    // Email 
    var email = document.getElementById("Email").value;
    document.getElementById("receipt-email").innerHTML = email;

    // Declaring variables for usage 
    let m, a, e;

    // Morning usage 
    var morning = parseFloat(document.getElementById("Morning-usage").value);
    if (morning > 0) {
        m = morning * 0.25;
        document.getElementById("receipt-morning").innerHTML = " " + m.toFixed(2);
    }
    else {
        document.getElementById("receipt-morning").innerHTML = "";
    }

    // Afternoon usage 
    var afternoon = parseFloat(document.getElementById("Afternoon-usage").value);
    if (afternoon > 0) {
        a = afternoon * 0.31;
        document.getElementById("receipt-afternoon").innerHTML = "" + a.toFixed(2);
    }
    else {
        document.getElementById("receipt-afternoon").innerHTML = "";
    }

    // Evening usage 
    var evening = parseFloat(document.getElementById("Evening-usage").value);
    if (evening > 0) {
        e = evening * 0.40;
        document.getElementById("receipt-evening").innerHTML = "" + e.toFixed(2);
    }
    else {
        document.getElementById("receipt-morning").innerHTML = "";
    }

    // Total usage 
    let totalUsage = m + a + e;
    document.getElementById("receipt-totalUsage").innerHTML = totalUsage.toFixed(2);

    // Solar Energy discount
    var solarEnergy = document.getElementById("solar-energy");
    let discount = 0, solarTotal;
    if (solarEnergy.checked == true) {
        discount = 0.2;
        solarTotal = totalUsage * discount;
        document.getElementById("receipt-solarEnergy").innerHTML = "20%";
    }
    else {
        solarTotal = 0;
    }
    document.getElementById("receipt-solarEnergy").innerHTML = solarTotal.toFixed(2);

    // Provincial total for selecting British Columbia 
    var provincialCredit = document.getElementById("Province"), provincialTotal;
    if (provincialCredit.value == "BritishColumbia") {
        document.getElementById("receipt-provincialRate").innerHTML = "$50.00";
        provincialTotal = document.getElementById("receipt-provincialCredit").innerHTML = "50.00";

        if (solarTotal < 0) {
            provincialTotal = document.getElementById("receipt-provincialCredit").innerHTML = "0";
        }
    }   /*privincial total for selecting any other province */
    else {
        provincialTotal = document.getElementById("receipt-provincialCredit").innerHTML = "0";
    }

    // Printing sub total 
    var subTotal = (totalUsage - solarTotal) - parseFloat(provincialTotal);
    if (provincialCredit.value == "BritishColumbia" && subTotal < 0) {
        subTotal = 0
    }
    document.getElementById("receipt-subtotal").innerHTML = subTotal.toFixed(2);

    // Adding tax according to province 
    var total;
    if (provincialCredit.value == "BritishColumbia") {
        taxRate = "15.00%";
        taxAmt = subTotal * 0.15;
        total = subTotal + taxAmt;
    }
    else if (provincialCredit.value == "Alberta") {
        taxRate = "0.00%";
        taxAmt = subTotal * 0;
        total = subTotal + taxAmt;
    }
    else if (provincialCredit.value == "Quebec") {
        taxRate = "7.00%";
        taxAmt = subTotal * 0.07;
        total = subTotal + taxAmt;
    }

    // Printing tax rate 
    document.getElementById("receipt-taxRate").innerHTML = taxRate;

    // Printing tax amount 
    document.getElementById("receipt-taxTotal").innerHTML = taxAmt.toFixed(2);

    // Printing final total 
    document.getElementById("receipt-finalTotal").innerHTML = total.toFixed(2);

}

// Adding condition to auto-check for province British Columbia 
var solarEnergy = document.getElementById("solar-energy");
var province = document.getElementById("Province");
province.addEventListener("mouseup", check);
function check() {
    if (province.value == "BritishColumbia") {
        solarEnergy.checked = true;
    }
}