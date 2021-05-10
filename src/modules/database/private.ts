import mongoose, {
  Schema,
  Document
} from "mongoose"

interface IUser extends Document {
  chat_id: number;
  value: number;
  warns: Array < any >;
  lang: string;
  connected: number
}
export const privateSchema = new Schema({
  chat_id: {
    type: Number
  },
  value: {
    type: Number,
    default: 0
    },
    warns: {
      type: Array,
      default: new Array()
      },
      lang: {
        type: String,
        default: 'en'
        },
        connected: {
          type: Number,
          default: 0
          }
        })
      const privates = mongoose.model < IUser > ("privates", privateSchema)
      export default privates