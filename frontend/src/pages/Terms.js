// src/pages/Terms.js
import React from 'react';
import { Container, Box, Typography, Link as MuiLink } from '@mui/material';

const Terms = () => {
  return (
    <Container sx={{ py: 4 }}>
      <Box>
        <Typography variant="h4" gutterBottom>
          Terms of Service
        </Typography>

        <Typography paragraph>
          Welcome to LincolnVerse. By using our service, you agree to these Terms of Service.
        </Typography>

        <Typography variant="h6" gutterBottom>
          1. Acceptance of Terms
        </Typography>
        <Typography paragraph>
          You must be at least 13 years old to use this service. By creating an account or accessing any part of the site, you confirm that you meet this age requirement and agree to all terms herein.
        </Typography>

        <Typography variant="h6" gutterBottom>
          2. User Accounts
        </Typography>
        <Typography paragraph>
          You are responsible for maintaining the security of your account and password. You agree not to share your credentials with anyone and to notify us immediately of any unauthorized use.
        </Typography>

        <Typography variant="h6" gutterBottom>
          3. Openverse Content
        </Typography>
        <Typography paragraph>
          All media returned by searches on LincolnVerse are sourced via the Openverse API and are subject to their respective licenses. You must comply with each work’s license terms when downloading, sharing, or modifying.
        </Typography>

        <Typography variant="h6" gutterBottom>
          4. Prohibited Uses
        </Typography>
        <Typography paragraph>
          You agree not to misuse our services in any way, including but not limited to spamming, scraping content beyond API limits, or distributing malware.
        </Typography>

        <Typography variant="h6" gutterBottom>
          5. Limitation of Liability
        </Typography>
        <Typography paragraph>
          LincolnVerse and its affiliates are not liable for any indirect, punitive, special, incidental, or consequential damages arising out of your use of the service.
        </Typography>

        <Typography variant="h6" gutterBottom>
          6. Modifications
        </Typography>
        <Typography paragraph>
          We may modify these terms at any time. When we do, we’ll post the updated date at the top of the page. Continued use after changes means you accept the new terms.
        </Typography>

        <Typography paragraph>
          If you have questions about these Terms, please <MuiLink href="mailto:29857104@students.lincoln.ac.uk">contact support</MuiLink>.
        </Typography>
      </Box>
    </Container>
  );
};

export default Terms;
