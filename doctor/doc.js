//  logic for the code

// Request methods
// 1. GET - Going for a consultation to get a check up
// 2. POST - Going to get a new kidney inserted
// 3. PUT - Going to get a kidney replaced
// 4. DELETE - Going to get a kidney removed


// Status codes
// 1. 200 - Everything went fine
// 2. 404 - Doctor is not in the hospital
// 3. 500 - Mid surgery light went away
// 4. 411 - Inputs were incorrect, wrong person came to surgery
// 5. 403 => you were not allowed in the hospital


const express = require("express");
const app = express();
port = 3000;
var users = [{
    name: "peter",
    kidneys: [{
        healthy: false,
    }, {
        healthy: true,
    }]
}]


app.get("/", (req, res) => {
    const userKidneys = users[0].kidneys;
    const totalKidneys = userKidneys.length;
    // findind number of healthy kidneys
    let numOfHealthyKidneys = 0;
    for (let i = 0; i < userKidneys.length; i++) {
        if (userKidneys[i].healthy) {
            numOfHealthyKidneys = numOfHealthyKidneys + 1;
        }

    }
    // findind number of unhealthy kidneys
    const numOfunHealthyKidneys = totalKidneys - numOfHealthyKidneys;
    res.json({
        totalKidneys,
        numOfHealthyKidneys,
        numOfunHealthyKidneys
    })
})

app.use(express.json());

app.post("/", (req, res) => {
    const isHealthy = req.body.isHealthy;
    users[0].kidneys.push({
        healthy: isHealthy,
    })
    res.json({
        message: "one extra healthy kidney is added",
    })
})

app.put("/", (req, res) => {
    for (let i = 0; i < users[0].kidneys.length; i++) {
        users[0].kidneys[i].healthy = true;

    }
    res.json({
        msg: "unHealthy kidney is removed!!",
    })
})

app.delete("/", (req, res) => {
    // let atleastOneUnhealthyKidney = false;
    // for (let i = 0; i < users[0].kidneys.length; i++) {
    //     if (!users[0].kidneys[i].healthy) {

    //         atleastOneUnhealthyKidney = true
    //     }
    // }
    if (isThereAtleastAnyUnhealthyKidney()) {
        const newKidney = [];
        for (let i = 0; i < users[0].kidneys.length; i++) {
            if (users[0].kidneys[i].healthy) {
                newKidney.push({
                    healthy: true,
                })
            }

        }
        users[0].kidneys = newKidney;
        res.json({
            msg: "deleted all the unhealthy kidney!"
        })
    }else{
        res.status(411).json({
            msg : "you've no unhealthy kidney "
        })
    }
    

})
function isThereAtleastAnyUnhealthyKidney() {
    let atleastOneUnhealthyKidney = false;
    for (let i = 0; i < users[0].kidneys.length; i++) {
        if (!users[0].kidneys[i].healthy) {

            atleastOneUnhealthyKidney = true
        }
    }
    return atleastOneUnhealthyKidney;
}
app.listen(port)