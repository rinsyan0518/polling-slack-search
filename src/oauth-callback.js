const env = require("dotenv").config().parsed;
const express = require("express");
const slack_web_api = require("@slack/web-api");
const fs = require("fs");
const child_process = require("child_process");

const app = express();

const slack_client_id = env.SLACK_CLIENT_ID;
const slack_client_secret = env.SLACK_CLIENT_SECRET;

if (!slack_client_id) {
  console.log("SLACK_CLIENT_ID is not found");
}

if (!slack_client_secret) {
  console.log("SLACK_CLIENT_SECRET is not found");
}

if (!(slack_client_id && slack_client_secret)) {
  process.exit(-1);
}

app.get("/", async (req, res) => {
  const code = req.query["code"];
  const web = new slack_web_api.WebClient();
  const data = await web.oauth
    .access({
      client_id: slack_client_id,
      client_secret: slack_client_secret,
      code: code
    })
    .catch(error => error);
  if (data.ok) {
    const access_token = data.access_token;
    fs.writeFileSync(".access_token", access_token);
    console.log("success");
  } else {
    console.error(`${data.error}`);
  }
  res.end();
});

const app_install_url = `https://slack.com/oauth/authorize?client_id=${slack_client_id}&scope=search:read`;
console.log(`open "${app_install_url}"`);

app.listen(3000, () => {
  console.log("http://localhost:3000 is running");
});
