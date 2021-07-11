"use strict";
const {
    WAConnection,
    MessageType,
    Presence,
    Mimetype,
    GroupSettingChange,
    MessageOptions,
    WALocationMessage,
    WA_MESSAGE_STUB_TYPES,
    ReconnectMode,
    ProxyAgent,
    waChatKey,
    mentionedJid,
    WA_DEFAULT_EPHEMERAL
} = require("@adiwajshing/baileys");
const fs = require("fs");
const moment = require("moment-timezone");
const { exec, spawn } = require("child_process");
const ffmpeg = require("fluent-ffmpeg");
const fetch = require("node-fetch");
const ms = require("parse-ms");
const axios = require("axios");
const speed = require("performance-now");
const yts = require("yt-search");
const translate = require("@vitalets/google-translate-api");
const { da } = require("@vitalets/google-translate-api/languages");

// stickwm
const Exif = require('../lib/exif')
const exif = new Exif()

const { color, bgcolor } = require("../lib/color");
const { getBuffer, getRandom, getGroupAdmins, runtime } = require("../lib/myfunc");
const { isLimit, limitAdd, getLimit, giveLimit, addBalance, kurangBalance, getBalance, isGame, gameAdd, givegame, cekGLimit } = require("../lib/limit");
const _prem = require("../lib/premium");
const afk = require("../lib/afk");
const { addBanned, unBanned, BannedExpired, cekBannedUser } = require("../lib/banned");
const { isTicTacToe, getPosTic } = require("../lib/tictactoe");
const tictac = require("../lib/tictac");
const { yta, ytv } = require("../lib/ytdl");
const { getUser, getPost, searchUser } = require('../lib/instagram');
const { fbdl } = require("../lib/fbdl");
const { fakeStatus, fakeToko } = require("./fakeReply");
const game = require("../lib/game");
const { addBadword, delBadword, isKasar, addCountKasar, isCountKasar, delCountKasar } = require("../lib/badword");

// Database
let pendaftar = JSON.parse(fs.readFileSync('./database/user.json'))
let setting = JSON.parse(fs.readFileSync('./config.json'));
let mess = JSON.parse(fs.readFileSync('./message/mess.json'));
let limit = JSON.parse(fs.readFileSync('./database/limit.json'));
let glimit = JSON.parse(fs.readFileSync('./database/glimit.json'));
let balance = JSON.parse(fs.readFileSync('./database/balance.json'));
let premium = JSON.parse(fs.readFileSync('./database/premium.json'));
let ban = JSON.parse(fs.readFileSync('./database/ban.json'));
let antilink = JSON.parse(fs.readFileSync('./database/antilink.json'));
let badword = JSON.parse(fs.readFileSync('./database/badword.json'));
let grupbadword = JSON.parse(fs.readFileSync('./database/grupbadword.json'));
let senbadword = JSON.parse(fs.readFileSync('./database/senbadword.json'));
let mute = JSON.parse(fs.readFileSync('./database/mute.json'));


// Game
let tictactoe = [];
let tebakgambar = [];
let family100 = [];

// Prefix
let multi = true
let nopref = false
let prefa = 'anjing'

// Mode
let mode = 'public'

let {
    ownerNumber,
    limitCount,
    lolkey,
    gamewaktu
} = setting

moment.tz.setDefault("Asia/Jakarta").locale("id");

