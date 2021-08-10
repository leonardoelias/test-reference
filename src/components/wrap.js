import React from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

function Wrap({ children, maxWidth = "xs", ...rest }) {
  return (
    <Container maxWidth={maxWidth} aria-label='container' {...rest}>
      <Box
        display='flex'
        justifyContent='space-between'
        alignItems='center'
        bgcolor='background.default'
        px={2}
        py={2}
        boxShadow='0 4px 12px -4px rgba(0,0,5,.05)'
        borderRadius={8}
        border={1}
        borderColor='divider'
      >
        {children}
      </Box>
    </Container>
  );
}

export default Wrap;
