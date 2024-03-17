import { z } from "zod"
const usernameSchema = z.string({
    required_error: "Username is required",
}).refine(value => value.length >= 3 && value.length <= 20, {
    message: "Username should be between 3 and 20 letters"
});

const passwordSchema = z.string().min(2, { message: "Password is too short" });

export const userSchema = z.object({
    username: usernameSchema,
    password: passwordSchema
});