module.exports = async(xinz, msg, blocked, baterai, _afk, welcome, left) => {
    try {
        const { menu } = require("./help");
        const { type, quotedMsg, isGroup, isQuotedMsg, mentioned, sender, from, fromMe, pushname, chats, isBaileys } = msg
        if (isBaileys) return
        const { text, extendedText, contact, location, liveLocation, image, video, sticker, document, audio, product } = MessageType
        const args = chats.split(' ')
		const command = chats.toLowerCase().split(' ')[0] || ''

        if (multi){
		    var prefix = /^[°•π÷×¶∆£¢€¥®™✓_=|~!?#$%^&.+-,\/\\©^]/.test(command) ? command.match(/^[°•π÷×¶∆£¢€¥®™✓_=|~!?#$%^&.+-,\/\\©^]/gi) : '#'
        } else {
            if (nopref){
                prefix = ''
            } else {
                prefix = prefa
            }
        }

        const isCmd = command.startsWith(prefix)
        const q = chats.slice(command.length + 1, chats.length)
        const body = chats.startsWith(prefix) ? chats : ''

        const botNumber = xinz.user.jid
        const groupMetadata = isGroup ? await xinz.groupMetadata(from) : ''
		const groupName = isGroup ? groupMetadata.subject : ''
		const groupId = isGroup ? groupMetadata.jid : ''
		const groupMembers = isGroup ? groupMetadata.participants : ''
		const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
		const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
		const isGroupAdmins = groupAdmins.includes(sender) || false

        const isOwner = ownerNumber.includes(sender)
        const isPremium = isOwner ? true : _prem.checkPremiumUser(sender, premium)
	    const isBan = cekBannedUser(sender, ban)
        const isAfkOn = afk.checkAfkUser(sender, _afk)
        const isAntiLink = isGroup ? antilink.includes(from) : false
        const isWelcome = isGroup ? welcome.includes(from) : false
        const isLeft = isGroup ? left.includes(from) : false
        const isUser = pendaftar.includes(sender)
        const isBadword = isGroup ? grupbadword.includes(from) : false
        const isMuted = isGroup ? mute.includes(from) : false
        
        const gcounti = setting.gcount
        const gcount = isPremium ? gcounti.prem : gcounti.user

        const isUrl = (url) => {
            return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
        }
        function monospace(string) {
            return '```' + string + '```'
        }   
        function jsonformat(string) {
            return JSON.stringify(string, null, 2)
        }
        function randomNomor(angka){
            return Math.floor(Math.random() * angka) + 1
        }
        const nebal = (angka) => {
            return Math.floor(angka)
        }
        const reply = (teks) => {
            return xinz.sendMessage(from, teks, text, {quoted:msg})
        }
        const sendMess = (hehe, teks) => {
            return xinz.sendMessage(hehe, teks, text)
        }
        const mentions = (teks, memberr, id) => {
            let ai = (id == null || id == undefined || id == false) ? xinz.sendMessage(from, teks.trim(), extendedText, {contextInfo: {"mentionedJid": memberr}}) : xinz.sendMessage(from, teks.trim(), extendedText, {quoted: msg, contextInfo: {"mentionedJid": memberr}})
            return ai
        }
        async function sendFileFromUrl(from, url, caption, msg, men) {
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
            return xinz.sendMessage(from, await getBuffer(url), type, {caption: caption, quoted: msg, mimetype: mime, contextInfo: {"mentionedJid": men ? men : []}})
        }
        const textImg = (teks) => {
            return xinz.sendMessage(from, teks, text, {quoted: msg, thumbnail: fs.readFileSync(setting.pathImg)})
        }

        const isImage = (type === 'imageMessage')
        const isVideo = (type === 'videoMessage')
        const isSticker = (type == 'stickerMessage')
        const isQuotedImage = isQuotedMsg ? (quotedMsg.type === 'imageMessage') ? true : false : false
        const isQuotedVideo = isQuotedMsg ? (quotedMsg.type === 'videoMessage') ? true : false : false
        const isQuotedSticker = isQuotedMsg ? (quotedMsg.type === 'stickerMessage') ? true : false : false

        // Mode
        if (mode === 'self'){
            if (!fromMe) return
        }

        // Anti link
        if (isGroup && isAntiLink && !isOwner && !isGroupAdmins && isBotGroupAdmins){
            if (chats.match(/(https:\/\/chat.whatsapp.com)/gi)) {
                reply(`*「 GROUP LINK DETECTOR 」*\n\nParece que enviaste el enlace del grupo, lo siento, serás expulsado`)
                xinz.groupRemove(from, [sender])
            }
        }

        // Badword
        if (isGroup && isBadword && !isOwner && !isGroupAdmins){
            for (let kasar of badword){
                if (chats.toLowerCase().includes(kasar)){
                    if (isCountKasar(sender, senbadword)){
                        if (!isBotGroupAdmins) return reply(`Tienes suerte porque los bots no son administradores`)
                        reply(`*「 ANTI BADWORD 」*\n\nParece que dijiste grosero más de 5 veces, lo siento, te patearán`)
                        xinz.groupRemove(from, [sender])
                        delCountKasar(sender, senbadword)
                    } else {
                        addCountKasar(sender, senbadword)
                        reply(`Fuiste detectado como grosero\nNo lo hagas de nuevo o te patearán`)
                    }
                }
            }
        }

        // Banned
        if (isBan) return
        BannedExpired(ban)

        // MUTE
        if (isMuted){
            if (!isGroupAdmins && !isOwner) return
            if (chats.toLowerCase().startsWith(prefix+'unmute')){
                let anu = mute.indexOf(from)
                mute.splice(anu, 1)
                fs.writeFileSync('./database/mute.json', JSON.stringify(mute))
                reply(`Se ha desactivado el sonido del bot en este grupo`)
            }
        }

        // TicTacToe
        if (isTicTacToe(from, tictactoe)) tictac(chats, prefix, tictactoe, from, sender, reply, mentions, addBalance, balance)

        // GAME 
        game.cekWaktuFam(xinz, family100)
        game.cekWaktuTG(xinz, tebakgambar)

        // GAME 
        if (game.isTebakGambar(from, tebakgambar) && isUser){
            if (chats.toLowerCase().includes(game.getJawabanTG(from, tebakgambar))){
                var htgm = randomNomor(100)
                addBalance(sender, htgm, balance)
                await reply(`*Felicitaciones, tu respuesta es correcta*\n*Respuesta :* ${game.getJawabanTG(from, tebakgambar)}\n*Regalo :* $${htgm}\n\nQuieres jugar de nuevo? Enviar *${prefix}tebakgambar*`)
                tebakgambar.splice(game.getTGPosi(from, tebakgambar), 1)
            }
        }
        if (game.isfam(from, family100) && isUser){
            var anjuy = game.getjawaban100(from, family100)
            for (let i of anjuy){
                if (chats.toLowerCase().includes(i)){
                    var htgmi = Math.floor(Math.random() * 20) + 1
                    addBalance(sender, htgmi, balance)
                    await reply(`*Respuesta correcta*\n*Respuesta :* ${i}\n*Regalo :* $${htgmi}\n*Respuesta imprevista :* ${anjuy.length - 1}`)
                    var anug = anjuy.indexOf(i)
                    anjuy.splice(anug, 1)
                }
            }
            if (anjuy.length < 1){
                xinz.sendMessage(from, `Todas las respuestas son adivinadas\nEnviar *${prefix}family100* jugar de nuevo`, text)
                family100.splice(game.getfamposi(from, family100), 1)
            }
        }
        // Premium
        _prem.expiredCheck(premium)

        // Auto Regist
        if (isCmd && !isUser){
			pendaftar.push(sender)
			fs.writeFileSync('./database/user.json', JSON.stringify(pendaftar))
        } 

        // AFK
        if (isGroup) {
            if (mentioned.length !== 0){
                for (let ment of mentioned) {
                    if (afk.checkAfkUser(ment, _afk)) {
                        const getId = afk.getAfkId(ment, _afk)
                        const getReason = afk.getAfkReason(getId, _afk)
                        const getTime = Date.now() - afk.getAfkTime(getId, _afk)
                        const heheh = ms(getTime)
                        await mentions(`@${ment.split('@')[0]} ser afk\n\n*Razón :* ${getReason}\n*Sejak :* ${heheh.hours} Hora, ${heheh.minutes} Minuto, ${heheh.seconds} Hace segundos`, [ment], cierto)
                        sendMeset( `Alguien te está buscando cuando no estás conectado\n\nNombre  : ${pushname}\nNumero : wa.me/${sender.split("@")[0]}\nEn Grupo : ${groupName}\nmensaje : ${chats}`)
                    }
                }
            }
            if (afk.checkAfkUser(sender, _afk)) {
                _afk.splice(afk.getAfkPosition(sender, _afk), 1)
                fs.writeFileSync('./database/afk.json', JSON.stringify(_afk))
                await mentions(`@${sender.split('@')[0]} ya regresó`, [sender], cierto)
            }
        }

        // Auto Read
        xinz.chatRead(from, "read")

        // CMD
        if (isCmd && !isGroup) {
			//xinz.updatePresence(from, Presence.composing)
            addBalance(sender, randomNomor(20), balance)
			console.log(color('[CMD]'), color(moment(msg.messageTimestamp * 1000).format('DD/MM/YYYY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`))
        }
        if (isCmd && isGroup) {
			//xinz.updatePresence(from, Presence.composing)
            addBalance(sender, randomNomor(20), balance)
			console.log(color('[CMD]'), color(moment(msg.messageTimestamp * 1000).format('DD/MM/YYYY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname), 'in', color(groupName))
        }

        if (isOwner){
            if (chats.startsWith("> ")){
                console.log(color('[EVAL]'), color(moment(msg.messageTimestamp * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`Dari Owner aowkoakwoak`))
                try {
                    let evaled = await eval(chats.slice(2))
                    if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)
                    textImg(`${evaled}`)
                } catch (err) {
                    textImg(`${err}`)
                }
            } else if (chats.startsWith("$ ")){
                console.log(color('[EXEC]'), color(moment(msg.messageTimestamp * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`Dari Owner aowkoakwoak`))
                exec(chats.slice(2), (err, stdout) => {
					if (err) return textImg(`${err}`)
					if (stdout) textImg(`${stdout}`)
				})
            }
        }
        
        switch(command){
            case 'prefix': case 'cekprefix':{
                textImg(`${prefix}`)
            }
                break
            case prefix+'help': case prefix+'menu':{
                textImg(menu(prefix, setting.emote))
            }
                break
//------------------< Sticker / Tools >-------------------
            case prefix+'exif':{
				if (!isOwner) return
				const namaPack = q.split('|')[0] ? q.split('|')[0] : q
				const authorPack = q.split('|')[1] ? q.split('|')[1] : ''
				exif.create(namaPack, authorPack)
				await reply('Done gan')
            }
				break
            case prefix+'sticker':
            case prefix+'stiker':
            case prefix+'s':
            case prefix+'stickergif':
            case prefix+'sgif':{
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Su límite ha expirado, envíe $ {prefix} limit para verificar el límite`)
                if (isImage || isQuotedImage) {
                    let encmedia = isQuotedImage ? JSON.parse(JSON.stringify(msg).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : msg
                    let media = await xinz.downloadAndSaveMediaMessage(encmedia, `./sticker/${sender}`)
                    await ffmpeg(`${media}`)
							.input(media)
							.on('start', function (cmd) {
								console.log(`Started : ${cmd}`)
							})
							.on('error', function (err) {
								console.log(`Error : ${err}`)
								fs.unlinkSync(media)
								reply(mess.error.api)
							})
							.on('end', function () {
								console.log('Finish')
								exec(`webpmux -set exif ./sticker/data.exif ./sticker/${sender}.webp -o ./sticker/${sender}.webp`, async (error) => {
                                    if (error) return reply(mess.error.api)
									xinz.sendMessage(from, fs.readFileSync(`./sticker/${sender}.webp`), sticker, {quoted: msg})
									limitAdd(sender, limit)
                                    fs.unlinkSync(media)	
									fs.unlinkSync(`./sticker/${sender}.webp`)	
								})
							})
							.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
							.toFormat('webp')
							.save(`./sticker/${sender}.webp`)
                } else if ((isVideo && msg.message.videoMessage.fileLength < 10000000 || isQuotedVideo && msg.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.fileLength < 10000000)) {
                    let encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(msg).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : msg
                    let media = await xinz.downloadAndSaveMediaMessage(encmedia, `./sticker/${sender}`)
					reply(mess.wait)
                        await ffmpeg(`${media}`)
							.inputFormat(media.split('.')[4])
							.on('start', function (cmd) {
								console.log(`Started : ${cmd}`)
							})
							.on('error', function (err) {
								console.log(`Error : ${err}`)
								fs.unlinkSync(media)
								let tipe = media.endsWith('.mp4') ? 'video' : 'gif'
								reply(mess.error.api)
							})
							.on('end', function () {
								console.log('Finish')
								exec(`webpmux -set exif ./sticker/data.exif ./sticker/${sender}.webp -o ./sticker/${sender}.webp`, async (error) => {
									if (error) return reply(mess.error.api)
									xinz.sendMessage(from, fs.readFileSync(`./sticker/${sender}.webp`), sticker, {quoted: msg})
									limitAdd(sender, limit)
                                    fs.unlinkSync(media)
									fs.unlinkSync(`./sticker/${sender}.webp`)
								})
							})
							.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
							.toFormat('webp')
							.save(`./sticker/${sender}.webp`)
                } else {
                    reply(`Enviar una imagen/video con la etiqueta $ {prefix}sticker o etiquetar la imagen/video que se envió\nNota : la duración máxima del video es de 10 segundos`)
                }
            }
                break
            case prefix+'stickerwm': case prefix+'swm': case prefix+'take': case prefix+'takesticker': case prefix+'takestick':{
                if (!isPremium) return reply(mess.OnlyPrem)
                if (args.length < 2) return reply(`Uso ${command} nombre|autor`)
                let packname1 = q.split('|')[0] ? q.split('|')[0] : q
                let author1 = q.split('|')[1] ? q.split('|')[1] : ''
                if (isImage || isQuotedImage) {
                    let encmedia = isQuotedImage ? JSON.parse(JSON.stringify(msg).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : msg
                    let media = await xinz.downloadAndSaveMediaMessage(encmedia, `./sticker/${sender}`)
					exif.create(packname1, author1, `stickwm_${sender}`)
                    await ffmpeg(`${media}`)
							.input(media)
							.on('start', function (cmd) {
								console.log(`Started : ${cmd}`)
							})
							.on('error', function (err) {
								console.log(`Error : ${err}`)
								fs.unlinkSync(media)
								reply(mess.error.api)
							})
							.on('end', function () {
								console.log('Finish')
								exec(`webpmux -set exif ./sticker/stickwm_${sender}.exif ./sticker/${sender}.webp -o ./sticker/${sender}.webp`, async (error) => {
                                    if (error) return reply(mess.error.api)
									xinz.sendMessage(from, fs.readFileSync(`./sticker/${sender}.webp`), sticker, {quoted: msg})
                                    fs.unlinkSync(media)	
									fs.unlinkSync(`./sticker/${sender}.webp`)	
                                    fs.unlinkSync(`./sticker/stickwm_${sender}.exif`)
								})
							})
							.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
							.toFormat('webp')
							.save(`./sticker/${sender}.webp`)
                } else if ((isVideo && msg.message.videoMessage.fileLength < 10000000 || isQuotedVideo && msg.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.fileLength < 10000000)) {
                    let encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(msg).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : msg
                    let media = await xinz.downloadAndSaveMediaMessage(encmedia, `./sticker/${sender}`)
					exif.create(packname1, author1, `stickwm_${sender}`)
                    reply(mess.wait)
						await ffmpeg(`${media}`)
							.inputFormat(media.split('.')[4])
							.on('start', function (cmd) {
								console.log(`Started : ${cmd}`)
							})
							.on('error', function (err) {
								console.log(`Error : ${err}`)
								fs.unlinkSync(media)
								let tipe = media.endsWith('.mp4') ? 'video' : 'gif'
								reply(mess.error.api)
							})
							.on('end', function () {
								console.log('Finish')
								exec(`webpmux -set exif ./sticker/stickwm_${sender}.exif ./sticker/${sender}.webp -o ./sticker/${sender}.webp`, async (error) => {
									if (error) return reply(mess.error.api)
									xinz.sendMessage(from, fs.readFileSync(`./sticker/${sender}.webp`), sticker, {quoted: msg})
                                    fs.unlinkSync(media)
									fs.unlinkSync(`./sticker/${sender}.webp`)
                                    fs.unlinkSync(`./sticker/stickwm_${sender}.exif`)
								})
							})
							.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
							.toFormat('webp')
							.save(`./sticker/${sender}.webp`)
                } else if (isQuotedSticker) {
                    let encmedia = JSON.parse(JSON.stringify(msg).replace('quotedM','m')).message.extendedTextMessage.contextInfo
				    let media = await xinz.downloadAndSaveMediaMessage(encmedia, `./sticker/${sender}`)
                    exif.create(packname1, author1, `takestick_${sender}`)
                    exec(`webpmux -set exif ./sticker/takestick_${sender}.exif ./sticker/${sender}.webp -o ./sticker/${sender}.webp`, async (error) => {
                        if (error) return reply(mess.error.api)
                        xinz.sendMessage(from, fs.readFileSync(`./sticker/${sender}.webp`), sticker, {quoted: msg})
                        fs.unlinkSync(media)
                        fs.unlinkSync(`./sticker/takestick_${sender}.exif`)
                    })
                }else {
                    reply(`Enviar una imagen/video con la etiqueta ${prefix}stickerwm nombre|autor o etiquetar la imagen/video que se envió\nNota : la duración máxima del video es de 10 segundos`)
                }
            }
                break
            case prefix+'toimg':
            case prefix+'tomedia':{
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Su límite ha expirado, envíe ${prefix}limit para verificar el límite`)
				if (!isQuotedSticker) return reply('Reply stiker nya')
                let encmedia = JSON.parse(JSON.stringify(msg).replace('quotedM','m')).message.extendedTextMessage.contextInfo
				let media = await xinz.downloadAndSaveMediaMessage(encmedia)
				if (quotedMsg.stickerMessage.isAnimated === true){
                    reply(`Blum apoyo gif pegatina :/`)
					} else {
                    reply(mess.wait)
					let ran = getRandom('.png')
					exec(`ffmpeg -i ${media} ${ran}`, (err) => {
						fs.unlinkSync(media)
						if (err) return reply('Gagal :V')
						xinz.sendMessage(from, fs.readFileSync(ran), image, {quoted: msg, caption: 'NIH'})
                        limitAdd(sender,  limit)
						fs.unlinkSync(ran)
					})
					}
                }
				break
            case prefix+'attp':{
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Su límite ha expirado, envíe ${prefix}limit para verificar el límite`)
                if (args.length < 2) return reply(`Enviar orden *${prefix}attp* texto`)
                let ane = await getBuffer(`https://api.xteam.xyz/attp?file&text=${q}`)
                fs.writeFileSync('./sticker/attp.webp', ane)
                exec(`webpmux -set exif ./sticker/data.exif ./sticker/attp.webp -o ./sticker/attp.webp`, async (error) => {
                    if (error) return reply(mess.error.api)
                    xinz.sendMessage(from, fs.readFileSync(`./sticker/attp.webp`), sticker, {quoted: msg})
                    limitAdd(sender, limit)
                    fs.unlinkSync(`./sticker/attp.webp`)	
                })
            }
                break
            case prefix+'tinyurl':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Su límite ha expirado, envíe ${prefix}limit para verificar el límite`)
                if (args.length < 2) return reply(`Uso :\n*${prefix}tinyurl enlase`)
                if (!isUrl(args[1])) return reply(`Ingrese el enlace correcto`)
                axios.get(`https://tinyurl.com/api-create.php?url=${args[1]}`)
                .then((a) => reply(`Aqui ${a.data}`))
                .catch(() => reply(`Error, ingrese el enlace correctamente`))
                break
            case prefix+'imgtourl':{
                if (isImage || isQuotedImage) {
                    let encmedia = isQuotedImage ? JSON.parse(JSON.stringify(msg).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : msg
                    let media = await xinz.downloadMediaMessage(encmedia)
                    let toBase64 = media.toString('base64')
                    let upload = await require("../lib/upToTuru")(toBase64)
                    await reply(`${upload.image.image.url}`)
                    limitAdd(sender, limit)
                } else {
                    reply(`Enviar una imagen o responder a una imagen con un título ${command}`)
                }
            }
                break
//------------------< NULIS >---------------------
            case prefix+'nulis':
                reply(`*Pilihan*\n${prefix}nuliskiri\n${prefix}nuliskanan\n${prefix}foliokiri\n${prefix}foliokanan`)
                break
            case prefix+'nuliskiri':{
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Su límite ha expirado, envíe ${prefix}limit para verificar el límite`)
                if (args.length < 2) return reply(`Enviar orden *${prefix}nuliskiri* texto`)
                reply(mess.wait)
                const tulisan = body.slice(11)
                const splitText = tulisan.replace(/(\S+\s*){1,9}/g, '$&\n')
                const fixHeight = splitText.split('\n').slice(0, 31).join('\n')
                spawn('convert', [
                    './media/nulis/images/buku/sebelumkiri.jpg',
                    '-font',
                    './media/nulis/font/Indie-Flower.ttf',
                    '-size',
                    '960x1280',
                    '-pointsize',
                    '22',
                    '-interline-spacing',
                    '2',
                    '-annotate',
                    '+140+153',
                    fixHeight,
                    './media/nulis/images/buku/setelahkiri.jpg'
                ])
                .on('error', () => reply(mess.error.api))
                .on('exit', () => {
                    xinz.sendMessage(from, fs.readFileSync('./media/nulis/images/buku/setelahkiri.jpg'), image, {quoted: msg, caption: `no sea perezoso señor...`})
                    limitAdd(sender, limit)
                })
            }
                break
            case prefix+'nuliskanan':{
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Su límite ha expirado, envíe ${prefix}limit para verificar el límite`)
                if (args.length < 2) return reply(`Enviar orden *${prefix}nuliskanan* texto`)
                reply(mess.wait)
                const tulisan = body.slice(12)
                const splitText = tulisan.replace(/(\S+\s*){1,9}/g, '$&\n')
                const fixHeight = splitText.split('\n').slice(0, 31).join('\n')
                spawn('convert', [
                    './media/nulis/images/buku/sebelumkanan.jpg',
                    '-font',
                    './media/nulis/font/Indie-Flower.ttf',
                    '-size',
                    '960x1280',
                    '-pointsize',
                    '23',
                    '-interline-spacing',
                    '2',
                    '-annotate',
                    '+128+129',
                    fixHeight,
                    './media/nulis/images/buku/setelahkanan.jpg'
                ])
                .on('error', () => reply(mess.error.api))
                .on('exit', () => {
                    xinz.sendMessage(from, fs.readFileSync('./media/nulis/images/buku/setelahkanan.jpg'), image, {quoted: msg, caption: `no sea perezoso señor...`})
                    limitAdd(sender, limit)
                })
            }
                break
            case prefix+'foliokiri':{
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Su límite ha expirado, envíe ${prefix}limit para verificar el límite`)
                if (args.length < 2) return reply(`Enviar orden *${prefix}foliokiri* texto`)
                reply(mess.wait)
                const tulisan = body.slice(11)
                const splitText = tulisan.replace(/(\S+\s*){1,13}/g, '$&\n')
                const fixHeight = splitText.split('\n').slice(0, 38).join('\n')
                spawn('convert', [
                    './media/nulis/images/folio/sebelumkiri.jpg',
                    '-font',
                    './media/nulis/font/Indie-Flower.ttf',
                    '-size',
                    '1720x1280',
                    '-pointsize',
                    '23',
                    '-interline-spacing',
                    '4',
                    '-annotate',
                    '+48+185',
                    fixHeight,
                    './media/nulis/images/folio/setelahkiri.jpg'
                ])
                .on('error', () => reply(mess.error.api))
                .on('exit', () => {
                    xinz.sendMessage(from, fs.readFileSync('./media/nulis/images/folio/setelahkiri.jpg'), image, {quoted: msg, caption: `no sea perezoso señor...`})
                    limitAdd(sender, limit)
                })
            }
                break
            case prefix+'foliokanan':{
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Su límite ha expirado, envíe ${prefix}limit para verificar el límite`)
                if (args.length < 2) return reply(`Enviar orden *${prefix}foliokanan* texto`)
                reply(mess.wait)
                const tulisan = body.slice(12)
                const splitText = tulisan.replace(/(\S+\s*){1,13}/g, '$&\n')
                const fixHeight = splitText.split('\n').slice(0, 38).join('\n')
                spawn('convert', [
                    './media/nulis/images/folio/sebelumkanan.jpg',
                    '-font',
                    './media/nulis/font/Indie-Flower.ttf',
                    '-size',
                    '960x1280',
                    '-pointsize',
                    '23',
                    '-interline-spacing',
                    '3',
                    '-annotate',
                    '+89+190',
                    fixHeight,
                    './media/nulis/images/folio/setelahkanan.jpg'
                ])
                .on('error', () => reply(mess.error.api))
                .on('exit', () => {
                    xinz.sendMessage(from, fs.readFileSync('./media/nulis/images/folio/setelahkanan.jpg'), image, {quoted: msg, caption: `no sea perezoso señor...`})
                    limitAdd(sender, limit)
                })
            }
                break
//------------------< Text Marker >-------------------
            case prefix+'blackpink': case prefix+'bp':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Su límite ha expirado, envíe ${prefix}limit para verificar el límite`)
                if (args.length < 2) return reply(`Usar ${command} text`)
                reply(mess.wait)
                sendFileFromUrl(from, `https://api.lolhuman.xyz/api/textprome/blackpink?apikey=${lolkey}&text=${q}`, '', msg).catch(() => reply(mess.error.api))
                limitAdd(sender, limit)
                break
            case prefix+'glitch': case prefix+'glitchtext':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Su límite ha expirado, envíe ${prefix}limit para verificar el límite`)
                if (args.length < 2) return reply(`Usar ${command} text1|text2`)
                if (!q.includes("|")) return reply(`Usar ${command} text1|text2`)
                reply(mess.wait)
                sendFileFromUrl(from, `https://api.lolhuman.xyz/api/textprome2/glitch?apikey=${lolkey}&text1=${q.split("|")[0]}&text2=${q.split("|")[1]}`, '', msg).catch(() => reply(mess.error.api))
                limitAdd(sender, limit)
                break
            case prefix+'neon': case prefix+'neontext':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Su límite ha expirado, envíe ${prefix}limit para verificar el límite`)
                if (args.length < 2) return reply(`Usar ${command} text`)
                reply(mess.wait)
                sendFileFromUrl(from, `https://api.lolhuman.xyz/api/textprome/neon?apikey=${lolkey}&text=${q}`, '', msg).catch(() => reply(mess.error.api))
                limitAdd(sender, limit)
                break
            case prefix+'harta': case prefix+'hartatahta': case prefix+'tahta':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Su límite ha expirado, envíe ${prefix}limit para verificar el límite`)
                if (args.length < 2) return reply(`Usar ${command} text`)
                reply(mess.wait)
                xinz.sendImage(from, await getBuffer(`https://api.lolhuman.xyz/api/hartatahta?apikey=${lolkey}&text=${q}`), '', msg).catch(() => reply(mess.error.api))
                limitAdd(sender, limit)
                break
	case prefix+'thundername': case prefix+'thunder':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Su límite ha expirado, envíe ${prefix}limit para verificar el límite`)
                if (args.length < 2) return reply(`Usar ${command} text`)
                reply(mess.wait)
                sendFileFromUrl(from, `https://api.lolhuman.xyz/api/textprome/thunder?apikey=${lolkey}&text=${q}`, '', msg).catch(() => reply(mess.error.api))
                limitAdd(sender, limit)
                break
            case prefix+'pornhub': case prefix+'phlogo':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Su límite ha expirado, envíe ${prefix}limit para verificar el límite`)
                if (args.length < 2) return reply(`Usar ${command} text1|text2`)
                if (!q.includes("|")) return reply(`Usar ${command} text1|text2`)
                reply(mess.wait)
                sendFileFromUrl(from, `https://api.lolhuman.xyz/api/textprome2/pornhub?apikey=${lolkey}&text1=${q.split("|")[0]}&text2=${q.split("|")[1]}`, '', msg).catch(() => reply(mess.error.api))
                limitAdd(sender, limit)
                break
//------------------< Math Random >-------------------
            case prefix+'':
                break
				case prefix+'ganteng':
					if (!isGroup)return reply(mess.OnlyGrup)
					var kamu = groupMembers
					var cinta = groupMembers
					var aku = cinta[Math.floor(Math.random() * kamu.length)]
					var cintax = kamu[Math.floor(Math.random() * cinta.length)]
					let tejs = `El chico más guapo de este grupo es\n*@${aku.jid.split('@')[0]}*`
					mentions(tejs, [aku.jid, cintax.jid], true)
					break
				case prefix+'cantik':
					if (!isGroup)return reply(mess.OnlyGrup)
					var kamu = groupMembers
					var cinta = groupMembers
					var aku = cinta[Math.floor(Math.random() * kamu.length)]
					var cintax = kamu[Math.floor(Math.random() * cinta.length)]
					let gejs = `El chico más guapo de este grupo es\n*@${cintax.jid.split('@')[0]}*`
					mentions(gejs, [aku.jid, cintax.jid], true)
					break
					case prefix+'jadian':
					if (!isGroup)return reply(mess.OnlyGrup)
					var kamu = groupMembers
					var cinta = groupMembers
					var aku = cinta[Math.floor(Math.random() * kamu.length)]
					var cintax = kamu[Math.floor(Math.random() * cinta.length)]
					let vejs = `Ciee .. que esta pasando\n*@${aku.jid.split('@')[0]}* ♥️ @${cintax.jid.split('@')[0]}\nBuena suerte hola`
					mentions(vejs, [aku.jid, cintax.jid], true)
					break
				case prefix+'seberapagay':
				axios.get(`https://arugaz.herokuapp.com/api/howgay`).then(res => res.data).then(res =>
				textImg(`Aquí están los datos de Gay Si ${q}

Persentase Gay : ${res.persen}%
Alert!!! : ${res.desc}`))
				break
				case prefix+'bisakah':
					const bisa = ['¡Por supuesto que puedo! Eres la persona más hogareña ',' No puedo Ajg Aowkwowk ',' Hmm, no sé, sí, pregúntale a papá ',' Repite Tod que no entiendo ']
					const keh = bisa[Math.floor(Math.random() * bisa.length)]
					xinz.sendMessage(from, 'Pregunta : ' + q + '\n\nrespuesta : ' + keh, text, { quoted: msg })
					break
					case prefix+'kapankah':
					const kapan = ['Mañana', 'Pasado mañana', 'Más temprano', '4 días nuevamente', '5 días más', '6 días nuevamente', '1 semana nuevamente', '2 semanas nuevamente', '3 semanas nuevamente' , '1 mes más', '2 meses más', '3 meses', '4 meses', '5 meses', '6 meses nuevamente', '1 año nuevamente', '2 años nuevamente', '3 años nuevamente ',' 4 años más ',' 5 años nuevamente ',' 6 años nuevamente ',' 1 siglo nuevamente ',' 3 días nuevamente ']
					const koh = kapan[Math.floor(Math.random() * kapan.length)]
					xinz.sendMessage(from, 'Pregunta : ' + q + '\n\ntespuesta : ' + koh, text, { quoted: msg })
				case prefix+'apakah':
					const apa = ['Iya', 'Tidak', 'Bisa Jadi', 'Ulangi bro gak paham']
					const kah = apa[Math.floor(Math.random() * apa.length)]
					xinz.sendMessage(from, 'Presgunta : ' + q + '\n\nrespuesta : ' + kah, text, { quoted: msg })
					break


				case prefix+'rate':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					const ra = ['4', '9', '17', '28', '34', '48', '59', '62', '74', '83', '97', '100', '29', '94', '75', '82', '41', '39']
					const te = ra[Math.floor(Math.random() * ra.length)]
					xinz.sendMessage(from, 'Pregunta : ' + q + '\n\nrespuesta : ' + te + '%', text, { quoted: msg })
					break

				case prefix+'hobby':
					const hob = ['Sigh at the Game', 'Ngocokin Doi', 'Acechando las redes sociales de su ex', 'No tienes un pasatiempo del awokawok', 'Cocinar', 'Ayuda a Atok', 'Mabar', 'Nobar', 'Sosmedtan', 'Ayudar a otras personas', 'Ver anime', 'Ver drama', 'Montar en motocicleta', 'Cantar', 'Bailar', 'Chocar', 'Dibujar', 'Las fotos no son claras', 'Jugar games', 'Hablar conmigo mismo']
					const by = hob[Math.floor(Math.random() * hob.length)]
					xinz.sendMessage(from, 'Pregunta : ' + q + '\n\nrespuesta : ' + by, text, { quoted: msg })
					break

				case prefix+'truth':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Su límite ha expirado, envíe ${prefix}limit para verificar el límite`)
					const trut = ['¿Alguna vez te ha gustado alguien? ¿Cuánto tiempo?', 'Si puedes o si quieres, ¿con qué gc/gc externo te harías amigo? (tal vez diferente/del mismo género)', '¿cuál es tu mayor miedo?', '¿Alguna vez te ha gustado alguien y ¿Sentiste que esa persona también te agrada?', '¿Cómo se llama la ex novia de tu amigo que te gustaba en secreto?', '¿Alguna vez le has robado dinero a tu padre o padre? ¿La razón?', '¿Qué te hace feliz cuando estás triste?', '¿Alguna vez has tenido un amor unilateral? si es así quien? ¿Cómo se siente hermano?', '¿Alguna vez has estado con la aventura de otra persona?', 'Lo que más temes', '¿Quién es la persona más influyente en tu vida?', '¿Qué orgullo te sentiste este año?', '¿Quién es la persona que puede hacerte muy feliz?', '¿Quién te ha hecho muy feliz alguna vez?', '(Para los musulmanes) ¿alguna vez te has perdido de orar todo el día?', '¿Quién está más cerca de tu tipo ideal de socio aquí', '¿Con quién te gusta pasar el rato? ¿Rechazar a la gente? ¿Cuál es la razón por la cual?', 'Nombra un incidente que te hizo sentir herido y que aún recuerdas', '¿Qué has logrado este año?', '¿Cuál fue tu peor hábito en la escuela?']
					const ttrth = trut[Math.floor(Math.random() * trut.length)]
					xinz.sendImage(from, await getBuffer(`https://i.ibb.co/305yt26/bf84f20635dedd5dde31e7e5b6983ae9.jpg`), 'Truth\n\n' + ttrth, msg)
					break

				case prefix+'dare':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Su límite ha expirado, envíe ${prefix}limit para verificar el límite`)
					const dare = ['Envía un mensaje a tu ex y dile "Todavía me gustas", "llama a tu enamorada/novia ahora y envíale un mensaje de texto al jugador", "hazle papilla a un miembro del grupo", "Dile" ERES TAN HERMOSO, NO MIENTES "a los chicos', 'es la llamada reciente de whatsapp', 'suelta el emote cada vez que escribas en gc/pc durante 1 día', 'envía una nota de voz diciendo ¿puedo llamarte bebé?', 'suelta la cita/cita de la canción, sigue etiquetando al miembro correcto para esa cita', 'usa la foto de Sule durante 3 días', 'escribe en el idioma local las 24 horas', 'cambia el nombre a "Soy un hijo de lucinta luna" durante 5 horas', 'chatea con wa contact en el orden de tu% batre, sigue diciéndole "tengo suerte de tenerte", "chatear con broma con tu ex y decir" te amo, pgn return", "grabar voz leer surah al-kautsar", "decir"estoy enamorado de ti, quiero ser mi novia o no? "al sexo opuesto, el último con el que conversaste (se lo entregaste en wa/tele), espera a que responda, si es ss, déjate caer aquí', '¡menciona tu tipo de novio!', 'snap/publicar foto de novio/enamoramiento', 'gritar incoherentemente y luego enviar usando vn ven aquí', 'papita tu cara y envíalo al equivocado tu amigo', 'envía tu foto con la leyenda, soy un niño adoptado', 'grita usando palabras duras mientras vn y luego envíala aquí', 'grita "anjimm gabutt anjimmm" frente a tu casa', 'cambia de nombre a "BOWO" durante 24 horas', 'Fingir estar poseído, por ejemplo: poseído por maung, poseído por saltamontes, poseído por refrigerador, etc.']
					const der = dare[Math.floor(Math.random() * dare.length)]
					xinz.sendImage(from, await getBuffer(`https://i.ibb.co/305yt26/bf84f20635dedd5dde31e7e5b6983ae9.jpg`), 'Atrevimiento\n\n' + der , msg)
					break
				case prefix+'cekbapak': // By Ramlan ID
					const bapak = ['Vaya, es genial que todavía tengas una mochilanSeguro que es la mochila de un coolie:v\nAwowkwokwwok\n#CandabOs', 'Aowkwwo Aquí tienes un Yteam:v\nLu Yteam Bro? Awowkwowk\nPatience Bro Don't Have Bapack\n#Camda', 'Tu Bapack Bjir resulta ser celoso\nTriste hermano, lo veo\nPero aquí pero:v\nMantén a Ae Lu Yteam Aowkwowkw riendo:v', 'No #cekbapak Mulu Broo:v\nPobre Yteam\nNtar ofendido\nYahahaha Hayyuk Por : Ramlan ID']
					const cek = bapak[Math.floor(Math.random() * bapak.length)]
					xinz.sendMessage(from, cek, text, { quoted: msg })
					break
//------------------< Baileys >---------------------
            case prefix+'tagme':
                mentions(`@${sender.split("@")[0]}`, [sender], true)
                break
            case prefix+'kontak':
                if (args.length < 2) return reply(`Usar ${command} numero|nombre`)
                if (!q.includes("|")) return reply(`Usar ${command} numero|nombre`)
                if (isNaN(q.split("|")[0])) return reply(`Usar ${command} numero|nombre`)
                xinz.sendContact(from, q.split("|")[0], q.split("|")[1], msg)
                break
            case prefix+'hidetag':{
                if (!isPremium) return reply(`No eres un usuario premium, envía un pedido *${prefix}daftarprem* comprar premium`)
                if (args.length < 2) return reply(`Ingrese texto`)
                let arr = [];
                for (let i of groupMembers){
                    arr.push(i.jid)
                }
                mentions(q, arr, false)
            }
                break
//------------------< INFO >-------------------
            case prefix+'limit': case prefix+'ceklimit': case prefix+'balance': case prefix+'glimit':
                if (mentioned.length !== 0){
                    textImg(`Límite : $ {_ prem.checkPremiumUser(mencionado [0], premium)? 'Unlimited' : `${getLimit(mencionado [0], limitCount, limit)}/${limitCount}`}\nLimit Game : ${checkGLimit(mencionado [0], gcount, glimit)}/${gcount}\nBalance : $${getBalance(mencionado [0], balance)}\n\nPuedes comprar límite con ${prefix}buylimit y ${prefix}buyglimit para comprar límite de juego`)
                } else {
                    textImg(`Límite : ${isPremium? 'Unlimited' : `${getLimit(remitente, limitCount, limit)}/${limitCount}`}\nLimit Juego : ${checkGLimit(remitente, gcount, glimit)}/${gcount}\nBalance : $${getBalance(remitente, saldo)}\n\nPuedes comprar el límite con ${prefix}buylimit y ${prefix}buyglimit para comprar el límite del juego`)
                }
                break
            case prefix+'owner':
            case prefix+'creator':
                xinz.sendContact(from, ownerNumber.split("@")[0], setting.ownerName, msg)
                .then((res) => xinz.sendMessage(from, 'Aquí está el contacto de mi propietario', text, {quoted: res}))
                break
            case prefix+'ping':
            case prefix+'speed':{
                let timestamp = speed();
				let latensi = speed() - timestamp
                textImg(`${latensi.toFixed(4)} Second`)
            }
                break
            case prefix+'donate': case prefix+'donasi':
                textImg(setting.txtDonasi)
                break
            case prefix+'sourcecode': case prefix+'sc': case prefix+'src':
                textImg(`Este bot usa sc : https://github.com/Xinz-Team/XinzBot`)
                break
            case prefix+'runtime':
                textImg(`${runtime(process.uptime())}`)
                break
            case prefix+'stats': 
            case prefix+'botstat':{
                let totalchat = await xinz.chats.all()
				let i = []
				let giid = []
				for (let mem of totalchat){
					i.push(mem.jid)
				}
				for (let id of i){
					if (id && id.includes('g.us')){
						giid.push(id)
					}
				}
                let timestampi = speed();
				let latensii = speed() - timestampi
                const { wa_version, mcc, mnc, os_version, device_manufacturer, device_model } = xinz.user.phone
                let anu = process.uptime()
                let teskny = `*V. Whatsapp :* ${wa_version}
*Baterai :* ${baterai.baterai}%
*Charge :* ${baterai.cas === 'true' ? 'Ya' : 'Tidak'}
*RAM :* ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB
*MCC :* ${mcc}
*MNC :* ${mnc}
*Versi OS :* ${os_version}
*Merk HP :* ${device_manufacturer}
*Versi HP :* ${device_model}
*Group Chat :* ${giid.length}
*Personal Chat :* ${totalchat.length - giid.length}
*Total Chat :* ${totalchat.length}
*Speed :* ${latensii.toFixed(4)} Second
*Runtime :* ${runtime(anu)}`
				reply(teskny)
            }
				break
//------------------< Downloader >-------------------
            case prefix+'ytmp4':{
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Su límite ha expirado, envíe ${prefix}limit para verificar el límite`)
                if (args.length === 1) return reply(`Enviar pedidos *${prefix}ytmp4 [linkYt]*`)
                let isLinks2 = args[1].match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/)
                if (!isLinks2) return reply(mess.error.Iv)
                try {
                    reply(mess.wait)
                    ytv(args[1])
                    .then((res) => {
                        const { dl_link, thumb, title, filesizeF, filesize } = res
                        axios.get(`https://tinyurl.com/api-create.php?url=${dl_link}`)
                        .then((a) => {
                            if (Number(filesize) >= 40000) return sendFileFromUrl(from, thumb, `┏┉⌣ ┈̥-̶̯͡..̷̴✽̶┄┈┈┈┈┈┈┈┈┈┈┉┓
┆ *YOUTUBE MP4*
└┈┈┈┈┈┈┈┈┈┈┈⌣ ┈̥-̶̯͡..̷̴✽̶⌣ ✽̶

*Datos obtenidos con éxito!*
\`\`\`▢ Title : ${title}\`\`\`
\`\`\`▢ Ext : MP4\`\`\`
\`\`\`▢ Filesize : ${filesizeF}\`\`\`
\`\`\`▢ Link : ${a.data}\`\`\`
_Por la duración de más de la túnica presentada en forma de enlace_`, msg)
                        const captionsYtmp4 = `┏┉⌣ ┈̥-̶̯͡..̷̴✽̶┄┈┈┈┈┈┈┈┈┈┈┉┓
┆ *YOUTUBE MP4*
└┈┈┈┈┈┈┈┈┈┈┈⌣ ┈̥-̶̯͡..̷̴✽̶⌣ ✽̶

*Datos obtenidos con éxito!*
\`\`\`▢ Title : ${title}\`\`\`
\`\`\`▢ Ext : MP4\`\`\`
\`\`\`▢ Size : ${filesizeF}\`\`\`

_Espere a que se envíe el archivo multimedia; puede tardar unos minutos_`
                            sendFileFromUrl(from, thumb, captionsYtmp4, msg)
                            sendFileFromUrl(from, dl_link, '', msg)
                            limitAdd(sender, limit)
                        })
                    })
                    .catch((err) => reply(`${err}`))
                } catch (err) {
                    sendMess(ownerNumber, 'Ytmp4 Error : ' + err)
                    console.log(color('[Ytmp4]', 'red'), err)
                    reply(mess.error.api)
                }
            }
                break
            case prefix+'ytmp3':{
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Su límite ha expirado, envíe ${prefix}limit para verificar el límite`)
                if (args.length === 1) return reply(`Kirim perintah *${prefix}ytmp3 [linkYt]*`)
                let isLinks = args[1].match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/)
                if (!isLinks) return reply(mess.error.Iv)
                try {
                    reply(mess.wait)
                    yta(args[1])
                    .then((res) => {
                        const { dl_link, thumb, title, filesizeF, filesize } = res
                        axios.get(`https://tinyurl.com/api-create.php?url=${dl_link}`)
                        .then((a) => {
                            if (Number(filesize) >= 30000) return sendFileFromUrl(from, thumb, `┏┉⌣ ┈̥-̶̯͡..̷̴✽̶┄┈┈┈┈┈┈┈┈┈┈┉┓
┆ *YOUTUBE MP3*
└┈┈┈┈┈┈┈┈┈┈┈⌣ ┈̥-̶̯͡..̷̴✽̶⌣ ✽̶

*Datos obtenidos con éxito!*
\`\`\`▢ Title : ${title}
\`\`\`▢ Ext : MP3
\`\`\`▢ Filesize : ${filesizeF}
\`\`\`▢ Link : ${a.data}
_Por la duración de más de la túnica presentada en forma de enlace_`, msg)
                        const captions = `┏┉⌣ ┈̥-̶̯͡..̷̴✽̶┄┈┈┈┈┈┈┈┈┈┈┉┓
┆ *YOUTUBE MP3*
└┈┈┈┈┈┈┈┈┈┈┈⌣ ┈̥-̶̯͡..̷̴✽̶⌣ ✽̶

*Datos obtenidos con éxito!*
\`\`\`▢ Title : ${title}\`\`\`
\`\`\`▢ Ext : MP3\`\`\`
\`\`\`▢ Size : ${filesizeF}\`\`\`

_Espere a que se envíe el archivo multimedia; puede tardar unos minutos_`
                            sendFileFromUrl(from, thumb, captions, msg)
                            sendFileFromUrl(from, dl_link, '', msg)
                            limitAdd(sender, limit)
                        })
                    })
                    .catch((err) => reply(`${err}`))
                } catch (err) {
                    sendMess(ownerNumber, 'Ytmp3 Error : ' + err)
                    console.log(color('[Ytmp3]', 'red'), err)
                    reply(mess.error.api)
                }
            }
                break
            case prefix+'playmp4':{
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Su límite ha expirado, envíe ${prefix}limit para verificar el límite`)
                if (args.length === 1) return reply(`Kirim perintah *${prefix}playmp4 query*`)
                try {
                    reply(mess.wait)
                    let yut = await yts(q)
                    ytv(yut.videos[0].url)
                    .then((res) => {
                        const { dl_link, thumb, title, filesizeF, filesize } = res
                        axios.get(`https://tinyurl.com/api-create.php?url=${dl_link}`)
                        .then((a) => {
                            if (Number(filesize) >= 40000) return sendFileFromUrl(from, thumb, `┏┉⌣ ┈̥-̶̯͡..̷̴✽̶┄┈┈┈┈┈┈┈┈┈┈┉┓
┆ *YOUTUBE PLAYMP4*
└┈┈┈┈┈┈┈┈┈┈┈⌣ ┈̥-̶̯͡..̷̴✽̶⌣ ✽̶

*Datos obtenidos con éxito!*
\`\`\`▢ Title : ${title}\`\`\`
\`\`\`▢ Ext : MP4\`\`\`
\`\`\`▢ Filesize : ${filesizeF}\`\`\`
\`\`\`▢ ID : ${yut.videos[0].videoId}\`\`\`
\`\`\`▢ Upload : ${yut.videos[0].ago}\`\`\`
\`\`\`▢ Ditonton : ${yut.videos[0].views}\`\`\`
\`\`\`▢ Duration : ${yut.videos[0].timestamp}\`\`\`
\`\`\`▢ Link : ${a.data}\`\`\`
_Por la duración de más de la túnica presentada en forma de enlace_`, msg)
                        const captionisu = `┏┉⌣ ┈̥-̶̯͡..̷̴✽̶┄┈┈┈┈┈┈┈┈┈┈┉┓
┆ *YOUTUBE PLAYMP4*
└┈┈┈┈┈┈┈┈┈┈┈⌣ ┈̥-̶̯͡..̷̴✽̶⌣ ✽̶

*Datos obtenidos con éxito!*
\`\`\`▢ Title : ${title}\`\`\`
\`\`\`▢ Ext : MP4\`\`\`
\`\`\`▢ Size : ${filesizeF}\`\`\`
\`\`\`▢ ID : ${yut.videos[0].videoId}\`\`\`
\`\`\`▢ Upload : ${yut.videos[0].ago}\`\`\`
\`\`\`▢ Ditonton : ${yut.videos[0].views}\`\`\`
\`\`\`▢ Duration : ${yut.videos[0].timestamp}\`\`\`
\`\`\`▢ URL : ${yut.videos[0].url}\`\`\`

_Espere a que se envíe el archivo multimedia; puede tardar unos minutos_`
                            sendFileFromUrl(from, thumb, captionisu, msg)
                            sendFileFromUrl(from, dl_link, '', msg)
                            limitAdd(sender, limit)
                        })
                    })
                    .catch((err) => reply(`${err}`))
                } catch (err) {
                    sendMess(ownerNumber, 'PlayMp4 Error : ' + err)
                    console.log(color('[PlayMp4]', 'red'), err)
                    reply(mess.error.api)
                }
            }
                break
            case prefix+'play': case prefix+'playmp3':{
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Su límite ha expirado, envíe ${prefix}limit para verificar el límite`)
                if (args.length === 1) return reply(`Kirim perintah *${prefix}play query*`)
                try {
                    reply(mess.wait)
                    let yut = await yts(q)
                    yta(yut.videos[0].url)
                    .then((res) => {
                        const { dl_link, thumb, title, filesizeF, filesize } = res
                        axios.get(`https://tinyurl.com/api-create.php?url=${dl_link}`)
                        .then((a) => {
                            if (Number(filesize) >= 30000) return sendFileFromUrl(from, thumb, `┏┉⌣ ┈̥-̶̯͡..̷̴✽̶┄┈┈┈┈┈┈┈┈┈┈┉┓
┆ *YOUTUBE PLAYMP3*
└┈┈┈┈┈┈┈┈┈┈┈⌣ ┈̥-̶̯͡..̷̴✽̶⌣ ✽̶

*Datos obtenidos con éxito!*
\`\`\`▢ Title : ${title}\`\`\`
\`\`\`▢ Ext : MP3\`\`\`
\`\`\`▢ Filesize : ${filesizeF}\`\`\`
\`\`\`▢ ID : ${yut.videos[0].videoId}\`\`\`
\`\`\`▢ Upload : ${yut.videos[0].ago}\`\`\`
\`\`\`▢ Ditonton : ${yut.videos[0].views}\`\`\`
\`\`\`▢ Duration : ${yut.videos[0].timestamp}\`\`\`
\`\`\`▢ Link : ${a.data}\`\`\`
_Por la duración de más de la túnica presentada en forma de enlace_`, msg)
                        const captionis = `┏┉⌣ ┈̥-̶̯͡..̷̴✽̶┄┈┈┈┈┈┈┈┈┈┈┉┓
┆ *YOUTUBE PLAYMP3*
└┈┈┈┈┈┈┈┈┈┈┈⌣ ┈̥-̶̯͡..̷̴✽̶⌣ ✽̶

*Datos obtenidos con éxito!*
\`\`\`▢ Title : ${title}\`\`\`
\`\`\`▢ Ext : MP3\`\`\`
\`\`\`▢ Size : ${filesizeF}\`\`\`
\`\`\`▢ ID : ${yut.videos[0].videoId}\`\`\`
\`\`\`▢ Upload : ${yut.videos[0].ago}\`\`\`
\`\`\`▢ Ditonton : ${yut.videos[0].views}\`\`\`
\`\`\`▢ Duration : ${yut.videos[0].timestamp}\`\`\`
\`\`\`▢ URL : ${yut.videos[0].url}\`\`\`

_Espere a que se envíe el archivo multimedia; puede tardar unos minutos_`
                            sendFileFromUrl(from, thumb, captionis, msg)
                            sendFileFromUrl(from, dl_link, '', msg)
                            limitAdd(sender, limit)
                        })
                    })
                    .catch((err) => reply(`${err}`))
                } catch (err) {
                    sendMess(ownerNumber, 'PlayMp3 Error : ' + err)
                    console.log(color('[PlayMp3]', 'red'), err)
                    reply(mess.error.api)
                }
            }
                break
            case prefix+'ig':
            case prefix+'igdl':
            case prefix+'instagram':{
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Su límite ha expirado, envíe ${prefix}limit para verificar el límite`)
                if (args.length < 2) return reply(`Enviar pedidos *${prefix}ig* enlace ig`)
                if (!isUrl(args[1]) && !args[1].includes('instagram.com')) return reply(mess.error.Iv)
                reply(mess.wait)
                getPost(args[1].split('/')[4])
                .then((res) => {
                    let { owner_user, post, date, capt } = res
                    let caption = `┏┉⌣ ┈̥-̶̯͡..̷̴✽̶┄┈┈┈┈┈┈┈┈┈┈┉┓
┆ *INSTAGRAM MEDIA*
└┈┈┈┈┈┈┈┈┈┈┈⌣ ┈̥-̶̯͡..̷̴✽̶⌣ ✽̶

*Datos obtenidos con éxito!*
\`\`\`▢ Owner : ${owner_user}\`\`\`
\`\`\`▢ Jumlah Media : ${post.length}\`\`\`
\`\`\`▢ Caption :${capt}\`\`\`

_Espere un momento, los medios se enviarán pronto_`
                    sendMess(from, caption)
                    for (let i = 0; i < post.length; i++){
                        sendFileFromUrl(from, post[i].url)
                    }
                    limitAdd(sender, limit)
                })
                .catch((err) => {
                    sendMess(ownerNumber, 'IG Download Error : ' + err)
                    console.log(color('[IG Download]', 'red'), err)
                    reply(mess.error.api)
                })
            }
                break
            case prefix+'fb':
            case prefix+'fbdl':
            case prefix+'facebook':{
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Su límite ha expirado, envíe ${prefix}limit para verificar el límite`)
                if (args.length < 2) return reply(`Kirim perintah *${prefix}fb* url`)
                if (!isUrl(args[1]) && !args[1].includes('facebook.com')) return reply(mess.error.Iv)
                reply(mess.wait)
                fbdl(args[1])
                .then((res) => {
                    sendFileFromUrl(from, res.result.links[0].url)
                    limitAdd(sender, limit)
                })
                .catch((err) => {
                    sendMess(ownerNumber, 'FB Error : ' + err)
                    console.log(color('[FB]', 'red'), err)
                    reply(mess.error.api)
                })
            }
                break
            case prefix+'yts':
            case prefix+'ytsearch':{
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Su límite ha expirado, envíe ${prefix}limit para verificar el límite`)
                if (args.length < 2) return reply(`Enviar pedidos *${prefix}ytsearch* _query_`)
                reply(mess.wait)
                yts(q)
                .then((res) => {
                    let yt = res.videos
                    let txt = `┏┉⌣ ┈̥-̶̯͡..̷̴✽̶┄┈┈┈┈┈┈┈┈┈┈┉┓
┆ *YOUTUBE SEARCH*
└┈┈┈┈┈┈┈┈┈┈┈⌣ ┈̥-̶̯͡..̷̴✽̶⌣ ✽̶

*Datos obtenidos con éxito!*
*Hasil Pencarian : ${q}*\n`
                    for (let i = 0; i < 10; i++){
                        txt += `\n─────────────────\n\n\`\`\`▢ Judul : ${yt[i].title}\n\`\`\`▢ ID : ${yt[i].videoId}\n\`\`\`▢ Upload : ${yt[i].ago}\n\`\`\`▢ Ditonton : ${yt[i].views}\n\`\`\`▢ Duration : ${yt[i].timestamp}\n\`\`\`▢ URL : ${yt[i].url}\n`
                    }
                    sendFileFromUrl(from, yt[0].image, txt, msg)
                    limitAdd(sender, limit)
                })
                .catch((err) => {
                    sendMess(ownerNumber, 'YT SEARCH Error : ' + err)
                    console.log(color('[YT SEARCH]', 'red'), err)
                    reply(mess.error.api)
                })
            }
                break
	case prefix+'tiktok': {
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Su límite ha expirado, envíe ${prefix}limit para verificar el límite`)
                if (args.length < 2) return reply(`Usar ${command} enlace tiktok`)
                if (!isUrl(args[1]) && !args[1].includes('tiktok.com')) return reply(mess.error.Iv)
                reply(mess.wait)
                axios.get(`https://api.lolhuman.xyz/api/tiktok?apikey=${lolkey}&url=${args[1]}`)
                .then(({data}) => {
                    let { title, thumbnail, description, duration, link } = data.result
                    let capt = `┏┉⌣ ┈̥-̶̯͡..̷̴✽̶┄┈┈┈┈┈┈┈┈┈┈┉┓
┆ TIKTOK NOWM DOWNLOADER
└┈┈┈┈┈┈┈┈┈┈┈⌣ ┈̥-̶̯͡..̷̴✽̶⌣ ✽̶

Datos obtenidos con éxito!
\`\`\`▢ Title : ${title}\`\`\`
\`\`\`▢ Ext : MP4\`\`\`
\`\`\`▢ Username / Nickname : ${data.result.author.username} / ${data.result.author.nickname}\`\`\`
\`\`\`▢ Duration : ${duration}\`\`\`
\`\`\`▢ LikeCount : ${data.result.statistic.diggCount}\`\`\`
\`\`\`▢ ShareCount : ${data.result.statistic.shareCount}\`\`\`
\`\`\`▢ CommentCount : ${data.result.statistic.commentCount}\`\`\`
\`\`\`▢ PlayCount : ${data.result.statistic.playCount}\`\`\`
\`\`\`▢ Descripttion : ${description}\`\`\`
`
                    sendFileFromUrl(from, thumbnail, capt, msg)
                    sendFileFromUrl(from, link, '', msg)
                    limitAdd(sender, limit)
                })
                    .catch((err) => {
                        sendMess(ownerNumber, 'TiktokWM Error : ' + err)
                        console.log(color('[TiktokWM]', 'red'), err)
                        reply(mess.error.api)
                    })
            }
                break
