import { SingleBar } from "cli-progress";
import { MODEL, PROVIDER } from "../config";

export const pullModel = async () => {
  const { Ollama } = await import("ollama");
  const ollama = new Ollama();

  const it = await ollama.pull(MODEL);
  let pullingResult = await it.next();
  if (!pullingResult.done) {
    pullingResult = await it.next();

    const progressBar = new SingleBar({
      format:
        `${PROVIDER} - ${MODEL} pulling |` +
        "{bar}" +
        "| {percentage}% || {value}/{total} Chunks",
      barCompleteChar: "\u2588",
      barIncompleteChar: "\u2591",
      hideCursor: true,
    });

    progressBar.start(pullingResult.value.total, pullingResult.value.completed);
    while (
      !pullingResult.done &&
      pullingResult.value.total !== pullingResult.value.completed
    ) {
      progressBar.increment();
      progressBar.update(pullingResult.value.completed, {
        total: pullingResult.value.total,
      });
      pullingResult = await it.next();
    }
    progressBar.stop();
  }
};
