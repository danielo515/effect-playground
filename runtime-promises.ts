import { Console, Effect, Schedule } from "effect";

const RepeatSchedule = Schedule.addDelay(Schedule.forever, () => "2 seconds");

const action = Effect.repeat(Console.log("Hola"), RepeatSchedule);
const action2 = Effect.repeat(Console.log("Hola 2"), RepeatSchedule);

const handleErrors = Effect.catchAll((error) => {
  console.error("Error", error);
  return Effect.void;
});

const program1 = Console.log("before Repeated 1")
  .pipe(
    Effect.flatMap(() => action),
    Effect.zipRight(Console.log("after Repeated 2")),
    Effect.zipRight(Effect.sleep("15 seconds")),
  )
  .pipe(handleErrors);

const program2 = Console.log("before Repeated 2")
  .pipe(
    Effect.flatMap(() => action2),
    Effect.zipRight(Console.log("after Repeated 2")),
    Effect.zipRight(Effect.sleep("15 seconds")),
  )
  .pipe(handleErrors);

const abort1 = new AbortController();
const abort2 = new AbortController();

Effect.runPromise(program1, { signal: abort1.signal }).then(() => {
  console.log("Done 1");
});

Effect.runPromise(program2, { signal: abort2.signal }).then(() => {
  console.log("Done 2");
});

setTimeout(() => {
  abort1.abort();
  abort2.abort();
}, 15000);