//------------------< Stalker >-------------------
            case prefix+'igstalk': case prefix+'stalkig':{
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Su límite ha expirado, envíe ${prefix}limit para verificar el límite`)
                if (args.length < 2) return reply(`Enviar pedidos *${prefix}igstalk* _username_`)
                reply(mess.wait)
                getUser(args[1].replace('@', ''))
                .then((res) => {
                    let { username, biography, fullName, subscribersCount, subscribtions, highlightCount, isBusinessAccount, isPrivate, isVerified, profilePicHD, postsCount } = res
                    let caption = `┏┉⌣ ┈̥-̶̯͡..̷̴✽̶┄┈┈┈┈┈┈┈┈┈┈┉┓
┆ *INSTAGRAM PROFILE*
└┈┈┈┈┈┈┈┈┈┈┈⌣ ┈̥-̶̯͡..̷̴✽̶⌣ ✽̶

*Datos obtenidos con éxito!*
\`\`\`▢ Username : ${username}\`\`\`
\`\`\`▢ Fullname : ${fullName}\`\`\`
\`\`\`▢ Followers : ${subscribersCount}\`\`\`
\`\`\`▢ Following : ${subscribtions}\`\`\`
\`\`\`▢ Post Count : ${postsCount}\`\`\`
\`\`\`▢ HighlightCount : ${highlightCount}\`\`\`
\`\`\`▢ PrivateAccount : ${isPrivate ? 'Yes' : 'No'}\`\`\`
\`\`\`▢ VerifiedAccount : ${isVerified ? 'Yes' : 'No'}\`\`\`
\`\`\`▢ BusinessAccount : ${isBusinessAccount ? 'Yes' : 'No'}\`\`\`
\`\`\`▢ Biography :\`\`\` \n${biography}`
                    sendFileFromUrl(from, profilePicHD, caption, msg)
                    limitAdd(sender, limit)
                })
                .catch((err) => {
                    sendMess(ownerNumber, 'IG Stalk Error : ' + err)
                    console.log(color('[IG Stalk]', 'red'), err)
					reply(mess.error.api)
                })
            }
                break
            case prefix+'ghstalk': case prefix+'githubstalk': case prefix+'ghuser':{
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Su límite ha expirado, envíe ${prefix}limit para verificar el límite`)
                if (args.length < 2) return reply(`Enviar pedidos *${prefix}ghstalk* _username_`)
                reply(mess.wait)
                axios.get(`https://api.github.com/users/${args[1]}`)
                .then((res) => res.data)
                .then((res) =>{
                    let { login, type, name, followers, following, created_at, updated_at, public_gists, public_repos, twitter_username, bio, hireable, email, location, blog, company, avatar_url, html_url } = res
                    let txt = `┏┉⌣ ┈̥-̶̯͡..̷̴✽̶┄┈┈┈┈┈┈┈┈┈┈┉┓
┆ *GITHUB USER*
└┈┈┈┈┈┈┈┈┈┈┈⌣ ┈̥-̶̯͡..̷̴✽̶⌣ ✽̶

*Datos obtenidos con éxito!*
\`\`\`▢ Username : ${login}\`\`\`
\`\`\`▢ Name : ${name}\`\`\`
\`\`\`▢ Followers : ${followers}\`\`\`
\`\`\`▢ Following : ${following}\`\`\`
\`\`\`▢ Created at :  ${moment(created_at).tz('Asia/Jakarta').format('HH:mm:ss DD/MM/YYYY')}\`\`\`
\`\`\`▢ Updated at : ${moment(updated_at).tz('Asia/Jakarta').format('HH:mm:ss DD/MM/YYYY')}\`\`\`
\`\`\`▢ Public Gists : ${public_gists}\`\`\`
\`\`\`▢ Public Repos : ${public_repos}\`\`\`
\`\`\`▢ Twitter : ${twitter_username}\`\`\`
\`\`\`▢ Email : ${email}\`\`\`
\`\`\`▢ Location : ${location}\`\`\`
\`\`\`▢ Blog : ${blog}\`\`\`
\`\`\`▢ Link : ${html_url}\`\`\`
\`\`\`▢ Bio :\`\`\`\n${bio}`
                    sendFileFromUrl(from, avatar_url, txt, msg)
                    limitAdd(sender, limit)
                })
                .catch((err) => {
                    sendMess(ownerNumber, 'GH Stalk Error : ' + err)
                    console.log(color('[GH Stalk]', 'red'), err)
					reply(mess.error.api)
                })
            }
                break
