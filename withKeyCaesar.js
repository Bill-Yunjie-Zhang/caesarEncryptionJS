let text = "my name is bill"
let key = ["c", "a", 9, 14]

const readyString = function( str ) {
    let al = "abcdefghijklmnopqrstuvwxyz"
    let alArray = al.split("")
    let strArray = str.toLowerCase().split("")
    let result = []
    for (ii = 0; ii < strArray.length; ii ++){
        result.push(alArray.findIndex(e => e === strArray[ii]) + 1)
    }
    return result
}

const readyKey = function(input) {
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
            }
        })
        // for (ii = 0; ii < tmpKey.length; ii ++){
            // if ( typeof tmpKey[ii] === "number") {
            //     keyArray.push(tmpKey[ii] % 26)
            // } else if ( typeof tmpKey[ii] === "string") {
            //     let items = readyString(tmpKey[ii])
            //     // let tmpKeyItem = tmpKey[ii]
            //     // console.log(tmpKey[ii])
            //     // let tmpKeyArray = readyString(tmpKeyItem)
            //     // // for (jj = 0; jj < tmpKeyArray.length; jj ++){
            //     // //     keyArray.push(tmpKeyArray[jj])
            //     // // }
            //     // console.log(readyString(tmpKeyItem))
            //     // console.log(tmpKey)
            //     // console.log(tmpKey[ii])
            // }
        // }
    } else {
        console.log("please enter a string, number, or array")
    }
    return keyArray
}
// // readyKey(key)
// // readyString("Hello")
// console.log(readyKey(key))

const readyText = function (txt) {
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
    let txtArray = readyText(txt)
    let newAlArray = move(num)
    for (ii = 0; ii < txtArray.length; ii++) {
        txtArray[ii] = alArray[newAlArray.findIndex(e => e === txtArray[ii])]
    }
    return txtArray.join("")
}

const caesarDecryption = function (txt, num) {
    let al = "abcdefghijklmnopqrstuvwxyz"
    let alArray = al.split("")
    let txtArray = readyText(txt)
    let newAlArray = move(num)
    for (ii = 0; ii < txtArray.length; ii++) {
        txtArray[ii] = newAlArray[alArray.findIndex(e => e === txtArray[ii])]
    }
    return txtArray.join("")
}

const withKeyEncryption = function (text, key) {
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

const withKeyDecryption = function (text, key) {
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

console.log(withKeyEncryption(text, key))
console.log(withKeyDecryption(withKeyEncryption(text, key), key))