let text = "my and is bill"

const al = "abcdefghijklmnopqrstuvwxyz"
const alArray = al.split("")

const ready = function (txt) {
    return txt.replace(/ /g, "").toLowerCase().split("")
}

const move = function (step) {
    let alphabet = []
    for (ii = 0; ii < 26; ii++) {
        alphabet.push(ii)
    }

    let afterStepAlphabet = []
    for (jj = 0; jj < 26; jj++) {
        if (jj - step < 0) {
            afterStepAlphabet.push(jj - step + 26)
        } else {
            afterStepAlphabet.push(jj - step)
        }
    }

    for (kk = 0; kk < 26; kk++) {
        afterStepAlphabet[kk] = alArray[afterStepAlphabet[kk]]
    }

    return afterStepAlphabet
}

const caesarEncryption = function(txt, num) {
    let txtArray = ready(txt)
    let newAlArray = move(num)
    // console.log(txtArray)
    for ( ii = 0; ii < txtArray.length; ii ++){
        // console.log(txtArray[ii])
        // console.log(alArray.findIndex(e => e === txtArray[ii]))
        txtArray[ii] = newAlArray[alArray.findIndex(e => e === txtArray[ii])]
    }
    // console.log(txtArray)
    // console.log(newAlArray)
    return txtArray.join("")
}

console.log(caesarEncryption(text, 9))
// console.log(ready(text))
// console.log(caesar(1))