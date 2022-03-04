import { Stack } from '@fluentui/react';
import { Text } from '@fluentui/react/lib/Text';
import { DefaultButton, PrimaryButton } from '@fluentui/react/lib/Button';
import { useNavigate } from 'react-router-dom';
import { CurrentGame } from './App';

interface PlayGameProps {
    currentGame: CurrentGame
}

export const PlayGame: React.FC<PlayGameProps> = ({currentGame}) => {

    const nav = useNavigate();

    return (
        <Stack style={{padding: 30}}>
            <Text variant='large'>
                Expansions: {currentGame.expansions.length > 0 ? currentGame.expansions.join(", ") : "None"}
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