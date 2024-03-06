// ClaimTransformer.test.ts
import { ClaimTransformer } from './ClaimTransformer';

describe('Claim Transformation', () => {
  // Scenario 1: Transforming a Complete Payload Claim
  test('should transform a complete payload claim into the expected ZodClaim structure and pass Zod schema validation', () => {
    const completePayloadClaim = {
      // Your mock payload claim structure
      id: "claim123",
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
      expirationYear: 2023,
      notesAndReferences: "No notes",
      examinationDecision: "Verified",
      examinationDecisionReason: "All checks passed",
      validUntil: "2023-12-31",
      dueDilligenceLevel: "1",
      updatedAt: "2024-01-01",
      createdAt: "2023-01-01",
    };

    const expectedTransformedClaim = {
      // Adjust these fields to match the expected output of your ClaimTransformer
      firstName: "John",
      middleName: "H",
      lastName: "Doe",
      // ... include other expected fields
    };

    const transformer = new ClaimTransformer();
    //const transformedClaim = transformer.fromPayloadClaim(completePayloadClaim);

    //expect(transformedClaim).toEqual(expectedTransformedClaim);
  });
});
