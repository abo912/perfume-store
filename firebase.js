<!-- Firebase SDK (نسخة compat) -->
<script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-storage-compat.js"></script>

<script>
  const firebaseConfig = {
    apiKey: "AIzaSyCupIH2BoNfe3fOQAiS8ZlZ8WcZJw2760M",
    authDomain: "perfume-store-3c1db.firebaseapp.com",
    projectId: "perfume-store-3c1db",
    storageBucket: "perfume-store-3c1db.appspot.com",
    messagingSenderId: "203218731874",
    appId: "1:203218731874:web:5a3cc419be29f5e7e1e23b"
  };

  // تهيئة Firebase
  firebase.initializeApp(firebaseConfig);

  // إنشاء قواعد البيانات والتخزين
  const db = firebase.firestore();
  const storage = firebase.storage();
</script>
