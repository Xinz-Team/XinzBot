<p align="center">
<img src="https://raw.githubusercontent.com/Xinz-Team/XinzBot/main/media/Itsuki.jpg" alt="XINZ BOT" width="128" height="128"/>
</p>
<p align="center">
<a href="#"><img title="XINZ BOT" src="https://img.shields.io/badge/XINZ BOT-green?colorA=%23ff0000&colorB=%23017e40&style=for-the-badge"></a>
</p>
<p align="center">
<a href="https://github.com/zennn08"><img title="Author" src="https://img.shields.io/badge/Author-zennn08-red.svg?style=for-the-badge&logo=github"></a>
</p>
<p align="center">
<a href="https://github.com/zennn08/followers"><img title="Followers" src="https://img.shields.io/github/followers/zennn08?color=blue&style=flat-square"></a>
<a href="https://github.com/zennn08/megumikato2/stargazers/"><img title="Stars" src="https://img.shields.io/github/stars/Xinz-Team/XinzBot?color=red&style=flat-square"></a>
<a href="https://github.com/zennn08/megumikato2/network/members"><img title="Forks" src="https://img.shields.io/github/forks/Xinz-Team/XinzBot?color=red&style=flat-square"></a>
<a href="https://github.com/zennn08/megumikato2/watchers"><img title="Watching" src="https://img.shields.io/github/watchers/Xinz-Team/XinzBot?label=Watchers&color=blue&style=flat-square"></a>
</p>

<p align="center">
  <a href="https://github.com/Xinz-Team/XinzBot#requirements">Requirements</a> •
  <a href="https://github.com/Xinz-Team/XinzBot#instalasi">Installation</a> •
  <a href="https://github.com/Xinz-Team/XinzBot#features">Features</a> •
  <a href="https://github.com/Xinz-Team/XinzBot#thanks-to">Thanks to</a>
</p>
</div>


---



# Requirements
* [Node.js](https://nodejs.org/en/)
* [Git](https://git-scm.com/downloads)
* [FFmpeg](https://github.com/BtbN/FFmpeg-Builds/releases/download/autobuild-2020-12-08-13-03/ffmpeg-n4.3.1-26-gca55240b8c-win64-gpl-4.3.zip) (for sticker command)
* [Libwebp](https://developers.google.com/speed/webp/download) (for sticker wm)
* [Image Magic](https://imagemagick.org/script/download.php) ( for nulis command, Centang Kolom 1,2,3,5,6)
* Any text editor

# Instalasi
## For Windows
```bash
git clone https://github.com/Xinz-Team/XinzBot.git
cd XinzBot
npm install
node main
```
## For Termux
```bash
termux-setup-storage
apt update && apt upgrade
pkg install nodejs git ffmpeg libwebp imagemagick
git clone https://github.com/Xinz-Team/XinzBot.git
cd XinzBot
npm install
node main
```

## For VPS
```bash
apt install nodejs git ffmpeg libwebp imagemagick
git clone https://github.com/Xinz-Team/XinzBot.git
cd XinzBot
npm install
node main
```

## Edit file
- Change ownerNumber on [this section](https://github.com/Xinz-Team/XinzBot/blob/8d32fc24d9252517e995d19046fe06ca4b983055/config.json#L2)
- Change ownerName on [this section](https://github.com/Xinz-Team/XinzBot/blob/8d32fc24d9252517e995d19046fe06ca4b983055/config.json#L3)
- Change botName on [this section](https://github.com/Xinz-Team/XinzBot/blob/8d32fc24d9252517e995d19046fe06ca4b983055/config.json#L6)
- Change Apikey on [this section](https://github.com/Xinz-Team/XinzBot/blob/8d32fc24d9252517e995d19046fe06ca4b983055/config.json#L8)
- Change fakeReply on [this section](https://github.com/Xinz-Team/XinzBot/blob/8d32fc24d9252517e995d19046fe06ca4b983055/config.json#L9)
- Change Donasi on [this section](https://github.com/Xinz-Team/XinzBot/blob/8d32fc24d9252517e995d19046fe06ca4b983055/config.json#L12)
- You can edit list menu on [this section](https://github.com/Xinz-Team/XinzBot/blob/8d32fc24d9252517e995d19046fe06ca4b983055/message/help.js#L147)
- You can add fiture on [this section](https://github.com/Xinz-Team/XinzBot/blob/main/message/xinz.js)


## Installing the FFmpeg for Windows
* Unduh salah satu versi FFmpeg yang tersedia dengan mengklik [di sini](https://www.gyan.dev/ffmpeg/builds/).
* Extract file ke `C:\` path.
* Ganti nama folder yang telah di-extract menjadi `ffmpeg`.
* Run Command Prompt as Administrator.
* Jalankan perintah berikut::
```cmd
> setx /m PATH "C:\ffmpeg\bin;%PATH%"
```
Jika berhasil, akan memberikanmu pesan seperti: `SUCCESS: specified value was saved`.
* Sekarang setelah Anda menginstal FFmpeg, verifikasi bahwa itu berhasil dengan menjalankan perintah ini untuk melihat versi:
```cmd
> ffmpeg -version
```


## Installing the libwebp for Windows
* Unduh salah satu versi libwebp yang tersedia dengan mengklik [di sini](https://developers.google.com/speed/webp/download).
* Extract file ke `C:\` path.
* Ganti nama folder yang telah di-extract menjadi `libwebp`.
* Run Command Prompt as Administrator.
* Jalankan perintah berikut::
```cmd
setx /m PATH "C:\libwebp\bin;%PATH%"
```
Jika berhasil, akan memberikanmu pesan seperti: `SUCCESS: specified value was saved`.
* Sekarang setelah Anda menginstal libwebp, verifikasi bahwa itu berhasil dengan menjalankan perintah ini untuk melihat versi:
```cmd
webpmux -version
```

## Donate
- [Saweria](https://saweria.co/aqulzz)
- [Trakteer](https://trakteer.id/aqulzz)

# Features
- Cek [disini](https://github.com/Xinz-Team/XinzBot/blob/main/message/help.js)

# Thanks to
* [`Baileys`](https://github.com/adiwajshing/Baileys)
* [`Xinz-Team`](https://github.com/Xinz-Team)
* [`Nurutomo`](https://github.com/Nurutomo)
* [`MhankBarBar`](https://github.com/MhankBarBar)
* [`MRHRTZ`](https://github.com/MRHRTZ)
* [`Mamet`](https://github.com/mamet8/)
* [`SlavyanDesu`](https://github.com/SlavyanDesu)
* [`VideFrelan`](https://github.com/VideFrelan)
* [`TobyG74`](https://github.com/TobyG74)
