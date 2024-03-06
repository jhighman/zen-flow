import * as z from "zod";

export const profileSchema = z.object({
  firstname: z
    .string()
    .min(3, { message: "Product Name must be at least 3 characters" }),
  middlename: z
    .string()
    .min(3, { message: "Product Name must be at least 3 characters" }),
  lastname: z
    .string()
    .min(3, { message: "Product Name must be at least 3 characters" }),
  email: z
    .string()
    .email({ message: "Product Name must be at least 3 characters" }),
  contactno: z.coerce.number(),
  country: z.string().min(1, { message: "Please select a category" }),
  city: z.string().min(1, { message: "Please select a category" }),
  // jobs array is for the dynamic fields
  jobs: z.array(
    z.object({
      jobcountry: z.string().min(1, { message: "Please select a category" }),
      jobcity: z.string().min(1, { message: "Please select a category" }),
      jobtitle: z
        .string()
        .min(3, { message: "Product Name must be at least 3 characters" }),
      employer: z
        .string()
        .min(3, { message: "Product Name must be at least 3 characters" }),
      startdate: z
        .string()
        .refine((value) => /^\d{4}-\d{2}-\d{2}$/.test(value), {
          message: "Start date should be in the format YYYY-MM-DD",
        }),
      enddate: z.string().refine((value) => /^\d{4}-\d{2}-\d{2}$/.test(value), {
        message: "End date should be in the format YYYY-MM-DD",
      }),
    })
  ),
});
const dateStringPattern = /^\d{2}\/\d{2}\/\d{4}$/;
const nameRegex = /^[A-Z][a-zA-Z'’]*(-[a-zA-Z'’]+)*$/; // accepts O'Keefe
//const nameRegex = /^[A-Z][a-zA-Z]*(-[a-zA-Z]+)*$/; // rejects O'Keefe
export const claimSchema = z.object({
  id: z.string(),
  firstName: z.string().min(2).max(20).regex(nameRegex, {
    message:
      "First name must begin with a capital letter, contain only letters and dashes, and be between 2 and 20 characters long",
  }),
  middleName: z
    .string()
    .max(20)
    .optional()
    .refine((value) => !value || nameRegex.test(value), {
      message:
        "Middle name must begin with a capital letter, contain only letters and dashes, and be at most 20 characters long",
    }),
  lastName: z.string().min(2).max(20).regex(nameRegex, {
    message:
      "Last name must begin with a capital letter, contain only letters and dashes, and be between 2 and 20 characters long",
  }),
  licenseCategory: z
    .string()
    .optional()
    .refine((value) => value !== "None selected", {
      message: "License category must be selected",
    })
    .default("None selected"),
  licenseType: z
    .string()
    .optional()
    .refine((value) => value !== "None selected", {
      message: "License type must be selected",
    })
    .default("None selected"),
  licenseClass: z
    .string()
    .optional()
    .refine((value) => value !== "None selected", {
      message: "License class must be selected",
    })
    .default("None selected"),
  licenseIdentifier: z.string().min(1),
  licenseIssuingState: z
    .string()
    .optional()
    .refine((value) => value !== "None selected", {
      message: "License issuing state must be selected",
    })
    .default("None selected"),
  expirationMonth: z
    .number()
    .int()
    .min(1)
    .max(12, { message: "Month must be between 1 and 12" }),
  expirationYear: z
    .number()
    .int()
    .min(new Date().getFullYear())
    .max(new Date().getFullYear() + 1, {
      message: "Year must be current year or next year",
    }),
  issuer: z
    .string()
    .min(3, { message: "Issuer must be at least 3 characters" }),
  issuerState: z.string().optional(),
  licenseStatus: z
    .string()
    .optional()
    .refine((value) => value !== "None selected", {
      message: "License status must be selected",
    })
    .default("None selected"),
  notesAndReferences: z.string().optional(),
  examinationDecision: z
    .string()
    .optional()
    .refine((value) => value !== "None selected", {
      message: "Examination decision must be selected",
    })
    .default("None selected"),
  examinationDecisionReason: z
    .string()
    .refine((value) => value.trim().length > 0, {
      message: "Reason is required when Examination Decision is not 'none'",
      path: ["reason"],
    }),
  validUntil: z
    .string()
    .optional()
    .refine(
      (value) => {
        if (!value) return true; // If the value is empty (null or undefined), it's considered valid
        const today = new Date();
        const [month, day, year] = value.split("/").map(Number);
        const inputDate = new Date(year, month - 1, day); // month is zero-based in JavaScript Date constructor

        // Check if inputDate is a valid date and it's in the future
        return !isNaN(inputDate.getTime()) && inputDate > today;
      },
      {
        message:
          "Valid until date must be in the future and in the format 'mm/dd/yyyy'",
      }
    ),
  dueDilligenceLevel: z
    .number()
    .optional()
    .refine((value) => value !== 0, {
      message: "Due diligence level must be selected",
    })
    .default(2),
  status: z
    .string()
    .optional()
    .refine(
      (value) => {
        // Check if value is defined and included in the allowed status values
        return (
          value !== undefined &&
          [
            "pending",
            "notStarted",
            "inProgress",
            "complete",
            "onHold",
          ].includes(value)
        );
      },
      {
        message: "Invalid status value",
      }
    ),
  priority: z
    .string()
    .optional()
    .refine(
      (value) => {
        // Check if value is defined and included in the allowed priority values
        return value !== undefined && ["low", "medium", "high"].includes(value);
      },
      {
        message: "Invalid priority value",
      }
    ),
    statusDate: z.string()
    .regex(dateStringPattern, { message: "Invalid date format. Expected MM/DD/YYYY." })
    .refine(dateString => !isNaN(Date.parse(dateString)), { message: "Invalid date." })
    .transform(dateString => new Date(dateString)).optional(),
    createdDate: z.date().optional(),
    queueName: z.string().optional(),
});

// Define the type for the claim object using `.parse()` from Zod
export type ClaimFormValues = z.infer<typeof claimSchema>;
export type Claim = z.infer<typeof claimSchema>;

export type ProfileFormValues = z.infer<typeof profileSchema>;
