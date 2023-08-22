import {
  Center,
  Container,
  FormControl,
  Input,
  Stack,
  Text,
  FormLabel,
  Flex,
  Checkbox,
  Button,
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";
import { object, string, ref } from "yup";
import { Formik, Form, Field } from "formik";
import { Link, useNavigate } from "react-router-dom";
import Card from "../../../components/Card";
import { useMutation } from "react-query";
import { signupUser } from "../../../api/query/userQuery";
import { useState } from "react";

const signupValidationSchema = object({
  name: string().required("Name is required"),
  lastname: string().required("Last name is required"),
  email: string().email("Email is invalid").required("Email is required"),
  password: string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: string()
    .oneOf([ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

const Signup = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const toast = useToast();
  const { mutate, isLoading } = useMutation({
    mutationKey: ["signup"],
    mutationFn: signupUser,
    onSuccess: (data) => {
      if (email !==  ""){
        console.log(email)
        navigate(`/register-email-verify/${email}`);
      }
    },
    onError: (error) => {
      toast({
        title: "SignUp Error",
        description: error.message,
        status: "error",
      });
    },
  });
  return (
    <Container bg={`white`}>
      <Center minH={`100vh`}>
        <Card>
          <Text fontWeight={`medium`} textStyle={`h1`}>
            Welcome to Crypto App
          </Text>
          <Text textStyle={`p2`} color={`black.60`} mt={4}>
            Create a free account by filling data below.
          </Text>
          <Formik
            initialValues={{
              name: "",
              lastname: "",
              email: "",
              password: "",
              confirmPassword: "",
            }}
            onSubmit={(values) => {
              setEmail(values.email);
              mutate({
                firstName: values.name,
                lastName: values.lastname,
                email: values.email,
                password: values.password,
              });
            }}
            validationSchema={signupValidationSchema}
          >
            {() => (
              <Form>
                <Stack mt={10} spacing={6}>
                  <Flex gap={4}>
                    <Field name="name">
                      {({ field, meta }) => (
                        <FormControl isInvalid={!!(meta.error && meta.touched)}>
                          <FormLabel htmlFor={`name`}>Name</FormLabel>
                          <Input
                            {...field}
                            name="name"
                            placeholder="Enter your name..."
                          />
                          <FormErrorMessage>{meta.error}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>

                    <Field name="lastname">
                      {({ field, meta }) => (
                        <FormControl isInvalid={!!(meta.error && meta.touched)}>
                          <FormLabel htmlFor={`lastname`}>Last Name</FormLabel>
                          <Input
                            {...field}
                            name="lastname"
                            placeholder="Enter your last name..."
                          />
                          <FormErrorMessage>{meta.error}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  </Flex>
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

                  <Field name="password">
                    {({ field, meta }) => (
                      <FormControl isInvalid={!!(meta.error && meta.touched)}>
                        <FormLabel htmlFor={`password`}>Password</FormLabel>
                        <Input
                          {...field}
                          name="password"
                          type="password"
                          placeholder="Enter your password..."
                        />
                        <FormErrorMessage>{meta.error}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="confirmPassword">
                    {({ field, meta }) => (
                      <FormControl isInvalid={!!(meta.error && meta.touched)}>
                        <FormLabel htmlFor={`confirmPassword`}>
                          Confirm Password
                        </FormLabel>
                        <Input
                          {...field}
                          name="confirmPassword"
                          type="password"
                          placeholder="Please confirm Password..."
                        />
                        <FormErrorMessage>{meta.error}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Checkbox>
                    <Text textStyle={`p3`}>
                      I agree With{" "}
                      <Text as={`span`} color={`p.purple`}>
                        Terms and Conditions
                      </Text>
                    </Text>
                  </Checkbox>
                  <Button isLoading={isLoading} type="submit">
                    Create Account
                  </Button>
                  <Text
                    textStyle={`p3`}
                    color={`black.60`}
                    textAlign={`center`}
                  >
                    Already have an account?{" "}
                    <Link to="/signin">
                      <Text as={`span`} color={`p.purple`}>
                        Login
                      </Text>
                    </Link>
                  </Text>
                </Stack>
              </Form>
            )}
          </Formik>
        </Card>
      </Center>
    </Container>
  );
};

export default Signup;
