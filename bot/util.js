require('dotenv').config()
const fs = require('fs')
const { lang } = require('./lang/language')
const util = {
    makeid: function (length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    },
    sleep: function (milliseconds) {
        const date = Date.now();
        let currentDate = null;
        do {
            currentDate = Date.now();
        } while (currentDate - date < milliseconds);
    },
    kirimpesan: async function (ctx, text = "", keyboard = "") {
        try {
            if (ctx.message.reply_to_message) {
                if (keyboard !== "") {
                    return await ctx.reply(text, {
                        parse_mode: "HTML",
                        reply_to_message_id: ctx.message.reply_to_message.message_id,
                        reply_markup: {
                            'inline_keyboard': keyboard
                        }, disable_web_page_preview: true
                    })
                } else {
                    return await ctx.reply(text, {
                        parse_mode: "HTML",
                        reply_to_message_id: ctx.message.reply_to_message.message_id, disable_web_page_preview: true
                    })
                }
            } else if (keyboard !== "") {
                return await ctx.reply(text, {
                    parse_mode: "HTML", reply_to_message_id: ctx.message.message_id, reply_markup: {
                        'inline_keyboard': keyboard
                    }, disable_web_page_preview: true
                })
            } else {
                return await ctx.reply(text, {
                    parse_mode: "HTML",
                    reply_to_message_id: ctx.message.message_id, disable_web_page_preview: true
                })
            }
        } catch (error) {
           this.error_log(ctx,error)
        }
    },
    error_log: async function (ctx, err) {
        try {
            ctx.reply('ops! something wrong!\nI send the error log to developer.\nMaybe Developer can fix this error!')
            ctx.telegram.sendMessage(process.env.ERROR_LOG,`Hi Dev! i'am error! i will send document to report this error! if i not send please check the console!`)
            console.log(err)
            console.log(ctx.message)
            let error_file_name = `Error-${Date.now()}.txt`
            let error_data = `Error Date : ${new Date(Date.now()).toUTCString()}\nMessage info :\n${JSON.stringify(ctx.message)}\nError Info :\n${JSON.stringify(err)}\n${err}`
            fs.writeFileSync(`./${error_file_name}`, error_data)
            this.sleep(1000)
           let msg = await ctx.telegram.sendDocument(process.env.ERROR_LOG, { source: `./${error_file_name}`, filename: error_file_name }, { caption: `${error_file_name}\n From : ${ctx.message.chat.id}\n${err.message}` })
           ctx.telegram.pinChatMessage(msg.chat.id,msg.message_id,{disable_notification : false})
            this.sleep(1000)
            return fs.unlinkSync(`./${error_file_name}`)
        } catch (error) {
           let emsg = await ctx.telegram.sendMessage(process.env.ERROR_LOG, `Hi Dev! I can't send document! please check log!`)
          return ctx.telegram.pinChatMessage(emsg.chat.id,emsg.message_id,{disable_notification : false})
        }
    },
    kirimPesanPin : async function (ctx, text = "", keyboard = "") {
        try {
            if (keyboard !== "") {
                return await ctx.reply(text, {
                    parse_mode: "HTML", reply_to_message_id: ctx.message.message_id, reply_markup: {
                        'inline_keyboard': keyboard
                    }, disable_web_page_preview: true
                })
            } else {
                return await ctx.reply(text, {
                    parse_mode: "HTML",
                    reply_to_message_id: ctx.message.message_id, disable_web_page_preview: true
                })
            }
        } catch (error) {
           this.error_log(ctx,error)
        }
    },
   getLang : async function(ctx,params){
     let language = 'en'
     if(ctx.callbackQuery){
       if (ctx.callbackQuery.from.language_code && lang[ctx.callbackQuery.from.language_code]) {
        language = ctx.callbackQuery.from.language_code.toLowerCase()
    }
     }else{
     if (ctx.message.from.language_code && lang[ctx.message.from.language_code]) {
        language = ctx.message.from.language_code.toLowerCase()
       }
    }
    return lang[language][params]
   }
}
module.exports = util

