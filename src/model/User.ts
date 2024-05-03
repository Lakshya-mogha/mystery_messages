import mongoose ,{Schema} from "mongoose";

export interface Messages {
    content: string;
    createdAt: Date;
}

const MessageSchema: Schema<Messages> = new Schema({
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export interface User {
    username: string;
    email: string;
    Password: string;
    verificationCode: string;
    verificationCodeExpires: Date;
    isVerified: boolean;
    createdAt: Date;
    messages: Messages[];
}

const UserSchema: Schema<User> = new Schema({
    username: {
        type: String,
        required: [true, 'username is required'],
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        unique: true,
        match: [/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g, 'invalid email']
    },
    Password: {
        type: String,
        required: true
    },
    verificationCode: {
        type: String,
        required: true
    },
    verificationCodeExpires: {
        type: Date,
        required: true
    },
    isVerified: {
        type: Boolean,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    messages: [MessageSchema]
})

const userModel = (mongoose.models.Users as mongoose.Model<User>) || (mongoose.model<User>("User",UserSchema));

export default userModel;