const fetch = require("node-fetch");

function post(url, formdata) {
    return fetch(url, {
        method: 'POST',
        headers: {
            accept: "*/*",
            'X-Requested-With': "XMLHttpRequest",
            'content-type': "application/x-www-form-urlencoded; charset=UTF-8"
        },
        body: new URLSearchParams(Object.entries(formdata))
    })
}

exports.fbdl = async(url) => {
    let resu = await post('https://saveas.co/system/action.php', {
        url: url, 
        token: ''
    })
    let res = await resu.json()
    let result = { status: true, creator: `aqulzz`, result: res }
    return result
}