const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const sponsorModel = require("./models/sponsor.model.js");
const amountModel = require("./models/amount.model.js");
const cors = require("cors");
const app = express();

app.use(cors(
    {
        origin: ["https://sponsor-frontend-two.vercel.app"],
        methods: ["POST", "GET"],
        credentials: true
    }
));
app.use(express.json());

app.get("/", async (req, res) => {
    try {
        res.status(200).sendFile(path.resolve(__dirname, "../frontend/index.html"));
    } catch (error) {
        res.status(404).send("Not Found");
    }
});

app.get("/show.html", async (req, res) => {
    try {
        res.status(200).sendFile(path.resolve(__dirname, "../frontend/show.html"));
    } catch (error) {
        res.status(404).send(error);
    }
});

app.post("/form", async (req, res) => {
    try {
        const { sponsor_id, id, name } = req.body;
        const user_id = await sponsorModel.findOne({ id: sponsor_id });
        console.log(user_id);
        if(user_id) {
            const formData = {
                sponsor_id: Number(sponsor_id),
                id: Number(id),
                name: String(name).trim()
            };
            const formEntry = await sponsorModel.create(formData);
            res.status(201).json(formEntry);
        } else {
            res.status(404).json(`${user_id} not exist`);
        }
    } catch (error) {
        res.status(422).json(error);
    }
});

app.get("/show", async (req, res) => {
    try {
        const data = await sponsorModel.find();
        const amount = await amountModel.aggregate([
            {
                $group:
                {
                    _id: "$id",
                    totalAmount: { $sum: "$amount" }
                }
            }
        ]);
        res.status(200).json([data, amount]);
    } catch (error) {
        res.status(500).json(error);
    }
});

app.post("/amount", async (req, res) => {
    try {
        const { id, amount } = req.body;
        const user = await sponsorModel.find({id});
        if(user) {
            const amn = {
                id: id,
                amount: amount
            };
            const amnData = await amountModel.create(amn);
            res.status(201).json(amnData);
        } else {
            res.status(404).json(error);
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

mongoose.connect("mongodb+srv://tanu1829asdf:tamanna.2003@sponsor.yejyz.mongodb.net/sponsor?retryWrites=true&w=majority&appName=Sponsor").then(() => {
    console.log("Database Connected...");
    app.listen(5000, () => {
        console.log("Server Live at Port 5000...");
    });
}).catch(() => {
    console.log("Connection Failed...");
});