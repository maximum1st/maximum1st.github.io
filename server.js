// 環境変数の読み込み
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const { OpenAIApi } = require('openai');
const cors = require('cors');

const app = express();

// CORSポリシーの設定
const corsOptions = {
  origin: 'https://maximum1st-git-develop-maximum1sts-projects.vercel.app',
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

app.use(bodyParser.json());

// OpenAI APIの初期化
const openai = new OpenAIApi({
  apiKey: process.env.OPENAI_API_KEY,
});

// 翻訳エンドポイント
app.post('/translate', async (req, res) => {
    try {
        const { text } = req.body;
        const languages = ['Japanese', 'English', 'Korean', 'Chinese', 'Russian'];
        let translations = {};

        for (const lang of languages) {
            // OpenAIを使用して翻訳
            const response = await openai.createCompletion({
                model: 'text-davinci-003', // または適切なモデル
                prompt: `Translate this text to ${lang}: ${text}`,
                max_tokens: 60
            });
            translations[lang] = response.data.choices[0].text.trim();
        }

        res.json({ translations });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error processing translation request');
    }
});

// サーバーの起動
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});


