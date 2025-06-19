import React, { useState, useRef, useEffect } from "react"; // BARU: Menambahkan useEffect
import BaseLayout from "./BaseLayout.jsx";
import {
    Box,
    Card,
    CardContent,
    Typography,
    Button,
    Alert,
    CircularProgress,
    Divider,
    Paper,
    Stack,
    IconButton,
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import DescriptionIcon from "@mui/icons-material/Description"; // BARU: Ikon untuk dokumen
import axios from "axios";

export default function ContractAnalysis() {
    const [file, setFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null); // BARU: State untuk URL pratinjau
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const fileInputRef = useRef();

    // BARU DIMULAI: useEffect untuk mengelola URL pratinjau
    useEffect(() => {
        if (!file) {
            setPreviewUrl(null);
            return;
        }

        // Buat objek URL untuk pratinjau file
        const objectUrl = URL.createObjectURL(file);
        setPreviewUrl(objectUrl);

        // Cleanup function: hapus objek URL saat komponen unmount atau file berubah
        return () => URL.revokeObjectURL(objectUrl);
    }, [file]);
    // BARU SELESAI

    const handleAnalyze = async () => {
        if (!file) return;
        setLoading(true);

        try {
            const res = await axios.post(
                route("analyze.contract"),
                { file: file },
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            setResponse(res.data);
        } catch (error) {
            console.error("Error analyzing contract:", error);
            setResponse({
                judul: "Gagal Analisis",
                saran: [
                    {
                        judul: "Kesalahan",
                        deskripsi: "Terjadi kesalahan saat menganalisis kontrak. Silakan coba lagi.",
                    },
                ],
            });
        } finally {
            setLoading(false);
        }
    };

    const reset = () => {
        setFile(null);
        setResponse(null);
        setLoading(false);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    return (
        <BaseLayout title="Analisis Kontrak">
            <Box
                sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: response ? "row" : "column" },
                    gap: 3,
                    p: 4,
                }}
            >
                <Card sx={{ flex: 1, maxWidth: 600, mx: "auto" }}>
                    <CardContent>
                        <Typography variant="h5" fontWeight="bold" textAlign="center" gutterBottom>
                            📄 Contract Analyzer
                        </Typography>
                        <Typography variant="body2" color="text.secondary" textAlign="center" mb={2}>
                            Upload dokumen kontrak (PDF, DOC, DOCX, atau Gambar) untuk dianalisis.
                        </Typography>

                        <Divider sx={{ my: 2 }} />

                        <Typography variant="body2" sx={{ mb: 1 }}>
                            Pilih File Kontrak
                        </Typography>
                        <Stack direction="row" alignItems="center" spacing={2}>
                            <Button
                                component="label"
                                variant="outlined"
                                startIcon={<UploadFileIcon />}
                            >
                                Pilih File
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    hidden
                                    accept=".pdf,.doc,.docx,image/*" // BARU: Menambahkan image/*
                                    onChange={(e) => setFile(e.target.files[0])}
                                />
                            </Button>
                            <Typography variant="body2" noWrap>
                                {file ? file.name : "Belum ada file dipilih"}
                            </Typography>
                        </Stack>

                        <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
                            <Button
                                variant="contained"
                                fullWidth
                                onClick={handleAnalyze}
                            >
                                {loading ? <CircularProgress size={24} color="inherit" /> : "Lakukan Analisis"}
                            </Button>

                            {file && (
                                <IconButton color="secondary" onClick={reset}>
                                    <RestartAltIcon />
                                </IconButton>
                            )}
                        </Box>

                        {/* BARU DIMULAI: Bagian untuk menampilkan pratinjau file */}
                        {previewUrl && file && (
                            <Box mt={3} textAlign="center">
                                <Typography variant="subtitle1" gutterBottom fontWeight="medium">
                                    Pratinjau File
                                </Typography>
                                <Paper variant="outlined" sx={{ p: 1 }}>
                                    {file.type.startsWith("image/") ? (
                                        <img
                                            src={previewUrl}
                                            alt="Pratinjau Kontrak"
                                            style={{
                                                maxWidth: '100%',
                                                maxHeight: '400px',
                                                height: 'auto',
                                                borderRadius: '4px'
                                            }}
                                        />
                                    ) : file.type === "application/pdf" ? (
                                        <embed
                                            src={previewUrl}
                                            type="application/pdf"
                                            width="100%"
                                            height="500px"
                                        />
                                    ) : (
                                        <Box p={3} display="flex" flexDirection="column" alignItems="center" gap={1}>
                                            <DescriptionIcon sx={{ fontSize: 50 }} color="action" />
                                            <Typography variant="body2">{file.name}</Typography>
                                            <Typography variant="caption" color="text.secondary">
                                                Pratinjau tidak tersedia untuk tipe file ini.
                                            </Typography>
                                        </Box>
                                    )}
                                </Paper>
                            </Box>
                        )}
                        {/* BARU SELESAI */}

                    </CardContent>
                </Card>

                {response && (
                    <Paper
                        elevation={2}
                        sx={{
                            flex: 1,
                            p: 3,
                            borderRadius: 2,
                            backgroundColor: "#1e1e2f",
                            color: "#fff",
                            border: "1px solid #333",
                            mt: { xs: 3, md: 0 },
                        }}
                    >
                        <Typography variant="h6" gutterBottom>
                            🔍 {response.judul || "Hasil Analisis Kontrak"}
                        </Typography>

                        <Alert
                            severity={response.judul === "Gagal Analisis" ? "error" : "success"}
                            sx={{
                                backgroundColor: response.judul === "Gagal Analisis" ? "#5c2a2a" : "#334d2d",
                                color: response.judul === "Gagal Analisis" ? "#ffcdd2" : "#c5e1a5",
                                mt: 2,
                            }}
                        >
                            {response.judul === "Gagal Analisis"
                               ? "Analisis Gagal"
                               : "✨ Berikut adalah poin-poin yang perlu diperhatikan dari kontrak kamu:"
                            }
                        </Alert>

                        <Box mt={2}>
                            {response?.saran?.map((item, index) => (
                                <Paper
                                    key={index}
                                    elevation={2}
                                    sx={{
                                        flex: 1,
                                        p: 3,
                                        borderRadius: 2,
                                        backgroundColor: "#1e1e2f",
                                        color: "#fff",
                                        border: "1px solid #333",
                                        mt: 2,
                                    }}
                                >
                                    <Typography variant="h6" gutterBottom>
                                        {index + 1}. {item.judul}
                                    </Typography>
                                    <Typography mt={1} sx={{ whiteSpace: 'pre-wrap' }}>{item.deskripsi}</Typography>
                                </Paper>
                            ))}
                        </Box>
                    </Paper>
                )}
            </Box>
        </BaseLayout>
    );
}
