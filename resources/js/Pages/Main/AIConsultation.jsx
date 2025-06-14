import React, { useState, useRef, useEffect } from "react";
import BaseLayout from "./BaseLayout.jsx";
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  Paper,
} from "@mui/material";
import { router, usePage } from "@inertiajs/react";
import axios from "axios";
import Showdown from "showdown";


export default function AIConsultation() {
  const props = usePage().props
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Halo! Ada yang bisa saya bantu hari ini?' },
  ]);
  const [input, setInput] = useState('');
  const bottomRef = useRef(null);
  const converter = new Showdown.Converter()

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e) => {
    // TODO: set loading


    e.preventDefault();
    if (!input.trim()) return;


    // FETCH WITH CSRF TOKEN
    const res = await axios.post(route('ai.consultation'), {
      question: input,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': props.csrf_token,
      },
    }).catch((error) => {
      console.error('Error fetching AI response:', error);
      // stop loading
    });

    setMessages((prev) => [
      ...prev,
      { role: 'user', content: input },
      {
        role: 'assistant',
        content: converter.makeHtml(res.data.response), // Ganti dengan respons AI sebenarnya
      },
    ]);
    setInput('');

    // stop loading

  };

  return (
    <BaseLayout title="Konsultasi AI">
      <Container maxWidth="md" sx={{ height: 'calc(100vh - 80px)', display: 'flex', flexDirection: 'column', pt: 4 }}>
        {/* Area Konten Chat */}
        <Box
          sx={{
            flexGrow: 1,
            overflowY: 'auto',
            mb: 2,
            px: 1,
            bgcolor: '#121212',
            borderRadius: 2,
            border: '1px solid #333',
            p: 2,
          }}
        >
          {messages.map((msg, idx) => (
            <Paper
              key={idx}
              elevation={0}
              sx={{
                bgcolor: 'transparent',
                mb: 2,
                pl: msg.role === 'user' ? 4 : 0,
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  whiteSpace: 'pre-wrap',
                  color: msg.role === 'user' ? '#90caf9' : '#e0e0e0',
                  fontWeight: msg.role === 'assistant' ? 400 : 500,
                }}
                
              >
                <div dangerouslySetInnerHTML={{ __html: msg.content }} />
              </Typography>
            </Paper>
          ))}
          <div ref={bottomRef} />
        </Box>

        {/* Area Input */}
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: 'flex',
            gap: 2,
            alignItems: 'center',
            position: 'sticky',
            bottom: 0,
            py: 2,
            bgcolor: '#0f0f0f',
          }}
        >
          <TextField
            fullWidth
            multiline
            maxRows={4}
            variant="outlined"
            placeholder="Ketik pesan Anda..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
            InputProps={{
              sx: {
                bgcolor: '#1e1e1e',
                color: 'white',
                borderRadius: 2,
              },
            }}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{ height: '56px', borderRadius: 2 }}
          >
            Kirim
          </Button>
        </Box>
      </Container>
    </BaseLayout>
  );
}
