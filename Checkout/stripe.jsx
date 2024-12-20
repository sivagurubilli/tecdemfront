import { Box, Button } from "@chakra-ui/react";
import { loadStripe } from "@stripe/stripe-js";
import { CardElement, Elements } from "@stripe/react-stripe-js";
import { useState } from "react";

const stripePromise = loadStripe(
  "pk_test_51P9SNpSFJakEdTh51KWbig1P3Vsk9tAaYNqOLzT22KnC6e6ZM1dxbQZv1AsKkjaJ4sO9JHavbbQUwguLarw3pLvj00bxS0U7Fo"
);

const CheckoutForm = () => {
  const [stripe, setStripe] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe) {
      return;
    }

    // Call your backend to create a payment intent
    const response = await fetch("/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: 1000 }), // replace with your amount
    });

    const { clientSecret } = await response.json();

    // Confirm the card payment
    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: stripe.elements.getElement(CardElement),
        },
      }
    );

    if (error) {
      console.error(error);
    } else {
    }
  };

  return (
    <Box maxH="100%" maxW="100%" bgColor="white">
      <CardElement />
      <Button
        type="submit"
        onClick={handleSubmit}
        colorScheme="blue"
        disabled={!stripe}
      >
        Pay
      </Button>
    </Box>
  );
};

const CardPayment = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default CardPayment;
