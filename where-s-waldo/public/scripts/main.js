const popup = document.querySelector('#popup');
popup.style.display = 'none';
const imgWhereWaldo = document.querySelector('#img-where-waldo');

const button_levels = document.querySelector('#button-levels');
const button_login = document.querySelector('#button-login');
const button_logout = document.querySelector('#button-logout');

async function fillBoardList(){
    const querySnapshot = await firebase.firestore().collection('boards').get();
    return querySnapshot.docs.map(doc => doc.data()).filter(board => !!board.isValid);
}

function generateBoardButtons(parentDiv, boardList){
    boardList.forEach(board => {
        const divLevel = document.createElement('button');
        divLevel.innerText = board.name;
        divLevel.addEventListener('click', async (event) => {
            popup.style.display = 'none';
            try {
                imgWhereWaldo.src = await firebase.storage().ref().child('playable-boards')
                                    .child(board.subpath).getDownloadURL();
                } catch (error) {
                alert(error.message);
            }
        });
        parentDiv.appendChild(divLevel);
    });
}

async function generateLevelSelector(){
    popup.hidden = false;
    const divLevels = document.createElement('div');
    divLevels.classList.toggle('white-rectangle');
    const subtitle = document.createElement('h2');
    subtitle.innerText = 'Select one of the levels: ';
    divLevels.appendChild(subtitle);

    try {
        generateBoardButtons(divLevels, await fillBoardList());
    } catch (error) {
        alert(error.message);
    }
    return divLevels;
}

function getUserName() {
    return firebase.auth().currentUser.displayName;
}

function isUserSignedIn() {
    return !!firebase.auth().currentUser;
}

button_login.addEventListener('click', event => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider);
});

button_logout.addEventListener('click', event => {
    firebase.auth().signOut();
});

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
        button_login.hidden = true;
        button_logout.hidden = false;
        button_logout.innerText = `SIGN OUT, ${getUserName()}`;
        button_levels.disabled = false;
        // var displayName = user.displayName;
        // var email = user.email;
        // var emailVerified = user.emailVerified;
        // var photoURL = user.photoURL;
        // var isAnonymous = user.isAnonymous;
        // var uid = user.uid;
        // var providerData = user.providerData;
    } else {
      // User is signed out.
        button_logout.hidden = true;
        button_login.hidden = false;
        button_levels.disabled = true;
    }
});

button_levels.addEventListener('click', async (event) => {
    // popup.appendChild(await generateLevelSelector());
    popup.style.display = 'flex';
    popup.childNodes.forEach(child => child.remove());
    popup.appendChild(await generateLevelSelector());
});

document.querySelector('#img-where-waldo').addEventListener('click', event => {
    // Odlaw widthRatio 0.2431640625 heightRatio 0.5026041666666666 main.js:2:13
    // Waldo widthRatio 0.53125 heightRatio 0.5026041666666666 main.js:2:13
    // Wizard widthRatio 0.62890625 heightRatio 0.5104166666666666 main.js:2:13
    // Wizard (the farthest from the center) radiuswidthRatio 0.6279296875 heightRatio 0.4713541666666667
    console.log(`widthRatio ${(event.pageX - event.target.offsetLeft)/event.target.clientWidth} heightRatio ${(event.pageY - event.target.offsetTop)/event.target.clientHeight}`)
});
