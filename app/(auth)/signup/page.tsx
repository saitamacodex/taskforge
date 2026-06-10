"use client";

import { useState } from "react";
import { createUser } from "@/actions/user.actions";

function SignUp() {
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const response = await createUser(values);
    if (response.success) {
      setValues({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      });
    }
  }

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="firstName">Firstname:</label>
            <input
              type="text"
              name="firstName"
              value={values.firstName}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="lastName">Lastname:</label>
            <input
              type="text"
              name="lastName"
              value={values.lastName}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="email">Email: </label>
            <input
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
            />
          </div>

          <button type="submit">Sign In</button>
        </form>
      </div>
    </>
  );
}

export default SignUp;
