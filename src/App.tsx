import { Button } from "@/components/ui/button";
import { invoke } from "@tauri-apps/api/core";
import { useState } from "react";

function App() {
  const [greeting, setGreeting] = useState("");
  const handleClick = () => {
    if (greeting) {
      setGreeting("");
      return;
    }
    invoke("greet", { name: "World" }).then((res) => {
      setGreeting(res as string);
    });
  };
  return (
    <div className="container flex min-h-svh flex-col items-center justify-center gap-4 mt-8">
      <Button onClick={handleClick}>Click me</Button>

      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-4xl font-bold text-center">{greeting}</h1>
        <p>This is a test</p>
      </div>
    </div>
  );
}

export default App;
