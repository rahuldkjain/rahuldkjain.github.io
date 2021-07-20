import Head from "next/head";
import { Container, Title } from "../styles/index";

export default function Home() {
  return (
    <>
      <Head>
        <title>Next.js with styled-components Boilerplate</title>
      </Head>
      <Container>
        <Title>Next.js + styled-components = FUN</Title>
      </Container>
    </>
  );
}
