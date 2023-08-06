const size = 5

function shouldP(places, i, j, I, J) {
    if (i === -1 || j === -1 || i === 5 || j === 5) {
        return false
    }
    return !(i === I && j === J) && places[i][j] === 'P'
}

function aroundP(places, i, j, I, J) {
    return shouldP(places, i-1, j, I, J)
        || shouldP(places, i, j-1, I, J)
        || shouldP(places, i+1, j, I, J)
        || shouldP(places, i, j+1, I, J)
}

function shouldOAndP(places, i, j, I, J) {
    if (i === -1 || j === -1 || i === 5 || j === 5) {
        return false
    }
    if (places[i][j] === 'P') {
        return true
    }
    return places[i][j] === 'O'
        && aroundP(places, i, j, I, J)
}

function hasAroundP(places, i, j) {
    return shouldOAndP(places, i-1, j, i, j)
        || shouldOAndP(places, i, j-1, i, j)
        || shouldOAndP(places, i+1, j, i, j)
        || shouldOAndP(places, i, j+1, i, j)
}

function checkPlace(places) {
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            if (
                places[i][j] === 'P' &&
                hasAroundP(places, i, j)
            ) {
                return 0
            }
        }
    }
    return 1
}

function solution(places) {
    return places.map((place) => {
        return checkPlace(place)
    });
}