import css from '../css/main.scss';
import Antigen from './Antigen';
import ImunSystem from './ImunSystem';

let symbol1 = [
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 0],
];
let symbol2 = [
    [1, 0, 1],
    [1, 0, 1],
    [1, 1, 1],
    [0, 0, 1],
];
let symbol3 = [
    [1, 1, 1],
    [0, 0, 1],
    [0, 0, 1],
    [0, 0, 1],
];

let antigens = generateAntigen(symbol1, symbol2, symbol3);

let system = new ImunSystem(antigens);

system.start();
showResults();


function showResults() {
    let antigenDiv = document.getElementById("antigen");
    let antibodyDiv = document.getElementById("antibody");
    for(let ag of system.memoryAb.keys()) {
        antigenDiv.innerHTML += printArrayToHtml(ag.array);
    }
    for(let ab of system.memoryAb.values()) {
        antibodyDiv.innerHTML += printArrayToHtml(ab.array, ab.affinity);
    }
}
function printArrayToHtml(arr, affinity = undefined) {
    let html = ``;
    if(affinity !== undefined)
        html += `affinity = ${affinity} <br>`;
    else
        html += `<br>`;

    for(let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[0].length; j++){
            html += arr[i][j];
        }
        html += `<br>`;
    }
    html+= `<br>`;
    return html;
}


function generateAntigen(...args) {
    let antigens = [];
    for(let i = 0; i < args.length; i++){
        antigens[i] = new Antigen(args[i]);
    }
    return antigens;
}