//------------------< VVIBU >-------------------
			case prefix+'waifu':{
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Su límite ha expirado, envíe ${prefix}limit para verificar el límite`)
                reply(mess.wait)
						axios.get('https://waifu.pics/api/sfw/waifu')
						.then(res => res.data)
						.then(res =>
						sendFileFromUrl(from, res.url, 'NIH', msg)
						)					
                        .catch((err) => {
                    console.log(color('[Vvibu]', 'red'), err)
                    reply(mess.error.api)
                })
                            limitAdd(sender, limit)
                            }
                            break
			case prefix+'nekonime':{
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Su límite ha expirado, envíe ${prefix}limit para verificar el límite`)
                reply(mess.wait)
						axios.get('https://waifu.pics/api/sfw/neko')
						.then(res => res.data)
						.then(res =>
						sendFileFromUrl(from, res.url, 'NIH', msg)
						)					
                        .catch((err) => {
                    console.log(color('[Vvibu]', 'red'), err)
                    reply(mess.error.api)
                })
                            limitAdd(sender, limit)
                            }
                            break
			case prefix+'megumin':{
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Su límite ha expirado, envíe ${prefix}limit para verificar el límite`)
                reply(mess.wait)
						axios.get('https://waifu.pics/api/sfw/megumin')
						.then(res => res.data)
						.then(res =>
						sendFileFromUrl(from, res.url, 'NIH', msg)
						)					
                        .catch((err) => {
                    console.log(color('[Vvibu]', 'red'), err)
                    reply(mess.error.api)
                })
                limitAdd(sender, limit)
            }
                break
			case prefix+'shinobu':{
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Su límite ha expirado, envíe ${prefix}limit para verificar el límite`)
                reply(mess.wait)
						axios.get('https://waifu.pics/api/sfw/shinobu')
						.then(res => res.data)
						.then(res =>
						sendFileFromUrl(from, res.url, 'NIH', msg)
						)					
                        .catch((err) => {
                    console.log(color('[Vvibu]', 'red'), err)
                    reply(mess.error.api)
                })
                limitAdd(sender, limit)
            }
                break
            case prefix+'loli':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Su límite ha expirado, envíe ${prefix}limit para verificar el límite`)
                reply(mess.wait)
                sendFileFromUrl(from, `https://api.lolhuman.xyz/api/random/loli?apikey=${lolkey}`, '', msg).catch(() => reply(mess.error.api))
                limitAdd(sender, limit)
                break
            case prefix+'sagiri':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Su límite ha expirado, envíe ${prefix}limit para verificar el límite`)
                reply(mess.wait)
                sendFileFromUrl(from, `https://api.lolhuman.xyz/api/random/sagiri?apikey=${lolkey}`, '', msg).catch(() => reply(mess.error.api))
                limitAdd(sender, limit)
                break
