import { Checkbox } from "@/components/ui/checkbox";
import { Claim } from "@/lib/form-schema";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableRowActions } from "./data-table-row-actions";
import { DataTableColumnHeader } from "./data-table-column-header";
import { statuses,priorities } from "./data";

// Define your columns based on the fields in the Claim type
export const columns: ColumnDef<Claim>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue("status")
      )

      if (!status) {
        return null
      }

      return (
        <div className="flex w-[100px] items-center">
          {status.icon && (
            <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{status.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "priority",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Priority" />
    ),
    cell: ({ row }) => {
      const priority = priorities.find(
        (priority) => priority.value === row.getValue("priority")
      )

      if (!priority) {
        return null
      }

      return (
        <div className="flex items-center">
          {priority.icon && (
            <priority.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{priority.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },  
  {
    accessorKey: "firstName",
    header: "First Name",
  },
  {
    accessorKey: "middleName",
    header: "Middle Name",
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
  },
  {
    accessorKey: "licenseCategory",
    header: "License Category",
  },
  {
    accessorKey: "licenseType",
    header: "License Type",
  },
  {
    accessorKey: "licenseClass",
    header: "License Class",
  },
  {
    accessorKey: "licenseIdentifier",
    header: "License Identifier",
  },
  {
    accessorKey: "licenseIssuingState",
    header: "License Issuing State",
  },
  {
    accessorKey: "claimExpirationMonth",
    header: "Claim Expiration Month",
  },
  {
    accessorKey: "claimExpirationYear",
    header: "Claim Expiration Year",
  },
  {
    accessorKey: "issuer",
    header: "Issuer",
  },
  {
    accessorKey: "issuingState",
    header: "Issuing State",
  },
  {
    accessorKey: "licenseStatus",
    header: "License Status",
  },
  {
    accessorKey: "expirationMonth",
    header: "Expiration Month",
  },
  {
    accessorKey: "expirationYear",
    header: "Expiration Year",
  },
  {
    accessorKey: "notesAndReferences",
    header: "Notes and References",
  },
  {
    accessorKey: "examinationDecision",
    header: "Examination Decision",
  },
  {
    accessorKey: "examinationDecisionReason",
    header: "Examination Decision Reason",
  },
  {
    accessorKey: "validUntil",
    header: "Valid Until",
  },
  {
    accessorKey: "dueDilligenceLevel",
    header: "Due Diligence Level",
  },
];
