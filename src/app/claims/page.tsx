'use client'
import React from "react";
import { ClaimTable } from "./claims-table";
import { columns } from "./columns";
import { trpc } from '@/trpc/client';
import { Claim } from "@/lib/form-schema";

const FALLBACK_LIMIT = 4;

export default function Page() {


  const { data, isLoading, error } = trpc.getAllClaims.useQuery({});
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  console.log("Data before Zod validation:", data);

  // At this point, data is loaded and error-free
  const claimsData = data?.items.map(item => ({
    id: item.id,
    firstName: item.firstName || "N/A", // Provide default value to ensure it's never null/undefined
    middleName: item.middleName || undefined,
    lastName: item.lastName || "N/A", 
    licenseCategory: item.licenseCategory || "None selected", // Default if not provided
    licenseType: item.licenseType || "None selected", // Default if not provided
    licenseClass: item.licenseClass || "None selected", // Default if not provided
    licenseIdentifier: item.licenseIdentifier || undefined, // Assuming always provided
    licenseIssuingState: item.licenseIssuingState || "None selected", // Default if not provided
    claimExpirationMonth: item.claimExpirationMonth || undefined,
    claimExpirationYear: item.claimExpirationYear || undefined,
    issuer: item.issuer || undefined, // Assuming always provided and meets minimum length
    issuingState: item.issuingState || undefined, // Optional
    licenseStatus: item.licenseStatus || "None selected", // Default if not provided
    expirationMonth: item.expirationMonth || undefined, // Assuming validation is handled elsewhere
    expirationYear: item.expirationYear|| undefined, // Assuming validation is handled elsewhere
    notesAndReferences: item.notesAndReferences || undefined, // Optional
    examinationDecision: item.examinationDecision || "None selected", // Default if not provided
    examinationDecisionReason: item.examinationDecisionReason || "", // Handle based on logic
    validUntil: item.validUntil || undefined, // Optional, ensure format is correct
    dueDilligenceLevel: item.dueDilligenceLevel || 2, // Default if not provided
    status: item.status || undefined, // Optional, ensure value is within allowed set
    priority: item.priority || undefined, // Optional, ensure value is within allowed set
    statusDate: item.statusDate ? new Date(item.statusDate) : undefined,
    createdDate: item.createdAt || new Date(), // Assume current date if not provided
    queueName: item.queueName || undefined, // Optional
  })) ?? [];
  
  // note the need to correct createdDate and issuerstate in schema

  return (
    <section className="py-24">
      <div className="container">
        <h1 className="text-3x1 font-bold">All Claims</h1>
        <ClaimTable
          columns={columns}
          data={claimsData}
          pageSize={10}
          searchKey={""}
        />
      </div>
    </section>
  );
}