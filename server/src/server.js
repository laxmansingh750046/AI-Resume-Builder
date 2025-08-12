import 'dotenv/config';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './db/index.js';
import { app } from './app.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

connectDB()
.then(() => {
    const frontendPath = path.join(__dirname, '../client/dist'); // for Vite

    app.use(express.static(frontendPath));

    app.get('*', (req, res) => {
        res.sendFile(path.join(frontendPath, 'index.html'));
    });

    app.listen(process.env.PORT || 8000, () => {
        console.log(`server is running at port ${process.env.PORT || 8000}`);
    });
})
.catch((error) => {
    console.log('mongodb connection failed', error);
});
