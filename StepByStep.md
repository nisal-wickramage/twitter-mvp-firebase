# Steps
## Set up project
1. Create a firebase porject
2. Add a web app
3. Login to firebase project with firebase cli
```
firebase login
```
4. Initialize firebase project with firebase cli. Go with existing firebase project and select the newly created project.
```
firebase init
```
5. Run following to run the project locally
```
firebase serve --only hosting
```
6. Browse to http://localhost:5000 to see the initialized project.
7. Deploying web app to firebase project
```
firebase deploy --only hosting
```
8. Browse and see the deployed web app

## Setting up auth

1. Create a sign-in method using google accounts
2. Add a js/main.js and add following code to enable user login logout.
``` javascript
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
let profileRef;
let unsubscribe;

var signInBtn = document.getElementById('signinbtn');
var signOutBtn = document.getElementById('signoutbtn');
var userdetails = document.getElementById('userdetails');

signInBtn.onclick = () => auth.signInWithPopup(provider);

signOutBtn.onclick = () => auth.signOut();

auth.onAuthStateChanged(user => {
    if(user) {
        console.log(user);
        signInBtn.hidden = true;
        signOutBtn.hidden = false;
        userdetails.innerHTML = `Hello ${user.displayName}`;
    } else {
        signInBtn.hidden = false;
        signOutBtn.hidden = true;
        userdetails.innerHTML = `Hello`;
    }
});
```

## Update profile info
1. Enable firestore database on firebase web console.
2. Create root level collection 'UserInfo'.
    - Schema
        - UserId: string
        - FirstName: string
        - LastName: string
        - DateOfBirth: timestamp
3. Following functions can be used to save and read data from firestore
```  javascript
function initProfileInfo(uid){
    db.collection('UserProfiles').doc(uid).get().then(profile => {
        const data = profile.data();
        if(data)
        {
            firstname.value = data.FirstName === undefined ? '': data.FirstName;
            lastname.value = data.LastName === undefined ? '': data.LastName;
            dateofbirth.value = data.DateOfBirth === undefined ? '': data.DateOfBirth;
        }
    });
}

function updateData(uid){
    var profileData = {
        UserId: uid,
        FirstName: firstname.value,
        LastName: lastname.value,
        DateOfBirth: dateofbirth.value
    };
    db.collection('UserProfiles').doc(uid).set(profileData).then(()=> console.log('updated!'));
}
```

## upload profile pic
1. Enable storage in firebase project.
2. Verify the reference to ```<script defer src="/__/firebase/7.21.1/firebase-storage.js"></script>```
3. Add event handler to file input.
``` javascript
fileUploadElement.addEventListener("change", uploadProfilePicture, false);
```
4. Implement the event handler
``` javascript
function uploadProfilePicture() {
    let file = this.files[0];
    let profilePicRef = storage.ref().child(`profilepic/${userRef.uid}.jpg`);
    profilePicRef.put(file).then(function(snapshot) {
        console.log('Uploaded a blob or file!');
      }).catch(error => console.log(error));
}
```
5. 


