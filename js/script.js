let rows = 3;
let columns = 3;
let currTile;
let otherTile;

window.onload = function () {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = document.createElement('img');
            tile.src = '../images/easy/blank.jpg';
            
            tile.addEventListener('dragstart', dragStart);
            tile.addEventListener('dragover', dragOver);
            tile.addEventListener('dragenter', dragEnter);
            tile.addEventListener('dragleave', dragLeave);
            tile.addEventListener('drop', dragDrop);
            tile.addEventListener('dragend', dragEnd);

            document.getElementById('board-easy').append(tile)
        }
    }

    let pieces = [];
    for (let i = 1; i <= rows * columns; i++) {
        pieces.push(i.toString());
    }
    //swap
    for (let i = 0; i < pieces.length; i++) {
        let j = Math.floor(Math.random() * pieces.length);

        let tmp = pieces[i];
        pieces[i] = pieces[j];
        pieces[j] = tmp;
    }    

    for (let i = 0; i < pieces.length; i++) {
        let tile = document.createElement('img');
        tile.src = '../images/easy/' + pieces[i] + '.jpg';
        
        tile.addEventListener('dragstart', dragStart);
        tile.addEventListener('dragover', dragOver);
        tile.addEventListener('dragenter', dragEnter);
        tile.addEventListener('dragleave', dragLeave);
        tile.addEventListener('drop', dragDrop);
        tile.addEventListener('dragend', dragEnd);
        document.getElementById('pieces-easy').append(tile);
    }
}

function dragStart () {
    currTile = this;
}; 

function dragOver (e) {
    
};

function dragEnter (e) {
    
};

function dragLeave () {

}

function dragDrop () {
    otherTile = this;
}

function dragEnd () {
    if (currTile.src.includes('blank')) {
        return
    }
    let currImg = currTile.src;
    let otherImg = otherTile.src;
    otherTile.src = currImg;
    currTile.src = otherImg;
}