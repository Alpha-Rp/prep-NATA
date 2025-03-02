import { GoogleGenerativeAI } from "@google/generative-ai";

// Validate API key
const API_KEY = "AIzaSyCnxP3XlnXwZ1Xmv_YxGgMfBOQ-m_KXroQ";
if (!API_KEY) {
  console.error("Gemini API key is missing!");
}

let genAI: GoogleGenerativeAI;
try {
  genAI = new GoogleGenerativeAI(API_KEY);
} catch (error) {
  console.error("Failed to initialize Gemini AI:", error);
}

// The context we want to give to the model
const SYSTEM_CONTEXT = `You are Pragna, a focused NATA exam preparation assistant. Your responses should be:
- Primarily about NATA exam preparation and the website's features
- Include balanced information about architecture colleges in Bangalore
- Concise and direct
- Professional but friendly

Key Information:
NATA (National Aptitude Test in Architecture) is an examination for admission to B.Arch programs in India. It tests:
- Drawing & observation skills
- Sense of proportion & perspective
- Architectural awareness
- Design & analytical capabilities

You should:
- Answer questions about NATA exam and the website's features
- Provide balanced information about architecture colleges in Bangalore
- Keep responses brief and to the point
- Focus on exam preparation and college options
- Use the website's features to guide students

You should NOT:
- Provide information about non-architecture topics
- Show bias towards any particular institution
- Give personal opinions unrelated to NATA or architecture colleges
- Engage in general conversation
- Provide information about other non-architecture exams or courses`;

async function listAvailableModels() {
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models?key=${API_KEY}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Available models:", data);
    return data.models || [];
  } catch (error) {
    console.error("Error listing models:", error);
    return [];
  }
}

let availableModels: any[] = [];

// Initialize models
(async () => {
  availableModels = await listAvailableModels();
  console.log("Initialized available models:", availableModels);
})();

