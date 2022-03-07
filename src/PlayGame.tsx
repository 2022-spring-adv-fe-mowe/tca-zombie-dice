import { DefaultPalette, Persona, PersonaSize, Stack, Icon } from '@fluentui/react';
import { Text } from '@fluentui/react/lib/Text';
import { DefaultButton, PrimaryButton } from '@fluentui/react/lib/Button';
import { useNavigate } from 'react-router-dom';
import { CurrentGame, GameTurn, Player } from './App';
import { useState } from 'react';
import { Panel, PanelType } from '@fluentui/react/lib/Panel';

interface PlayGameProps {
    currentGame: CurrentGame
}

export const PlayGame: React.FC<PlayGameProps> = ({currentGame}) => {

    const nav = useNavigate();

    const [turns, setTurns] = useState<GameTurn[]>([]);
    const [activePlayerName, setActivePlayerName] = useState<string | undefined>(undefined);


    const [playersInOrder, setPlayersInOrder] = useState<Player[]>([]);

    const showChoosePlayerPanel =
        !activePlayerName
        && playersInOrder.length < currentGame.players.length
    ;

    const playerChosen = (player: string) => {
        setActivePlayerName(player);
        setPlayersInOrder([
            ...playersInOrder 
            , {
                name: player
                , order: playersInOrder.length + 1
            }
        ]);
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
                                        , opacity: activePlayerName === x.name ? 1 : 0
                                    }
                                }}
                            />
                            <Stack
                                key={x.name}
                                tokens={{childrenGap: 0}}
                            >
                                <Text
                                    variant='large'
                                >
                                    {x.name}
                                </Text>
                                <Stack
                                    horizontal
                                    tokens={{childrenGap: 15}}
                                >
                                    <Text
                                        variant='xLarge'
                                        styles={{root: {textDecoration: "line-through"}}}
                                    >
                                        0
                                    </Text>
                                    <Text
                                        variant='xLarge'
                                        styles={{root: {textDecoration: "line-through"}}}
                                    >
                                        0
                                    </Text>
                                    { x.name !== "Me" &&
                                        <Text
                                            variant='xLarge'
                                        >
                                            4
                                        </Text>
                                    }
                                </Stack>

                            </Stack>
                        </Stack>
                        {
                            activePlayerName === x.name && (
                                <Stack
                                    styles={{root: {marginLeft: 60}}}
                                >
                                    <Text
                                        variant='large'
                                    >
                                        Record Interesting Things Here
                                    </Text>
                                    <br />
                                    <PrimaryButton
                                        styles={{
                                            root: {
                                                padding: 10
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
                                            End Turn
                                        </Text>
                                    </PrimaryButton>
                                </Stack>                               
                            )
                        }
                    </Stack>
                ))}
            </Stack>
            <br />
            <br />
            <br />
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
            <Stack 
                horizontal
            >
                <DefaultButton
                    onClick={() => nav("/")}
                >
                    Quit
                </DefaultButton>
                {/* <PrimaryButton
                    onClick={() => nav("/")}
                >
                    Done
                </PrimaryButton> */}
            </Stack>
        </Stack>
    );
};