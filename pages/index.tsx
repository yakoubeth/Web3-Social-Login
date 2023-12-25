import { ConnectWallet, MediaRenderer, Web3Button, useAddress, useBalance } from "@thirdweb-dev/react";
import { NextPage } from "next";
import EmailLogin from "../components/EmailLogin";
import { SocialLoginButton } from "../components/SocialLogin";

const Home: NextPage = () => {
  const address = useAddress();
  return (
    <div>
      {address ? (
        <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}>
          <ConnectWallet />
        </div>
        
      ) : (
        <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          height: "100vh",
        }}>
          <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            width: "100%",
            height: "100vh",
          }}>
            <div style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              padding: '0.5rem 1rem',
              borderBottom: '1px solid #ccc',
              width: '30%',
              height: '100%',
              
            }}>
              <div style={{
                minWidth: "80%",
              }}>
                <h1>Sign In</h1>
                <EmailLogin />
                <div style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  height: "2rem",
                  marginBottom: "1rem",
                  color: "#ccc",
                }}>
                  <hr style={{width:"45%", borderTop: "1px solid #ccc"}}/>
                  <p>or</p>
                  <hr style={{width:"45%", borderTop: "1px solid #ccc"}}/>
                </div>
                <SocialLoginButton strategy="google" />
                <SocialLoginButton strategy="apple" />
                <SocialLoginButton strategy="facebook" />
              </div>
            </div>
          </div>
        </div>
      )
      }
    </div>
  );
};

export default Home;
