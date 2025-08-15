// Configuration file for the Element Game
const config = {
    // Server configuration
    port: process.env.PORT || 3002,
    environment: process.env.NODE_ENV || 'development',

    // Game configuration
    gameRules: {
        fire: ['earth', 'electricity'],
        water: ['fire', 'electricity'],
        earth: ['water', 'air'],
        air: ['fire', 'electricity'],
        electricity: ['water', 'earth']
    },

    // Elements available in the game
    elements: ['fire', 'water', 'earth', 'air', 'electricity'],

    // Default game settings
    defaultScoreToWin: 3,

    // Logging
    enableLogging: true
};

module.exports = config;
