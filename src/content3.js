// Free courses: Programming Fundamentals, Computing, Time Management (Pomodoro).
import { mc, tf, fl, od, mt, ck, pyt, L, M, ids } from './helpers.js'

/* ------------------------------ PROGRAMMING FUNDAMENTALS ------------------------------ */
export const progfund = {
  price: 0,
  lessons: ids([
    M('Module 1 · Think like a programmer',
      L('What is programming?', `A **program** is a list of instructions that a computer follows. Computers are fast but literal: they do exactly what you tell them, not what you mean.

Every program is built from a few ideas:

- **Sequence**: instructions run one after another, top to bottom.
- **Selection**: choose between paths (~if~ this, do that).
- **Iteration**: repeat instructions (loops).

A programming language is how we write instructions. In this course we use **Python**, because it is clear and beginner-friendly. The editors run real Python in your browser (the first run takes a few seconds).`, [
        mt('Match each idea to its meaning.', ['Sequence', 'Instructions run one after another'], ['Selection', 'Choosing between paths'], ['Iteration', 'Repeating instructions']),
        od('Put these instructions for making a sandwich in a sensible sequence.', ['Take two slices of bread', 'Spread butter', 'Add the filling', 'Close the sandwich']),
        pyt('Print Hello on one line and World on the next line.', '# write your code here\n', 'Hello\nWorld', 'Use two print() calls.', 'print("Hello")\nprint("World")', ['print'])]),
      L('Variables and data types', `A **variable** stores a value so you can use it later. The **data type** says what kind of value it is.

~~~
name = "Hana"      # str (text)
age = 15           # int (whole number)
height = 1.62      # float (decimal)
passed = True      # bool (True / False)
~~~

You can mix variables into text with an **f-string**: ~f"{name} is {age}"~. Convert between types with ~int("5")~, ~float("2.5")~ and ~str(10)~.`, [
        mt('Match each value to its data type.', ['"Sol"', 'str'], ['42', 'int'], ['3.14', 'float'], ['True', 'bool']),
        fl('After  x = 4  and  y = x * 2,  what is y?', '8'),
        pyt('A rectangle has width 6 and height 4. Print its area.', 'width = 6\nheight = 4\n', '24', 'Area = width * height.', 'width = 6\nheight = 4\nprint(width * height)', ['width[ ]*\\*[ ]*height|height[ ]*\\*[ ]*width'])]),
      L('Operators and calculations', `Python follows the usual **order of operations**: brackets first, then powers, then multiplication and division, then addition and subtraction.

~~~
print(2 + 3 * 4)     # 14
print((2 + 3) * 4)   # 20
print(7 // 2)        # 3  (whole-number division)
print(7 % 2)         # 1  (remainder)
print(2 ** 3)        # 8  (power)
~~~

~//~ and ~%~ are great together: they split a total into whole units and what is left over.`, [
        fl('What does  print(2 + 3 * 4)  show?', '14'),
        pyt('There are 135 minutes. Print the hours and the leftover minutes on one line, separated by a space (2 15).', 'minutes = 135\n', '2 15', 'Hours = minutes // 60. Leftover = minutes % 60.', 'minutes = 135\nprint(minutes // 60, minutes % 60)', ['//', '%'])])),
    M('Module 2 · Making programs choose and repeat',
      L('Selection: if, elif and else', `**Selection** lets a program choose.

~~~
age = 15
if age < 13:
    print("Child")
elif age < 18:
    print("Teen")
else:
    print("Adult")
~~~

Python checks the conditions from the top and runs the **first** one that is true. Combine tests with ~and~, ~or~ and ~not~. Indent (4 spaces) the lines that belong inside each branch.`, [
        mc('What does  age >= 18  check?', ['Whether age is 18 or more', 'Whether age is exactly 18', 'Whether age is less than 18', 'It assigns 18 to age'], 0),
        pyt('The variable age is 15. Print Child if age is under 13, Teen if under 18, otherwise Adult.', 'age = 15\n', 'Teen', 'Use if, elif and else.', 'age = 15\nif age < 13:\n    print("Child")\nelif age < 18:\n    print("Teen")\nelse:\n    print("Adult")', ['if', 'else'])]),
      L('Iteration: loops', `A **for loop** repeats a set number of times. ~range(5)~ gives 0, 1, 2, 3, 4, and ~range(1, 6)~ gives 1 to 5.

A **while loop** repeats while a condition stays true.

A common pattern is the **accumulator**: start a total at 0 and add to it inside the loop.

~~~
total = 0
for i in range(1, 4):
    total = total + i
print(total)    # 6
~~~`, [
        fl('How many times does  for i in range(5):  repeat?', '5'),
        pyt('Add up the even numbers from 1 to 10 and print the total (30).', 'total = 0\n', '30', 'Loop over range(1, 11) and add i only when i % 2 == 0.', 'total = 0\nfor i in range(1, 11):\n    if i % 2 == 0:\n        total = total + i\nprint(total)', ['for', 'if'])]),
      L('Strings and lists', `A **string** is text and a **list** is an ordered collection. Both use **indexes** that start at 0, and **slicing** takes a part.

~~~
word = "programming"
print(len(word))     # 11
print(word[0])       # p
print(word[0:3])     # pro

scores = [70, 85, 90]
scores.append(60)
print(len(scores))   # 4
~~~`, [
        fl('What does  "python"[0]  give?', 'p'),
        pyt('For the word below, print its length and its first three letters on one line (11 pro).', 'word = "programming"\n', '11 pro', 'len(word) and word[0:3].', 'word = "programming"\nprint(len(word), word[0:3])', ['len'])])),
    M('Module 3 · Organise, debug and build',
      L('Functions', `A **function** is a named block of code you can reuse. It takes **parameters** and can **return** a result.

~~~
def average(a, b):
    return (a + b) / 2

print(average(4, 10))   # 7.0
~~~

Variables created inside a function are **local**: they only exist there. Small functions with clear names make programs easier to read and test.`, [
        tf('The def keyword is used to define a function.', true),
        pyt('Write a function average(a, b) that returns the average of two numbers, then print average(4, 10).', '', '7.0', '(a + b) / 2', 'def average(a, b):\n    return (a + b) / 2\n\nprint(average(4, 10))', ['def[ ]+average'])]),
      L('Debugging and problem solving', `Every programmer meets bugs. There are three kinds of error:

- **Syntax error**: you broke the language rules, so the program will not start.
- **Runtime error**: the program crashes while running (for example dividing by zero).
- **Logic error**: the program runs but gives the wrong answer. These are the hardest to find.

A strategy: **decompose** the problem into small steps, **trace** the code line by line, test with simple values, and change one thing at a time.`, [
        mt('Match each error type to an example.', ['Syntax error', 'Forgetting the colon after if'], ['Runtime error', 'Dividing by zero'], ['Logic error', 'Using + when you meant *']),
        pyt('Fix the bug: this should print the total of 1 to 5 (15) but prints something else.', 'total = 0\nfor i in range(1, 5):\n    total = total + i\nprint(total)\n', '15', 'range(1, 5) stops before 5. What should the stop value be?', 'total = 0\nfor i in range(1, 6):\n    total = total + i\nprint(total)', ['range\\(1,[ ]*6\\)'])]),
      L('Capstone: shopping total', `Bring it all together.

**Your task:** the prices are ~[250, 120, 80]~. Add them up. If the total is **400 or more**, take **10% off**. Print the result exactly like this: ~Total: 405.0~

> Plan first: sum the prices, then use a selection, then print with an f-string.`, [
        pyt('Build the shopping total.', 'prices = [250, 120, 80]\n', 'Total: 405.0', 'total = sum(prices); if total >= 400: total = total * 0.9; print(f"Total: {total}")', 'prices = [250, 120, 80]\ntotal = sum(prices)\nif total >= 400:\n    total = total * 0.9\nprint(f"Total: {total}")', ['sum|for', 'if']),
        ck('Take it further (optional).', ['Change the prices so the total is under 400 and check there is no discount', 'Put your code inside a function called checkout(prices)', 'Explain your program to a friend in plain words'])])),
  ]),
  exam: [
    mc('Which idea means repeating instructions?', ['Iteration', 'Sequence', 'Selection', 'Compilation'], 0), mc('Which data type is  3.14 ?', ['float', 'int', 'str', 'bool'], 0), fl('What does  print(7 // 2)  show?', '3'),
    fl('What does  print(7 % 2)  show?', '1'), tf('Python uses indentation to show which lines belong inside an if or a loop.', true), mc('Which keyword defines a function?', ['def', 'func', 'function', 'define'], 0),
    mc('A program runs but gives the wrong answer. This is a…', ['Logic error', 'Syntax error', 'Runtime error', 'Spelling error'], 0), fl('What is  len([4, 8, 15, 16])?', '4'), mc('What does  range(1, 4)  produce?', ['1, 2, 3', '1, 2, 3, 4', '0, 1, 2, 3', '2, 3, 4'], 0),
    fl('What is  "code"[1]?  (one letter)', 'o'), tf('Variables created inside a function are local to that function.', true), mc('What does  return  do in a function?', ['Sends a value back', 'Prints a value', 'Starts a loop', 'Deletes a variable'], 0)],
}

