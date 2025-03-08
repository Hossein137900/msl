"use client";
import React from "react";

interface RowData {
  property: string;
  value: string;
}

interface DynamicTableProps {
  rows: RowData[];
}

const DynamicTable: React.FC<DynamicTableProps> = ({ rows }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full  border-collapse border border-[#a37462]">
        <thead>
          <tr className="bg-[#e5d8d0]">
            <th className="px-4 py-2 border border-[#a37462] text-[#a37462]">
              مشخصه
            </th>
            <th className="px-4 py-2 border border-[#a37462] text-[#a37462]">
              مقدار
            </th>
          </tr>
        </thead>
        <tbody className="text-black">
          {rows.map((row, index) => (
            <tr
              key={index}
              className={index % 2 === 0 ? "bg-white" : "bg-[#e5d8d0]"}
            >
              <td className="px-4 py-2 border border-[#a37462]">
                {row.property}
              </td>
              <td className="px-4 py-2 border border-[#a37462]">{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DynamicTable;
