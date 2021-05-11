import groups from "./database/groups"
import {
  reportError
} from "./misc"
export async function cleanEvent(ctx) {
  try {
    if ("message" in ctx.update) {
      if (ctx.chat.type == "private") return
      let data = await groups.findOne({
        chat_id: ctx.chat.id
      })
      if (data == null) return
      if (!data.cleanEvent.status) return
      if (ctx.message.pinned_message && data.cleanEvent.pin) {
        try {
          return ctx.deleteMessage(ctx.message.message_id)
        }catch(error) {
          return
        }}
      if (ctx.message.new_chat_members && data.cleanEvent.welcome) {
        try {
          return ctx.deleteMessage(ctx.message.message_id)
        }catch(error) {
          return
        }
      }
      if (ctx.message.left_chat_member && data.cleanEvent.goodbye) {
        try {
          return ctx.deleteMessage(ctx.message.message_id)
        }catch(error) {
          return
        }}
      if ((ctx.message.voice_chat_participants_invited || ctx.message.voice_chat_ended || ctx.message.voice_chat_started) && data.cleanEvent.voiceChat) {
        try {
          return ctx.deleteMessage(ctx.message.message_id)
        }catch(error) {
          return
        }}
    }
    return
  }catch(error) {
    return reportError(error, ctx)
  }
}