//------------------< Premium >-------------------
            case prefix+'addprem':
                if (!isOwner) return reply(mess.OnlyOwner)
                if (args.length < 2) return reply(`Usar :\n*${prefix}addprem* @Etiquete tiémpo\n*${prefix}addprem* numero de tiémpo\n\nejemplo : ${command} @Etiquete 30d`)
                if (mentioned.length !== 0){
                    for (let i = 0; i < mentioned.length; i++){
                    _prem.addPremiumUser(mentioned[0], args[2], premium)
                    }
                    reply('Sukses')
                } else {
                    _prem.addPremiumUser(args[1] + '@s.whatsapp.net', args[2], premium)
                    reply('Sukses')
                }
                break
            case prefix+'delprem':
                if (!isOwner) return reply(mess.OnlyOwner)
                if (args.length < 2) return reply(`Usar :\n*${prefix}delprem* @Etiquete\n*${prefix}delprem* numero`)
                if (mentioned.length !== 0){
                    for (let i = 0; i < mentioned.length; i++){
                        premium.splice(_prem.getPremiumPosition(mentioned[i], premium), 1)
                        fs.writeFileSync('./database/premium.json', JSON.stringify(premium))
                    }
                    reply('Sukses')
                } else {
                    premium.splice(_prem.getPremiumPosition(args[1] + '@s.whatsapp.net', premium), 1)
                    fs.writeFileSync('./database/premium.json', JSON.stringify(premium))
                }
                break
            case prefix+'cekprem':
            case prefix+'cekpremium':
                if (!isPremium) return reply(`No eres un usuario premium, envía el comando *${prefix}daftarprem* para comprar premium`)
                let cekvip = ms(_prem.getPremiumExpired(sender, premium) - Date.now())
                let premiumnya = `*Expire :* ${cekvip.days} day(s) ${cekvip.hours} hour(s) ${cekvip.minutes} minute(s)`
                reply(premiumnya)
                break
            case prefix+'listprem':
                let txt = `List Prem\nJumlah : ${premium.length}\n\n`
                let men = [];
                for (let i of premium){
                    men.push(i.id)
                    let cekvip = ms(i.expired - Date.now())
                    txt += `*ID :* @${i.id.split("@")[0]}\n*Expire :* ${cekvip.days} day(s) ${cekvip.hours} hour(s) ${cekvip.minutes} minute(s) ${cekvip.seconds} second(s)\n\n`
                }
                mentions(txt, men, true)
                break
