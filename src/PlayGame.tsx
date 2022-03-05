import { Stack } from '@fluentui/react';
import { Text } from '@fluentui/react/lib/Text';
import { DefaultButton, PrimaryButton } from '@fluentui/react/lib/Button';
import { useNavigate } from 'react-router-dom';
import { CurrentGame, GameTurn } from './App';
import { useState } from 'react';
import { Panel, PanelType } from '@fluentui/react/lib/Panel';

interface PlayGameProps {
    currentGame: CurrentGame
}

export const PlayGame: React.FC<PlayGameProps> = ({currentGame}) => {

    const nav = useNavigate();

    const [turns, setTurns] = useState<GameTurn[]>([]);
    const [activePlayerName, setActivePlayerName] = useState<string | undefined>(undefined);


    const [playerOrderChosenCount, setPlayerOrderChosenCount] = useState(0);

    const showChoosePlayerPanel =
        !activePlayerName
        // && !!turns.find(x => x.turnNumber === 1)
    ;

    const playerChosen = (player: string) => {
        setActivePlayerName(player);
    };

    return (
        <Stack style={{padding: 30}}>
            <Panel
                type={PanelType.smallFixedNear}
                hasCloseButton={false}
                isOpen={showChoosePlayerPanel}
                headerText="Choose Player 1"
            >
                <Stack
                    tokens={{ childrenGap: 30}}
                    styles={{root: {marginTop: 40}}}
                >
                    {
                        currentGame.players.map(x =>(
                            <DefaultButton
                                styles={{root: {paddingTop: 30, paddingBottom: 30}}}
                            >
                                <Text
                                    variant='large'
                                    onClick={() => playerChosen(x.name)}
                                >
                                    {x.name}
                                </Text>
                            </DefaultButton>
                        ))
                    }
                </Stack>
            </Panel>
            <Text variant='large'>
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
                    <DefaultButton
                        styles={{root: {paddingTop: 30, paddingBottom: 30}}}
                    >
                        <Text
                            variant='large'
                            onClick={() => setActivePlayerName(undefined)}
                        >
                            {activePlayerName}'s Turn Done
                        </Text>
                    </DefaultButton>
                )
            }
            <br />
            <br />
            <br />
            <Stack 
                horizontal
            >
                <DefaultButton
                    onClick={() => nav("/")}
                >
                    Quit
                </DefaultButton>
                <PrimaryButton
                    onClick={() => nav("/")}
                >
                    Done
                </PrimaryButton>
            </Stack>
        </Stack>
    );
};