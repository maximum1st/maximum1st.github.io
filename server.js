require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { Configuration, OpenAIApi } = require('openai');
const cors = require('cors');

const app = express();

// 許可するドメインのリスト
const allowedOrigins = [
  'https://maximum1st-git-develop-maximum1sts-projects.vercel.app',
  'https://maximum1st.github.io',
  'https://maximum1st-github-1wc7nr8hv-maximum1sts-projects.vercel.app'
];

// CORSポリシーの設定
app.use(cors({
  origin: function (origin, callback) {
    // originが許可リストにない場合は、エラーを返す
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200 // レガシーブラウザのための設定
}));

app.use(bodyParser.json());

// OpenAI APIの初期化
const openai = new OpenAIApi(new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
}));

// 翻訳エンドポイント
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
      translations[lang] = response.data.choices[0].text.trim();
    }

    res.json({ translations });
  } catch (error) {
    console.error('Error processing translation request:', error);
    res.status(500).send('Error processing translation request');
  }
});

// サーバーの起動
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});