//------------------< BAN >-------------------
            case prefix+'ban':
                if (!isOwner) return reply(mess.OnlyOwner)
                if (mentioned.length !== 0){
                    for (let i = 0; i < mentioned.length; i++){
                        addBanned(mentioned[0], args[2], ban)
                    }
                    reply('Objetivo')
                } else if (isQuotedMsg) {
                    if (quotedMsg.sender === ownerNumber) return reply(`No se puede prohibir al propietario`)
                    addBanned(quotedMsg.sender, args[1], ban)
                    reply(`Objetivo de neumáticos de éxito`)
                } else if (!isNaN(args[1])) {
                    addBanned(args[1] + '@s.whatsapp.net', args[2], ban)
                    reply('Objetivo')
                } else {
                    reply(`Enviar pedidos ${prefix}ban @etiqueta o número o responde al mensaje de la persona que quieres prohibir`)
                }
                break
            case prefix+'unban':
                if (!isOwner) return reply(mess.OnlyOwner)
                if (mentioned.length !== 0){
                    for (let i = 0; i < mentioned.length; i++){
                        unBanned(mentioned[i], ban)
                    }
                    reply('Objetivo')
                }if (isQuotedMsg) {
                    unBanned(quotedMsg.sender, ban)
                    reply(`Objetivo unban éxito`) 
                } else if (!isNaN(args[1])) {
                    unBanned(args[1] + '@s.whatsapp.net', ban)
                    reply('Objetivo')
                } else {
                    reply(`Enviar pedidos ${prefix}unban @etiqueta o número o responde al mensaje de la persona que quieres desbloquear`)
                }
                break
            case prefix+'listban':
                let txtx = `List Banned\nJumlah : ${ban.length}\n\n`
                let menx = [];
                for (let i of ban){
                    menx.push(i.id)
                    txtx += `*ID :* @${i.id.split("@")[0]}\n`
                    if (i.expired === 'PERMANENT'){
                        let cekvip = 'PERMANENT'
                        txtx += `*Expire :* PERMANENT\n\n`
                    } else {
                        let cekvip = ms(i.expired - Date.now())
                        txtx += `*Expire :* ${cekvip.days} day(s) ${cekvip.hours} hour(s) ${cekvip.minutes} minute(s) ${cekvip.seconds} second(s)\n\n`
                    }
                }
                mentions(txtx, menx, true)
                break
