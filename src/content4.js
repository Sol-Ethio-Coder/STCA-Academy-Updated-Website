// Paid courses: Computing for Year 10, Year 11 and Year 12 (GCSE / IGCSE / A-level style topics; check your exam board's specification).
import { mc, tf, fl, od, mt, ck, pyt, L, M, ids } from './helpers.js'

/* ------------------------------ COMPUTING FOR YEAR 10 ------------------------------ */
export const y10 = {
  price: 400,
  lessons: ids([
    M('Module 1 · Algorithms and programming',
      L('Computational thinking and algorithms', `**Computational thinking** has three core skills: **decomposition** (breaking a problem into smaller parts), **abstraction** (removing unnecessary detail) and **pattern recognition** (spotting similarities).

An **algorithm** is a step-by-step set of instructions. We show algorithms as **pseudocode** (structured plain English) or as **flowcharts**:

- rounded rectangle: start / end
- rectangle: process (an action or calculation)
- diamond: decision (yes / no)
- parallelogram: input / output

A **trace table** records the value of each variable as you step through an algorithm. Exam questions often ask you to complete one.`, [
        mt('Match each flowchart symbol to its meaning.', ['Rounded rectangle (terminator)', 'Start or end'], ['Rectangle (process)', 'An action or calculation'], ['Diamond (decision)', 'A yes / no question'], ['Parallelogram', 'Input or output']),
        od('Put the algorithm that decides whether a number is even into order.', ['Input a number', 'Divide the number by 2 and find the remainder', 'If the remainder is 0, output "even"', 'Otherwise output "odd"']),
        fl('Trace this: x = 3, then x = x * 2 + 1. What is x now?', '7')]),
      L('Searching and sorting algorithms', `**Searching**
- **Linear search** checks each item in turn. It works on any list.
- **Binary search** only works on a **sorted** list. It checks the middle item and discards half the list each time.

**Sorting**
- **Bubble sort** compares neighbouring items and swaps them if they are in the wrong order. Repeated passes move the largest items to the end.
- **Insertion sort** takes each item and inserts it into the correct place in the sorted part.
- **Merge sort** splits the list into halves, sorts each half and **merges** them. It is much faster on big lists.`, [
        mc('Which search needs the list to be sorted?', ['Binary search', 'Linear search', 'Both', 'Neither'], 0), fl('A sorted list has 16 items. After one step of binary search, how many items are left to search?', '8'),
        pyt('Do ONE pass of bubble sort on the list and print the list. A pass compares each neighbouring pair once and swaps when needed.', 'nums = [5, 2, 8, 1]\n', '[2, 5, 1, 8]', 'Loop i over range(len(nums) - 1). If nums[i] > nums[i + 1], swap them.', 'nums = [5, 2, 8, 1]\nfor i in range(len(nums) - 1):\n    if nums[i] > nums[i + 1]:\n        nums[i], nums[i + 1] = nums[i + 1], nums[i]\nprint(nums)', ['for', 'if'])]),
      L('Programming techniques', `Your programs must be able to use **sequence**, **selection** (~if / elif / else~), **iteration** (~for~ and ~while~), **strings**, **lists** and **subroutines** (functions and procedures).

Useful operators: ~+ - * /~, ~//~ (integer division, called DIV in exams), ~%~ (remainder, called MOD) and ~**~ (power). Comparison operators are ~==~, ~!=~, ~<~, ~>~, ~<=~, ~>=~.

A **subroutine** is a named block of code. It makes programs shorter, easier to test and easier to reuse.`, [
        pyt('Print the 7 times table for 1 to 3, one line each, like  7 x 1 = 7.', '', '7 x 1 = 7\n7 x 2 = 14\n7 x 3 = 21', 'Loop over range(1, 4) and use an f-string.', 'for i in range(1, 4):\n    print(f"7 x {i} = {7 * i}")', ['for']),
        pyt('Write a function is_even(n) that returns True when n is even. Then print is_even(10) and is_even(7) on one line.', '', 'True False', 'n % 2 == 0 gives True or False.', 'def is_even(n):\n    return n % 2 == 0\n\nprint(is_even(10), is_even(7))', ['def[ ]+is_even'])])),
    M('Module 2 · Data and computer systems',
      L('Binary and hexadecimal', `Computers use **binary** (base 2). Place values from the right are 1, 2, 4, 8, 16, 32, 64, 128. **Hexadecimal** (base 16) uses 0 to 9 and A to F (A = 10 ... F = 15). One hex digit is exactly four bits, so hex is a short way to write binary: ~1111 0000~ is ~F0~.

**Binary addition**: 0 + 0 = 0, 0 + 1 = 1, 1 + 1 = 10 (write 0, carry 1). If the answer needs more bits than available, **overflow** occurs.

A **binary shift** moves all bits. A left shift by 1 **multiplies by 2**; a right shift by 1 **divides by 2**.`, [
        { t: 'binary' }, fl('Convert the binary number 11010 to denary (decimal).', '26'), fl('Convert the denary number 45 to 8-bit binary.', '00101101', '101101'), fl('Convert denary 255 to hexadecimal.', 'FF'),
        fl('Convert the binary number 11110000 to hexadecimal.', 'F0'), fl('Add the binary numbers 0110 and 0011. Give a 4-bit answer.', '1001'), fl('Shift 00001101 left by 2 places. What is the 8-bit result?', '00110100')]),
      L('Representing text, images and sound', `**Text**: each character has a number. **ASCII** uses 7 bits (128 characters; "A" = 65, "a" = 97). **Unicode** uses more bits and covers every language and emoji.

**Images** are grids of **pixels**. **Resolution** is the number of pixels, and **colour depth** is the bits per pixel.
~~~
file size (bits) = width × height × colour depth
~~~

**Sound** is sampled. **Sample rate** is samples per second (Hz) and **bit depth** is bits per sample.
~~~
file size (bits) = sample rate × bit depth × seconds
~~~

**Compression** makes files smaller. **Lossless** keeps all the data (ZIP, PNG). **Lossy** removes some data for good (JPEG, MP3).`, [
        fl('In ASCII, A = 65 and the letters follow in order. What is the code for C?', '67'), fl('An image is 10 × 10 pixels with a colour depth of 8 bits. How many bits is the file?', '800'),
        fl('A sound is recorded for 4 seconds at 8000 Hz with 8-bit samples. How many bits is the file?', '256000', '256,000'),
        mt('Match each type of compression to its description.', ['Lossless', 'All the original data can be rebuilt'], ['Lossy', 'Some data is removed permanently'])]),
      L('The CPU, memory and storage', `The **CPU** runs the **fetch-decode-execute (FDE)** cycle: it **fetches** an instruction from memory, **decodes** it, then **executes** it.

Parts of the CPU: the **ALU** (arithmetic and logic), the **control unit** (decodes instructions and directs the CPU), **registers** (tiny, very fast storage) and **cache** (fast memory close to the CPU).

Performance depends on **clock speed** (cycles per second), the number of **cores** and the size of the **cache**.

**RAM** is volatile working memory (it loses data when the power is off). **ROM** is non-volatile and holds start-up instructions. **Secondary storage** keeps files permanently: **magnetic** (hard disk), **optical** (CD, DVD) and **solid state** (SSD, flash).`, [
        od('Put the FDE cycle in order.', ['Fetch the instruction from memory', 'Decode the instruction', 'Execute the instruction']),
        mt('Match each part to its job.', ['ALU', 'Does arithmetic and logic'], ['Control unit', 'Decodes instructions and directs the CPU'], ['Cache', 'Very fast memory close to the CPU'], ['Register', 'Tiny storage for data being processed']),
        mc('Which memory is volatile?', ['RAM', 'ROM', 'SSD', 'Hard disk'], 0), tf('More cores can let a computer work on several tasks at the same time.', true)]),
      L('Networks and protocols', `A **LAN** covers a small area, a **WAN** a large one. Common **topologies**: **star** (every device connects to a central switch, so one broken cable affects only one device) and **mesh** (many connections, very reliable but costly).

Hardware: **NIC** (network interface card), **switch** (connects devices on a LAN), **router** (connects networks and directs **packets**), **wireless access point**.

An **IP address** identifies a device on a network and can change. A **MAC address** is fixed to the hardware.

**Protocols** are agreed rules: **HTTP / HTTPS** (web pages), **FTP** (file transfer), **SMTP** (sending email), **IMAP** (receiving email), **TCP/IP** (how data is sent across the internet).`, [
        mt('Match each protocol to its use.', ['HTTP', 'Web pages'], ['HTTPS', 'Secure web pages'], ['SMTP', 'Sending email'], ['FTP', 'Transferring files']),
        mt('Match each device to its job.', ['Router', 'Connects networks and directs packets'], ['Switch', 'Connects devices on a LAN'], ['NIC', 'Lets a device connect to a network']),
        mc('What is an advantage of a star network?', ['If one cable fails, only that device is affected', 'It needs no cables', 'It is the cheapest topology', 'It cannot be hacked'], 0)]),
      L('Cyber security', `**Threats**
- **Malware**: software designed to harm (viruses, worms, ransomware, spyware).
- **Phishing**: fake messages that trick you into giving away information.
- **Brute force**: trying many passwords until one works.
- **DDoS**: flooding a server with traffic so it goes offline.
- **SQL injection**: entering database commands into a web form.
- **Social engineering**: tricking people rather than machines.

**Protection**
- **Firewall**, **anti-malware**, **encryption**, **strong passwords**, **two-factor authentication**, regular **updates** and **penetration testing** (authorised attacks to find weaknesses).`, [
        mt('Match each threat to its description.', ['Phishing', 'A fake message that tricks you into giving information'], ['Brute force', 'Trying many passwords until one works'], ['DDoS', 'Flooding a server with traffic'], ['SQL injection', 'Entering database commands into a form']),
        mt('Match each protection to what it does.', ['Firewall', 'Blocks unauthorised network traffic'], ['Encryption', 'Scrambles data so only the right person can read it'], ['Two-factor authentication', 'Needs a second proof of identity'], ['Penetration testing', 'Authorised attacks to find weaknesses'])]),
      L('Ethics, law and the environment', `Computing raises ethical, legal and environmental questions.

- **Legal**: many countries have laws against unauthorised access to computer systems (for example the UK Computer Misuse Act), laws that protect personal data, and copyright laws. Check the laws in your own country.
- **Ethical**: privacy, surveillance, bias in algorithms, and the **digital divide** (the gap between people who have access to technology and those who do not).
- **Environmental**: computers use energy and create **e-waste**. Reduce the impact by recycling, repairing, reusing devices and using energy-saving settings.`, [
        tf('The digital divide is the gap between people with access to technology and those without.', true), mc('Which helps reduce the environmental impact of computers?', ['Recycling and repairing old devices', 'Throwing devices away often', 'Leaving everything switched on', 'Buying a new device every month'], 0),
        mc('Unauthorised access to a computer system is…', ['Usually illegal', 'Always allowed', 'A type of backup', 'A programming language'], 0)]),
      L('Exam practice', `Mixed practice in the style of exam questions. Read each question twice, show your working for calculations, and check units (bits or bytes).

> Remember: 1 byte = 8 bits.`, [
        fl('Convert the binary number 1001 to denary.', '9'), fl('How many bits are in 3 bytes?', '24'), mc('Which is an example of secondary storage?', ['SSD', 'RAM', 'Cache', 'Register'], 0), fl('A trace table starts with n = 5. The loop does n = n - 2 twice. What is n at the end?', '1'),
        ck('Prepare for the real exam.', ['Do two timed past-paper questions on binary and data representation', 'Write a one-page summary of networks and security from memory', 'Mark your answers and list every mistake with the reason'])])),
  ]),
  exam: [
    mc('Which shape is the decision symbol in a flowchart?', ['Diamond', 'Rectangle', 'Parallelogram', 'Rounded rectangle'], 0), mc('Which search needs a sorted list?', ['Binary search', 'Linear search', 'Both', 'Neither'], 0), fl('Convert the binary number 1010 to denary.', '10'),
    fl('Convert denary 15 to hexadecimal.', 'F'), tf('One hexadecimal digit is exactly four bits.', true), fl('A 20 × 10 pixel image has a colour depth of 4 bits. How many bits is the file?', '800'), mc('Which type of compression permanently removes some data?', ['Lossy', 'Lossless', 'Both', 'Neither'], 0),
    mc('Which part of the CPU decodes instructions and directs the CPU?', ['Control unit', 'ALU', 'Cache', 'RAM'], 0), mc('Which memory loses its data when the power is off?', ['RAM', 'ROM', 'SSD', 'Hard disk'], 0), mc('Which protocol is used to send email?', ['SMTP', 'HTTP', 'FTP', 'DNS'], 0),
    mc('Flooding a server with traffic to take it offline is called…', ['A DDoS attack', 'Phishing', 'Encryption', 'A firewall'], 0), tf('A MAC address is fixed to the hardware.', true), fl('What does binary 0011 + 0001 give? (4 bits)', '0100'), mc('What does a left shift by 1 do to a binary number?', ['Multiplies it by 2', 'Divides it by 2', 'Adds 1', 'Does nothing'], 0),
    mc('Which helps reduce the environmental impact of computers?', ['Recycling and repairing devices', 'Replacing them often', 'Leaving them on all night', 'Printing everything'], 0)],
}

