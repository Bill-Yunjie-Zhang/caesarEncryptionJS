let text = "my name is bill"

const ready = function (txt) {
    return txt.replace(/ /g, "").toLowerCase().split("")
}

const move = function (step) {
    let al = "abcdefghijklmnopqrstuvwxyz"
    let alArray = al.split("")
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

const caesarEncryption = function (txt, num) {
    let al = "abcdefghijklmnopqrstuvwxyz"
    let alArray = al.split("")
    let txtArray = ready(txt)
    let newAlArray = move(num)
    for (ii = 0; ii < txtArray.length; ii++) {
        txtArray[ii] = alArray[newAlArray.findIndex(e => e === txtArray[ii])]
    }
    return txtArray.join("")
}

const caesarDecryption = function (txt, num) {
    let al = "abcdefghijklmnopqrstuvwxyz"
    let alArray = al.split("")
    let txtArray = ready(txt)
    let newAlArray = move(num)
    for (ii = 0; ii < txtArray.length; ii++) {
        txtArray[ii] = newAlArray[alArray.findIndex(e => e === txtArray[ii])]
    }
    return txtArray.join("")
}

const withKeyEncryption = function (text, keyArray) {
    let keyArrayLength = keyArray.length
    let txt = text
    let txtArray = ready(txt)
    let txtLength = txtArray.length
    // console.log(keyArray)
    if (keyArrayLength <= txtLength) {
        for (ii = 0; ii < txtLength - keyArrayLength; ii++) {
            keyArray.push(keyArray[ii])
        }
    }
    let encryptionResults = []
    for (aa = 0; aa < txtLength; aa++) {
        encryptionResults.push(caesarEncryption(txtArray[aa], keyArray[aa]))
    }
    return encryptionResults.join("")
}

const withKeyDecryption = function (text, keyArray) {
    let keyArrayLength = keyArray.length
    let txt = text
    let txtArray = ready(txt)
    let txtLength = txtArray.length
    if (keyArrayLength <= txtLength) {
        for (ii = 0; ii < txtLength - keyArrayLength; ii++) {
            keyArray.push(keyArray[ii])
        }
    }
    let encryptionResults = []
    for (aa = 0; aa < txtLength; aa++) {
        encryptionResults.push(caesarDecryption(txtArray[aa], keyArray[aa]))
    }
    return encryptionResults.join("")
}

console.log(withKeyEncryption(text, [3, 1, 9, 14]))
console.log(withKeyDecryption(withKeyEncryption(text, [3, 1, 9, 14]), [3, 1, 9, 14]))