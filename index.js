require("dotenv").config();
const { App } = require("@slack/bolt");
const { icebreaker, ateball, fortune } = require("./array.js");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true
});

function randInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pickIcebreaker()
{
	let magicNumber = randInclusive(0,19);
	return icebreaker[magicNumber];
}

function pickateBall()
{
	let magicNumber = randInclusive(0,7);
	return ateball[magicNumber];
}

function pickFortune()
{
	let magicNumber = randInclusive(0,22);
	return fortune[magicNumber];
}

app.command("/twee-ping", async ({ command, ack, respond }) => {
  const start = Date.now();
  await ack();
  const latency = Date.now() - start;
  await respond({ text: `Pong! \`${latency}ms\`` });
});

app.command("/twee-help", async ({ ack, respond }) => {
  await ack();
  await respond({ text:
    "Available commands:\n" +
    "/twee-ping: Check bot latency\n" +
    "/twee-rand: Random number 0-100, or /twee-rand 1 10 for a custom range\n" +
    "/twee-dice: Roll a 6-sided die\n" +
    "/twee-icebreaker: Random icebreaker question\n" +
    "/twee-8ball: Ask the magic 8-ball\n" +
    "/twee-fortune: Random fortune cookie\n" +
    "Coming soon: /twee-hangman, /twee-wordle, /twee-emojify"
  });
});

app.command("/twee-rand", async ({ command, ack, respond }) => {
  await ack();
  const t = command.text.trim();
  if (t === "")
  {
    await respond({ text: `your number is ${randInclusive(0, 100)}` });
    return;
  }
  const [min, max] = t.split(/\s+/).map(Number);
  if (max === undefined || Number.isNaN(min) || Number.isNaN(max) || min > max)
  {
    await respond({ text: 'no' });
    return;
  }
  await respond({ text: `your number is ${randInclusive(min, max)}` });
});

app.command("/twee-dice", async ({ ack, respond }) => {
  await ack();
  const dice = Math.floor(Math.random() * 6) + 1;
  await respond({ text: `your number is ${dice}` });
});

app.command("/twee-icebreaker", async ({ ack, respond }) => {
  await ack();
  await respond({ text: pickIcebreaker() });
});

app.command("/twee-8ball", async ({ ack, respond }) => {
  await ack();
  await respond({ text: pickateBall() });
});

app.command("/twee-hangman", async ({ ack, respond }) => {
  await ack();
  await respond({ text: "so this doesnt work yet" });
});

app.command("/twee-wordle", async ({ ack, respond }) => {
  await ack();
  await respond({ text: "so this doesnt work yet" });
});

app.command("/twee-emojify", async ({ ack, respond }) => {
  await ack();
  await respond({ text: "so this doesnt work yet" });
});

app.command("/twee-fortune", async ({ ack, respond }) => {
  await ack();
  await respond({ text: pickFortune() });
});

(async () => {
  await app.start();
  console.log("bot is running!");
})();