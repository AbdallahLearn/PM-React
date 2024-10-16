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
        res.json({ token });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

