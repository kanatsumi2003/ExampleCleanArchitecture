const express = require('express');
require('dotenv').config();
const app = express();

const PORT = process.env.PORT;
app.use(express.json());    

app.listen(3000, '0.0.0.0', () => {
    console.log(`Server is runnit at port: ${PORT}`);
})