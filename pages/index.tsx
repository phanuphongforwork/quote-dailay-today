import Image from "next/image";
import { DefaultLayout } from "@/components/layouts/default.layout";
import {
  Container,
  Text,
  Button,
  Icon,
  Skeleton,
  SkeletonText,
} from "@chakra-ui/react";
import { useFetchData } from "@/hook/useFetchData";
import { quoteConfig } from "@/configs/quote";
import { QuoteType } from "@/types/quote.type";
import { useToast } from "@chakra-ui/react";
import { RWebShare } from "react-web-share";
import { FiCopy, FiShare2 } from "react-icons/fi";
import Head from "next/head";
import classNames from "classnames";

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
    <>
      <Head>
        <title>Quote Daily Today</title>
        <meta property="og:title" content=" Quote Daily Today" />
        <meta name="description" content="Quote Today" />
        <meta name="description" content="Quote" />
        <meta name="description" content="คำคม" />
        <meta name="description" content="คำคมประจำวัน" />
        <meta name="description" content="คำคม Eng" />
        <meta property="og:image" content="/images/landing.png" />
      </Head>
      <DefaultLayout>
        {quotes.isLoading && (
          <Container>
            <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
            <Skeleton height="4px" mt={12} />
            <div className="flex justify-center mt-12 gap-8">
              <Skeleton height="56px" rounded={"lg"} width={"100px"} />{" "}
              <Skeleton height="56px" rounded={"lg"} width={"100px"} />
            </div>
          </Container>
        )}

        {quotes.data?.map((quote, index) => {
          return (
            <>
              {!quotes.isLoading && (
                <Container key={index} className="p-8 md:p-0">
                  <Text
                    as={"i"}
                    fontSize={{ base: "xl", md: "3xl", lg: "5xl" }}
                  >
                    {"“ "} {quote?.quote} {" ”"}
                  </Text>
                  <Text mt={12}>
                    By{" "}
                    <span className="text-md lg:text-xl font-semibold">
                      {quote?.author}
                    </span>
                  </Text>
                </Container>
              )}

              <Container mt={12}>
                <div className="w-full flex gap-4 justify-center">
                  <Button
                    colorScheme="white"
                    size={"lg"}
                    variant="outline"
                    onClick={() => {
                      handleCopy(quote.quote);
                    }}
                    rightIcon={<Icon as={FiCopy} />}
                  >
                    Copy
                  </Button>

                  <RWebShare
                    data={{
                      text: quote.quote,
                      url: "At Website Quote Daily Today : www.quote-daily-today.xyz",
                      title: "Quote Daily Today",
                    }}
                    onClick={() => console.log("shared successfully!")}
                  >
                    <Button
                      colorScheme="white"
                      color={"white"}
                      size={"lg"}
                      variant={"solid"}
                      rightIcon={<Icon as={FiShare2} />}
                    >
                      Share
                    </Button>
                  </RWebShare>
                </div>
              </Container>
            </>
          );
        })}
      </DefaultLayout>
    </>
  );
}
