"use client"

import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"

interface PDFDropzoneProps {
    onFileSelect: (file: File) => void
    disabled?: boolean
}

export function PDFDropzone({ onFileSelect, disabled }: PDFDropzoneProps) {
    const [selectedFile, setSelectedFile] = useState<File | null>(null)

    const onDrop = useCallback(
        (acceptedFiles: File[]) => {
            const file = acceptedFiles[0]
            if (!file) return
            setSelectedFile(file)
            onFileSelect(file)
        },
        [onFileSelect]
    )

    const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
        onDrop,
        accept: { "application/pdf": [".pdf"] },
        maxFiles: 1,
        disabled,
    })

    const borderColor = isDragReject
        ? "#ef4444"
        : isDragActive
            ? "#6366f1"
            : selectedFile
                ? "#22c55e"
                : "#d1d5db"

    const background = isDragReject
        ? "rgba(239,68,68,0.06)"
        : isDragActive
            ? "rgba(99,102,241,0.06)"
            : selectedFile
                ? "rgba(34,197,94,0.05)"
                : "rgba(249,250,251,1)"

    return (
        <div
            {...getRootProps()}
            style={{
                border: `2px dashed ${borderColor}`,
                borderRadius: "1rem",
                padding: "2.5rem 2rem",
                width: "360px",
                textAlign: "center",
                cursor: disabled ? "not-allowed" : "pointer",
                background,
                transition: "all 0.2s ease",
                userSelect: "none",
                opacity: disabled ? 0.6 : 1,
            }}
        >
            <input {...getInputProps()} name="file" />

            <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>
                {isDragReject ? "🚫" : selectedFile ? "✅" : isDragActive ? "📂" : "📄"}
            </div>

            {isDragReject ? (
                <p style={{ fontWeight: 600, color: "#dc2626", fontSize: "0.95rem" }}>
                    Only PDF files are accepted
                </p>
            ) : selectedFile ? (
                <>
                    <p style={{ fontWeight: 600, color: "#15803d", fontSize: "0.95rem", marginBottom: "0.25rem" }}>
                        {selectedFile.name}
                    </p>
                    <p style={{ fontSize: "0.8rem", color: "#6b7280" }}>
                        {(selectedFile.size / 1024).toFixed(1)} KB · Click to change
                    </p>
                </>
            ) : (
                <>
                    <p style={{ fontWeight: 600, color: "#111827", fontSize: "0.95rem", marginBottom: "0.25rem" }}>
                        {isDragActive ? "Drop your PDF here" : "Drag & drop your PDF"}
                    </p>
                    <p style={{ fontSize: "0.8rem", color: "#9ca3af" }}>or click to browse</p>
                </>
            )}
        </div>
    )
}