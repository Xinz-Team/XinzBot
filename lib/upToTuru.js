const axios = require("axios");
const qs = require("qs");

module.exports = async(base64) => {
    return new Promise((resolve, reject) => {
        axios.post("https://turupedia.net/api/1/upload", qs.stringify({
            key: "turunet",
            source: base64,
            format: "json"
        }),
            {
                headers: {
                    "user-agent": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36"
                }
            }
        )
        .then(({data}) => resolve(data))
        .catch(reject)
    })
}