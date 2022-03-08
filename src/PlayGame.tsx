import { DefaultPalette, Persona, PersonaSize, Stack, Icon, Link } from '@fluentui/react';
import { Text } from '@fluentui/react/lib/Text';
import { DefaultButton, PrimaryButton } from '@fluentui/react/lib/Button';
import { useNavigate } from 'react-router-dom';
import { CurrentGame, GameTurn, Player } from './App';
import { useState } from 'react';
import { Panel, PanelType } from '@fluentui/react/lib/Panel';

interface PlayGameProps {
    currentGame: CurrentGame
}

interface PlayerInGame extends Player {
    currentBrainTotal: number;
}

export const PlayGame: React.FC<PlayGameProps> = ({currentGame}) => {

    const nav = useNavigate();

    const [turns, setTurns] = useState<GameTurn[]>([]);
    const [activePlayer, setActivePlayer] = useState<PlayerInGame | undefined>(undefined);

    const [turnFirstRoll, setTurnFirstRoll] = useState(false);
    const [currentTurnPoints, setCurrentTurnPoints] = useState(0);


    const [playersInOrder, setPlayersInOrder] = useState<PlayerInGame[]>([]);

    const showChoosePlayerPanel =
        !activePlayer
        && playersInOrder.length < currentGame.players.length
    ;

    const playerChosen = (player: string) => {
        
        const newPlayerInGame: PlayerInGame = {
            name: player
            , order: playersInOrder.length + 1
            , currentBrainTotal: 0        
        }
        
        setActivePlayer(newPlayerInGame);

        setPlayersInOrder([
            ...playersInOrder 
            , newPlayerInGame
        ]);
    };

    const endPlayerTurn = (player: PlayerInGame, died: boolean) => {
        
        const previousActivePlayer = activePlayer;
        
        // If not dead, update current player points.
        if (!died) {
            
            player.currentBrainTotal += currentTurnPoints;

            // setPlayersInOrder(playersInOrder.map(x => ({
            //     ...x 
            //     , currentBrainTotal: x === previousActivePlayer ? x.currentBrainTotal + currentTurnPoints : x.currentBrainTotal
            // })));
        }


        // Trigger choose player number if not all chosen.
        if (playersInOrder.length < currentGame.players.length) {
            setActivePlayer(undefined);
        }

        // Otherwise, next player until game ends.
        else {
            const indexOfActivePlayer = playersInOrder.findIndex(x => x === player);
            setActivePlayer(indexOfActivePlayer + 1 < playersInOrder.length ? playersInOrder[indexOfActivePlayer + 1] : playersInOrder[0]);
        }

        // Reset turn state.
        setTurnFirstRoll(false);
        setCurrentTurnPoints(0);
    };

    const addTurnPoints = (p: number) => {

        setCurrentTurnPoints(currentTurnPoints + p);
    };

    return (
        <Stack style={{padding: 30}}>
            <Panel
                type={PanelType.smallFixedNear}
                hasCloseButton={false}
                isOpen={showChoosePlayerPanel}
                headerText={`Choose Player ${playersInOrder.length + 1}`}
            >
                <Stack
                    tokens={{ childrenGap: 30}}
                    styles={{root: {marginTop: 40}}}
                >
                    {
                        currentGame.players
                            .filter(x => playersInOrder.findIndex(y => y.name === x.name) === -1)
                            .map(x =>(
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
                tokens={{childrenGap: 20}}
            >
                {playersInOrder.map(x => (
                    <Stack
                        tokens={{childrenGap: 20}}
                    >
                        <Stack
                            horizontal
                            tokens={{childrenGap: 20}}
                            styles={{root: { alignItems: "center"}}}
                        >
                            <Icon 
                                iconName='CubeShape' 
                                styles={{root: {
                                        fontSize: 40
                                        , color: DefaultPalette.redDark
                                        , opacity: activePlayer === x ? 1 : 0
                                    }
                                }}
                            />
                            <Stack
                                key={x.name}
                                tokens={{childrenGap: 0}}
                            >
                                <Text
                                    variant='xLarge'
                                >
                                    {x.name}
                                </Text>
                                <Stack
                                    horizontal
                                    tokens={{childrenGap: 15}}
                                >
                                    <Text
                                        variant='xLargePlus'
                                    >
                                        {x.currentBrainTotal}
                                        {
                                            currentTurnPoints > 0 && 
                                            activePlayer === x && (
                                                <Text
                                                    variant="xLargePlus"
                                                    styles={{root: {color: DefaultPalette.redDark}}}
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
                                    styles={{root: {marginLeft: 60}}}
                                    tokens={{ childrenGap: 20}}
                                >
                                    { turnFirstRoll && 
                                        <Text 
                                            variant='medium'
                                            styles={{root: {marginBottom: -15}}}
                                        >
                                            Brains Rolled
                                        </Text>
                                    }
                                    { turnFirstRoll && <Stack
                                        horizontal
                                        styles={{root: { justifyContent: "begin"}}}
                                        tokens={{childrenGap: 5}}
                                    >
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
                                    </Stack>}
                                    <Stack
                                        horizontal
                                        tokens={{ 
                                            childrenGap: 5
                                        }}

                                        styles={{root: { justifyContent: "begin"}}}
                                    >
                                        <DefaultButton
                                            styles={{
                                                root: {
                                                    padding: 10
                                                }
                                            }}
                                            onClick={() => setTurnFirstRoll(true)}
                                        >
                                            <Text
                                                variant='large'
                                            >
                                                Roll
                                            </Text>
                                        </DefaultButton>                                        
                                        {
                                            turnFirstRoll && (
                                            <PrimaryButton
                                                styles={{
                                                    root: {
                                                        padding: 10
                                                    }
                                                }}
                                                onClick={() => endPlayerTurn(x, true)}
                                            >
                                                <Text
                                                    variant='large'
                                                    styles={{
                                                        root: {
                                                            color: DefaultPalette.white
                                                        }
                                                    }}
                                                >
                                                    Died
                                                </Text>
                                            </PrimaryButton>)
                                        }
                                                                            {
                                        turnFirstRoll && 
                                        currentTurnPoints > 0 && (
                                        <PrimaryButton
                                            styles={{
                                                root: {
                                                    padding: 10
                                                }
                                            }}
                                            onClick={() => endPlayerTurn(x, false)}
                                        >
                                            <Text
                                                variant='large'
                                                styles={{
                                                    root: {
                                                        color: DefaultPalette.white
                                                    }
                                                }}
                                            >
                                                Score
                                            </Text>
                                        </PrimaryButton>

                                        )
                                        }

                                    </Stack>
                                </Stack>                               
                            )
                        }
                    </Stack>
                ))}

                <Text
                    variant='large'
                >
                    Keep taking turns until somebody wins, or <Link onClick={() => nav("/")}>Quit</Link>
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