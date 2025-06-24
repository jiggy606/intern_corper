"use client"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { User } from "@/types/User"
import { DeleteDialogBox } from "../reuseable/dialogbox/DeleteDialogBox"

interface InternTableProps {
  data: User[];
  onDelete: (id: number) => void;
}

export default function InternTable({ data, onDelete }: InternTableProps) {
  const [globalFilter, setGlobalFilter] = useState("")

  const columns: ColumnDef<User>[] = [
    {
      header: "No.",
      accessorKey: "serialNumber",
      cell: ({ row }) => row.index + 1 + table.getState().pagination.pageIndex * table.getState().pagination.pageSize,
    },
    /* {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => <div className="w-[50px]">{row.getValue("id")}</div>,
    }, */
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "workDays",
      header: "Work Days",
    },
    {
      accessorKey: "startDate",
      header: "Start Date",
    },
    {
      accessorKey: "endDate",
      header: "End Date",
    },
    {
      header: "Actions",
      id: "actions",
      cell: ({ row }) => (
        <DeleteDialogBox
          trigger={
            <span className="text-red-500 hover:underline cursor-pointer">
              Delete
            </span>
          }
          onConfirm={() => {
            onDelete(row.original.id)
          }}
        />
      ),
    },
  ]

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  return (
    <div className="space-y-5 py-4">
      <Input
        placeholder="Search..."
        value={globalFilter}
        onChange={(e) => setGlobalFilter(e.target.value)}
        className="w-full sm:w-1/2"
      />

      <div className="rounded-md border overflow-x-auto">
        <Table className="min-w-[800px]">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="cursor-pointer whitespace-nowrap"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    {{
                      asc: " 🔼",
                      desc: " 🔽",
                    }[header.column.getIsSorted() as string] ?? null}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="whitespace-nowrap">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
        <div className="text-sm text-muted-foreground">
          Showing {table.getState().pagination.pageIndex * 10 + 1} -{" "}
          {Math.min(
            (table.getState().pagination.pageIndex + 1) * 10,
            data.length
          )}{" "}
          of {data.length}
        </div>

        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}