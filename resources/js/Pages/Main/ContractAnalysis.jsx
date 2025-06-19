import React, { useState, useRef } from "react";
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
import axios from "axios";

export default function ContractAnalysis() {
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef();

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
              Upload dokumen kontrak (PDF, DOC, atau DOCX) untuk dianalisis oleh AI.
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
                  accept=".pdf,.doc,.docx"
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
              mt: 3,
            }}
          >
            <Typography variant="h6" gutterBottom>
              🔍 {response.judul || "Hasil Analisis Kontrak"}
            </Typography>

            <Alert
              severity="success"
              sx={{
                backgroundColor: "#334d2d",
                color: "#c5e1a5",
                mt: 2,
              }}
            >
              ✨ Berikut adalah poin-poin yang perlu diperhatikan dari kontrak kamu:
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
                  <Typography mt={1}>{item.deskripsi}</Typography>
                </Paper>
              ))}
            </Box>
          </Paper>
        )}
      </Box>
    </BaseLayout>
  );
}
