import { useNavigate } from 'react-router-dom';
import { DefaultButton, PrimaryButton, CompoundButton } from '@fluentui/react/lib/Button';
import { Text } from '@fluentui/react/lib/Text';
import { Stack, StackItem } from '@fluentui/react/lib/Stack';
import { CommandBar, Icon } from '@fluentui/react';
import {
    DocumentCard,
    DocumentCardActivity,
    DocumentCardTitle,
    DocumentCardLogo,
    DocumentCardStatus,
    IDocumentCardLogoProps,
    IDocumentCardActivityPerson,
    IDocumentCardStyles,
  } from '@fluentui/react/lib/DocumentCard';
import { DefaultPalette } from '@fluentui/theme';
import { GameResult, buttonStyles, buttonTextStyles, cardStyles } from "./App";
import { DetailsList, DetailsListLayoutMode, Selection, IColumn, SelectionMode } from '@fluentui/react/lib/DetailsList';

interface HomeProps {
    gameResults: GameResult[];
    darkMode: boolean;
    setDarkMode: any;
    uniquePlayers: string[];
};

const stackItemStyles = { 
    root: { 
        display: 'flex'
        , justifyContent: 'center' 
    }
};

const calculateLeaderBoard = (p: string[], r: GameResult[]) => {

    const lb = p.map(x => {
  
      const gamesThisPlayerHasPlayed = r.filter(y => y.players.length > 1 && y.players.some(z => z.name === x));
      const gamesThisPlayerHasWon = gamesThisPlayerHasPlayed.filter(y => y.winner === x);
  
      return {
        name: x
        , wins: gamesThisPlayerHasWon.length
        , losses: gamesThisPlayerHasPlayed.length - gamesThisPlayerHasWon.length
        , average: (gamesThisPlayerHasWon.length / gamesThisPlayerHasPlayed.length).toFixed(3)
      };
    });
  
    console.log("calculateLeaderBoard", lb);
  
    return lb.sort((a, b) => `${b.average}${b.wins + b.losses}`.localeCompare(`${a.average}${a.wins + a.losses}`));
};

const calculateFewestTurnWins = (p: string[], r: GameResult[]) => {

    const data = p.map(x => {
  
      const gamesThisPlayerHasPlayed = r.filter(y => y.players.some(z => z.name === x));
      const soloGamesThisPlayerHasWon = gamesThisPlayerHasPlayed.filter(y => y.players.length === 1 && y.winner === x);
      const gamesThisPlayerHasWon = gamesThisPlayerHasPlayed.filter(y => y.players.length > 1 && y.winner === x);
  
      const soloMinTurns = Math.min(...soloGamesThisPlayerHasWon.flatMap(y => y.players.map(z => z.turns.length)));
      const competitiveMinTurns = Math.min(...gamesThisPlayerHasWon.flatMap(y => y.players.map(z => z.turns.length)));

      return {
        name: `${x}${soloMinTurns < competitiveMinTurns ? ' (solo)' : ''}`
        , fewestTurns: Math.min(soloMinTurns, competitiveMinTurns)
      };
    });
  
    return data
        .sort((a, b) => a.fewestTurns > b.fewestTurns ? 1 : -1)
        .map(x => ({
            ...x
            , fewestTurns: isFinite(x.fewestTurns) ? x.fewestTurns.toString() : "n/a"
        }))
    ;
};


