import { Box } from '@chakra-ui/react'
import React, { useState } from 'react'
import MentorFullScreen from '../MasterBot/IBotFullScreen/MentorFullScreen/MentorFullScreen'
import IFlowFullScreen from '../MasterBot/IflowCard'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'

import styles from './YoutubeFullScreen.module.css'
import YoutubeScreen from './YoutubeScreen/YoutubeScreen'
import { TecButton } from '../elements/elements'

const YoutubeFullScreen = () => {

    const [visibleCards, setVisibleCards] = useState('bucketList');
  return (
    <DndProvider backend={HTML5Backend}>
      
    <div className={styles.container}>
    <div className={styles.leftContainer}>
<YoutubeScreen />
    </div>
 <div className={styles.rightContainer}>
 <Box className={styles?.mentorContainer} height="50%">
    <MentorFullScreen />
  </Box>
  <Box height="50%" mt={{ base: 2, md: 2 }}>
    <IFlowFullScreen setVisibleCards={setVisibleCards} visibleCards={visibleCards} />
  </Box>
 </div>
    </div>
    </DndProvider>
  )
}

export default YoutubeFullScreen