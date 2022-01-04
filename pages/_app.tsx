import React from 'react'
import Head from 'next/head'
import { ChakraProvider, Container, VStack, Image, Heading, Text, Box, Divider, Button } from '@chakra-ui/react'
import { AppProps } from 'next/app'
import theme from '../theme'

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>StoreARG</title>
        <meta content="initial-scale=1.0, width=device-width" name="viewport" />
        <meta content="lauchaventura" name="author is goncy" />
        //El autor es Gonzalo Pozzo, nos explico desde 0 como hacer el proyecto//
        <meta content="Lautaro Ventura" name="copyright" />
      </Head>
      <ChakraProvider theme={theme}>
        <Box bg='dark' padding={4}  >

          <Container
            borderRadius='sm'
            backgroundColor='white'
            boxShadow='md'
            maxWidth='container.xl'
            padding={4}
          >

            <VStack marginBottom={6} >
              <Image borderRadius={9999} maxHeight={128} src="https://res.cloudinary.com/dsjas6fvz/image/upload/v1641253827/StoreARG/store_arg_kubirn.png"></Image>
              <a
                href="https://www.github.com/lauchaventura"
                target="_blank"
              >
                <Image
                  maxHeight={6}
                  cursor='pointer'
                  src="https://cdn-icons-png.flaticon.com/512/25/25231.png">
                </Image>
              </a>
            </VStack>
            <Divider margin={6} />
            <Component {...pageProps} />
          </Container>
        </Box>

      </ChakraProvider>
    </>
  )
}

export default App