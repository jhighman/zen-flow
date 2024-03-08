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
  firstName: z
  .string()
  .optional(),
  middleName: z
  .string()
  .optional(),
  lastName: z
  .string()
  .optional(),
  licenseCategory: z
    .string()
    .optional(),
  licenseType: z
    .string()
    .optional(),
  licenseClass: z
    .string()
    .optional(),
  licenseIdentifier: z.string().optional(),
  licenseIssuingState: z
    .string()
    .optional(),
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
    .optional(),
  expirationMonth: z
    .number()
    .int()
    .min(1)
    .max(12, { message: "Month must be between 1 and 12" })
    .optional(),
  expirationYear: z
    .number()
    .int()
    .min(1950)
    .max(2050, { message: "Month must be between 1 and 12" })
    .optional(),
  notesAndReferences: z.string().optional(),
  examinationDecision: z
    .string()
    .optional(),
  examinationDecisionReason: z
    .string()
    .optional(),
  dueDilligenceLevel: z
    .number()
    .optional(),
  status: z
    .string()
    .optional(),
  priority: z
    .string()
    .optional(),
  statusDate: validUntilSchema.optional(),
  //validUntil: validUntilSchema.optional(),
  createdAt: z.date().optional(),
  queueName: z.string().optional(),
});

// Define the type for the claim object using `.parse()` from Zod
export type ClaimFormValues = z.infer<typeof claimSchema>;
export type Claim = z.infer<typeof claimSchema>;

export type ProfileFormValues = z.infer<typeof profileSchema>;
