import mongoose from 'mongoose';
import User from '../models/user.model.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { AsyncHAndler } from '../utils/wrapAsync.js';
import passport from 'passport';

export const register = AsyncHAndler(async (req, res) => {
    const { username, password } = req.body;
    
    if (!username || !password) {
        throw new ApiError(400, 'Username and password are required');
    }
    
    const existingUser = await User.findOne({ username });
    if (existingUser) {
        throw new ApiError(409, 'Username already exists');
    }
    
    const user = new User({ username, password });
    await user.save();
    
    return res.status(201).json(new ApiResponse(201, 'User registered successfully'));
})