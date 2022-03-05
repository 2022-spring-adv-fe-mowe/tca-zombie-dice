import { Stack } from '@fluentui/react';
import { Text } from '@fluentui/react/lib/Text';
import { DefaultButton, PrimaryButton } from '@fluentui/react/lib/Button';
import { useNavigate } from 'react-router-dom';
import { CurrentGame } from './App';
import { useState, useEffect } from 'react';
import { Panel, PanelType } from '@fluentui/react/lib/Panel';

interface PlayGameProps {
    currentGame: CurrentGame
}

export const PlayGame: React.FC<PlayGameProps> = ({currentGame}) => {

    const nav = useNavigate();

    const [playerOrderChosenCount, setPlayerOrderChosenCount] = useState(0);

    // Use effect to pop panel for choosing player turn ? ? ?
    useEffect(
        () => {
            console.log('here');
        }
        , []
    );

    return (
        <Stack style={{padding: 30}}>
            <Panel
                type={PanelType.smallFixedNear}
                hasCloseButton={false}
                isOpen={true}
                headerText="Player 1"
            >
                <Stack
                    tokens={{ childrenGap: 30}}
                >
                    {
                        currentGame.players.map(x =>(
                            <DefaultButton
                                styles={{root: {paddingTop: 20, paddingBottom: 20, marginTop: 40}}}
                            >
                                <Text
                                    variant='large'
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