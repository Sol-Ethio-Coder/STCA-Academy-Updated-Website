import { cpp, ai, cs, english } from './content2.js'
// Full course content. Lesson text supports: blank-line paragraphs, "- " bullets, "> " tips,
// **bold**, ~inline code~ and ~~~ code blocks ~~~. Keep "${" out of the text.
const mc = (q, options, answer) => ({ t: 'mcq', q, options, answer })
const tf = (q, answer) => ({ t: 'tf', q, answer })
const fl = (q, answer, ...alt) => ({ t: 'fill', q, answer, alt })
const od = (q, items) => ({ t: 'order', q, items })
const mt = (q, ...pairs) => ({ t: 'match', q, pairs })
const ck = (q, items, link) => ({ t: 'checklist', q, items, link })
const play = html => ({ t: 'play', html })
const task = (q, starter, checks, hint, solution) => ({ t: 'task', q, starter, checks, hint, solution })
const pyt = (q, starter, expect, hint, solution, checks = []) => ({ t: 'pytask', q, starter, expect, hint, solution, checks })
const jst = (q, starter, expect, hint, solution, checks = []) => ({ t: 'jstask', q, starter, expect, hint, solution, checks })
const L = (title, body, acts) => ({ title, body, acts })
const M = (module, ...ls) => ls.map(l => ({ ...l, module }))
const ids = ls => ls.flat().map((l, i) => ({ id: 'l' + (i + 1), ...l }))

