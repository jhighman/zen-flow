// ClaimTransformer.test.ts
import { ClaimTransformer } from './ClaimTransformer';
import { ZodError } from 'zod';

describe('Claim Transformation', () => {
  test('should transform a complete payload claim into the expected ZodClaim structure and pass Zod schema validation', async () => {
    const completePayloadClaim = {
      // Mock input: Complete PayloadClaim as it might come from your database or external source
      id: "claim123",
      status: "complete",
      statusDate: "01/01/2024",
      priority: "high",
      queueName: "global",
      firstname: "John",
      middleName: "H",
      lastName: "Doe",
      licenseCategory: "Medical",
      licenseType: "Broker",
      licenseClass: "Class1",
      licenseIdentifier: "LIC123456",
      licenseIssuingState: "CA",
      claimExpirationMonth: 12,
      claimExpirationYear: 2023,
      issuer: "IssuerName",
      issuingState: "CA",
      licenseStatus: "Active",
      expirationMonth: 12,
      expirationYear: 2025,
      notesAndReferences: "No notes",
      examinationDecision: "Verified",
      examinationDecisionReason: "All checks passed",
      validUntil: "01/01/2029",
      dueDilligenceLevel: 1,
      updatedAt: "2024-01-01T00:00:00.000Z",
      createdAt: "2023-01-01T00:00:00.000Z",
    };

    const transformer = new ClaimTransformer();

    try {
      // Attempt to transform the payload claim using the transformer
      const transformedClaim = transformer.fromPayloadClaim(completePayloadClaim);
    } catch (error) {
      if (error instanceof ZodError) {
        // If a ZodError is caught, log the details of validation issues
        console.error('Validation failed with the following issues:');
        error.issues.forEach(issue => {
          console.error(`Path: ${issue.path.join('.')}, Message: ${issue.message}`);
        });
      } else {
        // Handle any other unexpected errors
        console.error('Unexpected error during transformation:', error);
      }
      
      // Re-throw the error to fail the test explicitly if an error is caught
      throw error;
    }
  });
});
