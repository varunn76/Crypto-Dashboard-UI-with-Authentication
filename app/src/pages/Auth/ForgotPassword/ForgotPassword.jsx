import {
  Button,
  Center,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Icon,
  Input,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import Card from "../../../components/Card";
import { Formik, Form, Field } from "formik";
import { object, string } from "yup";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { sendForgotMail } from "../../../api/query/userQuery";
import { useMutation } from "react-query";
import { useState } from "react";

const ForgotPassword = () => {
  const forgotValidationSchema = object({
    email: string().email("Email is invalid").required("Email is required"),
  });

  const [email, setEmail] = useState("");

  const toast = useToast();
  const navigate = useNavigate();
  const { mutate, isLoading } = useMutation({
    mutationKey: ["forgot-email"],
    mutationFn: sendForgotMail,
    onSettled: (data) => {
      if(email){
        navigate(`/forgot-success/${email}`);
      }
    },
    onError: (error) => {
      toast({
        title: "Forgot Error",
        description: error.message,
        status: "error",
      });
    },
  });

  return (
    <Container>
      <Center minH={`100vh`}>
        <Card>
          <Link to="/signin" boxSize={6}>
            <Icon as={AiOutlineArrowLeft} />
          </Link>
          <Text mt={4} fontWeight={`medium`} textStyle={`h1`}>
            Forgot Password
          </Text>
          <Text textStyle={`p2`} color={`black.60`} mt={4}>
            Enter your email address for which account you want to reset your
            password.
          </Text>
          <Formik
            initialValues={{
              email: "",
            }}
            onSubmit={(values) => {
              setEmail((prev) => (prev = values.email));
              mutate({ email: values.email });
            }}
            validationSchema={forgotValidationSchema}
          >
            {() => (
              <Form>
                <Stack mt={8} spacing={6}>
                  <Field name="email">
                    {({ field, meta }) => (
                      <FormControl isInvalid={!!(meta.error && meta.touched)}>
                        <FormLabel htmlFor={`email`}>Email</FormLabel>
                        <Input
                          {...field}
                          name="email"
                          type="email"
                          placeholder="Enter your email..."
                        />
                        <FormErrorMessage>{meta.error}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Button isLoading={isLoading} w={`full`} type="submit">
                    Reset Password
                  </Button>
                </Stack>
              </Form>
            )}
          </Formik>
        </Card>
      </Center>
    </Container>
  );
};

export default ForgotPassword;
