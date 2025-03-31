import { useState } from "react";

export function ConnectButton() {
  const [address, setAddress] = useState(null);

  const handleConnect = () => {
    if (address) {
      setAddress(null);
      return;
    }

    window.postMessage({ type: "CONNECT_REQUEST" }, "*");
    window.addEventListener("message", (event) => {
      if (event.data.type === "CONNECT_RESPONSE") {
        if (event.data.success) {
          setAddress(event.data.address);
        } else {
          console.error("Connection Failed:", event.data.error);
        }
      }
    });
  };

  return (
    <>
      <button onClick={handleConnect}>
        {address ? `Connected: ${address}` : "Connect Wallet"}
      </button>
      {address && "Click the button above to disconnect"}
    </>
  );
}
