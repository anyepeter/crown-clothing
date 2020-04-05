import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyCo1SqySrGqkUcTguJxK-DZaskqetnuoW0",
  authDomain: "crw-cloth.firebaseapp.com",
  databaseURL: "https://crw-cloth.firebaseio.com",
  projectId: "crw-cloth",
  storageBucket: "crw-cloth.appspot.com",
  messagingSenderId: "648050774695",
  appId: "1:648050774695:web:561585fa1fd04a4de64182",
  measurementId: "G-B4NP6ZCHTC"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get()
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }
  return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompts: 'select_accounts' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;