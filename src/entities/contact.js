import mongoose, { Schema } from 'mongoose';

//  define the necessary fields for your contact list
export const ContactSchema = new Schema(
    {
      phone: {
        type: String,
        trim: true,
        index: true,
        unique: true,
        required: true
      },
      creator: String,
      address: {
        type: String,
        trim: true
      },
      gender: {
        type: String,
        trim: true
      },
      createdAt: {
        type: Date,
        default: new Date()
      },
    },
    { collection: 'contacts' }
)

export default mongoose.model('Contact', ContactSchema);
