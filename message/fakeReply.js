const fs = require("fs");

let setting = JSON.parse(fs.readFileSync('./config.json'));

exports.fakeStatus = (faketeks, buffer = setting.pathImg) => {
    return { 
        key: { 
            fromMe: false, 
            participant: `0@s.whatsapp.net`, 
            ...({ remoteJid: "status@broadcast" }) 
        }, 
        message: { 
            "imageMessage": { 
                "mimetype": "image/jpeg", 
                "caption": faketeks, 
                "jpegThumbnail": buffer
            } 
        } 
    }
}

exports.fakeToko = (fake, buffer = setting.pathImg) => {
    return {
		key: {
			fromMe: false,
			participant: `0@s.whatsapp.net`, 
            ...({ remoteJid: "status@broadcast" })
		},
		message: {
			"productMessage": {
				"product": {
					"productImage":{
						"mimetype": "image/jpeg",
						"jpegThumbnail": buffer
					},
					"title": fake,
					"description": "Self Aqulzz nih Boss",
					"currencyCode": "IDR",
					"priceAmount1000": "50000000",
					"retailerId": "Self Bot",
					"productImageCount": 1
				},
				"businessOwnerJid": `0@s.whatsapp.net`
		    }
        }
	}
}