/* ------------------------------ COMPUTING (introduction) ------------------------------ */
export const computing = {
  price: 0,
  lessons: ids([
    M('Module 1 · Computers and thinking',
      L('What is computing?', `**Computing** is the study and use of computers: how they work, how we program them and how they change our lives. Computers are everywhere: phones, cars, ATMs, school systems and even washing machines.

Every computer follows the same four steps:

- **Input**: data goes in (keyboard, microphone, sensor).
- **Process**: the **CPU** works on the data.
- **Storage**: data is kept in memory or on a drive.
- **Output**: results come out (screen, speaker, printer).

**Hardware** is the physical parts. **Software** is the programs that tell the hardware what to do.`, [
        mt('Match each step to an example.', ['Input', 'Typing on a keyboard'], ['Process', 'The CPU adding two numbers'], ['Storage', 'Saving a file on a drive'], ['Output', 'Showing a picture on a screen']),
        mc('Which is software?', ['A web browser', 'A keyboard', 'A monitor', 'A mouse'], 0), tf('Hardware means the physical parts of a computer.', true)]),
      L('Computational thinking', `**Computational thinking** is a way of solving problems like a computer scientist. It has four parts:

- **Decomposition**: break a big problem into small, easy parts.
- **Pattern recognition**: spot things that repeat or are similar.
- **Abstraction**: ignore unimportant detail and keep what matters.
- **Algorithms**: write clear step-by-step instructions.

Example: planning a school trip. Decompose it (transport, food, permission forms), spot patterns (every student needs a form) and write a step-by-step checklist.`, [
        mt('Match each part to its meaning.', ['Decomposition', 'Breaking a problem into small parts'], ['Pattern recognition', 'Spotting things that repeat'], ['Abstraction', 'Keeping only the important detail'], ['Algorithm', 'Step-by-step instructions']),
        od('Put the algorithm for crossing a road safely in order.', ['Stop at the kerb', 'Look both ways', 'Wait until the road is clear', 'Cross the road'])]),
      L('Data and number systems', `Computers store everything as **bits**: 0 or 1. Eight bits make a **byte**. **Binary** is a number system with only two digits, and every position is worth double the one to its right. Tap the bits below to build numbers.

Text, pictures and sound are all turned into numbers. For example, the letter "A" is stored as the number 65 in the **ASCII** code. A picture is a grid of tiny coloured squares called **pixels**.`, [
        { t: 'binary' }, fl('Convert the binary number 101 to decimal.', '5'), fl('Convert the decimal number 6 to binary.', '110'), mc('How many bits are in one byte?', ['8', '4', '16', '2'], 0)])),
    M('Module 2 · Connected and responsible',
      L('Networks and the internet', `A **network** links computers so they can share data and devices. A **LAN** covers a small area (a school or home). A **WAN** covers a large area; the **internet** is the biggest WAN of all.

The **internet** is the global network of networks. The **World Wide Web** is just one service on it: websites you open in a browser. Email and video calls are other services.

Devices find each other with **IP addresses**, and a **router** sends data to the right place.`, [
        mt('Match each term to its meaning.', ['LAN', 'A network in a small area like a school'], ['WAN', 'A network covering a large area'], ['Router', 'Sends data to the right network'], ['Web', 'Websites you open in a browser']),
        tf('The internet and the World Wide Web are exactly the same thing.', false)]),
      L('Staying safe and responsible online', `Look after yourself and others online:

- Use **long, unique passwords** and never share them.
- Watch out for **phishing**: messages that pretend to be someone you trust to steal information.
- Remember your **digital footprint**: what you post can stay online for years.
- Respect **copyright**: do not copy other people's work and say it is yours.
- Be kind: treat people online the way you would face to face.`, [
        mc('What is phishing?', ['A fake message that tries to steal your information', 'A very fast connection', 'A type of password', 'A computer game'], 0), tf('Posts you share online can stay there for years.', true),
        ck('Do a quick safety check.', ['Check that your main passwords are long and different from each other', 'Look at the privacy settings of one app you use', 'Think of one rule you will follow before clicking a link'])]),
      L('Computing around us', `Computing is changing the world:

- **Artificial intelligence** helps with translation, recommendations and medical scans.
- **Robotics** and **automation** do repetitive work in factories.
- The **Internet of Things (IoT)** connects everyday objects like smart lights and sensors.
- Mobile money and online learning bring services to people far from cities.

Careers in computing include **software developer**, **data analyst**, **network engineer**, **cyber security specialist** and **teacher**.`, [
        mt('Match each career to what the person does.', ['Software developer', 'Writes programs'], ['Data analyst', 'Finds patterns in data'], ['Network engineer', 'Builds and looks after networks'], ['Cyber security specialist', 'Protects systems from attacks']),
        ck('Capstone: explore a career.', ['Choose one computing career that interests you', 'Find out what skills and subjects it needs', 'Write three sentences about why it could suit you'])])),
  ]),
  exam: [
    mc('Which is an output device?', ['Monitor', 'Keyboard', 'Microphone', 'Mouse'], 0), tf('Software means the physical parts of a computer.', false), mc('Breaking a problem into smaller parts is called…', ['Decomposition', 'Abstraction', 'Compression', 'Encryption'], 0),
    fl('Convert the binary number 11 to decimal.', '3'), mc('How many bits make a byte?', ['8', '2', '4', '16'], 0), mc('Which network covers a small area such as a school?', ['LAN', 'WAN', 'The internet', 'The web'], 0),
    tf('A router sends data to the right place on a network.', true), mc('A message that pretends to be someone you trust to steal information is called…', ['Phishing', 'Streaming', 'Browsing', 'Compiling'], 0), mc('Which is a good password?', ['A long, unique one', 'Your name', '1111', 'The same everywhere'], 0),
    tf('Copying someone else\'s work and saying it is yours breaks copyright rules.', true)],
}

