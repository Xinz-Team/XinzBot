"use strict";
const axios = require("axios");
const { MessageType, WAMessageProto } = require("@adiwajshing/baileys");
const fs = require("fs");

let setting = JSON.parse(fs.readFileSync('./config.json'));

exports.WAConnection = _WAConnection => {
    class WAConnection extends _WAConnection {
        constructor(...args) {
            super(...args)
		    this.version = [2, 2119, 6]
            this.sendFileFromUrl = this.sendFile
        }
        async sendFileFromUrl(from, url, caption, msg, men) {
            let mime = '';
            let res = await axios.head(url)
            mime = res.headers['content-type']
            let type = mime.split("/")[0]+"Message"
            if(mime === "image/gif"){
                type = MessageType.video
                mime = Mimetype.gif
            }
            if(mime === "application/pdf"){
                type = MessageType.document
                mime = Mimetype.pdf
            }
            if(mime.split("/")[0] === "audio"){
                mime = Mimetype.mp4Audio
            }
            return this.sendMessage(from, await exports.getBuffer(url), type, {caption: caption, quoted: msg, mimetype: mime, contextInfo: {"mentionedJid": men ? men : []}})
        }

        /**
         * Send Contact
         * @param {String} jid 
         * @param {String|Number} number 
         * @param {String} name 
         * @param {Object} quoted 
         * @param {Object} options 
         */
        async sendContact(jid, number, name, quoted, options) {
        // TODO: Business Vcard
        number = number.replace(/[^0-9]/g, '')
        let njid = number + '@s.whatsapp.net'
        let { isBusiness } = await this.isOnWhatsApp(njid) || { isBusiness: false }
        let vcard = 'BEGIN:VCARD\n' + 'VERSION:3.0\n' + 'FN:' + name + '\n' + 'ORG:Kontak\n' + 'TEL;type=CELL;type=VOICE;waid=' + number + ':+' + number + '\n' + 'END:VCARD'.trim()
        return await this.sendMessage(jid, {
            displayName: name,
            vcard
        }, MessageType.contact, { quoted, ...options })
        }

        async sendGroupInvite(jid, participant, inviteCode, inviteExpiration, groupName = 'unknown subject',caption = 'Invitation to join my WhatsApp group', options = {}) {
            let msg = WAMessageProto.Message.fromObject({
              groupInviteMessage: WAMessageProto.GroupInviteMessage.fromObject({
                inviteCode,
                inviteExpiration: parseInt(inviteExpiration) || + new Date(new Date + (3 * 86400000)),
                groupJid: jid,
                groupName: groupName ? groupName : this.getName(jid),
                caption
              })
            })
            let message = await this.prepareMessageFromContent(participant, msg, options)
            await this.relayWAMessage(message)
            return message
        }

        sendImage = (from, buffer, capt = '', msg = '', men = []) => {
            return this.sendMessage(from, buffer, MessageType.image, {caption: capt, quoted: msg, contextInfo: {"mentionedJid": men}})
        }

        sendVideo = (from, buffer, capt = '', msg = '', men = []) => {
            return this.sendMessage(from, buffer, MessageType.video, {caption: capt, quoted: msg, contextInfo: {"mentionedJid": men}})
        }

        textImg = (from, teks, msg = '', buffer = fs.readFileSync(setting.pathImg)) => {
            return this.sendMessage(from, teks, Message.text, {quoted: msg, thumbnail: buffer})
        }

        fakeThumb = (from, buffer, capt = '', msg = '', fakethumb = fs.readFileSync(setting.pathImg), men = []) => {
            let ai = {
                thumbnail: fakethumb ,
                quoted: msg,
                caption: capt,
                contextInfo: {
                    "mentionedJid": men
                }
            }
            return this.sendMessage(from, buffer, MessageType.image, {})
        }

        cekInviteCode = (code) => {
            return this.query({json: ["query", "invite", code]})
        }

        async getQuotedMsg (msg) {
            if (!msg.isQuotedMsg) return false
            let qi = await this.loadMessage(msg.key.remoteJid, msg.quotedMsg.id)
            return await exports.serialize(this, qi)
        }
        /**
         * Get name from jid
         * @param {String} jid 
         * @param {Boolean} withoutContact
         */
        getName(jid, withoutContact = false) {
            withoutContact = this.withoutContact || withoutContact
            let v = jid === '0@s.whatsapp.net' ? {
            jid,
            vname: 'WhatsApp'
            } : jid === this.user.jid ?
            this.user :
            this.contactAddOrGet(jid)
            return (withoutContact ? '' : v.name) || v.vname || v.notify || PhoneNumber('+' + jid.replace('@s.whatsapp.net', '')).getNumber('international')
        }
    }
    return WAConnection
}

