import Firebase from 'firebase'

var config = {
    apiKey: "AIzaSyBFGEAdsmw8Mmp-Qqg-iaXPaczEHy5sEMs",
    authDomain: "polis-platform.firebaseapp.com",
    databaseURL: "https://polis-platform.firebaseio.com",
    projectId: "polis-platform",
    storageBucket: "polis-platform.appspot.com",
    messagingSenderId: "703293438442"
}
const app = Firebase.initializeApp(config)

export default app