/* ------------------------------ WEB DEVELOPMENT ------------------------------ */
export const web = {
  price: 300,
  lessons: ids([
    M('Module 1 · HTML foundations',
      L('How the web works and your first page', `The web is a conversation. Your browser asks a server for a page, the server sends back a file, and the browser turns that file into what you see on screen.

That file is written in **HTML** (HyperText Markup Language). HTML wraps content in **tags**. Most tags come in pairs: an opening ~<p>~ and a closing ~</p>~.

Every page has the same skeleton:

~~~
<!DOCTYPE html>
<html>
  <head>
    <title>My page</title>
  </head>
  <body>
    <h1>Hello!</h1>
    <p>This is my first page.</p>
  </body>
</html>
~~~

- ~<head>~ holds information about the page, such as its title.
- ~<body>~ holds everything people can see.

> Tip: edit any editor below and press Run. You cannot break anything, so experiment!`, [
        play('<h1>Hello!</h1>\n<p>This is my first page.</p>'),
        mc('Which part of an HTML page holds the content people can see?', ['<head>', '<body>', '<title>', '<meta>'], 1),
        task('Create a page with an <h1> heading that contains your name, and a <p> paragraph that says something about you.', '<!-- Write your HTML here -->\n', [['<h1[^>]*>[^<]+</h1>', 'Add an <h1> heading with your name inside it.'], ['<p[^>]*>[^<]+</p>', 'Add a <p> paragraph with some text.']], 'Every tag needs an opening and a closing part, like <h1>Sol</h1>.', '<h1>Solomon</h1>\n<p>I am learning to build websites.</p>')]),
      L('Headings, paragraphs and lists', `Headings go from ~<h1>~ (the most important) down to ~<h6>~. Use one ~<h1>~ per page, then ~<h2>~ for sections.

There are two kinds of lists:

- ~<ul>~ is an **unordered** list with bullet points.
- ~<ol>~ is an **ordered** list with numbers.

Each item inside a list is an ~<li>~ (list item).

~~~
<h2>My subjects</h2>
<ul>
  <li>Math</li>
  <li>Coding</li>
</ul>
~~~`, [
        play('<h2>My subjects</h2>\n<ul>\n  <li>Math</li>\n  <li>Coding</li>\n</ul>\n<ol>\n  <li>Wake up</li>\n  <li>Study</li>\n</ol>'),
        mt('Match each tag to what it creates.', ['<h1>', 'The biggest heading'], ['<ul>', 'A bulleted list'], ['<ol>', 'A numbered list'], ['<li>', 'One list item']),
        task('Write an <h2> that says "My goals" followed by an unordered list with at least three goals.', '', [['<h2[^>]*>[^<]*goals[^<]*</h2>', 'Add an <h2> that says My goals.'], ['<ul[^>]*>', 'Add a <ul> list.'], ['(<li[^>]*>[^<]+</li>[^]*){3}', 'Add at least three <li> items with text.']], 'Put three <li> items between <ul> and </ul>.', '<h2>My goals</h2>\n<ul>\n  <li>Learn HTML</li>\n  <li>Learn CSS</li>\n  <li>Build a website</li>\n</ul>')]),
      L('Links and images', `A **link** uses the ~<a>~ tag. Its ~href~ attribute holds the address: ~<a href="https://example.com">Visit</a>~.

An **image** uses the ~<img>~ tag. It has no closing tag, and it needs two attributes:

- ~src~: where the picture file lives.
- ~alt~: a short description. Screen readers read it aloud and it shows if the picture fails to load.

> Always write helpful ~alt~ text. It makes your site usable for everyone.`, [
        play('<a href="https://example.com">Visit example.com</a>\n<br><br>\n<img src="https://placehold.co/200x100" alt="A grey placeholder box">'),
        mc('Which attribute holds the address of a link?', ['src', 'href', 'alt', 'link'], 1),
        task('Add a link to https://example.com and an image that has both a src and an alt attribute.', '', [['<a[^>]+href=["\'][^"\']+["\'][^>]*>[^<]+</a>', 'Add an <a> link with an href and some link text.'], ['<img[^>]+src=["\'][^"\']+["\']', 'Add an <img> with a src.'], ['<img[^>]+alt=["\'][^"\']+["\']', 'Give the <img> a non-empty alt text.']], 'Image: <img src="photo.jpg" alt="describe the picture">', '<a href="https://example.com">Example</a>\n<img src="https://placehold.co/200x100" alt="Grey box">')]),
      L('Semantic layout and tables', `Instead of using ~<div>~ for everything, use **semantic** tags that describe their purpose:

- ~<header>~ the top of a page or section
- ~<nav>~ a group of navigation links
- ~<main>~ the main content (only one per page)
- ~<section>~ a themed group of content
- ~<footer>~ the bottom of the page

Tables show data in rows and columns: ~<table>~ contains ~<tr>~ (rows), which contain ~<th>~ (headers) and ~<td>~ (cells).`, [
        od('Put the page layout in the usual top-to-bottom order.', ['<header>', '<nav>', '<main>', '<footer>']),
        fl('Which tag creates a table row? (two letters)', 'tr', '<tr>'),
        task('Build a page skeleton with a <header>, a <main> and a <footer>, each containing some text.', '', [['<header[^>]*>[^]*</header>', 'Add a <header>.'], ['<main[^>]*>[^]*</main>', 'Add a <main>.'], ['<footer[^>]*>[^]*</footer>', 'Add a <footer>.']], 'Write <header>...</header>, then <main>...</main>, then <footer>...</footer>.', '<header><h1>My site</h1></header>\n<main><p>Welcome!</p></main>\n<footer><p>Made by me</p></footer>')])),
    M('Module 2 · Styling with CSS',
      L('CSS selectors, colors and fonts', `**CSS** (Cascading Style Sheets) controls how HTML looks. A rule has a **selector** and **declarations**:

~~~
h1 {
  color: tomato;
  font-size: 40px;
}
~~~

Selectors: ~p~ styles every paragraph, ~.card~ styles elements with ~class="card"~, and ~#title~ styles the element with ~id="title"~.

Colors can be names (~red~), hex codes (~#4ade80~) or ~rgb(0, 128, 255)~.`, [
        play('<style>\n  h1 { color: tomato; }\n  .note { background: #fef3c7; padding: 8px; }\n</style>\n<h1>Style me!</h1>\n<p class="note">A highlighted note.</p>'),
        fl('Fill in the blank: h1 { ____: blue; } sets the text color. (one word)', 'color'),
        task('Add a <style> block that makes every <h1> a different color and every <p> a larger font-size.', '<h1>Hello</h1>\n<p>Some text</p>\n', [['<style[^>]*>[^]*</style>', 'Add a <style> block.'], ['h1[ \n\t]*{[^}]*color[ \n\t]*:', 'Give h1 a color.'], ['p[ \n\t]*{[^}]*font-size[ \n\t]*:', 'Give p a font-size.']], 'p { font-size: 20px; }', '<style>\n  h1 { color: seagreen; }\n  p { font-size: 22px; }\n</style>\n<h1>Hello</h1>\n<p>Some text</p>')]),
      L('The box model', `Every element is a box with four layers, from inside to outside:

- **content**: the text or image
- **padding**: space inside the border
- **border**: the line around the padding
- **margin**: space outside the border

~~~
.card {
  padding: 16px;
  border: 2px solid #333;
  border-radius: 12px;
  margin: 20px;
}
~~~`, [
        play('<style>\n  .card { padding: 16px; border: 2px solid #333; border-radius: 12px; margin: 20px; max-width: 220px; }\n</style>\n<div class="card">I am a box!</div>'),
        od('Order the box model layers from the inside out.', ['content', 'padding', 'border', 'margin']),
        task('Create a <div class="card"> with a .card rule that uses padding, a border and a border-radius.', '', [['class=["\']card["\']', 'Add an element with class="card".'], ['\\.card[ \n\t]*{[^}]*padding[ \n\t]*:', 'Give .card some padding.'], ['\\.card[ \n\t]*{[^}]*border[ \n\t]*:', 'Give .card a border.'], ['\\.card[ \n\t]*{[^}]*border-radius[ \n\t]*:', 'Round the corners with border-radius.']], 'Rules go inside curly braces: .card { padding: 12px; }', '<style>\n  .card { padding: 16px; border: 2px solid teal; border-radius: 12px; }\n</style>\n<div class="card">Hello</div>')]),
      L('Layout with Flexbox', `Flexbox lays out children in a row (or column) and spaces them nicely. Turn it on with ~display: flex~ on the **parent**.

- ~gap~ adds space between items.
- ~justify-content~ spreads items along the main axis (~center~, ~space-between~).
- ~align-items~ aligns items on the other axis.
- ~flex-direction: column~ stacks items vertically.`, [
        play('<style>\n  .row { display: flex; gap: 12px; justify-content: center; }\n  .box { background: #4ade80; padding: 16px; border-radius: 8px; }\n</style>\n<div class="row">\n  <div class="box">1</div>\n  <div class="box">2</div>\n  <div class="box">3</div>\n</div>'),
        mc('Which CSS puts children side by side in a row?', ['display: block', 'display: flex', 'position: fixed', 'float: none'], 1),
        task('Make a navigation bar: a <nav> containing three links, styled with display: flex and a gap.', '', [['<nav[^>]*>[^]*</nav>', 'Add a <nav>.'], ['(<a[^>]*>[^<]+</a>[^]*){3}', 'Put three <a> links inside the nav.'], ['display[ \n\t]*:[ \n\t]*flex', 'Use display: flex.'], ['gap[ \n\t]*:', 'Add a gap between the links.']], 'nav { display: flex; gap: 16px; }', '<style>\n  nav { display: flex; gap: 16px; }\n</style>\n<nav>\n  <a href="#">Home</a>\n  <a href="#">About</a>\n  <a href="#">Contact</a>\n</nav>')]),
      L('Responsive design', `Phones, tablets and laptops all have different widths. **Responsive design** makes one page work on all of them.

Start with this line in your ~<head>~ so phones do not zoom out:

~~~
<meta name="viewport" content="width=device-width, initial-scale=1">
~~~

A **media query** applies styles only on certain screens:

~~~
@media (max-width: 600px) {
  .row { flex-direction: column; }
}
~~~

Also prefer flexible units like ~%~, ~rem~ and ~max-width~ over fixed pixel widths.`, [
        mc('What does @media (max-width: 600px) mean?', ['Styles apply only on screens 600px wide or narrower', 'Styles apply only above 600px', 'The page is exactly 600px', 'It loads a video'], 0),
        task('Write a media query for max-width: 600px that changes the body background color.', '<style>\n  body { background: white; }\n</style>\n<p>Resize the preview to see it change.</p>', [['@media[^{]*max-width[ \n\t]*:[ \n\t]*[0-9]+px', 'Add a @media rule with max-width.'], ['@media[^{]*{[^]*background[ \n\t]*:', 'Change the background inside the @media rule.']], 'Put a rule inside the media query: @media (max-width: 600px) { body { background: pink; } }', '<style>\n  body { background: white; }\n  @media (max-width: 600px) { body { background: pink; } }\n</style>\n<p>Resize the preview to see it change.</p>')])),
    M('Module 3 · JavaScript and your capstone',
      L('JavaScript makes pages come alive', `HTML is structure, CSS is style, and **JavaScript** is behavior. It reacts to clicks, changes text and talks to servers.

JavaScript lives in a ~<script>~ tag. You can find an element and change it:

~~~
document.getElementById("msg").textContent = "Hi!";
~~~

~addEventListener~ runs code when something happens, such as a click.`, [
        play('<p id="msg">Hello</p>\n<button id="b">Click me</button>\n<script>\n  document.getElementById("b").addEventListener("click", function () {\n    document.getElementById("msg").textContent = "You clicked!";\n  });\n</script>'),
        task('Add a button that changes the text of a paragraph when clicked.', '<p id="out">Waiting...</p>\n', [['<button', 'Add a <button>.'], ['onclick|addEventListener', 'Make the button react using onclick or addEventListener.'], ['textContent|innerText|innerHTML', 'Change the text using textContent.']], 'Try: <button onclick="document.getElementById(\'out\').textContent=\'Done!\'">Go</button>', '<p id="out">Waiting...</p>\n<button onclick="document.getElementById(\'out\').textContent=\'Done!\'">Go</button>')]),
      L('Reading input and building a counter', `Forms give you ~<input>~ elements. In JavaScript, ~element.value~ reads what the user typed.

A **variable** remembers information, and ~count = count + 1~ (or ~count++~) adds one.

~~~
let count = 0;
function add() {
  count++;
  document.getElementById("n").textContent = count;
}
~~~`, [
        play('<p>Count: <span id="n">0</span></p>\n<button onclick="add()">+1</button>\n<script>\n  let count = 0;\n  function add() {\n    count++;\n    document.getElementById("n").textContent = count;\n  }\n</script>'),
        task('Build a greeting: an <input id="name">, a button, and JavaScript that reads the input .value and shows "Hello, <name>" in a paragraph.', '', [['<input', 'Add an <input>.'], ['\\.value', 'Read the input text with .value.'], ['<button', 'Add a <button>.'], ['textContent|innerText|innerHTML', 'Show the greeting by changing an element\'s text.']], 'document.getElementById("name").value gives the typed text.', '<input id="name" placeholder="Your name">\n<button onclick="greet()">Greet</button>\n<p id="out"></p>\n<script>\n  function greet() {\n    document.getElementById("out").textContent = "Hello, " + document.getElementById("name").value;\n  }\n</script>')]),
      L('Capstone project: your portfolio page', `Time to combine everything. Build a one-page **personal portfolio** that you can really publish.

Your page must have:

- a ~<header>~ with an ~<h1>~ and a ~<nav>~ with at least two links
- a ~<main>~ with a ~<section>~ that has an ~<h2>~ and a paragraph about you
- an ~<img>~ with ~alt~ text
- CSS that uses ~display: flex~ and at least one ~@media~ query
- a ~<button>~ with JavaScript
- a ~<footer>~

> Tip: build it step by step. Get the HTML right first, then style it, then add the button.`, [
        task('Build your portfolio page. Every requirement in the list above is checked automatically.', '<!-- Capstone: build your portfolio here -->\n', [['<header[^>]*>[^]*</header>', 'Add a <header>.'], ['<h1[^>]*>[^<]+</h1>', 'Add an <h1> with text.'], ['<nav[^>]*>[^]*(<a[^>]*>[^<]+</a>[^]*){2}[^]*</nav>', 'Add a <nav> with at least two links.'], ['<main[^>]*>[^]*<section[^>]*>[^]*<h2[^>]*>[^<]+</h2>[^]*</section>', 'Add <main> with a <section> containing an <h2>.'], ['<img[^>]+alt=["\'][^"\']+["\']', 'Add an <img> with alt text.'], ['display[ \n\t]*:[ \n\t]*flex', 'Use display: flex in your CSS.'], ['@media', 'Add a @media query.'], ['<button', 'Add a <button>.'], ['onclick|addEventListener', 'Make the button do something with JavaScript.'], ['<footer[^>]*>[^]*</footer>', 'Add a <footer>.']], 'Check the list above one item at a time. The red messages tell you what is still missing.', '<style>\n  nav { display: flex; gap: 12px; }\n  @media (max-width: 600px) { nav { flex-direction: column; } }\n</style>\n<header><h1>Sol</h1><nav><a href="#about">About</a><a href="#contact">Contact</a></nav></header>\n<main><section id="about"><h2>About me</h2><p>I build websites.</p><img src="https://placehold.co/160" alt="Profile placeholder"></section></main>\n<button onclick="this.textContent=\'Thanks!\'">Say hi</button>\n<footer><p>Made with HTML</p></footer>'),
        ck('Publish it for real (optional but recommended).', ['Save your code in a file called index.html', 'Drag the file onto Netlify Drop to publish it', 'Open your live link and test it on your phone'], ['Open Netlify Drop', 'https://app.netlify.com/drop'])])),
  ]),
  exam: [
    mc('HTML stands for…', ['Hyper Text Markup Language', 'High Tech Modern Language', 'Home Tool Markup Language', 'Hyperlinks and Text Markup Language'], 0),
    tf('The <p> tag is used for paragraphs.', true), fl('Which letter is the tag for a link? (<a>)', 'a', '<a>'),
    mc('Which CSS property changes the background color?', ['color', 'background-color', 'bgcolor', 'paint'], 1), tf('JavaScript is used to style pages.', false),
    mc('Which tag holds the visible content of a page?', ['<head>', '<title>', '<body>', '<meta>'], 2), mc('Which attribute gives the file of an image?', ['href', 'src', 'link', 'url'], 1),
    tf('display: flex lets items sit side by side.', true), mc('Which box model layer is outside the border?', ['Padding', 'Content', 'Margin', 'Alt'], 2),
    mc('What does a media query help with?', ['Responsive design', 'Databases', 'Sound', 'Passwords'], 0), fl('Complete the method name: document.getElementBy____("title") finds an element by its id. (two letters)', 'id'),
    tf('The alt attribute describes an image for people who cannot see it.', true)],
}

