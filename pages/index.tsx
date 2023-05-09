import Image from "next/image";
import { DefaultLayout } from "@/components/layouts/default.layout";
import { Container, Text, Button } from "@chakra-ui/react";
import { useFetchData } from "@/hook/useFetchData";
import { quoteConfig } from "@/configs/quote";
import { QuoteType } from "@/types/quote.type";
import { useToast } from "@chakra-ui/react";

export default function Home() {
  const toast = useToast();
  const quotes = useFetchData<QuoteType[]>(quoteConfig.requestUrl);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);

    toast({
      title: "Copy To Clipboard",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <DefaultLayout>
      {quotes.data?.map((quote, index) => {
        return (
          <>
            <Container key={index} className="p-8 md:p-0">
              <Text as={"i"} fontSize={{ base: "xl", md: "3xl", lg: "5xl" }}>
                {"“ "} {quote?.quote} {" ”"}
              </Text>
              <Text mt={12}>
                By{" "}
                <span className="text-lg lg:text-xl font-semibold">
                  {quote?.author}
                </span>
              </Text>
            </Container>

            <Container mt={12}>
              <div className="w-full flex gap-4 justify-center">
                <Button
                  colorScheme="white"
                  size={"lg"}
                  variant="outline"
                  onClick={() => {
                    handleCopy(quote.quote);
                  }}
                >
                  Copy
                </Button>
              </div>
            </Container>
          </>
        );
      })}
    </DefaultLayout>
  );
}
