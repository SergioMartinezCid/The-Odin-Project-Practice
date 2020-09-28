const popup = document.querySelector('#popup');
popup.style.display = 'none';
const imgWhereWaldo = document.querySelector('#img-where-waldo');

const button_levels = document.querySelector('#button-levels');
const button_login = document.querySelector('#button-login');
const button_logout = document.querySelector('#button-logout');
const char_select = document.querySelector('#char-select');

let charSelTimeout = null;
let gameStarted = false;
let gameId = '';

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
    } else {
      // User is signed out.
        button_logout.hidden = true;
        button_login.hidden = false;
        button_levels.disabled = true;
        imgWhereWaldo.src = 'images/waldo-original-image.png';
        gameStarted = false;
        if (gameId !== ''){
            firebase.functions().httpsCallable('cancelGame')({gameId});
        }
    }
});

async function fillBoardList(){
    const querySnapshot = await firebase.firestore().collection('boards').get();
    return querySnapshot.docs.map(doc => {return {name: doc.data().name, id: doc.id}});
}

function generateBoardButtons(parentDiv, boardList){
    boardList.forEach(board => {
        const divLevel = document.createElement('button');
        divLevel.innerText = board.name;
        divLevel.addEventListener('click', async (event) => {
            popup.style.display = 'none';
            try {
                const newGame = await firebase.functions().httpsCallable('startGame')({boardId: board.id});
                console.log(newGame);
                imgWhereWaldo.src = newGame.subpath;
                gameId = newGame.gameId;
            } catch (error) {
                alert(error.message);
            }
            gameStarted = true;
        });
        parentDiv.appendChild(divLevel);
    });
}

async function generateLevelSelector(){
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

button_levels.addEventListener('click', async (event) => {
    popup.style.display = 'flex';
    popup.childNodes.forEach(child => child.remove());
    popup.appendChild(await generateLevelSelector());
});

imgWhereWaldo.addEventListener('click', event => {
    // Odlaw widthRatio 0.2431640625 heightRatio 0.5026041666666666 main.js:2:13
    // Waldo widthRatio 0.53125 heightRatio 0.5026041666666666 main.js:2:13
    // Wizard widthRatio 0.62890625 heightRatio 0.5104166666666666 main.js:2:13
    // Wizard (the farthest from the center) radiuswidthRatio 0.6279296875 heightRatio 0.4713541666666667
    console.log(`widthRatio ${(event.pageX - event.target.offsetLeft)/event.target.clientWidth} heightRatio ${(event.pageY - event.target.offsetTop)/event.target.clientHeight}`)

    if (gameStarted){
        char_select.style.top = event.pageY+'px';
        char_select.style.left = event.pageX+'px';
        char_select.hidden = false;
        if (charSelTimeout){
            clearTimeout(charSelTimeout);
        }
        charSelTimeout = setTimeout(() => char_select.hidden = true, 5000);
    }
});
