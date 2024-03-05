'use client'
import React, { useEffect, useState } from "react";
import { ClaimTable } from "./claims-table";
import { columns } from "./columns";
import { z } from "zod"
import { Claim } from "@/lib/form-schema";

function getClaims() {
  return fetch("https://65d5ea8df6967ba8e3bcf2ba.mockapi.io/claims")
    .then(res => res.json())
    .catch(error => {
      console.error("Error fetching claims:", error);
      return [];
    });
}

export default function Page() {
  const [claimsData, setClaimsData] = useState([]);

  useEffect(() => {
    getClaims().then(data => {
      setClaimsData(data);
    });
  }, []);

  return (
    <section className="py-24">
      <div className="container">
        <h1 className="text-3x1 font-bold">All Claims</h1>
        <ClaimTable
          columns={columns}
          data={claimsData}
          pageSize={10}
          searchKey={""}
        ></ClaimTable>
      </div>
    </section>
  );
}
