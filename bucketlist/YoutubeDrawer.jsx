// DrawerComponent.js
import React from 'react';
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Text,
  Box
} from '@chakra-ui/react';
import ReactPlayer from "react-player";
import CommentTab from '../components/CommentTab'
const YoutubeDrawer = ({ isOpen, onClose,step }) => {

  return (
    <Drawer size={'md'} isOpen={isOpen} placement="right" onClose={onClose}>

      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>{step?.type=='videos'?'Youtube':'Course'}</DrawerHeader>

        <DrawerBody >
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${step?.id}`}
          width="100%"
          height="300px"
          controls
        />
        <Box mt={3}>   <Text mt={3} fontWeight={'bold'}>{step?.title}</Text></Box>
        <CommentTab cId={ step?.fullData?.id?.videoId} />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default YoutubeDrawer;
