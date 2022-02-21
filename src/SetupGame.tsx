import { Toggle } from '@fluentui/react/lib/Toggle';
import { Stack } from '@fluentui/react';
import { Separator } from '@fluentui/react/lib/Separator';

export const SetupGame = () => {

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
        </Stack>

    );
};