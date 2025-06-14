import React, { useState, useRef }, { useState, useRef } from "react";
import BaseLayout from "./BaseLayout.jsx";
import {
    Box,
    Container,
    TextField,
    Button,
    Typography,
    Paper,
} from "@mui/material";
import { jsPDF } from "jspdf";import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  Paper,
} from '@mui/material';
import { jsPDF } from 'jspdf';

export default function LetterGenerator() {
  const [formData, setFormData] = useState({
    nama: '',
    tanggal: '',
    alasan: '',
  });

  const [generatedText, setGeneratedText] = useState('');
  const letterRef = useRef();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generateLetter = () => {
    const { nama, tanggal, alasan } = formData;
    const surat = `Kepada Yth. HRD\n\nSaya yang bertanda tangan di bawah ini:\nNama: ${nama}\nDengan ini mengajukan izin tidak masuk kerja pada tanggal ${tanggal} dikarenakan ${alasan}.\n\nDemikian surat ini saya buat. Terima kasih.\n\nHormat saya,\n${nama}`;
    setGeneratedText(surat);
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.setFont('Times', 'normal');
    doc.setFontSize(12);

    const lines = doc.splitTextToSize(generatedText, 170);
    doc.text(lines, 20, 30);

    doc.save('surat-izin.pdf');
  };

  return (
    <BaseLayout>
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Generate Surat Izin Tidak Masuk Kerja
        </Typography>
        <Typography variant="subtitle1" align="center" color="text.secondary" gutterBottom>
          Isi form berikut, kami bantu buatkan surat izinnya.
        </Typography>

        <Paper sx={{ p: 4, borderRadius: 3, mb: 4 }} elevation={3}>
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              label="Nama Lengkap"
              name="nama"
              value={formData.nama}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              type="date"
              name="tanggal"
              value={formData.tanggal}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Alasan Tidak Masuk Kerja"
              name="alasan"
              value={formData.alasan}
              onChange={handleChange}
              fullWidth
            />
            <Button variant="contained" color="primary" onClick={generateLetter}>
              Buat Surat
            </Button>
          </Box>
        </Paper>

        {generatedText && (
          <Paper sx={{ p: 4, borderRadius: 3 }} elevation={1}>
            <Typography variant="h6" gutterBottom>
              Hasil Surat:
            </Typography>
            <Typography
              variant="body1"
              component="pre"
              ref={letterRef}
              sx={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}
            >
              {generatedText}
            </Typography>
            <Box mt={2}>
              <Button variant="contained" color="success" onClick={exportPDF}>
                Export ke PDF
              </Button>
            </Box>
          </Paper>
        )}
      </Container>
    </BaseLayout>
  );
}
