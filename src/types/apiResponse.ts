import { Messages } from "@/model/User";

export interface apiResponse {
    success: boolean;
    message: string;
    isAccepting?: boolean;
    messages?: Array<Messages>
}