import React from 'react';
import FeatureCard from '../components/blocks/FeatureCard';
import Socials from '../components/blocks/Socials';
import Text from '../components/blocks/Text';
import Navbar from '../components/blocks/Navbar';
import Button from '../components/blocks/Button';

export const template1 = [
  {
    rules : `
      position: absolute;
      top: 0;
      left: 15%;
      right: 15%;
      z-index: 1000;
      height: 105px;
      width: 70%;
      background-color: transparent;
      color: white;
    `,
    elements : [<Navbar/>]
  },
  {
    rules : `
      width: 100vw;
      display: flex;
      align-items: center;
      height : 800px;
      background-image: url(https://static.pexels.com/photos/186461/pexels-photo-186461.jpeg);
      background-attachment: fixed;
      background-position: 100%;
      background-repeat: no-repeat;
      background-size: cover;
      color : white;

      &:before {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-image: linear-gradient(to left, #00d2ff, #928dab);
        opacity: .4;
        height: 800px; 
      }

      & > div {
        z-index: 10;
        display: flex;
        margin: 0 15%;
        align-items: left;
        flex-flow: column;
        width: 40%;
      }

      @media only screen and (max-width: 1650px){
        & > div {
          width: 50%;
        }
      }
    `,
    elements : [<div><Text type="header" tag="h1" scale="2.5" rules="width: 80%; margin-bottom: 10px;"/> <Text type="subheader" tag="h3" scale="2"/> <Button/></div>]
  },
  {
    rules : `
      width: 100%;
      background-color: #1b1d1f;
      margin: 0 auto;

      & > div {
        display: flex;
        width: 70%;
        margin: 0 auto;
        justify-content: space-around;
        color: white;
        margin-top: 75px;
      }
    `,
    elements : [<div><FeatureCard iconType="fa fa-pie-chart"/><FeatureCard iconType="fa fa-cloud-upload" /><FeatureCard iconType="fa fa-server"/></div>]
  }
];