export interface AssistentResponse {
    role:    Role;
    content: string[];
}

export enum Role {
    Assistant = "assistant",
    User = "user",
}
