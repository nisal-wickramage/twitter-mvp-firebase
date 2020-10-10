const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const db = firebase.firestore();
var storage = firebase.storage();

var userRef;


let profileRef;
let unsubscribe;

var signInBtn = document.getElementById('signinbtn');
var signOutBtn = document.getElementById('signoutbtn');
var username = document.getElementById('username');
var updateButton = document.getElementById('updateuserinfo');
var firstname = document.getElementById('firstname');
var lastname = document.getElementById('lastname');
var dateofbirth = document.getElementById('dateofbirth');
var userprofile = document.getElementById('userprofile');
var fileUploadElement = document.getElementById('uploadProfilePic');
var profilePicElement = document.getElementById('profilepicture');


signInBtn.onclick = () => auth.signInWithPopup(provider);

signOutBtn.onclick = () => auth.signOut();

fileUploadElement.addEventListener("change", uploadProfilePicture, false);

function initProfileInfo(uid){
    db.collection('UserProfiles').doc(uid).get().then(profile => {
        const data = profile.data();
        if(data)
        {
            firstname.value = data.FirstName === undefined ? '': data.FirstName;
            lastname.value = data.LastName === undefined ? '': data.LastName;
            dateofbirth.value = data.DateOfBirth === undefined ? '': data.DateOfBirth;
            if(data.profilePicUrl) { 
                setProfilePicUrl(data.profilePicUrl);
            }
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
    db.collection('UserProfiles').doc(uid).set(profileData, { merge: true }).then(()=> console.log('updated!'));
}

function setProfilePicture(uid) {
    storage.ref().child(`profilepic/${uid}.jpg`);
}

function uploadProfilePicture() {
    let file = this.files[0];
    let profilePicRef = storage.ref().child(`profilepic/${userRef.uid}.jpg`);
    profilePicRef.put(file).then(function(snapshot) {
        console.log(snapshot.metadata.fullpath);
        setProfilePicUrl(snapshot.metadata.fullpath);
      }).catch(error => console.log(error));
}

function setProfilePicUrl(profilePicUrl) {
    if(profilePicUrl){
        console.log(profilePicUrl);
        storage.ref().child(profilePicUrl).getDownloadURL()
            .then(url => { 
                console.log(url);
                profilePicElement.src = url;
            });
    }
}

auth.onAuthStateChanged(user => {
    if(user) {
        signInBtn.hidden = true;
        signOutBtn.hidden = false;
        userprofile.hidden = false;
        username.innerHTML = `Hello ${user.displayName}`;
        initProfileInfo(user.uid);
        updateButton.onclick = () => updateData(user.uid);
        userRef = user;
    } else {
        signInBtn.hidden = false;
        userprofile.hidden = true;
        signOutBtn.hidden = true;
        username.innerHTML = `Hello`;
        updateButton.onclick = null;
        userRef = undefined;
    }
});