/* ------------------------------ COMPUTING FOR YEAR 11 ------------------------------ */
export const y11 = {
  price: 400,
  lessons: ids([
    M('Module 1 · Logic and robust programs',
      L('Boolean logic', `Computers make decisions with **logic gates**. Each input and output is 1 (true) or 0 (false).

- **AND**: output is 1 only if **both** inputs are 1.
- **OR**: output is 1 if **at least one** input is 1.
- **NOT**: flips the input (1 becomes 0).
- **XOR**: output is 1 if the inputs are **different**.

A **truth table** lists every possible input combination. With **n** inputs there are **2ⁿ** rows. Try the gates below.`, [
        { t: 'gates' }, fl('How many rows does a truth table with 3 inputs have?', '8'), mc('A = 1 and B = 0. What is A OR B?', ['1', '0', 'Error', 'Both'], 0),
        mt('Match each gate to its rule.', ['AND', 'Output 1 only when both inputs are 1'], ['OR', 'Output 1 when at least one input is 1'], ['NOT', 'Flips the input'], ['XOR', 'Output 1 when the inputs are different'])]),
      L('Defensive design and validation', `**Defensive design** means writing programs that cope with mistakes and misuse. Techniques include **input validation**, **authentication** (checking who the user is), anticipating misuse and good **maintainability** (comments, indentation, meaningful variable names).

**Validation** checks that data is *reasonable*:
- **Range check**: within allowed limits
- **Type check**: the right data type
- **Length check**: the right number of characters
- **Presence check**: not left empty
- **Format check**: matches a pattern, such as DD/MM/YYYY

> Validation checks data is sensible. It does not prove the data is **correct** (that is **verification**).`, [
        mt('Match each check to an example.', ['Range check', 'Age must be between 0 and 120'], ['Type check', 'Quantity must be a whole number'], ['Length check', 'A password must have at least 8 characters'], ['Presence check', 'The name cannot be left empty'], ['Format check', 'A date must look like DD/MM/YYYY']),
        pyt('The variable age is 150. Print Valid if it is between 0 and 120 inclusive, otherwise print Invalid.', 'age = 150\n', 'Invalid', 'Use 0 <= age <= 120 in an if statement.', 'age = 150\nif 0 <= age <= 120:\n    print("Valid")\nelse:\n    print("Invalid")', ['if'])]),
      L('Testing', `**Testing** finds errors. **Iterative testing** happens during development, a little at a time. **Final (terminal) testing** happens when the program is finished.

Error types: **syntax** (breaks language rules), **logic** (wrong result) and **runtime** (crashes while running).

A **test plan** lists the test data, the **expected** result and the **actual** result. Test data comes in types. For an input that must be 1 to 100:
- **Normal**: expected data, for example 57
- **Boundary**: at the edge of what is allowed, for example 1 and 100 (and just outside: 0 and 101)
- **Erroneous**: the wrong type of data, for example "abc"`, [
        mt('A program accepts whole numbers from 1 to 100. Match each test value to its type.', ['57', 'Normal'], ['100', 'Boundary (valid)'], ['101', 'Boundary (invalid)'], ['abc', 'Erroneous']),
        mc('Which type of error gives the wrong answer but does not crash the program?', ['Logic error', 'Syntax error', 'Runtime error', 'Network error'], 0)]),
      L('Subroutines, arrays and files', `A **subroutine** is a named block of code. A **function** returns a value; a **procedure** does not. **Local** variables exist only inside the subroutine, **global** ones everywhere.

A **2D array** is a list of lists, like a table: ~grid[row][column]~.

~~~
grid = [[1, 2, 3], [4, 5, 6]]
print(grid[1][2])   # 6
~~~

**Files** let programs keep data: **open**, **read** or **write**, then **close**.`, [
        pyt('Print the item in row 1, column 2 of the grid (counting from 0).', 'grid = [[1, 2, 3], [4, 5, 6]]\n', '6', 'grid[row][column]', 'grid = [[1, 2, 3], [4, 5, 6]]\nprint(grid[1][2])', ['\\[1\\]\\[2\\]']),
        pyt('Write the lines Hello and STCA to a file called notes.txt, read the file back and print what it contains.', '', 'Hello\nSTCA', 'Use open("notes.txt", "w"), write, close, then open(..., "r") and read().', 'f = open("notes.txt", "w")\nf.write("Hello\\n")\nf.write("STCA\\n")\nf.close()\nf = open("notes.txt", "r")\nprint(f.read())\nf.close()', ['open', 'write', 'read'])])),
    M('Module 2 · Systems, SQL and exam skills',
      L('Programming languages and translators', `**High-level languages** (Python, Java) are easy for people to read and are **portable**. **Low-level languages** (assembly and machine code) give more control over the hardware but are harder to write.

A computer can only run **machine code** (binary). Programs must be **translated**:
- **Compiler**: translates the whole program before it runs, producing an executable.
- **Interpreter**: translates and runs one line at a time.
- **Assembler**: translates assembly language into machine code.

An **IDE** (integrated development environment) has an editor, error diagnostics, a debugger and a run window.`, [
        mt('Match each translator to its description.', ['Compiler', 'Translates the whole program before it runs'], ['Interpreter', 'Translates and runs one line at a time'], ['Assembler', 'Translates assembly language into machine code']),
        mc('Which language is closest to the hardware?', ['Machine code', 'Python', 'Java', 'HTML'], 0), tf('Low-level languages give more control over the hardware.', true)]),
      L('Operating systems, utilities and embedded systems', `The **operating system (OS)** manages the computer: the **user interface**, **memory management**, **multitasking**, **file management**, **peripheral management** (using **drivers**) and **security**.

**Utility software** helps maintain the computer:
- **Antivirus**: finds and removes malware
- **Backup**: copies files so they can be restored
- **Compression**: makes files smaller
- **Defragmentation**: reorganises files on a magnetic hard disk
- **Encryption**: scrambles data

An **embedded system** is a computer inside another device with a dedicated job, such as a microwave controller or a car's engine controller.`, [
        mt('Match each utility to its job.', ['Antivirus', 'Finds and removes malware'], ['Backup', 'Copies files so they can be restored'], ['Defragmentation', 'Reorganises files on a magnetic hard disk'], ['Compression', 'Makes files smaller']),
        mc('Which is an embedded system?', ['The controller inside a microwave oven', 'A desktop computer', 'A laptop', 'A web server'], 0)]),
      L('Databases and SQL', `A **database** stores data in **tables**. A **record** is a row and a **field** is a column. A **primary key** uniquely identifies each record.

**SQL** (Structured Query Language):
~~~
SELECT name FROM students WHERE grade > 80 ORDER BY name;
INSERT INTO students VALUES (5, "Lily", 70);
UPDATE students SET grade = 95 WHERE id = 1;
DELETE FROM students WHERE id = 4;
~~~

Use this table for the questions:
~~~
id | name  | grade
1  | Hana  | 90
2  | Abel  | 75
3  | Sara  | 88
4  | Dawit | 60
~~~`, [
        fl('How many rows does  SELECT name FROM students WHERE grade > 80;  return?', '2'), fl('Which SQL keyword filters rows by a condition? (one word)', 'WHERE'),
        od('Put the parts of an SQL query in the usual order.', ['SELECT name', 'FROM students', 'WHERE grade > 80', 'ORDER BY name'])]),
      L('Exam technique and project planning', `Exam questions use **command words**. Know what each one asks for.

A programming **project** follows the same stages: **analysis** (what the program must do), **design** (algorithms, flowcharts, test plan), **development** (write and test as you go), **testing** and **evaluation** (does it meet the requirements? what would you improve?).`, [
        mt('Match each command word to what it asks you to do.', ['State', 'Give a short answer with no explanation'], ['Describe', 'Say what something is like or how it works'], ['Explain', 'Give reasons using because'], ['Compare', 'Say how two things are similar and different'], ['Evaluate', 'Give advantages, disadvantages and a judgement']),
        od('Put the stages of a programming project in order.', ['Analysis', 'Design', 'Development', 'Testing', 'Evaluation']),
        ck('Plan a mini project.', ['Choose a small program idea (for example a quiz or a grade calculator)', 'Write down what it must do and how you will test it', 'Draw a flowchart for the main algorithm', 'Build it step by step and test after each step'])])),
  ]),
  exam: [
    mc('Which gate outputs 1 only when both inputs are 1?', ['AND', 'OR', 'NOT', 'XOR'], 0), fl('How many rows are in a truth table with 2 inputs?', '4'), mc('Which gate flips its input?', ['NOT', 'AND', 'OR', 'XOR'], 0),
    mc('Checking that a date looks like DD/MM/YYYY is a…', ['Format check', 'Range check', 'Presence check', 'Type check'], 0), mc('For valid values 1 to 100, which is boundary test data?', ['100', '57', 'abc', '35'], 0), mc('Which test data type is "abc" for a number input?', ['Erroneous', 'Normal', 'Boundary', 'Valid'], 0),
    mc('Which translator translates the whole program before it runs?', ['Compiler', 'Interpreter', 'Assembler', 'Browser'], 0), tf('A function returns a value but a procedure does not.', true), mc('Which utility reorganises files on a magnetic hard disk?', ['Defragmentation', 'Antivirus', 'Backup', 'Encryption'], 0),
    mc('Which SQL command removes records?', ['DELETE', 'SELECT', 'INSERT', 'UPDATE'], 0), mc('A program runs but gives the wrong result. This is a…', ['Logic error', 'Syntax error', 'Runtime error', 'Power error'], 0), tf('A primary key uniquely identifies each record in a table.', true),
    mc('Which command word asks you to give reasons using "because"?', ['Explain', 'State', 'List', 'Name'], 0), tf('The first stage of a programming project is analysis.', true), mc('What does an embedded system do?', ['A dedicated job inside another device', 'Runs every program', 'Stores the internet', 'Replaces the CPU'], 0)],
}

