## Overview
Hi. This is the repository of my bot ([Miss_duckbot](https://t.me/miss_duckbot)). This bot is written in typescript.
## License
[**MIT LICENSE**](/LICENSE)
## Command
- `/start` - starting bot
- `/setlang` - setting current language
- `/ocrts` - tesseractjs ocr
- `/ocr` - ocr space
- `/tr` - translate text
and any more.
## Features
- OCR
- Translate
- Duckbot Mata
- Anti Spam
and any more.
## Docs
Available on [https://butthx.now.sh](https://butthx.now.sh/)
## Deploy
- `git clone https://github.com/butthx/duckbot`
- `cd duckbot`
- `npm i -g yarn` _opsional if you don't have yarn_
- `yarn install`
- `touch .env`
fill `.env` file with [env value](#env)
- `yarn build`
- `yarn start`

To update all `dependencies` you can use `yarn upgrade`

[![replit deploy](https://replit.com/badge/github/butthx/duckbot)](https://repl.it/github/butthx/duckbot)
[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/butthx/duckbot)

To deploy on replit when a build not found module error appears, please run the command `yarn build`

## Env
`BOT_TOKEN` : Token bot from bot father.
`MONGGODB` : Mongoodb URI to connect database.
`SPAMWATCH_TOKEN` : Api key from spam watch.
`OCR_API` : OCR space api key.
`ERROR_LOG` : Channel/Groups/ID to report error.
`WEBHOOK` : running mode if `true` bot will running on webhook mode. if `false` bot will running on polling mode.
`OWNER_ID` : your user id
`URL` : webhook url. if `webhook=true` this env required
`USERNAME` : **username** your bot.
`BETA` : If `true` bot will using beta script when the `/update` command is executed. If `false`, the bot will use the stable script.

## Contribution
You can submit a pull request or an opened issue.


[![corwdin](https://img.shields.io/badge/Translate%20This%20Bot-success.svg?style=flat-square&logo=crowdin)](https://crowdin.com/project/missduckbot)

## Notes
This repo is still in **beta dev** if there are bugs or incomplete features please understand!