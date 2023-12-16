import React, { useState } from 'react';
import styled from 'styled-components';
import { WalletContext } from 'utils/context';
import { Input, Form, Modal } from 'antd';
import { AntdFormWrapper } from 'components/Common/EnhancedInputs';
import {
    ExclamationCircleOutlined,
    PlusSquareOutlined,
    ImportOutlined,
    LockOutlined,
} from '@ant-design/icons';
import PrimaryButton, {
    SecondaryButton,
    SmartButton,
} from 'components/Common/PrimaryButton';
import { Event } from 'utils/GoogleAnalytics';
import { validateMnemonic } from 'utils/validation';
import appConfig from 'config/app';

export const WelcomeCtn = styled.div`
    margin-top: 20px;
    padding: 0px 30px;
    color: ${props => props.theme.contrast};
    h2 {
        color: ${props => props.theme.contrast};
    }
`;

export const WelcomeText = styled.p`
    width: 100%;
    font-size: 16px;
    margin-bottom: 60px;
    text-align: left;
`;

export const WelcomeLink = styled.a`
    text-decoration: underline;
    color: ${props => props.theme.eCashBlue};
    :hover {
        color: ${props => props.theme.eCashPurple} !important;
        text-decoration: underline !important;
    }
`;

const OnBoarding = () => {
    const ContextValue = React.useContext(WalletContext);
    const { createWallet } = ContextValue;
    const [formData, setFormData] = useState({
        dirty: true,
        mnemonic: '',
    });

    const [seedInput, openSeedInput] = useState(false);
    const [isValidMnemonic, setIsValidMnemonic] = useState(false);
    const { confirm } = Modal;

    async function submit() {
        setFormData({
            ...formData,
            dirty: false,
        });

        if (!formData.mnemonic) {
            return;
        }
        // Event("Category", "Action", "Label")
        // Track number of created wallets from onboarding
        Event('Onboarding.js', 'Create Wallet', 'Imported');
        createWallet(formData.mnemonic);
    }

    const handleChange = e => {
        const { value, name } = e.target;

        // Validate mnemonic on change
        // Import button should be disabled unless mnemonic is valid
        setIsValidMnemonic(validateMnemonic(value));

        setFormData(p => ({ ...p, [name]: value }));
    };

    function showBackupConfirmModal() {
        confirm({
            title: "Don't forget to back up your wallet",
            icon: <ExclamationCircleOutlined />,
            cancelButtonProps: { style: { display: 'none' } },
            content: `Once your wallet is created you can back it up by writing down your 12-word seed. You can find your seed on the Settings page. If you are browsing in Incognito mode or if you clear your browser history, you will lose any funds that are not backed up!`,
            okText: 'Okay, make me a wallet!',
            onOk() {
                // Event("Category", "Action", "Label")
                // Track number of created wallets from onboarding
                Event('Onboarding.js', 'Create Wallet', 'New');
                createWallet();
            },
        });
    }

    return (
        <WelcomeCtn>
            <h2>Welcome to Calory{' '}!</h2>
            <WelcomeText>
                <br /><br />

                Calory is an{' '}
                <WelcomeLink
                    href="https://github.com/ErgonSurfer/Calory"
                    target="_blank"
                    rel="noreferrer"
                >
                    open source,
                </WelcomeLink>{' '}
                non-custodial web wallet for {appConfig.name}. 

                <br /><br />

                <strong>Important Security Notice: </strong>Your seed phrase, which is crucial for access to your funds, is accessible in the Settings. 

                <br /><br />

                <strong>Please ensure to store your seed phrase in a secure and private location.</strong> It's the key to your wallet, and losing it can result in the loss of your assets. Remember, never share your seed phrase with anyone.
            </WelcomeText>


            <PrimaryButton onClick={() => showBackupConfirmModal()}>
                <PlusSquareOutlined /> New Wallet
            </PrimaryButton>

            <SecondaryButton onClick={() => openSeedInput(!seedInput)}>
                <ImportOutlined /> Import Wallet
            </SecondaryButton>
            {seedInput && (
                <AntdFormWrapper>
                    <Form style={{ width: 'auto' }}>
                        <Form.Item
                            validateStatus={
                                !formData.dirty && !formData.mnemonic
                                    ? 'error'
                                    : ''
                            }
                            help={
                                !formData.mnemonic || !isValidMnemonic
                                    ? 'Valid mnemonic seed phrase required'
                                    : ''
                            }
                        >
                            <Input
                                prefix={<LockOutlined />}
                                type="email"
                                placeholder="mnemonic (seed phrase)"
                                name="mnemonic"
                                autoComplete="off"
                                onChange={e => handleChange(e)}
                                required
                                title=""
                            />
                        </Form.Item>

                        <SmartButton
                            disabled={!isValidMnemonic}
                            onClick={() => submit()}
                        >
                            Import
                        </SmartButton>
                    </Form>
                </AntdFormWrapper>
            )}
        </WelcomeCtn>
    );
};

export default OnBoarding;