exports.serialize = (xinz, msg) => {
    if (msg.message["ephemeralMessage"]){
        msg.message = msg.message.ephemeralMessage.message
        msg.ephemeralMessage = true
        
    }else{
      msg.ephemeralMessage = false
    }
    msg.isGroup = msg.key.remoteJid.endsWith('@g.us')
    try{
        const berak = Object.keys(msg.message)[0]
        msg.type = berak
    } catch {
        msg.type = null
    }
    try{
        const context = msg.message[msg.type].contextInfo.quotedMessage
        if(context["ephemeralMessage"]){
            msg.quotedMsg = context.ephemeralMessage.message
        }else{
            msg.quotedMsg = context
        }
        msg.isQuotedMsg = true
        msg.quotedMsg.sender = msg.message[msg.type].contextInfo.participant
        msg.quotedMsg.fromMe = msg.quotedMsg.sender === xinz.user.jid ? true : false
        msg.quotedMsg.type = Object.keys(msg.quotedMsg)[0]
        let ane = msg.quotedMsg
        msg.quotedMsg.chats = (ane.type === 'conversation' && ane.conversation) ? ane.conversation : (ane.type == 'imageMessage') && ane.imageMessage.caption ? ane.imageMessage.caption : (ane.type == 'documentMessage') && ane.documentMessage.caption ? ane.documentMessage.caption : (ane.type == 'videoMessage') && ane.videoMessage.caption ? ane.videoMessage.caption : (ane.type == 'extendedTextMessage') && ane.extendedTextMessage.text ? ane.extendedTextMessage.text : ""
        msg.quotedMsg.id = msg.message[msg.type].contextInfo.stanzaId
        msg.quotedMsg.isBaileys = msg.quotedMsg.id.startsWith('3EB0') && msg.quotedMsg.id.length === 12
    }catch{
        msg.quotedMsg = null
        msg.isQuotedMsg = false
    }

    try{
        const mention = msg.message[msg.type].contextInfo.mentionedJid
        msg.mentioned = mention
    }catch{
        msg.mentioned = []
    }
    
    if (msg.isGroup){
        msg.sender = msg.participant
    }else{
        msg.sender = msg.key.remoteJid
    }
    if (msg.key.fromMe){
        msg.sender = xinz.user.jid
    }

    msg.from = msg.key.remoteJid
    msg.fromMe = msg.key.fromMe
    msg.isBaileys = msg.key.id.startsWith('3EB0') && msg.key.id.length === 12

    const conts = msg.key.fromMe ? xinz.user.jid : xinz.contacts[msg.sender]
	msg.pushname = msg.key.fromMe ? xinz.user.name : !conts ? '-' : conts.notify || conts.vname || conts.name || '-'   

    msg.chats = (msg.type === 'conversation' && msg.message.conversation) ? msg.message.conversation : (msg.type == 'imageMessage') && msg.message.imageMessage.caption ? msg.message.imageMessage.caption : (msg.type == 'documentMessage') && msg.message.documentMessage.caption ? msg.message.documentMessage.caption : (msg.type == 'videoMessage') && msg.message.videoMessage.caption ? msg.message.videoMessage.caption : (msg.type == 'extendedTextMessage') && msg.message.extendedTextMessage.text ? msg.message.extendedTextMessage.text : ""

    return msg
}

exports.getRandom = (ext) => {
    return `${Math.floor(Math.random() * 10000)}${ext}`
}
exports.getBuffer = async (url, options) => {
	try {
		options ? options : {}
		const res = await axios({
			method: "get",
			url,
			headers: {
				'DNT': 1,
				'Upgrade-Insecure-Request': 1
			},
			...options,
			responseType: 'arraybuffer'
		})
		return res.data
	} catch (e) {
		console.log(`Error : ${e}`)
	}
}

exports.getGroupAdmins = function(participants){
    let admins = []
	for (let i of participants) {
		i.isAdmin ? admins.push(i.jid) : ''
	}
	return admins
}

exports.runtime = function(seconds) {
	seconds = Number(seconds);
	var d = Math.floor(seconds / (3600 * 24));
	var h = Math.floor(seconds % (3600 * 24) / 3600);
	var m = Math.floor(seconds % 3600 / 60);
	var s = Math.floor(seconds % 60);
	var dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : "";
	var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
	var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
	var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
	return dDisplay + hDisplay + mDisplay + sDisplay;
}

exports.sleep = async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}
