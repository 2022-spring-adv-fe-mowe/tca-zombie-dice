import { useNavigate } from 'react-router-dom';
import { DefaultButton, PrimaryButton, CompoundButton } from '@fluentui/react/lib/Button';
import { Text } from '@fluentui/react/lib/Text';
import { Stack, StackItem } from '@fluentui/react/lib/Stack';
import { CommandBar } from '@fluentui/react';

export const Home = () => {
    const nav = useNavigate();

    return(

        <Stack>
            <Stack.Item align='stretch'>
                <CommandBar 
                    items={[{
                        key: 'play'
                        , text: 'Play Zombie Dice'
                    }]}
                >
                </CommandBar>
            </Stack.Item>


            <Text
                variant='xxLarge'
            >
                Home
            </Text>
            <CompoundButton
                primary
                secondaryText='Grab your game & play' 
                onClick={() => nav('/setup-game')}
            >
                Play
            </CompoundButton>
        </Stack>
    );
}