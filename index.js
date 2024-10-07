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

// const check = (data) => {

//   return (
//     data == "undefined" ? "Not provided" : data
//   )
// }

// app.post("/generate-sop", async (req, res) => {
//   //console.log(req.body);
//   const input = `

//   Reason for applying for the course
// Reason for choosing this University
// Reasons for applying to a USA University
// Career aspirations and how the course fits with this
// career opportunity after completing the course
// Why come back to India after completion of my study.
// University/Institute Country: ${req.body.stu_country || "Not provided"}
// Enter University/Institute Name: ${req.body.stu_universityName || "Not provided"}
// Enter Course Name Here: ${req.body.stu_interested_field || "Not provided"}
// Enter Name of the Student: ${req.body.stu_name || "Not provided"}
// Write Birthdate of the Student in dd.mm.yyyy format: ${req.body.stu_birthDate || "Not provided"}
// Write Address of the Student: ${req.body.stu_address || "Not provided"}
// Enter Father's Name: ${req.body.stu_fatherName || "Not provided"}
// Enter Mother's Name: ${req.body.stu_motherName || "Not provided"}
// Enter Father's Occupation: ${req.body.stu_fatherOccupation|| "Not provided"}
// Enter Mother's Occupation: ${req.body.stu_motherOccupation|| "Not provided"}
// Enter Other Family Details (like siblings or anything important): ${req.body.stu_familyDetails || "Not provided"}
// Enter Academic Details:
//   - University Name: ${req.body.stu_academicDetails_un || "Not provided"}
//   - Degree: ${req.body.stu_academicDetails_degree || "Not provided"}
//   - Year: ${req.body.stu_academicDetails_year || "Not provided"}
//   - GPA: ${req.body.stu_academicDetails_gpa || "Not provided"}
//   - Subjects: ${req.body.stu_academicDetails_subjects || "Not provided"}
//   - Awards: ${req.body.stu_academicDetails_awards || "Not provided"}
//   - Research Experience: ${req.body.stu_academicDetails_research_exp || "Not provided"}
// Enter Job Details: ${req.body.stu_job_details || "Not provided"}
// Enter Internship Details: ${req.body.stu_internship_details || "Not provided"}
// Enter Professional Achievements: ${req.body.stu_professional_achievements || "Not provided"}
// Enter Skills Acquired: ${req.body.stu_skills_acquired || "Not provided"}
// Enter Technical Skills: ${req.body.stu_technical_skills || "Not provided"}
// Enter Certifications: ${req.body.stu_certifications || "Not provided"}
// Enter Languages Spoken: ${req.body.stu_languages_spoken || "Not provided"}
// Why Choose This Program: ${req.body.stu_why_choose_program || "Not provided"}
// Short Term Goals: ${req.body.stu_short_term_goals || "Not provided"}
// Long Term Goals: ${req.body.stu_long_term_goals || "Not provided"}
// Why This University: ${req.body.stu_why_this_uni || "Not provided"}
// Research Interests: ${req.body.stu_research_interests || "Not provided"}
// Program Alignment Goals: ${req.body.stu_prog_align_goals || "Not provided"}
// Growth and Development: ${req.body.stu_growth_development || "Not provided"}
// Extracurricular Involvement: ${req.body.stu_extracurricular_involvement || "Not provided"}
// Leadership Roles: ${req.body.stu_leadership_roles || "Not provided"}
// Community Service: ${req.body.stu_community_service || "Not provided"}
// Hobbies: ${req.body.stu_hobbies || "Not provided"}
// Personal Challenges: ${req.body.stu_personal_challenges || "Not provided"}
// Learning from Mistakes: ${req.body.stu_learning_from_mistakes || "Not provided"}
// Additional Points Highlight: ${req.body.stu_additional_points_highlight || "Not provided"}
// Special Circumstances: ${req.body.stu_special_Circumstances || "Not provided"}
// SOP Tone Preference: ${req.body.stu_sop_tone_preference || "Not provided"}
// Focus Areas: ${req.body.stu_focus_areas || "Not provided"}
// Word Limit: ${req.body.stu_wordLimit || "Not provided"}
// Declaration: ${req.body.stu_declaration ? "Yes" : "No"}
// Consent: ${req.body.stu_consent ? "Yes" : "No"}
//        ${req.body.input2}
//         You are the Statement of Purpose(SOP) writing expert, it must be unique & plagiarism-free, and easy to understand. It must not be copied from anywhere online.
// Please write in simple English language. Generate a Statement of Purpose (SOP) of ${req.body.input1.stu_wordLimit} words; it must be exactly ${req.body.input1.stu_wordLimit} words.
//          Important : if any field is set as 'Not provided' do not include into output. `;
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

let sop = "";

const check = (data, label) => {
  if (data !== undefined && data !== "") {
    console.log("data : ", data, label);
    sop += `${data}: ${label}\n`;
  }
};

const check2 = (data, label) => {
  if (data === true) {
    console.log("data : ", data, label);
    sop += `${data}: ${label}\n`;
  }
};