/* ------------------------------ JAVASCRIPT ------------------------------ */
export const js = {
  price: 300,
  lessons: ids([
    M('Module 1 · The basics',
      L('console.log and variables', `JavaScript can run in your browser or on a server. A great way to learn it is ~console.log()~, which prints a value so you can see it.

Store information in a **variable**:

~~~
let name = "Hana";
const year = 2026;
console.log(name, year);
~~~

- ~let~ creates a variable you can change later.
- ~const~ creates one that cannot be reassigned.`, [
        mc('Which keyword creates a constant?', ['let', 'const', 'var x', 'set'], 1),
        jst('Print exactly: Hello, Addis!', '// Write your code here\n', 'Hello, Addis!', 'console.log("...") prints text. Text goes inside quotes.', 'console.log("Hello, Addis!");')]),
      L('Data types and operators', `The main types are **number** (~42~, ~3.5~), **string** (~"text"~), **boolean** (~true~ or ~false~), ~null~ and ~undefined~.

Operators: ~+~ ~-~ ~*~ ~/~, ~%~ (remainder) and ~**~ (power). The ~+~ operator also joins strings: ~"Hi " + "Sol"~.

Compare values with ~===~ (equal) and ~!==~, and also ~<~ ~>~ ~<=~ ~>=~.`, [
        fl('What does 7 % 3 give?', '1'), mc('What does "5" + 2 give in JavaScript?', ['7', '52', 'Error', '"7"'], 1),
        jst('Print 7 % 3 and 2 ** 3 in one console.log, separated by a space.', '', '1 8', 'console.log(a, b) prints both values separated by a space.', 'console.log(7 % 3, 2 ** 3);')]),
      L('Making decisions', `**Conditions** let your program choose a path:

~~~
if (score >= 50) {
  console.log("Pass");
} else {
  console.log("Fail");
}
~~~

Combine tests with ~&&~ (and), ~||~ (or) and ~!~ (not). Use ~else if~ for more branches.`, [
        tf('else runs when the if condition is false.', true),
        jst('The variable score is 75. Print Pass if score is at least 50, otherwise Fail.', 'const score = 75;\n', 'Pass', 'Use if (score >= 50) { ... } else { ... }', 'const score = 75;\nif (score >= 50) {\n  console.log("Pass");\n} else {\n  console.log("Fail");\n}', ['if'])])),
    M('Module 2 · Loops, functions and arrays',
      L('Loops', `A **loop** repeats code.

~~~
for (let i = 1; i <= 3; i++) {
  console.log(i);
}
~~~

A ~for~ loop has three parts: start (~let i = 1~), condition (~i <= 3~) and step (~i++~). A ~while~ loop repeats as long as its condition is true.`, [
        fl('How many times does for (let i = 0; i < 4; i++) run?', '4'),
        jst('Print the numbers 1 to 5, one per line.', '', '1\n2\n3\n4\n5', 'for (let i = 1; i <= 5; i++) { console.log(i); }', 'for (let i = 1; i <= 5; i++) {\n  console.log(i);\n}', ['for|while'])]),
      L('Functions', `A **function** is a named, reusable block of code. It can take **parameters** and send back a result with ~return~.

~~~
function square(n) {
  return n * n;
}
console.log(square(4)); // 16
~~~

Arrow functions are a shorter way to write them: ~const square = n => n * n;~`, [
        mc('What does return do?', ['Prints a value', 'Sends a value back from the function', 'Starts a loop', 'Deletes a variable'], 1),
        jst('Write a function square(n) that returns n * n, then print square(7).', '', '49', 'function square(n) { return n * n; }', 'function square(n) {\n  return n * n;\n}\nconsole.log(square(7));', ['square'])]),
      L('Arrays', `An **array** holds a list of values: ~const names = ["Sol", "Hana", "Dawit"];~

- ~names[0]~ is the first item (counting starts at 0).
- ~names.length~ is the number of items.
- ~names.push("Abel")~ adds an item to the end.
- ~names.map(...)~, ~filter(...)~ and ~forEach(...)~ work on every item.`, [
        fl('What is [10, 20, 30].length?', '3'),
        jst('Add "mango" to the fruits array with push, then print the length of the array.', 'const fruits = ["apple", "banana", "orange"];\n', '4', 'fruits.push("mango"); console.log(fruits.length);', 'const fruits = ["apple", "banana", "orange"];\nfruits.push("mango");\nconsole.log(fruits.length);', ['push'])])),
    M('Module 3 · Objects, the DOM and your project',
      L('Objects', `An **object** groups related data using **key: value** pairs.

~~~
const student = { name: "Hana", grade: 90 };
console.log(student.name);   // Hana
student.grade = 95;
~~~

Arrays of objects are everywhere in real apps, for example a list of products.`, [
        mc('How do you read the name property of student?', ['student(name)', 'student.name', 'student->name', 'name.student'], 1),
        jst('Print the name and grade of the student on one line, separated by a space.', 'const student = { name: "Hana", grade: 90 };\n', 'Hana 90', 'console.log(student.name, student.grade);', 'const student = { name: "Hana", grade: 90 };\nconsole.log(student.name, student.grade);')]),
      L('Changing the page (the DOM)', `The **DOM** is the page as JavaScript sees it. You can find elements and change them:

~~~
const title = document.getElementById("title");
title.textContent = "New title";
title.style.color = "tomato";
~~~

Events like ~click~ let your code react to the user.`, [
        play('<h1 id="title">Hello</h1>\n<button onclick="change()">Change</button>\n<script>\n  function change() {\n    const t = document.getElementById("title");\n    t.textContent = "Changed!";\n    t.style.color = "tomato";\n  }\n</script>'),
        task('Make a button that increases a number shown on the page each time it is clicked.', '<p>Count: <span id="n">0</span></p>\n', [['<button', 'Add a <button>.'], ['onclick|addEventListener', 'Make the button react to clicks.'], ['\\+\\+|\\+=[ ]*1|\\+[ ]*1', 'Add 1 to a variable each click.'], ['textContent|innerText|innerHTML', 'Update the number on the page.']], 'Keep the count in a variable, add one, then write it into the span.', '<p>Count: <span id="n">0</span></p>\n<button onclick="add()">+1</button>\n<script>\n  let c = 0;\n  function add() {\n    c++;\n    document.getElementById("n").textContent = c;\n  }\n</script>')]),
      L('Capstone: a tip calculator', `Build a small tool that calculates a tip. It must:

- have an ~<input>~ for the bill amount
- have a ~<button>~
- read the bill with ~.value~ and calculate **10%** with ~*~
- show the result in the page

> Tip: values from inputs are strings. Use ~Number(...)~ to turn them into numbers.`, [
        task('Build the tip calculator.', '', [['<input', 'Add an <input> for the bill.'], ['<button', 'Add a <button>.'], ['\\.value', 'Read the bill with .value.'], ['Number\\(|parseFloat\\(|\\+[a-zA-Z.]+', 'Convert the text into a number.'], ['\\*[ ]*0?\\.1|0?\\.1[ ]*\\*|/[ ]*10', 'Calculate 10% of the bill.'], ['textContent|innerText|innerHTML', 'Show the result on the page.']], 'tip = Number(bill) * 0.1', '<input id="bill" placeholder="Bill amount">\n<button onclick="calc()">Tip</button>\n<p id="out"></p>\n<script>\n  function calc() {\n    const tip = Number(document.getElementById("bill").value) * 0.1;\n    document.getElementById("out").textContent = "Tip: " + tip;\n  }\n</script>')])),
  ]),
  exam: [
    mc('Which keyword declares a variable you can change?', ['let', 'const', 'fixed', 'dim'], 0), tf('const values cannot be reassigned.', true), mc('What does console.log do?', ['Prints a value', 'Deletes a file', 'Starts a loop', 'Styles a page'], 0),
    mc('Which operator is strict equality?', ['=', '==', '===', '!='], 2), fl('What is ["a", "b"].length?', '2'), tf('else runs when the if condition is false.', true),
    fl('What does 10 % 4 give?', '2'), mc('Array counting starts at…', ['0', '1', '-1', '2'], 0), mc('Which keyword sends a value back from a function?', ['send', 'return', 'give', 'exit'], 1),
    tf('document.getElementById finds an element by its id.', true), mc('How do you read the age property of person?', ['person.age', 'person(age)', 'age.person', 'person->age'], 0), mc('Which loop repeats a set number of times?', ['for', 'if', 'else', 'return'], 0)],
}

