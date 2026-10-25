// Extra online courses: C++, AI, Computer Science, English Grammar. Same text format as content.js.
const mc = (q, options, answer) => ({ t: 'mcq', q, options, answer })
const tf = (q, answer) => ({ t: 'tf', q, answer })
const fl = (q, answer, ...alt) => ({ t: 'fill', q, answer, alt })
const od = (q, items) => ({ t: 'order', q, items })
const mt = (q, ...pairs) => ({ t: 'match', q, pairs })
const ck = (q, items, link) => ({ t: 'checklist', q, items, link })
const ctask = (q, starter, checks, hint, solution) => ({ t: 'ctask', q, starter, checks, hint, solution })
const pyt = (q, starter, expect, hint, solution, checks = []) => ({ t: 'pytask', q, starter, expect, hint, solution, checks })
const L = (title, body, acts) => ({ title, body, acts })
const M = (module, ...ls) => ls.map(l => ({ ...l, module }))
const ids = ls => ls.flat().map((l, i) => ({ id: 'l' + (i + 1), ...l }))
const SKELETON = '#include <iostream>\nusing namespace std;\n\nint main() {\n    \n    return 0;\n}\n'

/* ------------------------------ C++ FUNDAMENTALS ------------------------------ */
export const cpp = {
  price: 300,
  lessons: ids([
    M('Module 1 · Getting started',
      L('Hello, C++', `C++ is a fast, powerful language used for games, operating systems, browsers and embedded devices. It is a **compiled** language: a program called the **compiler** turns your source code into a program the computer can run.

Every C++ program has the same skeleton:

~~~
#include <iostream>
using namespace std;

int main() {
    cout << "Hello, Addis!" << endl;
    return 0;
}
~~~

- ~#include <iostream>~ brings in the tools for input and output.
- ~int main()~ is where the program starts.
- ~cout << ...~ prints to the screen.
- Statements end with a semicolon ~;~.
- ~return 0;~ tells the computer the program finished well.

> Your C++ answers in this course are checked for the key parts of the code. To watch a program really run, paste it into an online compiler such as OnlineGDB.`, [
        od('Put the program lines in the right order.', ['#include <iostream>', 'using namespace std;', 'int main() {', '    cout << "Hi!";', '    return 0;', '}']),
        mc('Which line prints text to the screen?', ['cin >> "Hi";', 'cout << "Hi";', 'print("Hi");', 'echo "Hi";'], 1),
        ctask('Write a complete program that prints exactly: Hello, Addis!', '', [['#include[ ]*<iostream>', 'Start with #include <iostream>.'], ['int[ ]+main[ ]*\\(', 'Write the main function: int main().'], ['cout[ ]*<<[ ]*"Hello, Addis!"', 'Print the text "Hello, Addis!" with cout <<.'], ['return[ ]+0[ ]*;', 'Finish with return 0;'], ['cout[^;\n]*;', 'End the print statement with a semicolon.']], 'Copy the skeleton from the lesson and change the text inside the quotes.', '#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, Addis!" << endl;\n    return 0;\n}')]),
      L('Variables and data types', `A **variable** is a named box that stores a value. In C++ you must say what **type** of value it holds.

~~~
int age = 15;          // whole number
double price = 9.5;    // decimal number
char grade = 'A';      // one character
bool passed = true;    // true or false
string name = "Sol";   // text (needs #include <string>)
~~~

Names can use letters, digits and ~_~, cannot start with a digit, and are case sensitive.

> Watch out: dividing two ~int~ values gives an ~int~. So ~7 / 2~ is ~3~, not 3.5. Use ~double~ when you need decimals.`, [
        mt('Match each type to a value it can store.', ['int', '42'], ['double', '3.14'], ['char', "'A'"], ['bool', 'true'], ['string', '"Sol"']),
        mc('Which line declares a decimal number?', ['int x = 2.5;', 'double x = 2.5;', 'char x = 2.5;', 'bool x = 2.5;'], 1),
        fl('What does this print?  int a = 7; int b = 3; cout << a / b;', '2')]),
      L('Input and operators', `~cin~ reads input from the keyboard, the opposite of ~cout~:

~~~
int a, b;
cin >> a >> b;
cout << a + b;
~~~

Arithmetic operators: ~+~ ~-~ ~*~ ~/~ and ~%~ (remainder). Shortcuts: ~x += 5~ means ~x = x + 5~, and ~x++~ adds one.`, [
        fl('What is 17 % 5?', '2'), tf('cin is used to read input from the user.', true),
        ctask('Read two integers a and b with cin, then print their sum.', '#include <iostream>\nusing namespace std;\n\nint main() {\n    int a, b;\n    // read a and b, then print the sum\n\n    return 0;\n}\n', [['cin[^;]*>>[ ]*a', 'Read a with cin >> a.'], ['>>[ ]*b', 'Read b as well.'], ['cout[^;]*(a[ ]*\\+[ ]*b|sum)', 'Print the sum of a and b with cout.']], 'cin >> a >> b; cout << a + b;', '#include <iostream>\nusing namespace std;\n\nint main() {\n    int a, b;\n    cin >> a >> b;\n    cout << a + b;\n    return 0;\n}')])),
    M('Module 2 · Control flow',
      L('Making decisions', `**Conditions** let a program choose. Use ~if~, ~else if~ and ~else~:

~~~
if (score >= 90) {
    cout << "A";
} else if (score >= 50) {
    cout << "Pass";
} else {
    cout << "Fail";
}
~~~

Comparison operators: ~==~ equal, ~!=~ not equal, ~<~ ~>~ ~<=~ ~>=~. Combine tests with ~&&~ (and), ~||~ (or) and ~!~ (not).

> A very common bug: ~=~ **assigns** a value, ~==~ **compares**. Write ~if (x == 5)~, not ~if (x = 5)~.`, [
        fl('What does this print?  int x = 8; if (x > 5) cout << "big"; else cout << "small";', 'big'), mc('Which operator tests whether two values are equal?', ['=', '==', '===', '=>'], 1),
        ctask('The variable score is 70. Print Pass if score is at least 50, otherwise print Fail.', 'int score = 70;\n', [['if[ ]*\\([^)]*>=[ ]*50', 'Use if (score >= 50).'], ['"Pass"', 'Print "Pass" in the if part.'], ['else', 'Add an else part.'], ['"Fail"', 'Print "Fail" in the else part.']], 'if (score >= 50) { cout << "Pass"; } else { cout << "Fail"; }', 'int score = 70;\nif (score >= 50) {\n    cout << "Pass";\n} else {\n    cout << "Fail";\n}')]),
      L('Loops', `A **loop** repeats code.

~~~
for (int i = 1; i <= 5; i++) {
    cout << i << " ";
}
~~~

A ~for~ loop has three parts: start (~int i = 1~), condition (~i <= 5~) and step (~i++~). A ~while~ loop repeats while its condition is true, and ~do { } while (...)~ always runs at least once.`, [
        fl('How many times does  for (int i = 0; i < 4; i++)  run?', '4'),
        od('Put this program in order: it adds 1 + 2 + 3 and prints the total.', ['int sum = 0;', 'for (int i = 1; i <= 3; i++) {', '    sum += i;', '}', 'cout << sum;']),
        ctask('Use a for loop to print the numbers 1 to 10, separated by spaces.', '#include <iostream>\nusing namespace std;\n\nint main() {\n    \n    return 0;\n}\n', [['for[ ]*\\(', 'Use a for loop.'], ['<=[ ]*10|<[ ]*11', 'Make the loop run up to 10.'], ['cout[^;]*<<[^;]*i', 'Print the loop variable i with cout.']], 'for (int i = 1; i <= 10; i++) { cout << i << " "; }', '#include <iostream>\nusing namespace std;\n\nint main() {\n    for (int i = 1; i <= 10; i++) {\n        cout << i << " ";\n    }\n    return 0;\n}')])),
    M('Module 3 · Functions, arrays and your project',
      L('Functions', `A **function** is a named, reusable block of code. It has a **return type**, a name and **parameters**:

~~~
int square(int n) {
    return n * n;
}

// in main:
cout << square(4);   // 16
~~~

Use ~void~ when a function returns nothing. Functions must be declared **before** they are used.`, [
        mc('What does a return type of void mean?', ['The function returns nothing', 'The function is empty', 'The function is private', 'The function runs twice'], 0),
        ctask('Write a function called square that takes an int n and returns n * n.', '', [['int[ ]+square[ ]*\\([ ]*int[ ]+[a-zA-Z_]+[ ]*\\)', 'Declare int square(int n).'], ['return[ ]+[a-zA-Z_]+[ ]*\\*[ ]*[a-zA-Z_]+[ ]*;', 'Return n multiplied by itself.']], 'int square(int n) { return n * n; }', 'int square(int n) {\n    return n * n;\n}')]),
      L('Arrays and vectors', `An **array** stores several values of the same type: ~int nums[3] = {4, 8, 15};~. Positions are called **indexes** and start at **0**, so ~nums[0]~ is 4 and ~nums[2]~ is 15.

A **vector** (~#include <vector>~) is a flexible array that can grow:

~~~
vector<int> v = {1, 2, 3};
v.push_back(4);
cout << v.size();   // 4
~~~`, [
        fl('If int nums[3] = {4, 8, 15};  what is nums[1]?', '8'), fl('How many items are in  vector<int> v = {2, 4, 6, 8};  ?', '4'), tf('Array indexes start at 1 in C++.', false)]),
      L('Capstone: a grade calculator', `Combine input, arithmetic, decisions and output.

**Your task:** read three marks (as ~double~), calculate the average, and print the grade:

- 90 or more: ~A~
- 75 or more: ~B~
- 60 or more: ~C~
- otherwise: ~D~

> Careful: ~(a + b + c) / 3~ is fine with ~double~ values, but would drop decimals with ~int~ values.`, [
        ctask('Write the grade calculator.', SKELETON, [['double', 'Use double for the marks so decimals are kept.'], ['cin[^;]*>>', 'Read the marks with cin.'], ['/[ ]*3', 'Divide the total by 3 to get the average.'], ['if[ ]*\\(', 'Use if / else if / else to choose the grade.'], ['else', 'Include else.'], ['cout', 'Print the grade with cout.']], 'average = (m1 + m2 + m3) / 3; then if (average >= 90) ...', '#include <iostream>\nusing namespace std;\n\nint main() {\n    double m1, m2, m3;\n    cin >> m1 >> m2 >> m3;\n    double average = (m1 + m2 + m3) / 3;\n    if (average >= 90) cout << "A";\n    else if (average >= 75) cout << "B";\n    else if (average >= 60) cout << "C";\n    else cout << "D";\n    return 0;\n}'),
        ck('Run it for real (optional but recommended).', ['Open an online C++ compiler and paste your code', 'Run it with marks 70 85 90 (average 81.67, so grade B)', 'Try three other sets of marks and check each grade'], ['Open OnlineGDB', 'https://www.onlinegdb.com/online_c++_compiler'])])),
  ]),
  exam: [
    mc('Which header lets you use cout?', ['<iostream>', '<stdio.h>', '<string.h>', '<cstdlib>'], 0), tf('A simple statement such as  int x = 5  ends with a semicolon.', true), fl('What does  cout << 7 / 2;  print?', '3'),
    mc('Which type is best for storing 3.14?', ['int', 'char', 'double', 'bool'], 2), mc('What does == do?', ['Compares two values', 'Assigns a value', 'Adds two values', 'Ends a statement'], 0), fl('What is 9 % 4?', '1'),
    mc('Which loop is best when you know how many times to repeat?', ['for', 'if', 'return', 'struct'], 0), tf('Array indexes start at 0 in C++.', true), mc('Which keyword sends a value back from a function?', ['return', 'give', 'send', 'exit'], 0),
    fl('How many times does  for (int i = 1; i <= 6; i++)  run?', '6'), mc('What does  int main()  mark?', ['Where the program starts', 'A comment', 'An array', 'A loop'], 0), tf('C++ source code must be compiled before it can run.', true)],
}

