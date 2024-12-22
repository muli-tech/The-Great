import fetch from 'node-fetch';

let handler = async (m) => {
  await m.react('⏳');
  try {
    // Fetch a random joke from the API
    let response = await fetch(`https://api.giftedtech.my.id/api/fun/jokes?apikey=gifted`);
    
    if (!response.ok) {
      throw `❌ Failed to fetch joke. API response: ${response.status} - ${response.statusText}`;
    }

    // Parse the JSON response
    let data = await response.json();

    if (!data.success || !data.result) {
      throw "❌ Unexpected API response format.";
    }

    // Extract joke details
    let { setup, punchline } = data.result;

    // Send the joke to the chat
    await m.react('✅');
    await conn.sendMessage(
      m.chat,
      {
        text: `🤣 **Here's a joke for you:**\n\n${setup}\n\n*${punchline}*`,
      },
      { quoted: m }
    );
  } catch (error) {
    await m.react('❌');
    throw `An error occurred: ${error}`;
  }
};

handler.help = ['joke'];
handler.tags = ['fun'];
handler.command = /^(joke|jokes)$/i;

export default handler;
