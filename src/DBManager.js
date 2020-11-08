import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyD0TTlgqUshIPf9kn5EN2qvVX408aKyjkE",
    authDomain: "x-o-multiplayer.firebaseapp.com",
    databaseURL: "https://x-o-multiplayer.firebaseio.com",
    projectId: "x-o-multiplayer",
    storageBucket: "x-o-multiplayer.appspot.com",
    messagingSenderId: "143369733582",
    appId: "1:143369733582:web:5a5a1c5a2d15189102d79f",
    measurementId: "G-0FQ4CW8KD9"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

const database = firebase.database();

const USERS_COLLECTION = 'users';
const BOXES_COLLECTION = 'boxes';
const CURRENT_PLAYER = 'currentPlayer';

class DBManager {

	static getUsers = (onNewUserAdded) => {
		database.ref(USERS_COLLECTION).on('value', (snap) => onNewUserAdded(snap.val()));
	}
	// static getUsers = () => {
	// 	const promise = database.ref(USERS_COLLECTION).once('value').then((snap) => {
	// 		return snap.val() || [];
	// 	})

	// 	return promise;
	// }
	

	static createNewUser = (userName) => {;
		return database.ref(USERS_COLLECTION).push({name: userName}).then((snap) => {
			return {
				name: userName,
				id: snap.key
			};
		});
	}	

	static setUsers = (users) => {
		database.ref(USERS_COLLECTION).set(users).then(() => {
		});
	}

	
	static getCurrentUser = (onCurrentUserChange) => {	
		database.ref(CURRENT_PLAYER).on('value', (snap) => {
			onCurrentUserChange(snap.val());
		})
	}

	static setCurrentUser = (currentUser) => {
		console.log('currentUser', currentUser);
		return database.ref(CURRENT_PLAYER).set(currentUser).then(() => {
		});
	}

	
	static getBoxes = () => {
		database.ref(BOXES_COLLECTION).once('value').then((snap) => {
			// return snap.val() || this.props.boxes;
			return snap.val();
		});
	}

	static getBoxesLive = (onValueAdded) => {
		database.ref(BOXES_COLLECTION).on('value' , (snap) => {
			onValueAdded(snap.val());
		});
		
	}

	static setBoxes = (boxes) => {
		database.ref(BOXES_COLLECTION).set(boxes).then(()=>{
		});
	}	
}

export default DBManager;