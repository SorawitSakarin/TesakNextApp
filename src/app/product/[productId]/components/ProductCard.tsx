/* eslint-disable jsx-a11y/alt-text */
import { Container, Image, Root, Text } from '@react-three/uikit'
import bgFarmers from '@/app/assets/bag-of-rice-1.webp';
import React, { useState } from 'react'

interface productCardProps {
  province: string
}
const ProductCard = () => {
  return (
    <Root flexDirection="column" pixelSize={0.01} sizeX={4.4}>
      <Container
        backgroundColor={0xffffff}
        dark={{ backgroundColor: 0x0 }}
        borderRadius={20}
        flexDirection="column"
        zIndexOffset={10}
        transformTranslateZ={10}

      >
        <Container>
          <Image
            width={440} height={440}
            borderRadius={6}
            src={bgFarmers.src}
            objectFit="fill"
          />
        </Container>
        <Container
          backgroundColor={0xffffff}
          dark={{ backgroundColor: 0x0 }}
          flexDirection="row"
          padding={28}
          paddingTop={28 + 4}
          alignItems="center"
          justifyContent="space-between"
          borderBottomRadius={20}
          castShadow
        >
          <Container flexDirection="column" gap={8}>
            <Text fontWeight="normal" fontSize={24} lineHeight="100%">
              Produce from Thailand
            </Text>
            {/* <Text fontSize={20} fontWeight="medium" letterSpacing={-0.4} color={0x333333}>

            </Text> */}
          </Container>
        </Container>
      </Container>
    </Root >
  )
}

export default ProductCard