/* ------------------------------ TIME MANAGEMENT & POMODORO ------------------------------ */
export const time = {
  price: 0,
  lessons: ids([
    M('Module 1 · Plan your time',
      L('Why time management matters', `Everyone gets the same **168 hours** every week (24 hours × 7 days). Good time management does not give you more hours. It helps you spend the hours you have on what matters most.

Benefits: less stress, better grades, more free time and fewer last-minute rushes.

The first step is to **see where your time goes**. Most people are surprised how much disappears into small distractions.`, [
        fl('How many hours are in one week? (24 × 7)', '168'), tf('Time management gives you extra hours in the day.', false),
        ck('Track one day.', ['Write down what you do in each hour for one full day', 'Mark which activities helped your goals and which did not', 'Pick one time-waster you will reduce tomorrow'])]),
      L('Priorities: the Eisenhower matrix', `Not everything is equally important. The **Eisenhower matrix** sorts tasks by two questions: *Is it urgent? Is it important?*

- **Urgent and important**: do it first.
- **Important, not urgent**: schedule it. This is where planning, exam revision and health live.
- **Urgent, not important**: limit it or ask someone else to help.
- **Not urgent, not important**: drop it.

Most successful people spend as much time as they can on the second group, **before** it becomes urgent.`, [
        mt('Match each task to the best quadrant.', ['Homework due tomorrow', 'Do first'], ['Revising for an exam in three weeks', 'Schedule'], ['A call from a friend while you are studying', 'Limit or delegate'], ['Scrolling social media for an hour', 'Drop']),
        mc('Which tasks should you spend most of your planning time on?', ['Important but not yet urgent', 'Urgent but unimportant', 'Neither urgent nor important', 'Only the easiest ones'], 0)]),
      L('Setting SMART goals', `Vague goals like "study more" are hard to follow. A **SMART** goal is:

- **S**pecific: exactly what you will do
- **M**easurable: you can count or check it
- **A**chievable: realistic for you
- **R**elevant: it matters to your bigger aim
- **T**ime-bound: it has a deadline

Weak: *I want to get better at math.*
SMART: *I will solve 10 algebra problems every weekday for the next 4 weeks.*`, [
        mc('Which is a SMART goal?', ['Study more', 'Be good at English', 'Read 20 pages of my English book every day for 3 weeks', 'Try harder soon'], 2), fl('In SMART, what does the M stand for? (one word)', 'measurable'),
        ck('Write your own SMART goal.', ['Write one goal for this month using all five SMART parts', 'Put it where you will see it every day', 'Decide how you will check your progress each week'])])),
    M('Module 2 · The Pomodoro Technique',
      L('The Pomodoro Technique', `The **Pomodoro Technique** was created by Francesco Cirillo in the late 1980s. It is named after a tomato-shaped kitchen timer (*pomodoro* is Italian for tomato). The steps:

1. Choose one task.
2. Set a timer for **25 minutes** and work with full focus. This block is one **pomodoro**.
3. When the timer rings, take a **5 minute break**.
4. After **four pomodoros**, take a longer break of **15 to 30 minutes**.

If a distraction pops up, write it down on a "later" list and go straight back to the task. Try the timer below. Pick the Demo speed to see a full cycle in seconds.`, [
        { t: 'pomodoro' }, od('Put the Pomodoro steps in order.', ['Choose one task', 'Work for 25 minutes', 'Take a 5 minute break', 'After four pomodoros take a long break']),
        fl('How many minutes is a classic pomodoro? (number)', '25'), fl('After how many pomodoros do you take a long break? (number)', '4'),
        mc('A distraction pops into your head during a pomodoro. What should you do?', ['Write it down and go back to the task', 'Stop the timer and follow it', 'Switch to another task', 'Take a long break'], 0)]),
      L('Beating procrastination and distractions', `**Procrastination** means putting things off, even when you know it will hurt later. Useful tricks:

- **2-minute rule**: if a task takes less than 2 minutes, do it now.
- **Start small**: tell yourself you will work for just one pomodoro.
- **Eat the frog**: do the hardest task first, while your energy is high.
- **Remove distractions**: phone on silent and out of reach, tabs closed.
- **Reward yourself** after a focused session.`, [
        mt('Match each trick to what it means.', ['2-minute rule', 'Do quick tasks right away'], ['Eat the frog', 'Do the hardest task first'], ['Start small', 'Commit to just one pomodoro'], ['Remove distractions', 'Put your phone out of reach']),
        ck('Set up your focus space.', ['Silence your phone and put it out of reach', 'Close every tab you do not need', 'Write a "later list" for distracting thoughts'])]),
      L('Capstone: plan your week', `Now build your own plan. A good weekly plan has:

- fixed commitments first (school, prayer, family)
- **study blocks** made of pomodoros
- **buffer time** for things that run late
- rest, exercise and sleep
- a short **review** every Sunday: what worked and what to change

> Example: four pomodoros are 4 × 25 = **100 minutes** of focused work. With breaks, one full cycle of 25 minutes work plus a 5 minute break is **30 minutes**.`, [
        fl('Four pomodoros of 25 minutes. How many minutes of focused work is that?', '100'), fl('One cycle is 25 minutes of work plus a 5 minute break. How many minutes is that in total?', '30'),
        ck('Make your week plan.', ['List your fixed commitments for the week', 'Choose three goals and give each one pomodoros on specific days', 'Add buffer time and at least one rest period each day', 'Decide when you will review your week next Sunday'])])),
  ]),
  exam: [
    fl('How many hours are in one week?', '168'), mc('In the Eisenhower matrix, important but not urgent tasks should be…', ['Scheduled', 'Dropped', 'Ignored', 'Done last minute'], 0), mc('What does the T in SMART stand for?', ['Time-bound', 'Tiny', 'Tough', 'Typical'], 0),
    fl('How many minutes is a classic pomodoro? (number)', '25'), mc('How long is the short break after a pomodoro?', ['5 minutes', '1 hour', '30 seconds', '2 hours'], 0), fl('After how many pomodoros is a long break taken? (number)', '4'),
    tf('The Pomodoro Technique is named after a tomato-shaped kitchen timer.', true), mc('The 2-minute rule says…', ['Do tasks that take under 2 minutes right away', 'Study for only 2 minutes', 'Take a 2 minute break every hour', 'Wait 2 minutes before starting'], 0),
    mc('Which is a SMART goal?', ['Solve 10 math problems every weekday for 4 weeks', 'Do better', 'Study sometime', 'Be smart'], 0), tf('A weekly review helps you see what worked and what to change.', true)],
}
