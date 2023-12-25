import { useEmbeddedWallet } from "@thirdweb-dev/react";
import { useState } from "react";
import { css } from "@emotion/react";
import ReactLoading from "react-loading";

export default function EmailLogin() {
    const [state, setState] = useState<
    "init" | "sending_email" | "email_verification"
    >("init");

    const [isLoading, setIsLoading] = useState(false);

    const [email, setEmail] = useState("");
    const [verification, setVerification] = useState<string>("");

    const {connect, sendVerificationEmail} = useEmbeddedWallet();

    const handleEmailEntered = async () => {
        if (!email) {
            alert("Please enter your email address.");
            return;
        }
        setState("sending_email");
        await sendVerificationEmail({email});
        setState("email_verification");
    };

    const handleEmailVerification = async () => {
        if (!email || !verification) {
            alert("Please enter the verification code sent to your email address.");
            return;
        }
        setIsLoading(true);
        await connect({
            strategy: "email_verification",
            email,
            verificationCode: verification,
        });
        setIsLoading(false);
    };
    if (isLoading) {
    return <ReactLoading type={"spin"} color={"#000"} />;
}
    if (state === "sending_email") {
        return (
            <>
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}><ReactLoading type={"spin"} color={"#000"} /></div>
            
            </>
        );
    }

    if (state === "email_verification") {
        return (
            <>
            <p>Please enter the verification code sent to your email address.</p>
            <input
                type="text"
                placeholder="Verification Code"
                value={verification}
                onChange={(e) => setVerification(e.target.value)}
                style={{
                    width: "100%",
                    height: "42px",
                    marginBottom: "1rem",
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    padding: "0.5rem 1rem",
                }}
            />
            <button
                style={{
                    width: "100%",
                    height: "42px",
                    marginBottom: "1rem",
                    display: "inline-flex",
                    justifyContent: "center",
                    backgroundColor: "royalblue",
                    color: "white",
                    border: "10px solid royalblue",
                    borderRadius: "8px",    
                }}
                onClick={handleEmailVerification}
                >Verify</button>
                <a onClick={()=> setState("init")}>
                    <p style={{ color:"royalblue", cursor:"pointer", textAlign:"center"}}>Go Back</p>
                </a>
            </>
        );
    }

    return (
        <>
        <p>Sign in with Email or Social Login below.</p>
        <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
                width: "100%",
                height: "42px",
                marginBottom: "1rem",
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "0.5rem 1rem",
            }}
        />
        <button
            style={{
                width: "100%",
                height: "42px",
                marginBottom: "1rem",
                display: "inline-flex",
                justifyContent: "center",
                backgroundColor: "royalblue",
                color: "white",
                border: "10px solid royalblue",
                borderRadius: "8px",
            }}
            onClick={handleEmailEntered}
            >Sign in</button>
        </>
    );
}