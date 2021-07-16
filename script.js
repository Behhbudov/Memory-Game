const cedvel = document.getElementById("cedvel");
let icon = ["empty","bloggr","deviantart","digg","email","share","stumbleupon","vimeo","youtube"];
let arr = [];
let matrix = [];
let mask = [];
let prev = [];

for (let i = 1; i <= 8; i++) {
    arr.push(i);
    arr.push(i);
}

for (let i = 0; i < 4; i++) {
    matrix[i] = [];
    mask[i] = [];
    for (let j = 0; j < 4; j++) {
        let x = rand(0, arr.length - 1);
        matrix[i][j] = arr[x];
        mask[i][j] = 1;
        arr.splice(x, 1);
    }
}

show();
setTimeout(iclose, 3000);

function show() {
    let kod = "";
    for (let i = 0; i < 4; i++) {
        kod += "<tr>";
        for (let j = 0; j < 4; j++) {
            let img = 'icons/' + icon[ mask[i][j] ? matrix[i][j] : 0 ] + '.png';
            kod += `<td><img onclick="iopen(${i}, ${j})" src="${img}" /></td>`;
        }
        kod += "</tr>";
    }
    cedvel.innerHTML = kod;
}

function iopen(i, j) {
    mask[i][j] = 1;
    show();
    if(prev.length == 0) {
        prev[0] = i;
        prev[1] = j;
    } else {
        setTimeout(check, 1000, i, j);
    }
}

function check(i, j) {
    if (matrix[i][j] != matrix[ prev[0] ][ prev[1] ]) {
        mask[i][j] = 0;
        mask[ prev[0] ][ prev[1] ] = 0;
    }    
    show();
    prev = [];
}

function iclose() {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            mask[i][j] = 0;
        }
    }
    show();
}

function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}