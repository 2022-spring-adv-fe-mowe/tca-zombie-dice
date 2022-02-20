import { useNavigate } from 'react-router-dom';
import { DefaultButton, PrimaryButton, CompoundButton } from '@fluentui/react/lib/Button';
import { Text } from '@fluentui/react/lib/Text';
import { Stack } from '@fluentui/react/lib/Stack';

export const Home = () => {
    const nav = useNavigate();

    return(
        <Stack>
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