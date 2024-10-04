import { GoogleGenerativeAI } from "@google/generative-ai";
import express from "express";
import cors from "cors";

const app = express();

var whitelist = [
  "https://www.propertyease.in",
  "https://test.propertyease.in",
  "https://propertyease.in",
  "http://localhost:5174",
  "http://localhost:3000",
  "http://localhost:5173",
];
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
      //callback(null, true);
    }
  },
};

app.use(cors(corsOptions));
app.use(express.json());
//const router = express.Router();

const genAI = new GoogleGenerativeAI("AIzaSyA2QXouIyIMunev1xjUr6E--cwZWc9td54");

// async function run() {
//   const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
//   const result = await model.generateContent(["Explain how AI works"]);
//   console.log(result.response.text());
// }
// run();

// router.post("/genrate-sop" , async (req, res) => {
//     console.log(req.body)
//     const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
//     const result = await model.generateContent(["Explain how AI works"]);
//     console.log(result.response.text());
//     if (err) return res.status(500).json(err);
//       return res.status(200).json(result.response.text());
// });

app.post("/generate-sop", async (req, res) => {
  //console.log(req.body);
  const input = `
Please mention University/Institute Country: ${req.body.input1.stu_universityCountry}
Enter University/Institute Name: ${req.body.input1.stu_universityName}
Enter course name here: ${req.body.input1.stu_courseName}
Enter name of the student: ${req.body.input1.stu_name}
Write birthdate of the student in dd.mm.yyyy format: ${req.body.input1.stu_birthDate}
Write address of the student: ${req.body.input1.stu_address}
Enter Father’s Name: ${req.body.input1.stu_fatherName}
Enter Mother’s Name: ${req.body.input1.stu_motherName}
Enter Father’s Occupation: ${req.body.input1.stu_fatherOccupation}
Enter Mother’s Occupation: ${req.body.input1.stu_motherOccupation}
Enter other family details like siblings or anything important except Father and Mother Details: ${req.body.input1.stu_familyDetails}
Enter Academic Details: ${req.body.input1.stu_academicDetails}
Mention the interests of the students: ${req.body.input1.stu_interests}
       ${req.body.input2}
       ${req.body.input3 + req.body.input1.stu_wordLimit + "words"} `;
  console.log(input)
  try {
    console.log(req.body);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent([input]);
    const generatedText = result.response.text();
    console.log(generatedText);
    return res.status(200).json({ text: generatedText });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => {
  console.log("App is running on 3000");
});
