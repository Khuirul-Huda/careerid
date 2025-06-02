import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Copyright from '../internals/components/Copyright';
import ChartUserByCountry from './ChartUserByCountry';
import CustomizedTreeView from './CustomizedTreeView';
import CustomizedDataGrid from './CustomizedDataGrid';
import HighlightedCard from './HighlightedCard';
import PageViewsBarChart from './PageViewsBarChart';
import SessionsChart from './SessionsChart';
import StatCard from './StatCard';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { FileText, Mail, FileSignature, MessageCircle } from 'lucide-react';
import { Link} from '@inertiajs/react'

const features = [
  {
    title: 'CV Analysis',
    description: 'Analyze your CV with AI-powered insights.',
    icon: FileText,
    url: ''
  },
  {
    title: 'Letter Generator',
    description: 'Generate personalized cover letters effortlessly.',
    icon: Mail,
    url: ''
  },
  {
    title: 'Contract Analysis',
    description: 'Get AI-driven analysis of your contracts.',
    icon: FileSignature,
    url: ''
  },
  {
    title: 'AI Consultation',
    description: 'Consult with AI for career advice and insights.',
    icon: MessageCircle,
    url: ''
  }
];

export default function MainGrid() {
  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      {/* cards */}
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Welcome back, User!
      </Typography>
      <Grid
        container
        spacing={2}
        columns={12}
        sx={{ mb: (theme) => theme.spacing(2) }}
      >
       
      </Grid>
      <Grid container spacing={2} columns={12}>
        {features.map((feature, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Link href={feature.url || '#'} style={{ textDecoration: 'none' }}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-6px) scale(1.03)',
                    boxShadow: 6,
                  },
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Stack spacing={1} alignItems="center">
                    <feature.icon size={32} color="#1976d2" />
                    <Typography variant="h6" align="center">{feature.title}</Typography>
                    <Typography variant="body2" color="text.secondary" align="center">
                      {feature.description}
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
      
      <Copyright sx={{ my: 4 }} />
    </Box>
  );
}
