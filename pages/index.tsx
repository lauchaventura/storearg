import { Grid, Stack, Text, Button, Flex, Image } from '@chakra-ui/react';
import { GetStaticProps } from 'next';
import { Link } from '@chakra-ui/react'
import React, { useState } from 'react'
import api from '../product/api';
import { Product } from '../product/types'
import { motion, AnimatePresence, AnimateSharedLayout } from 'framer-motion'

interface Props {
  products: Product[];
}

function parseCurrency(value: number): string {
  return value.toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
  })
}


const IndexRoute: React.FC<Props> = ({ products }) => {
  const [cart, setCart] = React.useState<Product[]>([]);
  const text = React.useMemo(() => {
    return cart
      .reduce((message, product) => message.concat(`*${product.title} - ${parseCurrency(product.price)}\n`), ``)
      .concat(`\nTotal: ${parseCurrency(cart.reduce((total, product) => total + product.price, 0))}`);
  }, [cart])


  return (
    <Stack spacing={6}>
      <Grid gridGap={6} templateColumns="repeat(auto-fill, minmax(240px, 1fr))">
        {products.map((product) => (
          <Stack spacing={3} borderRadius='md' padding={4} key={product.id} backgroundColor="gray.50">
            <Image
              as={motion.img}
              cursor="pointer"
              layoutId={product.image}
              alt={product.title}
              maxHeight={128}
              objectFit="cover"
              src={product.image}></Image>
            <Stack spacing={1}>
              <Text >{product.title}</Text>
              <Text fontSize='sm' fontWeight='500' color='green.500'>{parseCurrency(product.price)}</Text>
            </Stack>
            <Button colorScheme="green" variant='outline' size='sm' onClick={() => setCart(cart.concat(product))}
            >Agregar
            </Button>
          </Stack>
        ))}
      </Grid >
      {Boolean(cart.length) && (
        <Flex alignItems='center' justifyContent='center' bottom={4} position='sticky' >
          <Button
            padding={4}
            isExternal
            as={Link}
            colorScheme="whatsapp"
            href={`https://wa.me/5491141414141?text=${encodeURIComponent(text)}`}
            width='fit-content'
            leftIcon={<Image src="https://icongr.am/fontawesome/whatsapp.svg?size=32&color=ffffff" />}
            size="lg"
          >
            Completar pedido({cart.length} productos)
          </Button>
        </Flex>
      )}
    </Stack >
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const products = await api.list();
  return {

    props: {
      revalidate: 10,
      products,
    },

  };
};

export default IndexRoute;
