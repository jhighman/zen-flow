
import { Claim as PayloadClaim } from "../payload-types"; // Payload CMS Claim structure
import { claimSchema, Claim as ZodClaim } from "@/lib/form-schema"; // Zod validated Claim type

interface ITransformClaim {
    fromPayloadClaim: (payloadClaim: PayloadClaim) => ZodClaim;
    toPayloadClaim?: (claim: ZodClaim) => PayloadClaim;
}

export class ClaimTransformer implements ITransformClaim {
    fromPayloadClaim(payloadClaim: PayloadClaim): ZodClaim {
      // Initialize the transformedClaim with default values or nulls where applicable
      const transformedClaim: any = {
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
        console.error("Validation error:", error);
        throw error; // Proper error handling or further processing can be implemented here
      }
    }
  
    // Optionally implement the toPayloadClaim method if a reverse transformation is needed
  }