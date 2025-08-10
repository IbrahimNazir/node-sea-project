const express = require('express');
const app = express();

app.use(express.json({ limit: '10mb' }));

app.get('/', (req, res) => {
    res.send(`Hello, ${process.argv[2] || 'World'}!`);
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});