//------------------< Game >-------------------
                case prefix+'topbalance':{
                balance.sort((a, b) => (a.balance < b.balance) ? 1 : -1)
                let top = '*── 「 TOP BALANCE 」 ──*\n\n'
                let arrTop = []
                for (let i = 0; i < 10; i ++){
                    top += `${i + 1}. @${balance[i].id.split("@")[0]}\n=> Balance : $${balance[i].balance}\n\n`
                    arrTop.push(balance[i].id)
                }
                mentions(top, arrTop, true)
            }
                break
            case prefix+'buylimit':{
                if (args.length < 2) return reply(`Enviar pedidos *${prefix}buylimit* límite de cantidad que desea comprar\n\nPrecio 1 límite = saldo de $ 150`)
                if (args[1].includes('-')) return reply(`No use -`)
                if (isNaN(args[1])) return reply(`Tiene que ser un número`)
                let ane = Number(nebal(args[1]) * 150)
                if (getBalance(sender, balance) < ane) return reply(`Tu saldo no es suficiente para esta compra`)
                kurangBalance(sender, ane, balance)
                giveLimit(sender, nebal(args[1]), limit)
                reply(monospace(`Límite de compra tanto como ${args[1]} exitoso\n\nSaldo restante : $${getBalance(sender, balance)}\nLímite restante : ${getLimit(sender, limitCount, limit)}/${limitCount}`))
            }
                break
            case prefix+'buygamelimit':
            case prefix+'buyglimit':{
                if (args.length < 2) return reply(`Enviar pedidos *${prefix}buyglimit* número de límite de juego que desea comprar\n\nPrecio de 1 límite de juego = saldo de $150\nImpuesto $1 / $10`)
                if (args[1].includes('-')) return reply(`No use -`)
                if (isNaN(args[1])) return reply(`Tiene que ser un número`)
                let ane = Number(nebal(args[1]) * 150)
                if (getBalance(sender, balance) < ane) return reply(`Su saldo no es suficiente para esta compra`)
                kurangBalance(sender, ane, balance)
                givegame(sender, nebal(args[1]), glimit)
                reply(monospace(`Limite las compras de juegos tanto como ${args[1]} exitoso\n\nSaldo restante : $${getBalance(sender, balance)}\nLímite de juego restante : ${cekGLimit(sender, gcount, glimit)}/${gcount}`))
            }
                break
            case prefix+'tictactoe': case prefix+'ttt': case prefix+'ttc':
                if (!isGroup)return reply(mess.OnlyGrup)
                if (isGame(sender, isOwner, gcount, glimit)) return reply(`Tu límite de juego ha terminado`)
                if (isTicTacToe(from, tictactoe)) return reply(`Aún quedan partidas inconclusas`)
                if (args.length < 2) return reply(`Enviar pedidos *${prefix}tictactoe* @Etiquete`)
                if (mentioned.length !== 0){
						if (mentioned[0] === sender) return reply(`"Sad está jugando consigo mismo"`)
                        let h = randomNomor(100)
                        mentions(monospace(`@${sender.split('@')[0]} menantang @${mentioned[0].split('@')[0]} untuk bermain TicTacToe\n\nKirim (Y/T) untuk bermain\n\nHadiah : ${h} balance`), [sender, mentioned[0]], false)
                        tictactoe.push({
                            id: from,
                            status: null,
                            hadiah: h,
                            penantang: sender,
                            ditantang: mentioned[0],
                            TicTacToe: ['1️⃣','2️⃣','3️⃣','4️⃣','5️⃣','6️⃣','7️⃣','8️⃣','9️⃣']
                        })
                        gameAdd(sender, glimit)
                } else {
                    reply(`Enviar pedidos *${prefix}tictactoe* @Etiquete`)
                }
                break
            case prefix+'delttt':
            case prefix+'delttc':
                if (!isGroup)return reply(mess.OnlyGrup)
                if (!isTicTacToe(from, tictactoe)) return reply(`No hay una sesión de juego de tictactoe en este grupo`)
                tictactoe.splice(getPosTic(from, tictactoe), 1)
                reply(`Sesión de tictactoe eliminada con éxito en este grupo`)
                break
            case prefix+'tebakgambar':{
                if (isGame(sender, isOwner, gcount, glimit)) return reply(`Tu límite de juego se ha agotado`)
                if (game.isTebakGambar(from, tebakgambar)) return reply(`Aún quedan problemas sin resolver`)
                let anu = await axios.get(`http://api.lolhuman.xyz/api/tebak/gambar?apikey=${lolkey}`)
                const petunjuk = anu.data.result.answer.replace(/[b|c|d|f|g|h|j|k|l|m|n|p|q|r|s|t|v|w|x|y|z]/gi, '_')
                sendFileFromUrl(from, anu.data.result.image, monospace(`Responde las siguientes preguntas\n\nInstrucciones : ${petunjuk}\ntiempo : ${gamewaktu}s`), msg)
                let anih = anu.data.result.answer.toLowerCase()
                game.addgambar(from, anih, gamewaktu, tebakgambar)
                gameAdd(sender, glimit)
            }
                break
            case prefix+'family100':{
                if (isGame(sender, isOwner, gcount, glimit)) return reply(`Tu límite de juego se ha agotado`)
                if (game.isfam(from, family100)) return reply(`Aún quedan dudas sin resolver`)
                let anu = await axios.get(`http://api.lolhuman.xyz/api/tebak/family100?apikey=${lolkey}`)
                reply(`*RESPONDA LAS SIGUIENTES PREGUNTAS*\n\n*Preguntas :* ${anu.data.result.question}\n*Total Respuestas :* ${anu.data.result.aswer.length}\n\ntiempo : ${gamewaktu}s`)
                let anoh = anu.data.result.aswer
                let rgfds = []
                for (let i of anoh){
                    let fefs = i.split('/') ? i.split('/')[0] : i
                    let iuhbb = fefs.startsWith(' ') ? fefs.replace(' ','') : fefs
                    let axsf = iuhbb.endsWith(' ') ? iuhbb.replace(iuhbb.slice(-1), '') : iuhbb
                    rgfds.push(axsf.toLowerCase())
                }
                game.addfam(from, rgfds, gamewaktu, family100)
                gameAdd(sender, glimit)
            }
                break
