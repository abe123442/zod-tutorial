// CODE

import { expect, it } from "vitest";
import { z } from "zod";

// this is the solution I came up with
const privacyLevelParser = z.string().refine((v): v is 'private' | 'public' => v === 'private' || v === 'public');

// here are some other alternative solutions
// const privacyLevelParser = z.literal('private').or(z.literal('public'));
// const privacyLevelParser = z.union([z.literal('private'), z.literal('public')]);
// const privacyLevelParser = z.enum(['private', 'public']);

const Form = z.object({
  repoName: z.string(),
  privacyLevel: privacyLevelParser,
});

export const validateFormInput = (values: unknown) => {
  const parsedData = Form.parse(values);

  return parsedData;
};

// TESTS

it("Should fail if an invalid privacyLevel passed", async () => {
  expect(() =>
    validateFormInput({
      repoName: "mattpocock",
      privacyLevel: "something-not-allowed",
    }),
  ).toThrowError();
});

it("Should permit valid privacy levels", async () => {
  expect(
    validateFormInput({
      repoName: "mattpocock",
      privacyLevel: "private",
    }).privacyLevel,
  ).toEqual("private");

  expect(
    validateFormInput({
      repoName: "mattpocock",
      privacyLevel: "public",
    }).privacyLevel,
  ).toEqual("public");
});
