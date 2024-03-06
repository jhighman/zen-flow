import { ZodError } from "zod";
import { Claim as PayloadClaim } from "../payload-types"; // Payload CMS Claim structure
import { claimSchema, Claim as ZodClaim } from "../lib/form-schema"; // Zod validated Claim type

interface ITransformClaim {
  fromPayloadClaim: (payloadClaim: PayloadClaim) => ZodClaim;
  toPayloadClaim?: (claim: ZodClaim) => PayloadClaim;
}

export class ClaimTransformer implements ITransformClaim {
  fromPayloadClaim(payloadClaim: PayloadClaim): ZodClaim {
    // Initialize the transformedClaim with default values or nulls where applicable
    const transformedClaim: any = {
      id: payloadClaim.id,
      status: payloadClaim.status ?? "",
      statusDate: payloadClaim.statusDate ?? "",
      priority: payloadClaim.priority ?? "",
      queueName: payloadClaim.queueName ?? "",  
      firstName: payloadClaim.firstname ?? "",
      middleName: payloadClaim.middleName ?? "",
      lastName: payloadClaim.lastName ?? "",
      licenseCategory: payloadClaim.licenseCategory ?? "None selected",
      licenseType: payloadClaim.licenseType ?? "None selected",
      licenseClass: payloadClaim.licenseClass ?? "None selected",
      licenseIdentifier: payloadClaim.licenseIdentifier ?? "",
      licenseIssuingState: payloadClaim.licenseIssuingState ?? "None selected",
      expirationMonth: payloadClaim.expirationMonth ?? 0,
      expirationYear: payloadClaim.expirationYear ?? new Date().getFullYear(),
      issuer: payloadClaim.issuer ?? "",
      issuerState: payloadClaim.issuingState ?? "",
      licenseStatus: payloadClaim.licenseStatus ?? "None selected",
      notesAndReferences: payloadClaim.notesAndReferences ?? "",
      examinationDecision: payloadClaim.examinationDecision ?? "None selected",
      examinationDecisionReason: payloadClaim.examinationDecisionReason ?? "",
      validUntil: payloadClaim.validUntil ?? "",
      dueDilligenceLevel: payloadClaim.dueDilligenceLevel ?? "2",
      // Add additional fields and transformations as necessary
    };

    // Now, validate the transformed claim against the Zod schema
    try {
      const validatedClaim = claimSchema.parse(transformedClaim);
      return validatedClaim;
    } catch (error) {
      if (error instanceof ZodError) {
        console.error("Validation failed for the following fields:");

        error.issues.forEach((issue) => {
          // Construct a more user-friendly message for each issue
          const fieldPath = issue.path.join(".");
          const errorMessage = issue.message;
          console.error(`- Field: ${fieldPath}, Issue: ${errorMessage}`);
        });

        // Optionally, accumulate all issues into a single error message
        const allIssues = error.issues
          .map(
            (issue) =>
              `- Field: ${issue.path.join(".")}, Issue: ${issue.message}`
          )
          .join("\n");

        throw new Error(
          `Data validation failed for transformed claim with issues:\n${allIssues}`
        );
      } else {
        // Handle unexpected errors
        console.error("Unexpected error during claim transformation:", error);
        throw error; // Re-throw the error or handle it appropriately
      }
    }
  }

  toPayloadClaim(claim: ZodClaim): PayloadClaim {
    return {
      // Assuming `id` and `updatedAt`, `createdAt` fields are managed outside this transformation
      id: claim.id,
      firstname: claim.firstName || null,
      middleName: claim.middleName || null,
      lastName: claim.lastName || null,
      licenseCategory:
        claim.licenseCategory !== "None selected"
          ? claim.licenseCategory
          : null,
      licenseType:
        claim.licenseType !== "None selected" ? claim.licenseType : null,
      licenseClass:
        claim.licenseClass !== "None selected" ? claim.licenseClass : null,
      licenseIdentifier: claim.licenseIdentifier || null,
      licenseIssuingState:
        claim.licenseIssuingState !== "None selected"
          ? claim.licenseIssuingState
          : null,
      claimExpirationMonth: claim.expirationMonth || null, // Check if naming aligns; may require adjustment
      claimExpirationYear: claim.expirationYear || null, // Same as above
      issuer: claim.issuer || null,
      issuingState: claim.issuerState || null, // Ensure field names align between Zod and Payload types
      licenseStatus:
        claim.licenseStatus !== "None selected" ? claim.licenseStatus : null,
      expirationMonth: claim.expirationMonth || null,
      expirationYear: claim.expirationYear || null,
      notesAndReferences: claim.notesAndReferences || null,
      examinationDecision:
        claim.examinationDecision !== "None selected"
          ? claim.examinationDecision
          : null,
      examinationDecisionReason: claim.examinationDecisionReason || null,
      validUntil: claim.validUntil || null,
      dueDilligenceLevel: claim.dueDilligenceLevel || null,
      updatedAt: new Date().toISOString(), // Or handle updatedAt logic externally if not applicable
      createdAt: new Date().toISOString(), // Or handle createdAt logic externally if not applicable
      // Ensure to add or transform any additional fields present in the ZodClaim but not listed here
    };
  }
}
