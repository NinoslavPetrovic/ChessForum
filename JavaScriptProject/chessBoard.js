export class ChessBoard {
    constructor(collor) {
        this.clicked = 0; // 0-pick the piece to move; 1-pick the square where to move;
        this.turn = 0; // 0-white to move; 1-black to move;
        this.boardDiv = null;
        this.clickedSquare = null;
        this.firstClicked = null;
        this.pawnForEnpassant = 0;
        this.x = 100; // pamti koordinate prvokliknute figure
        this.y = 100; //
        this.collor = collor;
        this.lightSquareCollor = null;
        this.darkSquareCollor = null;
        this.legalSquareCollor = null;

    }

    pickTheCollor(collor) {
        switch (collor) {
            case "blue":
                this.lightSquareCollor = "rgb(212, 224, 229)";
                this.darkSquareCollor = "rgb(87, 146, 169)";
                this.legalSquareCollor = "rgb(255, 160, 122)";
                break;
            case "green":
                this.lightSquareCollor = "rgb(235, 236, 208)";
                this.darkSquareCollor = "rgb(119, 149, 86)";
                this.legalSquareCollor = "rgb(189, 183, 107)";
                break;
            case "wood":
                this.lightSquareCollor = "rgb(240, 217, 181)";
                this.darkSquareCollor = "rgb(173, 123, 82)";
                this.legalSquareCollor = "rgb(192, 192, 192)";
                break;
            default:
                this.lightSquareCollor = "rgb(212, 224, 229)";
                this.darkSquareCollor = "rgb(87, 146, 169)";
                this.legalSquareCollor = "rgb(255, 160, 122)";
        }
    }

    showLegalMoves(i, j) {
        const Pieces = ["Rook", "Knight", "Bishop", "Queen", "King"];
        if (this.turn == 0) this.whoIsToMove = "/w"; else this.whoIsToMove = "/b";

        if (this.clickedSquare.innerHTML.includes(Pieces[0])) this.showLegalMovesForRook(i, j);
        else if (this.clickedSquare.innerHTML.includes(Pieces[1])) this.showLegalMovesForKnight(i, j);
        else if (this.clickedSquare.innerHTML.includes(Pieces[2])) this.showLegalMovesForBishop(i, j);
        else if (this.clickedSquare.innerHTML.includes(Pieces[3])) this.showLegalMovesForQueen(i, j);
        else if (this.clickedSquare.innerHTML.includes(Pieces[4])) this.showLegalMovesForKing(i, j);
        else {
            if (this.turn == 0) this.showLegalMovesForWhitePawn(i, j); else this.showLegalMovesForBlackPawn(i, j);
        }

    }

    showLegalSquare(i, j) {  //Oboji polje u drugu boju!
        let newLegalSquare = this.boardDiv.querySelector(".a" + i + j);
        newLegalSquare.style.backgroundColor = this.legalSquareCollor;
        newLegalSquare.classList.add("legalSquare");
    }
    isSquareUnderAttack(i, j) {

    }

    checkLegalSquareForKingOrKnight(q, k) { // Kod koji se ponavlja u "showLegalMovesForKing" je upakovan u ovu fju
        if (this.boardDiv.querySelector(".a" + q + k).innerHTML.includes("/b") && this.turn == 0) {
            this.showLegalSquare(q, k);
        }
        else if (this.boardDiv.querySelector(".a" + q + k).innerHTML.includes("/w") && this.turn == 1) {
            this.showLegalSquare(q, k);
        }
        else if (this.boardDiv.querySelector(".a" + q + k).innerHTML == "") {
            this.showLegalSquare(q, k);
        }
    }

    checkIfPieceIsForCapture(i, j) {
        if (this.boardDiv.querySelector(".a" + i + j).innerHTML.includes("/b") && this.turn == 0) {
            this.showLegalSquare(i, j);
        }
        else if (this.boardDiv.querySelector(".a" + i + j).innerHTML.includes("/w") && this.turn == 1) {
            this.showLegalSquare(i, j);
        }
    }

    removeLegalBackgroundSquares() {
        var legalSquares = this.boardDiv.querySelectorAll(".legalSquare");
        legalSquares.forEach(el => {
            if (el.classList.contains("whiteSquare")) el.style.backgroundColor = this.lightSquareCollor;
            else el.style.backgroundColor = this.darkSquareCollor;
            el.classList.remove("legalSquare");
        });
    }

    showLegalMovesForRook(i, j) {
        let q = i;
        let k = j;
        q--;
        while (q >= 0 && this.boardDiv.querySelector(".a" + q + j).innerHTML == "") {    //SL1               
            this.showLegalSquare(q, j);
            q--;
        }
        if (q >= 0) {
            this.checkIfPieceIsForCapture(q, j);
        }
        q = i;
        k--;
        while (k >= 0 && this.boardDiv.querySelector(".a" + i + k).innerHTML == "") {  //SL 2
            this.showLegalSquare(i, k);
            k--;
        }
        if (k >= 0) {
            this.checkIfPieceIsForCapture(i, k);
        }
        k = j;
        k++;
        while (k <= 7 && this.boardDiv.querySelector(".a" + i + k).innerHTML == "") {  // Sl 3 
            this.showLegalSquare(i, k);
            k++;
        }
        if (k <= 7) {
            this.checkIfPieceIsForCapture(i, k);
        }
        q++;
        while (q <= 7 && this.boardDiv.querySelector(".a" + q + j).innerHTML == "") { //sl4
            this.showLegalSquare(q, j);
            q++;
        }
        if (q <= 7) {
            this.checkIfPieceIsForCapture(q, j);
        }
    }
    showLegalMovesForKnight(i, j) {
        let q = i - 1;
        let k;
        if (q >= 0) { //SL1
            k = j - 2;
            if (k >= 0) {
                this.checkLegalSquareForKingOrKnight(q, k);
            }
            k = j + 2;
            if (k <= 7) {
                this.checkLegalSquareForKingOrKnight(q, k);
            }
        }
        q = i + 1;
        if (q <= 7) { //SL2
            k = j - 2;
            if (k >= 0) {
                this.checkLegalSquareForKingOrKnight(q, k);
            }
            k = j + 2;
            if (k <= 7) {
                this.checkLegalSquareForKingOrKnight(q, k);
            }
        }
        q = i - 2;
        if (q >= 0) { //SL3
            k = j - 1;
            if (k >= 0) {
                this.checkLegalSquareForKingOrKnight(q, k);
            }
            k = j + 1;
            if (k <= 7) {
                this.checkLegalSquareForKingOrKnight(q, k);
            }
        }
        q = i + 2;
        if (q <= 7) { //SL4
            k = j - 1;
            if (k >= 0) {
                this.checkLegalSquareForKingOrKnight(q, k);
            }
            k = j + 1;
            if (k <= 7) {
                this.checkLegalSquareForKingOrKnight(q, k);
            }
        }
    }
    showLegalMovesForBishop(i, j) {
        let q = i;
        let k = j;
        q--;
        k--;
        while (q >= 0 && k >= 0 && this.boardDiv.querySelector(".a" + q + k).innerHTML == "") {
            this.showLegalSquare(q, k);
            q--;
            k--;
        }
        if (q >= 0 && k >= 0) {
            this.checkIfPieceIsForCapture(q, k);
        }
        q = i; k = j;
        q--;
        k++;
        while (q >= 0 && k <= 7 && this.boardDiv.querySelector(".a" + q + k).innerHTML == "") {
            this.showLegalSquare(q, k);
            q--;
            k++;
        }
        if (q >= 0 && k <= 7) {
            this.checkIfPieceIsForCapture(q, k);
        }
        q = i; k = j;
        q++;
        k++;
        while (k <= 7 && q <= 7 && this.boardDiv.querySelector(".a" + q + k).innerHTML == "") {
            this.showLegalSquare(q, k);
            q++;
            k++;
        }
        if (k <= 7 && q <= 7) {
            this.checkIfPieceIsForCapture(q, k);
        }
        q = i; k = j;
        q++;
        k--;
        while (q <= 7 && k >= 0 && this.boardDiv.querySelector(".a" + q + k).innerHTML == "") {
            this.showLegalSquare(q, k);
            q++;
            k--;
        }
        if (q <= 7 && k >= 0) {
            this.checkIfPieceIsForCapture(q, k);
        }
    }
    showLegalMovesForQueen(i, j) {
        this.showLegalMovesForBishop(i, j);
        this.showLegalMovesForRook(i, j);
    }
    showLegalMovesForKing(i, j) {
        let q = i - 1;
        let k = j;
        if (q >= 0) { //sl2
            this.checkLegalSquareForKingOrKnight(q, k);
            k--;
            if (k >= 0) {
                this.checkLegalSquareForKingOrKnight(q, k);
            }
            k += 2;
            if (k <= 7) {
                this.checkLegalSquareForKingOrKnight(q, k);
            }

        }
        q = i;
        k = j - 1;
        if (k >= 0) { //sl4
            this.checkLegalSquareForKingOrKnight(q, k);
        }
        k += 2;
        if (k <= 7) { //sl5
            this.checkLegalSquareForKingOrKnight(q, k);
        }
        q = i + 1;
        k = j;
        if (q <= 7) {
            this.checkLegalSquareForKingOrKnight(q, k);
            k--;
            if (k >= 0) {
                this.checkLegalSquareForKingOrKnight(q, k);
            }
            k += 2;
            if (k <= 7) {
                this.checkLegalSquareForKingOrKnight(q, k);
            }
        }

        if (this.clickedSquare.classList.contains("notMoved") && this.clickedSquare.innerHTML.includes("King")) {
            if (this.turn == 0) {
                if (this.boardDiv.querySelector(".a77").classList.contains("notMoved")) {
                    if (this.boardDiv.querySelector(".a75").innerHTML == "" && this.boardDiv.querySelector(".a76").innerHTML == "") {
                        this.showLegalSquare(7, 6);
                    }
                }
                if (this.boardDiv.querySelector(".a70").classList.contains("notMoved")) {
                    if (this.boardDiv.querySelector(".a71").innerHTML == "" && this.boardDiv.querySelector(".a72").innerHTML == "" && this.boardDiv.querySelector(".a73").innerHTML == "") {
                        this.showLegalSquare(7, 2);
                    }
                }
            }
            else { //ako je crni na potezu
                if (this.boardDiv.querySelector(".a07").classList.contains("notMoved")) {
                    if (this.boardDiv.querySelector(".a05").innerHTML == "" && this.boardDiv.querySelector(".a06").innerHTML == "") {
                        this.showLegalSquare(0, 6);
                    }
                }
                if (this.boardDiv.querySelector(".a00").classList.contains("notMoved")) {
                    if (this.boardDiv.querySelector(".a01").innerHTML == "" && this.boardDiv.querySelector(".a02").innerHTML == "" && this.boardDiv.querySelector(".a03").innerHTML == "") {
                        this.showLegalSquare(0, 2);
                    }
                }
            }
        }

    }

    pawnPromotion(blackORwhite) {
        let finish = true;
        let promotionPieces;
        var pieceOnSquare = "";
        promotionPieces = prompt("Write: q-for Queen, r-for Rook, b-for Bishop , k-for Knight.");
        if (promotionPieces != null) {
            promotionPieces = promotionPieces.toLowerCase();
        }
        if (blackORwhite == "/w") {
            switch (promotionPieces) {
                case "q":
                    pieceOnSquare = "<img src=Pieces/wQueen.png>";
                    break;
                case "r":
                    pieceOnSquare = "<img src=Pieces/wRook.png>";
                    break;
                case "b":
                    pieceOnSquare = "<img src=Pieces/wBishop.png>";
                    break;
                case "k":
                    pieceOnSquare = "<img src=Pieces/wKnight.png>";
                    break;
                default:
                    pieceOnSquare = "<img src=Pieces/wQueen.png>";
            }
        }
        else {
            switch (promotionPieces) {
                case "q":
                    pieceOnSquare = "<img src=Pieces/bQueen.png>";
                    break;
                case "r":
                    pieceOnSquare = "<img src=Pieces/bRook.png>";
                    break;
                case "b":
                    pieceOnSquare = "<img src=Pieces/bBishop.png>";
                    break;
                case "k":
                    pieceOnSquare = "<img src=Pieces/bKnight.png>";
                    break;
                default:
                    pieceOnSquare = "<img src=Pieces/bQueen.png>";
            }
        }

        if (pieceOnSquare == "" && blackORwhite == "/w") pieceOnSquare = "<img src=Pieces/wQueen.png>";
        else if (pieceOnSquare == "" && blackORwhite == "/b") pieceOnSquare = "<img src=Pieces/bQueen.png>";
        return pieceOnSquare;
    }

    canWhitePawnCapture(i, j) {
        if (j > 0 && j < 7) {
            // ova dva IF-a Omogucavaju anpasanovanom pijunu da pokosi glavonju
            let pawn = this.boardDiv.querySelector(".a" + i + j);
            if (i == 3 && pawn.classList.contains('left')) {
                let newLegalSquareX = i - 1;
                let newLegalSquareY = j - 1;
                let newLegalSquare = this.boardDiv.querySelector(".a" + newLegalSquareX + newLegalSquareY);
                newLegalSquare.style.backgroundColor = this.legalSquareCollor;
                newLegalSquare.classList.add("legalSquare");
            }
            if (i == 3 && pawn.classList.contains("right")) {
                let newLegalSquareX = i - 1;
                let newLegalSquareY = j + 1;
                let newLegalSquare = this.boardDiv.querySelector(".a" + newLegalSquareX + newLegalSquareY);
                newLegalSquare.style.backgroundColor = this.legalSquareCollor;
                newLegalSquare.classList.add("legalSquare");
            }
            let x = i - 1;
            let y = j - 1;
            let div1 = document.querySelector(".a" + x + y);
            y = j + 1;
            let div2 = document.querySelector(".a" + x + y);
            if (div1.innerHTML.includes("/b")) {
                div1.style.backgroundColor = this.legalSquareCollor;
                div1.classList.add("legalSquare");
            }
            if (div2.innerHTML.includes("/b")) {
                div2.style.backgroundColor = this.legalSquareCollor;
                div2.classList.add("legalSquare");
            }
        }
        if (j == 0) {
            let pawn = this.boardDiv.querySelector(".a" + i + j);
            if (i == 3 && pawn.classList.contains("right")) {
                let newLegalSquareX = i - 1;
                let newLegalSquareY = j + 1;
                let newLegalSquare = this.boardDiv.querySelector(".a" + newLegalSquareX + newLegalSquareY);
                newLegalSquare.style.backgroundColor = this.legalSquareCollor;
                newLegalSquare.classList.add("legalSquare");
            }
            let x = i - 1;
            let div = document.querySelector(".a" + x + "1");
            if (div.innerHTML.includes("/b")) {
                div.style.backgroundColor = this.legalSquareCollor;
                div.classList.add("legalSquare");
            }
        }
        if (j == 7) {
            let pawn = this.boardDiv.querySelector(".a" + i + j);
            if (i == 3 && pawn.classList.contains('left')) {
                let newLegalSquareX = i - 1;
                let newLegalSquareY = j - 1;
                let newLegalSquare = this.boardDiv.querySelector(".a" + newLegalSquareX + newLegalSquareY);
                newLegalSquare.style.backgroundColor = this.legalSquareCollor;
                newLegalSquare.classList.add("legalSquare");
            }
            let x = i - 1;
            let div = document.querySelector(".a" + x + "6");
            if (div.innerHTML.includes("/b")) {
                div.style.backgroundColor = this.legalSquareCollor;
                div.classList.add("legalSquare");
            }
        }
    }
    canBlackPawnCapture(i, j) {
        if (j > 0 && j < 7) {
            // ova dva IF-a Omogucavaju anpasanovanom pijunu da pokosi glavonju
            let pawn = this.boardDiv.querySelector(".a" + i + j);
            if (i == 4 && pawn.classList.contains('left')) {
                let newLegalSquareX = i + 1;
                let newLegalSquareY = j - 1;
                let newLegalSquare = this.boardDiv.querySelector(".a" + newLegalSquareX + newLegalSquareY);
                newLegalSquare.style.backgroundColor = this.legalSquareCollor;
                newLegalSquare.classList.add("legalSquare");
            }
            if (i == 4 && pawn.classList.contains("right")) {
                let newLegalSquareX = i + 1;
                let newLegalSquareY = j + 1;
                let newLegalSquare = this.boardDiv.querySelector(".a" + newLegalSquareX + newLegalSquareY);
                newLegalSquare.style.backgroundColor = this.legalSquareCollor;
                newLegalSquare.classList.add("legalSquare");
            }
            let x = i + 1;
            let y = j - 1;
            let div1 = document.querySelector(".a" + x + y);
            y = j + 1;
            let div2 = document.querySelector(".a" + x + y);
            if (div1.innerHTML.includes("/w")) {
                div1.style.backgroundColor = this.legalSquareCollor;
                div1.classList.add("legalSquare");
            }
            if (div2.innerHTML.includes("/w")) {
                div2.style.backgroundColor = this.legalSquareCollor;
                div2.classList.add("legalSquare");
            }
        }
        if (j == 0) {
            let pawn = this.boardDiv.querySelector(".a" + i + j);
            if (i == 4 && pawn.classList.contains("right")) {
                let newLegalSquareX = i + 1;
                let newLegalSquareY = j + 1;
                let newLegalSquare = this.boardDiv.querySelector(".a" + newLegalSquareX + newLegalSquareY);
                newLegalSquare.style.backgroundColor = this.legalSquareCollor;
                newLegalSquare.classList.add("legalSquare");
            }
            let x = i + 1;
            let div = document.querySelector(".a" + x + "1");
            if (div.innerHTML.includes("/w")) {
                div.style.backgroundColor = this.legalSquareCollor;
                div.classList.add("legalSquare");
            }
        }
        if (j == 7) {
            let pawn = this.boardDiv.querySelector(".a" + i + j);
            if (i == 4 && pawn.classList.contains('left')) {
                let newLegalSquareX = i + 1;
                let newLegalSquareY = j - 1;
                let newLegalSquare = this.boardDiv.querySelector(".a" + newLegalSquareX + newLegalSquareY);
                newLegalSquare.style.backgroundColor = this.legalSquareCollor;
                newLegalSquare.classList.add("legalSquare");
            }
            let x = i + 1;
            let div = document.querySelector(".a" + x + "6");
            if (div.innerHTML.includes("/w")) {
                div.style.backgroundColor = this.legalSquareCollor;
                div.classList.add("legalSquare");
            }
        }
    }

    showLegalMovesForWhitePawn(i, j) {
        if (i == 6) {
            this.canWhitePawnCapture(i, j);
            if (this.isSquareFree(i - 1, j)) { // proverava da li moze za dva polja da ide
                let x = i - 1;
                let findSquareDiv = this.boardDiv.querySelector(".a" + x + j);
                findSquareDiv.style.backgroundColor = this.legalSquareCollor;
                findSquareDiv.classList.add("legalSquare");
            }
            if (this.isSquareFree(i - 2, j) && this.isSquareFree(i - 1, j)) {
                let x = i - 2;
                let findSquareDiv = this.boardDiv.querySelector(".a" + x + j);
                findSquareDiv.style.backgroundColor = this.legalSquareCollor;
                findSquareDiv.classList.add("legalSquare");
            }
        }
        else if (i > 0) {
            this.canWhitePawnCapture(i, j);
            if (this.isSquareFree(i - 1, j)) {
                let x = i - 1;
                let findSquareDiv = this.boardDiv.querySelector(".a" + x + j);
                findSquareDiv.style.backgroundColor = this.legalSquareCollor;
                findSquareDiv.classList.add("legalSquare");
            }
        }
    }
    showLegalMovesForBlackPawn(i, j) {
        if (i == 1) {
            this.canBlackPawnCapture(i, j);
            if (this.isSquareFree(i + 1, j)) {
                let x = i + 1;
                let findSquareDiv = this.boardDiv.querySelector(".a" + x + j);
                findSquareDiv.style.backgroundColor = this.legalSquareCollor;
                findSquareDiv.classList.add("legalSquare");
            }
            if (this.isSquareFree(i + 2, j) && this.isSquareFree(i + 1, j)) {
                let x = i + 2;
                let findSquareDiv = this.boardDiv.querySelector(".a" + x + j);
                findSquareDiv.style.backgroundColor = this.legalSquareCollor;
                findSquareDiv.classList.add("legalSquare");
            }
        }
        else if (i < 7) {
            this.canBlackPawnCapture(i, j);
            if (this.isSquareFree(i + 1, j)) {
                let x = i + 1;
                let findSquareDiv = this.boardDiv.querySelector(".a" + x + j);
                findSquareDiv.style.backgroundColor = this.legalSquareCollor;
                findSquareDiv.classList.add("legalSquare");
            }
        }
    }

    isSquareFree(i, j) {
        let findSquareDiv = this.boardDiv.querySelector(".a" + i + j);
        return !findSquareDiv.innerHTML.includes(".png");
    }

    drawBoard(host) {
        if (!host) throw Error("Host does not exist");
        this.boardDiv = document.createElement("div");
        this.boardDiv.className = "boardDiv";
        host.appendChild(this.boardDiv);

        this.pickTheCollor(this.collor);

        let row;
        let square;

        for (let i = 0; i < 8; i++) {
            row = document.createElement("div");
            row.className = "rowDiv";
            this.boardDiv.appendChild(row);
            let bPiecesArry = ["<img src=Pieces/bRook.png>", "<img src=Pieces/bKnight.png>", "<img src=Pieces/bBishop.png>", "<img src=Pieces/bQueen.png>", "<img src=Pieces/bKing.png>", "<img src=Pieces/bBishop.png>", "<img src=Pieces/bKnight.png>", "<img src=Pieces/bRook.png>"];
            let wPiecesArry = ["<img src=Pieces/wRook.png>", "<img src=Pieces/wKnight.png>", "<img src=Pieces/wBishop.png>", "<img src=Pieces/wQueen.png>", "<img src=Pieces/wKing.png>", "<img src=Pieces/wBishop.png>", "<img src=Pieces/wKnight.png>", "<img src=Pieces/wRook.png>"];
            for (let j = 0; j < 8; j++) {
                square = document.createElement("div");
                square.classList.add("a" + i.toString() + j.toString());
                square.classList.add("square");
                square.onclick = ((ev) => {

                    this.clickedSquare = this.boardDiv.querySelector(".a" + i.toString() + j.toString());

                    if (this.clickedSquare.innerHTML.includes("/w") && this.turn == 0) {
                        this.removeLegalBackgroundSquares();
                        this.clicked = 1;
                        this.firstClicked = this.clickedSquare;
                        this.x = i; this.y = j;
                        this.showLegalMoves(i, j);
                    }
                    else if (this.clickedSquare.innerHTML.includes("/b") && this.turn == 1) {
                        this.removeLegalBackgroundSquares();
                        this.clicked = 1;
                        this.firstClicked = this.clickedSquare;
                        this.x = i; this.y = j;
                        this.showLegalMoves(i, j);
                    }
                    else {
                        if (this.clicked == 1) {
                            if (this.clickedSquare.style.backgroundColor == this.legalSquareCollor) { // Kliknuo je na validno polje!
                                //proverava da li je CRNI pijun skocio za dva polja i pamti ako jeste --- zbog en passant pravila
                                if (this.firstClicked.innerHTML.includes("/bP") && this.x == 1 && i == 3) {
                                    if (j > 0 && j < 7) {
                                        let j1 = j - 1;
                                        let j2 = j + 1;
                                        let left = this.boardDiv.querySelector(".a3" + j1);
                                        let right = this.boardDiv.querySelector(".a3" + j2);
                                        if (left.innerHTML.includes("/wP")) { left.classList.add("right"); }
                                        if (right.innerHTML.includes("/wP")) { right.classList.add("left"); }
                                    }
                                    else if (j == 0) {
                                        let right = this.boardDiv.querySelector(".a31");
                                        if (right.innerHTML.includes("/wP")) { right.classList.add("left"); }
                                    }
                                    else {
                                        let left = this.boardDiv.querySelector(".a36");
                                        if (left.innerHTML.includes("/wP")) { left.classList.add("right"); }
                                    }
                                }
                                //proverava da li je beli pijun skocio za dva poljla i postavlja calssname ako jeste
                                else if (this.firstClicked.innerHTML.includes("/wP") && this.x == 6 && i == 4) {
                                    if (j > 0 && j < 7) {
                                        let j1 = j - 1;
                                        let j2 = j + 1;
                                        let left = this.boardDiv.querySelector(".a4" + j1);
                                        let right = this.boardDiv.querySelector(".a4" + j2);
                                        if (left.innerHTML.includes("/bP")) { left.classList.add("right"); }
                                        if (right.innerHTML.includes("/bP")) { right.classList.add("left"); }
                                    }
                                    else if (j == 0) {
                                        let right = this.boardDiv.querySelector(".a41");
                                        if (right.innerHTML.includes("/bP")) { right.classList.add("left"); }
                                    }
                                    else {
                                        let left = this.boardDiv.querySelector(".a46");
                                        if (left.innerHTML.includes("/bP")) { left.classList.add("right"); }
                                    }
                                }
                                var StrForBackUpInIllegalMove = this.clickedSquare.innerHTML;
                                this.clickedSquare.innerHTML = this.firstClicked.innerHTML;
                                var pomocnoPamcenje = this.clickedSquare;
                                this.firstClicked.innerHTML = "";
                                this.firstClicked.style.cursor = 'auto';
                                this.clickedSquare.style.cursor = 'pointer';
                                this.clicked = 0;
                                if (this.turn == 0) this.turn = 1;
                                else this.turn = 0;
                                // Sledi provera da li je usao u ilegalnu poziciju(tj ostavio kralja napadnutog)
                                if (this.turn == 1) {
                                    let allPieces = this.boardDiv.querySelectorAll(".square");
                                    let king = null;
                                    let opponentPieces = [];
                                    allPieces.forEach(el => {
                                        if (el.innerHTML.includes("/wKing")) { king = el; }
                                        if (el.innerHTML.includes("/b")) { opponentPieces.push(el); }
                                    });
                                    /// IDEJA JE DA POMOCU INNERHTML UBACIM SAMO CRNE FIGURE OVDE  I DALJE S NJIMA DA RADIM!

                                    for (let i = 0; i < opponentPieces.length; i++) {
                                        this.removeLegalBackgroundSquares();
                                        let str = opponentPieces[i].classList[0]; //Uzima npr a65;
                                        let x = parseInt(str[1]);
                                        let y = parseInt(str[2]);

                                        this.clickedSquare = opponentPieces[i];
                                        this.showLegalMoves(x, y);
                                        this.clickedSquare = pomocnoPamcenje;

                                        if (king.style.backgroundColor == this.legalSquareCollor) { //vraca potez nazad ako je kralj napadnut
                                            this.firstClicked.innerHTML = this.clickedSquare.innerHTML;
                                            this.clickedSquare.innerHTML = StrForBackUpInIllegalMove;
                                            this.turn = 0;
                                            alert("Illegal move!");
                                            break;
                                        }
                                    }
                                }
                                else if (this.turn == 0) {
                                    let allPieces = this.boardDiv.querySelectorAll(".square");
                                    let king = null;
                                    let opponentPieces = [];
                                    allPieces.forEach(el => {
                                        if (el.innerHTML.includes("/bKing")) { king = el; }
                                        if (el.innerHTML.includes("/w")) { opponentPieces.push(el); }
                                    });
                                    /// IDEJA JE DA POMOCU INNERHTML UBACIM SAMO CRNE FIGURE OVDE  I DALJE S NJIMA DA RADIM!
                                    //opponentPieces.forEach(function loop(item){
                                    for (let i = 0; i < opponentPieces.length; i++) {
                                        this.removeLegalBackgroundSquares();
                                        let str = opponentPieces[i].classList[0]; //Uzima npr a65;
                                        let x = parseInt(str[1]);
                                        let y = parseInt(str[2]);

                                        this.clickedSquare = opponentPieces[i];
                                        this.showLegalMoves(x, y);
                                        this.clickedSquare = pomocnoPamcenje;

                                        if (king.style.backgroundColor == this.legalSquareCollor) { //vraca potez nazad ako je kralj napadnut
                                            this.firstClicked.innerHTML = this.clickedSquare.innerHTML;
                                            this.clickedSquare.innerHTML = StrForBackUpInIllegalMove;
                                            this.turn = 1;
                                            alert("Illegal move!");
                                            break;
                                        }
                                    }
                                }
                                // POKUSAVAM DA PROVERIM DA LI JE PIJUN SKRENUO LEVO ILI DESNO AKO JESTE BRISEM POKOSENOG PIJUNA
                                if (this.clickedSquare.innerHTML.includes("/bPawn") && this.y != j && i == 5) {
                                    let pomocnoPolje = this.boardDiv.querySelector(".a" + this.x + this.y);
                                    if (pomocnoPolje.classList.contains("right") && this.y < j) { // proverava da li je pokosio na desno
                                        let pokoseniPijun = this.boardDiv.querySelector(".a" + this.x + j);
                                        pokoseniPijun.innerHTML = "";
                                        pokoseniPijun.cursor = 'auto';
                                    }
                                    if (pomocnoPolje.classList.contains("left") && this.y > j) { // proverava da li je pokosio na levo
                                        let pokoseniPijun = this.boardDiv.querySelector(".a" + this.x + j);
                                        pokoseniPijun.innerHTML = "";
                                        pokoseniPijun.cursor = 'auto';
                                    }
                                }
                                else if (this.clickedSquare.innerHTML.includes("/wPawn") && this.y != j && i == 2) {
                                    let pomocnoPolje = this.boardDiv.querySelector(".a" + this.x + this.y);
                                    if (pomocnoPolje.classList.contains("right") && this.y < j) { // proverava da li je pokosio na desno
                                        let pokoseniPijun = this.boardDiv.querySelector(".a" + this.x + j);
                                        pokoseniPijun.innerHTML = "";
                                        pokoseniPijun.cursor = 'auto';
                                    }
                                    if (pomocnoPolje.classList.contains("left") && this.y > j) { // proverava da li je pokosio na levo
                                        let pokoseniPijun = this.boardDiv.querySelector(".a" + this.x + j);
                                        pokoseniPijun.innerHTML = "";
                                        pokoseniPijun.cursor = 'auto';
                                    }
                                }
                                if (this.turn == 0) {
                                    let leftArray = this.boardDiv.querySelectorAll(".left");
                                    let rightArray = this.boardDiv.querySelectorAll(".right");
                                    leftArray.forEach((el) => {
                                        if (el.innerHTML.includes("/b")) {
                                            el.classList.remove("left");
                                        }
                                    });
                                    rightArray.forEach((el) => {
                                        if (el.innerHTML.includes("/b")) {
                                            el.classList.remove("right");
                                        }
                                    });
                                }
                                else if (this.turn == 1) {
                                    let leftArray = this.boardDiv.querySelectorAll(".left");
                                    let rightArray = this.boardDiv.querySelectorAll(".right");
                                    leftArray.forEach((el) => {
                                        if (el.innerHTML.includes("/w")) {
                                            el.classList.remove("left");
                                        }
                                    });
                                    rightArray.forEach((el) => {
                                        if (el.innerHTML.includes("/w")) {
                                            el.classList.remove("right");
                                        }
                                    });
                                }

                                // Proverava da li je pomern kralj ili top sa svoje pocetne pozicije i zabranjuje dalju rokadu ako jeste!
                                if (this.turn == 1) {
                                    if (this.clickedSquare.innerHTML.includes("/wKing")) {
                                        if (this.x == 7 && this.y == 4) {
                                            if (this.firstClicked.classList.contains("notMoved")) {
                                                this.firstClicked.classList.remove("notMoved");
                                                if (j == 6) {
                                                    this.boardDiv.querySelector(".a75").innerHTML = this.boardDiv.querySelector(".a77").innerHTML;
                                                    this.boardDiv.querySelector(".a77").innerHTML = "";
                                                }
                                                else if (j == 2) {
                                                    this.boardDiv.querySelector(".a73").innerHTML = this.boardDiv.querySelector(".a70").innerHTML;
                                                    this.boardDiv.querySelector(".a70").innerHTML = "";
                                                }
                                            }

                                        }
                                    }
                                    else if (this.clickedSquare.innerHTML.includes("/wRook")) {
                                        if ((this.x == 7 && this.y == 0) || (this.x == 7 && this.y == 7)) {
                                            if (this.firstClicked.classList.contains("notMoved")) {
                                                this.firstClicked.classList.remove("notMoved");
                                            }
                                        }
                                    }
                                }
                                else {
                                    if (this.clickedSquare.innerHTML.includes("/bKing")) {
                                        if (this.x == 0 && this.y == 4) {
                                            if (this.firstClicked.classList.contains("notMoved")) {
                                                this.firstClicked.classList.remove("notMoved");
                                                if (j == 6) {
                                                    this.boardDiv.querySelector(".a05").innerHTML = this.boardDiv.querySelector(".a07").innerHTML;
                                                    this.boardDiv.querySelector(".a07").innerHTML = "";
                                                }
                                                else if (j == 2) {
                                                    this.boardDiv.querySelector(".a03").innerHTML = this.boardDiv.querySelector(".a00").innerHTML;
                                                    this.boardDiv.querySelector(".a00").innerHTML = "";
                                                }
                                            }
                                        }
                                    }

                                    else if (this.clickedSquare.innerHTML.includes("/bRook")) {
                                        if ((this.x == 0 && this.y == 0) || (this.x == 0 && this.y == 7)) {
                                            if (this.firstClicked.classList.contains("notMoved")) {
                                                this.firstClicked.classList.remove("notMoved");
                                            }
                                        }
                                    }
                                }

                            }
                            if (this.clickedSquare.innerHTML.includes("/wP") && i == 0) {
                                let newPiece = this.pawnPromotion("/w");
                                this.clickedSquare.innerHTML = newPiece;
                                this.clickedSquare.style.cursor = 'pointer';
                            }
                            else if (this.clickedSquare.innerHTML.includes("/bP") && i == 7) {
                                let newPiece = this.pawnPromotion("/b");
                                this.clickedSquare.innerHTML = newPiece;
                                this.clickedSquare.style.cursor = 'pointer';
                            }
                            this.removeLegalBackgroundSquares();
                        }
                    }
                });

                if ((i + j) % 2 == 0) {
                    square.classList.add("whiteSquare");
                    square.style.backgroundColor = this.lightSquareCollor;
                    row.appendChild(square);


                }
                else {
                    square.classList.add("blackSquare");
                    square.style.backgroundColor = this.darkSquareCollor;
                    row.appendChild(square);
                }
                if (i == 0) {
                    square.innerHTML = bPiecesArry[j];
                    square.style.cursor = 'pointer';
                    if (j == 4 || j == 0 || j == 7) {
                        square.classList.add("notMoved");
                    }
                }
                else if (i == 1) {
                    square.innerHTML = "<img src=Pieces/bPawn.png>";
                    square.style.cursor = 'pointer';
                }
                else if (i == 7) {
                    square.innerHTML = wPiecesArry[j];
                    square.style.cursor = 'pointer';
                    if (j == 4 || j == 0 || j == 7) {
                        square.classList.add("notMoved");
                    }
                }
                else if (i == 6) {
                    square.innerHTML = "<img src=Pieces/wPawn.png>";
                    square.style.cursor = 'pointer';
                }
            }
        }
    }

    update(collor) {
        let array = this.boardDiv.querySelectorAll(".square");
        this.pickTheCollor(collor);
        array.forEach(el => {
            if (el.classList.contains("legalSquare")) { el.style.backgroundColor = this.legalSquareCollor; }
            if (el.classList.contains("whiteSquare")) { el.style.backgroundColor = this.lightSquareCollor; }
            else { el.style.backgroundColor = this.darkSquareCollor; }
        });
    }

    delete() {
        this.boardDiv.parentNode.removeChild(this.boardDiv);
        this.turn = 0;
    }
}
