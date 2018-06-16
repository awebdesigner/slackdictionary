const SlackBot = require("slackbots");
const axios = require("axios");

//Channel to use
const channel = "translateapp";

const bot = new SlackBot({
  token: "xoxb-373454261911-382395365605-IUwpIHXTCRW5488P5Qdh0puY",
  name: "translate"
});

let words = {};

const params = {
  icon_emoji: ":smiley:"
};

/**
 * Error Alert
 */
bot.on("error", err => console.log(err));

bot.on("message", data => {
  if (data.type !== "message") {
    return;
  }
  
  axios.get("https://raw.githubusercontent.com/WPLuganda/slackdictionary/master/words.json")
 .then(res => {
    const words = res.data;
  })
  
  handleMessage(data.text);
});

function handleMessage( message ) {
  for (key in words) {
        if ( message.includes(" " + key) ) {
          bot.postMessageToChannel(channel, `${key} = ${words.key}`, params);
     }
  }
}
