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

const itemStyles = { 
    root: { 
        width: '100%'
        , maxWidth: '100%' 
    }
};

const stackItemStyles = { 
    root: { 
        display: 'flex'
        , justifyContent: 'center' 
    }
};

export const Home = () => {

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
                    styles={itemStyles}
                    onClick={() => nav("/setup")}
                >
                    <Text
                        variant='large'
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
                    <DocumentCardTitle
                        title='Zombie Dice Lifetime'
                    />
                    <Stack>
                        <p>Foo</p>
                        <p>Bar</p>
                        <p>Cat</p>
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
                    <DocumentCardTitle
                        title='Zombie Dice Lifetime'
                    />
                    <Stack>
                        <p>Foo</p>
                        <p>Bar</p>
                        <p>Cat</p>
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
                    <DocumentCardTitle
                        title='Zombie Dice Lifetime'
                    />
                    <Stack>
                        <p>Foo</p>
                        <p>Bar</p>
                        <p>Cat</p>
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
                    <DocumentCardTitle
                        title='Zombie Dice Lifetime'
                    />
                    <Stack>
                        <p>Foo</p>
                        <p>Bar</p>
                        <p>Cat</p>
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
                    <DocumentCardTitle
                        title='Zombie Dice Lifetime'
                    />
                    <Stack>
                        <p>Foo</p>
                        <p>Bar</p>
                        <p>Cat</p>
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
                    <DocumentCardTitle
                        title='Zombie Dice Lifetime'
                    />
                    <Stack>
                        <p>Foo</p>
                        <p>Bar</p>
                        <p>Cat</p>
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
                    <DocumentCardTitle
                        title='Zombie Dice Lifetime'
                    />
                    <Stack>
                        <p>Foo</p>
                        <p>Bar</p>
                        <p>Cat</p>
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
                    <DocumentCardTitle
                        title='Zombie Dice Lifetime'
                    />
                    <Stack>
                        <p>Foo</p>
                        <p>Bar</p>
                        <p>Cat</p>
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
                    <DocumentCardTitle
                        title='Zombie Dice Lifetime'
                    />
                    <Stack>
                        <p>Foo</p>
                        <p>Bar</p>
                        <p>Cat</p>
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
                    <DocumentCardTitle
                        title='Zombie Dice Lifetime'
                    />
                    <Stack>
                        <p>Foo</p>
                        <p>Bar</p>
                        <p>Cat</p>
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
                    <DocumentCardTitle
                        title='Zombie Dice Lifetime'
                    />
                    <Stack>
                        <p>Foo</p>
                        <p>Bar</p>
                        <p>Cat</p>
                    </Stack>
                </DocumentCard>
            </Stack.Item>

        </Stack>
    );
}