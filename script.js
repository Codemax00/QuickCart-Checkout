function login() {

    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    if (username === "tester" && password === "Test@123") {
 

        window.location.href = "dashboard.html";
    }
    else {
        document.getElementById("msg").innerHTML = "Invalid Username or Password";
    }

}

function clearFields() {

    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
    document.getElementById("msg").innerHTML = "";

}

function calculate() {

    let price = parseInt(document.getElementById("product").value);

    let qty = parseInt(document.getElementById("qty").value);

    let delivery = parseInt(document.getElementById("delivery").value);

    let total = price * qty;

    if (document.getElementById("gift").checked) {
        total = total + 100;
    }

    if (document.getElementById("coupon").value === "SAVE10") {
        total = total - 100;
    }

    total = total + delivery;

    document.getElementById("total").innerHTML = "Grand Total : ₹" + total;

}

function resetForm() {

    document.getElementById("product").selectedIndex = 0;
    document.getElementById("qty").value = "";
    document.getElementById("coupon").value = "";
    document.getElementById("delivery").selectedIndex = 0;
    document.getElementById("gift").checked = false;
    document.getElementById("total").innerHTML = "Grand Total : ₹0";

}