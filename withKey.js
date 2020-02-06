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
    for ( ii = 0; ii < txtArray.length; ii ++){
        txtArray[ii] = newAlArray[alArray.findIndex(e => e === txtArray[ii])]
    }
    return txtArray.join("")
}

const withKey = function(txt, key) {
    let keyArray = key.split("")
    let keyArrayLength = keyArray.length
    let txtLength = txt.length
    if( keyArrayLength <= txtLength) {
        for( ii = 0; ii < txtLength; ii ++){
            keyArray = keyArray.push(keyArray[ii])
        }
    }
}

console.log(Hello)