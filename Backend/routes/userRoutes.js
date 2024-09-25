import express from "express";
import User from '../models/User.js';
import Address from '../models/Address.js';


const router = express.Router();

router.post('/submit', async (req, res) => {
    const { name, address } = req.body;
  
    try {
      // Check if user already exists
      let user = await User.findOne({ name });
  
      // If user doesn't exist, create a new user
      if (!user) {
        user = new User({ name });
        await user.save();
      }
  
      // Create a new address linked to the user
      const newAddress = new Address({
        street: address.street,
        city: address.city,
        state: address.state,
        zipCode: address.zipCode,
        userId: user._id, // Link to existing or new user
      });
  
      await newAddress.save();
  
      user.addresses.push(newAddress._id);
      await user.save();
  
      res.status(201).json({ message: 'User and address created successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error creating user or address' });
    }
  });

// Get users with their addresses
router.get('/users', async (req, res) => {
try {
    const users = await User.find().populate('addresses');
    res.status(200).json(users);
} catch (error) {
    res.status(500).json({ error: 'Error fetching users and addresses' });
}
});

export default router;