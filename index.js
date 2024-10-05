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

// app.post("/generate-sop", async (req, res) => {
//   //console.log(req.body);
//   const input = `
//   Reason for applying for the course
// Reason for choosing this University 
// Reasons for applying to a USA University
// Career aspirations and how the course fits with this
// career opportunity after completing the course
// Why come back to India after completion of my study.
// Please mention University/Institute Country: ${req.body.input1.stu_universityCountry}
// Enter University/Institute Name: ${req.body.input1.stu_universityName}
// Enter course name here: ${req.body.input1.stu_courseName}
// Enter name of the student: ${req.body.input1.stu_name}
// Write birthdate of the student in dd.mm.yyyy format: ${req.body.input1.stu_birthDate}
// Write address of the student: ${req.body.input1.stu_address}
// Enter Father’s Name: ${req.body.input1.stu_fatherName}
// Enter Mother’s Name: ${req.body.input1.stu_motherName}
// Enter Father’s Occupation: ${req.body.input1.stu_fatherOccupation}
// Enter Mother’s Occupation: ${req.body.input1.stu_motherOccupation}
// Enter other family details like siblings or anything important except Father and Mother Details: ${req.body.input1.stu_familyDetails}
// Enter Academic Details: ${req.body.input1.stu_academicDetails}
// Mention the interests of the students: ${req.body.input1.stu_interests}
//        ${req.body.input2}
//         You are the Statement of Purpose(SOP) writing expert, it must be unique & plagiarism-free, and easy to understand. It must not be copied from anywhere online.
// Please write in simple English language. Generate a Statement of Purpose (SOP) of ${req.body.input1.stu_wordLimit} words; it must be exactly ${req.body.input1.stu_wordLimit} words.
//         `;
//   console.log(input)
//   //${req.body.input3 + req.body.input1.stu_wordLimit + " words "}
//   try {
//     //console.log(req.body);
//     const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
//     const result = await model.generateContent([input]);
//     const generatedText = result.response.text();
//     //console.log(generatedText);
//     return res.status(200).json({ text: generatedText });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ error: err.message });
//   }
// });



// Enter Job Details: ${req.body.stu_job_details != "" ? req.body.stu_job_details.map(job => `Company: ${job.stu_company_name}, Title: ${job.stu_job_title}, Duration: ${job.stu_job_duration}, Description: ${job.stu_role_description}`).join('; ') : "No job details provided"}
// Enter Internship Details: ${req.body.stu_internship_details != "" ? req.body.stu_internship_details.map(internship => `Company: ${internship.stu_in_company_name}, Title: ${internship.stu_in_job_title}, Duration: ${internship.stu_in_job_duration}, Description: ${internship.stu_in_role_description}`).join('; ') : "No internship details provided"}


app.post("/generate-sop", async (req, res) => {
  //console.log(req.body);
  const input = `
  Reason for applying for the course
Reason for choosing this University 
Reasons for applying to a USA University
Career aspirations and how the course fits with this
career opportunity after completing the course
Why come back to India after completion of my study.
University/Institute Country: ${req.body.stu_country}
Enter University/Institute Name: ${req.body.stu_universityName}
Enter Course Name Here: ${req.body.stu_interested_field}
Enter Name of the Student: ${req.body.stu_name}
Write Birthdate of the Student in dd.mm.yyyy format: ${req.body.stu_birthDate || "Not provided"}
Write Address of the Student: ${req.body.stu_address || "Not provided"}
Enter Father's Name: ${req.body.stu_fatherName}
Enter Mother's Name: ${req.body.stu_motherName}
Enter Father's Occupation: ${req.body.stu_fatherOccupation}
Enter Mother's Occupation: ${req.body.stu_motherOccupation}
Enter Other Family Details (like siblings or anything important): ${req.body.stu_familyDetails}
Enter Academic Details: 
  - University Name: ${req.body.stu_academicDetails_un}
  - Degree: ${req.body.stu_academicDetails_degree}
  - Year: ${req.body.stu_academicDetails_year}
  - GPA: ${req.body.stu_academicDetails_gpa}
  - Subjects: ${req.body.stu_academicDetails_subjects}
  - Awards: ${req.body.stu_academicDetails_awards}
  - Research Experience: ${req.body.stu_academicDetails_research_exp}
Enter Job Details: ${req.body.stu_job_details}
Enter Internship Details: ${req.body.stu_internship_details}
Enter Professional Achievements: ${req.body.stu_professional_achievements}
Enter Skills Acquired: ${req.body.stu_skills_acquired}
Enter Technical Skills: ${req.body.stu_technical_skills}
Enter Certifications: ${req.body.stu_certifications}
Enter Languages Spoken: ${req.body.stu_languages_spoken}
Why Choose This Program: ${req.body.stu_why_choose_program}
Short Term Goals: ${req.body.stu_short_term_goals}
Long Term Goals: ${req.body.stu_long_term_goals}
Why This University: ${req.body.stu_why_this_uni}
Research Interests: ${req.body.stu_research_interests}
Program Alignment Goals: ${req.body.stu_prog_align_goals}
Growth and Development: ${req.body.stu_growth_development}
Extracurricular Involvement: ${req.body.stu_extracurricular_involvement}
Leadership Roles: ${req.body.stu_leadership_roles}
Community Service: ${req.body.stu_community_service}
Hobbies: ${req.body.stu_hobbies}
Personal Challenges: ${req.body.stu_personal_challenges}
Learning from Mistakes: ${req.body.stu_learning_from_mistakes}
Additional Points Highlight: ${req.body.stu_additional_points_highlight}
Special Circumstances: ${req.body.stu_special_Circumstances}
SOP Tone Preference: ${req.body.stu_sop_tone_preference}
Focus Areas: ${req.body.stu_focus_areas}
Word Limit: ${req.body.stu_wordLimit}
Declaration: ${req.body.stu_declaration ? "Yes" : "No"}
Consent: ${req.body.stu_consent ? "Yes" : "No"}
       ${req.body.input2}
        You are the Statement of Purpose(SOP) writing expert, it must be unique & plagiarism-free, and easy to understand. It must not be copied from anywhere online.
Please write in simple English language. Generate a Statement of Purpose (SOP) of ${req.body.input1.stu_wordLimit} words; it must be exactly ${req.body.input1.stu_wordLimit} words.
        `;
  console.log(input)
  //${req.body.input3 + req.body.input1.stu_wordLimit + " words "}
  try {
    //console.log(req.body);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent([input]);
    const generatedText = result.response.text();
    //console.log(generatedText);
    return res.status(200).json({ text: generatedText });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => {
  console.log("App is running on 3000");
});
