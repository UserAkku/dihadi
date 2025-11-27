import express from "express"; 
import cookieParser  from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";
import path from "path";


dotenv.config({});
const app = express();

const  __dirname = path.resolve();


app.get("/home", (req,res)=>{
    return res.status(200).json({
        message : "hello anant ke papa",
        success : true
    }) 
})

//middleware

app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cookieParser());
const corsOptions = {
    origin : 'https://dihadi-q3e5.onrender.com',
    credentials : true
}

app.use(cors(corsOptions))

const port = process.env.PORT || 3000; 

//apis
app.use("/api/v1/user", userRoute )
app.use("/api/v1/company", companyRoute )
app.use("/api/v1/job", jobRoute )
app.use("/api/v1/application", applicationRoute )


app.use(express.static(path.join(__dirname, "./frontend/dist")))
app.get(/.*/, (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/dist/index.html"));
});


app.listen(port, ()=>{
    console.log(`server running at ${port}`)
    connectDB()

})



//jitnaaa usekiaa usee me kiaa dekhana baaki hai


//cors
//utils and cnfig me kiaa diffrnce me ne rtih db wali file ko utils me likhaa hai and chat gpt says ki db wali file and .env etc ko config me daloo 



















