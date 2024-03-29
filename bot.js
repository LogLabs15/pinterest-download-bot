//const dotenv = require("dotenv");
const axios = require("axios");
const { Telegraf } = require("telegraf");

//dotenv.config();
const bot = new Telegraf("6823826364:AAHclKqPFZpZD0UkvWOyYjLSdRc3q8nLONI");
const API_URL = "https://priyanshu-vid-api.onrender.com";

// command Start
bot.start((ctx) => {
  console.log("Received /start command");
  try {
    return ctx.reply("Hola Bienvenido a Nuestro Bot❤");
  } catch (e) {
    console.error("error in start action:", e);
    return ctx.reply("Error occured");
  }
});

// command About
bot.command("/about", (ctx) => {
  console.log("Received /about command");
  try {
    return ctx.reply(
      "This bot is made by @chanchitofeliz. \n\n" +
        "This bot is made to download videos from all platforms currently in development. \n\n" +
        "If you have any suggestions or feedback, please contact @chanchitofeliz. \n\n"
    );
  } catch (e) {
    console.error("error in about action:", e);
    return ctx.reply("Error occured");
  }
});

// command Contact
bot.command("/contadct", (ctx) => {
  console.log("Received /contact command");
  try {
    return ctx.reply(
      "If you have any suggestions or feedback, please contact @chanchitofeliz. \
      \n\n" +
        "Contribute in this project: https://github.com/priyanshu-creator/instant-saver-bot" +
        "\n\n" +
        "If you want to support me, you can donate here: https://www.buymeacoffee.com/priyanshucode" +
        "\n\n" +
        "My Email: priyanshu@somveers.me" +
        "\n\n" +
        "My Github: https://github.com/priyanshu-creator" +
        "\n\n" +
        "My Website: https://www.somveers.me"
    );
  } catch (e) {
    console.error("error in contact action:", e);
    return ctx.reply("Error occured");
  }
});

bot.on("message", async (ctx) => {
  const url = ctx.message.text;
  // if the message is hello
  if (ctx.message.text.indexOf("Hello") > -1) {
    ctx.reply("Hello");
  }
  if (
    ctx.message.text.indexOf("platforms") > -1 ||
    ctx.message.text.indexOf("Platform") > -1
  ) {
    ctx.sendMessage(
      "Currently supported platforms are:" +
        " \n\n" +
        "Pinterest: https://www.pinterest.com" +
        " \n\n" +
        "Pinterest Shorten: https://pin.it" +
        " \n\n" +
        "YouTube: https://www.youtube.com (soon)" +
        "\n\n" +
        "Instagram: https://www.instagram.com" +
        "\n\n"
    );
  }

  // if the message is a link of pinterest
  if (ctx.message.text.indexOf("pinterest.com") > -1) {
    try {
      ctx.reply("Espere Porfavor...");
      const { data: res } = await axios.get(`${API_URL}/pinterest?url=${url}`);
      const vid = res.url;
      ctx.replyWithVideo(vid);
    } catch (err) {
      ctx.reply("Something went wrong :(.\n\n Try again.");
      console.log(err);
    }
  }
  // if the message is a link of pinterest shorten
  if (ctx.message.text.indexOf("pin.it") > -1) {
    try {
      ctx.reply("Please wait...");
      const { data: res } = await axios.get(`${API_URL}/pinterest?url=${url}`);
      const vid = res.url;
      ctx.replyWithVideo(vid);
    } catch (err) {
      ctx.reply("Something went wrong :(.\n\n Try again.");
      console.log(err);
    }
  }
  // if the message is a link of youtube
  if (ctx.message.text.indexOf("youtube") > -1) {
    ctx.reply("Youtube is not supported yet");
  }
  if (ctx.message.text.indexOf("instagram") > -1) {
    try {
      ctx.reply("Please wait...");
      const { data: res } = await axios.get(`${API_URL}/instagram?url=${url}`);
      const media = res.url;
      ctx.replyWithDocument(media);
    } catch (err) {
      ctx.reply("Something went wrong :(.\n\n Try again.");
      console.log(err);
    }
  }
});
// bot.launch();
// AWS event handler syntax (https://docs.aws.amazon.com/lambda/latest/dg/nodejs-handler.html)
exports.handler = async (event) => {
  try {
    await bot.handleUpdate(JSON.parse(event.body));
    return { statusCode: 200, body: "" };
  } catch (e) {
    console.error("error in handler:", e);
    return {
      statusCode: 400,
      body: "This endpoint is meant for bot and telegram communication",
    };
  }
};

bot.launch()