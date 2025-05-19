import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
    },
    surname: {
        type: String,
    },
    city: {
        type: String,
    },
    age: {
        type: Number,
    },
    photo: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    }, 
    {
        timestamps: true,
    }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
