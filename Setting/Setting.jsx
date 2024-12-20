import React from 'react'
import Styles from "./Settings.module.css"
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import SettingNotification from './SettingNotification/SettingNotification'
import SettingsAccount from './SettingsAccount/SettingsAccount'
import TimeZones from './SettingsAccount/TimeZones'

const Setting = () => {
  return (
    <div className={Styles?.Container}>
        <Tabs>
            <TabList borderBottom={"0px"}>
                <Tab
                _selected={{
                    borderBottom: "4px solid #6534e4",
                    color: "#6534e4",
                    fontWeight: "700",
                    borderRadius: "0px",
                    bgColor:"white"
                  }}
                  _focus={{ boxShadow: "md" }}
                  // borderColor="white"
                  // borderTop="3px solid transparent"
                  fontWeight="600">Account</Tab>
                  <Tab
                _selected={{
                    borderBottom: "4px solid #6534e4",
                    color: "#6534e4",
                    fontWeight: "700",
                    borderRadius: "0px",
                    bgColor:"white"
                  }}
                  _focus={{ boxShadow: "md" }}
                  // borderColor="white"
                  // borderTop="3px solid transparent"
                  fontWeight="600"
                  >Notifications</Tab>
                <Tab
                _selected={{
                    borderBottom: "4px solid #6534e4",
                    color: "#6534e4",
                    fontWeight: "700",
                    borderRadius: "0px",
                    bgColor:"white"

                  }}
                  _focus={{ boxShadow: "md" }}
                  // borderColor="white"
                  // borderTop="3px solid transparent"
                  fontWeight="600">Sessions</Tab>
                <Tab
                _selected={{
                    borderBottom: "4px solid #6534e4",
                    color: "#6534e4",
                    fontWeight: "700",
                    borderRadius: "0px",
                    bgColor:"white"
                  }}
                  _focus={{ boxShadow: "md" }}
                  // borderColor="white"
                  // borderTop="3px solid transparent"
                  fontWeight="600"
                  >Language</Tab>
                  <Tab
                _selected={{
                    borderBottom: "4px solid #6534e4",
                    color: "#6534e4",
                    fontWeight: "700",
                    borderRadius: "0px",
                    bgColor:"white"
                  }}
                  _focus={{ boxShadow: "md" }}
                  // borderColor="white"
                  // borderTop="3px solid transparent"
                  fontWeight="600"
                  >Privacy</Tab>
                   <Tab
                _selected={{
                    borderBottom: "4px solid #6534e4",
                    color: "#6534e4",
                    fontWeight: "700",
                    borderRadius: "0px",
                    bgColor:"white"
                  }}
                  _focus={{ boxShadow: "md" }}
                  // borderColor="white"
                  // borderTop="3px solid transparent"
                  fontWeight="600"
                  >Time zone</Tab>
            </TabList>

            <TabPanels>
                <TabPanel>
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
                </TabPanel>
            </TabPanels>
            
        </Tabs>
    </div>
  )
}

export default Setting