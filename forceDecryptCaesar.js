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
        let al = "abcdefghijklmnopqrstuvwxyz"
        let alArray = al.split("")
        afterStepAlphabet[kk] = alArray[afterStepAlphabet[kk]]
    }

    return afterStepAlphabet
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

const forceDecryptCaesar = function (txt) {
    let allcombos = []
    for (ll = 0; ll < 25; ll++) {
        allcombos.push(caesarDecryption(txt, ll))
    }
    return allcombos
}

const checkStep = function (encryptedTxt, txt) {
    if (forceDecryptCaesar(encryptedTxt).find(e => e === txt)){
        return forceDecryptCaesar(encryptedTxt).findIndex(e => e === txt)
    } else {
        return "incorrect text"
    }
}