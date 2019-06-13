import * as React from 'react';
import * as WebFont from 'webfontloader';
import { createGlobalStyle, ThemeProvider } from 'styled-components';

import { Colors, ScreenWidthBreakpoints } from './constants';
import 'normalize.css';

const theme = {
  breakpoints: [
    `${ScreenWidthBreakpoints.MOBILE}px`,
    `${ScreenWidthBreakpoints.TABLET}px`,
    `${ScreenWidthBreakpoints.DESKTOP}px`,
  ],
};

const GlobalStyle = createGlobalStyle`
  html {
    font-size: 10px;
    height: 100%;
    font-family: "Montserrat", sans-serif;
    background: ${Colors.GREY_30};
  }
  body {
    font-size: 1.6rem;
    min-height: 100%;
    @media (min-width: ${ScreenWidthBreakpoints.TABLET}px) {
      height: 100%;
    }
  }
  #app {
    height: 100%;
  }
`;

WebFont.load({
  google: {
    families: ['Montserrat:300,400&amp;subset=cyrillic', 'sans-serif'],
  },
});

export interface IProps {
  children: React.ReactChild;
}

export const Theme: React.FunctionComponent<IProps> = ({children}) => (
  <React.Fragment>
    <GlobalStyle/>
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  </React.Fragment>
);
