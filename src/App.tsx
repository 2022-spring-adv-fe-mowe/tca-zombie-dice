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

export interface Player {
  name: string;
  order: number;
}

export interface SpecialAction {
  die: string;
  action: string;
  value: number;
}

export interface GameResult {
  start: string;
  end: string;
  winner: string;
  players: Player[];

  // tca-zombie-specific...
  expansions?: string[];
  gameTurns?: any[];
}

const game1: GameResult = {
  start: "2022-02-14T15:14:30"
  , end: "2022-02-14T15:20:00"
  , winner: "Me"
  , players: [{ name: "Me", order: 1}, { name: "Taylor", order: 2}, {name: "Jack", order: 3}]
  , expansions: ["Santa", "Hunk/Hottie"]
  , gameTurns: [
      {
          turnNumber: 1
          , playerTurn: [
              {
                  player: "Me"
                  , start: "2022-02-14T15:14:30"
                  , end: "2022-02-14T15:15:22" 
                  , startingTotalScore: 0
                  , brains: 3
                  , endingShotgunCount: 2 // Maybe, data entry ? ? ?
                  , endingTotalScore: 3
                  , specialActions: [
                      {die: "Santa", action: "Helmet", value: 0}
                      , {die: "Hunk", action: "Double Brains", value: 2}
                      , {die: "Hottie", action: "Rescue", value: -2}
                  ]
              }
          ]
      }
      , {
          turnNumber: 2
          , playerTurn: []
      }
  ]
};

// console.log(new Date().toLocaleString());

const game2: GameResult = {
  start: "2022-02-14T21:00:30"
  , end: "2022-02-14T21:30:30"
  , winner: "Stephanie"
  , players: [{ name: "Me", order: 1}, { name: "Stephanie", order: 2}, {name: "Jack", order: 3}]
};


let gameResults = [
  game1
  , game2
];


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
        <Route path="/" element={<Home gameResults={gameResults}/>} />
        <Route path="setup" element={<SetupGame />} />
        <Route path="play" element={<PlayGame />} />
      </Routes>
    </Stack>
  );
};
