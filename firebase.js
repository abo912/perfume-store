<!-- Firebase SDK -->
<script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-storage-compat.js"></script>

<script>
  const firebaseConfig = {
    apiKey: "XXXX",
    authDomain: "XXXX.firebaseapp.com",
    projectId: "XXXX",
    storageBucket: "XXXX.appspot.com",
    messagingSenderId: "XXXX",
    appId: "XXXX"
  };

  firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore();
  const storage = firebase.storage();
</script>