function unroll(squareArray) {
    /**
     * There are two processes which alternate in order to spiral around the array: scan and dig
     * scan will move from right or left (alternating) adding values to the result array if they havent already been added
     * dig will do the same but up and down alternating.
     * At the end of each process, it will initiate the next process in the alternate mode
     */

    // define resultArray
    const resultArray = [];

    // define scan
    function scan(currSqaureArray, scanType) {
        // forwards mode: go left to right and then call dig(down)
        if (scanType == 'forwards') {
            for (i = 0; i <= currSqaureArray[0].length - 1; i++) {
                resultArray.push(currSqaureArray[0][i])
            }
            currSqaureArray.splice(0, 1)
            if (currSqaureArray.length) dig(currSqaureArray, 'down')
        }
        // backwards mode: go right to left then call dig up
        else {
            for (i = currSqaureArray[currSqaureArray.length - 1].length - 1; i >= 0; i--) {
                resultArray.push(currSqaureArray[currSqaureArray.length - 1][i])
            }
            currSqaureArray.splice(currSqaureArray.length - 1, 1)
            if (currSqaureArray.length) dig(currSqaureArray, 'up')
        }
    }

    function dig(currSqaureArray, digType) {
        // down mode: pop the last value of the arrays top to bottom then call scan(backwards)
        if (digType == 'down') {
            for (array of currSqaureArray) {
                resultArray.push(array.pop())
            }
            if(currSqaureArray.length) scan(currSqaureArray, 'backwards')
        }
        // up mode: shift the first value of arrays bottom to top then call scan(forwards)
        else {
            for (let i = currSqaureArray.length - 1; i >= 0; i--) {
                resultArray.push(currSqaureArray[i].shift())
            }
            if(currSqaureArray.length) scan(currSqaureArray, 'forwards')
        }

    }

    // init with a forwards scan
    // this function call with only resolve once the entire array has been rolled out
    scan(squareArray, 'forwards')
    
    return (resultArray)
}
/* console.log(unroll([
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 16]
  ]
)) */
module.exports = unroll;
