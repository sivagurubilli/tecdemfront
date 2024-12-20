import React, { useState } from "react";
import { Progress, Text, Flex } from "@chakra-ui/react";

const PasswordStrengthBar = ({ password }) => {
  const [strength, setStrength] = useState(0);

  const calculateStrength = (password) => {
    if (!password) return 0;
  
    let strength = 0;

    if (password.length >= 8) strength += 1; 
    if (password.length >= 12) strength += 1; 
  

    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[@$!%*?&]/.test(password);
  
    const varietyCount = [hasUppercase, hasLowercase, hasNumber, hasSpecialChar].filter(Boolean).length;
  
    if (varietyCount >= 2) strength += 1; 
    if (varietyCount >= 3) strength += 1; 
  
    if (password.length === 1) return 0;
  
    // Bonus for high uniqueness
    const uniqueChars = new Set(password).size;
    if (uniqueChars >= password.length * 0.8 && password.length > 8) {
      strength += 1;
    }
  
    return Math.min(strength, 6);
  };
  
  React.useEffect(() => {
    setStrength(calculateStrength(password));
  }, [password]);


  const strengthColors = ["red.400", "orange.400", "yellow.400", "green.400", "teal.400","green.900"];
  const strengthLabels = ["Very Weak", "Weak", "Fair", "Good", "Strong","Excellent"];



  if(!password) return null
  return (
    <Flex direction="column" w="100%" mt={3}>
      <Progress
        value={(strength / 5) * 100}
        size="xs"
        borderRadius="md"
        bg="gray.200"
        colorScheme={strengthColors[strength] ? strengthColors[strength].split(".")[0] : "gray"}
        transition="all 0.4s ease"
      />
      <Text mt={2} fontSize="sm" fontWeight="medium" color={strengthColors[strength] || "gray.500"}>
        {strengthLabels[strength] || "Start typing..."}
      </Text>
    </Flex>
  );
};

export default PasswordStrengthBar;
