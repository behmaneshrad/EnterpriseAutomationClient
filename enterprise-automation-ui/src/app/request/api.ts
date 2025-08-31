import axios from "axios";

// گرفتن همه درخواست‌ها
export async function getRequests() {
  return axios.get("/api/requests");
}

// گرفتن یک درخواست خاص
export async function getRequestById(id: string) {
  return axios.get(`/api/requests/${id}`);
}

// ایجاد درخواست جدید
export async function createRequest(data: unknown) {
  return axios.post("/api/requests", data);
}