/* ------------------------------ PYTHON ------------------------------ */
export const python = {
  price: 300,
  lessons: ids([
    M('Module 1 · Python basics',
      L('Your first program', `Python is one of the most popular programming languages in the world. It is used for websites, data science, AI and automation, and it reads almost like English.

The ~print()~ function shows something on the screen:

~~~
print("Hello, Addis!")
~~~

Text (called a **string**) goes inside quotes. Python runs your instructions **line by line**, from top to bottom.

> The code editors below run **real Python** in your browser. The first run takes a few seconds while Python loads.`, [
        mc('Which line prints Hello?', ['echo Hello', 'say("Hello")', 'print("Hello")', 'console.log Hello'], 2),
        pyt('Print exactly: Hello, Addis!', '# Write your code here\n', 'Hello, Addis!', 'Use print("...") with the text inside quotes.', 'print("Hello, Addis!")')]),
      L('Variables and data types', `A **variable** is a name for a value: ~age = 15~. Names are case sensitive, so ~Age~ and ~age~ are different variables.

The main types:

- ~int~: whole numbers like ~42~
- ~float~: decimals like ~3.14~
- ~str~: text like ~"Sol"~
- ~bool~: ~True~ or ~False~

An **f-string** puts variables inside text: ~f"{name} is {age}"~. Use ~type(x)~ to see a type.`, [
        tf('Age and age are the same variable in Python.', false), fl('After x = 4 and y = x * 2, what is y?', '8'),
        pyt('Create name = "Sol" and age = 20, then print: Sol is 20 (use an f-string).', '', 'Sol is 20', 'print(f"{name} is {age}")', 'name = "Sol"\nage = 20\nprint(f"{name} is {age}")', ['name', 'age'])]),
      L('Numbers and strings', `Python is a great calculator: ~+~ ~-~ ~*~ ~/~ plus ~//~ (whole-number division), ~%~ (remainder) and ~**~ (power).

~~~
print(7 // 2)   # 3
print(7 % 2)    # 1
print(2 ** 5)   # 32
~~~

Strings can be joined with ~+~, repeated with ~*~, and have handy methods: ~"sol".upper()~ gives ~SOL~, and ~len("sol")~ gives ~3~.`, [
        fl('What does print(17 % 5) show?', '2'), mc('What does "Hi " + "Sol" give?', ['Hi Sol', 'HiSol', 'Hi+Sol', 'An error'], 0),
        pyt('Print the remainder of 17 divided by 5 and the value of 2 to the power 5 in one print, separated by a space.', '', '2 32', 'print(a, b) prints both values with a space between them.', 'print(17 % 5, 2 ** 5)')])),
    M('Module 2 · Control flow and lists',
      L('Making decisions', `**Conditions** let your program choose. Indentation (4 spaces) is how Python knows which lines belong together.

~~~
score = 75
if score >= 90:
    print("A")
elif score >= 50:
    print("Pass")
else:
    print("Fail")
~~~

Comparisons: ~==~, ~!=~, ~<~, ~>~, ~<=~, ~>=~. Combine with ~and~, ~or~, ~not~.`, [
        mc('What does >= mean?', ['less than', 'equal to', 'not equal', 'greater than or equal to'], 3),
        od('Put this program in the right order.', ['age = 20', 'if age >= 18:', '    print("Adult")']),
        pyt('The variable score is 75. Print Pass if it is at least 50, otherwise Fail.', 'score = 75\n', 'Pass', 'Use if score >= 50: then an indented print.', 'score = 75\nif score >= 50:\n    print("Pass")\nelse:\n    print("Fail")', ['if'])]),
      L('For loops', `A **for loop** repeats code for every item in a sequence. ~range(5)~ gives 0, 1, 2, 3, 4.

~~~
for i in range(3):
    print(i)       # 0 1 2

for i in range(1, 4):
    print(i)       # 1 2 3
~~~

~range(start, stop)~ stops **before** ~stop~.`, [
        fl('What is the last number printed by for i in range(4): print(i)?', '3'),
        pyt('Print the numbers 1 to 5, one per line.', '', '1\n2\n3\n4\n5', 'range(1, 6) gives 1 to 5.', 'for i in range(1, 6):\n    print(i)', ['for'])]),
      L('While loops', `A **while loop** repeats as long as its condition is true. Be careful: if the condition never becomes false, the loop never ends!

~~~
n = 1
while n <= 3:
    print(n)
    n = n + 1
~~~

Use ~break~ to leave a loop early and ~continue~ to skip to the next round.`, [
        mc('What happens if a while condition is always true?', ['The loop never ends', 'It runs once', 'Python fixes it', 'It prints an error at once'], 0),
        pyt('Use a while loop to add the numbers 1 to 10 and print the total (55).', 'total = 0\nn = 1\n', '55', 'Keep adding n to total and increase n until n is 10.', 'total = 0\nn = 1\nwhile n <= 10:\n    total = total + n\n    n = n + 1\nprint(total)', ['while'])]),
      L('Lists', `A **list** stores many values in order: ~fruits = ["apple", "banana"]~.

- ~fruits[0]~ is the first item (counting starts at 0).
- ~fruits.append("mango")~ adds to the end.
- ~len(fruits)~ is the number of items.
- ~for f in fruits:~ loops over every item.
- ~sum(numbers)~, ~max(numbers)~, ~min(numbers)~ work on number lists.`, [
        fl('What does len([4, 8, 15]) show?', '3'),
        pyt('Append "mango" to the fruits list, then print how many fruits there are.', 'fruits = ["apple", "banana", "orange"]\n', '4', 'fruits.append("mango") then print(len(fruits))', 'fruits = ["apple", "banana", "orange"]\nfruits.append("mango")\nprint(len(fruits))', ['append'])])),
    M('Module 3 · Functions, data and your project',
      L('Functions', `A **function** is a reusable block of code. Define it with ~def~, give it **parameters**, and send a result back with ~return~.

~~~
def square(n):
    return n * n

print(square(4))   # 16
~~~

Good functions do one job and have a clear name.`, [
        tf('The def keyword is used to define a function.', true),
        pyt('Write a function square(n) that returns n * n, then print square(7).', '', '49', 'def square(n): return n * n', 'def square(n):\n    return n * n\n\nprint(square(7))', ['def[ ]+square'])]),
      L('Dictionaries', `A **dictionary** stores **key: value** pairs, like a mini database record.

~~~
student = {"name": "Hana", "grade": 90}
print(student["name"])
student["grade"] = 95
~~~

Loop over it with ~for key, value in student.items():~.`, [
        mc('How do you read the value for the key "name" in student?', ['student["name"]', 'student.name()', 'student->name', 'name[student]'], 0),
        pyt('Print the student\'s name and grade on one line, separated by a space.', 'student = {"name": "Hana", "grade": 90}\n', 'Hana 90', 'print(student["name"], student["grade"])', 'student = {"name": "Hana", "grade": 90}\nprint(student["name"], student["grade"])')]),
      L('Handling errors', `Programs meet errors: dividing by zero, a missing file, bad input. **try / except** lets your program handle them without crashing.

~~~
try:
    print(10 / 0)
except ZeroDivisionError:
    print("Cannot divide by zero")
~~~

Read error messages carefully. They tell you the **type** of error and the **line** where it happened.`, [
        mc('Which keyword catches an error?', ['catch', 'except', 'rescue', 'handle'], 1),
        pyt('Divide 10 by 0 inside try, and print "Cannot divide by zero" when it fails.', '', 'Cannot divide by zero', 'Use try: then except ZeroDivisionError:', 'try:\n    print(10 / 0)\nexcept ZeroDivisionError:\n    print("Cannot divide by zero")', ['try', 'except'])]),
      L('Capstone: a grade calculator', `Combine variables, a loop, a function and conditions.

**Your task:** the marks are ~[70, 85, 90, 65]~. Print the average, then the grade:

- 90 or more: ~A~
- 75 or more: ~B~
- 60 or more: ~C~
- otherwise: ~D~

Your output must be exactly two lines: ~Average: 77.5~ and ~Grade: B~.`, [
        pyt('Build the grade calculator.', 'marks = [70, 85, 90, 65]\n# Calculate the average, then print the average and the grade.\n', 'Average: 77.5\nGrade: B', 'average = sum(marks) / len(marks). Then use if / elif / else.', 'marks = [70, 85, 90, 65]\naverage = sum(marks) / len(marks)\nprint(f"Average: {average}")\nif average >= 90:\n    grade = "A"\nelif average >= 75:\n    grade = "B"\nelif average >= 60:\n    grade = "C"\nelse:\n    grade = "D"\nprint(f"Grade: {grade}")', ['sum|for', 'if']),
        ck('Take it further (optional).', ['Change the marks and check the new grade', 'Wrap the code in a function called grade_of(marks)', 'Save your code and share it with a friend'])])),
  ]),
  exam: [
    mc('Which function shows output?', ['show()', 'print()', 'echo()', 'display()'], 1), fl('What does print(10 // 3) show? (integer division)', '3'), tf('Python uses indentation to group code.', true),
    mc('Which is a valid variable name?', ['2name', 'my-name', 'my_name', 'my name'], 2), fl('How many numbers does for i in range(3): print(i) print?', '3'), mc('Which keyword starts a decision?', ['when', 'if', 'check', 'choose'], 1),
    fl('What does 17 % 5 show?', '2'), tf('range(3) produces 0, 1, 2.', true), mc('Which line creates a list?', ['names = ("a")', 'names = ["a", "b"]', 'names = {a, b}', 'names := a b'], 1),
    mc('Which keyword defines a function?', ['func', 'define', 'def', 'function'], 2), mc('Which structure stores key: value pairs?', ['list', 'dictionary', 'tuple', 'string'], 1), mc('Which keyword catches an error?', ['catch', 'except', 'rescue', 'handle'], 1)],
}