/* ------------------------------ AI FUNDAMENTALS ------------------------------ */
export const ai = {
  price: 300,
  lessons: ids([
    M('Module 1 · What is AI?',
      L('What is artificial intelligence?', `**Artificial intelligence (AI)** means computer systems that do tasks which normally need human intelligence, like recognising faces, understanding speech, translating languages or recommending a video.

You already use AI every day: the spam filter in your email, voice assistants, map apps that predict traffic, translation tools and chatbots.

Three terms that are often mixed up:

- **AI**: the big goal of machines that act intelligently.
- **Machine learning (ML)**: a way to build AI where the computer **learns patterns from data** instead of following hand-written rules.
- **Deep learning**: machine learning with many-layered **neural networks**.

Today's AI is **narrow**: each system is built for specific tasks. A machine as flexible as a human mind does not exist yet.`, [
        mt('Match each term to its meaning.', ['Artificial intelligence', 'Machines that act intelligently'], ['Machine learning', 'Learning patterns from data'], ['Deep learning', 'Learning with many-layered neural networks']),
        mc('Which is an example of AI in daily life?', ['A spam filter that learns from examples', 'A paper calendar', 'A light switch', 'A calculator button'], 0), tf('Today\'s AI systems are narrow: each is built for particular tasks.', true)]),
      L('How machines learn', `Machine learning needs **data**. Each example has **features** (facts about it) and sometimes a **label** (the right answer).

Three main ways to learn:

- **Supervised learning**: learn from examples that already have labels, like emails marked "spam" or "not spam".
- **Unsupervised learning**: find groups or patterns in data with no labels, like grouping customers by habits.
- **Reinforcement learning**: learn by trying actions and receiving **rewards**, like a game-playing AI.

The usual steps: collect data, **train** a model, **test** it on new data it has never seen, then use it.`, [
        mt('Match each way of learning to an example.', ['Supervised learning', 'Learning from emails labelled spam or not spam'], ['Unsupervised learning', 'Grouping customers with no labels'], ['Reinforcement learning', 'Learning a game by earning rewards']),
        od('Put the machine learning steps in order.', ['Collect data', 'Train a model', 'Test it on new data', 'Use the model']),
        mc('Why do we test a model on data it has never seen?', ['To check it works on new cases, not just memorised ones', 'To make the training faster', 'To delete the training data', 'Because the model asks for it'], 0)]),
      L('Teach the line: how training works', `A **model** is a recipe with adjustable knobs, called **parameters**. **Training** means adjusting the knobs until the model's **error** is as small as possible.

Here the model is a straight line, ~y = m·x + b~. The dots are real data. The **error** measures how far the dots are from your line. Move the sliders to teach the line, and try to get the error below **0.5**.

Real AI does the same thing, except it adjusts millions or billions of knobs, automatically.`, [
        { t: 'fit' }, mc('When you move the line closer to the dots, what happens to the error?', ['It gets smaller', 'It gets bigger', 'It stays the same', 'It becomes a picture'], 0), tf('Training tries to make a model\'s error as small as possible.', true)])),
    M('Module 2 · AI in practice',
      L('Neural networks and language models', `A **neural network** is made of layers of simple units called **neurons**. Each connection has a **weight**. Training adjusts the weights so the whole network gives better answers.

Images are stored as grids of numbers called **pixels**, so a network can learn to spot a cat from the numbers.

A **large language model (LLM)**, the technology behind many chatbots, is trained on huge amounts of text. It learns to **predict the next piece of text**, over and over, which lets it write answers, translate and summarise.

> LLMs can sound confident and still be **wrong**. This is sometimes called a hallucination. Always check important facts.`, [
        mc('What does a large language model mostly do?', ['Predicts the next piece of text', 'Looks up one stored answer only', 'Thinks exactly like a human', 'Plays music'], 0), tf('A chatbot can sound very sure and still give a wrong answer.', true),
        fl('Computers see pictures as grids of numbers called ____. (one word)', 'pixels', 'pixel')]),
      L('Using AI well: prompting', `The instructions you give an AI are called a **prompt**. Better prompts get better answers. A good prompt has four parts:

- **Role**: who the AI should act as
- **Task**: what you want done
- **Context**: facts about you or the situation
- **Format**: how you want the answer

~~~
Act as a friendly math tutor. Explain how to solve 2x + 6 = 14.
I am in Grade 8. Answer in 3 short steps.
~~~

Use AI as a **tutor**, not as a shortcut: ask it to explain, then try the problem yourself.`, [
        mt('Match each part of a prompt to an example.', ['Role', 'Act as a friendly math tutor'], ['Task', 'Explain how to solve 2x + 6 = 14'], ['Context', 'I am in Grade 8'], ['Format', 'Answer in 3 short steps']),
        ck('Practice prompting.', ['Write a prompt with a role, a task, some context and a format', 'Try it in an AI chat tool, such as the STCA AI Tutor', 'Check the answer against your textbook or a second source'])]),
      L('Ethics, bias and safety', `AI is powerful, so we must use it responsibly.

- **Bias**: an AI learns from data. If the data is unfair or incomplete, its decisions can be unfair too.
- **Privacy**: never share passwords, ID numbers or private photos with a chatbot.
- **Misinformation and deepfakes**: AI can create fake text, images and voices that look real.
- **Humans in the loop**: for important decisions, a person should always check the AI's work.
- **Honesty**: say when you used AI, and do not present its work as only yours.`, [
        mc('Why can an AI system be unfair?', ['It learned from biased or incomplete data', 'It gets angry', 'It has opinions of its own', 'It is too slow'], 0), tf('It is a good idea to share your passwords with a chatbot so it can help you better.', false),
        mc('Which is the best habit?', ['Check important facts in reliable sources', 'Believe every answer', 'Share private photos', 'Never check anything'], 0)]),
      L('Capstone: design an AI helper', `Imagine an AI helper for your school or community. Planning it well is the real skill.

For example: *an AI that sorts student questions by subject so teachers can answer them faster.*

First, practise the key skill: **classifying**. A spam filter does this thousands of times a day.`, [
        mt('Classify each message as spam or not spam.', ['"Win a free phone now!!! Click here"', 'Spam'], ['"Your class starts at 4 pm tomorrow"', 'Not spam'], ['"Claim your prize, send your password"', 'Spam'], ['"Homework is due on Friday"', 'Not spam']),
        ck('Plan your own AI helper on paper.', ['Choose a real problem it would solve', 'List the data it would need and where the data would come from', 'Decide how you would test whether it works', 'Write two risks (bias, privacy, mistakes) and how to reduce them'])])),
  ]),
  exam: [
    mc('Which term is the broadest?', ['Artificial intelligence', 'Deep learning', 'Neural network', 'Prompt'], 0), tf('Supervised learning uses examples that already have labels.', true), mc('A model finds groups in data with no labels. This is…', ['Unsupervised learning', 'Supervised learning', 'Reinforcement learning', 'Typing'], 0),
    fl('Pictures are stored as grids of numbers called ____. (one word)', 'pixels', 'pixel'), mc('What does a language model mostly do?', ['Predicts the next piece of text', 'Stores your photos', 'Plays video', 'Repairs computers'], 0), tf('Chatbots are always right.', false),
    mc('Which is the best order?', ['Collect data, train, test, use', 'Use, train, test, collect data', 'Test, collect data, use, train', 'Train, use, collect data, test'], 0), mc('Which is part of a good prompt?', ['A clear task', 'Your password', 'Random words', 'Nothing'], 0),
    tf('Biased training data can lead to unfair AI decisions.', true), mc('What should you do with important AI answers?', ['Check them in reliable sources', 'Believe them at once', 'Hide them', 'Share your passwords'], 0),
    mc('When training a line to fit data, you want the error to be…', ['As small as possible', 'As large as possible', 'Exactly 100', 'Blue'], 0), tf('Today\'s AI systems are narrow and built for particular tasks.', true)],
}

