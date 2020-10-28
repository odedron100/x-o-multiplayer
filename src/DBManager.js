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

// const USERS_COLLECTION_NAME = 'opponent';
const USERS_COLLECTION = 'users';
const STEPS_COLLECTION = 'steps';
const CURRENT_PLAYER = 'currentPlayer';

class DBManager {
	// static getSingleItem = (itemName) => {
	// 	return JSON.parse(localStorage.getItem(itemName));
	// }

	// static setSingleItem = (itemName, newItem) => {
	// 	localStorage.setItem(itemName, JSON.stringify(newItem));
	// }


	static getUsers = () => {	
		const promise = database.ref(USERS_COLLECTION).once('value').then((snap) => {
			return snap.val();
		})
		return promise;
	}

	// static getUser = (id) => {
	// 	const promise = database.ref(`${USERS_COLLECTION_NAME}/${id}`).once('value').then((snap) => {
	// 		const user = snap.val();

	// 		if (!user) {
	// 			throw new Error("User not found!");
	// 		}
	// 		return {...user, id};
	// 	});

		// return promise;
	// }

	static createNewUser = (user) => {;
		return database.ref(USERS_COLLECTION).push(user).then((snap) => {
			return {
				...user,
				id: snap.key
			};
		});
	}	

	static setUsers = (users) => {
		database.ref(USERS_COLLECTION).set(users).then(() => {
		});
	}

	// static createNewUser = (user) => {;
	// 	return database.ref(USERS_COLLECTION_NAME).push(user).then((snap) => {
	// 		return {
	// 			...user,
	// 			id: snap.key
	// 		};
	// 	});


	// }

	// static getAgents = () => {
	// 	return DBManager.getFromCollection(AGENTS_COLLECTION_NAME);
	// }

	// static setAgents = (somethingToWrite) => {
	// 	DBManager.setInCollection(AGENTS_COLLECTION_NAME, somethingToWrite);
	// }

	// static getMessages = (userId, onNewMessageAdded) => {
	// 	database.ref(`chats/${userId}/${MESSAGES_COLLECTION_NAME}`).on('value', (snap) => {
	// 		onNewMessageAdded(snap.val());
	// 	});
	// }

	// static setSteps = (userId, step) => {
	// 	database.ref(`chats/${userId}/${MESSAGES_COLLECTION_NAME}`).set(messages);
	// }

	static getCurrentUser = () => {
		return DBManager.getSingleItem(CURRENT_PLAYER);
	}

	static setCurrentUser = (newUser) => {
		DBManager.setSingleItem(CURRENT_PLAYER, newUser);
	}
}

export default DBManager;