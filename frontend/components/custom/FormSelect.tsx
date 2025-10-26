"use client";
import * as React from "react";
import { MenuItem, SxProps, TextField, Theme } from "@mui/material";

type Option = { label: string; value: string } | string;

type FormSelectProps = {
  label: string;
  value: string; 
  onChange: (v: string) => void;
  onBlur?: () => void;
  error?: boolean;
  helperText?: string;
  placeholder?: string; 
  options: Option[];
  sx?: SxProps<Theme>;
};

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
  "& .MuiInput-underline:after": { borderBottomColor: "#86937F" },
};

export default function FormSelect({
  label,
  value,
  onChange,
  onBlur,
  error,
  helperText,
  placeholder = "Please select",
  options,
  sx,
}: FormSelectProps) {
  return (
    <TextField
      select
      fullWidth
      variant="standard"
      label={label}
      value={value}
      onChange={(e) => onChange(String(e.target.value))}
      onBlur={onBlur}
      error={!!error}
      helperText={helperText}
      InputLabelProps={{ shrink: true }}
      SelectProps={{
        IconComponent: undefined,
        displayEmpty: true,
        renderValue: (v) =>
          v ? (
            String(v)
          ) : (
            <span style={{ color: "#9ca3af" }}>{placeholder}</span>
          ),
      }}
      sx={{ ...baseFieldSx, ...(sx || {}) } as SxProps<Theme>}
    >
      <MenuItem value="" disabled>
        {placeholder}
      </MenuItem>
      {options.map((o) =>
        typeof o === "string" ? (
          <MenuItem key={o} value={o}>
            {o}
          </MenuItem>
        ) : (
          <MenuItem key={o.value} value={o.value}>
            {o.label}
          </MenuItem>
        )
      )}
    </TextField>
  );
}
