import mongoose from 'mongoose';

const ideaSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the user who submitted the idea
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending',
    },
    feedback: String, // Supervisor's feedback
}, { timestamps: true });

const Idea = mongoose.model('Idea', ideaSchema);

export default Idea;