/* ------------------------------ MATHEMATICS ------------------------------ */
export const math = {
  price: 300,
  lessons: ids([
    M('Module 1 · Algebra',
      L('Solving linear equations', `An **equation** says two things are equal. To solve it, get the unknown (usually x) alone by doing the **same thing to both sides**.

Solve 2x + 6 = 14:

~~~
2x + 6 = 14
2x = 14 - 6      (subtract 6 from both sides)
2x = 8
x = 8 / 2        (divide both sides by 2)
x = 4
~~~

Check by substituting back: 2(4) + 6 = 14. ✓`, [
        fl('Solve 3x = 12. What is x?', '4', 'x=4'), mc('Solve x + 7 = 10.', ['x = 3', 'x = 17', 'x = 7', 'x = 10'], 0),
        od('Put the steps for solving 3x + 5 = 20 in order.', ['Write 3x + 5 = 20', 'Subtract 5: 3x = 15', 'Divide by 3: x = 5', 'Check: 3(5) + 5 = 20']),
        fl('Solve 4x - 3 = 17. What is x?', '5', 'x=5')]),
      L('Brackets and both-sides equations', `When there are brackets, **expand** first: ~3(x + 2) = 3x + 6~.

When x is on both sides, collect the x terms on one side:

~~~
5x - 4 = 2x + 8
5x - 2x = 8 + 4
3x = 12
x = 4
~~~`, [
        fl('Solve 3(x + 2) = 21. What is x?', '5', 'x=5'), fl('Solve 5x - 4 = 2x + 8. What is x?', '4', 'x=4'), mc('Expand 2(x + 5).', ['2x + 5', '2x + 10', 'x + 10', '2x + 7'], 1)]),
      L('Inequalities', `An **inequality** compares values: ~<~ less than, ~>~ greater than, ~≤~ and ~≥~ include equal.

Solve it like an equation, with one important rule: **if you multiply or divide by a negative number, flip the sign.**

~~~
2x + 1 > 9
2x > 8
x > 4
~~~`, [
        mc('Solve 3x < 12.', ['x < 4', 'x > 4', 'x < 36', 'x = 4'], 0), tf('When you divide both sides by a negative number, you flip the inequality sign.', true), fl('What is the smallest whole number that satisfies x > 6?', '7')])),
    M('Module 2 · Graphs, ratios and geometry',
      L('Straight-line graphs', `The equation ~y = mx + c~ draws a straight line.

- **m** is the **gradient** (slope): how steep the line is.
- **c** is the **y-intercept**: where the line crosses the y-axis.

A positive m goes up to the right, a negative m goes down. Move the sliders to explore.`, [
        { t: 'graph' }, mc('In y = 2x + 1, what is the gradient?', ['1', '2', 'x', '3'], 1), fl('In y = 2x + 3, where does the line cross the y-axis? (y = ?)', '3'),
        mt('Match each equation to its gradient.', ['y = 3x + 1', '3'], ['y = -2x + 5', '-2'], ['y = x - 4', '1'], ['y = 0.5x', '0.5'])]),
      L('Fractions, percentages and ratios', `A **percentage** is a fraction out of 100. To find 25% of 80: ~80 × 25 ÷ 100 = 20~.

A **ratio** compares quantities. To share 60 in the ratio 1 : 2, add the parts (3), find one part (60 ÷ 3 = 20), then 20 and 40.

Percentage change = (change ÷ original) × 100.`, [
        fl('What is 50% of 70?', '35'), fl('A phone costs 2000 Birr and is reduced by 15%. What is the new price?', '1700'), fl('Share 60 in the ratio 1 : 2. What is the larger share?', '40'),
        mc('Which fraction equals 0.25?', ['1/2', '1/4', '1/5', '2/3'], 1)]),
      L('Area, perimeter and volume', `**Perimeter** is the distance around a shape. **Area** is the space inside.

- Rectangle: area = length × width, perimeter = 2 × (length + width)
- Triangle: area = ½ × base × height
- Circle: area = πr², circumference = 2πr
- Box (cuboid): volume = length × width × height`, [
        fl('A rectangle is 5 m by 3 m. What is its area? (number)', '15'), fl('What is the perimeter of that same rectangle? (number)', '16'), mc('What is the area of a triangle with base 10 and height 6?', ['16', '30', '60', '36'], 1),
        fl('What is the volume of a box 2 by 3 by 4?', '24')])),
    M('Module 3 · Advanced topics and your capstone',
      L('Factoring and quadratics', `**Factoring** rewrites an expression as a product: ~x² + 5x + 6 = (x + 2)(x + 3)~ because 2 × 3 = 6 and 2 + 3 = 5.

To solve a **quadratic equation**, factor it and set each bracket to zero:

~~~
x² + 5x + 6 = 0
(x + 2)(x + 3) = 0
x = -2  or  x = -3
~~~`, [
        mc('Factor x² + 7x + 12.', ['(x+2)(x+6)', '(x+3)(x+4)', '(x+1)(x+12)', '(x+7)(x+12)'], 1), fl('Solve (x - 5)(x + 2) = 0. Type the positive solution.', '5'),
        tf('(x + 1)(x + 5) = x² + 6x + 5.', true)]),
      L('Pythagoras and trigonometry', `In a right triangle, **a² + b² = c²**, where c is the longest side (the hypotenuse). With legs 3 and 4: 9 + 16 = 25, so the hypotenuse is 5.

Trigonometry links angles and sides. Remember **SOH CAH TOA**:

- sin θ = Opposite ÷ Hypotenuse
- cos θ = Adjacent ÷ Hypotenuse
- tan θ = Opposite ÷ Adjacent`, [
        fl('The legs are 6 and 8. What is the hypotenuse?', '10'), mt('Match each ratio to its name.', ['Opposite ÷ Hypotenuse', 'sin'], ['Adjacent ÷ Hypotenuse', 'cos'], ['Opposite ÷ Adjacent', 'tan']),
        tf('5, 12, 13 is a Pythagorean triple.', true)]),
      L('Statistics', `Three ways to describe a typical value in a data set:

- **Mean**: add all values, divide by how many there are.
- **Median**: the middle value when sorted (average the two middle values if there is an even count).
- **Mode**: the most frequent value.

The **range** is the largest value minus the smallest.`, [
        fl('Find the mean of 4, 8, 6, 10, 12.', '8'), fl('Find the median of 3, 9, 5, 7, 1.', '5'), fl('Find the mode of 2, 3, 3, 4, 3, 5.', '3'), fl('Find the range of 4, 9, 2, 12, 7.', '10')]),
      L('Capstone: problem set', `Time to bring it together. Every question below must be answered correctly to complete this lesson. Take your time, use a notebook, and check each answer.`, [
        fl('Solve 7x - 9 = 5x + 7. What is x?', '8', 'x=8'), fl('A shop gives 20% off a 1500 Birr bag. How much do you pay?', '1200'), fl('The gradient of the line through (0, 1) and (2, 7) is…', '3'),
        fl('A right triangle has legs 9 and 12. What is the hypotenuse?', '15'), fl('The mean of 12, 15, 18, 21 is…', '16.5'), fl('Solve (x + 4)(x - 1) = 0. Type the negative solution.', '-4')])),
  ]),
  exam: [
    fl('Solve 5x = 35. What is x?', '7', 'x=7'), mc('What is the gradient of y = 3x − 4?', ['3', '−4', '4', 'x'], 0), fl('Solve 2x + 3 = 11. What is x?', '4', 'x=4'),
    mc('Where does y = x + 5 cross the y-axis?', ['y = 0', 'y = 5', 'y = −5', 'x = 5'], 1), tf('x² − 9 factors as (x − 3)(x + 3).', true), mc('Factor x² + 5x + 6.', ['(x+1)(x+6)', '(x+2)(x+3)', '(x+5)(x+1)', '(x−2)(x−3)'], 1),
    fl('What is 20% of 150?', '30'), fl('What is the area of a triangle with base 8 and height 5?', '20'), fl('The legs of a right triangle are 5 and 12. What is the hypotenuse?', '13'),
    tf('A 4 by 6 rectangle has a perimeter of 20.', true), fl('Find the mean of 2, 4, 6, 8.', '5'), mc('When must you flip an inequality sign?', ['When adding', 'When dividing by a negative number', 'Never', 'When squaring'], 1)],
}

