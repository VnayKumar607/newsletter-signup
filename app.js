const bodyParser = require("body-parser");
const express = require("express");
const request = require("request");
const https = require("https");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/" , function(req,res){
    res.sendFile(__dirname + "/signup.html");
})

app.post("/" , function(req,res){
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    
    //console.log(firstName);

    var data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName,
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);
    
    const url = "https://us21.api.mailchimp.com/3.0/lists/dac158d297";

    const options ={
        method: "POST",
        auth: "vinay607:8afa791609fde3f3ddc0715c15c7856a"
    }

    const request = https.request(url, options , function(response){

        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html");
        } else {
            res.sendFile(__dirname + "/failure.html");
        }

        response.on("data" , function(data){
            console.log(JSON.parse(data));
          });
    });

    request.write(jsonData);
    request.end();

    
   // res.send()
})

app.post("/failure" , function(req,res){
    res.redirect("/");
})

app.listen(process.env.PORT || 3000, function(){
    console.log("Server is running on port 3000...");
})




//API KEY
//8afa791609fde3f3ddc0715c15c7856a

//dac158d297