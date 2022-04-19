import React, { useState, useEffect } from 'react';
import { Stack, Text, FontWeights, IStackTokens, IStackStyles, ITextStyles } from '@fluentui/react';
import logo from './logo.svg';
import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import { Home } from './Home';
import { SetupGame } from './SetupGame';
import { loadTheme, ThemeProvider } from '@fluentui/react';
import { initializeIcons } from '@fluentui/react';
import { PlayGame } from './PlayGame';
import { DefaultPalette, createTheme } from '@fluentui/theme';
import localforage from 'localforage';
import { saveGameToCloud, loadGamesFromCloud } from './TcaCloudApi';

export const buttonStyles = {
  root: {
      padding: 40
      , width: '100%'
      , maxWidth: '100%'     
    }
};

export const buttonTextStyles = { root: { color: DefaultPalette.white}};

export const cardStyles = { 
  root: { 
      width: '100%'
      , maxWidth: '100%' 
      , padding: 20
  }
};

const boldStyle: Partial<ITextStyles> = { root: { fontWeight: FontWeights.semibold } };
const stackTokens: IStackTokens = { childrenGap: 15 };

export interface Player {
  name: string;
  order: number;
  turns: number[];
}

export interface GameResult {
  start: string;
  end: string;
  winner: string;
  players: Player[];

  // tca-zombie-specific...
  expansions: string[];
}

export interface CurrentGame {
  expansions: string[];
  players: Player[];
  start: string;
}


const game1: GameResult = {
  start: "2022-02-14T15:14:30"
  , end: "2022-02-14T15:20:00"
  , winner: "Me"
  , players: [{ name: "Me", order: 1, turns: []}, { name: "Taylor", order: 2, turns: []}, {name: "Jack", order: 3, turns: []}]
  , expansions: ["Santa", "Hunk/Hottie"]
};

// console.log(new Date().toLocaleString());

const game2: GameResult = {
  start: "2022-02-14T21:00:30"
  , end: "2022-02-14T21:30:30"
  , winner: "Stephanie"
  , players: [{ name: "Me", order: 1, turns: []}, { name: "Stephanie", order: 2, turns: []}, {name: "Jack", order: 3, turns: []}]
  , expansions: []
};


let gameResults = [
  game1
  , game2
];

const getUniquePlayers = (results: GameResult[]) => (
  [... new Set(results.flatMap(x => x.players.map(y => y.name)))]
);

const lightTheme = {
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
}};

const darkTheme = createTheme({
  palette: {
    themePrimary: '#8f0a0a',
    themeLighterAlt: '#060000',
    themeLighter: '#170202',
    themeLight: '#2b0303',
    themeTertiary: '#560606',
    themeSecondary: '#7e0909',
    themeDarkAlt: '#9a1919',
    themeDark: '#aa3232',
    themeDarker: '#c05c5c',
    neutralLighterAlt: '#060c2d',
    neutralLighter: '#091036',
    neutralLight: '#101743',
    neutralQuaternaryAlt: '#141d4c',
    neutralQuaternary: '#182153',
    neutralTertiaryAlt: '#2e3870',
    neutralTertiary: '#fcf8f1',
    neutralSecondary: '#fcf9f4',
    neutralPrimaryAlt: '#fdfaf6',
    neutralPrimary: '#faf5eb',
    neutralDark: '#fefdfa',
    black: '#fefefd',
    white: '#040824',
  }});

export const App: React.FunctionComponent = () => {

  const [darkThemeChosen, setDarkThemeChosen] = useState(() => false);
  const [email, setEmail] = useState("");
  const [emailLoaded, setEmailLoaded] = useState(false);

  const loadDarkMode = async () => {
    try {
      const darkMode = await localforage.getItem<boolean>('darkMode');
      console.log(darkMode);
      setDarkThemeChosen(darkMode ?? false);

    } catch (err) {
        // This code runs if there were any errors.
        console.error(err);
        setDarkThemeChosen(false);
    }    
  };

  const loadEmail = async () => {
    try {
      const e = await localforage.getItem<string>('email');
      setEmail(e ?? "");
      setEmailLoaded(true);

    } catch (err) {
        // This code runs if there were any errors.
        console.error(err);
        setEmail("");
        setEmailLoaded(false);
      }    
  };
  
  const loadGameResults = async () => {
    try {
      // const gr = await localforage.getItem<GameResult[]>('gameResults');
      const gr = await loadGamesFromCloud(
        email 
        , "tca-zombie-dice"
      );
      console.log(gr);

      // Run once to get existing 4 games to cloud...
      // gr?.forEach(async x => await saveGameToCloud(
      //   "tsteele@madisoncollege.edu"
      //   , "tca-zombie-dice"
      //   , x.end
      //   , x
      // ));

      setResults(gr ?? []);

    } catch (err) {
        // This code runs if there were any errors.
        console.error(err);
        setResults([]);
    }    
  };

  useEffect(
    () => {
      loadDarkMode();
      loadGameResults();
      loadEmail();
    }
    , [email]
  );

  const setDarkMode = async (dark: boolean) => {
    const d = await localforage.setItem<boolean>("darkMode", dark);
    loadDarkMode();
  };

  // State as useState() until it gets unbearable ! ! !
  const [results, setResults] = useState<GameResult[]>(() => []);

  const [currentGame, setCurrentGame] = useState<CurrentGame>({
    expansions: []
    , players: []
    , start: ""
  });

  const addGameResult = async (gr: GameResult) => {
    const newResults = [
      ...results 
      , gr
    ];

    await localforage.setItem<GameResult[]>("gameResults", newResults);
    loadGameResults();
  };

  const saveAtOwnRisk = async (json: string) => {
    await localforage.setItem<GameResult[]>("gameResults", JSON.parse(json));
    loadGameResults();  
  };

  initializeIcons();

  const saveNewEmail = async (e: string) => {
    setEmail(e);
    await localforage.setItem<string>('email', e);
  };

  return (
    <ThemeProvider
      applyTo="body"
      theme={darkThemeChosen ? darkTheme : lightTheme}
    >
      <Stack horizontalAlign="stretch" verticalAlign="stretch" verticalFill tokens={stackTokens}>
        <Routes>
          <Route path="/" element={
            <Home 
              gameResults={results}
              darkMode={darkThemeChosen}
              setDarkMode={setDarkMode}
              uniquePlayers={getUniquePlayers(results)} 
              saveAtOwnRisk={saveAtOwnRisk}
              email={email}
              saveNewEmail={saveNewEmail}
              emailLoaded={emailLoaded}
            />} 
          />
          <Route path="setup" element={
            <SetupGame 
              uniquePlayers={getUniquePlayers(results)} 
              darkTheme={darkThemeChosen}
              setCurrentGame={setCurrentGame}
            />}   
          />
          <Route path="play" element={
            <PlayGame
              currentGame={currentGame} 
              addGameResult={addGameResult}
            />} 
          />
        </Routes>
      </Stack>
    </ThemeProvider>
  );
};
