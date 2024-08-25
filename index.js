const express = require("express");
const app = express();

const user = [{
    name: "man",
    kidney: [{
        healthy: false
    }] 
}
];

app.use(express.json());

app.get("/", function(req,res){ //req=request , res=response
    const manKidneys = user[0].kidney;
    const noOfKidneys = manKidneys.length;
    let noOfTheHeathyKidneys = 0;
    for (let i =0;i < manKidneys.length;i++){
        if(manKidneys[i].healthy){
            noOfTheHeathyKidneys = noOfTheHeathyKidneys+1;
        }
    }
    const noOfUnhealthyKidneys = noOfKidneys-noOfTheHeathyKidneys;
    res.json({
        noOfKidneys,
        noOfTheHeathyKidneys,
        noOfUnhealthyKidneys,
    })
})

app.post("/",function(req,res){

    const isHealthy = req.body.isHealthy;
    user[0].kidney.push({
        healthy: isHealthy
    })
    res.json({
        msg: "Done!"
    })
})

app.put("/",function(req ,res){
    for(let i=0; i<user[0].kidney.length; i++){
        user[0].kidney[i].healthy = true;
    }
    res.json({});
})

// rmv all unhealthy kidneys
app.delete("/",function(req,res){
    if(shouldOneUnhealthyKidney()) {
        const newKidneys = [];
        for( let i =0; i<user[0 ].kidney.length;i++) {
            if( user[0].kidney[i].healthy) {
                newKidneys.push({
                    healthy: true
                })
            }
        }
        user[0].kidney = newKidneys;
            res.json({msg:"done"})
    } else {
        res.status(411).json({
            msg: " You have no bad kidney"
        });
    }
})
    
function shouldOneUnhealthyKidney() {
    let atleastOneUnhealthyKidney = false;
    for(let i =0; i<user[1].kidney.length; i++) {
        if (!user[1].kidney[i].healthy) {
            atleastOneUnhealthyKidney = true;
        }
    }
    return atleastOneUnhealthyKidney
}

app.listen(3000);