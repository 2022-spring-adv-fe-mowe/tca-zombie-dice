import React from 'react';
import { Stack, Text, FontWeights, IStackTokens, IStackStyles, ITextStyles } from '@fluentui/react';
import logo from './logo.svg';
import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import { Home } from './Home';
import { SetupGame } from './SetupGame';
import { loadTheme } from '@fluentui/react';
import { initializeIcons } from '@fluentui/react';
import { PlayGame } from './PlayGame';

const boldStyle: Partial<ITextStyles> = { root: { fontWeight: FontWeights.semibold } };
const stackTokens: IStackTokens = { childrenGap: 15 };

export const App: React.FunctionComponent = () => {

  loadTheme({
    palette: {
      themePrimary: '#8c1833',
      themeLighterAlt: '#faf2f4',
      themeLighter: '#edcdd5',
      themeLight: '#dda6b2',
      themeTertiary: '#ba5d73',
      themeSecondary: '#9a2a44',
      themeDarkAlt: '#7e152e',
      themeDark: '#6b1227',
      themeDarker: '#4f0d1d',
      neutralLighterAlt: '#eeebe9',
      neutralLighter: '#eae7e6',
      neutralLight: '#e1dedc',
      neutralQuaternaryAlt: '#d1cecd',
      neutralQuaternary: '#c8c5c4',
      neutralTertiaryAlt: '#c0bdbc',
      neutralTertiary: '#a29ecf',
      neutralSecondary: '#5b549f',
      neutralPrimaryAlt: '#2a2472',
      neutralPrimary: '#1b155e',
      neutralDark: '#141048',
      black: '#0f0c35',
      white: '#f5f1f0',
    }});

    initializeIcons();

  return (
    <Stack horizontalAlign="stretch" verticalAlign="stretch" verticalFill tokens={stackTokens}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="setup" element={<SetupGame />} />
        <Route path="play" element={<PlayGame />} />
      </Routes>
    </Stack>
  );
};
