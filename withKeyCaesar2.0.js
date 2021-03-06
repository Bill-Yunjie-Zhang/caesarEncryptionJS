const readyText = (txt) => {
    let txtArr = []
    let al = "abcdefghijklmnopqrstuvwxyz"
    let alArray = al.split("")
    txt.replace(/ /g, "").toLowerCase().split("").forEach(e => {
        if (alArray.find(ele => ele === e)){
            txtArr.push(e)
        }
    });
    return txtArr
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

let text = "In my younger and more vulnerable years my father gaveme some advice that I’ve been turning over in my mindever since.‘Whenever you feel like criticizing any one,’ he told me,‘just remember that all the people in this world haven’t hadthe advantages that you’ve had.’He didn’t say any more but we’ve always been unusuallycommunicative in a reserved way, and I understood that hemeant a great deal more than that. In consequence I’m inclined to reserve all judgments, a habit that has opened upmany curious natures to me and also made me the victimof not a few veteran bores. The abnormal mind is quick todetect and attach itself to this quality when it appears in anormal person, and so it came about that in college I wasunjustly accused of being a politician, because I was privyto the secret griefs of wild, unknown men. Most of the confidences were unsought—frequently I have feigned sleep,preoccupation, or a hostile levity when I realized by someunmistakable sign that an intimate revelation was quivering on the horizon—for the intimate revelations of youngmen or at least the terms in which they express them areusually plagiaristic and marred by obvious suppressions.Reserving judgments is a matter of infinite hope."
let key = "cain"

console.log(withKeyEncryption(text, key))
console.log(withKeyDecryption(withKeyEncryption(text, key), key))