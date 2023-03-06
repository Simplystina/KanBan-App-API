const mongoose = require('mongoose')
const bcrypt = require('bcrypt')


const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const UserModel = new Schema(
    {
        id: ObjectId,
        email: {type: String, unique: true, required: true},
        fullName: {type: String, required: true},
        password: {type: String, required: true},
        isVerified: {
            type: Boolean,
            default: false
        },
        
        resetPasswordToken: {
            type: String,
            required: false
        },
    
        resetPasswordExpires: {
            type: Date,
            required: false
        }
    },
    {
        timestamps: true, toJSON: {virtuals: true}
    }
)


UserModel.pre(
    'save',
    async function(next){
        const user = this;
        const hash = await bcrypt.hash(this.password, 10)

        this.password = hash
        next()
    }
)

UserModel.methods.isValidPassword = async function(password){
    const user = this
    const compare = await bcrypt.compare(password, user.password)
    
    return compare
}

UserModel.methods.generatePasswordReset = function() {
    this.resetPasswordToken = crypto.randomBytes(20).toString('hex');
    this.resetPasswordExpires = Date.now() + 3600000; //expires in an hour
};

UserModel.methods.generateVerificationToken = function() {
    let payload = {
        userId: this._id,
        token: crypto.randomBytes(20).toString('hex')
    };

    return new Token(payload);
};


const User = mongoose.model('users', UserModel)

module.exports = User