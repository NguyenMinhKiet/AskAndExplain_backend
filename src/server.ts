import app from './app.js';

const PORT = process.env.PORT || 3000;
const DOMAIN_URI = process.env.DOMAIN_URI || `http://localhost:${PORT}`;
app.listen(DOMAIN_URI, () => {
    console.log(`Server running at ${DOMAIN_URI}`);
});
