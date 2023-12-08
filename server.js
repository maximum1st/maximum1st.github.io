app.post('/translate', async (req, res) => {
    try {
        const { text } = req.body;
        const languages = ['Japanese', 'English', 'Korean', 'Chinese', 'Russian'];
        let translations = {};

        for (const lang of languages) {
            const response = await openai.createCompletion({
                model: 'text-davinci-003',
                prompt: `Translate this text to ${lang}: ${text}`,
                max_tokens: 60
            });
            console.log(`Response for ${lang}:`, response.data.choices[0].text.trim());
            translations[lang] = response.data.choices[0].text.trim();
        }

        res.json({ translations });
    } catch (error) {
        console.error('Error processing translation request:', error);
        res.status(500).send('Error processing translation request');
    }
});