/* ------------------------------ COMPUTER SCIENCE FUNDAMENTALS ------------------------------ */
export const cs = {
  price: 300,
  lessons: ids([
    M('Module 1 · How computers think',
      L('Bits, bytes and binary', `Computers store everything as **bits**: tiny switches that are either 0 or 1. Eight bits make one **byte**.

**Binary** is counting with only 0 and 1. Each position is worth double the one to its right:

~~~
128  64  32  16   8   4   2   1
  0   0   0   0   1   0   1   0   = 8 + 2 = 10
~~~

To read a binary number, add up the place values that have a 1.

Text is stored as numbers too. In the **ASCII** code, 65 means the letter "A". Tap the bits below to build numbers.`, [
        { t: 'binary' }, fl('Convert the binary number 1010 to decimal.', '10'), fl('Convert the decimal number 13 to binary.', '1101'), mc('How many bits are in one byte?', ['8', '4', '16', '2'], 0)]),
      L('Algorithms and logic', `An **algorithm** is a clear, step-by-step set of instructions to solve a problem, like a recipe. You can write one as **pseudocode** (plain-English steps) or draw it as a **flowchart**.

Example, finding the largest number in a list:

~~~
set largest to the first number
for each other number in the list:
    if number > largest:
        set largest to number
answer = largest
~~~

Computers also use **logic**. Three basic operations: **AND** (true only if both are true), **OR** (true if at least one is true) and **NOT** (flips true and false).`, [
        mt('Match each logic expression to its result.', ['true AND false', 'false'], ['true OR false', 'true'], ['NOT true', 'false'], ['true AND true', 'true']),
        od('Put the "make tea" algorithm in a sensible order.', ['Boil the water', 'Put a tea bag in a cup', 'Pour the water into the cup', 'Wait three minutes', 'Remove the tea bag']),
        tf('An algorithm is a step-by-step set of instructions.', true)]),
      L('Hardware and operating systems', `**Hardware** is the physical machine, **software** is the programs.

- The **CPU** runs instructions. It repeats the **fetch, decode, execute** cycle billions of times per second.
- **RAM** is fast, temporary memory for programs that are running. It is erased when the power goes off.
- **Storage** (SSD or hard drive) keeps files permanently.

The **operating system** (Windows, Android, Linux, macOS) manages the hardware, files and apps, so programs do not have to control the machine directly.`, [
        od('Put the CPU cycle in order.', ['Fetch an instruction', 'Decode it', 'Execute it', 'Store the result']),
        mt('Match each part to its job.', ['CPU', 'Runs instructions'], ['RAM', 'Temporary working memory'], ['SSD', 'Permanent file storage'], ['Operating system', 'Manages hardware, files and apps'])])),
    M('Module 2 · Programming and data',
      L('Programming concepts', `Every programming language uses the same few ideas: **variables** (store data), **conditions** (make choices) and **loops** (repeat). We will use Python, which reads almost like English.

~~~
for i in range(1, 6):
    if i % 2 == 0:
        print("even")
    else:
        print(i)
~~~

~i % 2 == 0~ checks whether ~i~ is even (the remainder after dividing by 2 is zero).

> The Python editors in this course run real code in your browser. The first run takes a few seconds while Python loads.`, [
        pyt('Print the numbers 1 to 5, one per line, but print Fizz instead of any number divisible by 3.', '# use a loop and an if\n', '1\n2\nFizz\n4\n5', 'for i in range(1, 6): if i % 3 == 0: print("Fizz") else: print(i)', 'for i in range(1, 6):\n    if i % 3 == 0:\n        print("Fizz")\n    else:\n        print(i)', ['for', 'if'])]),
      L('Searching and sorting', `**Searching** means finding an item in a list.

- **Linear search** checks items one by one. It works on any list, but may need to check every item.
- **Binary search** needs a **sorted** list. It checks the middle item and throws away half the list each time, so 1,024 items need at most **10** steps.

**Sorting** puts items in order. Simple methods like **bubble sort** swap neighbours that are out of order; faster methods split the work into smaller parts.

Computer scientists compare algorithms by how their work **grows** as the data grows. This idea is called **Big-O**.`, [
        mc('How many steps does binary search need at most for 1,024 sorted items?', ['10', '1024', '512', '100'], 0), tf('Binary search works on an unsorted list.', false),
        pyt('Use a loop to find the position (index) of the number 7 in the list, and print it.', 'numbers = [4, 9, 7, 1]\n', '2', 'Loop with enumerate or range(len(numbers)); print the index when you find 7.', 'numbers = [4, 9, 7, 1]\nfor i in range(len(numbers)):\n    if numbers[i] == 7:\n        print(i)', ['for'])]),
      L('Data structures', `A **data structure** is a way to organise data so a program can use it well.

- **List / array**: items in order, reached by position.
- **Stack**: **last in, first out** (LIFO), like a pile of plates.
- **Queue**: **first in, first out** (FIFO), like people waiting in line.
- **Dictionary (hash map)**: look up a value by its key, like a phone book.
- **Tree / graph**: items connected to each other, like a family tree or a road map.`, [
        mt('Match each data structure to a real-life example.', ['Stack', 'A pile of plates'], ['Queue', 'People waiting in line'], ['Dictionary', 'A phone book'], ['Tree', 'A family tree']),
        pyt('Push 1, 2 and 3 onto the stack (already done), then pop the top item and print it.', 'stack = []\nstack.append(1)\nstack.append(2)\nstack.append(3)\n', '3', 'stack.pop() removes and returns the last item.', 'stack = []\nstack.append(1)\nstack.append(2)\nstack.append(3)\nprint(stack.pop())', ['pop'])])),
    M('Module 3 · Networks, security and your project',
      L('Networks and the internet', `A **network** connects computers so they can share data. The **internet** is a huge network of networks.

- Every device has an **IP address**, a number that identifies it.
- **DNS** works like a phone book: it turns a name like example.com into an IP address.
- Data travels in small pieces called **packets**.
- Your device is the **client** and asks a **server** for a web page using **HTTP**. **HTTPS** is the encrypted, safer version.`, [
        od('Put these steps in order for opening a website.', ['You type the address', 'DNS finds the server address', 'Your browser sends a request', 'The server sends the page back']),
        mt('Match each term to its meaning.', ['IP address', 'The number that identifies a device'], ['DNS', 'Turns names into IP addresses'], ['HTTPS', 'Encrypted web traffic'])]),
      L('Databases and cyber security', `A **database** stores organised data in **tables**. A table has **columns** (fields) and **rows** (records). A **primary key** identifies each row. The language **SQL** asks questions of a database:

~~~
SELECT name FROM students WHERE grade > 80;
~~~

**Cyber security** protects data and systems. Key habits: strong unique passwords, **two-step verification**, software updates, **encryption** (scrambling data so only the right people can read it), and care with links and attachments (**phishing**).`, [
        mc('What does SELECT do in SQL?', ['Reads data from a table', 'Deletes a table', 'Draws a chart', 'Starts a server'], 0), fl('A row in a database table is also called a ____. (one word)', 'record'),
        mc('Which is a good security habit?', ['Turn on two-step verification', 'Reuse one password everywhere', 'Share your login', 'Ignore updates'], 0)]),
      L('Capstone: marks analyser', `Bring it together with a small data program.

**Your task:** the marks are ~[70, 85, 90, 65]~. Print the **highest** mark, then the **average**. The output must be exactly two lines: ~90~ and ~77.5~.`, [
        pyt('Print the highest mark, then the average mark.', 'marks = [70, 85, 90, 65]\n', '90\n77.5', 'max(marks) gives the highest; sum(marks) / len(marks) gives the average.', 'marks = [70, 85, 90, 65]\nprint(max(marks))\nprint(sum(marks) / len(marks))', ['max|sorted|for', 'sum|for']),
        ck('Think like a computer scientist (optional).', ['Draw a flowchart of your solution on paper', 'Explain your solution to a friend in plain words', 'Change the marks and check that the output still makes sense'])])),
  ]),
  exam: [
    fl('Convert the binary number 101 to decimal.', '5'), mc('How many bits make a byte?', ['8', '4', '16', '2'], 0), tf('RAM keeps your files when the power is off.', false), mc('What does NOT true give?', ['false', 'true', 'null', '1'], 0),
    mc('Which data structure is last in, first out?', ['Stack', 'Queue', 'Dictionary', 'Tree'], 0), mc('What turns a name like example.com into an IP address?', ['DNS', 'RAM', 'CPU', 'SQL'], 0), tf('Binary search needs the list to be sorted.', true),
    mc('Which part runs instructions?', ['CPU', 'Monitor', 'Speaker', 'Mouse'], 0), fl('What does print(7 % 2) show in Python?', '1'), mc('What does SQL SELECT do?', ['Reads data', 'Turns off the computer', 'Draws pictures', 'Sends email'], 0),
    tf('An algorithm is a step-by-step set of instructions.', true), mc('Which is a good security habit?', ['Two-step verification', 'Sharing passwords', 'Ignoring updates', 'Clicking every link'], 0)],
}

