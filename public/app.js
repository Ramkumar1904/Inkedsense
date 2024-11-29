// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getFirestore, collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB0GPzDloUKwT5oNW24ZG6T38-8ZGXhpJI",
    authDomain: "inkedsense-f2e23.firebaseapp.com",
    projectId: "inkedsense-f2e23",
    storageBucket: "inkedsense-f2e23.appspot.com",
    messagingSenderId: "311301259622",
    appId: "1:311301259622:web:f0b24ef3b5b4632bfbc8a7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Function to fetch book recommendations
async function recommendBooks() {
    const mood = document.getElementById('mood').value; // Get selected mood
    const recommendationsDiv = document.getElementById('recommendations');
    recommendationsDiv.innerHTML = ''; // Clear previous recommendations

    try {
        // Query Firestore for books matching the selected mood
        const q = query(collection(db, 'books'), where('mood', '==', mood));
        const querySnapshot = await getDocs(q);

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
        recommendationsDiv.innerHTML = `<p>Error retrieving recommendations. Check console for details.</p>`;
        console.error("Error getting recommendations: ", error);
    }
}

// Attach event listener to button
document.getElementById('getRecommendations').addEventListener('click', recommendBooks);
