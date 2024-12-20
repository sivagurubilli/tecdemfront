import React from "react";
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
  Image,
  Flex,
  Input,
  SimpleGrid,
  FormControl,
  FormLabel,
  DrawerCloseButton,
  Select,
} from "@chakra-ui/react";
import { TecButton } from "../../elements/elements";
import { countries } from "../../../components/Config";

const UserDrawer = ({
  isOpen,
  onClose,
  selectedUser,
  handleFormChange,
  handleFormSubmit,
}) => {
  const dateFormats = [
    "DD-MM-YYYY",
    "DD/MM/YYYY",
    "MM-DD-YYYY",
    "MM/DD/YYYY",
    "DD MMM, YYYY",
  ];

  const timeFormats = ["hh:mm A", "HH:MM"];

  return (
    <Drawer isOpen={isOpen} onClose={onClose} size="sm">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>
          Edit User Details of {selectedUser?.first_name}
        </DrawerHeader>

        <DrawerBody>
          {selectedUser && (
            <form>
              <FormControl mb={4}>
                <FormLabel>Profile Image</FormLabel>
                <Image
                  boxSize="50px"
                  borderRadius="full"
                  src={
                    selectedUser.profile_url || "https://via.placeholder.com/50"
                  }
                  alt="User Profile"
                />
              </FormControl>

              <FormControl mb={4}>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  name="bus_email"
                  value={selectedUser.bus_email}
                  onChange={handleFormChange}
                />
              </FormControl>

              <SimpleGrid columns={2} spacing={4}>
                <FormControl>
                  <FormLabel>First Name</FormLabel>
                  <Input
                    type="text"
                    name="first_name"
                    value={selectedUser.first_name}
                    onChange={handleFormChange}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Last Name</FormLabel>
                  <Input
                    type="text"
                    name="last_name"
                    value={selectedUser.last_name}
                    onChange={handleFormChange}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Role</FormLabel>
                  <Input
                    type="text"
                    name="roles"
                    value={selectedUser.roles}
                    onChange={handleFormChange}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Login Type</FormLabel>
                  <Input
                    type="text"
                    name="login_type"
                    value={selectedUser.login_type}
                    onChange={handleFormChange}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Time Format</FormLabel>
                  <Select
                    name="time_format"
                    value={selectedUser.time_format || ""}
                    onChange={handleFormChange}
                    placeholder="Select Format"
                  >
                    {timeFormats.map((format) => (
                      <option key={format} value={format}>
                        {format}
                      </option>
                    ))}
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel>Date Format</FormLabel>
                  <Select
                    name="date_format"
                    value={selectedUser.date_format || ""}
                    onChange={handleFormChange}
                    placeholder="Select Format"
                  >
                    {dateFormats.map((format) => (
                      <option key={format} value={format}>
                        {format}
                      </option>
                    ))}
                  </Select>
                </FormControl>

                <FormControl>
                  <FormLabel>Time Zone</FormLabel>
                  <Select
                    name="time_zone"
                    value={selectedUser.time_zone || ""}
                    onChange={handleFormChange}
                    placeholder="Select Time Zone"
                  >
                    {countries.map((country) => (
                      <option key={country.timeZone} value={country.timeZone}>
                        {country.timeZone}
                      </option>
                    ))}
                  </Select>
                </FormControl>

                <FormControl>
                  <FormLabel>Mobile Number</FormLabel>
                  <Input
                    type="text"
                    name="mobile_number"
                    value={selectedUser.mobile_number}
                    onChange={handleFormChange}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>City</FormLabel>
                  <Input
                    type="text"
                    name="city"
                    value={selectedUser.city}
                    onChange={handleFormChange}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Country</FormLabel>
                  <Input
                    type="text"
                    name="country"
                    value={selectedUser.country}
                    onChange={handleFormChange}
                  />
                </FormControl>
              </SimpleGrid>
            </form>
          )}
        </DrawerBody>

        <DrawerFooter>
          <Flex w="100%" justifyContent="space-between" alignItems="center">
            <TecButton className="tecSecondaryButton">Reset Password</TecButton>
            <Flex gap={2}>
              <TecButton className="tecPrimaryButton" onClick={onClose}>
                Cancel
              </TecButton>
              <TecButton className="tecSecondaryButton" onClick={handleFormSubmit}>
                Save
              </TecButton>
            </Flex>
          </Flex>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default UserDrawer;
