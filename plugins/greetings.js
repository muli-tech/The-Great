const userLastMessageMap = new Map();

export async function all(m) {
  const busy = 5 * 60 * 1000;  //if am aout for more than five minutes this will coolyou down

  const currentTime = Date.now();
  const userId = m.sender;

  if (userLastMessageMap.has(userId)) {
    const lastMessageTime = userLastMessageMap.get(userId);
    if (currentTime - lastMessageTime < busy) {
      return;
    }
  }

  const greetings = [
    'Hello',
    'Hi',
    'Mambo',
    'bro',
    'hello',
    'Hie',
    'hi',
    'Heey',
    'Sam',
    'SaMu',
    'niaje'
  ];

  if (
    greetings.includes(m.text) &&
    !m.isBaileys &&
    !m.isGroup
  ) 
  {

    m.reply('*WELCOME am ‖⫷※•şɐɱʉ•※⫸‖ personal assistant*\n\n\nHello 💕🥰 \n I may be offline or I may be slow to respond, but wait I will be back soon 😇\n type */menu* to enjoy some awesome commands as you wait')
    /* this.sendButton(
      m.chat,
      `*WELCOME am ‖⫷※•şɐɱʉ•※⫸‖ personal assistant*      
    Hello 💕🥰 @${m.sender.split('@')[0]} 
    I may be offline or I may be slow to respond, but wait I will be back soon 😇 click on any button below for instructions`.trim(),
      igfg,
      null,
      [['OWNER HELP', '.grp'], ['the script', '.repo']],
      m,
      { mentions: [m.sender] } 
    );*/
    m.react('💕');
    
    userLastMessageMap.set(userId, currentTime);
  }

  return !0;
}