/* ------------------------------ SCRATCH ------------------------------ */
const SCRATCH = ['Open the Scratch editor', 'https://scratch.mit.edu/projects/editor/']
export const scratch = {
  price: 0,
  lessons: ids([
    M('Module 1 · Meet Scratch',
      L('The stage, sprites and blocks', `**Scratch** is a visual programming language made at MIT. Instead of typing code, you snap colorful **blocks** together.

The Scratch screen has three main parts:

- the **Stage**: where your project plays
- **Sprites**: the characters and objects on the stage
- the **Code area**: where you build scripts from blocks

Block colors group them by job: blue for **Motion**, purple for **Looks**, pink for **Sound**, yellow for **Events**, orange for **Control**.`, [
        { t: 'stage' }, mc('What do you snap together in Scratch?', ['Folders', 'Blocks', 'Cables', 'Files'], 1),
        mt('Match each block color to its category.', ['Blue', 'Motion'], ['Purple', 'Looks'], ['Yellow', 'Events'], ['Orange', 'Control']),
        ck('Try it in the real Scratch editor.', ['Open the editor and pick the cat sprite', 'Drag a "move 10 steps" block into the code area', 'Click the block to make the cat move'], SCRATCH)]),
      L('Motion and loops', `The **move 10 steps** block moves a sprite, and **turn** blocks rotate it. A **loop** repeats blocks so you do not have to drag them again and again.

- **repeat 10** runs the blocks inside 10 times.
- **forever** never stops.
- **if on edge, bounce** keeps a sprite on the stage.

Try the *repeat 10 × move* button on the stage above to see a loop in action.`, [
        mc('Which block repeats actions again and again with no end?', ['say', 'hide', 'forever', 'play sound'], 2),
        od('Order the blocks for a walking cat.', ['when green flag clicked', 'forever', 'move 10 steps', 'if on edge, bounce']),
        ck('Build it in Scratch.', ['Add "when green flag clicked"', 'Add "forever" and put "move 10 steps" inside', 'Add "if on edge, bounce" inside the loop', 'Click the green flag and watch the cat walk'], SCRATCH)])),
    M('Module 2 · Events, variables and decisions',
      L('Events and sound', `**Events** start your code. Without an event block, nothing happens!

- **when green flag clicked** starts the project
- **when space key pressed** reacts to the keyboard
- **when this sprite clicked** reacts to a mouse click

Add a **start sound** block from the pink Sound category to make your project feel alive.`, [
        mc('Which block starts a script when you press the green flag?', ['when green flag clicked', 'wait 1 seconds', 'go to x y', 'hide'], 0), tf('Scratch scripts can play sounds.', true),
        ck('Make your sprite react.', ['Add "when space key pressed" and a "start sound" block', 'Press the space bar and listen', 'Add "when this sprite clicked" and a "say Hello!" block'], SCRATCH)]),
      L('Variables and score', `A **variable** is a labelled box that remembers a number or text. A game score is the classic example.

- **set score to 0** at the start
- **change score by 1** each time the player earns a point

Make a variable from the orange **Variables** category, then use the blocks above.`, [
        mc('Which block adds a point to your score?', ['change score by 1', 'say score', 'hide', 'go to x y'], 0), tf('A variable can store a score.', true),
        od('Order these blocks for a score that starts at zero and goes up.', ['when green flag clicked', 'set score to 0', 'wait 1 seconds', 'change score by 1'])]),
      L('Decisions and sensing', `**Conditions** let your project decide. The **if** block runs the blocks inside only when its condition is true.

~~~
if touching Star? then
  change score by 1
~~~

Sensing blocks, like **touching ?**, **key pressed?** and **distance to**, ask questions about the project.`, [
        mc('Which block checks whether two sprites touch?', ['touching ?', 'wait', 'forever', 'broadcast'], 0),
        mt('Match each block to what it does.', ['if ... then', 'Runs blocks only when a condition is true'], ['forever', 'Repeats blocks without stopping'], ['change score by 1', 'Adds one to a variable'])])),
    M('Module 3 · Your game',
      L('Project: a catch game', `Time to build a complete game. In a **catch game** the player moves left and right to catch falling stars.

Plan first, then build one step at a time:

- the player sprite moves with the arrow keys
- a star falls from the top at a random place
- touching the star adds a point and sends it back to the top
- a score is shown on the stage`, [
        od('Plan the catch game in order.', ['Draw the sprites', 'Move the player with arrow keys', 'Make a star fall', 'Add a score and a win message']),
        ck('Build your catch game in Scratch. Tick each step when it works.', ['The player moves left and right with the arrow keys', 'The star falls from the top of the stage', 'Touching the star adds 1 to the score', 'The star returns to the top at a random x position', 'Your project has a score variable that is visible on the stage'], SCRATCH)]),
      L('Share and improve your project', `A project is not finished until someone plays it! Create a free Scratch account, **save** your project and click **Share**.

Ideas to improve your game:

- add a timer using a variable
- add a "Game Over" message when the score reaches 10
- play a sound when a star is caught
- ask a friend to play it and listen to their feedback`, [
        ck('Finish like a creator.', ['Give your project a title and instructions', 'Click Share so others can play it', 'Add one improvement from the list'], ['Open Scratch', 'https://scratch.mit.edu'])])),
  ]),
  exam: [
    mc('Scratch programs are built with…', ['Blocks', 'Typing only', 'Paper', 'Spreadsheets'], 0), tf('The stage is where sprites perform.', true), mc('Which block makes a sprite repeat forever?', ['forever', 'say', 'hide', 'stop'], 0),
    fl('How many steps does "move 10 steps" move a sprite? (number)', '10'), mc('What starts a script?', ['An event block', 'A sound', 'A costume', 'The stage'], 0), tf('You must type code to use Scratch.', false),
    mc('Which block adds one to a variable?', ['change score by 1', 'say score', 'hide', 'stop all'], 0), mc('What lets a sprite react to the keyboard?', ['Event blocks', 'Costumes', 'Backdrops', 'Sounds only'], 0),
    mc('Which block detects touching?', ['touching ?', 'wait', 'forever', 'broadcast'], 0), tf('Planning your game before building it helps.', true)],
}