/* ------------------------------ ENGLISH GRAMMAR FUNDAMENTALS ------------------------------ */
export const english = {
  price: 300,
  lessons: ids([
    M('Module 1 · Building blocks',
      L('Parts of speech', `Every word in a sentence has a job. The eight **parts of speech**:

- **Noun**: a person, place or thing (~teacher~, ~Addis Ababa~, ~book~)
- **Pronoun**: replaces a noun (~she~, ~they~, ~it~)
- **Verb**: an action or state (~run~, ~is~)
- **Adjective**: describes a noun (~tall~, ~happy~)
- **Adverb**: describes a verb, adjective or adverb (~quickly~, ~very~)
- **Preposition**: shows position or relation (~under~, ~in~, ~at~)
- **Conjunction**: joins words or sentences (~and~, ~but~, ~because~)
- **Interjection**: shows feeling (~Wow!~, ~Oh!~)`, [
        mt('Match each word to its part of speech.', ['teacher', 'Noun'], ['quickly', 'Adverb'], ['happy', 'Adjective'], ['run', 'Verb'], ['under', 'Preposition'], ['and', 'Conjunction']),
        mc('In "The tall boy runs fast", which word is an adjective?', ['tall', 'boy', 'runs', 'fast'], 0)]),
      L('Sentences', `A **sentence** expresses a complete idea. It has a **subject** (who or what) and a **predicate** (what the subject does or is), starts with a capital letter and ends with a full stop, question mark or exclamation mark.

Four types:

- **Statement**: ~She reads every day.~
- **Question**: ~Do you read every day?~
- **Command**: ~Read this page.~
- **Exclamation**: ~What a great book!~

A **simple** sentence has one idea. A **compound** sentence joins two ideas with ~and~, ~but~ or ~so~. A **complex** sentence adds a dependent idea with words like ~because~ or ~when~.`, [
        od('Put the words in order to make a correct sentence.', ['I', 'am', 'learning', 'English', 'grammar']),
        mc('Which sentence is a question?', ['Where is the library?', 'The library is open.', 'Close the library.', 'What a big library!'], 0),
        mc('"I stayed home because it was raining." is a…', ['Complex sentence', 'Simple sentence', 'Question', 'Command'], 0)]),
      L('Nouns and articles', `Most nouns add **-s** or **-es** to become plural: ~book → books~, ~box → boxes~. Some are **irregular**: ~child → children~, ~man → men~, ~foot → feet~, ~mouse → mice~.

**Countable** nouns can be counted (~three apples~). **Uncountable** nouns cannot (~water~, ~advice~, ~information~), so we say ~some advice~, not ~an advice~.

**Articles**: use **a** before a consonant **sound** and **an** before a vowel **sound**: ~a book~, ~an apple~, ~an hour~ (the h is silent), ~a university~ (starts with a "yoo" sound). Use **the** for something specific.`, [
        fl('Write the plural of the word  child.', 'children'), fl('Fill in a or an:  ___ hour', 'an'), mc('Which sentence is correct?', ['She gave me an advice.', 'She gave me some advice.', 'She gave me advices.', 'She gave me a advice.'], 1)])),
    M('Module 2 · Verbs and tenses',
      L('Present tenses', `**Simple present** is for habits, facts and routines. With **he / she / it**, add **-s** (or **-es**): ~She plays football. He goes to school.~ For **I / you / we / they**, the verb stays the same: ~They play football.~

**Present continuous** is for actions happening now: **am / is / are + verb-ing**: ~I am reading. They are studying.~

Use "do / does" for questions and "do not / does not" for negatives: ~Does she play? She does not play.~ After ~does~, the verb has **no -s**.`, [
        fl('Fill in the blank:  She ____ (go) to school every day.', 'goes'), fl('Fill in the blank:  They are ____ (study) now.', 'studying'),
        mc('Choose the correct sentence.', ['He play football on Sundays.', 'He plays football on Sundays.', 'He playing football on Sundays.', 'He do plays football on Sundays.'], 1)]),
      L('Past and future', `**Simple past** is for finished actions. Regular verbs add **-ed**: ~watch → watched~. **Irregular** verbs change: ~go → went~, ~see → saw~, ~eat → ate~, ~write → wrote~, ~buy → bought~.

**Future**: use **will + verb** for decisions and predictions (~I will help you~), and **going to + verb** for plans (~We are going to visit Hawassa~).

Time words help: ~yesterday~, ~last week~ (past), ~now~ (present), ~tomorrow~, ~next year~ (future).`, [
        mt('Match each verb to its past form.', ['go', 'went'], ['see', 'saw'], ['eat', 'ate'], ['write', 'wrote'], ['buy', 'bought']),
        fl('Fill in the blank:  Yesterday I ____ (watch) a film.', 'watched'),
        mc('Choose the correct sentence about the future.', ['I will visiting my aunt.', 'I will visit my aunt tomorrow.', 'I visit will my aunt.', 'I will visited my aunt.'], 1)]),
      L('Subject–verb agreement and common mix-ups', `The verb must **agree** with the subject. A singular subject takes a singular verb: ~The dog is in the garden.~ A plural subject takes a plural verb: ~The dogs are in the garden.~ Words like ~everyone~, ~each~ and ~nobody~ are singular: ~Everyone is ready.~

Commonly confused words:

- **their** (belongs to them), **there** (a place), **they're** (they are)
- **its** (belongs to it), **it's** (it is or it has)
- **your** (belongs to you), **you're** (you are)`, [
        fl('Fill in the blank:  The dog ____ (be) in the garden.', 'is'), mc('Choose the correct word:  ___ going to be late.', ['Their', 'There', "They're", 'Theyre'], 2),
        mc('Choose the correct word:  The cat licked ___ paw.', ['its', "it's", "its'", 'it is'], 0)])),
    M('Module 3 · Writing well',
      L('Punctuation', `Punctuation makes writing clear.

- **Full stop** ends a statement. **Question mark** ends a question. **Exclamation mark** shows strong feeling.
- **Comma** separates items in a list (~pens, books and paper~), follows an opening phrase (~After school, we played.~) and comes before ~but~ or ~so~ in compound sentences.
- **Apostrophe** shows a missing letter (~don't~ = do not) or ownership (~the girl's book~ is one girl's book).
- **Quotation marks** show someone's exact words: ~She said, "Come in."~

Do not use an apostrophe to make a plural: ~apples~, not ~apple's~.`, [
        mc('Which sentence is punctuated correctly?', ['I bought pens, books and paper.', 'I bought pens books, and paper', 'I bought, pens books and paper.', 'I bought pens books and, paper.'], 0),
        mc('One girl owns a book. Which phrase is correct?', ["the girl's book", 'the girls book', "the girls's book", 'the girl books'], 0),
        fl('Write the short form of "do not".', "don't", 'don’t')]),
      L('Capstone: proofread and write', `Good writers **proofread**: they read their work again to find mistakes. Use everything you learned in this course.

Start with a quick proofreading task, then write a short paragraph of your own.`, [
        fl('Correct this sentence:  she dont like apples.', "She doesn't like apples.", "She doesn’t like apples.", "She doesn't like apples", 'She doesn’t like apples'),
        ck('Write a paragraph of 5 sentences about your day.', ['Use at least one past tense verb', 'Use at least one adjective and one adverb', 'Check every sentence starts with a capital letter and ends with punctuation', 'Read it aloud once and fix anything that sounds wrong'])])),
  ]),
  exam: [
    mc('Which word is a verb?', ['run', 'happy', 'under', 'teacher'], 0), mc('Which word is an adverb?', ['quickly', 'quick', 'quickness', 'quicker'], 0), tf('"What a great day!" is an exclamation.', true), fl('Write the plural of the word  child.', 'children'),
    fl('Fill in a or an:  ___ apple', 'an'), mc('Choose the correct sentence.', ['She plays tennis.', 'She play tennis.', 'She playing tennis.', 'She plays tennises.'], 0), fl('Fill in the blank:  Yesterday we ____ (go) to the market.', 'went'),
    mc('Which is the correct future sentence?', ['I will visit my uncle tomorrow.', 'I will visited my uncle.', 'I visit will my uncle.', 'I will visiting my uncle.'], 0), mc('Choose the correct word:  ___ book is on the table. (belongs to them)', ['Their', 'There', "They're", 'Thier'], 0),
    tf('"Everyone is ready." has correct subject–verb agreement.', true), mc('Which shows ownership?', ["the dog's bone", 'the dogs bone,', 'the dog bone,s', "the dog's' bone"], 0), fl('Write the short form of "I am".', "I'm", 'I’m', 'Im')],
}
