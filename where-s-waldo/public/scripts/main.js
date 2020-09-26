const popup = document.querySelector('#popup');
const imgWhereWaldo = document.querySelector('#img-where-waldo');

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

// popup.appendChild(await generateLevelSelector());

generateLevelSelector().then(levelSelector => {
    popup.appendChild(levelSelector);
});

document.querySelector('#img-where-waldo').addEventListener('click', event => {
    // Odlaw widthRatio 0.2431640625 heightRatio 0.5026041666666666 main.js:2:13
    // Waldo widthRatio 0.53125 heightRatio 0.5026041666666666 main.js:2:13
    // Wizard widthRatio 0.62890625 heightRatio 0.5104166666666666 main.js:2:13
    // Wizard (the farthest from the center) radiuswidthRatio 0.6279296875 heightRatio 0.4713541666666667
    console.log(`widthRatio ${(event.pageX - event.target.offsetLeft)/event.target.clientWidth} heightRatio ${(event.pageY - event.target.offsetTop)/event.target.clientHeight}`)
});