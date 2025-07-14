import axios from "axios";
export async function callGemini(
  input: string,
  setResponse: (value: string) => void,
  setLoading: (value: boolean) => void
) {
  try {
    setLoading(true);
    const resp = await axios.post(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-pro:generateContent?key=AIzaSyAIKC4xL36vAaLVP8Q2wJ3gjqTAnz9tspc`,
      {
        contents: [
          {
            parts: [{ text: input }],
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = resp.data;
    const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
    setResponse(generatedText);
  } catch (error) {
    console.log("Some Error Occurred - ", error);
  } finally {
    setLoading(false);
  }
}
