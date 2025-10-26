"use client";
import * as React from "react";
import {
  Button,
  Grid2 as Grid,
  Paper,
  TextField,
  MenuItem,
  Box,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { createClient, updateClient } from "../state/clientsSlice";
import FormSelect from "./custom/FormSelect";
import FormInput from "./custom/FormInput";
import { clientValidation, emailRx } from "../validatoin/clientValidation";

const NAV = "#86937F"; // brand green for accents
const TITLE = "#1C1C1C"; // heading color
const LABEL = "#4D5746"; // per spec

const prices = ["Basic", "Standard", "Pro"];
type Props = { defaultValues?: any };

const fieldSx = {
  // label (static, non-floating)
  "& .MuiInputLabel-root": {
    position: "static",
    transform: "none !important",
    marginBottom: 0.75,
    fontFamily: "Poppins, sans-serif",
    fontWeight: 600,
    fontSize: "18px",
    lineHeight: 1,
    letterSpacing: 0,
    color: LABEL,
    opacity: 1,
  },
  "& .MuiInputLabel-shrink": { transform: "none !important" },

  // input underline
  "& .MuiInputBase-root": { px: 0, pb: 1.25 },
  "& .MuiInputBase-input": { fontWeight: 600, color: "#1c1c1c" },
  "& .MuiInput-underline:before": { borderBottomColor: "#e1e1e1" },
  "& .MuiInput-underline:hover:before": { borderBottomColor: "#cfcfcf" },
  "& .MuiInput-underline:after": { borderBottomColor: NAV },
} as const;

//todo:validators need to added later

// const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i; 
// function validateAll(values: any, dob: Dayjs | null) {
//   const e: Record<string, string> = {};

//   if (!values.first_name?.trim()) e.first_name = "First name is required.";
//   if (!values.last_name?.trim()) e.last_name = "Last name is required.";
//   if (!values.address?.trim()) e.address = "Address is required.";
//   if (!dob) e.dob = "Date of birth is required.";

//   if (!values.email?.trim()) e.email = "Email is required.";
//   else if (!emailRx.test(values.email)) e.email = "Enter a valid email.";

//   if (!values.cell?.trim()) e.cell = "Cell number is required.";

//   if (!values.company?.trim()) e.company = "Company name is required.";
//   if (!values.price?.trim()) e.price = "Please select a price/package.";
//   if (!values.comments?.trim()) e.comments = "Comments are required.";

//   return e;
// }

export default function ClientForm({ defaultValues }: Props) {
  const router = useRouter();
  const dispatch = useDispatch<any>();

  const [values, setValues] = React.useState({
    first_name: defaultValues?.first_name || "",
    last_name: defaultValues?.last_name || "",
    dob: defaultValues?.dob || "",
    email: defaultValues?.email || "",
    address: defaultValues?.address || "",
    cell: defaultValues?.cell || "",
    company: defaultValues?.company || "",
    price: defaultValues?.price || "",
    comments: defaultValues?.comments || "",
  });

  const [dob, setDob] = React.useState<Dayjs | null>(
    values.dob ? dayjs(values.dob) : null
  );

  //todo:
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [submitting, setSubmitting] = React.useState(false);

  const setFieldString = (name: keyof typeof values) => (v: string) => {
    setValues((prev) => ({ ...prev, [name]: v }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };


  const setFieldSelect = (name: keyof typeof values) => (v: string) => {
    setValues((prev) => ({ ...prev, [name]: v }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const setField =
    (name: keyof typeof values) =>
    (v: string | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const next =
        typeof v === "string" ? v : (v.target.value as unknown as string);
      setValues((prev) => ({ ...prev, [name]: next }));
      if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
    };

  async function handleSubmit() {
    const e = clientValidation(values, dob);
    if (Object.keys(e).length) {
      setErrors(e);
      // scroll to first error field for better UX
      if (typeof window !== "undefined")
        window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        ...values,
        dob: dob ? dob.format("YYYY-MM-DD") : "",
      };
      if (defaultValues?.id) {
        await dispatch(updateClient({ id: defaultValues.id, data: payload }));
      } else {
        await dispatch(createClient(payload));
      }
      router.push("/clients");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Paper className="card" sx={{ p: { xs: 2.5, md: 3.5 }, borderRadius: 0 }}>
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h5"
          sx={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: 700,
            color: TITLE,
            mb: 1,
          }}
        >
          Add New Client
        </Typography>
        {/* 20% brand bar + 80% light line */}
        <Box
          sx={{
            width: "100%",
            height: 2,
            borderRadius: 1,
            overflow: "hidden",
            background: `linear-gradient(
              to right,
              ${NAV} 0%,
              ${NAV} 5%,
              #E1E1E1 20%,
              #E1E1E1 100%
            )`,
          }}
        />
      </Box>

      <Grid container spacing={5} columns={12}>
        {/* Row 1 */}
        <Grid size={{ xs: 12, md: 4 }}>
          <FormInput
            label="First Name:"
            value={values.first_name}
            onChange={setFieldString("first_name")}
            onBlur={() =>
              setErrors((p) => ({
                ...p,
                first_name: values.first_name.trim()
                  ? ""
                  : "First name is required.",
              }))
            }
            error={!!errors.first_name}
            helperText={errors.first_name}
            placeholder="Type Here"
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <FormInput
            label="Last Name:"
            value={values.last_name}
            onChange={setFieldString("last_name")}
            onBlur={() =>
              setErrors((p) => ({
                ...p,
                last_name: values.last_name.trim()
                  ? ""
                  : "Last name is required.",
              }))
            }
            error={!!errors.last_name}
            helperText={errors.last_name}
            placeholder="Type Here"
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <FormInput
            label="Address:"
            value={values.address}
            onChange={setFieldString("address")}
            onBlur={() =>
              setErrors((p) => ({
                ...p,
                address: values.address.trim() ? "" : "Address is required.",
              }))
            }
            error={!!errors.address}
            helperText={errors.address}
            placeholder="Type your Address"
          />
        </Grid>

        {/* Row 2 */}
        <Grid size={{ xs: 12, md: 4 }}>
          <DatePicker
            format="MM/DD/YYYY"
            label="Date of Birth:"
            value={dob}
            onChange={(d) => {
              setDob(d);
              if (errors.dob) setErrors((prev) => ({ ...prev, dob: "" }));
            }}
            slotProps={{
              textField: {
                variant: "standard",
                fullWidth: true,
                placeholder: "MM/DD/YYYY",
                InputLabelProps: { shrink: true },
                sx: {
                  "& .MuiInputLabel-root": {
                    position: "static",
                    transform: "none !important",
                    mb: 0.75,
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 600,
                    fontSize: "18px",
                    lineHeight: 1,
                    letterSpacing: 0,
                    color: "#4D5746",
                    opacity: 1,
                  },
                  "& .MuiInputLabel-shrink": { transform: "none !important" },
                  "& .MuiInputBase-root": { px: 0, pb: 1.25 },
                  "& .MuiInputBase-input": {
                    fontWeight: 600,
                    color: "#1c1c1c",
                  },
                  "& .MuiInput-underline:before": {
                    borderBottomColor: "#e1e1e1",
                  },
                  "& .MuiInput-underline:hover:before": {
                    borderBottomColor: "#cfcfcf",
                  },
                  "& .MuiInput-underline:after": { borderBottomColor: NAV },
                },
                error: !!errors.dob,
                helperText: errors.dob,
                onBlur: () =>
                  setErrors((p) => ({
                    ...p,
                    dob: dob ? "" : "Date of birth is required.",
                  })),
              },
            }}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <FormInput
            label="Contact Email:"
            type="email"
            value={values.email}
            onChange={setFieldString("email")}
            onBlur={() =>
              setErrors((p) => ({
                ...p,
                email: !values.email.trim()
                  ? "Email is required."
                  : emailRx.test(values.email)
                  ? ""
                  : "Enter a valid email.",
              }))
            }
            error={!!errors.email}
            helperText={errors.email}
            placeholder="Type your Email"
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <FormInput
            label="Contact Cell Number:"
            value={values.cell}
            onChange={setFieldString("cell")}
            onBlur={() =>
              setErrors((p) => ({
                ...p,
                cell: values.cell.trim() ? "" : "Cell number is required.",
              }))
            }
            error={!!errors.cell}
            helperText={errors.cell}
            placeholder="Type your Cell No"
          />
        </Grid>

        {/* Row 3 */}
        <Grid size={{ xs: 12, md: 4 }}>
          <FormInput
            label="Company Name"
            value={values.company}
            onChange={setFieldString("company")}
            onBlur={() =>
              setErrors((p) => ({
                ...p,
                company: values.company.trim()
                  ? ""
                  : "Company name is required.",
              }))
            }
            error={!!errors.company}
            helperText={errors.company}
            placeholder="Type Here"
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <FormSelect
            label="Price"
            value={values.price}
            onChange={setFieldSelect("price")}
            onBlur={() =>
              setErrors((p) => ({
                ...p,
                price: values.price ? "" : "Please select a price/package.",
              }))
            }
            error={!!errors.price}
            helperText={errors.price}
            placeholder="Please select a price"
            options={prices}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <FormInput
            label="Comments"
            value={values.comments}
            onChange={setFieldString("comments")}
            onBlur={() =>
              setErrors((p) => ({
                ...p,
                comments: values.comments.trim()
                  ? ""
                  : "Comments are required.",
              }))
            }
            error={!!errors.comments}
            helperText={errors.comments}
            placeholder="You'll get"
          />
        </Grid>
      </Grid>

      {/* action buttons */}
      <Box
        sx={{
          width: 385,
          height: 60,
          borderRadius: "5px",
          opacity: 1,
          display: "flex",
          alignItems: "stretch",
          justifyContent: "space-between",
          gap: 3,
          mt: 3.5,
          ml: "auto",
          p: 0,
        }}
      >
        <Button
          variant="outlined"
          onClick={() => history.back()}
          disableElevation
          sx={{
            flex: 1,
            minWidth: 0,
            height: "100%",
            borderRadius: "5px",
            textTransform: "none",
            fontFamily: "Poppins, sans-serif",
            fontWeight: 600,
            fontSize: 16,
            color: "#333",
            bgcolor: "#fff",
            border: "1px solid #0b0a0a",
            "&:hover": {
              bgcolor: "#f7f7f7",
              border: "2px solid #000",
            },
            "&:focus-visible": { outline: "none" },
          }}
        >
          BACK
        </Button>

        <Button
          variant="contained"
          onClick={handleSubmit}
          disableElevation
          disabled={submitting}
          sx={{
            flex: 1,
            minWidth: 0,
            height: "100%",
            borderRadius: "5px",
            textTransform: "none",
            fontFamily: "Poppins, sans-serif",
            fontWeight: 700,
            fontSize: 16,
            bgcolor: NAV,
            color: "#fff",
            "&:hover": {
              bgcolor: "#76856e",
              border: "1px solid #000",
            },
            "&:focus-visible": { outline: "none" },
          }}
        >
          {submitting ? "Saving..." : "NEXT"}
        </Button>
      </Box>
    </Paper>
  );
}
