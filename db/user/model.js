const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { boolean, required } = require('joi');

// Mongoose Schema 
const AuthSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: false,
        select: false
    },
    name: {
        type: String,
        required: false
    },
    avatar: {
        type: String,
        required: false
    },
    isGoogle: {
        type: Boolean,
        default: false
    },
    GoogleId: {
        type: String,
        default: null
    }
}, { timestamps: true });

// Hash password before saving
AuthSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next(); // Skip if password is not modified
    try {
        const salt = await bcrypt.genSalt(10); // Generate salt
        this.password = await bcrypt.hash(this.password, salt); // Hash password
        next();
    } catch (error) {
        next(error);
    }
});

const authModel = mongoose.model('auth', AuthSchema);

module.exports = authModel;  
