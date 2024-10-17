import Idea from '../models/Idea.js'; // Import the Idea model
import User from '../models/User.js'; // Import the User model (if needed)

// Function to create a new idea
export const createIdea = async (req, res) => {
    try {
        const user = await User.findById(req.user.id); 
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
            idea: idea,
            status: 'pending', // Default status
        });

        // Save the idea to the database
        const savedIdea = await newIdea.save();
        user.ideas = newIdea._id;
        await user.save();
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
        const { idea , status } = req.body; // Get updated fields from the request body

        
        // Validate the input (at least one field must be present)
        if (!idea) {
            return res.status(400).json({ message: 'Idea is required to update.' });
        }

        // Find the idea by ID
        const edittedIdea = await Idea.findById(id);

        // If the idea is not found
        if (!edittedIdea) {
            return res.status(404).json({ message: 'Idea not found.' });
        }

        if (idea) edittedIdea.idea = idea; // Only update if provided

        // Determine new status based on the action
        if (status) {
            if (status === 'rejected') {
                edittedIdea.status = 'rejected';
            } else if (status === 'accepted') {
                edittedIdea.status = 'accepted';
            } else if (status === 'edited') {
                edittedIdea.status = 'edited';
            }
        } else {
            // If no status is provided, default to 'edited' for any updates
            edittedIdea.status = 'edited';
        }

        // Update the idea fields
        // if (description) idea.description = description; // Only update if provided

        // Save the updated idea
        const updatedIdea = await edittedIdea.save();

        return res.status(200).json(updatedIdea); // Return the updated idea
    } catch (error) {
        console.error('Error updating idea:', error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};


export const getAllIdeas = async (req, res) => {
    try {
        // Retrieve all users from the database
        const ideas = await Idea.find().populate("user");

        // If no users are found, return an empty array
        if (!ideas.length) {
            return res.status(200).json([]);
        }

        // Return users' data (excluding sensitive information like passwords)
        // const userData = users.map(user => ({
        //     id: user._id,
        //     name: user.name,
        //     email: user.email,
        //     usertype: user.usertype,
        //     // Add any other fields you want to return
        // }));

        res.status(200).json(ideas);
    } catch (error) {
        console.error('Error fetching ideas:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

