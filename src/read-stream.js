const fs = require("fs");
const slack_web_api = require("@slack/web-api");
const moment = require("moment");
require("colors");

let token = "";
try {
  token = fs.readFileSync(".access_token", "utf-8");
} catch (err) {
  if (err.code === "ENOENT") {
    console.log("access token is not found".yellow);
  } else {
    console.log("unknown error".red);
  }
  process.exit(-1);
}

const sleep = msec => new Promise(resolve => setTimeout(resolve, msec));
function writeMessage(message) {
  const dt = moment(new Date(parseFloat(message.ts) * 1000)).format(
    "YYYY-MM-DD HH:mm:ss"
  );
  const text =
    `${message.channel.name.green}: ${message.username}  ${dt}\n` +
    `${message.text}\n`;
  console.log(text);
}

const wait_time = 10 * 1000; // 10 second

const web = new slack_web_api.WebClient(token);
(async () => {
  let last_time_stamp = 0;
  while (true) {
    const response = await web.search.all({
      count: 50,
      query: "on:today",
      sort: "timestamp",
      sort_dir: "desc",
      token: token
    });
    if (!response.ok) continue;
    const messages = response.messages.matches.filter(
      msg => parseFloat(msg.ts) * 1000 > last_time_stamp
    );
    if (messages.length > 0)
      last_time_stamp = parseFloat(messages[0].ts) * 1000;
    messages.reverse().forEach(msg => writeMessage(msg));
    await sleep(wait_time);
  }
})().catch(error => {
  console.log(error);
});
