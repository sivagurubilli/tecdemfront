import React, { useContext } from 'react'
import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import Styles from "./MobileIBot.module.css"
import BotMobileView from './iBotMobileView/BotMobileView'
import MobileMentor from './MobileMentor/MobileMentor'
import { IBotIflowContext } from '../../../Context/iBotIflowContext'
const MobileIBot = () => {


    const { flowVideos } = useContext(IBotIflowContext);
// console.log(flowVideos?.buckListItems?.length)

    return (
        <div className={Styles?.Container}>
            <Tabs>
                <TabList
                    display="flex"
                    flexWrap="wrap"
                    justifyContent={'space-between'}
                    borderBottom="0px"
                    width={'100%'}
                    padding={'10px'}
                >
                    <Tab
                        _selected={{
                            borderBottom: "4px solid #6534e4",
                            color: "#6534e4",
                            fontWeight: "700",
                            borderRadius: "0px",
                            bgColor: "white",
                        }}
                        _focus={{ boxShadow: "md" }}
                        fontWeight="600"
                        fontSize={["sm", "md", "lg"]}
                        p={["8px", "10px", "12px"]}
                    >
                        iBotControl
                    </Tab>
                    <Tab
                        _selected={{
                            borderBottom: "4px solid #6534e4",
                            color: "#6534e4",
                            fontWeight: "700",
                            borderRadius: "0px",
                            bgColor: "white",
                        }}
                        _focus={{ boxShadow: "md" }}
                        fontWeight="600"
                        fontSize={["sm", "md", "lg"]}
                        p={["8px", "10px", "12px"]}
                    >
                        iMentor
                    </Tab>
                    <Tab
                        _selected={{
                            borderBottom: "4px solid #6534e4",
                            color: "#6534e4",
                            fontWeight: "700",
                            borderRadius: "0px",
                            bgColor: "white",
                        }}
                        _focus={{ boxShadow: "md" }}
                        fontWeight="600"
                        fontSize={["sm", "md", "lg"]}
                        p={["8px", "10px", "12px"]}
                        position={'relative'}
                    >
                         {flowVideos?.buckListItems?.length > 0 && (
    <Box
      position="absolute"
      top="1"
      right="0"
      transform="translate(50%, -50%)"
      bg='transparent'
      color="#805AD5"
      fontSize="xs"
      fontWeight="bold"
      borderRadius="50%"
      border={'1px solid #805AD5'}
      width={'20px'}
      height={'20px'}
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
      zIndex="1"
    >
      {flowVideos?.buckListItems?.length}
    </Box>
  )}
                        BucketList
                    </Tab>
                    <Tab
                        _selected={{
                            borderBottom: "4px solid #6534e4",
                            color: "#6534e4",
                            fontWeight: "700",
                            borderRadius: "0px",
                            bgColor: "white",
                        }}
                        _focus={{ boxShadow: "md" }}
                        fontWeight="600"
                        fontSize={["sm", "md", "lg"]}
                        p={["8px", "10px", "12px"]}
                    >
                        Videos
                    </Tab>
                </TabList>


                <TabPanels>
                    <TabPanel>
                        <BotMobileView />
                    </TabPanel>
                    <TabPanel >
                        <MobileMentor />
                    </TabPanel>
                    {/* <TabPanel>
                <SettingsAccount />
            </TabPanel>
            <TabPanel >
                <SettingNotification />
            </TabPanel>
            <TabPanel>
                <p>Session</p>
            </TabPanel>
            <TabPanel>
              <p>language</p>
            </TabPanel>
            <TabPanel>
              <p>language</p>
            </TabPanel>
            <TabPanel>
              <TimeZones/>
            </TabPanel> */}
                </TabPanels>

            </Tabs>
        </div>
    )
}

export default MobileIBot