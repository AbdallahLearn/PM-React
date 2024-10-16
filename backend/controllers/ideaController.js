import Idea from '../models/Idea.js'; // Import the Idea model
import User from '../models/User.js'; // Import the User model (if needed)

// Function to create a new idea
export const createIdea = async (req, res) => {
    try {
        const user = await User.findById(req.user._id); 
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const { idea } = req.body; // Only capture the 'idea' from the request body

        // Validate the input
        if (!idea) {
            return res.status(400).json({ message: 'Idea is required.' });
        }

        // Create a new idea
        const newIdea = new Idea({
            user: user._id,
            idea,
            status: 'pending', // Default status
        });

        // Save the idea to the database
        const savedIdea = await newIdea.save();

        return res.status(201).json(savedIdea);
    } catch (error) {
        console.error('Error creating idea:', error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};


// Function to update an existing idea
export const updateIdea = async (req, res) => {
    try {
        const { id } = req.params; // Get the idea ID from the URL parameters
        const { title, description, status } = req.body; // Get updated fields from the request body

        
        // Validate the input (at least one field must be present)
        if (!title && !description && !status) {
            return res.status(400).json({ message: 'At least one field (title, description, or status) is required to update.' });
        }

        // Find the idea by ID
        const idea = await Idea.findById(id);

        // If the idea is not found
        if (!idea) {
            return res.status(404).json({ message: 'Idea not found.' });
        }

        // Determine new status based on the action
        if (status) {
            if (status === 'rejected') {
                idea.status = 'rejected';
            } else if (status === 'accepted') {
                idea.status = 'accepted';
            } else if (status === 'edited') {
                idea.status = 'edited';
            }
        } else {
            // If no status is provided, default to 'edited' for any updates
            idea.status = 'edited';
        }

        // Update the idea fields
        if (title) idea.title = title; // Only update if provided
        if (description) idea.description = description; // Only update if provided

        // Save the updated idea
        const updatedIdea = await idea.save();

        return res.status(200).json(updatedIdea); // Return the updated idea
    } catch (error) {
        console.error('Error updating idea:', error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};
