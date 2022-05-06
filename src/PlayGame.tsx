import { DefaultPalette, Persona, PersonaSize, Stack, Icon, Link, ChoiceGroup, Dropdown, IDropdownOption } from '@fluentui/react';
import { Text } from '@fluentui/react/lib/Text';
import { DefaultButton, PrimaryButton, CompoundButton } from '@fluentui/react/lib/Button';
import { useNavigate } from 'react-router-dom';
import { CurrentGame, Player, GameResult, buttonStyles } from './App';
import { useState } from 'react';
import { Panel, PanelType } from '@fluentui/react/lib/Panel';

interface PlayGameProps {
    currentGame: CurrentGame;
    addGameResult: (gr: GameResult) => void
}

interface PlayerInGame extends Player {
    currentBrainTotal: number;
    turns: any[];
}

const santaSpecials = [
    {
        key: "none"
        , text: "None"
    }
    , {
        key: "brains"
        , text: "Brain(s)"
    }
    , {
        key: "helmet"
        , text: "Helmet"
    }
    , {
        key: "energy"
        , text: "Energy"
    }
];

export const PlayGame: React.FC<PlayGameProps> = ({ 
    currentGame
    , addGameResult
}) => {

    const nav = useNavigate();

    const [activePlayer, setActivePlayer] = useState<PlayerInGame | undefined>(undefined);
    const [currentTurnPoints, setCurrentTurnPoints] = useState(0);


    const [playersInOrder, setPlayersInOrder] = useState<PlayerInGame[]>([]);

    const [santaSpecial, setSantaSpecial] = useState<IDropdownOption>();

    const [winner, setWinner] = useState("");
    const [activePlayers, setActivePlayers] = useState<PlayerInGame[]>([]);

    const [lastPlayerResult, setLastPlayerResult] = useState<{points: number, player: PlayerInGame} | undefined>(undefined);

    const undoLastTurn = () => {
        if (lastPlayerResult) {

            // Subtact the undo score from player current score.
            lastPlayerResult.player.currentBrainTotal -= lastPlayerResult.points;

            // Remove an item from the player turns array.
            lastPlayerResult.player.turns = lastPlayerResult.player.turns.filter((x, i) => i !== lastPlayerResult.player.turns.length - 1);

            // Set the current player and current turn points
            // to what is store in lastPlayerResult state.
            setCurrentTurnPoints(lastPlayerResult.points);
            setActivePlayer(lastPlayerResult.player);

            // And clear out lastPlayerResult... Can only undo last one ! ! !
            setLastPlayerResult(undefined);

            // And if still choosing players, undo the last player choice...
            //
            // i-o-g
            if (playersInOrder.length < currentGame.players.length) {
                setPlayersInOrder(playersInOrder.filter((x, i) => i != playersInOrder.length - 1));
            } 
        }
    };

    const showChoosePlayerPanel =
        !activePlayer
        && playersInOrder.length < currentGame.players.length
        ;

    const playerChosen = (player: string) => {

        const newPlayerInGame: PlayerInGame = {
            name: player
            , order: playersInOrder.length + 1
            , currentBrainTotal: 0
            , turns: []
        }

        setActivePlayer(newPlayerInGame);

        setPlayersInOrder([
            ...playersInOrder
            , newPlayerInGame
        ]);

        setActivePlayers([
            ...activePlayers
            , newPlayerInGame
        ]);
    };

    const endPlayerTurn = (player: PlayerInGame, died: boolean) => {

        //
        // Update player turns and score (if didn't die).
        //

        // Number array of points...
        // Good enough for biggest turn ever ! ! !
        player.turns = [
            ...player.turns
            , died ? 0 : currentTurnPoints
        ];

        // If not dead, update current player points.
        if (!died) {
            player.currentBrainTotal += currentTurnPoints;
        }        

        setLastPlayerResult({
            points: died ? 0 : currentTurnPoints
            , player: player
        });

        // Trigger choose player number if not all chosen.
        if (playersInOrder.length < currentGame.players.length) {
            setActivePlayer(undefined);
        }

        // Otherwise, next player until game ends.
        else {

            if (
                // The last active player has just played ! ! !
                player === activePlayers[activePlayers.length - 1]
            ) {
                console.log("Last Effing Player this Turn ! ! !");
                
                // Game over, we have a winner ? ? ?
                if (false) {
                 // setWinner(leaders[0].name);
                }
                
                // Otherwise setup the next turn active players.
                else {
                    const highestScore = Math.max(...playersInOrder.map(x => x.currentBrainTotal));

                    const ap = 
                        highestScore < 13

                        // Everybody active if nobody over 13 ! ! !
                        ? playersInOrder 

                        // Otherwise just those previous active players that have the highest score.
                        : playersInOrder.filter(x => x.currentBrainTotal === highestScore);
        
                    if (ap.length === 1 && ap[0].currentBrainTotal >= 13) {
                        setWinner(ap[0].name); 
                    }

                    else {
                        setActivePlayers(ap);
                        setActivePlayer(ap[0]);
                    }
                }
            }

            else {

                // Who's next ? ? ?
                const upcomingPlayers = activePlayers.filter(x => x.order > player.order);
                setActivePlayer(upcomingPlayers.length > 0 ? upcomingPlayers[0] : activePlayers[0]);
            }
        }

        // Reset turn state for next player.
        setCurrentTurnPoints(0);
        setSantaSpecial(santaSpecials[0]);
    };

    const addTurnPoints = (p: number) => {

        // Don't go negative, but record Rescues of currently
        // rolled dice ! ! !
        // if (Math.abs(p) > currentTurnPoints) {
        //     return;
        // }

        setCurrentTurnPoints(currentTurnPoints + p);
    };

    const hunkAndHottieUsed = currentGame.expansions.findIndex(x => x === "Hunk & Hottie") >= 0;
    const santaUsed = currentGame.expansions.findIndex(x => x === "Santa") >= 0;

    const endGame = () => {

        // Save a game result somewhere.
        addGameResult({
            expansions: currentGame.expansions
            , start: currentGame.start
            , end: new Date().toISOString()
            , winner: winner
            , players: playersInOrder
        });

        // Navigate back to home.
        nav(-2);
    };

    const highestTurn = Math.max(...playersInOrder.flatMap(x => x.turns));
    const bestSingleTurnPlayers = playersInOrder
        .filter(x => x.turns.some(y => y === highestTurn))
        .map(x => x.name)
    ;
    const bestSingleTurn = `${bestSingleTurnPlayers.join(", ")} (${highestTurn} brains)`;

    const playerZeroTurns = playersInOrder.map(x => ({
        name: x.name
        , zeroTurnCount: x.turns.filter(y => y === 0).length
    }));
    const mostZeroTurnsCount = Math.max(...playerZeroTurns.map(x => x.zeroTurnCount));
    const mostZeroTurns = `${playerZeroTurns.filter(x => x.zeroTurnCount === mostZeroTurnsCount).map(x => x.name).join(', ')} (${mostZeroTurnsCount} turns)`;

    return (
        <Stack style={{ padding: 30 }}>
            <Panel
                type={PanelType.smallFixedNear}
                hasCloseButton={false}
                isOpen={winner.length > 0}
                headerText={"Game Over"}
            >
                <Stack
                    tokens={{ childrenGap: 30 }}
                    styles={{ root: { marginTop: 40 } }}
                >
                    <PrimaryButton
                        styles={{
                            root: {
                                padding: 30
                            }
                        }}
                        onClick={endGame}
                    >
                        <Text
                            variant='large'
                            styles={{
                                root: {
                                    color: DefaultPalette.white
                                }
                            }}
                        >
                            {winner} Won
                        </Text>
                    </PrimaryButton>
                    {/* <DefaultButton
                        styles={{
                            root: {
                                padding: 30
                            }
                        }}
                        onClick={() => setWinner("")}
                    >
                        <Text
                            variant='large'
                        >
                            Cancel
                        </Text>
                    </DefaultButton>    
                    <Text
                        variant='medium'
                    >
                        Note: Cancel will take you back to score screen and allow "adjustments"...
                    </Text>            
                    <Text
                        variant='medium'
                    >
                        However, your stats &amp; fun facts will likely be messed up a bit : - (
                    </Text>             */}
                    <Text
                        variant='xLarge'
                    >
                        Game Facts
                    </Text>        
                    <Text
                        variant='large'
                        styles={{ root: { marginBottom: -25 } }}
                    >
                        Most Zero Turns:
                    </Text>        
                    <Text
                        variant='large'
                    >
                        {mostZeroTurns}
                    </Text>        
                    <Text
                        variant='large'
                        styles={{ root: { marginBottom: -25 } }}
                    >
                        Best Single Turn:
                    </Text>        
                    <Text
                        variant='large'
                    >
                        {bestSingleTurn}
                    </Text>        
                </Stack>
            </Panel>
            <Panel
                type={PanelType.smallFixedNear}
                hasCloseButton={false}
                isOpen={showChoosePlayerPanel}
                headerText={`Choose Player ${playersInOrder.length + 1}`}
            >
                <Stack
                    tokens={{ childrenGap: 30 }}
                    styles={{ root: { marginTop: 40 } }}
                >
                    {
                        currentGame.players
                            .filter(x => playersInOrder.findIndex(y => y.name === x.name) === -1)
                            .map(x => (
                                <PrimaryButton
                                    key={x.name}
                                    styles={{
                                        root: {
                                            padding: 30
                                        }
                                    }}
                                    onClick={() => playerChosen(x.name)}
                                >
                                    <Text
                                        variant='large'
                                        styles={{
                                            root: {
                                                color: DefaultPalette.white
                                            }
                                        }}
                                    >
                                        {x.name}
                                    </Text>
                                </PrimaryButton>
                            ))
                    }
                </Stack>
            </Panel>
            <Stack
                tokens={{ childrenGap: 20 }}
            >
                {playersInOrder.map(x => (
                    <Stack
                        tokens={{ childrenGap: 20 }}
                    >
                        <Stack
                            horizontal
                            tokens={{ childrenGap: 20 }}
                            styles={{ root: { alignItems: "center" } }}
                        >
                            <Icon
                                iconName='CubeShape'
                                styles={{
                                    root: {
                                        fontSize: 40
                                        , color: DefaultPalette.redDark
                                        , opacity: activePlayer === x ? 1 : 0
                                    }
                                }}
                            />
                            <Stack
                                key={x.name}
                                tokens={{ childrenGap: 0 }}
                            >
                                <Text
                                    variant='xLarge'
                                >
                                    {x.name}
                                </Text>
                                <Stack
                                    horizontal
                                    tokens={{ childrenGap: 15 }}
                                >
                                    <Text
                                        variant='xLargePlus'
                                    >
                                        {x.currentBrainTotal}
                                        {
                                            activePlayer === x && (
                                                <Text
                                                    variant="xLarge"
                                                    styles={{ root: { color: DefaultPalette.redDark } }}
                                                >
                                                    {` + ${currentTurnPoints} = ${x.currentBrainTotal + currentTurnPoints}`}
                                                </Text>
                                            )
                                        }
                                    </Text>
                                    {/* <Text
                                        variant='xLarge'
                                        styles={{root: {textDecoration: "line-through"}}}
                                    >
                                        0
                                    </Text> */}
                                </Stack>

                            </Stack>
                        </Stack>
                        {
                            activePlayer === x && (
                                <Stack
                                    styles={{ root: { marginLeft: 60 } }}
                                    tokens={{ childrenGap: 3 }}
                                >
                                    {
                                        false && 
                                        santaUsed
                                        && (
                                            <>
                                                <Text
                                                    variant='medium'
                                                    styles={{ root: { marginBottom: 0 } }}
                                                >
                                                    Santa
                                                    {santaSpecial?.key === "brains" && " (score below)"}
                                                    {santaSpecial?.key === "energy" && " (green feet are brains)"}
                                                    {santaSpecial?.key === "helmet" && " (need 4 shotguns to die)"}
                                                </Text>
                                                <Stack
                                                    horizontal
                                                    styles={{ root: { justifyContent: "begin" } }}
                                                    tokens={{ childrenGap: 3 }}
                                                    wrap
                                                >
                                                    <Dropdown
                                                        options={santaSpecials}
                                                        onChange={(e, o) => setSantaSpecial(o)}
                                                        selectedKey={santaSpecial ? santaSpecial?.key : "none"}
                                                    />

                                                    {
                                                        santaSpecial?.key === "energy" &&
                                                            <>
                                                            <DefaultButton
                                                                onClick={() => addTurnPoints(1)}
                                                            >
                                                                <Text variant='large'>+1</Text>
                                                            </DefaultButton>
                                                            <DefaultButton
                                                                onClick={() => addTurnPoints(2)}
                                                            >
                                                                <Text variant='large'>+2</Text>
                                                            </DefaultButton>
                                                            <DefaultButton
                                                                onClick={() => addTurnPoints(3)}
                                                            >
                                                                <Text variant='large'>+3</Text>
                                                            </DefaultButton>
                                                            </>
                                                    }
                                                </Stack>

                                            </>
                                        )
                                    }

                                    {
                                        false &&
                                        hunkAndHottieUsed
                                        && (
                                            <>
                                                <Text
                                                    variant='medium'
                                                    styles={{ root: { marginBottom: 0 } }}
                                                >
                                                    Rescues!
                                                </Text>
                                                <Stack
                                                    horizontal
                                                    styles={{ root: { justifyContent: "begin" } }}
                                                    tokens={{ childrenGap: 3 }}
                                                    wrap
                                                >
                                                    <DefaultButton
                                                        styles={{
                                                            root: {
                                                                padding: 10
                                                            }
                                                        }}
                                                        menuProps={{
                                                            items: [
                                                                ...(
                                                                    currentTurnPoints >= 1
                                                                        ? [
                                                                            {
                                                                                key: "saved"
                                                                                , text: "Saved Hottie Rescued"
                                                                                , onClick: () => addTurnPoints(-1)
                                                                            }
                                                                        ]
                                                                        : []
                                                                )
                                                                , {
                                                                    key: "rolled"
                                                                    , text: "Rolled Hottie Rescued"
                                                                    , onClick: () => console.log("Rolled Hottie Rescued")
                                                                }
                                                            ]
                                                        }}
                                                    >
                                                        <Text
                                                            variant='large'
                                                        >
                                                            -1 &nbsp;
                                                        </Text>
                                                    </DefaultButton>
                                                    <DefaultButton
                                                        menuProps={{
                                                            items: [
                                                                ...(
                                                                    currentTurnPoints >= 2
                                                                        ? [
                                                                            {
                                                                                key: "saved"
                                                                                , text: "Saved Hunk Rescued"
                                                                                , onClick: () => addTurnPoints(-2)
                                                                            }
                                                                        ]
                                                                        : []
                                                                )
                                                                , {
                                                                    key: "rolled"
                                                                    , text: "Rolled Hunk Rescued"
                                                                    , onClick: () => console.log("Rolled Hunk Rescued")
                                                                }
                                                            ]
                                                        }}
                                                    >
                                                        <Text variant='large'>-2 &nbsp;</Text>
                                                    </DefaultButton>
                                                    {/* {
                                                        // Can only rescue 3 if santa in play too ! ! !
                                                        santaUsed &&
                                                        <DefaultButton
                                                            onClick={() => addTurnPoints(-3)}
                                                        >
                                                            <Text variant='large'>-3</Text>                                
                                                        </DefaultButton>
                                                    } */}
                                                </Stack>

                                            </>
                                        )
                                    }
                                    {/* <Text
                                        variant='medium'
                                        styles={{ root: { marginBottom: 0 } }}
                                    >
                                        Brainnns!
                                    </Text> */}
                                    <DefaultButton
                                        styles={buttonStyles}
                                        onClick={() => addTurnPoints(1)}
                                    >
                                        <Stack>
                                            <Text variant='xxLarge'>+1</Text>
                                            <Text variant='large'>Tally Brainnns!</Text>
                                        </Stack>
                                    </DefaultButton>
                                    <DefaultButton
                                        styles={buttonStyles}
                                        onClick={() => addTurnPoints(-1)}
                                    >
                                        <Stack>
                                            <Text variant='xxLarge'>-1</Text>
                                            <Text variant='large'>{`Correction${hunkAndHottieUsed ? ' or Rescue!' : ''}`}</Text>

                                        </Stack>
                                    </DefaultButton>

                                    {/* <Stack
                                        horizontal
                                        styles={{ root: { justifyContent: "begin" } }}
                                        tokens={{ childrenGap: 3 }}
                                        wrap
                                    >
                                        <DefaultButton
                                            onClick={() => addTurnPoints(0)}
                                        >
                                            <Text
                                                variant='large'
                                            >
                                                0
                                            </Text>
                                        </DefaultButton>
                                        <DefaultButton
                                            onClick={() => addTurnPoints(1)}
                                        >
                                            <Text variant='large'>+1</Text>
                                        </DefaultButton>
                                        <DefaultButton
                                            onClick={() => addTurnPoints(2)}
                                        >
                                            <Text variant='large'>+2</Text>
                                        </DefaultButton>
                                        <DefaultButton
                                            onClick={() => addTurnPoints(3)}
                                        >
                                            <Text variant='large'>+3</Text>
                                        </DefaultButton>
                                        {
                                            (santaUsed || hunkAndHottieUsed) && (

                                                <DefaultButton
                                                    onClick={() => addTurnPoints(4)}
                                                >
                                                    <Text variant='large'>+4</Text>
                                                </DefaultButton>
                                            )
                                        }
                                        {
                                            (santaUsed && hunkAndHottieUsed) && (

                                                <DefaultButton
                                                    onClick={() => addTurnPoints(5)}
                                                >
                                                    <Text variant='large'>+5</Text>
                                                </DefaultButton>
                                            )
                                        }
                                    </Stack> */}
                                    <Stack
                                        horizontal
                                        tokens={{
                                            childrenGap: 3
                                        }}
                                        styles={{ root: { paddingTop: 20 } }}
                                    >
                                        <PrimaryButton
                                            styles={{
                                                root: {
                                                    padding: 10
                                                }
                                            }}
                                            onClick={() => endPlayerTurn(x, true)}
                                        >
                                            <Text
                                                variant='xLarge'
                                                styles={{
                                                    root: {
                                                        color: DefaultPalette.white
                                                    }
                                                }}
                                            >
                                                Died
                                            </Text>
                                        </PrimaryButton>
                                        {currentTurnPoints !== 0 && (
                                            <PrimaryButton
                                                styles={{
                                                    root: {
                                                        padding: 10
                                                    }
                                                }}
                                                onClick={() => endPlayerTurn(x, false)}
                                            >
                                                <Text
                                                    variant='xLarge'
                                                    styles={{
                                                        root: {
                                                            color: DefaultPalette.white
                                                        }
                                                    }}
                                                >
                                                    Score
                                                </Text>
                                            </PrimaryButton>
                                        )}
                                    </Stack>
                                </Stack>
                            )
                        }
                    </Stack>
                ))}
                {
                    currentTurnPoints === 0 && lastPlayerResult &&
                    <Text
                        variant='large'
                    >
                        Mistake? <Link onClick={undoLastTurn}>Undo last turn result</Link>
                    </Text>
                }
                <Text
                    variant='large'
                >
                    Keep taking turns until somebody wins, or <Link onClick={() => nav(-2)}>Quit</Link>
                </Text>
            </Stack>

            {/* <Text variant='large'>
                Started: {currentGame.start}
            </Text>
            <br />
            <br />
            <br />
            <Text variant='large'>
                Expansions: {currentGame.expansions.length > 0 ? currentGame.expansions.join(", ") : "None"}
            </Text>
            <br />
            <br />
            <br />
            <Text variant='large'>
                Players: {currentGame.players.length > 0 ? currentGame.players.map(x => x.name).join(", ") : "None"}
            </Text>
            <br />
            <br />
            <br />
            <Text
                variant='large'
            >
                Record Interesting Things Here
            </Text>
            <br />
            <br />
            <br />
            {
                activePlayerName
                && (
                    <PrimaryButton
                        styles={{
                            root: {
                                padding: 30
                            }
                        }}
                        onClick={() => setActivePlayerName(undefined)}
                    >
                        <Text
                            variant='large'
                            styles={{
                                root: {
                                    color: DefaultPalette.white
                                }
                            }}
                        >
                            {activePlayerName}'s Turn Done
                        </Text>
                    </PrimaryButton>
                )
            }
            <br />
            <br />
            <br /> */}
        </Stack>
    );
};