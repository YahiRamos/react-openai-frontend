import { AssistentResponse } from "../../../interfaces";

export const createThreadUseCase = async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_BASE_URL}/assistent/create-thread`,
      {
        method: "POST",
      }
    );
    const { id } = (await response.json()) as { id: string };
    return id;
  } catch (error) {
    console.error("Error creating thread:", error);
    throw new Error("Failed to create thread");
  }
};

export const getMessagesUseCase = async (threadId: string) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_BASE_URL}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          threadId,
        }),
      },
    );
    const messages = (await response.json()) as AssistentResponse[];
    return messages;
  } catch (error) {
    console.error("Error getting messages:", error);
    throw new Error("Failed to get messages");
  }
}
