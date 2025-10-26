"use client";
import * as React from "react";
import { TextField, SxProps, Theme } from "@mui/material";

type FormInputProps = {
  label: string;
  value: string;
  onChange: (v: string) => void;
  onBlur?: () => void;
  error?: boolean;
  helperText?: string;
  placeholder?: string;
  type?: React.HTMLInputTypeAttribute;
  sx?: SxProps<Theme>;
};

/** Shared style (matches your spec) */
const baseFieldSx: SxProps<Theme> = {
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
  "& .MuiInputBase-input": { fontWeight: 600, color: "#1c1c1c" },
  "& .MuiInput-underline:before": { borderBottomColor: "#e1e1e1" },
  "& .MuiInput-underline:hover:before": { borderBottomColor: "#cfcfcf" },
  "& .MuiInput-underline:after": { borderBottomColor: "#86937F" }, // NAV
};

export default function FormInput({
  label,
  value,
  onChange,
  onBlur,
  error,
  helperText,
  placeholder,
  type,
  sx,
}: FormInputProps) {
  return (
    <TextField
      fullWidth
      variant="standard"
      type={type}
      label={label}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onBlur={onBlur}
      error={!!error}
      helperText={helperText}
      placeholder={placeholder}
      InputLabelProps={{ shrink: true }}
         sx={{ ...baseFieldSx, ...(sx || {}) } as SxProps<Theme>}
    />
  );
}
