Magic](https://imagemagick.org/script/download.php) ( for nulis command, Centang Kolom 1,2,3,5,6)
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
