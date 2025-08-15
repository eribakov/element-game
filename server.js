const express = require('express');
const path = require('path');
const config = require('./config');
const app = express();
const PORT = config.port;

// Basic logging middleware
if (config.enableLogging) {
    app.use((req, res, next) => {
        console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
        next();
    });
}

// Middleware to serve static files
app.use(express.static(path.join(__dirname)));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve CSS files
app.use('/css', express.static(path.join(__dirname, 'css')));

// Serve image files
app.use('/images', express.static(path.join(__dirname, 'images')));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'A4_RPS_Game_starter.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'A4_RPS_about_the_game.html'));
});

app.get('/instructions', (req, res) => {
    res.sendFile(path.join(__dirname, 'A4_RPS_instructions.html'));
});

app.get('/game/ai', (req, res) => {
    res.sendFile(path.join(__dirname, 'A4_RPS_Game_ai.html'));
});

app.get('/game/2player', (req, res) => {
    res.sendFile(path.join(__dirname, 'A4_RPS_Game_2_player.html'));
});

// API endpoints for game logic
app.post('/api/game/ai-choice', (req, res) => {
    const choices = ['fire', 'water', 'earth', 'air', 'electricity'];
    const aiChoice = choices[Math.floor(Math.random() * choices.length)];
    res.json({ aiChoice });
});

app.post('/api/game/result', (req, res) => {
    const { playerChoice, aiChoice } = req.body;

    // Game logic for determining winner
    const gameRules = {
        fire: ['earth', 'electricity'],
        water: ['fire', 'electricity'],
        earth: ['water', 'air'],
        air: ['fire', 'electricity'],
        electricity: ['water', 'earth']
    };

    let result;
    if (playerChoice === aiChoice) {
        result = 'tie';
    } else if (gameRules[playerChoice] && gameRules[playerChoice].includes(aiChoice)) {
        result = 'player';
    } else {
        result = 'ai';
    }

    res.json({ result, playerChoice, aiChoice });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// 404 handler
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'A4_RPS_Game_starter.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Game available at: http://localhost:${PORT}`);
});
