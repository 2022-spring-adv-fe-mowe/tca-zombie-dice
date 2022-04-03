import { useNavigate } from 'react-router-dom';
import { DefaultButton, PrimaryButton, CompoundButton } from '@fluentui/react/lib/Button';
import { Text } from '@fluentui/react/lib/Text';
import { Stack, StackItem } from '@fluentui/react/lib/Stack';
import { CommandBar, Icon } from '@fluentui/react';
import {
    DocumentCard,
    DocumentCardActivity,
    DocumentCardTitle,
    DocumentCardLogo,
    DocumentCardStatus,
    IDocumentCardLogoProps,
    IDocumentCardActivityPerson,
    IDocumentCardStyles,
  } from '@fluentui/react/lib/DocumentCard';
import { DefaultPalette } from '@fluentui/theme';
import { GameResult, buttonStyles, buttonTextStyles, cardStyles } from "./App";

interface HomeProps {
    gameResults: GameResult[];
    darkMode: boolean;
    setDarkMode: any;
};

const stackItemStyles = { 
    root: { 
        display: 'flex'
        , justifyContent: 'center' 
    }
};

export const Home: React.FC<HomeProps> = ({
    gameResults
    , darkMode
    , setDarkMode
}) => {

    const nav = useNavigate();

    const lastGame = Math.max(...gameResults.map(x => Date.parse((x as any).end)));
    const daysAgo = (Date.now() - lastGame)/ (1000 * 60 * 60 * 24);    
    const lastPlayedDisplay = daysAgo >= 1 ? `${daysAgo.toFixed(0)}` : 'Today'

    return (

        <Stack
            tokens={{
                padding: 10
                , childrenGap: 10
            }}
        >
            <Stack.Item
                align='stretch'
                styles={stackItemStyles}
            >
                <PrimaryButton
                    // onMenuClick={(e) => console.log(e)}
                    // split
                    // menuProps={{ items: [
                    //     {
                    //         key: "theme"
                    //         , text: darkMode ? "Light Mode" : "Dark Mode"
                    //         , onClick: () => setDarkMode(!darkMode)
                    //     }
                    // ]}}
                    onClick={() => nav("/setup")}
                    styles={buttonStyles}
                >
                    <Stack>
                        <Text
                            variant='xxLarge'
                            styles={buttonTextStyles}
                        >
                            Play Zombie Dice
                        </Text>
                        <Text 
                            variant="medium"
                            styles={buttonTextStyles}
                        >
                            And track your stats...
                        </Text>
                    </Stack>
                </PrimaryButton>
            </Stack.Item>

            <Stack.Item
                align='stretch'
                styles={stackItemStyles}
            >
                <DocumentCard
                    styles={cardStyles}
                >

                    <Stack tokens={{ childrenGap: 10}}>
                        <Text variant="large">Last Played</Text>

                        <Stack horizontal tokens={{ childrenGap: 10}} styles={{root: {justifyContent: "start", alignItems: "end"}}}>
                            <Text
                                variant="mega"
                            >
                                {lastPlayedDisplay}
                            </Text>
                            {
                                lastPlayedDisplay !== 'Today' && 
                                <Text
                                    variant="xLarge"
                                    styles={{root: { marginBottom: 13}}}
                                >
                                    days ago
                                </Text>
                            }

                        </Stack>
                    </Stack>


                </DocumentCard>
            </Stack.Item>

            {/* <Stack.Item
                align='stretch'
                styles={stackItemStyles}
            >
                <DocumentCard
                    styles={cardStyles}
                >
                    <Stack
                        horizontal
                    >
                        <Stack tokens={{ childrenGap: 10}}>
                            <Text variant="large">Time Played</Text>
                            <Text variant="xxLarge">0h 27m 03s</Text>
                        </Stack>
                    </Stack>
                </DocumentCard>
            </Stack.Item> */}

            <Stack.Item
                align='stretch'
                styles={stackItemStyles}
            >
                <DocumentCard
                    styles={cardStyles}
                >
                    <Stack tokens={{ childrenGap: 10}}>
                        <Text variant="large">Total Games Played</Text>
                        <Text
                            variant="mega"
                        >
                            {gameResults.length}
                        </Text>
                    </Stack>
                </DocumentCard>
            </Stack.Item>

            <Stack.Item
                align='stretch'
                styles={stackItemStyles}
            >
                <DocumentCard
                    styles={cardStyles}
                >
                    <DefaultButton
                        styles={buttonStyles}
                        onClick={() => setDarkMode(!darkMode)}
                    >
                        <Text variant='large'>
                            Try {darkMode ? "Light" : "Dark"} Mode
                        </Text>
                    </DefaultButton>                
                </DocumentCard>
            </Stack.Item>

        </Stack>
    );
}