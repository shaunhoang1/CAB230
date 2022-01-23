import React from 'react';
import '../App.css';
import './styles.css';
import BgImg from '../img/hello.png'
import styled from 'styled-components';

const Section = styled.section`
  background-image: url(${BgImg});
  height: 1080px;
  display: block;
  background-repeat: no-repeat;
  background-size: contain;
`;

const Content = styled.div`
  width: 100%;
  height: 100px;
`;

const Left = styled.div`
  padding-left: 220px;
  padding-top: 143px;
`;

const Title = styled.p`
  font-size: 55px;
  color: #04050a;
  font-weight: 400;
`;

const Desc = styled.p`
  width: 472px;
  font-size: 20px;
  color: #black;
  line-height: 30px;
  margin-top: 58px;
`;

const Button = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 18px;
  margin-top: 58px;
  width: 371px;
  height: 71px;
  line-height: 71px;
  font-size: 22px;
  text-align: center;
  color: #fff;
  cursor: pointer;
  background: linear-gradient(90deg, #E3F5FF, #000000);
  text-decoration: none;
  box-shadow: 0 15px 14px rgb(0 42 177 / 12%);
`;

const Home = () => {
  return (
    <Section>
    <Content>
        <Left>
          <Title>
            World Happiness Data <br /> 2015-2020
          </Title>
          <Desc>
            "The present moment is filled with joy and happiness.
             If you are attentive, you will see it." —Thich Nhat Hanh
          </Desc>
          <Button href='https://en.wikipedia.org/wiki/World_Happiness_Report' target='_blank'>
            <span>More Details</span>
          </Button>
        </Left>
      </Content>
      </Section>
 
  )
};

export default Home;