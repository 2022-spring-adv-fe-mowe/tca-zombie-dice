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

const cardStyles = { 
    root: { 
        width: '95%'
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
                childrenGap: 10
            }}
        >

            <Stack.Item align='stretch'>
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
            </Stack.Item>

            <Stack.Item
                align='stretch'
                styles={stackItemStyles}
            >
                <DocumentCard
                    styles={cardStyles}
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
                    styles={cardStyles}
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
                    styles={cardStyles}
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
                    styles={cardStyles}
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
                    styles={cardStyles}
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
                    styles={cardStyles}
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
                    styles={cardStyles}
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
                    styles={cardStyles}
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
                    styles={cardStyles}
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
                    styles={cardStyles}
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
                    styles={cardStyles}
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