export const Home: React.FC<HomeProps> = ({
    gameResults
    , darkMode
    , setDarkMode
    , uniquePlayers
}) => {

    const nav = useNavigate();

    const lastGame = Math.max(...gameResults.map(x => Date.parse((x as any).end)));
    const daysAgo = (Date.now() - lastGame)/ (1000 * 60 * 60 * 24);    
    const lastPlayedDisplay = daysAgo < 1 
        ? 'Today'
        : isFinite(daysAgo) 
            ? `${daysAgo.toFixed(0)}` 
            : 'Never'


    const leaderboardData = calculateLeaderBoard(
        uniquePlayers 
        , gameResults
    );

    const fewestTurnData = calculateFewestTurnWins(
        uniquePlayers 
        , gameResults
    );

    return (

        <Stack
            tokens={{
                padding: 10
                , childrenGap: 10
            }}
        >
            <Stack.Item
                align='stretch'
                styles={stackItemStyles}
            >
                <PrimaryButton
                    // onMenuClick={(e) => console.log(e)}
                    // split
                    // menuProps={{ items: [
                    //     {
                    //         key: "theme"
                    //         , text: darkMode ? "Light Mode" : "Dark Mode"
                    //         , onClick: () => setDarkMode(!darkMode)
                    //     }
                    // ]}}
                    onClick={() => nav("/setup")}
                    styles={buttonStyles}
                >
                    <Stack>
                        <Text
                            variant='xxLarge'
                            styles={buttonTextStyles}
                        >
                            Play Zombie Dice
                        </Text>
                        <Text 
                            variant="medium"
                            styles={buttonTextStyles}
                        >
                            And track your stats...
                        </Text>
                    </Stack>
                </PrimaryButton>
            </Stack.Item>

            <Stack.Item
                align='stretch'
                styles={stackItemStyles}
            >
                <DocumentCard
                    styles={cardStyles}
                >

                    <Stack tokens={{ childrenGap: 10}}>
                        <Text variant="large">Last Played</Text>

                        <Stack horizontal tokens={{ childrenGap: 10}} styles={{root: {justifyContent: "start", alignItems: "end"}}}>
                            <Text
                                variant="mega"
                            >
                                {lastPlayedDisplay}
                            </Text>
                            {
                                lastPlayedDisplay !== 'Today' && lastPlayedDisplay !== 'Never' && 
                                <Text
                                    variant="xLarge"
                                    styles={{root: { marginBottom: 13}}}
                                >
                                    days ago
                                </Text>
                            }

                        </Stack>
                    </Stack>


                </DocumentCard>
            </Stack.Item>

            {/* <Stack.Item
                align='stretch'
                styles={stackItemStyles}
            >
                <DocumentCard
                    styles={cardStyles}
                >
                    <Stack
                        horizontal
                    >
                        <Stack tokens={{ childrenGap: 10}}>
                            <Text variant="large">Time Played</Text>
                            <Text variant="xxLarge">0h 27m 03s</Text>
                        </Stack>
                    </Stack>
                </DocumentCard>
            </Stack.Item> */}

            <Stack.Item
                align='stretch'
                styles={stackItemStyles}
            >
                <DocumentCard
                    styles={cardStyles}
                >
                    <Stack tokens={{ childrenGap: 10}}>
                        <Text variant="large">Total Games Played</Text>
                        <Text
                            variant="mega"
                        >
                            {gameResults.length}
                        </Text>
                    </Stack>
                </DocumentCard>
            </Stack.Item>

            <Stack.Item
                align='stretch'
                styles={stackItemStyles}
            >
                <DocumentCard
                    styles={cardStyles}
                >
                    <DefaultButton
                        styles={buttonStyles}
                        onClick={() => setDarkMode(!darkMode)}
                    >
                        <Text variant='large'>
                            Try {darkMode ? "Light" : "Dark"} Mode
                        </Text>
                    </DefaultButton>                
                </DocumentCard>
            </Stack.Item>

            <Stack.Item
                align='stretch'
                styles={stackItemStyles}
            >
                <DocumentCard
                    styles={cardStyles}
                >
                    <Text variant="large">Leaderboard</Text>
                    <DetailsList
                        compact={true}
                        selectionMode={SelectionMode.none}
                        items={leaderboardData}
                        layoutMode={DetailsListLayoutMode.justified}
                        columns={[
                            {key: 'wins', name: 'W', fieldName: 'wins', minWidth: 30, maxWidth: 30}
                            , {key: 'losses', name: 'L', fieldName: 'losses', minWidth: 30, maxWidth: 30}
                            , {key: 'avg', name: 'AVG', fieldName: 'average', minWidth: 50, maxWidth: 50}
                            , {key: 'name', name: '', fieldName: 'name', minWidth: 90}
                        ]}
                    />

                </DocumentCard>
            </Stack.Item>

            <Stack.Item
                align='stretch'
                styles={stackItemStyles}
            >
                <DocumentCard
                    styles={cardStyles}
                >
                    <Text variant="large">Fewest Turn Wins</Text>
                    <DetailsList
                        compact={true}
                        selectionMode={SelectionMode.none}
                        items={fewestTurnData}
                        layoutMode={DetailsListLayoutMode.justified}
                        columns={[
                            {key: 'turns', name: '#', fieldName: 'fewestTurns', minWidth: 30, maxWidth: 30}
                            , {key: 'name', name: '', fieldName: 'name', minWidth: 90}
                        ]}
                    />

                </DocumentCard>
            </Stack.Item>

        </Stack>
    );
}