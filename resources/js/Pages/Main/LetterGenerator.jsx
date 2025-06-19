import React, { useState } from "react";
import BaseLayout from "./BaseLayout.jsx";
import {
    Box, Container, TextField, Button, Typography, Paper,
    CircularProgress, Alert, FormControl, InputLabel, Select, MenuItem
} from "@mui/material";
import axios from "axios";
import { jsPDF } from "jspdf";

// Objek untuk mendefinisikan field per jenis surat
const letterFields = {
    lamaran: [
        { name: 'namaLengkap', label: 'Nama Lengkap Anda', required: true },
        { name: 'posisi', label: 'Posisi yang Dilamar', required: true },
        { name: 'namaPerusahaan', label: 'Nama Perusahaan Tujuan', required: true },
        { name: 'skills', label: 'Skill & Pengalaman Relevan', required: true, multiline: true, rows: 4, helperText: 'Jelaskan secara singkat skill dan pengalaman yang paling relevan dengan posisi ini.' },
    ],
    resign: [
        { name: 'namaLengkap', label: 'Nama Lengkap Anda', required: true },
        { name: 'posisi', label: 'Jabatan/Posisi Terakhir', required: true },
        { name: 'namaPerusahaan', label: 'Nama Perusahaan', required: true },
        { name: 'namaAtasan', label: 'Nama Atasan Langsung / HRD', required: true },
        { name: 'tanggalResign', label: 'Tanggal Efektif Pengunduran Diri', type: 'date', required: true },
    ],
    cuti: [
        { name: 'namaLengkap', label: 'Nama Lengkap Anda', required: true },
        { name: 'posisi', label: 'Jabatan/Posisi', required: true },
        { name: 'tanggalMulai', label: 'Tanggal Mulai Cuti', type: 'date', required: true },
        { name: 'tanggalSelesai', label: 'Tanggal Selesai Cuti', type: 'date', required: true },
        { name: 'alasanCuti', label: 'Alasan Mengambil Cuti', required: true, multiline: true, rows: 3 },
    ],
    izin: [
        { name: 'namaLengkap', label: 'Nama Lengkap Anda', required: true },
        { name: 'posisi', label: 'Jabatan/Posisi', required: true },
        { name: 'tanggalIzin', label: 'Tanggal Izin Tidak Masuk', type: 'date', required: true },
        { name: 'alasanIzin', label: 'Alasan Izin Tidak Masuk', required: true, multiline: true, rows: 3 },
    ],
};

export default function LetterGenerator() {
    const [letterType, setLetterType] = useState('lamaran'); // Default ke 'lamaran'
    const [formData, setFormData] = useState({});
    const [generatedLetter, setGeneratedLetter] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleTypeChange = (event) => {
        const newType = event.target.value;
        setLetterType(newType);
        setFormData({}); // Reset form data saat ganti jenis surat
        setGeneratedLetter('');
        setError('');
    };

    const handleFormChange = (event) => {
        setFormData(prev => ({ ...prev, [event.target.name]: event.target.value }));
    };

    const handleGenerate = async () => {
        setLoading(true);
        setError('');
        setGeneratedLetter('');
        try {
            const payload = { ...formData, letterType };
            const response = await axios.post(route('generate.letter'), payload);
            setGeneratedLetter(response.data.letterText);
        } catch (err) {
            console.error(err);
            const errorMsg = err.response?.data?.message || "Gagal membuat surat. Pastikan semua kolom terisi atau coba lagi.";
            setError(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    const exportPDF = () => {
        const doc = new jsPDF();
        doc.setFont('Times-Roman', 'normal');
        doc.setFontSize(12);
        const lines = doc.splitTextToSize(generatedLetter, 180);
        doc.text(lines, 15, 20);
        doc.save(`Surat-${letterType}-${formData.namaLengkap || 'dokumen'}.pdf`);
    };
    
    // Render form secara dinamis
    const renderDynamicForm = () => {
        const fields = letterFields[letterType];
        if (!fields) return null;

        return fields.map(field => (
            <TextField
                key={field.name}
                name={field.name}
                label={field.label}
                type={field.type || 'text'}
                value={formData[field.name] || ''}
                onChange={handleFormChange}
                fullWidth
                required={field.required}
                multiline={field.multiline}
                rows={field.rows}
                helperText={field.helperText}
                InputLabelProps={{ shrink: field.type === 'date' || undefined }}
            />
        ));
    };

    return (
        <BaseLayout title="AI Letter Generator">
            <Container maxWidth="md" sx={{ py: 4 }}>
                <Typography variant="h4" align="center" fontWeight="bold" gutterBottom>
                    AI Professional Letter Generator ✍️
                </Typography>
                <Typography variant="subtitle1" align="center" color="text.secondary" sx={{ mb: 4 }}>
                    Butuh surat untuk keperluan kerja? Pilih jenisnya, isi data, dan biarkan AI membantu Anda.
                </Typography>

                <Paper sx={{ p: { xs: 2, md: 4 }, borderRadius: 3, mb: 4 }} elevation={2}>
                    <Box component="div" display="flex" flexDirection="column" gap={3}>
                        <FormControl fullWidth>
                            <InputLabel id="letter-type-label">Pilih Jenis Surat</InputLabel>
                            <Select
                                labelId="letter-type-label"
                                value={letterType}
                                label="Pilih Jenis Surat"
                                onChange={handleTypeChange}
                            >
                                <MenuItem value="lamaran">Surat Lamaran Kerja</MenuItem>
                                <MenuItem value="resign">Surat Pengunduran Diri</MenuItem>
                                <MenuItem value="cuti">Surat Permohonan Cuti</MenuItem>
                                <MenuItem value="izin">Surat Izin Tidak Masuk</MenuItem>
                            </Select>
                        </FormControl>
                        
                        {renderDynamicForm()}

                        <Button variant="contained" color="primary" onClick={handleGenerate} disabled={loading} sx={{ mt: 1, py: 1.5 }}>
                            {loading ? <CircularProgress size={24} color="inherit" /> : "Buat Surat dengan AI"}
                        </Button>
                    </Box>
                </Paper>

                {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

                {generatedLetter && (
                    <Paper sx={{ p: { xs: 2, md: 4 }, borderRadius: 3, backgroundColor: '#f9f9f9' }} variant="outlined">
                        <Typography variant="h6" gutterBottom>Hasil Draf Surat Anda ✨</Typography>
                        <Paper sx={{ p: 3, border: '1px solid #ddd' }} elevation={0}>
                            <Typography component="pre" sx={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word', fontFamily: 'serif', lineHeight: 1.75 }}>
                                {generatedLetter}
                            </Typography>
                        </Paper>
                        <Box mt={3} textAlign="center">
                            <Button variant="contained" color="success" onClick={exportPDF}>Download sebagai PDF</Button>
                        </Box>
                    </Paper>
                )}
            </Container>
        </BaseLayout>
    );
}
