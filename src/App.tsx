import React from 'react';
import { Stack, Text, FontWeights, IStackTokens, IStackStyles, ITextStyles } from '@fluentui/react';
import logo from './logo.svg';
import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import { Home } from './Home';

const boldStyle: Partial<ITextStyles> = { root: { fontWeight: FontWeights.semibold } };
const stackTokens: IStackTokens = { childrenGap: 15 };

const SetupGame = () => <h2>Setup Game</h2>;
const PlayGame = () => <h2>Play Game</h2>;

export const App: React.FunctionComponent = () => {
  return (
    <Stack horizontalAlign="center" verticalAlign="start" verticalFill tokens={stackTokens}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="setup-game" element={<SetupGame />} />
        <Route path="play-game" element={<PlayGame />} />
      </Routes>
    </Stack>
  );
};
