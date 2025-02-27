// app.js

// User Registration
document.getElementById('register-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(userCredential => {
            const user = userCredential.user;
            console.log('User registered:', user);
            alert('User registered successfully!');
            // Store additional data like first name and last name
            firebase.firestore().collection('users').doc(user.uid).set({
                firstName: firstName,
                lastName: lastName
            });
            window.location.href = 'login.html';
        })
        .catch(error => {
            console.error('Error registering user:', error);
            alert('Error registering: ' + error.message);
        });
});

// User Login
document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(userCredential => {
            const user = userCredential.user;
            console.log('User logged in:', user);
            window.location.href = 'user.html';
        })
        .catch(error => {
            console.error('Error logging in:', error);
            alert('Error logging in: ' + error.message);
        });
});
