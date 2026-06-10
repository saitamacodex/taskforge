"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createUser } from "@/actions/user.actions";

function SignUp() {
  const router = useRouter();
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFeedback("");
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setFeedback("");

    try {
      const response = await createUser(values);
      if (response.success) {
        setValues({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
        });
        router.push("/signin");
        return;
      }

      // if response is not successful, set the error message
      setFeedback(
        response.message
          ? response.message
          : "Could not create your account. Please try again.",
      );
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
            className="text-2xl font-black text-[#f4cf45] [text-shadow:3px_3px_0_#050505] border border-gray-500 bg-[#11110f] px-3 py-1 shadow-[6px_6px_0_#050505] touch-manipulation select-none transition-transform duration-150 hover:translate-x-1 hover:translate-y-1 hover:shadow-[3px_3px_0_#050505] focus-visible:outline-2 focus-visible:outline-offset-2  active:translate-x-1.5 active:translate-y-1.5  active:shadow-none"
          >
            TaskForge
          </Link>
        </div>

        <section className="grid items-stretch gap-8 lg:grid-cols-[1fr_0.9fr]">
          <div className="flex flex-col justify-center rounded-md border-4 border-black bg-[#242424] p-6 shadow-[8px_8px_0_#050505] sm:p-8">
            <p className="mb-3 w-fit rounded-md border-2 border-black bg-[#f4cf45] px-3 py-1 text-xs font-black uppercase tracking-normal text-[#11110f] shadow-[3px_3px_0_#050505]">
              Join the forge
            </p>
            <h1 className="max-w-2xl text-4xl font-black leading-none text-[#f8f6ed] [text-shadow:4px_4px_0_#050505] sm:text-5xl">
              Build your workspace before the work gets messy.
            </h1>
            <p className="mt-5 max-w-xl text-base font-semibold leading-7 text-[#b8b8bf] sm:text-lg">
              Create your account, start a board, and keep every project moving
              from one focused place.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {["Projects", "Tasks", "Focus"].map((item) => (
                <div
                  key={item}
                  className="rounded-md border-2 border-black bg-[#11110f] px-4 py-3 shadow-[4px_4px_0_#050505]"
                >
                  <p className="text-sm font-black text-[#f4cf45]">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-md border-4 border-black bg-[#242424] p-6 shadow-[8px_8px_0_#050505] sm:p-8"
          >
            <div className="mb-6">
              <h2 className="text-3xl font-black text-[#f8f6ed]">
                Create account
              </h2>
              <p className="mt-2 text-sm font-bold text-[#b8b8bf]">
                Already have an account?{" "}
                <Link
                  href="/signin"
                  className="text-[#f4cf45] underline decoration-2 underline-offset-4 hover:text-[#ffe16a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f4cf45]"
                >
                  Sign in
                </Link>
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="firstName"
                  className="mb-2 block text-sm font-black text-[#f8f6ed]"
                >
                  First name
                </label>
                <input
                  id="firstName"
                  type="text"
                  name="firstName"
                  autoComplete="given-name"
                  required
                  value={values.firstName}
                  onChange={handleChange}
                  className="w-full rounded-md border-2 border-black bg-[#f8f6ed] px-4 py-3 text-sm font-bold text-[#11110f] outline-none shadow-[3px_3px_0_#050505] placeholder:text-[#5c5c62] focus:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f4cf45]"
                  placeholder="Ada"
                />
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="mb-2 block text-sm font-black text-[#f8f6ed]"
                >
                  Last name
                </label>
                <input
                  id="lastName"
                  type="text"
                  name="lastName"
                  autoComplete="family-name"
                  value={values.lastName}
                  onChange={handleChange}
                  className="w-full rounded-md border-2 border-black bg-[#f8f6ed] px-4 py-3 text-sm font-bold text-[#11110f] outline-none shadow-[3px_3px_0_#050505] placeholder:text-[#5c5c62] focus:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f4cf45]"
                  placeholder="Lovelace"
                />
              </div>
            </div>

            <div className="mt-4">
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
                value={values.email}
                onChange={handleChange}
                className="w-full rounded-md border-2 border-black bg-[#f8f6ed] px-4 py-3 text-sm font-bold text-[#11110f] outline-none shadow-[3px_3px_0_#050505] placeholder:text-[#5c5c62] focus:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f4cf45]"
                placeholder="you@taskforge.dev"
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
                autoComplete="new-password"
                required
                value={values.password}
                onChange={handleChange}
                className="w-full rounded-md border-2 border-black bg-[#f8f6ed] px-4 py-3 text-sm font-bold text-[#11110f] outline-none shadow-[3px_3px_0_#050505] placeholder:text-[#5c5c62] focus:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f4cf45]"
                placeholder="At least 5 characters"
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
              {isSubmitting ? "Creating account..." : "Create account"}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}

export default SignUp;