/* ------------------------------ COMPUTING FOR YEAR 12 ------------------------------ */
export const y12 = {
  price: 500,
  lessons: ids([
    M('Module 1 · Data structures and algorithms',
      L('Stacks and queues', `A **stack** is **last in, first out (LIFO)**. Operations: **push** (add to the top), **pop** (remove from the top) and **peek** (look at the top). Uses: undo, browser back button, and keeping track of function calls.

A **queue** is **first in, first out (FIFO)**. Operations: **enqueue** (add to the back) and **dequeue** (remove from the front). Uses: print jobs and task scheduling. A **circular queue** reuses space by wrapping the end pointer back to the start.

In Python a list works as a stack (~append~ and ~pop~), and ~collections.deque~ is ideal for a queue (~append~ and ~popleft~).`, [
        pyt('Push 1, 2, 3 onto the stack (done for you), then pop once and print the item removed.', 'stack = []\nstack.append(1)\nstack.append(2)\nstack.append(3)\n', '3', 'stack.pop() removes the top item.', 'stack = []\nstack.append(1)\nstack.append(2)\nstack.append(3)\nprint(stack.pop())', ['pop']),
        pyt('A, B and C join the queue (done for you). Dequeue twice and print the second item removed.', 'from collections import deque\nqueue = deque()\nqueue.append("A")\nqueue.append("B")\nqueue.append("C")\n', 'B', 'queue.popleft() removes the front item.', 'from collections import deque\nqueue = deque()\nqueue.append("A")\nqueue.append("B")\nqueue.append("C")\nqueue.popleft()\nprint(queue.popleft())', ['popleft']),
        mt('Match each structure to its rule.', ['Stack', 'Last in, first out'], ['Queue', 'First in, first out'])]),
      L('Linked lists, trees, graphs and hash tables', `A **linked list** stores items as **nodes**, each holding data and a **pointer** to the next node. Inserting is quick, but you cannot jump to item n directly.

A **binary tree** has nodes with at most two children. Traversals:
- **In-order**: left, root, right (gives sorted order for a binary search tree)
- **Pre-order**: root, left, right
- **Post-order**: left, right, root

A **graph** has **nodes** (vertices) joined by **edges**, stored as an **adjacency list** or **adjacency matrix**. A **hash table** uses a **hash function** to turn a key into a position. When two keys hash to the same place, a **collision** occurs.

~~~
       8
      / \\
     3   10
    / \\
   1   6
~~~`, [
        fl('Give the IN-ORDER traversal of the tree above, numbers separated by spaces.', '1 3 6 8 10'), fl('Give the PRE-ORDER traversal of the tree above.', '8 3 1 6 10'), fl('Give the POST-ORDER traversal of the tree above.', '1 6 3 10 8'),
        pyt('The hash function is  key % 5.  Print the table slot for the key 23.', '', '3', 'Use the remainder operator %.', 'print(23 % 5)', ['%']),
        pyt('A graph is stored as an adjacency list. Print how many neighbours node "A" has.', 'graph = {"A": ["B", "C", "D"], "B": ["A"], "C": ["A"], "D": ["A"]}\n', '3', 'len(graph["A"])', 'graph = {"A": ["B", "C", "D"], "B": ["A"], "C": ["A"], "D": ["A"]}\nprint(len(graph["A"]))', ['len'])]),
      L('Recursion', `A **recursive** subroutine calls itself. It needs:
- a **base case** that stops the recursion
- a **recursive case** that moves closer to the base case

~~~
def factorial(n):
    if n == 1:
        return 1
    return n * factorial(n - 1)
~~~

Each call is stored on the **call stack**. Too many calls cause a **stack overflow**. Recursion makes some problems (trees, divide and conquer) very neat, but loops use less memory.`, [
        mc('What stops a recursive subroutine from calling itself forever?', ['The base case', 'The loop', 'The comment', 'The parameter name'], 0),
        pyt('Write a recursive function factorial(n) and print factorial(5).', '', '120', 'factorial(1) is 1. Otherwise n * factorial(n - 1).', 'def factorial(n):\n    if n == 1:\n        return 1\n    return n * factorial(n - 1)\n\nprint(factorial(5))', ['def[ ]+factorial', 'factorial\\(n[ ]*-[ ]*1\\)']),
        fl('Fibonacci: fib(1) = 1, fib(2) = 1 and fib(n) = fib(n-1) + fib(n-2). What is fib(6)?', '8')]),
      L('Algorithm efficiency: Big-O', `**Time complexity** describes how the work grows as the input size **n** grows. We write it in **Big-O** notation and use the worst case.

- **O(1)**: constant. Reading an array item by index.
- **O(log n)**: logarithmic. Binary search.
- **O(n)**: linear. Linear search.
- **O(n log n)**: merge sort.
- **O(n²)**: quadratic. Bubble sort (nested loops).
- **O(2ⁿ)**: exponential. Trying every subset.

**Space complexity** describes how much memory is needed. Graph searches: **breadth-first** explores level by level (finds shortest paths in unweighted graphs); **depth-first** goes as deep as possible first.`, [
        mt('Match each complexity to an example.', ['O(1)', 'Reading an array item by index'], ['O(log n)', 'Binary search'], ['O(n)', 'Linear search'], ['O(n log n)', 'Merge sort'], ['O(n²)', 'Bubble sort']),
        fl('In the worst case, how many items does a linear search check in a list of 100 items?', '100'), mc('Which grows fastest as n gets large?', ['O(2ⁿ)', 'O(n²)', 'O(n)', 'O(log n)'], 0)])),
    M('Module 2 · Programming paradigms and systems',
      L('Object-oriented programming', `**OOP** organises code around **objects**. A **class** is a blueprint; an **object** is an **instance** of it. Objects have **attributes** (data) and **methods** (actions).

~~~
class Student:
    def __init__(self, name, marks):
        self.name = name
        self.marks = marks

    def average(self):
        return sum(self.marks) / len(self.marks)
~~~

Key ideas: **encapsulation** (hide data inside the object and control access), **inheritance** (a class reuses another class's features) and **polymorphism** (different classes respond to the same method in their own way).`, [
        mt('Match each OOP term to its meaning.', ['Class', 'A blueprint for objects'], ['Object', 'An instance of a class'], ['Encapsulation', 'Hiding data inside the object'], ['Inheritance', 'A class reusing features of another'], ['Polymorphism', 'Same method name, different behaviour']),
        pyt('Add the class (shown in the lesson) and print the average of a Student named Hana with marks 80 and 90.', '', '85.0', 'Create s = Student("Hana", [80, 90]) and print(s.average()).', 'class Student:\n    def __init__(self, name, marks):\n        self.name = name\n        self.marks = marks\n\n    def average(self):\n        return sum(self.marks) / len(self.marks)\n\ns = Student("Hana", [80, 90])\nprint(s.average())', ['class[ ]+Student', 'def[ ]+average'])]),
      L('Processor architecture and assembly', `In the **von Neumann architecture**, instructions and data share the same memory. Key **registers**:

- **PC** (program counter): address of the next instruction
- **MAR** (memory address register): address being accessed
- **MDR** (memory data register): data just read or about to be written
- **CIR** (current instruction register): the instruction being decoded
- **ACC** (accumulator): results of calculations

Three **buses** carry signals: the **address bus**, **data bus** and **control bus**. **Pipelining** overlaps fetching, decoding and executing different instructions to speed things up.

**Little Man Computer (LMC)** is a simple assembly language. Program: ~INP~, ~STA 99~, ~INP~, ~ADD 99~, ~OUT~, ~HLT~. INP reads a number into the accumulator, STA stores it at address 99, ADD adds the number at address 99, OUT prints the accumulator.`, [
        mt('Match each register to its job.', ['PC', 'Address of the next instruction'], ['MAR', 'Address being accessed in memory'], ['MDR', 'Data just read from or written to memory'], ['CIR', 'The instruction being decoded'], ['ACC', 'Results of calculations']),
        fl('The LMC program INP, STA 99, INP, ADD 99, OUT, HLT is run with the inputs 4 and then 5. What does it output?', '9'),
        od('Put the start of the fetch stage in order.', ['The PC address is copied to the MAR', 'The instruction at that address is placed in the MDR', 'The instruction is copied to the CIR', 'The PC is incremented'])]),
      L('Data representation: two\'s complement and floating point', `**Two's complement** stores signed whole numbers. The leftmost bit is worth **negative** half the range (−128 in 8 bits). To negate a number: **invert the bits, then add 1**. Example: 5 is 00000101, so −5 is 11111010 + 1 = **11111011**. The 8-bit range is **−128 to +127**. Try it below.

**Floating point** stores real numbers as a **mantissa** and an **exponent**: value = mantissa × 2^exponent. **Normalisation** puts the mantissa in the form 0.1... (positive) or 1.0... (negative) for maximum precision. More bits for the mantissa gives more **precision**; more bits for the exponent gives a bigger **range**.`, [
        { t: 'binary', signed: true }, fl('What is the 8-bit two\'s complement representation of −5?', '11111011'), fl('What denary value is the 8-bit two\'s complement number 10000001?', '-127', '−127'),
        fl('What is the largest positive number in 8-bit two\'s complement?', '127'), mc('Increasing the number of bits used for the exponent mainly increases…', ['Range', 'Precision', 'Speed', 'Colour'], 0)]),
      L('Databases, networks and security', `**Normalisation** removes redundant data: **1NF** (each field holds one value; no repeating groups), **2NF** (1NF and no partial dependency on part of a composite key) and **3NF** (2NF and no non-key field depends on another non-key field). A **foreign key** links one table to another, and **SQL JOIN** combines related tables.

The **TCP/IP model** has four layers: **application**, **transport**, **internet** and **link**. **Client-server** networks use central servers; **peer-to-peer** devices share directly.

**Symmetric encryption** uses one shared key. **Asymmetric encryption** uses a **public key** to encrypt and a matching **private key** to decrypt. **Hashing** turns data into a fixed-length value and cannot be reversed, which is how passwords should be stored.`, [
        mt('Match each normal form to its rule.', ['1NF', 'Each field holds a single value, no repeating groups'], ['2NF', 'No partial dependency on part of a composite key'], ['3NF', 'No non-key field depends on another non-key field']),
        mt('Match each TCP/IP layer to its job.', ['Application', 'Services used by programs, such as HTTP and SMTP'], ['Transport', 'Splits data into segments and checks delivery (TCP)'], ['Internet', 'IP addresses and routing'], ['Link', 'Sends bits over the physical network']),
        mc('In asymmetric encryption, which key decrypts a message encrypted with the public key?', ['The matching private key', 'The same public key', 'Any key', 'No key'], 0)]),
      L('Law, ethics, project work and exam practice', `Computer scientists must think about **legal** issues (data protection, copyright, computer misuse), **ethical** issues (bias, privacy, automation and jobs) and **environmental** issues (energy use, e-waste).

A big project needs a **methodology**: **waterfall** (stages in strict order: analysis, design, implementation, testing, maintenance) or **agile** (short cycles called sprints with regular feedback). Waterfall suits fixed requirements; agile suits changing ones.`, [
        mc('Which methodology works in short cycles with regular feedback?', ['Agile', 'Waterfall', 'Binary', 'Compiled'], 0), tf('Hashing is used to store passwords because it cannot be reversed.', true),
        ck('Prepare for A-level style papers.', ['Do one timed paper on data structures and algorithms', 'Write a trace table for a recursive function by hand', 'Choose a project idea and write its analysis and test plan'])])),
  ]),
  exam: [
    mc('Which structure is last in, first out?', ['Stack', 'Queue', 'Tree', 'Hash table'], 0), mc('Which operation adds an item to the back of a queue?', ['Enqueue', 'Pop', 'Push', 'Peek'], 0), fl('The in-order traversal of a binary search tree gives the items in what order? (one word)', 'sorted'),
    mc('What is a collision in a hash table?', ['Two keys hashing to the same slot', 'A full disk', 'A network failure', 'A syntax error'], 0), mc('What does a recursive subroutine need to stop?', ['A base case', 'A loop', 'A class', 'A pointer'], 0), fl('With fib(1) = 1 and fib(2) = 1, what is fib(5)?', '5'),
    mc('Which complexity is binary search?', ['O(log n)', 'O(n)', 'O(n²)', 'O(1)'], 0), mc('Which complexity is bubble sort in the worst case?', ['O(n²)', 'O(log n)', 'O(n)', 'O(1)'], 0), tf('Encapsulation means hiding data inside an object.', true),
    mc('Which register holds the address of the next instruction?', ['PC', 'MAR', 'ACC', 'CIR'], 0), fl('What is the 8-bit two\'s complement representation of −1?', '11111111'), fl('What is the range of 8-bit two\'s complement? Type the smallest number.', '-128', '−128'),
    mc('Which normal form removes partial dependencies?', ['2NF', '1NF', '3NF', '0NF'], 0), mc('Which key decrypts data in asymmetric encryption?', ['The private key', 'The public key', 'The hash', 'The MAC address'], 0), tf('Agile development works in short cycles with regular feedback.', true)],
}
