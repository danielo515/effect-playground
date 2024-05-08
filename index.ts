import { Console, Effect, Schedule } from "effect";

const RepeatSchedule = Schedule.addDelay(Schedule.forever, () => "3 seconds");

const action = Effect.repeat(Console.log("Hola"), RepeatSchedule);

Console.log("before Repeated")
  .pipe(
    Effect.flatMap(() => action),
    Effect.zipRight(Console.log("after Repeated")),
    Effect.zipRight(Effect.sleep("15 seconds")),
  )
  .pipe(Effect.runPromise)
  .then(() => {
    console.log("Done");
  });

