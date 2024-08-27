var attackAbility = 11;
var attackScale = 1.7;
function rand(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function rand2(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function rand3(seed) {
    let value = seed;
    return Math.random() * seed % seed;
}

console.log(Math.random());