import { ChessBoard } from "./chessBoard.js";
export class Game {
    constructor() {
        this.gameDiv = null;
        this.board = new ChessBoard("blue");
    }

    drawGame(host) {
        if (!host) throw Error("Host does not exist");
        this.gameDiv = document.createElement("div");
        this.gameDiv.className = "gameDiv";
        host.appendChild(this.gameDiv);



        let leftDiv = document.createElement("div");
        leftDiv.className = "leftDiv";
        this.gameDiv.appendChild(leftDiv);

        let rightDiv = document.createElement("div");
        rightDiv.className = "rightDiv";
        this.gameDiv.appendChild(rightDiv);
        this.board.drawBoard(rightDiv);

        //Make left div
        let label = document.createElement("h1");
        label.innerHTML = "Let's play chess!";
        leftDiv.appendChild(label);
        //fill the left div

        let button = document.createElement("button");
        button.className = "newGameButton";
        button.innerHTML = "Play a new game";
        leftDiv.appendChild(button);
        button.onclick = ((ev) => {
            this.board.delete();
            this.board.drawBoard(rightDiv);
        });


        let selectDiv = document.createElement("div");
        selectDiv.className = "selectDiv";
        label = document.createElement("h4");
        label.innerHTML = "Pick board theme:";
        selectDiv.appendChild(label);
        let select = document.createElement("select");
        selectDiv.appendChild(select);
        leftDiv.appendChild(selectDiv);

        let option = null;
        let collors = ["blue", "green", "wood"]
        for (let i = 0; i < collors.length; i++) {
            option = document.createElement("option");
            option.value = collors[i];
            option.innerHTML = collors[i];
            select.appendChild(option);
        }

        button = document.createElement("button");
        button.innerHTML = "Save";
        leftDiv.appendChild(button);
        button.onclick = ((ev) => {
            let collorForBoard = select.value;
            this.board.update(collorForBoard);
        });


    }
}