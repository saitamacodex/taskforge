"use client";

import { loginUser } from "@/actions/user.actions";
import Link from "next/link";
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
        "message" in response && response.message
          ? response.message
          : "Could not login. Please try again.",
      );
    } catch (error) {
      console.log(`LOGIN ERROR: ${error}`);
      setFeedback("Could not login. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-8">
      <div className="w-full max-w-5xl">
        <div className="mb-8 flex items-center justify-between">
          <Link
            href="/"
            className="touch-manipulation select-none border border-gray-500 bg-[#11110f] px-3 py-1 text-2xl font-black text-[#f4cf45] shadow-[6px_6px_0_#050505] transition-transform duration-150 [text-shadow:3px_3px_0_#050505] hover:translate-x-1 hover:translate-y-1 hover:shadow-[3px_3px_0_#050505] focus-visible:outline-2 focus-visible:outline-offset-2 active:translate-x-1.5 active:translate-y-1.5 active:shadow-none"
          >
            TaskForge
          </Link>
          <Link
            href="/signup"
            className="touch-manipulation select-none rounded-md border-2 border-black bg-[#252525] px-4 py-2 text-sm font-black text-[#f8f6ed] shadow-[4px_4px_0_#050505] transition-transform duration-150 hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_#050505] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f4cf45] active:translate-x-1 active:translate-y-1 active:bg-[#333333] active:shadow-none"
          >
            Sign up
          </Link>
        </div>

        <section className="grid items-stretch gap-8 lg:grid-cols-[0.9fr_1fr]">
          <form
            onSubmit={handleSubmit}
            className="rounded-md border-4 border-black bg-[#242424] p-6 shadow-[8px_8px_0_#050505] sm:p-8"
          >
            <div className="mb-6">
              <h1 className="text-3xl font-black text-[#f8f6ed]">Sign in</h1>
              <p className="mt-2 text-sm font-bold text-[#b8b8bf]">
                New to TaskForge?{" "}
                <Link
                  href="/signup"
                  className="text-[#f4cf45] underline decoration-2 underline-offset-4 hover:text-[#ffe16a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f4cf45]"
                >
                  Create an account
                </Link>
              </p>
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-black text-[#f8f6ed]"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleFormChange}
                placeholder="you@taskforge.dev"
                className="w-full rounded-md border-2 border-black bg-[#f8f6ed] px-4 py-3 text-sm font-bold text-[#11110f] outline-none shadow-[3px_3px_0_#050505] placeholder:text-[#5c5c62] focus:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f4cf45]"
              />
            </div>

            <div className="mt-4">
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-black text-[#f8f6ed]"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                autoComplete="current-password"
                required
                value={formData.password}
                onChange={handleFormChange}
                placeholder="Enter your password"
                className="w-full rounded-md border-2 border-black bg-[#f8f6ed] px-4 py-3 text-sm font-bold text-[#11110f] outline-none shadow-[3px_3px_0_#050505] placeholder:text-[#5c5c62] focus:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f4cf45]"
              />
            </div>

            {feedback && (
              <p
                role="alert"
                className="mt-4 rounded-md border-2 border-black bg-[#b0363a] px-4 py-3 text-sm font-black text-[#f8f6ed] shadow-[4px_4px_0_#050505]"
              >
                {feedback}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-6 w-full touch-manipulation select-none rounded-md border-4 border-black bg-[#f4cf45] px-5 py-3.5 text-sm font-black text-[#11110f] shadow-[6px_6px_0_#050505] transition-transform duration-150 hover:translate-x-1 hover:translate-y-1 hover:shadow-[3px_3px_0_#050505] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f4cf45] active:translate-x-1.5 active:translate-y-1.5 active:bg-[#ffe16a] active:shadow-none disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:shadow-[6px_6px_0_#050505]"
            >
              {isSubmitting ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <div className="flex flex-col justify-center rounded-md border-4 border-black bg-[#242424] p-6 shadow-[8px_8px_0_#050505] sm:p-8">
            <p className="mb-3 w-fit rounded-md border-2 border-black bg-[#f4cf45] px-3 py-1 text-xs font-black uppercase tracking-normal text-[#11110f] shadow-[3px_3px_0_#050505]">
              Back to work
            </p>
            <h2 className="max-w-2xl text-4xl font-black leading-none text-[#f8f6ed] [text-shadow:4px_4px_0_#050505] sm:text-5xl">
              Pick up your boards right where you left them.
            </h2>
            <p className="mt-5 max-w-xl text-base font-semibold leading-7 text-[#b8b8bf] sm:text-lg">
              Jump into your workspace, review projects, and keep tasks moving
              without losing your flow.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {["Boards", "Progress", "Momentum"].map((item) => (
                <div
                  key={item}
                  className="rounded-md border-2 border-black bg-[#11110f] px-4 py-3 shadow-[4px_4px_0_#050505]"
                >
                  <p className="text-sm font-black text-[#f4cf45]">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default SignIn;
