import dayjs, { Dayjs } from "dayjs";

//!fixed:email regex
export const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i; 

//!fixed:check validation before submit to my backnd
export function clientValidation(values: any, dob: Dayjs | null) {
  const e: Record<string, string> = {};

  if (!values.first_name?.trim()) e.first_name = "First name is required.";
  if (!values.last_name?.trim()) e.last_name = "Last name is required.";
  if (!values.address?.trim()) e.address = "Address is required.";
  if (!dob) e.dob = "Date of birth is required.";

  if (!values.email?.trim()) e.email = "Email is required.";
  else if (!emailRx.test(values.email)) e.email = "Enter a valid email.";

  if (!values.cell?.trim()) e.cell = "Cell number is required.";

  if (!values.company?.trim()) e.company = "Company name is required.";
  if (!values.price?.trim()) e.price = "Please select a price/package.";
  if (!values.comments?.trim()) e.comments = "Comments are required.";

  return e;
}