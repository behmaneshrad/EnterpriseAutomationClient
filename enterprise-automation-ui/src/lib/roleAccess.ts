export const roleAccessMap: Record<string, string[]> = {
    admin: ["/admin", "/dashboard", "/finance", "/hr", "/employee"],
    "approver": ["/dashboard", "/employee"],
    "hr": ["/hr", "/employee"],
    "finance": ["/finance", "/employee"],
    "employer": ["/employee"],
  };