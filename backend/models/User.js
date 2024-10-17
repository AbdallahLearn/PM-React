import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
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
    usertype: {
        type: String,
        enum: ['student', 'supervisor'],
        default: 'student',
        required: true,
    },
    
    ideas: { type: mongoose.Schema.Types.ObjectId, ref: 'Idea' },
},
{ timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;
