
const button = document.getElementById('Sign-btn')
    .addEventListener('click', function () {
        console.log('Done')

        // step-2 input Number call
        const Username = document.getElementById('Username')
        const UsernameValu = Username.value
        // console.log(nubValue)

        // step-3 input pin call
        const Password = document.getElementById('password')
        const PasswordValu = Password.value



        // step-4 
        if (UsernameValu === "admin" && PasswordValu === "admin123") {
            alert("Login successful! Welcome back.");
            window.location.href = "home.html";
        }

        else if (UsernameValu !== "admin" && PasswordValu !== "admin123") {
            alert("Incorrect Username and Password");
        }

        else if (UsernameValu === "admin" && PasswordValu !== "admin123") {
            alert("This Password is not correct for this Username");
        }

        else if (UsernameValu !== "admin") {
            alert("Incorrect Username");
        }



    })

