import { Stack } from '@fluentui/react';
import { Text } from '@fluentui/react/lib/Text';
import { DefaultButton, PrimaryButton } from '@fluentui/react/lib/Button';
import { useNavigate } from 'react-router-dom';

export const PlayGame = () => {

    const nav = useNavigate();

    return (
        <Stack style={{padding: 30}}>
            <Text
                variant='xLarge'
            >
                Record Interesting Things Here
            </Text>
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