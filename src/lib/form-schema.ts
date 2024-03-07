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

const dateStringPattern = /^\d{4}-\d{2}-\d{2}$/;
const dateStringSchema = z
  .string()
  .regex(dateStringPattern, {
    message: "Valid until date must be in the format 'YYYY-MM-DD'",
  })
  .refine(
    (value) => {
      const date = new Date(value);
      return !isNaN(date.getTime());
    },
    {
      message: "Invalid date.",
    }
  )
  .transform((value) => new Date(value));
// Schema to directly accept a Date object
const dateObjectSchema = z.date();
// Combined schema using union
const validUntilSchema = z.union([dateStringSchema, dateObjectSchema]);
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
  licenseIdentifier: z.string().optional(),
  licenseIssuingState: z
    .string()
    .optional()
    .refine((value) => value !== "None selected", {
      message: "License issuing state must be selected",
    })
    .default("None selected"),
  claimExpirationMonth: z
    .number()
    .int()
    .min(1)
    .max(12, { message: "Month must be between 1 and 12" })
    .optional(),
  claimExpirationYear: z
    .number()
    .int()
    .min(new Date().getFullYear())
    .max(new Date().getFullYear() + 10, {
      message: "Year must be current year or next year",
    })
    .optional(),
  issuer: z.string().optional(),
  issuingState: z.string().optional(),
  licenseStatus: z
    .string()
    .optional()
    .refine((value) => value !== "None selected", {
      message: "License status must be selected",
    })
    .default("None selected"),
  expirationMonth: z
    .number()
    .int()
    .min(1)
    .max(12, { message: "Month must be between 1 and 12" })
    .optional(),
  expirationYear: z
    .number()
    .int()
    .min(new Date().getFullYear())
    .max(new Date().getFullYear() + 10, {
      message: "Year must be current year or next year",
    })
    .optional(),
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
  statusDate: validUntilSchema.optional(),
  //validUntil: validUntilSchema.optional(),
  createdAt: z.date().optional(),
  queueName: z.string().optional(),
});

// Define the type for the claim object using `.parse()` from Zod
export type ClaimFormValues = z.infer<typeof claimSchema>;
export type Claim = z.infer<typeof claimSchema>;

export type ProfileFormValues = z.infer<typeof profileSchema>;
