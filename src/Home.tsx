import { useNavigate } from 'react-router-dom';
import { DefaultButton, PrimaryButton, CompoundButton } from '@fluentui/react/lib/Button';
import { Text } from '@fluentui/react/lib/Text';
import { Stack, StackItem } from '@fluentui/react/lib/Stack';
import { CommandBar } from '@fluentui/react';
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
import { GameResult } from "./App";

interface HomeProps {
    gameResults: GameResult[];
};

const buttonStyles = {
    root: {
        padding: 40
        , width: '100%'
        , maxWidth: '100%'     }
};

const itemStyles = { 
    root: { 
        width: '100%'
        , maxWidth: '100%' 
        , padding: 20
    }
};

const stackItemStyles = { 
    root: { 
        display: 'flex'
        , justifyContent: 'center' 
    }
};

export const Home: React.FC<HomeProps> = ({gameResults}) => {

    const nav = useNavigate();

    return (

        <Stack
            tokens={{
                padding: 10
                , childrenGap: 10
            }}
        >

            {/* <Stack.Item align='stretch'>
                <CommandBar
                    items={[
                        {
                            key: 'play'
                            , text: 'Play Zombie Dice'
                            , onClick: () => nav("/setup")
                            , iconProps: {
                                iconName: 'People'
                            }
                        }
                    ]}
                    farItems={[
                        {
                            key: 'other'
                            , iconProps: {
                                iconName: 'More'
                            }
                        }
                    ]}
                />
            </Stack.Item> */}

            <Stack.Item
                align='stretch'
                styles={stackItemStyles}
            >
                {/* <CompoundButton
                    primary
                    secondaryText='The real game ! ! !'
                    styles={itemStyles}
                    onClick={() => nav("/setup")}
                >
                    Play Zombie Dice
                </CompoundButton> */}
                <PrimaryButton
                    styles={buttonStyles}
                    onClick={() => nav("/setup")}
                >
                    <Text
                        variant='xxLarge'
                        styles={{ root: { color: DefaultPalette.white}}}
                    >
                        Play Zombie Dice
                    </Text>
                </PrimaryButton>
            </Stack.Item>

            <Stack.Item
                align='stretch'
                styles={stackItemStyles}
            >
                <DocumentCard
                    styles={itemStyles}
                >

                    <Stack tokens={{ childrenGap: 10}}>
                        <Text variant="large">Last Played</Text>

                        <Stack horizontal tokens={{ childrenGap: 10}} styles={{root: {justifyContent: "start", alignItems: "end"}}}>
                            <Text
                                variant="mega"
                            >
                                7
                            </Text>
                            <Text
                                variant="xLarge"
                                styles={{root: { marginBottom: 13}}}
                            >
                                days ago
                            </Text>

                        </Stack>
                    </Stack>


                </DocumentCard>
            </Stack.Item>

            <Stack.Item
                align='stretch'
                styles={stackItemStyles}
            >
                <DocumentCard
                    styles={itemStyles}
                >
                    <Stack tokens={{ childrenGap: 10}}>
                        <Text variant="large">Games Played</Text>
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
                    styles={itemStyles}
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
            </Stack.Item>

        </Stack>
    );
}