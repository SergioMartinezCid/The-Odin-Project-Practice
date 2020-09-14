const playerFactory = (name, symbol) => {
    const getName = () => name;
    const getSymbol = () => symbol;
    return {getName, getSymbol};
}

const gameBoard = (() => {
    const board = [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ];
    
    let gameOn = false;
    const players = [null, null];

    const startGame = (name1, symbol1, name2, symbol2) => {
        players[0] = playerFactory(name1,symbol1);
        players[1] = playerFactory(name2, symbol2);

        for(let i=0;i<board.length;i++){
            for(let j=0;j<board[i].length;j++){
                board[i][j] = null;
            }
        }
        displayController.displayBoard(board);
        gameOn = true;
    };
    const current_player = () => players[0];

    const checkGameOver = (i, j, symbol) => {
        let state = 'tie';
        if((board[i][(j+1)%3] === symbol && board[i][(j+2)%3] === symbol) || 
            (board[(i+1)%3][j] === symbol && board[(i+2)%3][j] === symbol) || 
            (i === j && board[(i+1)%3][(j+1)%3] === symbol && board[(i+2)%3][(j+2)%3] === symbol) || 
            (i + j === 2 && board[(i+1)%3][(j+2)%3] === symbol && board[(i+2)%3][(j+1)%3] === symbol)){
                state = 'win';
                gameOn = false;
        }
        for(let i=0;i<board.length && state === 'tie';i++){
            for(let j=0;j<board[i].length && state === 'tie';j++){
                if(board[i][j] == null){
                    state = 'unfinished';
                }
            }
        }
        if(state === 'tie'){
            gameOn = false;
        }

        return state;
    };
    const changeSquare = (i, j, symbol) => {
        if(!gameOn){
            throw Error('The game is over');
        }
        if(board[i][j] != null){
            throw Error('This square is already occupied');
        }
        board[i][j] = symbol;
        displayController.displayBoard(board);
        switch(checkGameOver(i, j, symbol)){
            case 'win':
                return `${current_player().getName()} has won the game!`;
            case 'tie':
                return 'The game has ended in a tie; Well Played';
            case 'unfinished':
                players.reverse();
                return '';
        }
    };
    return {changeSquare, current_player, startGame};
})();

const displayController = (() => {
    const tiles = [
        [document.querySelector('#ttt-sq-0-0'), document.querySelector('#ttt-sq-0-1'), document.querySelector('#ttt-sq-0-2')],
        [document.querySelector('#ttt-sq-1-0'), document.querySelector('#ttt-sq-1-1'), document.querySelector('#ttt-sq-1-2')],
        [document.querySelector('#ttt-sq-2-0'), document.querySelector('#ttt-sq-2-1'), document.querySelector('#ttt-sq-2-2')]
    ];
    const playerInputs = [document.querySelector('#p1-name'), document.querySelector('#p2-name')];
    const displayBoard = board => {
        for(let i=0;i<board.length;i++){
            for(let j=0;j<board[i].length;j++){
                tiles[i][j].innerText = board[i][j] == null ? '' : board[i][j];
            }
        }
    };
    for(const square of document.querySelectorAll('.ttt-square')){
        square.addEventListener('click', e => {
            try {
                    if(gameBoard.current_player() != null){
                    const message = gameBoard.changeSquare(Number.parseInt(e.target.dataset.row), Number.parseInt(e.target.dataset.col), 
                        gameBoard.current_player().getSymbol());
                    if(message !== ''){
                        alert(message);
                    }
                }
            } catch (error) {
                alert(error.message);
            }
        })
    }
    document.querySelector('#button-start').addEventListener('click', e => {
        if(playerInputs[0].value.trim() === '' && playerInputs[1].value.trim() === ''){
            alert('The names must be introduced before starting');
        }else{
            gameBoard.startGame(playerInputs[0].value, 'X', playerInputs[1].value, 'O');
        }
    })
    return {displayBoard};
})();
