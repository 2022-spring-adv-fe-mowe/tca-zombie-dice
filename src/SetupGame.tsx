import { Toggle } from '@fluentui/react/lib/Toggle';
import { PrimaryButton } from '@fluentui/react/lib/Button';
import { Stack } from '@fluentui/react';
import { Separator } from '@fluentui/react/lib/Separator';
import { useNavigate } from 'react-router-dom';

export const SetupGame = () => {

    const nav = useNavigate();

    return (
        <Stack style={{padding: 30}}>
            <Separator 
                alignContent="start"
            >
                Choose expansions
            </Separator>
            <Toggle 
                label="Santa (remove standard 'green' die)" 
                inlineLabel 
            />
            <Toggle 
                label="Hunk/Hottie (remove two standard 'yellow' dice)" 
                inlineLabel 
            />
            <Separator 
                alignContent="start"
            >
                Choose players
            </Separator>
            <PrimaryButton
                onClick={() => nav("/play")}
            >
                Start Playing
            </PrimaryButton>
        </Stack>

    );
};