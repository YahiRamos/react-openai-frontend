import { AssistentResponse } from "../../../interfaces";

export const postQuestionUseCase = async (
  threadId: string,
  question: string
) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_BASE_URL}/assistent/user-question`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          threadId,
          question,
        }),
      }
    );
    console.log("Response from server:", response);
    const replies = (await response.json()) as AssistentResponse[];
    return replies;
  } catch (error) {
    console.error("Error posting question:", error);
    throw new Error("Failed to post question");
  }
};
