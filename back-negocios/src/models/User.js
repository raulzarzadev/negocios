const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs')

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    emailConfirmed: {
        type: Boolean,
    },
    password: {
        type: String,
        required: true,
    },
    credit: Number
}, {
    timestamps: true
});

userSchema.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = bcrypt.hash(password, salt);
    return hash;
};

userSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}


module.exports = model('User', userSchema)