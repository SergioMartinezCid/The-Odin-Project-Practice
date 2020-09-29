import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp();

export const startGame = functions.https.onCall((data, context) => {
    if (!context.auth) return {status: 'error', code: 401, message: 'Not signed in'}

    return new Promise(async (resolve, reject) => {
        // Returns the subpath to the image, game token and starts the game on the backend
        const imageEntry = await admin.firestore().collection('boardImages').doc(data.boardId).get();
        if (imageEntry.get('subpath') == null){
            reject('boardId not found');
            return;
        }

        const downloadPath = `playable-boards/${imageEntry.data().subpath}`;

        const newGame = await admin.firestore().collection('games').add(
            {
                start: admin.firestore.Timestamp.now(),
                uid: context.auth.uid,
                boardId: data.boardId,
                foundWaldo: false,
                foundOdlaw: false,
                foundWizard: false,
            }
        );
        resolve({path: downloadPath, gameId : newGame.id})
    });
});

export const submitAnswer = functions.https.onCall((data, context) => {
    if (!context.auth) return {status: 'error', code: 401, message: 'Not signed in'}

    return new Promise(async (resolve, reject) => {

        let gameEntry = await admin.firestore().collection('games').doc(data.gameId).get();
        if (gameEntry.get('uid') == null){
            resolve({won: false, message: 'Invalid gameId'});
            return;
        }

        if (gameEntry.get(`found${data.character}`) === true){
            resolve({won: false, message: 'Character already scored'});
            return;
        }

        const boardSolutions = await admin.firestore().collection('positions').doc(gameEntry.get('boardId')).get();
        if (boardSolutions.data() == null){
            resolve({won: false, message: 'Invalid board'});
            return;
        }
        if (Math.abs(boardSolutions.get(`${data.character}X`) - data.clickedX) > 0.05 ||
            Math.abs(boardSolutions.get(`${data.character}Y`) - data.clickedY) > 0.05){
                resolve({won:false, message: 'Wrong position for that character'});
                return;
        }

        await admin.firestore().collection('games').doc(data.gameId).set({
            [`found${data.character}`]: true
        }, { merge: true });

        gameEntry = await admin.firestore().collection('games').doc(data.gameId).get();
        if (gameEntry.get('foundWaldo') && gameEntry.get('foundOdlaw') && gameEntry.get('foundWizard')){
            const endTime = admin.firestore.Timestamp.now();
            await admin.firestore().collection('games').doc(data.gameId).set({
                end: endTime
            }, {merge: true});
            
            resolve({won: true, message: `You won!. It took you ${Math.trunc(endTime.seconds - gameEntry.get('start').seconds)} seconds`})
        } else {
            resolve({won: false, message: 'Correct!'});
        }
    });
});

/*
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

        const boardSolutions = await firebase.firestore().collection('positions').doc(gameEntry.get('boardId')).get();
        if (boardSolutions.data() == null){
            reject('Invalid board');
            return;
        }
        if (Math.abs(boardSolutions.get(`${character}X`) - clickedX) > 0.05 ||
            Math.abs(boardSolutions.get(`${character}Y`) - clickedY) > 0.05){
                resolve({message: 'Wrong position for that character'});
                return;
        }

        await firebase.firestore().collection('games').doc(gameId).set({
            [`found${character}`]: true
        }, { merge: true });

        gameEntry = await firebase.firestore().collection('games').doc(gameId).get();
        if (gameEntry.get('foundWaldo') && gameEntry.get('foundOdlaw') && gameEntry.get('foundWizard')){
            const endTime = Date.now();
            await firebase.firestore().collection('games').doc(gameId).set({
                end: endTime
            }, {merge: true});
            
            resolve({won: true, message: `You won!. It took you ${Math.trunc((gameEntry.get('start') - endTime)/1000)} seconds`})
        } else {
            resolve({won: false, message: 'Correct!'});
        }
    });
}
*/
