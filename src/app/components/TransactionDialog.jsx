"use client";

import { useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Tab,
  Tabs,
  TextField,
} from "@mui/material";

export default function TransactionDialog({ open, onClose }) {
  const [tab, setTab] = useState(1);
  const [wallet, setWallet] = useState("BCA");
  const [category, setCategory] = useState("Food");
  const [destinationWallet, setDestinationWallet] = useState("GoPay");

  const handleTabChange = (_, value) => {
    setTab(value);

    if (value === 2 && wallet === destinationWallet) {
      setDestinationWallet(wallet === "GoPay" ? "Cash" : "GoPay");
    }
  };

  const textFieldSx = {
    "& .MuiOutlinedInput-root": {
      minHeight: 56,
      height: 56,
      borderRadius: "12px",
    },
    "& .MuiInputBase-input": {
      boxSizing: "border-box",
    },
    "& .MuiInputLabel-root": {
      backgroundColor: "#ffffff",
      px: 0.5,
    },
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ px: 3, pt: 3, pb: 1.5, fontWeight: 800, letterSpacing: "-0.03em" }}>
        Add transaction
      </DialogTitle>

      <DialogContent sx={{ px: 3, pb: 3 }}>
        <Tabs
          value={tab}
          onChange={handleTabChange}
          sx={{
            mb: 3,
            minHeight: 42,
            "& .MuiTab-root": {
              textTransform: "none",
              minHeight: 42,
              fontWeight: 700,
            },
          }}
        >
          <Tab label="Income" />
          <Tab label="Expense" />
          <Tab label="Transfer" />
        </Tabs>

        <div className="grid gap-4">
          <TextField
            fullWidth
            label="Amount"
            placeholder="Rp0"
            slotProps={{ inputLabel: { shrink: true } }}
            sx={textFieldSx}
          />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormControl fullWidth>
              <InputLabel>Wallet</InputLabel>
              <Select
                label="Wallet"
                value={wallet}
                onChange={(event) => {
                  const nextWallet = event.target.value;
                  setWallet(nextWallet);

                  if (tab === 2 && nextWallet === destinationWallet) {
                    setDestinationWallet(nextWallet === "GoPay" ? "Cash" : "GoPay");
                  }
                }}
              >
                <MenuItem value="BCA">BCA</MenuItem>
                <MenuItem value="Cash">Cash</MenuItem>
                <MenuItem value="GoPay">GoPay</MenuItem>
              </Select>
            </FormControl>

            {tab === 2 ? (
              <FormControl fullWidth>
                <InputLabel>To wallet</InputLabel>
                <Select
                  label="To wallet"
                  value={destinationWallet}
                  onChange={(event) => setDestinationWallet(event.target.value)}
                >
                  {["BCA", "Cash", "GoPay"]
                    .filter((item) => item !== wallet)
                    .map((item) => (
                      <MenuItem key={item} value={item}>
                        {item}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            ) : (
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  label="Category"
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                >
                  <MenuItem value="Food">Food & Drink</MenuItem>
                  <MenuItem value="Transport">Transport</MenuItem>
                  <MenuItem value="Lifestyle">Lifestyle</MenuItem>
                </Select>
              </FormControl>
            )}
          </div>

          <TextField
            fullWidth
            label="Note"
            placeholder="Optional note"
            slotProps={{ inputLabel: { shrink: true } }}
            sx={textFieldSx}
          />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <TextField
              fullWidth
              label="Date"
              type="date"
              defaultValue="2026-09-06"
              slotProps={{ inputLabel: { shrink: true } }}
              sx={textFieldSx}
            />
            {tab === 2 && (
              <TextField
                fullWidth
                label="Transfer fee"
                placeholder="Rp0"
                slotProps={{ inputLabel: { shrink: true } }}
                sx={textFieldSx}
              />
            )}
          </div>

          <Button
            variant="contained"
            size="large"
            onClick={onClose}
            sx={{ mt: 1, py: 1.35, bgcolor: "#111827", "&:hover": { bgcolor: "#1f2937" } }}
          >
            Save transaction
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
