

let handler = async(m, { conn, text, usedPrefix, command }) => {

    // Sound
    let name = m.pushName || conn.getName(m.sender)
    var vn = "./Assets/ALIVE.mp3"
    let url = "https://github.com/Samuel-Muli/XLICON-V2-MD"
    let murl = "https://YouTube.com"
    let img = "https://telegra.ph/file/087410e10ba5b08083295.jpg"
    let con = { key: { fromMe: false, participant: `${m.sender.split`@`[0]}@s.whatsapp.net`, ...(m.chat ? { remoteJid: '16504228206@s.whatsapp.net' } : {}) }, message: { contactMessage: { displayName: `${name}`, vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;a,;;;\nFN:${name}\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`}}}
    let doc = {
        audio: {
          url: vn
        },
        mimetype: 'audio/mp4',
        ptt: true,
        waveform:  [100, 0, 100, 0, 100, 0, 100],
        fileName: "samu",
    
        contextInfo: {
          mentionedJid: [m.sender],
          externalAdReply: {
          title: "THE ‖⫷※•şɐɱʉ•※⫸‖ IS ALIVE 🌟",
          body: "‖⫷※•şɐɱʉ•※⫸‖",
          thumbnailUrl: img,
          sourceUrl: 'https://chat.whatsapp.com/FV96nX6l7iCGmBeunOFPa0',
          mediaType: 1,
          renderLargerThumbnail: true
          }}
      };
    
      await conn.sendMessage(m.chat, doc, { quoted: con });
    
    }
    
    handler.help = ['alive']
    handler.tags = ['main']
    handler.command = /^(alive)$/i 

    export default handler;
