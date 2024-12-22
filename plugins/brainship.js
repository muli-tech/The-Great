import axios from 'axios';

const endpoint = 'https://v2-guru-indratensei.cloud.okteto.net/perplexity?query=';

function fetchData() {
  const response = [
    'get', 
    'https://v2-guru-indratensei.cloud.okteto.net/perplexity?query=', 
    '276zFiJPe', '431128qNRrNW', 
    'Please provide some text to get a response.', 
    ']&msg=[', 
    '133284kIJvbi', 'data', 
    '5905850ARRLtE', '3669rmFJzj', 
    '210396itpGbN', '245FfPZoI', 
    'cnt', 'error', 
    '16SwPtbd', 'help', 'chat', 
    'reply', 'command', 
    'http://api.brainshop.ai/get?bid=175685&key=Pg8Wu8mrDQjfr0uv&uid=[Suhail-MD]&msg=[', 
    '147dMHAtp', 'log', '83508Gugsga', 
    '253nqLmhR', '824067huynva', 'sender', 'tags'
  ];
  return response;
}

let handler = async (user, { text, conn, usedPrefix, command }) => {
  try {
    if (!text) throw 'Please provide some text to get a response.';
    let response = {};
    try {
      response = await axios.get('http://api.brainshop.ai/get?bid=179485&key=eE38jJX6r4VlZlSY&uid=[' + user.id + ']&msg=[' + text + ']');
    } catch (error) {
      console.error(error);
      response = await axios.get(endpoint + text + ']');
    }
    response.data ? user.reply(response.data.text) : user.reply('Request Denied!');
  } catch (error) {
    console.error(error);
    user.reply(error);
  }
};

handler.help = ['brain'];
handler.tags = ['AI'];
handler.command = ['brain'];

export default handler;
