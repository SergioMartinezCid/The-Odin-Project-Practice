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
let clickedX = null;
let clickedY = null;

function submitAnswer(gameId, character, clickedX, clickedY){

    return new Promise(async (resolve, reject) => {
        let gameEntry = await firebase.firestore().collection('games').doc(gameId).get();
        if (gameEntry.get('uid') == null){
            reject('Invalid gameId');
            return;
        }

        if (gameEntry.get(`found${character}`) === true){
            reject('Character already scored');
            return;
        }

        // TODO Retrieve positions correctly
        const boardSolutions = await firebase.firestore().collection('positions').doc(gameEntry.get('boardId')).get();
        if (boardSolutions.get('WaldoX') == null){
            reject('Invalid board');
            return;
        }
        console.log(boardSolutions.data().WaldoX, clickedX);
        console.log(boardSolutions.data().WaldoY, clickedY);
        if (Math.abs(boardSolutions.get(`${character}X`) - clickedX) > 0.01 ||
            Math.abs(boardSolutions.get(`${character}Y`) - clickedY) > 0.01){
                resolve({message: 'Wrong position for that character'});
                return;
        }

        await firebase.firestore().collection('games').doc(gameId).set({
            [`found${character}`]: true
        }, { merge: true });

        gameEntry = await firebase.firestore().collection('games').doc(gameId).get();
        if (gameEntry.get('foundWaldo') && gameEntry.get('foundOdlaw') && gameEntry.get('foundWizard')){
            resolve({message: `You won!. It took you ${1}`})
        } else {
            resolve({message: 'Correct!'});
        }
    });
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
    } else {
      // User is signed out.
        button_logout.hidden = true;
        button_login.hidden = false;
        button_levels.disabled = true;
        imgWhereWaldo.src = 'images/waldo-original-image.png';
        gameStarted = false;
        gameId = '';
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
                imgWhereWaldo.src = await firebase.storage().ref(newGame.data.path).getDownloadURL(); ;
                gameId = newGame.data.gameId;
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
    // Wizard widthRatio 0.62890625 heightRatio 0.5104166666666666 main.js:2:13
    // Wizard (the farthest from the center) radiuswidthRatio 0.6279296875 heightRatio 0.4713541666666667
    console.log(`widthRatio ${(event.pageX - event.target.offsetLeft)/event.target.clientWidth} heightRatio ${(event.pageY - event.target.offsetTop)/event.target.clientHeight}`)

    if (gameStarted){
        char_select.style.top = event.pageY+'px';
        char_select.style.left = event.pageX+'px';
        char_select.hidden = false;
        clickedX = (event.pageX - event.target.offsetLeft)/event.target.clientWidth;
        clickedY = (event.pageY - event.target.offsetTop)/event.target.clientHeight;
        if (charSelTimeout){
            clearTimeout(charSelTimeout);
        }
        charSelTimeout = setTimeout(() => {
            char_select.hidden = true;
            clickedX = null;
            clickedY = null;
        }, 5000);
    }
});

char_select.querySelectorAll('td').forEach(td => {
    td.addEventListener('click', async () => {
        if (gameId !== '' && clickedX != null && clickedY != null){
            // const result = await firebase.functions().httpsCallable('submitAnswer')({});
            try {
                const result = await submitAnswer(gameId, td.dataset.character, clickedX, clickedY);
                alert(result.message)
            } catch (error) {
                alert(error);
            }
        }
    });
});
