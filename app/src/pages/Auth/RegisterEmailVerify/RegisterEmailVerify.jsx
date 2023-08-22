import {
  Box,
  Button,
  Center,
  Container,
  Icon,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import Card from "../../../components/Card";
import { MdEmail } from "react-icons/md";
import { useParams } from "react-router-dom";
import { useMutation } from "react-query";
import { sendVerificationMail } from "../../../api/query/userQuery";
import { useEffect } from "react";
const RegisterEmailVerify = () => {
  const toast = useToast();
  const { email } = useParams();
  
  console.log(location);
  if (email == "") {
    return <Center h={`100vh`}>Invalid Email</Center>;
  }

  const { mutate, isLoading } = useMutation({
    mutationKey: ["send-verification-mail"],
    mutationFn: sendVerificationMail,
    onSettled: (data) => {
      console.log(data);
    },
    onError: (error) => {
      toast({
        title: "SignUp Error",
        description: error.message,
        status: "error",
      });
    },
    enabled: !!email,
  });

  useEffect(() => {
    mutate({ email });
  }, []);


  return (
    <Container>
      <Center minH={`100vh`}>
      <Card
            p={{
              base: "4",
              md: "10",
            }}
            showCard={`true`}
          >
            <VStack spacing={`6`}>
              <Icon as={MdEmail} boxSize={`48px`} color={`p.purple`} />
              <Text textStyle={`h4`} fontWeight={`medium`} color={`p.black`}>
                Email Verification
              </Text>
              <Text textAlign={`center`} textStyle={`p2`} color={`black.60`}>
                We have sent you an email verifiaction to{" "}
                <Box as="b" color={`p.black`}>
                  {email}
                </Box>
                . If you didn't receive it, click the button below.
              </Text>
              <Button isLoading={isLoading}
                w={`full`}
                variant={`outline`}
                onClick={() => {
                  mutate({ email });
                }}
              >
                Re-Send Email
              </Button>
            </VStack>
          </Card>
      </Center>
    </Container>
  );
};

export default RegisterEmailVerify;
