import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp();

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

export const startGame = functions.https.onCall((data, context) => {
    if (!context.auth) return {status: 'error', code: 401, message: 'Not signed in'}

    return new Promise(async (resolve, reject) => {
        // Returns the subpath to the image, game token and starts the game on the backend
        const imageEntry = await admin.firestore().collection('boardImages').doc(data.boardId).get();
        if (imageEntry.data().subpath == null){
            reject('boardId not found');
        }

        const newGame = await admin.firestore().collection('games').add(
            {
                start: admin.firestore.Timestamp.now(),
                uid: context.auth.uid,
            }
        );
        resolve(typeof imageEntry);
        resolve({subpath: imageEntry.data().subpath, gameId : newGame.id})
    });
});

export const cancelGame = functions.https.onCall((data, context) => {
    if (!context.auth) return {status: 'error', code: 401, message: 'Not signed in'}

    return new Promise(async (resolve, reject) => {
        const entry = await admin.firestore().collection('games').doc(data.gameId).get();
        if (entry == null){
            reject('gameId not found');
        }
        if (context.auth?.uid !== entry.data().uid){
            reject('Only the user who is playing that game can cancel it');
        }
        await admin.firestore().collection('games').doc(data.gameId).delete();
    });
});

/*
export const submitAnswer = functions.https.onCall((data, context) => {
    if (!context.auth) return {status: 'error', code: 401, message: 'Not signed in'}

    return new Promise((resolve, reject) => {

    });
});

export const getRecords = functions.https.onCall((data, context) => {
    if (!context.auth) return {status: 'error', code: 401, message: 'Not signed in'}

    return new Promise((resolve, reject) => {

    });
})
*/
