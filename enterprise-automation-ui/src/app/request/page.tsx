import RequestTable, { Request } from "@/components/RequestTable";

const requests: Request[] = [
  { id: 1, type: "خرید تجهیزات", statusIcon: "pending", description: "در حال بررسی" },
  { id: 2, type: "خرید تجهیزات", statusIcon: "approved", description: "در حال بررسی" },
  { id: 3, type: "خرید تجهیزات", statusIcon: "rejected", description: "در حال بررسی" },
  { id: 4, type: "خرید تجهیزات", statusIcon: "approved", description: "در حال بررسی" },
];

export default function Page() {
  return <RequestTable data={requests} />;
}