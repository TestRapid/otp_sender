require("dotenv").config({ path: "./api.env" });
const express = require("express");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 5000;

const fotp = axios.create({
	baseURL: "https://www.fast2sms.com",
	headers: {
		authorization: process.env.API_KEY
	}
});

app.get("/send", async (req, res) => {
	try {
		const config = {
			variables_values: "5599",
			route: "otp",
			numbers: "7975072855"
		};
		const { data } = await fotp.post(`/dev/bulkV2`, config);
		res.json({ data });
	} catch (err) {
		res.json(err.message);
	}
});

app.listen(PORT, () =>
	console.log(`server started on http://localhost:${PORT}`)
);
