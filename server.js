const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// مفتاح API الخاص بك (تأكد من وضعه هنا مؤقتاً أو كمتغير بيئة)
const GEMINI_API_KEY = "AIzaSyA0_inQkBQI58Eo0_-xUEz6GxPE4WCkvJU"; 

app.post('/ask', async (req, res) => {
    const { prompt } = req.body;

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }]
            })
        });

        const data = await response.json();
        
        if (data.candidates && data.candidates[0].content.parts[0].text) {
            res.json({ answer: data.candidates[0].content.parts[0].text });
        } else {
            res.status(500).json({ error: "فشل استخراج الرد من Gemini" });
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "خطأ في الاتصال بسيرفرات جوجل" });
    }
});

// الجزء الأهم لضمان التشغيل على Render
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`سيرفر ALMSAQRY يعمل الآن على المنفذ ${PORT}`);
});
