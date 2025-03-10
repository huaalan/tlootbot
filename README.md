## About
A discord bot for posting items as thread from screenshots using OCR.

## Resources
discord.js
ngrok
tesseract.js
quickdb

## Setup
1. Create discord app. https://discord.com/developers/docs/quick-start/overview-of-apps
2. Requires environment variables APP_ID, PUBLIC_KEY, DISCORD_TOKEN from discord to be set up in a .env file.
3. Set up interactions endpoint in discord dev portal if hosting or using ngrok.
4. Create url and install on server.

## Usage
The bot requires a forum channel to post items.
After creating a forum channel, configure the bot with /setup and select the intended channel.
This bot has the ability to post multiple items from one message. 
To do this, upload multiple screenshots to one message, right click the message, and select extract-image.
A message should return with links to the appropriate threads posted in the configured channel.
