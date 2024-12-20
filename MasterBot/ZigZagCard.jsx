import React from 'react';
import { ArcherContainer, ArcherElement } from 'react-archer';
import { ChakraProvider, Box, Image, Flex } from '@chakra-ui/react';

const containerStyle = { width: '300px', height: '100px', position: 'relative', overflow: 'hidden', margin: '0px auto' };
const rowStyle = { display: 'flex', justifyContent: 'space-around', alignItems: 'center', margin: '10px 0' };
const labelStyle = { fontSize: '8px', margin: '0' };

const App = () => {
  const image = "https://media.istockphoto.com/id/1041127066/photo/young-man-in-blue-t-shirt-pointing-right-with-his-finger-isolated-on-gray-background.jpg?b=1&s=612x612&w=0&k=20&c=xmSEcOsqDVACk8IipipgsEmmgf26wPMEIgGdSIynwSw=";
  
  return (
    <ChakraProvider>
      <div style={containerStyle}>
        <ArcherContainer strokeColor="green">
          <Flex style={rowStyle}>
            <ArcherElement
              id="image1"
              relations={[
                {
                  targetId: 'image2',
                  targetAnchor: 'left',
                  sourceAnchor: 'right',
                  style: { strokeDasharray: '2,2' },
                  label: <div style={labelStyle}>Relation 1</div>,
                },
              ]}
            >
              <Box
                width="60px"
                height="60px"
                display="flex"
                justifyContent="center"
                alignItems="center"
                backgroundColor="#f0f0f0"
                cursor="pointer"
                transition="background-color 0.3s, color 0.3s"
                boxShadow="md"
                borderRadius="md"
                p={2}
                mt="20px"
                _hover={{ backgroundColor: '#a0c4ff', color: 'white' }}
              >
                <Image src={image} alt="Dummy Image 1" boxSize="100%" objectFit="cover" />
              </Box>
            </ArcherElement>

            <ArcherElement
              id="image2"
              relations={[
                {
                  targetId: 'image3',
                  targetAnchor: 'left',
                  sourceAnchor: 'right',
                  style: { strokeColor: 'red', strokeWidth: 2 },
                  label: <div style={labelStyle}>Relation 2</div>,
                },
              ]}
            >
              <Box
                width="60px"
                height="60px"
                display="flex"
                justifyContent="center"
                alignItems="center"
                backgroundColor="#f0f0f0"
                cursor="pointer"
                transition="background-color 0.3s, color 0.3s"
                boxShadow="md"
                borderRadius="md"
                p={2}
                mb="20px"
                _hover={{ backgroundColor: '#a0c4ff', color: 'white' }}
              >
                <Image src={image} alt="Dummy Image 2" boxSize="100%" objectFit="cover" />
              </Box>
            </ArcherElement>

            <ArcherElement id="image3">
              <Box
                width="60px"
                height="60px"
                display="flex"
                justifyContent="center"
                alignItems="center"
                backgroundColor="#f0f0f0"
                cursor="pointer"
                transition="background-color 0.3s, color 0.3s"
                boxShadow="md"
                borderRadius="md"
                p={2}
                mt="20px"
                _hover={{ backgroundColor: '#a0c4ff', color: 'white' }}
              >
                <Image src={image} alt="Dummy Image 3" boxSize="100%" objectFit="cover" />
              </Box>
            </ArcherElement>
          </Flex>
        </ArcherContainer>
      </div>
    </ChakraProvider>
  );
};

export default App;
