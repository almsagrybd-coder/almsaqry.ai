import express from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors()); // هذا السطر هو من سيحل مشكلة الموقع

const API_KEY = "AIzaSyA0_inQkBQI58Eo0_-xUEz6GxPE4WCkvJU";

app.post('/ask', async (req, res) => {
    const { prompt } = req.body;
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;

    try {
        const response = await axios.post(url, {
            contents: [{ parts: [{ text: prompt }] }]
        });
        const answer = response.data.candidates[0].content.parts[0].text;
        res.json({ answer: answer });
    } catch (error) {
        console.error("خطأ:", error.message);
        res.status(500).json({ error: "فشل في جلب الرد" });
    }
});

app.listen(5000, () => {
    console.log("------------------------------------");
    console.log("السيرفر شغال الآن على المنفذ 5000");
    console.log("يمكنك الآن تجربة الموقع..");
    console.log("------------------------------------");
});