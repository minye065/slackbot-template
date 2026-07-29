require("dotenv").config();

const { App } = require("@slack/bolt");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true
});

app.command("/twee-ping", async ({ command, ack, respond }) => {
  const start = Date.now();
  await ack();
  const latency = Date.now() - start;
  await respond({ text: `Pong! \`${latency}ms\`` });
});

(async () => {
  await app.start();
  console.log("bot is running!");
})();

app.command("/twee-help", async ({ ack, respond }) => {
  await ack();
  // Fixed the command name description to match your code
  await respond({ text: 'Available commands:\n`/twee-ping`: Check bot latency\n`/rand`: Get a random decimal up to 100\n`/dice`: Roll a 6-sided die' });
});

app.command("/twee-rand", async ({ ack, respond }) => {
  await ack();
  // Changed single quotes to backticks so the math evaluates correctly
  await respond({ text: `your number is ${Math.random() * 100}` });
});

app.command("/twee-dice", async ({ ack, respond }) => {
  await ack();
  const dice = Math.floor(Math.random() * 6) + 1;
  await respond({ text: `your number is ${dice}` });
});
