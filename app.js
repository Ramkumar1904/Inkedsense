const firebaseConfig = {
    apiKey: "AIzaSyB0GPzDloUKwT5oNW24ZG6T38-8ZGXhpJI",
    authDomain: "inkedsense-f2e23.firebaseapp.com",
    projectId: "inkedsense-f2e23",
    storageBucket: "inkedsense-f2e23.firebasestorage.app",
    messagingSenderId: "311301259622",
    appId: "1:311301259622:web:f0b24ef3b5b4632bfbc8a7"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

async function recommendBooks() {
    const mood = document.getElementById('mood').value;
    const recommendationsDiv = document.getElementById('recommendations');
    recommendationsDiv.innerHTML = ''; // Clear previous recommendations

    try {
        const querySnapshot = await db.collection('books').where('mood', '==', mood).get();
        if (querySnapshot.empty) {
            recommendationsDiv.innerHTML = `<p>No recommendations available for this mood.</p>`;
        } else {
            querySnapshot.forEach(doc => {
                const book = doc.data();
                const bookElement = document.createElement('p');
                bookElement.textContent = `${book.title} by ${book.author}`;
                recommendationsDiv.appendChild(bookElement);
            });
        }
    } catch (error) {
        console.error("Error getting recommendations: ", error);
    }
}
