const readyText = function (txt) {
    return txt.replace(/ /g, "").toLowerCase().split("")
}

const readyString = ( str ) => {
    let al = "abcdefghijklmnopqrstuvwxyz"
    let alArray = al.split("")
    let strArray = readyText(str)
    let result = []
    for (ii = 0; ii < strArray.length; ii ++){
        result.push(alArray.findIndex(e => e === strArray[ii]) + 1)
    }
    return result
}

const readyKey = (input) => {
    let tmpKey = input
    let keyArray = []
    if (typeof tmpKey === "string") {
        keyArray = readyString(tmpKey)
    } else if (typeof tmpKey === "number") {
        keyArray.push(tmpKey % 26)
    } else if (typeof tmpKey === "object") {
        tmpKey.forEach(e => {
            if ( typeof e === "number") {
                keyArray.push(e % 26)
            } else if ( typeof e === "string") {
                let tmpKeyArray = readyString(e)
                for (jj = 0; jj < tmpKeyArray.length; jj ++){
                    keyArray.push(tmpKeyArray[jj])
                }
            } else {
                console.log("please enter a string, a number, or an array")
            }
        })
    } else {
        console.log("please enter a string, a number, or an array")
    }
    return keyArray
}

const move = (step) => {
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

const caesarEncryption = (txt, num) => {
    let al = "abcdefghijklmnopqrstuvwxyz"
    let alArray = al.split("")
    let txtArray = readyText(txt)
    let newAlArray = move(num)
    for (ii = 0; ii < txtArray.length; ii++) {
        txtArray[ii] = alArray[newAlArray.findIndex(e => e === txtArray[ii])]
    }
    return txtArray.join("")
}

const caesarDecryption = (txt, num) => {
    let al = "abcdefghijklmnopqrstuvwxyz"
    let alArray = al.split("")
    let txtArray = readyText(txt)
    let newAlArray = move(num)
    for (ii = 0; ii < txtArray.length; ii++) {
        txtArray[ii] = newAlArray[alArray.findIndex(e => e === txtArray[ii])]
    }
    return txtArray.join("")
}

const withKeyEncryption = (text, key) => {
    let keyArray = readyKey(key)
    let keyArrayLength = keyArray.length
    let txt = text
    let txtArray = readyText(txt)
    let txtLength = txtArray.length
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

const withKeyDecryption = (text, key) => {
    let keyArray = readyKey(key)
    let keyArrayLength = keyArray.length
    let txt = text
    let txtArray = readyText(txt)
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

let text = "my name is bill"
let key = "cain"

console.log(withKeyEncryption(text, key))
console.log(withKeyDecryption(withKeyEncryption(text, key), key))