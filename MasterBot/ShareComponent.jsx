import React, { useState } from 'react';
import { Modal, Button, InputGroup, Input, useToast,ModalOverlay,ModalContent,ModalHeader,ModalCloseButton,ModalBody,InputRightElement } from '@chakra-ui/react';
import { FaFacebook, FaTwitter, FaLinkedin, FaYoutube, FaInstagram, FaPinterest, FaSnapchat, FaReddit, FaTumblr, FaCopy, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ShareComponent = ({ isOpen, onClose, link }) => {
  const platforms = [
    { name: 'Facebook', icon: FaFacebook },
    { name: 'Twitter', icon: FaTwitter },
    { name: 'LinkedIn', icon: FaLinkedin },
    { name: 'YouTube', icon: FaYoutube },
    { name: 'Instagram', icon: FaInstagram },
    { name: 'Pinterest', icon: FaPinterest },
    { name: 'Snapchat', icon: FaSnapchat },
    { name: 'Reddit', icon: FaReddit },
    { name: 'Tumblr', icon: FaTumblr }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const toast = useToast();

  const handleShare = (platform) => {
    console.log(`Sharing on ${platform} with link: ${link}`);

    toast({
      title: `Shared on ${platform}`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  const handleCopyLink = () => {
    const fullLink = window.location.origin + link;
    navigator.clipboard.writeText(fullLink);
    toast({
      title: 'Link copied to clipboard!',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    initialSlide: 0,
    nextArrow: <FaChevronRight />,
    prevArrow: <FaChevronLeft />,
    beforeChange: (current, next) => setCurrentSlide(next)
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" motionPreset="slideInBottom">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Share</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <p style={{ fontSize: '18px', marginBottom: '10px' }}>Share this link:</p>
          <InputGroup mb={6}>
            <Input type="text" value={window.location.origin + link} readOnly style={{ fontSize: '16px', padding: '10px' }} />
            <InputRightElement width="auto">
              <Button variant="outline-secondary" onClick={handleCopyLink} size="md">
                <FaCopy /> Copy Link
              </Button>
            </InputRightElement>
          </InputGroup>
          <Slider {...settings} style={{ marginTop: '20px' }}>
            {platforms.map((platform, index) => (
              <Button
                key={index}
                onClick={() => handleShare(platform.name)}
                style={{
                  borderRadius: '50%',
                  width: '50px',
                  height: '50px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#007bff',
                  border: 'none',
                  marginBottom: '10px'
                }}
              >
                <platform.icon style={{ color: '#fff', fontSize: '2em' }} />
              </Button>
            ))}
          </Slider>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ShareComponent;
