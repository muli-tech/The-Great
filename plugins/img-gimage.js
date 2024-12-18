import fetch from 'node-fetch';

let handler = async (message, { args }) => {
  // Extract the query from the user's input
  if (!args || args.length === 0) {
    return message.reply("Please provide a search query for images.");
  }

  const query = args.join(" ");
  const apiKey = "gifted";
  const endpoint = `https://api.giftedtech.my.id/api/search/googleimage?apikey=${apiKey}&query=${encodeURIComponent(query)}`;

  try {
    // Send a GET request to the API
    const response = await fetch(endpoint);
    const result = await response.json();

    if (!response.ok || result.error) {
      return message.reply("Failed to fetch image search results. Please try again later.");
    }

    // Check if results were found
    if (!result.data || result.data.length === 0) {
      return message.reply("No images found for the given query.");
    }

    // Format the response for the user
    const firstImage = result.data[0]; // Assuming the first result is the most relevant
    const replyMessage = `🔍 *Image Search Result for:* "${query}"\n\n![Image](${firstImage.url})\n\n*Title:* ${firstImage.title}`;

    // Send the reply to the user with the image
    await message.reply(replyMessage);

  } catch (error) {
    console.error("Error fetching image search results:", error);
    message.reply("An error occurred while fetching the image results. Please try again later.");
  }
};

// Command metadata
handler.help = ["img"];
handler.tags = ["img"];
handler.command = /^(img)$/i;

export default handler;
