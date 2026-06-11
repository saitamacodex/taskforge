"use client";

import { loginUser } from "@/actions/user.actions";
import { useRouter } from "next/navigation";
import { useState } from "react";

function SignIn() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleFormChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFeedback("");
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFeedback("");
    setIsSubmitting(true);

    try {
      // call server actions login method
      const response = await loginUser(formData);
      if (response?.success) {
        setFormData({
          email: "",
          password: "",
        });
        router.push("/dashboard");
        return;
      }

      // if response is failed
      setFeedback(
        response.message
          ? response.message
          : "Could not login. Please try again.",
      );
    } catch (error) {
      console.log(`LOGIN ERROR: ${error}`);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              onChange={handleFormChange}
              placeholder="Enter your email address"
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              onChange={handleFormChange}
              placeholder="Enter your password"
            />
          </div>
          {feedback && <p>{feedback}</p>}
          <button>{isSubmitting ? "Logging in...." : "Sign In"}</button>
        </form>
      </div>
    </>
  );
}

export default SignIn;
