import fetch from 'node-fetch';
import uploadImage from '../lib/uploadImage.js';

let handler = async m => {
  const imageBuffer = await (await fetch('https://telegra.ph/file/8844f68f975294619490f.jpg')).buffer();
  let imgurl = await uploadImage(imageBuffer);

  const messageContent = `
  ╭⭑⭑⭑★✪ *‖⫷※•şɐɱʉ•※⫸‖* ✪★⭑⭑⭑
  │ 📂 *BOT Name:* _‖⫷※•şɐɱʉ•※⫸‖_
  │ 📝 *Description:* _I'm ‖⫷※•şɐɱʉ•※⫸‖. A MultiDevice WhatsApp bot with rich features Created By ‖⫷※•şɐɱʉ•※⫸‖._
  │ 👤 *Owner:* _SaMu_
  │ 🌐 *Channel:* https://chat.whatsapp.com/FV96nX6l7iCGmBeunOFPa0
  ╰━━━━━━━━━━━━━━━━╯
  `.trim();

  await conn.sendButton(
    m.chat,
    'Here is your Result',
    author,
    imgurl,
    [['MENU', `${usedPrefix}menu`], ['WATCH ANIME', `https://ab-streamer.vercel.app`]],
    m
  );
};

handler.help = ['bchannel'];
handler.tags = ['main'];
handler.command = ['samuchannel', 'bchannel'];
export default handler;
