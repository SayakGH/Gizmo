import { inngest } from "./client";
import { createAgent, openai, gemini, grok } from "@inngest/agent-kit";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    const codeAgent = createAgent({
      name: "code-agent",
      system:
        "You are an expert next.js developer. You write readable maintainable code. You write simple next.js & React snipets.",
      model: gemini({ model: "gemini-1.5-flash" }),
      tools: [],
    });

    const { output } = await codeAgent.run(
      `write the following snippet: ${event.data.value}`
    );
    console.log(output);
    return { success: output };
  }
);
