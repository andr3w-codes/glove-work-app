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
    "positionFocus": ["SS"],
    "baseRunners": { "first": true, "second": true, "third": true },
    "outs": 2,
    "ballLocation": { "x": 220, "y": 150 },
    "situation": "Bases are loaded with 2 outs. A high pop-up is hit near the pitcher's mound, slightly towards second base.",
    "question": "What should you do?",
    "options": [
      { "text": "Call for the ball loudly and make the catch if you can reach it.", "isCorrect": true },
      { "text": "Let the pitcher catch it since it's near the mound.", "isCorrect": false },
      { "text": "Let the second baseman catch it.", "isCorrect": false },
      { "text": "Stay at shortstop and watch the play.", "isCorrect": false }
    ],
    "explanation": "As the shortstop, you have priority on pop-ups in the infield you can reach. Clear communication is key. Call for the ball loudly if you can make the play."
  },
  {
    "id": "cf-flyball-runner-on-3rd-1out",
    "positionFocus": ["CF"],
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
    "id": "c-passed-ball-runner-on-3rd-1out",
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
  },
  {
    "id": "rf-line-drive-runner-on-2nd-1out",
    "positionFocus": ["RF"],
    "baseRunners": { "first": false, "second": true, "third": false },
    "outs": 1,
    "ballLocation": { "x": 320, "y": 80 },
    "situation": "Runner on 2nd, 1 out. A line drive is hit to you in right field.",
    "question": "What's your priority after fielding the ball?",
    "options": [
      { "text": "Make a strong throw to third base to prevent the runner from advancing.", "isCorrect": true },
      { "text": "Throw to second base to keep the runner from advancing.", "isCorrect": false },
      { "text": "Throw to first base to get the batter.", "isCorrect": false },
      { "text": "Hold the ball and check the runner's position.", "isCorrect": false }
    ],
    "explanation": "With a runner on second and one out, preventing the runner from advancing to third is crucial. A strong, accurate throw to third base is the priority, as it keeps the runner from being in scoring position."
  },
  {
    "id": "lf-flyball-runner-on-1st-0outs",
    "positionFocus": ["LF"],
    "baseRunners": { "first": true, "second": false, "third": false },
    "outs": 0,
    "ballLocation": { "x": 80, "y": 80 },
    "situation": "Runner on 1st, 0 outs. A deep fly ball is hit to you in left field.",
    "question": "What's your priority after catching the ball?",
    "options": [
      { "text": "Make a strong throw to second base to prevent the runner from advancing.", "isCorrect": true },
      { "text": "Throw to first base to get the batter.", "isCorrect": false },
      { "text": "Throw to third base to prevent a triple.", "isCorrect": false },
      { "text": "Hold the ball and check the runner's position.", "isCorrect": false }
    ],
    "explanation": "With a runner on first and no outs, preventing the runner from advancing to second is crucial. A strong, accurate throw to second base is the priority, as it keeps the runner from being in scoring position."
  },
  {
    "id": "lf-flyball-runner-on-2nd-1out",
    "positionFocus": ["LF"],
    "baseRunners": { "first": false, "second": true, "third": false },
    "outs": 1,
    "ballLocation": { "x": 80, "y": 80 },
    "situation": "Runner on 2nd, 1 out. A deep fly ball is hit to you in left field.",
    "question": "What's your priority after catching the ball?",
    "options": [
      { "text": "Make a strong throw to third base to prevent the runner from advancing.", "isCorrect": true },
      { "text": "Throw to second base to keep the runner from advancing.", "isCorrect": false },
      { "text": "Throw to first base to get the batter.", "isCorrect": false },
      { "text": "Hold the ball and check the runner's position.", "isCorrect": false }
    ],
    "explanation": "With a runner on second and one out, preventing the runner from advancing to third is crucial. A strong, accurate throw to third base is the priority, as it keeps the runner from being in scoring position."
  },
  {
    "id": "lf-flyball-runner-on-3rd-2outs",
    "positionFocus": ["LF"],
    "baseRunners": { "first": false, "second": false, "third": true },
    "outs": 2,
    "ballLocation": { "x": 80, "y": 80 },
    "situation": "Runner on 3rd, 2 outs. A deep fly ball is hit to you in left field.",
    "question": "What's your priority after catching the ball?",
    "options": [
      { "text": "Make a strong throw to home plate to prevent the runner from scoring.", "isCorrect": true },
      { "text": "Throw to third base to keep the runner from advancing.", "isCorrect": false },
      { "text": "Throw to second base to prevent a double.", "isCorrect": false },
      { "text": "Hold the ball and check the runner's position.", "isCorrect": false }
    ],
    "explanation": "With a runner on third and two outs, preventing the runner from scoring is the top priority. A strong, accurate throw to home plate is crucial, as it could be the final out of the inning."
  },
  {
    "id": "lf-line-drive-runner-on-1st-0outs",
    "positionFocus": ["LF"],
    "baseRunners": { "first": true, "second": false, "third": false },
    "outs": 0,
    "ballLocation": { "x": 80, "y": 80 },
    "situation": "Runner on 1st, 0 outs. A line drive is hit to you in left field.",
    "question": "What's your priority after fielding the ball?",
    "options": [
      { "text": "Make a strong throw to second base to prevent the runner from advancing.", "isCorrect": true },
      { "text": "Throw to first base to get the batter.", "isCorrect": false },
      { "text": "Throw to third base to prevent a triple.", "isCorrect": false },
      { "text": "Hold the ball and check the runner's position.", "isCorrect": false }
    ],
    "explanation": "With a runner on first and no outs, preventing the runner from advancing to second is crucial. A strong, accurate throw to second base is the priority, as it keeps the runner from being in scoring position."
  },
  {
    "id": "lf-line-drive-runner-on-2nd-1out",
    "positionFocus": ["LF"],
    "baseRunners": { "first": false, "second": true, "third": false },
    "outs": 1,
    "ballLocation": { "x": 80, "y": 80 },
    "situation": "Runner on 2nd, 1 out. A line drive is hit to you in left field.",
    "question": "What's your priority after fielding the ball?",
    "options": [
      { "text": "Make a strong throw to third base to prevent the runner from advancing.", "isCorrect": true },
      { "text": "Throw to second base to keep the runner from advancing.", "isCorrect": false },
      { "text": "Throw to first base to get the batter.", "isCorrect": false },
      { "text": "Hold the ball and check the runner's position.", "isCorrect": false }
    ],
    "explanation": "With a runner on second and one out, preventing the runner from advancing to third is crucial. A strong, accurate throw to third base is the priority, as it keeps the runner from being in scoring position."
  },
  {
    "id": "cf-flyball-runner-on-1st-0outs",
    "positionFocus": ["CF"],
    "baseRunners": { "first": true, "second": false, "third": false },
    "outs": 0,
    "ballLocation": { "x": 200, "y": 30 },
    "situation": "Runner on 1st, 0 outs. A deep fly ball is hit to you in center field.",
    "question": "What's your priority after catching the ball?",
    "options": [
      { "text": "Make a strong throw to second base to prevent the runner from advancing.", "isCorrect": true },
      { "text": "Throw to first base to get the batter.", "isCorrect": false },
      { "text": "Throw to third base to prevent a triple.", "isCorrect": false },
      { "text": "Hold the ball and check the runner's position.", "isCorrect": false }
    ],
    "explanation": "With a runner on first and no outs, preventing the runner from advancing to second is crucial. A strong, accurate throw to second base is the priority, as it keeps the runner from being in scoring position."
  },
  {
    "id": "p-bunt-runner-on-1st-0outs",
    "positionFocus": ["P", "1B", "3B"],
    "baseRunners": { "first": true, "second": false, "third": false },
    "outs": 0,
    "ballLocation": { "x": 200, "y": 200 },
    "situation": "Runner on 1st, 0 outs. A bunt is laid down in front of the plate.",
    "question": "What's your priority after fielding the ball?",
    "options": [
      { "text": "Throw to second base to get the lead runner.", "isCorrect": true },
      { "text": "Throw to first base to get the batter.", "isCorrect": false },
      { "text": "Hold the ball and check the runner's position.", "isCorrect": false },
      { "text": "Throw to third base to prevent a triple.", "isCorrect": false }
    ],
    "explanation": "With a runner on first and no outs, getting the lead runner at second is the priority. A quick, accurate throw to second base is crucial, as it prevents the runner from being in scoring position."
  },
  {
    "id": "c-passed-ball-runner-on-2nd-1out",
    "positionFocus": ["C", "P"],
    "baseRunners": { "first": false, "second": true, "third": false },
    "outs": 1,
    "ballLocation": { "x": 200, "y": 320 },
    "situation": "Runner on 2nd, 1 out. The pitch gets by you (passed ball) and rolls towards the backstop.",
    "question": "What's your immediate action?",
    "options": [
      { "text": "Scramble back quickly, locate the ball, and if the runner is going, throw to the pitcher covering home.", "isCorrect": true },
      { "text": "Yell for the pitcher to get the ball.", "isCorrect": false },
      { "text": "Assume the runner will score and wait for the next pitch.", "isCorrect": false },
      { "text": "Throw to 2nd base to see if the runner is off the bag.", "isCorrect": false }
    ],
    "explanation": "The catcher's primary responsibility on a passed ball with a runner on second is to retrieve the ball as quickly as possible and make a play at the plate if the runner attempts to score. The pitcher should be covering home plate."
  },
  {
    "id": "c-steal-2nd-runner-on-1st-1out",
    "positionFocus": ["C"],
    "baseRunners": { "first": true, "second": false, "third": false },
    "outs": 1,
    "ballLocation": { "x": 200, "y": 320 },
    "situation": "Runner on 1st, 1 out. The runner takes off for second base on the pitch.",
    "question": "What's your immediate action?",
    "options": [
      { "text": "Pop up quickly, make a strong throw to second base, aiming for the shortstop covering the bag.", "isCorrect": true },
      { "text": "Hold the ball and check other runners.", "isCorrect": false },
      { "text": "Throw to first base to keep the runner close.", "isCorrect": false },
      { "text": "Wait for the pitch to be called before throwing.", "isCorrect": false }
    ],
    "explanation": "In youth baseball, quick, accurate throws are crucial. Pop up quickly and make a strong throw to second base. The shortstop should be covering the bag on a steal attempt."
  },
  {
    "id": "ss-steal-3rd-runner-on-2nd-0outs",
    "positionFocus": ["SS"],
    "baseRunners": { "first": false, "second": true, "third": false },
    "outs": 0,
    "ballLocation": { "x": 200, "y": 320 },
    "situation": "Runner on 2nd, 0 outs. The runner takes off for third base on the pitch.",
    "question": "What should you do?",
    "options": [
      { "text": "Cover third base and be ready to receive the throw from the catcher.", "isCorrect": true },
      { "text": "Stay at shortstop and let the third baseman handle it.", "isCorrect": false },
      { "text": "Run towards second base to back up the throw.", "isCorrect": false },
      { "text": "Stay in position and watch the play.", "isCorrect": false }
    ],
    "explanation": "In youth baseball, the shortstop should cover third base on steal attempts. This provides a better angle for the throw from the catcher and helps prevent the runner from advancing."
  },
  {
    "id": "rf-deep-fly-cutoff-runner-on-1st-0outs",
    "positionFocus": ["RF"],
    "baseRunners": { "first": true, "second": false, "third": false },
    "outs": 0,
    "ballLocation": { "x": 320, "y": 80 },
    "situation": "Runner on 1st, 0 outs. A deep fly ball is hit to you in right field.",
    "question": "After catching the ball, what's your priority?",
    "options": [
      { "text": "Make a strong throw to the cutoff man (second baseman) to prevent the runner from advancing to third.", "isCorrect": true },
      { "text": "Throw directly to second base.", "isCorrect": false },
      { "text": "Throw to first base to get the batter.", "isCorrect": false },
      { "text": "Hold the ball and check the runner's position.", "isCorrect": false }
    ],
    "explanation": "In youth baseball, hitting the cutoff man is crucial. The second baseman should be positioned as the cutoff man, ready to relay the throw to the appropriate base."
  },
  {
    "id": "2b-cutoff-deep-fly-runner-on-2nd-1out",
    "positionFocus": ["2B"],
    "baseRunners": { "first": false, "second": true, "third": false },
    "outs": 1,
    "ballLocation": { "x": 320, "y": 80 },
    "situation": "Runner on 2nd, 1 out. A deep fly ball is hit to right field.",
    "question": "What should you do?",
    "options": [
      { "text": "Position yourself as the cutoff man between right field and third base, ready to relay the throw.", "isCorrect": true },
      { "text": "Cover second base.", "isCorrect": false },
      { "text": "Run to right field to help.", "isCorrect": false },
      { "text": "Stay at second base and watch the play.", "isCorrect": false }
    ],
    "explanation": "In youth baseball, the second baseman should position themselves as the cutoff man on deep fly balls to right field. This helps prevent the runner from advancing to third base."
  },
  {
    "id": "ss-cutoff-deep-fly-runner-on-1st-0outs",
    "positionFocus": ["SS"],
    "baseRunners": { "first": true, "second": false, "third": false },
    "outs": 0,
    "ballLocation": { "x": 80, "y": 80 },
    "situation": "Runner on 1st, 0 outs. A deep fly ball is hit to left field.",
    "question": "What should you do?",
    "options": [
      { "text": "Position yourself as the cutoff man between left field and third base, ready to relay the throw.", "isCorrect": true },
      { "text": "Cover second base.", "isCorrect": false },
      { "text": "Run to left field to help.", "isCorrect": false },
      { "text": "Stay at shortstop and watch the play.", "isCorrect": false }
    ],
    "explanation": "In youth baseball, the shortstop should position themselves as the cutoff man on deep fly balls to left field. This helps prevent the runner from advancing to third base."
  },
  {
    "id": "cf-deep-fly-cutoff-runner-on-2nd-1out",
    "positionFocus": ["CF"],
    "baseRunners": { "first": false, "second": true, "third": false },
    "outs": 1,
    "ballLocation": { "x": 200, "y": 30 },
    "situation": "Runner on 2nd, 1 out. A deep fly ball is hit to you in center field.",
    "question": "After catching the ball, what's your priority?",
    "options": [
      { "text": "Make a strong throw to the cutoff man (shortstop) to prevent the runner from advancing to third.", "isCorrect": true },
      { "text": "Throw directly to third base.", "isCorrect": false },
      { "text": "Throw to second base to keep the runner from advancing.", "isCorrect": false },
      { "text": "Hold the ball and check the runner's position.", "isCorrect": false }
    ],
    "explanation": "In youth baseball, hitting the cutoff man is crucial. The shortstop should be positioned as the cutoff man, ready to relay the throw to the appropriate base."
  },
  {
    "id": "3b-steal-home-runner-on-3rd-2outs",
    "positionFocus": ["3B"],
    "baseRunners": { "first": false, "second": false, "third": true },
    "outs": 2,
    "ballLocation": { "x": 120, "y": 180 },
    "situation": "Runner on 3rd, 2 outs. The runner takes off for home on the pitch.",
    "question": "What should you do?",
    "options": [
      { "text": "Cover third base in case the runner retreats, and be ready to receive a throw from the catcher.", "isCorrect": true },
      { "text": "Run to home plate to help.", "isCorrect": false },
      { "text": "Stay at third base and watch the play.", "isCorrect": false },
      { "text": "Run to second base to back up the throw.", "isCorrect": false }
    ],
    "explanation": "In youth baseball, the third baseman should cover third base on steal attempts. This provides a better angle for the throw from the catcher and helps prevent the runner from advancing."
  },
  {
    "id": "lf-deep-fly-cutoff-runner-on-1st-1out",
    "positionFocus": ["LF"],
    "baseRunners": { "first": true, "second": false, "third": false },
    "outs": 1,
    "ballLocation": { "x": 80, "y": 80 },
    "situation": "Runner on 1st, 1 out. A deep fly ball is hit to you in left field.",
    "question": "After catching the ball, what's your priority?",
    "options": [
      { "text": "Make a strong throw to the cutoff man (shortstop) to prevent the runner from advancing to third.", "isCorrect": true },
      { "text": "Throw directly to second base.", "isCorrect": false },
      { "text": "Throw to first base to get the batter.", "isCorrect": false },
      { "text": "Hold the ball and check the runner's position.", "isCorrect": false }
    ],
    "explanation": "In youth baseball, hitting the cutoff man is crucial. The shortstop should be positioned as the cutoff man, ready to relay the throw to the appropriate base."
  },
  {
    "id": "ss-deep-fly-cutoff-runner-on-2nd-1out",
    "positionFocus": ["SS"],
    "baseRunners": { "first": false, "second": true, "third": false },
    "outs": 1,
    "ballLocation": { "x": 200, "y": 30 },
    "situation": "Runner on 2nd, 1 out. A deep fly ball is hit to center field.",
    "question": "What should you do?",
    "options": [
      { "text": "Position yourself as the cutoff man between center field and third base, ready to relay the throw.", "isCorrect": true },
      { "text": "Cover second base.", "isCorrect": false },
      { "text": "Run to center field to help.", "isCorrect": false },
      { "text": "Stay at shortstop and watch the play.", "isCorrect": false }
    ],
    "explanation": "In youth baseball, the shortstop should position themselves as the cutoff man on deep fly balls to center field. This helps prevent the runner from advancing to third base."
  },
  {
    "id": "ss-bunt-runner-on-1st-0outs",
    "positionFocus": ["SS"],
    "baseRunners": { "first": true, "second": false, "third": false },
    "outs": 0,
    "ballLocation": { "x": 200, "y": 250 },
    "situation": "Runner on 1st, 0 outs. A bunt is laid down in front of the plate.",
    "question": "What should you do?",
    "options": [
      { "text": "Cover second base to receive the throw from the pitcher or catcher.", "isCorrect": true },
      { "text": "Run to first base to help.", "isCorrect": false },
      { "text": "Stay at shortstop and watch the play.", "isCorrect": false },
      { "text": "Run to third base to prevent advancement.", "isCorrect": false }
    ],
    "explanation": "On a bunt with a runner on first, the shortstop should cover second base to receive the throw from the pitcher or catcher. This helps prevent the runner from advancing to second."
  },
  {
    "id": "ss-deep-fly-cutoff-runner-on-1st-0outs",
    "positionFocus": ["SS"],
    "baseRunners": { "first": true, "second": false, "third": false },
    "outs": 0,
    "ballLocation": { "x": 80, "y": 80 },
    "situation": "Runner on 1st, 0 outs. A deep fly ball is hit to left field.",
    "question": "What should you do?",
    "options": [
      { "text": "Position yourself as the cutoff man between left field and third base, ready to relay the throw.", "isCorrect": true },
      { "text": "Cover second base.", "isCorrect": false },
      { "text": "Run to left field to help.", "isCorrect": false },
      { "text": "Stay at shortstop and watch the play.", "isCorrect": false }
    ],
    "explanation": "In youth baseball, the shortstop should position themselves as the cutoff man on deep fly balls to left field. This helps prevent the runner from advancing to third base."
  },
  {
    "id": "1b-bunt-runner-on-1st-0outs",
    "positionFocus": ["1B"],
    "baseRunners": { "first": true, "second": false, "third": false },
    "outs": 0,
    "ballLocation": { "x": 200, "y": 200 },
    "situation": "Runner on 1st, 0 outs. A bunt is laid down in front of the plate.",
    "question": "What should you do?",
    "options": [
      { "text": "Charge in to field the bunt, then throw to second base to get the lead runner.", "isCorrect": true },
      { "text": "Stay at first base and wait for the throw.", "isCorrect": false },
      { "text": "Run to home plate to help.", "isCorrect": false },
      { "text": "Stay at first base and watch the play.", "isCorrect": false }
    ],
    "explanation": "On a bunt with a runner on first, the first baseman should charge in to field the bunt. This helps prevent the runner from advancing to second."
  },
  {
    "id": "1b-popup-runner-on-1st-1out",
    "positionFocus": ["1B"],
    "baseRunners": { "first": true, "second": false, "third": false },
    "outs": 1,
    "ballLocation": { "x": 280, "y": 220 },
    "situation": "Runner on 1st, 1 out. A pop-up is hit to you in foul territory.",
    "question": "What should you do?",
    "options": [
      { "text": "Call for the ball loudly and make the catch if you can reach it.", "isCorrect": true },
      { "text": "Let the catcher catch it since it's in foul territory.", "isCorrect": false },
      { "text": "Let the pitcher catch it.", "isCorrect": false },
      { "text": "Stay at first base and watch the play.", "isCorrect": false }
    ],
    "explanation": "As the first baseman, you have priority on pop-ups in foul territory you can reach. Clear communication is key. Call for the ball loudly if you can make the play."
  },
  {
    "id": "1b-grounder-runner-on-2nd-1out",
    "positionFocus": ["1B"],
    "baseRunners": { "first": false, "second": true, "third": false },
    "outs": 1,
    "ballLocation": { "x": 280, "y": 220 },
    "situation": "Runner on 2nd, 1 out. A ground ball is hit to you.",
    "question": "What should you do?",
    "options": [
      { "text": "Field the ball and throw to third base to prevent the runner from advancing.", "isCorrect": true },
      { "text": "Field the ball and throw to second base.", "isCorrect": false },
      { "text": "Field the ball and throw to first base.", "isCorrect": false },
      { "text": "Hold the ball and check the runner's position.", "isCorrect": false }
    ],
    "explanation": "With a runner on second and one out, preventing the runner from advancing to third is crucial. A strong, accurate throw to third base is the priority, as it keeps the runner from being in scoring position."
  },
  {
    "id": "1b-grounder-runner-on-3rd-2outs",
    "positionFocus": ["1B"],
    "baseRunners": { "first": false, "second": false, "third": true },
    "outs": 2,
    "ballLocation": { "x": 280, "y": 220 },
    "situation": "Runner on 3rd, 2 outs. A ground ball is hit to you.",
    "question": "What should you do?",
    "options": [
      { "text": "Field the ball and throw to home plate to prevent the runner from scoring.", "isCorrect": true },
      { "text": "Field the ball and throw to third base.", "isCorrect": false },
      { "text": "Field the ball and throw to first base.", "isCorrect": false },
      { "text": "Hold the ball and check the runner's position.", "isCorrect": false }
    ],
    "explanation": "With a runner on third and two outs, preventing the runner from scoring is the top priority. A strong, accurate throw to home plate is crucial, as it could be the final out of the inning."
  },
  {
    "id": "2b-grounder-runner-on-1st-0outs",
    "positionFocus": ["2B"],
    "baseRunners": { "first": true, "second": false, "third": false },
    "outs": 0,
    "ballLocation": { "x": 220, "y": 180 },
    "situation": "Runner on 1st, 0 outs. A ground ball is hit to you.",
    "question": "What is your primary objective for a double play?",
    "options": [
      { "text": "Get the force out at 2nd, then throw to 1st.", "isCorrect": true },
      { "text": "Tag the runner going to 2nd, then throw to 1st.", "isCorrect": false },
      { "text": "Throw to 1st immediately.", "isCorrect": false },
      { "text": "Throw to 3rd to prevent advancement.", "isCorrect": false }
    ],
    "explanation": "With a runner on 1st and less than two outs, a ground ball to the second baseman is a classic 4-6-3 double play. Secure the out at 2nd (force play) first."
  },
  {
    "id": "2b-bunt-runner-on-1st-0outs",
    "positionFocus": ["2B"],
    "baseRunners": { "first": true, "second": false, "third": false },
    "outs": 0,
    "ballLocation": { "x": 200, "y": 200 },
    "situation": "Runner on 1st, 0 outs. A bunt is laid down in front of the plate.",
    "question": "What should you do?",
    "options": [
      { "text": "Cover second base to receive the throw from the pitcher or catcher.", "isCorrect": true },
      { "text": "Run to first base to help.", "isCorrect": false },
      { "text": "Stay at second base and watch the play.", "isCorrect": false },
      { "text": "Run to third base to prevent advancement.", "isCorrect": false }
    ],
    "explanation": "On a bunt with a runner on first, the second baseman should cover second base to receive the throw from the pitcher or catcher. This helps prevent the runner from advancing to second."
  },
  {
    "id": "2b-popup-runner-on-1st-1out",
    "positionFocus": ["2B"],
    "baseRunners": { "first": true, "second": false, "third": false },
    "outs": 1,
    "ballLocation": { "x": 220, "y": 180 },
    "situation": "Runner on 1st, 1 out. A pop-up is hit to you in shallow right field.",
    "question": "What should you do?",
    "options": [
      { "text": "Call for the ball loudly and make the catch if you can reach it.", "isCorrect": true },
      { "text": "Let the right fielder catch it since it's in the outfield.", "isCorrect": false },
      { "text": "Let the pitcher catch it.", "isCorrect": false },
      { "text": "Stay at second base and watch the play.", "isCorrect": false }
    ],
    "explanation": "As the second baseman, you have priority on pop-ups in shallow right field you can reach. Clear communication is key. Call for the ball loudly if you can make the play."
  },
  {
    "id": "2b-grounder-runner-on-2nd-1out",
    "positionFocus": ["2B"],
    "baseRunners": { "first": false, "second": true, "third": false },
    "outs": 1,
    "ballLocation": { "x": 220, "y": 180 },
    "situation": "Runner on 2nd, 1 out. A ground ball is hit to you.",
    "question": "What should you do?",
    "options": [
      { "text": "Field the ball and throw to third base to prevent the runner from advancing.", "isCorrect": true },
      { "text": "Field the ball and throw to second base.", "isCorrect": false },
      { "text": "Field the ball and throw to first base.", "isCorrect": false },
      { "text": "Hold the ball and check the runner's position.", "isCorrect": false }
    ],
    "explanation": "With a runner on second and one out, preventing the runner from advancing to third is crucial. A strong, accurate throw to third base is the priority, as it keeps the runner from being in scoring position."
  },
  {
    "id": "2b-grounder-runner-on-3rd-2outs",
    "positionFocus": ["2B"],
    "baseRunners": { "first": false, "second": false, "third": true },
    "outs": 2,
    "ballLocation": { "x": 220, "y": 180 },
    "situation": "Runner on 3rd, 2 outs. A ground ball is hit to you.",
    "question": "What should you do?",
    "options": [
      { "text": "Field the ball and throw to home plate to prevent the runner from scoring.", "isCorrect": true },
      { "text": "Field the ball and throw to third base.", "isCorrect": false },
      { "text": "Field the ball and throw to first base.", "isCorrect": false },
      { "text": "Hold the ball and check the runner's position.", "isCorrect": false }
    ],
    "explanation": "With a runner on third and two outs, preventing the runner from scoring is the top priority. A strong, accurate throw to home plate is crucial, as it could be the final out of the inning."
  },
  {
    "id": "3b-bunt-runner-on-1st-0outs",
    "positionFocus": ["3B"],
    "baseRunners": { "first": true, "second": false, "third": false },
    "outs": 0,
    "ballLocation": { "x": 200, "y": 200 },
    "situation": "Runner on 1st, 0 outs. A bunt is laid down in front of the plate.",
    "question": "What should you do?",
    "options": [
      { "text": "Charge in to field the bunt, then throw to second base to get the lead runner.", "isCorrect": true },
      { "text": "Stay at third base and wait for the throw.", "isCorrect": false },
      { "text": "Run to home plate to help.", "isCorrect": false },
      { "text": "Stay at third base and watch the play.", "isCorrect": false }
    ],
    "explanation": "On a bunt with a runner on first, the third baseman should charge in to field the bunt. This helps prevent the runner from advancing to second."
  },
  {
    "id": "3b-popup-runner-on-1st-1out",
    "positionFocus": ["3B"],
    "baseRunners": { "first": true, "second": false, "third": false },
    "outs": 1,
    "ballLocation": { "x": 120, "y": 180 },
    "situation": "Runner on 1st, 1 out. A pop-up is hit to you in foul territory.",
    "question": "What should you do?",
    "options": [
      { "text": "Call for the ball loudly and make the catch if you can reach it.", "isCorrect": true },
      { "text": "Let the catcher catch it since it's in foul territory.", "isCorrect": false },
      { "text": "Let the pitcher catch it.", "isCorrect": false },
      { "text": "Stay at third base and watch the play.", "isCorrect": false }
    ],
    "explanation": "As the third baseman, you have priority on pop-ups in foul territory you can reach. Clear communication is key. Call for the ball loudly if you can make the play."
  },
  {
    "id": "3b-grounder-runner-on-2nd-1out",
    "positionFocus": ["3B"],
    "baseRunners": { "first": false, "second": true, "third": false },
    "outs": 1,
    "ballLocation": { "x": 120, "y": 180 },
    "situation": "Runner on 2nd, 1 out. A ground ball is hit to you.",
    "question": "What should you do?",
    "options": [
      { "text": "Field the ball and throw to first base to get the batter-runner.", "isCorrect": true },
      { "text": "Field the ball and throw to second base.", "isCorrect": false },
      { "text": "Field the ball and throw to third base.", "isCorrect": false },
      { "text": "Hold the ball and check the runner's position.", "isCorrect": false }
    ],
    "explanation": "With a runner on second and one out, getting the batter-runner at first is the priority. A strong, accurate throw to first base is crucial, as it keeps the runner from being in scoring position."
  },
  {
    "id": "3b-grounder-runner-on-3rd-2outs",
    "positionFocus": ["3B"],
    "baseRunners": { "first": false, "second": false, "third": true },
    "outs": 2,
    "ballLocation": { "x": 120, "y": 180 },
    "situation": "Runner on 3rd, 2 outs. A ground ball is hit to you.",
    "question": "What should you do?",
    "options": [
      { "text": "Field the ball and throw to first base to get the batter-runner.", "isCorrect": true },
      { "text": "Field the ball and throw to third base.", "isCorrect": false },
      { "text": "Field the ball and throw to home plate.", "isCorrect": false },
      { "text": "Hold the ball and check the runner's position.", "isCorrect": false }
    ],
    "explanation": "With a runner on third and two outs, getting the batter-runner at first is the top priority. A strong, accurate throw to first base is crucial, as it could be the final out of the inning."
  },
  {
    "id": "cf-flyball-runner-on-2nd-1out",
    "positionFocus": ["CF"],
    "baseRunners": { "first": false, "second": true, "third": false },
    "outs": 1,
    "ballLocation": { "x": 200, "y": 30 },
    "situation": "Runner on 2nd, 1 out. A deep fly ball is hit to you in center field.",
    "question": "What's your priority after catching the ball?",
    "options": [
      { "text": "Make a strong throw to third base to prevent the runner from advancing.", "isCorrect": true },
      { "text": "Throw to second base to keep the runner from advancing.", "isCorrect": false },
      { "text": "Throw to first base to get the batter.", "isCorrect": false },
      { "text": "Hold the ball and check the runner's position.", "isCorrect": false }
    ],
    "explanation": "With a runner on second and one out, preventing the runner from advancing to third is crucial. A strong, accurate throw to third base is the priority, as it keeps the runner from being in scoring position."
  },
  {
    "id": "cf-flyball-runner-on-3rd-2outs",
    "positionFocus": ["CF"],
    "baseRunners": { "first": false, "second": false, "third": true },
    "outs": 2,
    "ballLocation": { "x": 200, "y": 30 },
    "situation": "Runner on 3rd, 2 outs. A deep fly ball is hit to you in center field.",
    "question": "What's your priority after catching the ball?",
    "options": [
      { "text": "Make a strong throw to home plate to prevent the runner from scoring.", "isCorrect": true },
      { "text": "Throw to third base to keep the runner from advancing.", "isCorrect": false },
      { "text": "Throw to second base to prevent a double.", "isCorrect": false },
      { "text": "Hold the ball and check the runner's position.", "isCorrect": false }
    ],
    "explanation": "With a runner on third and two outs, preventing the runner from scoring is the top priority. A strong, accurate throw to home plate is crucial, as it could be the final out of the inning."
  },
  {
    "id": "cf-line-drive-runner-on-1st-0outs",
    "positionFocus": ["CF"],
    "baseRunners": { "first": true, "second": false, "third": false },
    "outs": 0,
    "ballLocation": { "x": 200, "y": 30 },
    "situation": "Runner on 1st, 0 outs. A line drive is hit to you in center field.",
    "question": "What's your priority after fielding the ball?",
    "options": [
      { "text": "Make a strong throw to second base to prevent the runner from advancing.", "isCorrect": true },
      { "text": "Throw to first base to get the batter.", "isCorrect": false },
      { "text": "Throw to third base to prevent a triple.", "isCorrect": false },
      { "text": "Hold the ball and check the runner's position.", "isCorrect": false }
    ],
    "explanation": "With a runner on first and no outs, preventing the runner from advancing to second is crucial. A strong, accurate throw to second base is the priority, as it keeps the runner from being in scoring position."
  },
  {
    "id": "cf-line-drive-runner-on-2nd-1out",
    "positionFocus": ["CF"],
    "baseRunners": { "first": false, "second": true, "third": false },
    "outs": 1,
    "ballLocation": { "x": 200, "y": 30 },
    "situation": "Runner on 2nd, 1 out. A line drive is hit to you in center field.",
    "question": "What's your priority after fielding the ball?",
    "options": [
      { "text": "Make a strong throw to third base to prevent the runner from advancing.", "isCorrect": true },
      { "text": "Throw to second base to keep the runner from advancing.", "isCorrect": false },
      { "text": "Throw to first base to get the batter.", "isCorrect": false },
      { "text": "Hold the ball and check the runner's position.", "isCorrect": false }
    ],
    "explanation": "With a runner on second and one out, preventing the runner from advancing to third is crucial. A strong, accurate throw to third base is the priority, as it keeps the runner from being in scoring position."
  },
  {
    "id": "c-steal-2nd-runner-on-1st-1out",
    "positionFocus": ["C"],
    "baseRunners": { "first": true, "second": false, "third": false },
    "outs": 1,
    "ballLocation": { "x": 200, "y": 320 },
    "situation": "Runner on 1st, 1 out. The runner takes off for second base on the pitch.",
    "question": "What's your immediate action?",
    "options": [
      { "text": "Pop up quickly, make a strong throw to second base, aiming for the shortstop covering the bag.", "isCorrect": true },
      { "text": "Hold the ball and check other runners.", "isCorrect": false },
      { "text": "Throw to first base to keep the runner close.", "isCorrect": false },
      { "text": "Wait for the pitch to be called before throwing.", "isCorrect": false }
    ],
    "explanation": "In youth baseball, quick, accurate throws are crucial. Pop up quickly and make a strong throw to second base. The shortstop should be covering the bag on a steal attempt."
  },
  {
    "id": "c-bunt-runner-on-1st-0outs",
    "positionFocus": ["C"],
    "baseRunners": { "first": true, "second": false, "third": false },
    "outs": 0,
    "ballLocation": { "x": 200, "y": 250 },
    "situation": "Runner on 1st, 0 outs. A bunt is laid down in front of the plate.",
    "question": "What should you do?",
    "options": [
      { "text": "Charge out quickly, field the bunt, and throw to second base to get the lead runner.", "isCorrect": true },
      { "text": "Stay at home plate and wait for the throw.", "isCorrect": false },
      { "text": "Let the pitcher field it.", "isCorrect": false },
      { "text": "Stay at home plate and watch the play.", "isCorrect": false }
    ],
    "explanation": "On a bunt with a runner on first, the catcher should charge out quickly to field the bunt. This helps prevent the runner from advancing to second."
  },
  {
    "id": "c-popup-runner-on-1st-1out",
    "positionFocus": ["C"],
    "baseRunners": { "first": true, "second": false, "third": false },
    "outs": 1,
    "ballLocation": { "x": 200, "y": 320 },
    "situation": "Runner on 1st, 1 out. A pop-up is hit to you in foul territory.",
    "question": "What should you do?",
    "options": [
      { "text": "Call for the ball loudly and make the catch if you can reach it.", "isCorrect": true },
      { "text": "Let the first baseman catch it since it's in foul territory.", "isCorrect": false },
      { "text": "Let the pitcher catch it.", "isCorrect": false },
      { "text": "Stay at home plate and watch the play.", "isCorrect": false }
    ],
    "explanation": "As the catcher, you have priority on pop-ups in foul territory you can reach. Clear communication is key. Call for the ball loudly if you can make the play."
  },
  {
    "id": "c-grounder-runner-on-3rd-2outs",
    "positionFocus": ["C"],
    "baseRunners": { "first": false, "second": false, "third": true },
    "outs": 2,
    "ballLocation": { "x": 200, "y": 320 },
    "situation": "Runner on 3rd, 2 outs. A ground ball is hit to you.",
    "question": "What should you do?",
    "options": [
      { "text": "Field the ball and throw to first base to get the batter-runner.", "isCorrect": true },
      { "text": "Field the ball and throw to third base.", "isCorrect": false },
      { "text": "Field the ball and throw to home plate.", "isCorrect": false },
      { "text": "Hold the ball and check the runner's position.", "isCorrect": false }
    ],
    "explanation": "With a runner on third and two outs, getting the batter-runner at first is the top priority. A strong, accurate throw to first base is crucial, as it could be the final out of the inning."
  }
]; 