/* ------------------------------ DIGITAL LITERACY ------------------------------ */
export const digital = {
  price: 0,
  lessons: ids([
    M('Module 1 · Computer essentials',
      L('Parts of a computer', `A computer has **hardware** (parts you can touch) and **software** (programs and apps).

- **Input devices** send data in: keyboard, mouse, microphone, scanner.
- **Output devices** show results: monitor, speaker, printer.
- The **CPU** is the brain that processes instructions.
- **RAM** is short-term memory used while programs run.
- **Storage** (hard drive or SSD) keeps your files when the power is off.`, [
        mt('Match each part to its job.', ['Keyboard', 'Input'], ['Printer', 'Output'], ['CPU', 'Processes instructions'], ['SSD', 'Stores files permanently']),
        mc('Which is an input device?', ['Monitor', 'Speaker', 'Printer', 'Keyboard'], 3), tf('A monitor is an output device.', true)]),
      L('Files, folders and storage', `Files hold your work and **folders** keep them organized. Use clear names, such as ~Math-Homework-Week3.docx~, not ~untitled1~.

Good habits:

- keep one folder per subject or project
- save often (the shortcut is Ctrl + S)
- **back up** important files to a flash drive or the cloud, so one broken laptop does not erase your work

Know your units: 1 KB, 1 MB, 1 GB and 1 TB are each about 1000 times bigger than the last.`, [
        mc('Which is the best file name?', ['untitled1', 'Math-Homework-Week3.docx', 'asdf', 'new'], 1), tf('Backing up files protects you from losing your work.', true),
        od('Order these sizes from smallest to largest.', ['KB', 'MB', 'GB', 'TB']),
        ck('Practice on your own computer.', ['Create a folder called STCA-Practice', 'Create two files inside it with clear names', 'Copy the folder to a flash drive or cloud storage'])])),
    M('Module 2 · Everyday productivity',
      L('Word processing basics', `A word processor (such as Word or Google Docs) helps you write letters, reports and CVs.

Key skills: ~bold~ (Ctrl + B), italics (Ctrl + I), headings, bullet lists, aligning text, inserting a picture, and checking spelling.

> Tip: use **heading styles** instead of just making text bigger. They create structure and a table of contents automatically.`, [
        mt('Match each shortcut to what it does.', ['Ctrl + B', 'Bold'], ['Ctrl + I', 'Italic'], ['Ctrl + S', 'Save'], ['Ctrl + Z', 'Undo']),
        ck('Make a one-page document.', ['Type a title and format it as a heading', 'Add a bulleted list with three items', 'Insert a picture', 'Save it with a clear file name'])]),
      L('Spreadsheet basics', `A spreadsheet (Excel or Google Sheets) is a grid of **cells**. A cell is named by its column and row, like **B3**.

Formulas start with ~=~:

- ~=A1+A2~ adds two cells
- ~=SUM(A1:A3)~ adds a range
- ~=AVERAGE(A1:A3)~ finds the mean
- ~=MAX(A1:A3)~ and ~=MIN(A1:A3)~ find the biggest and smallest`, [
        fl('Cells A1, A2 and A3 contain 10, 20 and 30. What does =SUM(A1:A3) show?', '60'), fl('Using the same cells, what does =AVERAGE(A1:A3) show?', '20'),
        mt('Match each formula to its purpose.', ['=SUM(A1:A3)', 'Adds the numbers'], ['=AVERAGE(A1:A3)', 'Finds the mean'], ['=MAX(A1:A3)', 'Finds the largest value']),
        mc('Every spreadsheet formula starts with…', ['=', '#', '@', '/'], 0)]),
      L('Email and online communication', `An email has **To**, **Cc**, a **Subject** and a **Body**. Write a short, clear subject, greet the person, keep your message polite and end with your name.

Use **Cc** to copy people who should know, and be careful with **Reply all**. Never open attachments or click links from people you do not know.`, [
        od('Put these steps of sending an email in order.', ['Write the address in To', 'Add a Subject', 'Write the message', 'Press Send']), mc('What should you do with an attachment from a stranger?', ['Open it fast', 'Do not open it', 'Forward it', 'Print it'], 1),
        ck('Practice a professional email.', ['Write to a friend or teacher with a clear subject', 'Greet them and keep it short and polite', 'End with your name before sending'])])),
    M('Module 3 · Staying safe and smart online',
      L('Passwords and online safety', `Protect your accounts:

- use **long, unique passwords** (a sentence works well)
- never share passwords, even with friends
- turn on **two-step verification** when you can
- be careful of **phishing**: messages that pretend to be a bank or a friend to steal your information
- check that a site address starts with **https**`, [
        mc('A strong password is…', ['Your name', 'Long and unique', 'Your birthday', 'The same everywhere'], 1), tf('It is safe to share your password with friends.', false),
        mc('What is phishing?', ['A fake message that tries to steal your information', 'A fast internet connection', 'A type of password', 'A computer virus update'], 0)]),
      L('Searching and judging sources', `Anyone can publish anything online, so check before you believe it.

- use **specific keywords**: "Ethiopia population 2024" beats "people"
- check **who** published the page and **when**
- compare **two or more sources**
- be careful with shocking headlines and pages with no author`, [
        od('Order a good search routine.', ['Choose clear keywords', 'Read the top results', 'Check who wrote them', 'Compare two sources']), tf('You should compare sources before trusting a claim.', true),
        ck('Final practice: research something you care about.', ['Search with three specific keywords', 'Open two different websites', 'Write down which one you trust more and why'])])),
  ]),
  exam: [
    mc('Which is an output device?', ['Mouse', 'Keyboard', 'Printer', 'Scanner'], 2), tf('Strong passwords should be unique.', true), fl('The S in https stands for ____. (one word)', 'secure'),
    mc('The Subject line of an email is…', ['The main message', 'A short title', 'The sender', 'An attachment'], 1), tf('You should click every link you receive.', false), mc('Which is an input device?', ['Speaker', 'Monitor', 'Microphone', 'Projector'], 2),
    mc('What is a folder for?', ['Organizing files', 'Printing', 'Typing', 'Playing sound'], 0), tf('You should compare sources before trusting a claim.', true), fl('Cells A1 and A2 hold 5 and 7. What does =A1+A2 show?', '12'),
    mc('Where can you back up files?', ['Cloud or flash drive', 'Nowhere', 'On the screen', 'Inside the keyboard'], 0)],
}

