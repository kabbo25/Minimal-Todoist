import React from "react";
import signupImage from "../assets/images/Person1.png";
import { AuthForm } from "../components/AuthForm";

export const Signup = () => {
    return (
        <AuthForm
            formType="signup"
            buttonText="Sign Up"
            successMessage="User created successfully"
            image={signupImage}
            text={
                "Supercharge Your Day with todo! Your tasks, your way – Effortless,Efficient, Exceptional. Let's Get Things Done!"
            }
            headingText={"Create an account"}
        />
    );
};
