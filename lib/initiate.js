const express = require('express');
const app = express();
const fs = require('fs');

// Load configuration from config.json
const configPath = '../config.json';
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

// Route handler for initiating authentication
app.get('/initiate-auth', async (req, res) => {
    const options = {
        requestType: "code",
        redirectUri: "http://localhost:3000/oauth/callback",
        clientId: config.clientId,
        scopes: [
            "calendars.readonly",
            "campaigns.readonly",
            "conversations/message.write",
            "conversations/reports.readonly",
            "conversations.write",
            "contacts.write",
            "courses.write",
            "forms.write",
            "forms.readonly"
        ]
    };

    const redirectUrl = `${config.baseUrl}/oauth/chooselocation?response_type=${options.requestType}&redirect_uri=${options.redirectUri}&client_id=${options.clientId}&scope=${options.scopes.join(' ')}`;

    return res.redirect(redirectUrl);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});