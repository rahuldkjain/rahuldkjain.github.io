import Head from "next/head";
import Image from "next/image";
import { PROFILES } from "../constants/profiles";
import { WORK } from "../constants/work";
import {
  Container,
  Title,
  Header,
  Subtitle,
  Paragraph,
  SectionTitle,
  WorkSectionContainer,
  WorkTitle,
  WorkDescription,
  WorkExtra,
  ProfilesSectionContainer,
  ProfileItem,
} from "../styles/index";

export default function Home() {
  return (
    <>
      <Head>
        <title>Rahul Jain: Developer, Freelance, & Animator</title>
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
            <a href="https://cred.club/" target="_blank">
              CRED
            </a>
          </Title>
          <Paragraph>
            I'm an <strong>Open Source Contributor</strong>,{" "}
            <strong>Freelancer</strong>, <strong>Animator</strong> &{" "}
            <strong>Seller on Fiverr (Level 2)</strong>.
          </Paragraph>
        </Header>
        <section id="work">
          <SectionTitle align="left">
            <span className="accent-line">Work</span>
          </SectionTitle>
          {WORK &&
            WORK.map((data) => {
              return (
                <WorkSectionContainer key={data.title+data.link}>
                  <WorkTitle>
                    <a href={data.link} target="_blank">
                      {data.title}
                    </a>
                    <span>
                      <Image
                        src="/right-arrow.png"
                        width={18}
                        height={18}
                        alt="external-link"
                      />
                    </span>
                  </WorkTitle>
                  <WorkDescription>{data.description}</WorkDescription>
                  <WorkExtra>{data.extra}</WorkExtra>
                </WorkSectionContainer>
              );
            })}
        </section>
        <section id="profiles">
          <SectionTitle>
            <span className="accent-line">Online Presence</span>
          </SectionTitle>
          <ProfilesSectionContainer>
            {PROFILES &&
              PROFILES.map((profile) => {
                return (
                  <ProfileItem key={profile.title+profile.link}>
                    <a href={profile.link} target="_blank">
                      {profile.title}
                    </a>
                  </ProfileItem>
                );
              })}
          </ProfilesSectionContainer>
        </section>
      </Container>
    </>
  );
}
