export const scenarios = [
  {
    "id": "3b-grounder-runners-1st-2nd-1out",
    "positionFocus": ["3B"],
    "baseRunners": { "first": true, "second": true, "third": false },
    "outs": 1,
    "ballLocation": { "x": 120, "y": 180 },
    "situation": "A sharp ground ball is hit directly to you, slightly to your glove side.",
    "question": "What's the primary play?",
    "options": [
      { "text": "Step on 3rd for the force, then throw to 1st for a double play.", "isCorrect": true },
      { "text": "Throw to 2nd to start a 5-4-3 double play.", "isCorrect": false },
      { "text": "Throw to 1st to get the batter-runner.", "isCorrect": false },
      { "text": "Tag the runner coming from 2nd.", "isCorrect": false }
    ],
    "explanation": "With a force at third and first, stepping on third and throwing to first is the most direct way to attempt a double play. A throw to second might be too slow for a force on the runner from first."
  },
  {
    "id": "ss-popup-bases-loaded-2outs",
    "positionFocus": ["SS", "2B", "P", "C"],
    "baseRunners": { "first": true, "second": true, "third": true },
    "outs": 2,
    "ballLocation": { "x": 220, "y": 150 },
    "situation": "Bases are loaded with 2 outs. A high pop-up is hit near the pitcher's mound, slightly towards second base.",
    "question": "Who should ideally catch this ball?",
    "options": [
      { "text": "The shortstop or second baseman, calling for it loudly.", "isCorrect": true },
      { "text": "The pitcher, as it's near the mound.", "isCorrect": false },
      { "text": "The catcher, running out to get it.", "isCorrect": false },
      { "text": "The third baseman, ranging over.", "isCorrect": false }
    ],
    "explanation": "Middle infielders (SS or 2B) generally have priority on pop-ups in the infield they can reach, as they are moving towards the ball and have a better angle. Clear communication is key. The pitcher should yield to an infielder who calls for it."
  },
  {
    "id": "cf-flyball-runner-on-3rd-1out",
    "positionFocus": ["CF", "LF", "RF"],
    "baseRunners": { "first": false, "second": false, "third": true },
    "outs": 1,
    "ballLocation": { "x": 200, "y": 100 },
    "situation": "Runner on 3rd, 1 out. A medium-depth fly ball is hit to you. You can make the catch with a little effort.",
    "question": "After catching the ball, what's your immediate priority?",
    "options": [
      { "text": "Make a strong, accurate throw to home plate to prevent the tag-up.", "isCorrect": true },
      { "text": "Throw to second base to keep a potential double from happening.", "isCorrect": false },
      { "text": "Run the ball back into the infield.", "isCorrect": false },
      { "text": "Check the runner at third, then throw to the cutoff man if the runner isn't going.", "isCorrect": false }
    ],
    "explanation": "With a runner on 3rd and less than 2 outs, any caught fly ball means the runner can tag up and try to score. Your primary responsibility is to make a quick, strong, and accurate throw to the plate. Hitting the cutoff man is also acceptable if the throw is deep, but the intent is to prevent the run."
  },
  {
    "id": "1b-grounder-no-one-on-0outs",
    "positionFocus": ["1B"],
    "baseRunners": { "first": false, "second": false, "third": false },
    "outs": 0,
    "ballLocation": { "x": 280, "y": 220 },
    "situation": "No one on, 0 outs. A routine ground ball is hit directly to you, near the bag.",
    "question": "What's the play?",
    "options": [
      { "text": "Field the ball and step on first base.", "isCorrect": true },
      { "text": "Field the ball and tag the runner.", "isCorrect": false },
      { "text": "Field the ball and throw to the pitcher covering first.", "isCorrect": false }
    ],
    "explanation": "If you can field the ball and easily reach the bag before the runner, that's the simplest play. Tagging is an option if the runner is close and you're off the bag. Only throw to the pitcher covering if you field the ball too far from the bag to get there yourself."
  },
  {
    "id": "3b-ball-hit-to-1b-0outs-nobase",
    "positionFocus": ["3B"],
    "baseRunners": { "first": false, "second": false, "third": false },
    "outs": 0,
    "ballLocation": { "x": 280, "y": 220 },
    "situation": "No runners on base, 0 outs. A ground ball is hit to the First Baseman.",
    "question": "What should you do?",
    "options": [
      { "text": "Cover third base.", "isCorrect": true },
      { "text": "Run towards first base to help out.", "isCorrect": false },
      { "text": "Do nothing, it's not your play.", "isCorrect": false },
      { "text": "Anticipate a throw to third.", "isCorrect": false }
    ],
    "explanation": "Even if the play is not directly to you, your responsibility is to cover your base. In this situation, it's unlikely the ball will come to you, but being in position is fundamental."
  },
  {
    "id": "ss-grounder-runner-on-1st-0outs",
    "positionFocus": ["SS"],
    "baseRunners": { "first": true, "second": false, "third": false },
    "outs": 0,
    "ballLocation": { "x": 180, "y": 180 },
    "situation": "Runner on 1st, 0 outs. A routine ground ball is hit to you.",
    "question": "What is your primary objective for a double play?",
    "options": [
      { "text": "Get the force out at 2nd, then throw to 1st.", "isCorrect": true },
      { "text": "Tag the runner going to 2nd, then throw to 1st.", "isCorrect": false },
      { "text": "Throw to 1st immediately.", "isCorrect": false },
      { "text": "Throw to 3rd to prevent advancement.", "isCorrect": false }
    ],
    "explanation": "With a runner on 1st and less than two outs, a ground ball to the shortstop is a classic 6-4-3 double play. Secure the out at 2nd (force play) first."
  },
  {
    "id": "2b-grounder-runner-on-1st-1out",
    "positionFocus": ["2B"],
    "baseRunners": { "first": true, "second": false, "third": false },
    "outs": 1,
    "ballLocation": { "x": 220, "y": 180 },
    "situation": "Runner on 1st, 1 out. A ground ball is hit slightly to your right. You field it moving towards 1st base.",
    "question": "What is the most likely play?",
    "options": [
      { "text": "Tag the runner yourself (if possible) or make a quick underhand toss to the SS covering 2nd, then see about 1st.", "isCorrect": true },
      { "text": "Throw to 1st base immediately.", "isCorrect": false },
      { "text": "Step on 2nd yourself and throw to 1st.", "isCorrect": false },
      { "text": "Throw home.", "isCorrect": false }
    ],
    "explanation": "If the ball takes you towards 2nd, you might step on the bag and throw to 1st. If it takes you towards 1st, the SS will likely cover 2nd. Getting the lead runner or the surest out at 2nd is priority for the double play if available."
  },
  {
    "id": "p-comebacker-no-one-on-0outs",
    "positionFocus": ["P"],
    "baseRunners": { "first": false, "second": false, "third": false },
    "outs": 0,
    "ballLocation": { "x": 200, "y": 200 },
    "situation": "No one on base, 0 outs. A sharp comebacker is hit right at you. You field it cleanly.",
    "question": "What do you do?",
    "options": [
      { "text": "Throw to 1st base.", "isCorrect": true },
      { "text": "Run to 1st base yourself.", "isCorrect": false },
      { "text": "Hold the ball.", "isCorrect": false },
      { "text": "Check for runners (there are none).", "isCorrect": false }
    ],
    "explanation": "With a clean field, the standard play for a pitcher on a comebacker with no one on is to throw to first base for the out."
  },
  {
    "id": "c-passed-ball-runner-on-3rd",
    "positionFocus": ["C"],
    "baseRunners": { "first": false, "second": false, "third": true },
    "outs": 1,
    "ballLocation": { "x": 200, "y": 320 },
    "situation": "Runner on 3rd, 1 out. The pitch gets by you (passed ball) and rolls towards the backstop.",
    "question": "What is your immediate action?",
    "options": [
      { "text": "Scramble back quickly, locate the ball, and if the runner is going, throw to the pitcher covering home.", "isCorrect": true },
      { "text": "Yell for the pitcher to get the ball.", "isCorrect": false },
      { "text": "Assume the runner will score and wait for the next pitch.", "isCorrect": false },
      { "text": "Throw to 3rd base to see if the runner is off the bag.", "isCorrect": false }
    ],
    "explanation": "The catcher's primary responsibility on a passed ball with a runner on third is to retrieve the ball as quickly as possible and make a play at the plate if the runner attempts to score. The pitcher should be covering home plate."
  },
  {
    "id": "ss-flyball-infield-fly-rule",
    "positionFocus": ["SS", "2B", "3B", "1B"],
    "baseRunners": { "first": true, "second": true, "third": false },
    "outs": 0,
    "ballLocation": { "x": 180, "y": 150 },
    "situation": "Runners on 1st and 2nd, 0 outs. A pop fly is hit to shallow left-center field, an ordinary effort for an infielder.",
    "question": "What rule might be in effect, and what is your responsibility?",
    "options": [
      { "text": "Infield Fly Rule. Batter is out if called. Make the catch if possible.", "isCorrect": true },
      { "text": "Tag-up play. Let it drop to try for a double play.", "isCorrect": false },
      { "text": "Force out at 3rd. Ignore the ball if another infielder calls it.", "isCorrect": false },
      { "text": "No special rule, play it as a normal pop fly.", "isCorrect": false }
    ],
    "explanation": "This is a classic Infield Fly Rule situation. With runners on 1st and 2nd (or bases loaded) and less than 2 outs, if an infielder can catch a fair pop fly with ordinary effort, the umpire should call 'Infield Fly, Batter's Out!'. You should still attempt to catch the ball."
  },
  {
    "id": "2b-covering-1st-ball-to-p",
    "positionFocus": ["2B"],
    "baseRunners": { "first": false, "second": false, "third": false },
    "outs": 1,
    "ballLocation": { "x": 200, "y": 220 },
    "situation": "No one on. The first baseman had to charge a slow roller. The pitcher fields the ball.",
    "question": "What should you be doing?",
    "options": [
      { "text": "Cover first base for the throw from the pitcher.", "isCorrect": true },
      { "text": "Back up second base.", "isCorrect": false },
      { "text": "Stay at your normal position.", "isCorrect": false },
      { "text": "Cover home plate.", "isCorrect": false }
    ],
    "explanation": "If the first baseman is drawn away from the bag (e.g., charging a bunt or slow roller) and the pitcher fields the ball, the second baseman is often responsible for covering first base to take the throw."
  }
]; 