import React, { useState } from 'react'
import styles from './IFlowNew.module.css'
import { Box } from '@chakra-ui/react'
import YouTubeSearch from '../../Youtube'
import IflowCard from '../../MasterBot/IflowCard'

const IFlowNew = () => {

    const [visibleCards, setVisibleCards] = useState('bucketList');
    return (
        <Box className={`padding-2  ${styles?.iFlowContainer}`}>
          
                <Box>
                    <YouTubeSearch />
                </Box>
                <Box>
                    <Box mt={1} overflow={'hidden'}>
                        <IflowCard setVisibleCards={setVisibleCards} visibleCards={visibleCards} />
                    </Box>

                </Box>
           
        </Box>
    )
}

export default IFlowNew