/* ------------------------------ EXAM PREPARATION ------------------------------ */
export const exam = {
  price: 400,
  lessons: ids([
    M('Module 1 · Plan and prepare',
      L('Plan your revision', `Good results come from a **plan**, not from last-minute panic.

1. List every subject and topic you must cover.
2. Rate each topic: weak, okay or strong.
3. Study weak topics first, in blocks of **45 minutes** followed by a **10 minute** break.
4. Plan one rest day each week.

> A plan you can follow beats a perfect plan you quit after two days.`, [
        mc('Which is the best revision block?', ['8 hours straight', 'Only the night before', '45 min study + 10 min rest', 'Skip weak subjects'], 2), od('Plan a study session.', ['Choose one topic', 'Study for 45 minutes', 'Rest for 10 minutes', 'Test yourself']),
        fl('How many minutes of rest follow each 45 minute study block? (number)', '10')]),
      L('Study techniques that really work', `Rereading and highlighting feel productive but teach little. Better methods:

- **Active recall**: close the book and test yourself with questions.
- **Spaced repetition**: review after 1 day, 3 days, 1 week, then 1 month.
- **Practice problems**: especially for math and science.
- **Teach it**: explain the topic to a friend in your own words.`, [
        mt('Match each technique to its description.', ['Active recall', 'Testing yourself from memory'], ['Spaced repetition', 'Reviewing at growing time gaps'], ['Teaching', 'Explaining the topic to someone else']),
        mc('Which method is active recall?', ['Rereading notes', 'Testing yourself with questions', 'Highlighting everything', 'Copying a page'], 1), od('Order a spaced review.', ['Learn the topic', 'Review after 1 day', 'Review after 3 days', 'Review after 1 week'])]),
      L('Smart notes and memory', `Make notes you will actually use. The **Cornell method** splits a page into **cues** (questions), **notes** and a **summary**. Mind maps work well for connected ideas, and flashcards are perfect for facts and vocabulary.

Your brain also needs care: **sleep 7-9 hours**, eat regularly, drink water and take short walks. Memory is stored while you sleep.`, [
        tf('Sleeping well helps you remember what you studied.', true), mc('The Cornell method divides a page into…', ['Cues, notes and summary', 'Two columns of drawings', 'Only bullet points', 'A table of dates'], 0),
        ck('Build your first study tools.', ['Make 10 flashcards for your weakest topic', 'Write one Cornell-style page of notes', 'Plan your bedtime for the week before the exam'])])),
    M('Module 2 · Practice and perform',
      L('Using past papers', `Past papers show you the **style** of questions, the **time pressure** and the **marking scheme**.

1. Do the paper under exam conditions: timed, no notes.
2. Mark it honestly using the mark scheme.
3. List every mistake and the reason for it: *did not know*, *careless*, or *ran out of time*.
4. Revise those topics, then try another paper.`, [
        mc('After marking a paper you should…', ['Throw it away', 'List and review mistakes', 'Ignore the score', 'Redo only easy questions'], 1), tf('Timing yourself helps you practice for exam day.', true),
        od('Order the past paper routine.', ['Do the paper under timed conditions', 'Mark it with the mark scheme', 'List your mistakes', 'Revise those topics'])]),
      L('Managing time in the exam', `Divide the time by the marks. If a paper is **120 minutes for 100 marks**, spend about **1.2 minutes per mark**. A 5-mark question deserves about 6 minutes.

If a question is too hard, **skip it and come back later**. Leave 5 to 10 minutes at the end to check your work.`, [
        fl('A 60 minute exam has 60 marks. How many minutes per mark? (number)', '1'), fl('A paper is 120 minutes for 100 marks. About how many minutes should a 10-mark question take?', '12'), tf('You should never skip a hard question.', false)]),
      L('Exam day and your plan', `The night before: pack your pens, ID and calculator, then **sleep**. On the day: eat breakfast, arrive early, read **every question twice**, start with the questions you know, and keep an eye on the clock.

If you feel nervous, breathe slowly in for 4 seconds and out for 6. A little stress is normal and can even help.`, [
        mc('Which is a good exam-day habit?', ['Skip the instructions', 'Read each question twice', 'Leave without checking', 'Guess everything'], 1),
        ck('Capstone: create your personal exam plan.', ['List every subject and rate each topic weak, okay or strong', 'Write a 7-day timetable with 45-minute study blocks', 'Choose two past papers to do under timed conditions', 'Pack your exam bag the night before'])])),
  ]),
  exam: [
    mc('When should you start revising?', ['The night before', 'Weeks before', 'During the exam', 'Never'], 1), tf('Past papers are useful for practice.', true), fl('How long is a good study block, in minutes?', '45'),
    mc('What should you start with?', ['Your weakest subject', 'Only easy topics', 'Nothing', 'Random pages'], 0), tf('Reading questions carefully can prevent mistakes.', true), mc('What do you do with your mistakes?', ['Ignore them', 'List and review them', 'Hide the paper', 'Repeat easy ones'], 1),
    fl('A 120 minute paper has 100 marks. About how many minutes per mark? (decimal)', '1.2'), mc('Active recall means…', ['Rereading', 'Testing yourself', 'Skipping', 'Highlighting only'], 1), tf('Spaced repetition spreads your reviews over time.', true),
    mc('If a question is very hard you should…', ['Panic', 'Skip it and return later', 'Leave the exam', 'Guess forever'], 1)],
}

export const extras = { web, js, python, math, scratch, digital, exam, cpp, ai, cs, english }
