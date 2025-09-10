"use client";

import { scanReceipt } from "@/actions/transaction";
import useFetch from "@/components/hooks/use-fetch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Camera, Loader2 } from "lucide-react";
import React, { useEffect, useRef } from "react";
import { toast } from "sonner";

const ReceiptScanner = ({ onScanComplete }) => {
  const fileInputRef = useRef();

  const {
    loading: scanReceiptLoading,
    fn: scanReceiptFn,
    data: scannedData,
  } = useFetch(scanReceipt);

  const handleReceiptScan = async (file) => {
    console.log("Scanning", file);

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size should be less than 5MB");
      return;
    }

    await scanReceiptFn(file);
  };

  useEffect(() => {
    console.log(
      "scannedData updated:",
      scannedData,
      "loading:",
      scanReceiptLoading
    );
    if (scannedData && !scanReceiptLoading) {
      onScanComplete(scannedData);
      toast.success("Receipt scanned successfully");
    }
  }, [scanReceiptLoading, scannedData]);
  return (
    <div>
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        capture="environment"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file instanceof File) {
            // ✅ ensure it’s a File
            handleReceiptScan(file);
          } else {
            console.error("Not a valid file:", file);
          }
        }}
      />

      <Button
        className="w-full h-10 bg-gradient-to-br from-orange-500 via-pink-500 to-purple-500 animate-gradient transition-opacity text-white hover-scan-btn cursor-pointer"
        onClick={() => fileInputRef.current?.click()}
        disabled={scanReceiptLoading}
      >
        {scanReceiptLoading ? (
          <>
            <Loader2 className="mr-2 animate-spin" />
            <span>Scanning Receipt...</span>
          </>
        ) : (
          <>
            <Camera className="mr-2" />
            <span>Scan Receipt with Ai</span>
          </>
        )}
      </Button>
    </div>
  );
};

export default ReceiptScanner;