//------------------< Owner >-------------------
            case prefix+'setpp': case prefix+'setppbot':
            case prefix+'setpic': case prefix+'setpicbot':{
                if (!isOwner && !fromMe) return reply(mess.OnlyOwner)
                if (isImage || isQuotedImage) {
                    let encmedia = isQuotedImage ? JSON.parse(JSON.stringify(msg).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : msg
                    let media = await xinz.downloadMediaMessage(encmedia)
                    xinz.updateProfilePicture(xinz.user.jid, media)
                    .then((res) => reply(jsonformat(res)))
					.catch((err) => reply(jsonformat(err)))
                } else {
                    reply(`Kirim gambar atau reply gambar dengan caption ${command}`)
                }
            }
                break
            case prefix+'setname':{
                if (!isOwner && !fromMe) return reply(mess.OnlyOwner)
                if (args.length < 2) return reply(`Kirim perintah ${command} nama\n\nContoh : ${command} XinzBot`)
                xinz.updateProfileName(q)
                .then((res) => reply(jsonformat(res)))
				.catch((err) => reply(jsonformat(err)))
            }
                break
            case prefix+'setbio':{
                if (!isOwner && !fromMe) return reply(mess.OnlyOwner)
                if (args.length < 2) return reply(`Kirim perintah ${command} nama\n\nContoh : ${command} XinzBot`)
                xinz.setStatus(q)
                .then((res) => reply(jsonformat(res)))
				.catch((err) => reply(jsonformat(err)))
            }
                break
            case prefix+'self':{
                if (!isOwner && !fromMe) return reply(mess.OnlyOwner)
                mode = 'self'
                textImg('Berhasil berubah ke mode self')
            }
                break
            case prefix+'publik': case prefix+'public':{
                if (!isOwner && !fromMe) return reply(mess.OnlyOwner)
                mode = 'public'
                textImg('Berhasil berubah ke mode public')
            }
                break
            case prefix+'clearall':{
                if (!isOwner) return reply(mess.OnlyOwner)
                let chiit = await xinz.chats.all()
                for (let i of chiit){
                    xinz.modifyChat(i.jid, 'delete', {
                        includeStarred: false
                    })
                }
                reply(`Selesai`)
            }
                break
            case prefix+'setprefix':
                if (!isOwner) return reply(mess.OnlyOwner)
                if (args.length < 2) return reply(`Masukkan prefix\nOptions :\n=> multi\n=> nopref`)
                if (q === 'multi'){
                    multi = true
                    textImg(`Berhasil mengubah prefix ke ${q}`)
                } else if (q === 'nopref'){
                    multi = false
                    nopref = true
                    textImg(`Berhasil mengubah prefix ke ${q}`)
                } else {
                    multi = false
                    nopref = false
                    prefa = `${q}`
                    textImg(`Berhasil mengubah prefix ke ${q}`)
                }
                break
            case prefix+'bc':
                if (!isOwner) return reply(mess.OnlyOwner)
                if (args.length < 2) return reply(`Masukkan text`)
                let chiit = await xinz.chats.all()
                if (isImage || isQuotedImage) {
                    let encmedia = isQuotedImage ? JSON.parse(JSON.stringify(msg).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : msg
                    let media = await xinz.downloadMediaMessage(encmedia)
                    for (let i of chiit){
                        xinz.sendMessage(i.jid, media, image, {caption: q})
                    }
                    reply(`Sukses`)
                } else if (isVideo || isQuotedVideo) {
                    let encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(msg).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : msg
                    let media = await xinz.downloadMediaMessage(encmedia)
                    for (let i of chiit){
                        xinz.sendMessage(i.jid, media, video, {caption: q})
                    }
                    reply(`Sukses`)
                } else {
                    for (let i of chiit){
                        xinz.sendMessage(i.jid, q, text)
                    }
                    reply(`Sukses`)
                }
                break
//------------------< G R U P >-------------------
            case prefix+'delete':
			case prefix+'del':
			case prefix+'d':
				if (!isGroup)return reply(mess.OnlyGrup)
				if (!isGroupAdmins && !isOwner)return reply(mess.GrupAdmin)
                if (!isQuotedMsg) return reply(`Reply pesan dari bot`)
                if (!quotedMsg.fromMe) return reply(`Reply pesan dari bot`)
				xinz.deleteMessage(from, { id: msg.message.extendedTextMessage.contextInfo.stanzaId, remoteJid: from, fromMe: true })
				break
            case prefix+'afk':
                if (!isGroup) return reply(mess.OnlyGrup)
                if (isAfkOn) return reply('afk sudah diaktifkan sebelumnya')
                if (body.slice(150)) return reply('Alasanlu kepanjangan')
                let reason = body.slice(5) ? body.slice(5) : 'Nothing.'
                afk.addAfkUser(sender, Date.now(), reason, _afk)
                mentions(`@${sender.split('@')[0]} sedang afk\nAlasan : ${reason}`, [sender], true)
                break
            case prefix+'infogrup':
            case prefix+'infogrouup':
            case prefix+'grupinfo':
            case prefix+'groupinfo':
                if (!isGroup) return reply(mess.OnlyGrup)
                try {
                    var pic = await xinz.getProfilePicture(from)
                } catch {
                    var pic = 'https://i.ibb.co/Tq7d7TZ/age-hananta-495-photo.png'
                }
                let ingfo = `*G R O U P I N F O*\n\n*Name :* ${groupName}\n*ID Grup :* ${from}\n*Dibuat :* ${moment(`${groupMetadata.creation}` * 1000).tz('Asia/Jakarta').format('DD/MM/YYYY HH:mm:ss')}\n*Owner Grup :* @${groupMetadata.owner.split('@')[0]}\n*Jumlah Admin :* ${groupAdmins.length}\n*Jumlah Peserta :* ${groupMembers.length}\n*Welcome :* ${isWelcome ? 'Aktif' : 'Mati'}\n*Left :* ${isLeft ? 'Aktif' : 'Mati'}\n*AntiLink :* ${isAntiLink ? 'Aktif' : 'Mati'}\n*AntiBadword :* ${isBadword ? 'Aktif' : 'Mati'}\n*Desc :* \n${groupMetadata.desc}`
                xinz.sendMessage(from, await getBuffer(pic), image, {quoted: msg, caption: ingfo, contextInfo: {"mentionedJid": [groupMetadata.owner.replace('@c.us', '@s.whatsapp.net')]}})
                break
            case prefix+'add':
                if (!isGroup) return reply(mess.OnlyGrup)
                if (!isGroupAdmins && !isOwner)return reply(mess.GrupAdmin)
                if (!isBotGroupAdmins) return reply(mess.BotAdmin)
				if (isQuotedMsg && args.length < 2) {
                    xinz.groupAdd(from, [quotedMsg.sender])
                    .then((res) => reply(jsonformat(res)))
                    .catch((err) => reply(jsonformat(err)))
                } else if (args.length < 3 && !isNaN(args[1])){
					xinz.groupAdd(from, [args[1] + '@s.whatsapp.net'])
					.then((res) => reply(jsonformat(res)))
					.catch((err) => reply(jsonformat(err)))
				} else {
					reply()
				}
                break
            case prefix+'kick':
                if (!isGroup) return reply(mess.OnlyGrup)
                if (!isGroupAdmins && !isOwner)return reply(mess.GrupAdmin)
                if (!isBotGroupAdmins) return reply(mess.BotAdmin)
                if (mentioned.length !== 0){
                    xinz.groupRemove(from, mentioned)
                    .then((res) => reply(jsonformat(res)))
                    .catch((err) => reply(jsonformat(err)))
                } else if (isQuotedMsg) {
                    if (quotedMsg.sender === ownerNumber) return reply(`Tidak bisa kick Owner`)
                    xinz.groupRemove(from, [quotedMsg.sender])
                    .then((res) => reply(jsonformat(res)))
                    .catch((err) => reply(jsonformat(err)))
                } else if (!isNaN(args[1])) {
                    xinz.groupRemove(from, [args[1] + '@s.whatsapp.net'])
                    .then((res) => reply(jsonformat(res)))
                    .catch((err) => reply(jsonformat(err)))
                } else {
                    reply(`Kirim perintah ${prefix}kick @tag atau nomor atau reply pesan orang yang ingin di kick`)
                }
                break
            case prefix+'promote':
                if (!isGroup) return reply(mess.OnlyGrup)
                if (!isGroupAdmins && !isOwner)return reply(mess.GrupAdmin)
                if (!isBotGroupAdmins) return reply(mess.BotAdmin)
                if (mentioned.length !== 0){
                    xinz.groupMakeAdmin(from, mentioned)
                    .then((res) => reply(jsonformat(res)))
                    .catch((err) => reply(jsonformat(err)))
                } else if (isQuotedMsg) {
                    xinz.groupMakeAdmin(from, [quotedMsg.sender])
                    .then((res) => reply(jsonformat(res)))
                    .catch((err) => reply(jsonformat(err)))
                } else if (!isNaN(args[1])) {
                    xinz.groupMakeAdmin(from, [args[1] + '@s.whatsapp.net'])
                    .then((res) => reply(jsonformat(res)))
                    .catch((err) => reply(jsonformat(err)))
                } else {
                    reply(`Kirim perintah ${prefix}promote @tag atau nomor atau reply pesan orang yang ingin di promote`)
                }
                break
            case prefix+'demote':
                if (!isGroup) return reply(mess.OnlyGrup)
                if (!isGroupAdmins && !isOwner)return reply(mess.GrupAdmin)
                if (!isBotGroupAdmins) return reply(mess.BotAdmin)
                if (mentioned.length !== 0){
                    xinz.groupDemoteAdmin(from, mentioned)
                    .then((res) => reply(jsonformat(res)))
                    .catch((err) => reply(jsonformat(err)))
                } else if (isQuotedMsg) {
                    if (quotedMsg.sender === ownerNumber) return reply(`Tidak bisa kick Owner`)
                    xinz.groupDemoteAdmin(from, [quotedMsg.sender])
                    .then((res) => reply(jsonformat(res)))
                    .catch((err) => reply(jsonformat(err)))
                } else if (!isNaN(args[1])) {
                    xinz.groupDemoteAdmin(from, [args[1] + '@s.whatsapp.net'])
                    .then((res) => reply(jsonformat(res)))
                    .catch((err) => reply(jsonformat(err)))
                } else {
                    reply(`Kirim perintah ${prefix}demote @tag atau nomor atau reply pesan orang yang ingin di demote`)
                }
                break
            case prefix+'linkgc': case prefix+'linkgrup': case prefix+'linkgroup':
                if (!isGroup) return reply(mess.OnlyGrup)
                if (!isBotGroupAdmins) return reply(mess.BotAdmin)
                xinz.groupInviteCode(from)
                .then((res) => reply('https://chat.whatsapp.com/' + res))
                break
            case prefix+'leave':
                if (!isGroup) return reply(mess.OnlyGrup)
                if (!isGroupAdmins && !isOwner)return reply(mess.GrupAdmin)
                reply('bye...')
                .then(() => xinz.groupLeave(from))
                break
            case prefix+'setdesc':
                if (!isGroup) return reply(mess.OnlyGrup)
                if (!isGroupAdmins && !isOwner)return reply(mess.GrupAdmin)
                if (!isBotGroupAdmins) return reply(mess.BotAdmin)
                if (args.length === 1) return reply(`Penggunaan ${prefix}setdesc desc`)
                xinz.groupUpdateDescription(from, q)
                .then((res) => reply(jsonformat(res)))
                .catch((err) => reply(jsonformat(err)))
                break
            case prefix+'setgrupname':
                if (!isGroup) return reply(mess.OnlyGrup)
                if (!isGroupAdmins && !isOwner)return reply(mess.GrupAdmin)
                if (!isBotGroupAdmins) return reply(mess.BotAdmin)
                if (args.length === 1) return reply(`Penggunaan ${prefix}setgrupname name`)
                xinz.groupUpdateSubject(from, q)
                .then((res) => reply(jsonformat(res)))
                .catch((err) => reply(jsonformat(err)))
                break
            case prefix+'sider': case prefix+'chatinfo':
                if (!isGroup) return reply(mess.OnlyGrup)
                if (!isQuotedMsg) return reply(`Reply pesan dari bot`)
                if (!quotedMsg.fromMe) return reply(`Reply pesan dari bot`)
                    xinz.messageInfo(from, msg.message.extendedTextMessage.contextInfo.stanzaId)
                    .then((res) => {
                        let anu = []
                        let txt = `*Info Chat*\n\n`
                        for (let i = 0; i < res.reads.length; i++){
                            anu.push(res.reads[i].jid)
                            txt += `@${res.reads[i].jid.split("@")[0]}\n`
                            txt += `Waktu membaca : ${moment(`${res.reads[i].t}` * 1000).tz('Asia/Jakarta').format('HH:mm:ss DD/MM/YYYY')}\n\n`
                        }
                        mentions(txt, anu, true)
                    })
                    .catch((err) => reply(jsonformat(err)))
                break
            case prefix+'opengrup':
                if (!isGroup) return reply(mess.OnlyGrup)
                if (!isGroupAdmins && !isOwner)return reply(mess.GrupAdmin)
                if (!isBotGroupAdmins) return reply(mess.BotAdmin)
                xinz.groupSettingChange(from, "announcement", false)
                .then((res) => reply(jsonformat(res)))
                .catch((err) => reply(jsonformat(err)))
                break
            case prefix+'closegrup':
                if (!isGroup) return reply(mess.OnlyGrup)
                if (!isGroupAdmins && !isOwner)return reply(mess.GrupAdmin)
                if (!isBotGroupAdmins) return reply(mess.BotAdmin)
                xinz.groupSettingChange(from, "announcement", true)
                .then((res) => reply(jsonformat(res)))
                .catch((err) => reply(jsonformat(err)))
                break
            case prefix+'setppgrup':
                if (!isGroup) return reply(mess.OnlyGrup)
                if (!isGroupAdmins && !isOwner)return reply(mess.GrupAdmin)
                if (!isBotGroupAdmins) return reply(mess.BotAdmin)
                if (isImage || isQuotedImage) {
                    let encmedia = isQuotedImage ? JSON.parse(JSON.stringify(msg).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : msg
                    let media = await xinz.downloadMediaMessage(encmedia)
                    xinz.updateProfilePicture(from, media)
                    .then((res) => reply(jsonformat(res)))
                    .catch((err) => reply(jsonformat(err)))
                } else {
                    reply(`Kirim atau tag gambar dengan caption ${prefix}setppgrup`)
                }
                break
            case prefix+'join':
                if (!isOwner) return reply(mess.OnlyOwner)
                if (args.length < 2) return reply(`Kirim perintah *${prefix}join* link grup`)
                if (!isUrl(args[1]) && !args[1].includes('chat.whatsapp.com')) return reply(mess.error.Iv)
                let code = args[1].replace('https://chat.whatsapp.com/', '')
                xinz.acceptInvite(code)
                .then((res) => reply(jsonformat(res)))
                .catch((err) => reply(jsonformat(err)))
                break
            case prefix+'tagall':
                if (!isGroup) return reply(mess.OnlyGrup)
                if (!isGroupAdmins && !isOwner)return reply(mess.GrupAdmin)
                let arr = [];
                let txti = `*[ TAG ALL ]*\n\n${q ? q : ''}\n\n`
                for (let i of groupMembers){
                    txti += `=> @${i.jid.split("@")[0]}\n`
                    arr.push(i.jid)
                }
                mentions(txti, arr, true)
                break
//------------------< Enable / Disable >-------------------
            case prefix+'antibadword':
                if (!isGroup) return reply(mess.OnlyGrup)
                if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
                if (!isBotGroupAdmins) return reply(mess.BotAdmin)
                if (args.length === 1) return reply(`Pilih enable atau disable`)
                if (args[1].toLowerCase() === 'enable'){
                    if (isBadword) return reply(`Udah aktif`)
                    grupbadword.push(from)
					fs.writeFileSync('./database/grupbadword.json', JSON.stringify(grupbadword))
					reply(`antibadword grup aktif, kirim ${prefix}listbadword untuk melihat list badword`)
                } else if (args[1].toLowerCase() === 'disable'){
                    let anu = grupbadword.indexOf(from)
                    grupbadword.splice(anu, 1)
                    fs.writeFileSync('./database/grupbadword.json', JSON.stringify(grupbadword))
                    reply('antibadword grup nonaktif')
                } else {
                    reply(`Pilih enable atau disable`)
                }
                break
            case prefix+'listbadword':
                let bi = `List badword\n\n`
                for (let boo of badword){
                    bi += `- ${boo}\n`
                }
                bi += `\nTotal : ${badword.length}`
                reply(bi)
                break
            case prefix+'addbadword':
                if (!isOwner) return reply(mess.OnlyOwner)
                if (args.length < 2) return reply(`masukkan kata`)
                if (isKasar(args[1].toLowerCase(), badword)) return reply(`Udah ada`)
                addBadword(args[1].toLowerCase(), badword)
                reply(`Sukses`)
                break
            case prefix+'delbadword':
                if (!isOwner) return reply(mess.OnlyOwner)
                if (args.length < 2) return reply(`masukkan kata`)
                if (!isKasar(args[1].toLowerCase(), badword)) return reply(`Ga ada`)
                delBadword(args[1].toLowerCase(), badword)
                reply(`Sukses`)
                break
            case prefix+'clearbadword':
                if (!isOwner) return reply(mess.OnlyOwner)
                if (args.length < 2) return reply(`tag atau nomor`)
                if (mentioned.length !== 0){
                    for (let i = 0; i < mentioned.length; i++){
                    delCountKasar(mentioned[i], senbadword)
                    }
                    reply('Sukses')
                } else {
                    delCountKasar(args[1] + '@s.whatsapp.net', senbadword)
                    reply('Sukses')
                }
                break
            case prefix+'mute':
                if (!isGroup) return reply(mess.OnlyGrup)
                if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
                if (!isBotGroupAdmins) return reply(mess.BotAdmin)
                if (isMuted) return reply(`udah mute`)
                mute.push(from)
                fs.writeFileSync('./database/mute.json', JSON.stringify(mute))
                reply(`Bot berhasil dimute di chat ini`)
                break
            case prefix+'antilink':
                if (!isGroup) return reply(mess.OnlyGrup)
                if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
                if (!isBotGroupAdmins) return reply(mess.BotAdmin)
                if (args.length === 1) return reply(`Pilih enable atau disable`)
                if (args[1].toLowerCase() === 'enable'){
                    if (isAntiLink) return reply(`Udah aktif`)
                    antilink.push(from)
					fs.writeFileSync('./database/antilink.json', JSON.stringify(antilink))
					reply('Antilink grup aktif')
                } else if (args[1].toLowerCase() === 'disable'){
                    let anu = antilink.indexOf(from)
                    antilink.splice(anu, 1)
                    fs.writeFileSync('./database/antilink.json', JSON.stringify(antilink))
                    reply('Antilink grup nonaktif')
                } else {
                    reply(`Pilih enable atau disable`)
                }
                break
            case prefix+'welcome':
                if (!isGroup) return reply(mess.OnlyGrup)
                if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
                if (args.length === 1) return reply(`Pilih enable atau disable`)
                if (args[1].toLowerCase() === 'enable'){
                    if (isWelcome) return reply(`Udah aktif`)
                    welcome.push(from)
					fs.writeFileSync('./database/welcome.json', JSON.stringify(welcome))
					reply('Welcome aktif')
                } else if (args[1].toLowerCase() === 'disable'){
                    let anu = welcome.indexOf(from)
                    welcome.splice(anu, 1)
                    fs.writeFileSync('./database/welcome.json', JSON.stringify(welcome))
                    reply('Welcome nonaktif')
                } else {
                    reply(`Pilih enable atau disable`)
                }
                break
            case prefix+'left':
                if (!isGroup) return reply(mess.OnlyGrup)
                if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
                if (args.length === 1) return reply(`Pilih enable atau disable`)
                if (args[1].toLowerCase() === 'enable'){
                    if (isLeft) return reply(`Udah aktif`)
                    left.push(from)
					fs.writeFileSync('./database/left.json', JSON.stringify(left))
					reply('Left aktif')
                } else if (args[1].toLowerCase() === 'disable'){
                    let anu = left.indexOf(from)
                    left.splice(anu, 1)
                    fs.writeFileSync('./database/left.json', JSON.stringify(left))
                    reply('Left nonaktif')
                } else {
                    reply(`Pilih enable atau disable`)
                }
                break
        }
    } catch (err) {
        console.log(color('[ERROR]', 'red'), err)
    }
}
