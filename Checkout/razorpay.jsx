import { Button } from "@chakra-ui/react";

const RazorpayPayment = ({ amount, checkoutHandler }) => {
  //   const openPaymentModal = async () => {
  //     const options = {
  //       key: "YOUR_RAZORPAY_KEY",
  //       amount: 1000, // amount in paisa
  //       currency: "INR",
  //       name: "Your Company Name",
  //       description: "Test Payment",
  //       image: "https://yourcompany.com/logo.png",
  //       handler: function (response) {
  //         console.log(response);
  //       },
  //       prefill: {
  //         name: "Test User",
  //         email: "test.user@example.com",
  //         contact: "9999999999",
  //       },
  //       notes: {
  //         address: "Test Address",
  //       },
  //       theme: {
  //         color: "#3399cc",
  //       },
  //     };

  //     const rzp = new window.Razorpay(options);
  //     rzp.open();
  //   };

  return <Button onClick={() => checkoutHandler(amount)}>Pay with UPI</Button>;
};

export default RazorpayPayment;
