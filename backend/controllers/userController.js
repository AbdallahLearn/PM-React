import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import bcrypt from 'bcrypt';






export const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
   
        if (name.length < 5) {
            return res.status(400).json({ message: 'Name must be at least 5 characters long' });
        }

       
        if (!email.includes('@Tuwaiq')) {
            return res.status(400).json({ message: 'Email must contain @Tuwaiq' });
        }

       
        if (password.length <= 7 || !/[A-Za-z]/.test(password)) {
            return res.status(400).json({ message: 'Password must be more than 7 characters and contain at least one letter' });
        }

        
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

       
        const hashedPassword = await bcrypt.hash(password, 10);

        
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });

        
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Registration error:', error); 
        res.status(500).json({ message: 'Server error', error: error.message }); 
    }
};





export const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; 
    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403); 
        req.user = user; 
        next();
    });
};



export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

       
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token , id: user._id, name: user.name});
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const getUser = async (req, res) => {
    const { id } = req.params; // Get the user ID from the URL parameters

    try {
        // Find the user by ID
        const user = await User.findById(id);

        // If user not found, return a 404 error
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // If user found, return user data (excluding password)
        res.status(200).json({
            id: user._id,
            name: user.name,
            email: user.email,
            usertype: user.usertype,
            // Add any other fields you want to return
        });
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getAllUsers = async (req, res) => {
    try {
        // Retrieve all users from the database
        const users = await User.find();

        // If no users are found, return an empty array
        if (!users.length) {
            return res.status(200).json([]);
        }

        // Return users' data (excluding sensitive information like passwords)
        const userData = users.map(user => ({
            id: user._id,
            name: user.name,
            email: user.email,
            usertype: user.usertype,
            // Add any other fields you want to return
        }));

        res.status(200).json(userData);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
