import Head from "next/head";
import Image from "next/image";
import { Container, Title, Header, Subtitle, Paragraph } from "../styles/index";

export default function Home() {
  return (
    <>
      <Head>
        <title>Rahul Jain</title>
      </Head>
      <Container>
        <Header>
          <Image
            src="/PortfolioHeadshot.webp"
            alt="rahuldkjain headshot"
            width={180}
            height={180}
            priority={true}
          />
          <Subtitle>Hey, I'm Rahul Jain</Subtitle>
          <Title>
            I develop interactive <span className="accent-line">web-apps</span>{" "}
            at{" "}
            <a href="https://zolostays.com" target="_blank">
              Zolo
            </a>
          </Title>
          <Paragraph>
            I'm a <strong>Freelancer</strong>, <strong>Animator</strong>, and{" "}
            <strong>Seller on Fiverr(Level 2)</strong>.
          </Paragraph>
        </Header>
      </Container>
    </>
  );
}
