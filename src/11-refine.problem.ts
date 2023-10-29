// CODE

import { expect, it } from "vitest";
import { z } from "zod";

// this is my solution - to use tranform
const Form = z.object({
  password: z.string(),
  confirmPassword: z.string(),
}).transform(({ password, confirmPassword }) => {
  if (password !== confirmPassword) throw "Passwords don't match";
  return { password, confirmPassword }
});

// Proposed solution
// const Form = z.object({
//   password: z.string(),
//   confirmPassword: z.string()
// }).refine(
//   ({ password, confirmPassword }) => password === confirmPassword,
//   {
//     message: 'Passwords don\'t match',
//     path: ['confirmPassword']
//   }
// );

export const validateFormInput = (values: unknown) => {
  const parsedData = Form.parse(values);

  return parsedData;
};

// TESTS

it("Should error if the passwords are not the same", () => {
  expect(() => {
    const result = validateFormInput({
      password: "password",
      confirmPassword: "password1",
    });
    console.log(result);

    return result;
  }).toThrowError("Passwords don't match");
});
