import { Console, Effect, Layer, ManagedRuntime, Schedule } from "effect";

const RepeatSchedule = Schedule.addDelay(Schedule.forever, () => "2 seconds");

const action = Effect.repeat(Console.log("Hola"), RepeatSchedule);

const handleErrors = Effect.catchAllCause((error) => {
  console.error("Error", error);
  return Effect.void;
});

const makeProgram = (idx: number) =>
  Console.log(`before Repeated ${idx}`)
    .pipe(
      Effect.flatMap(() => action),
      Effect.zipRight(Console.log(`after Repeated ${idx}`)),
      Effect.zipRight(Effect.sleep("15 seconds")),
    )
    .pipe(handleErrors);

const program1 = makeProgram(1);
const program2 = makeProgram(1);

const runtime1 = ManagedRuntime.make(Layer.empty);
const runtime2 = ManagedRuntime.make(Layer.empty);

runtime1.runPromise(program1).then(() => {
  console.log("Done 1");
});

runtime2.runPromise(program2).then(() => {
  console.log("Done 2");
});

setTimeout(() => {
  runtime1.dispose();
  runtime2.dispose();
}, 15000);
