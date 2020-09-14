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
    const getGameBoard = () => board;

    const players = [playerFactory('Player 1', 'X'), playerFactory('Player 2', 'O')];
    const current_player = () => players[0];

    const checkGameOver = (i, j, symbol) => {
        let state = 'tie';
        if((board[i][(j+1)%3] === symbol && board[i][(j+2)%3] === symbol) || 
            (board[(i+1)%3][j] === symbol && board[(i+2)%3][j] === symbol) || 
            (i === j && board[(i+1)%3][(j+1)%3] === symbol && board[(i+2)%3][(j+2)%3] === symbol) || 
            (i + j === 2 && board[(i+1)%3][(j+2)%3] === symbol && board[(i+2)%3][(j+1)%3] === symbol)){
                state = 'win';
        }
        for(let i=0;i<board.length && state === 'tie';i++){
            for(let j=0;j<board[i].length && state === 'tie';j++){
                if(board[i][j] == null){
                    state = 'unfinished';
                }
            }
        }
        return state;
    };
    const changeSquare = (i, j, symbol) => {
        if(board[i][j] != null){
            throw Error('This square is already occupied');
        }
        board[i][j] = symbol;
        displayController.displayBoard(board);
        switch(checkGameOver(i, j, symbol)){
            case 'win':
                alert(`${current_player().getName()} has won the game!`);
                break;
            case 'tie':
                alert('The game has ended in a tie; Well Played')
                break;
            case 'unfinished':
                players.reverse();
                break;
        }
    };
    return {getGameBoard, changeSquare, current_player};
})();

const displayController = (() => {
    const tiles = [
        [document.querySelector('#ttt-sq-0-0'), document.querySelector('#ttt-sq-0-1'), document.querySelector('#ttt-sq-0-2')],
        [document.querySelector('#ttt-sq-1-0'), document.querySelector('#ttt-sq-1-1'), document.querySelector('#ttt-sq-1-2')],
        [document.querySelector('#ttt-sq-2-0'), document.querySelector('#ttt-sq-2-1'), document.querySelector('#ttt-sq-2-2')]
    ];
    const displayBoard = board => {
        for(let i=0;i<board.length;i++){
            for(let j=0;j<board[i].length;j++){
                if(board[i][j] != null){
                    tiles[i][j].innerText = board[i][j];
                }
            }
        }
    };
    for(const square of document.querySelectorAll('.ttt-square')){
        square.addEventListener('click', e => {
            gameBoard.changeSquare(Number.parseInt(e.target.dataset.row), Number.parseInt(e.target.dataset.col), gameBoard.current_player().getSymbol());
        })
    }
    return {displayBoard};
})();
