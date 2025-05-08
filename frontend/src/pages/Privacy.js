// src/pages/Privacy.js
import React from 'react';
import { Container, Box, Typography, Link as MuiLink } from '@mui/material';

const Privacy = () => {
  return (
    <Container sx={{ py: 4 }}>
      <Box>
        <Typography variant="h4" gutterBottom>
          Privacy Policy
        </Typography>

        <Typography paragraph>
          LincolnVerse (“we”, “us”, or “our”) is committed to protecting your privacy. This Privacy Policy explains
          what information we collect, how we use it, and the choices you have regarding your information.
        </Typography>

        <Typography variant="h6" gutterBottom>
          1. Information We Collect
        </Typography>
        <Typography paragraph>
          <strong>Account Information:</strong> When you register, we collect your username and (optionally) email
          address to create and manage your account.<br/>
          <strong>Usage Data:</strong> We automatically collect data about your searches, saved items, and
          interactions to improve our service and personalize your experience.<br/>
          <strong>Cookies &amp; Local Storage:</strong> We may store small pieces of data on your device to remember
          preferences such as dark mode and recent searches.
        </Typography>

        <Typography variant="h6" gutterBottom>
          2. How We Use Your Information
        </Typography>
        <Typography paragraph>
          We use the information we collect to:<br/>
          • Authenticate you and keep your account secure.<br/>
          • Provide, maintain, and improve LincolnVerse features.<br/>
          • Personalize content, such as showing your search history.<br/>
          • Communicate updates, security alerts, and support messages.
        </Typography>

        <Typography variant="h6" gutterBottom>
          3. Third-Party Services
        </Typography>
        <Typography paragraph>
          We integrate with the Openverse API to fetch media results. Openverse may collect its own analytics;
          please review their privacy practices at{' '}
          <MuiLink href="https://wordpress.org/openverse/" target="_blank" rel="noopener">
            wordpress.org/openverse
          </MuiLink>.
        </Typography>

        <Typography variant="h6" gutterBottom>
          4. Data Retention &amp; Deletion
        </Typography>
        <Typography paragraph>
          We retain your account and usage data as long as your account exists. You can request deletion of your
          data by contacting us (see below), and we will remove it in accordance with applicable law.
        </Typography>

        <Typography variant="h6" gutterBottom>
          5. Your Rights &amp; Choices
        </Typography>
        <Typography paragraph>
          You may:<br/>
          • Update or delete your account information at any time via the Account Settings page.<br/>
          • Opt out of non-essential cookies by clearing your browser cookies.<br/>
          • Request a copy of your personal data or ask for its deletion by emailing us.
        </Typography>

        <Typography paragraph>
          <strong>Contact Us:</strong> If you have questions or requests about your data, please email{' '}
          <MuiLink href="mailto:29857104@students.lincoln.ac.uk">29857104@students.lincoln.ac.uk</MuiLink>.
        </Typography>
      </Box>
    </Container>
  );
};

export default Privacy;
