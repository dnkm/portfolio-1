class AnimalSaga {
    constructor() {
        this.SIZE = 9;
        this.blocks = ['🐶', '🐱', '🦄', '🐹', '🐸', '🦊', '🐻', '🦋'];
        this.container = document.querySelector(".game");
        this.board = [];
        this.locked = false;

        for (let i = 0; i < this.SIZE; i++) {
            this.board[i] = []

            for (let j = 0; j < this.SIZE; j++) {
                let randomIdx = Math.floor(Math.random() * this.blocks.length);
                this.board[i][j] = this.blocks[randomIdx];
            }
        }
    }
    render() {
        this.container.innerHTML = '';
        if (this.locked) {
            this.container.style.background = "#eee";
        } else {
            this.container.style.background = "white";
        }
        this.board.forEach((row, r) => {
            row.forEach((col, c) => {
                this.createBtn(col, r, c);
            });
        });
    }
    createBtn(content, r, c) {
        let btn = document.createElement("button");
        btn.innerText = content;
        btn.addEventListener('click', () => {
            this.onBtnClick(r, c);
        });
        this.container.appendChild(btn);
    }
    onBtnClick(r, c) {
        if (this.locked) return;
        this.locked = true;
        this.remove(this.board[r][c], r, c);
        this.render();
        setTimeout(this.fall.bind(this), 1000);
    }
    fall() {
        // make 'em fall
        for (let r = this.SIZE - 1; r >= 1; r--) {
            for (let c = 0; c < this.SIZE; c++) {
                if (this.board[r][c] === '') {
                    this.board[r][c] = this.board[r-1][c];
                    this.board[r-1][c] = '';
                }
            }
        }

        // fill the first row with random values
        for (let c = 0; c < this.SIZE; c++) {
            if (this.board[0][c] === '') {
                let randomIdx = Math.floor(Math.random() * this.blocks.length);
                this.board[0][c] = this.blocks[randomIdx];
            }
        }

        // check if there are still 0s
        if (this.doesZeroExist()) {
            setTimeout(this.fall.bind(this), 1000);
        } else {
            this.locked = false;
        }

        this.render();
    }
    doesZeroExist() {
        for (let r = this.SIZE - 1; r >= 1; r--) {
            for (let c = 0; c < this.SIZE; c++) {
                if (this.board[r][c] === '') return true;
            }
        }
        return false;
    }
    remove(blockType, r, c) {
        if (r < 0 || r >= this.SIZE) return;
        if (c < 0 || c >= this.SIZE) return;
        if (this.board[r][c] !== blockType) return;

        this.board[r][c] = '';

        this.remove(blockType, r - 1, c);
        this.remove(blockType, r + 1, c);
        this.remove(blockType, r, c - 1);
        this.remove(blockType, r, c + 1);
    }
}


new AnimalSaga().render();