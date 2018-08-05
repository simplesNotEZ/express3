const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const port = process.env.PORT  || 7000;
const data = require('./students.json');

const findById = (params, dataParam) => {
    for(let i = 0; i < dataParam.length; i++) {
        let holderString = dataParam[i].ID.toString();
        if (params === holderString) {
            return dataParam[i];
        } 
    }
    return null;
}

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res, next) => {
    res.json({data});
})

app.get('/:id', (req, res, next) => {
    const student = findById(req.params.id, data);
    if (student) {
        res.json({"data": student});
    } else {
        res.json({
            error: {
                "message": "No record found!"
            }
        })
    }
})
    
app.listen(port, () => {
    console.log(`I'm listening on ${port}`);
})