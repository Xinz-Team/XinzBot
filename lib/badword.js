const fs = require('fs')

/**
 * Add badword in database
 * @param {String} kata
 * @param {Object} data
 */
exports.addBadword = function(kata, _dir){
    _dir.push(kata)
    fs.writeFileSync('./database/badword.json', JSON.stringify(_dir))
}

/**
 * delete badword in database
 * @param {String} kata
 * @param {Object} data
 */
 exports.delBadword = function(kata, _dir){
    anu = _dir.indexOf(kata)
    _dir.splice(anu, 1)
    fs.writeFileSync('./database/badword.json', JSON.stringify(_dir))
}

/**
 * check badword in database
 * @param {String} kata
 * @param {Object} data
 */
 exports.isKasar = function(kata, _dir){
    let status = false
    if (_dir.includes(kata)){
        status = true
    }
    return status
}

/**
 * AddCount badword in database
 * @param {String} sender
 * @param {Object} data
 */
 exports.addCountKasar = function(sender, _dir){
    var found = false;
    Object.keys(_dir).forEach((i) => {
        if(_dir[i].id == sender){
            found = i
        }
    })
    if (found !== false) {
        _dir[found].count += 1;
        fs.writeFileSync('./database/senbadword.json',JSON.stringify(_dir));
    }
}

/**
 * isCOuntKasr badword in database
 * @param {String} sender
 * @param {Object} data
 */
 exports.isCountKasar = function(sender, _dir){
    let found = false
    for (let i of _dir) {
        if (i.id === sender) {
            let counts = i.count
            if (counts >= 5) {
                found = true
                return true
            } else {
                found = true
                return false
            }
        }
    }
    if (found === false){
        const obj = { id: sender, count: 1 }
        _dir.push(obj)
        fs.writeFileSync('./database/senbadword.json', JSON.stringify(_dir))
        return false
    }
}

/**
 * Delete Count Kasar badword in database
 * @param {String} sender
 * @param {Object} data
 */
 exports.delCountKasar = function(sender, _dir){
    Object.keys(_dir).forEach((i) => {
        if (_dir[i].id === sender) {
            _dir.splice(i, 1)
            fs.writeFileSync('./database/senbadword.json', JSON.stringify(_dir))
        }
    })
    return true
}