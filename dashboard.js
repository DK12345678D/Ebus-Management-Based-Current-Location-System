const busForm = document.getElementById('bus-location-form');
const locationResults = document.getElementById('location-results');
const logoutBtn = document.getElementById('logout');

busForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const source = document.getElementById('source').value;
    const destination = document.getElementById('destination').value;

    db.collection('buses').where('source', '==', source).where('destination', '==', destination).get()
        .then(querySnapshot => {
            locationResults.innerHTML = '';
            querySnapshot.forEach(doc => {
                const busData = doc.data();
                locationResults.innerHTML += `
                    <div>
                        <p>Bus Type: ${busData.type}</p>
                        <p>Arrival Time: ${busData.arrivalTime}</p>
                        <p>Contact: ${busData.contact}</p>
                    </div>
                `;
            });
        })
        .catch(error => {
            console.error(error.message);
        });
});

logoutBtn.addEventListener('click', () => {
    auth.signOut()
        .then(() => {
            window.location.href = 'login.html';
        });
});
