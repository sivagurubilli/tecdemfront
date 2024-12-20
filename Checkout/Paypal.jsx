// import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

import { Box, Button, Image } from "@chakra-ui/react";
import QRCODE from "../../img/QRcode.png";

const PayPalPayment = () => {
  //   const paypalOptions = {
  //     clientId: "YOUR_PAYPAL_CLIENT_ID",
  //   };

  return (
    <Box display="flex" gap="20px" justifyContent="center" alignItems="center">
      <Button colorScheme="purple">
        <a href="https://www.paypal.com/ncp/payment/8MGK98JM54VUW">pay</a>
      </Button>
      <Image src={QRCODE} />
    </Box>
    //     <PayPalScriptProvider options={paypalOptions}>
    //       <PayPalButtons
    //         createOrder={(data, actions) => {
    //           // Create PayPal order
    //           return actions.order.create({
    //             purchase_units: [
    //               {
    //                 amount: {
    //                   value: "10.00",
    //                 },
    //               },
    //             ],
    //           });
    //         }}
    //         onApprove={(data, actions) => {
    //           // Handle payment approval
    //           console.log(data);
    //           console.log(actions);
    //         }}
    //       />
    //     </PayPalScriptProvider>
  );
};

export default PayPalPayment;
