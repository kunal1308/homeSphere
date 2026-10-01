export type Role = "owner" | "tenant";

// Each role's landing page
export const ROLE_HOME: Record<Role, string> = {
    owner: "/my-listings",
    tenant: "/properties",
};

export const isRole = (
    value: unknown
): value is Role =>
    value === "owner" || value === "tenant";
