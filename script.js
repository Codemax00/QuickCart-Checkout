// Tab Switching
function switchTab(tab) {
    // Clear messages
    document.getElementById("msg").innerHTML = "";
    document.getElementById("msg").className = "";

    if (tab === 'signin') {
        document.getElementById("signInTab").classList.add("active");
        document.getElementById("signUpTab").classList.remove("active");
        document.getElementById("signInForm").classList.add("active");
        document.getElementById("signUpForm").classList.remove("active");
    } else {
        document.getElementById("signUpTab").classList.add("active");
        document.getElementById("signInTab").classList.remove("active");
        document.getElementById("signUpForm").classList.add("active");
        document.getElementById("signInForm").classList.remove("active");
    }
}

// Get accounts from localStorage
function getUsers() {
    let users = localStorage.getItem("registeredUsers");
    return users ? JSON.parse(users) : [];
}

// Save accounts to localStorage
function saveUsers(users) {
    localStorage.setItem("registeredUsers", JSON.stringify(users));
}

// Registration (Sign Up)
function signUp() {
    let username = document.getElementById("regUsername").value.trim();
    let email = document.getElementById("regEmail").value.trim();
    let password = document.getElementById("regPassword").value;
    let confirmPassword = document.getElementById("regConfirmPassword").value;
    let msgEl = document.getElementById("msg");

    if (!username || !email || !password || !confirmPassword) {
        msgEl.innerHTML = "All fields are required!";
        msgEl.className = "error";
        return;
    }

    if (username.length < 3) {
        msgEl.innerHTML = "Username must be at least 3 characters.";
        msgEl.className = "error";
        return;
    }

    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        msgEl.innerHTML = "Please enter a valid email address.";
        msgEl.className = "error";
        return;
    }

    if (password.length < 6) {
        msgEl.innerHTML = "Password must be at least 6 characters.";
        msgEl.className = "error";
        return;
    }

    if (password !== confirmPassword) {
        msgEl.innerHTML = "Passwords do not match!";
        msgEl.className = "error";
        return;
    }

    let users = getUsers();
    
    // Check if username is already taken
    let userExists = users.some(u => u.username.toLowerCase() === username.toLowerCase());
    if (userExists || username.toLowerCase() === "tester") {
        msgEl.innerHTML = "Username is already taken!";
        msgEl.className = "error";
        return;
    }

    // Store new credentials
    users.push({ username, email, password });
    saveUsers(users);

    msgEl.innerHTML = "Registration successful! Switching to Sign In...";
    msgEl.className = "success";

    // Clear register form
    clearFields('signup');
    
    // Transition to Sign In after registration success
    setTimeout(() => {
        switchTab('signin');
        document.getElementById("username").value = username;
        document.getElementById("password").focus();
    }, 1500);
}

// Log In (Sign In)
function login() {
    let username = document.getElementById("username").value.trim();
    let password = document.getElementById("password").value;
    let msgEl = document.getElementById("msg");

    if (!username || !password) {
        msgEl.innerHTML = "Please enter username and password.";
        msgEl.className = "error";
        return;
    }

    // 1. Check hardcoded tester credentials first
    if (username === "tester" && password === "Test@123") {
        msgEl.innerHTML = "Login successful! Redirecting...";
        msgEl.className = "success";
        setTimeout(() => {
            window.location.href = "dashboard.html";
        }, 1000);
        return;
    }

    // 2. Check localStorage credentials
    let users = getUsers();
    let user = users.find(u => u.username.toLowerCase() === username.toLowerCase() && u.password === password);

    if (user) {
        msgEl.innerHTML = "Login successful! Redirecting...";
        msgEl.className = "success";
        setTimeout(() => {
            window.location.href = "dashboard.html";
        }, 1000);
    } else {
        msgEl.innerHTML = "Invalid Username or Password";
        msgEl.className = "error";
    }
}

// Clear fields based on active form
function clearFields(formType) {
    if (formType === 'signin') {
        document.getElementById("username").value = "";
        document.getElementById("password").value = "";
    } else if (formType === 'signup') {
        document.getElementById("regUsername").value = "";
        document.getElementById("regEmail").value = "";
        document.getElementById("regPassword").value = "";
        document.getElementById("regConfirmPassword").value = "";
    } else {
        document.getElementById("username").value = "";
        document.getElementById("password").value = "";
        document.getElementById("msg").innerHTML = "";
        document.getElementById("msg").className = "";
    }
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