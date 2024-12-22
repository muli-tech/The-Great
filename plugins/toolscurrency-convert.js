import axios from 'axios';

const currencyApi = 'https://api.exchangerate-api.com/v4/latest/USD';

let handler = async (m, { text, conn, usedPrefix, command }) => {
  try {
    const regex = /^(\d+(\.\d+)?)\s+(\w{3})\s*:\s*(\w{3})$/;
    const match = text.match(regex);

    if (!match) {
      throw `❓ *Invalid command format. Example: ${usedPrefix + command} 25 USD:LKR*`;
    }

    const amount = parseFloat(match[1]);
    const fromCurrency = match[3].toUpperCase();
    const toCurrency = match[4].toUpperCase();

    if (isNaN(amount) || amount <= 0) {
      throw `⚠️ *Invalid amount. Please provide a valid positive number.*`;
    }

    const response = await axios.get(currencyApi);
    const rates = response.data.rates;

    if (!(fromCurrency in rates) || !(toCurrency in rates)) {
      throw `⚠️ *Invalid currency codes. Please check and try again.*`;
    }

    const convertedAmount = amount * (rates[toCurrency] / rates[fromCurrency]);
    const message = `💰 *Currency Conversion:*\n${amount} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`;
    
    conn.reply(m.chat, message, m);
  } catch (error) {
    console.error(error);
    m.reply(`⛔ *An error occurred: ${error.message || error}*`);
  }
};

handler.help = ['currency'];
handler.tags = ['utility'];
handler.command = ['currency'];

export default handler;
