import { MediaRenderer, useEmbeddedWallet } from "@thirdweb-dev/react";

type SocialLoginProps = {
    strategy: any;
};

export const SocialLoginButton: React.FC<SocialLoginProps> = ({ strategy }) => {
    const { connect } = useEmbeddedWallet();

    const signInWithSocial = async () => {
        await connect({
            strategy: strategy,
        });
    };

    const firstChar = strategy.charAt(0).toUpperCase();
    const rest = strategy.slice(1);
    const strategyName = firstChar + rest;

    return (
        <button
            style={{
                width: "100%",
                height: "42px",
                marginBottom: "1rem",
                border: "1px solid #ccc",
                borderRadius: "8px",
                display: "inline-flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#fff",
            }}
            onClick={signInWithSocial}
        ><span style={{ marginRight: "10px"}}><MediaRenderer src={'/images/' + strategy + 'Icon.png'} width="24px" height="24px" /></span>Sign in with {strategyName}</button>
    );
};
