const express = require("express");
const app = express();
const router = require("./routes");
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(router);
app.use(cors());

app.listen(5000, () => console.log(`listening at http://localhost:${5000}`));