app.post("/generate-sop", async (req, res) => {
  // Use the check function to build the SOP string
  // check2(req.body.input1.stu_reason_for_applying, "Reason for applying for the course");
  // check2(req.body.input1.stu_reason_for_university, "Reason for choosing this University");
  // check2(req.body.input1.stu_reason_for_usa, "Reasons for applying to a USA University");
  // check2(req.body.input1.stu_career_aspirations, "Career aspirations and how the course fits with this");
  // check2(req.body.input1.stu_career_opportunity, "Career opportunity after completing the course");
  // check2(req.body.input1.stu_return_to_india, "Why come back to India after completion of my study");

  // stu_why_choose_program: false,
  //   stu_short_term_goals: false,
  //   stu_long_term_goals: false,
  //   stu_why_this_uni: false,
  //   stu_research_interests: false,
  //   stu_prog_align_goals: false,
  //   stu_growth_development: false,

  check(req.body.input1.stu_country, "University/Institute Country");
  check(req.body.input1.stu_universityName, "Enter University/Institute Name");
  check(req.body.input1.stu_interested_field, "Enter Course Name Here");
  check(req.body.input1.stu_name, "Enter Name of the Student");
  check(
    req.body.input1.stu_birthDate,
    "Write Birthdate of the Student in dd.mm.yyyy format"
  );
  check(req.body.input1.stu_address, "Write Address of the Student");
  check(req.body.input1.stu_fatherName, "Enter Father's Name");
  check(req.body.input1.stu_motherName, "Enter Mother's Name");
  check(req.body.input1.stu_fatherOccupation, "Enter Father's Occupation");
  check(req.body.input1.stu_motherOccupation, "Enter Mother's Occupation");
  check(
    req.body.input1.stu_familyDetails,
    "Enter Other Family Details (like siblings or anything important)"
  );
  sop += "Enter Academic Details:\n";
  check(req.body.input1.stu_academicDetails_un, "University Name");
  check(req.body.input1.stu_academicDetails_degree, "Degree");
  check(req.body.input1.stu_academicDetails_year, "Year");
  check(req.body.input1.stu_academicDetails_gpa, "GPA");
  check(req.body.input1.stu_academicDetails_subjects, "Subjects");
  check(req.body.input1.stu_academicDetails_awards, "Awards");
  check(
    req.body.input1.stu_academicDetails_research_exp,
    "Research Experience"
  );
  check(req.body.input1.stu_job_details, "Enter Job Details");
  check(req.body.input1.stu_internship_details, "Enter Internship Details");
  check(
    req.body.input1.stu_professional_achievements,
    "Enter Professional Achievements"
  );
  check(req.body.input1.stu_skills_acquired, "Enter Skills Acquired");
  check(req.body.input1.stu_technical_skills, "Enter Technical Skills");
  check(req.body.input1.stu_certifications, "Enter Certifications");
  check(req.body.input1.stu_languages_spoken, "Enter Languages Spoken");

  check2(req.body.input1.stu_why_choose_program, "Why Choose This Program");
  check2(req.body.input1.stu_short_term_goals, "Short Term Goals");
  check2(
    req.body.input1.stu_long_term_goals,
    `Long Term Goals (choose three options and explain and also change data, If any required data is not provided, use relevant information from the internet stictly without including informative brackets or unnecessary lines.) : 
     Obtain a leadership position in a top company in the field.
 Teach at the university level and inspire the next generation of professionals.
 Develop and implement innovative solutions to real-world problems in the field.
 Contribute to the development of policies or practices that have a positive impact on society.
 Establish a successful consulting or entrepreneurial venture in the field.
 Earn a doctoral degree and become a subject matter expert in the field.
 Publish research in high-impact academic journals and present at conferences.
 Use expertise in the field to work for a non-profit or governmental organization.`
  );
  check2(
    req.body.input1.stu_why_this_uni,
    `Why This University (choose three point and explain and also change data, If any required data is not provided, use relevant information from the internet stictly without including informative brackets or unnecessary lines.)  :  
    Expert faculty, alumni, and research facilities
 Excellent Curriculum
 Wide range of optional courses
 Co-Op program
 Well reputed college/university
 Scholarship opportunities
 Support for international students
 Support for placements
 Campus student organizations that align with my interests`
  );
  check2(req.body.input1.stu_research_interests, "Research Interests");
  check2(req.body.input1.stu_prog_align_goals, "Program Alignment Goals");
  check2(req.body.input1.stu_growth_development, "Growth and Development");

  check(
    req.body.input1.stu_extracurricular_involvement,
    "Extracurricular Involvement"
  );
  check(req.body.input1.stu_leadership_roles, "Leadership Roles");
  check(req.body.input1.stu_community_service, "Community Service");
  check(req.body.input1.stu_hobbies, "Hobbies");
  check(req.body.input1.stu_personal_challenges, "Personal Challenges");
  check(req.body.input1.stu_learning_from_mistakes, "Learning from Mistakes");
  check(
    req.body.input1.stu_additional_points_highlight,
    "Additional Points Highlight"
  );
  check(req.body.input1.stu_special_Circumstances, "Special Circumstances");
  check(req.body.input1.stu_sop_tone_preference, "SOP Tone Preference");
  check(req.body.input1.stu_focus_areas, "Focus Areas");
  check(req.body.input1.stu_wordLimit, "Word Limit");

  sop += `Declaration: ${req.body.input1.stu_declaration ? "Yes" : "No"}\n`;
  sop += `Consent: ${req.body.input1.stu_consent ? "Yes" : "No"}\n`;
  sop += `${req.body.input2}\n`;

  sop += `You are the Statement of Purpose(SOP) writing expert, it must be unique & plagiarism-free, and easy to understand. It must not be copied from anywhere online.\n`;
  sop += `Please write in simple English language. Generate a Statement of Purpose (SOP) of ${req.body.input1.stu_wordLimit} words; it must be exactly ${req.body.input1.stu_wordLimit} words.\n`;
  sop += `Important: If any required data is not provided, use relevant information from the internet stictly without including informative brackets or unnecessary lines.`;

  //console.log(sop); // Log the SOP for debugging

  console.log("sop : ", sop);

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent([sop]);
    const generatedText = result.response.text();
    return res.status(200).json({ text: generatedText });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => {
  console.log("App is running on 3000");
});
