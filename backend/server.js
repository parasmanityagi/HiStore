import express from 'express';
import { config as configDotenv } from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';

import connectDB from './database/db.js';
import { userRouter, productRouter, cartRouter, wishlistRouter, paymentRouter } from './routes/index.js'; 
import swaggerSpec from './swagger/swaggerConfig.js';

const app = express();


// Swagger route
app.use('/api/swagger/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));



// Load environment variables from .env file
configDotenv();

// Connect to the database
connectDB();



// Middleware to parse JSON
app.use(express.json());
app.use(bodyParser.json())
app.use(cors());
app.use('/api/user/image', express.static('uploads'))
app.use('/api/products/image', express.static('assets'))

// Route handling
app.use('/api/user', userRouter);
app.use('/api/products', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/wishlist', wishlistRouter);
app.use('/api', paymentRouter);





// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});


// home route
app.get('/', (req, res) => {
    res.status(200).send('Welcome To Server!! Server is Running Well.');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