export async function generateGeminiResponse(userMessage: string) {
  try {
    console.log("Initializing Gemini request for message:", userMessage);
    const cleanedMessage = userMessage.trim().toLowerCase();
    console.log("Cleaned message:", cleanedMessage);

    // Handle common queries with predefined responses
    if (cleanedMessage.match(/^what\s+is\s+(this|nata|nata\s+exam)?\??$/i)) {
      return "NATA (National Aptitude Test in Architecture) is the entrance examination for admission to B.Arch programs across India. It evaluates candidates' drawing skills, observation skills, sense of proportion, architectural awareness, and design capabilities. Our platform helps you prepare for all aspects of this exam.";
    }

    if (
      cleanedMessage.includes("how to apply") ||
      cleanedMessage.includes("application")
    ) {
      return "To apply for NATA exam: 1) Visit the official NATA website (www.nata.in), 2) Register and create your account, 3) Fill the application form, 4) Upload required documents, 5) Pay the application fee, 6) Download your admit card when available. The application process typically opens 2-3 months before the exam date.";
    }

    if (
      cleanedMessage.includes("tips") &&
      cleanedMessage.includes("aptitude")
    ) {
      return "Here are key tips for the NATA aptitude section: 1) Practice mathematical reasoning and numerical problems regularly, 2) Study architectural awareness and general knowledge, 3) Work on visual perception and spatial ability exercises, 4) Review basic mathematics concepts like geometry and mensuration, 5) Take timed practice tests to improve speed and accuracy.";
    }

    if (
      cleanedMessage.includes("age") ||
      cleanedMessage.includes("eligibility")
    ) {
      return "To be eligible for NATA, you must have completed or be appearing in 10+2 (Class XII) with Mathematics as a subject. There is no specific age limit, but most candidates apply in their final year of school or after completing Class XII.";
    }

    // Update the college query matching to be more specific and accurate
    if (
      (cleanedMessage.includes("college") ||
        cleanedMessage.includes("university") ||
        cleanedMessage.includes("architecture") ||
        cleanedMessage.includes("b.arch")) &&
      (cleanedMessage.includes("bangalore") ||
        cleanedMessage.includes("bengaluru") ||
        cleanedMessage.includes("karnataka") ||
        cleanedMessage.includes("india"))
    ) {
      // Filter response based on location
      if (cleanedMessage.includes("india")) {
        return `Here are some of the top architecture colleges in India:

1. School of Planning and Architecture (SPA), New Delhi
   - Premier institution for architectural education
   - Government-backed excellence
   - Renowned faculty and research facilities
   - Strong international collaborations

2. REVA University School of Architecture, Bangalore
   - State-of-the-art infrastructure with modern design studios
   - Industry-aligned curriculum with focus on practical training
   - Strong emphasis on sustainable architecture
   - Excellent placement record with leading firms
   - Regular workshops and seminars by industry experts

3. IIT Roorkee - Department of Architecture
   - Part of prestigious IIT system
   - Cutting-edge research facilities
   - Excellent placement record
   - Strong focus on technology integration

4. CEPT University, Ahmedabad
   - Pioneer in architectural education
   - Unique teaching methodology
   - Strong industry connections
   - Focus on sustainable design

5. Sir JJ College of Architecture, Mumbai
   - Historic institution with rich legacy
   - Strong alumni network
   - Practical-oriented curriculum
   - Industry-recognized programs`;
      }

      return `Here are some of the top architecture colleges in Bangalore:

1. REVA University School of Architecture
   - State-of-the-art infrastructure with modern design studios
   - Industry-aligned curriculum with focus on practical training
   - Regular workshops and seminars by industry experts
   - Strong emphasis on sustainable architecture
   - Excellent placement record with leading firms
   - Innovative teaching methods using latest technology

2. BMS College of Architecture
   - Long-standing reputation in architectural education
   - Strong industry connections
   - Experienced faculty members
   - Comprehensive curriculum

3. RV College of Architecture
   - Known for design innovation
   - Good placement opportunities
   - Focus on sustainable design
   - Active alumni network

4. MSRIT School of Architecture
   - Well-established program
   - Strong design foundation
   - Industry collaborations
   - Research opportunities

5. Nitte School of Architecture
   - Contemporary teaching approach
   - Modern facilities
   - Regular industry interactions
   - Practical exposure

Would you like specific information about admission requirements or curriculum details for any of these institutions?`;
    }

    if (cleanedMessage.includes("syllabus")) {
      return "The NATA syllabus covers: 1) Part A - Drawing & Visual Skills: sketching, geometric shapes, perspective drawing, 3D comprehension. 2) Part B - Scientific Ability & General Aptitude: mathematics, general knowledge, logical reasoning, architectural awareness. The exam tests both artistic abilities and technical knowledge needed for architecture.";
    }

    if (
      cleanedMessage.includes("attempt") ||
      cleanedMessage.includes("how many times")
    ) {
      return "You can appear for NATA up to 3 times in a year. The exam is typically conducted in multiple sessions, and candidates can choose to appear in any or all of these sessions. Your best score from all attempts will be considered for admission.";
    }

    // Use the recommended model directly
    console.log("Using model: gemini-1.5-flash");
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    try {
      const result = await model.generateContent({
        contents: [
          {
            parts: [
              {
                text: `${SYSTEM_CONTEXT}\n\nUser: ${userMessage}\n\nAssistant:`,
              },
            ],
          },
        ],
      });

      const response = await result.response;
      const text = response.text();

      if (!text) {
        throw new Error("Empty response from API");
      }

      return text;
    } catch (error) {
      console.error("API Error:", error);
      // If the recommended model fails, try gemini-pro as fallback
      if (
        error.message?.includes("not found") ||
        error.message?.includes("deprecated")
      ) {
        console.log("Attempting fallback to gemini-pro model");
        const fallbackModel = genAI.getGenerativeModel({ model: "gemini-pro" });
        const fallbackResult = await fallbackModel.generateContent({
          contents: [
            {
              parts: [
                {
                  text: `${SYSTEM_CONTEXT}\n\nUser: ${userMessage}\n\nAssistant:`,
                },
              ],
            },
          ],
        });
        const fallbackResponse = await fallbackResult.response;
        return fallbackResponse.text();
      }
      throw error;
    }
  } catch (error) {
    console.error("Detailed error in Gemini response:", {
      error,
      message: error.message,
      stack: error.stack,
    });
    return "I apologize, but I'm having trouble processing your request. Please try asking about NATA exam preparation or our website's features.";
  }
}
