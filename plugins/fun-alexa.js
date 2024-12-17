import fetch from 'node-fetch';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  const name = conn.getName(m.sender);
  if (!text) {
    throw `Hi *${name}*, do you want to talk? Respond with *${usedPrefix + command}* (your message)\n\n📌 Example: *${usedPrefix + command}* Hi bot`;
  }
  
  m.react('🗣️');

  const msg = encodeURIComponent(text);
  const apiUrl = `https://api.giftedtech.my.id/api/ai/gpt4-o?apikey=gifted&q=${msg}`;
  
  try {
    // Attempt to fetch the response
    const res = await fetch(apiUrl);

    // Check for HTTP errors
    if (!res.ok) {
      throw new Error(`❌ API responded with status: ${res.status} ${res.statusText}`);
    }

    const json = await res.json();

    // Validate API response structure
    if (!json || !json.result || !json.result.response) {
      throw new Error("❌ Invalid API response structure.");
    }

    let reply = json.result.response;
    m.reply(reply);

  } catch (err) {
    console.error(`❌ Error fetching response from API:`, err.message);
    m.reply("⚠️ Sorry, I couldn't process your request. The server might be down or unreachable. Please try again later.");
  }
};

handler.help = ['bot'];
handler.tags = ['fun'];
handler.command = ['bot', 'alexa'];

export default handler;
