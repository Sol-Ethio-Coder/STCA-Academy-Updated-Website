// Paid course: Digital Fluency.
import { mc, tf, fl, od, mt, ck, L, M, ids } from './helpers.js'

export const fluency = {
  price: 300,
  lessons: ids([
    M('Module 1 · Find, judge and use information',
      L('What is digital fluency?', `**Digital literacy** is knowing the basics: switching on a device, typing, sending an email. **Digital fluency** goes further. It means using technology **confidently, critically, creatively and responsibly** to get things done.

Four pillars of digital fluency:

- **Find**: search for information and judge whether it can be trusted.
- **Create**: write, design, calculate and build with digital tools.
- **Communicate**: work and share with other people online.
- **Protect**: keep yourself, your data and your reputation safe.

Fluent people do not just know *which button to press*. They know *which tool to choose* and *why*.`, [
        mt('Match each pillar to an example.', ['Find', 'Checking who wrote an article'], ['Create', 'Making a chart in a spreadsheet'], ['Communicate', 'Sharing a document with classmates'], ['Protect', 'Turning on two-step verification']),
        tf('Digital fluency means knowing which tool to choose and why, not only which button to press.', true),
        ck('Rate yourself honestly.', ['Give yourself a score from 1 to 5 for each pillar: Find, Create, Communicate, Protect', 'Pick the lowest score as your focus for this course', 'Write one thing you want to be able to do by the end'])]),
      L('Searching smart and judging sources', `Better searches save time:

- ~"exact phrase"~ in quotes finds those words together.
- ~-word~ removes results with that word.
- ~site:gov.et~ searches one website or domain.
- Use **specific keywords**: "Ethiopia school enrolment 2024" beats "schools".

Then **judge the source** with the **SIFT** method:

- **S**top: pause before you share or believe.
- **I**nvestigate the source: who is behind it?
- **F**ind better coverage: what do other reliable sources say?
- **T**race claims back to where they started.`, [
        mt('Match each SIFT step to what you do.', ['Stop', 'Pause before you believe or share'], ['Investigate the source', 'Find out who is behind it'], ['Find better coverage', 'Check what other reliable sources say'], ['Trace claims', 'Follow a claim back to where it started']),
        mc('Which search finds the exact words "digital fluency" together?', ['"digital fluency"', 'digital OR fluency', 'digital -fluency', 'digital*fluency'], 0),
        mc('A shocking post has no author and no sources. What should you do first?', ['Stop and check other reliable sources', 'Share it at once', 'Believe it because it has many likes', 'Delete your browser'], 0)]),
      L('Documents and spreadsheets', `**Documents**: use **styles** (Heading 1, Heading 2) instead of manually enlarging text, so you get structure, navigation and a table of contents. Use **comments** and **suggesting mode** to collaborate, and **version history** to undo mistakes.

**Spreadsheets** do the maths for you with **formulas**, which start with ~=~:

- ~=SUM(A1:A5)~ adds a range
- ~=AVERAGE(A1:A5)~ finds the mean
- ~=IF(A1>=50,"Pass","Fail")~ chooses a result
- ~=COUNTIF(A1:A5,">50")~ counts cells that meet a rule

Cells A1 to A5 below hold: 40, 60, 70, 20, 90.`, [
        fl('A1 holds 65. What does =IF(A1>=50,"Pass","Fail") show?', 'Pass'), fl('Cells A1 to A5 hold 40, 60, 70, 20 and 90. What does =COUNTIF(A1:A5,">50") show?', '3'), fl('Using the same cells, what does =SUM(A1:A5) show?', '280'),
        mt('Match each formula to its job.', ['=SUM(A1:A5)', 'Adds the numbers'], ['=AVERAGE(A1:A5)', 'Finds the mean'], ['=IF(A1>=50,"Pass","Fail")', 'Chooses between two results'], ['=COUNTIF(A1:A5,">50")', 'Counts cells that meet a rule'])]),
      L('Data literacy: reading charts', `We see charts everywhere. A fluent reader asks: **what does this really show?**

- **Bar charts** compare categories. **Line charts** show change over time. **Pie charts** show parts of a whole.
- Watch the **axis**. A bar chart whose axis does not start at zero can make a small difference look huge.
- **Percentage change** = (new − old) ÷ old × 100.
- Remember: **correlation is not causation**. Two things moving together does not mean one causes the other.`, [
        fl('Sales rose from 200 to 250. What is the percentage change? (number)', '25'), mc('Which chart is best for showing how something changes over time?', ['Line chart', 'Pie chart', 'Bar chart of one value', 'Table of names'], 0),
        tf('A bar chart whose axis starts far above zero can make a small difference look big.', true)])),
    M('Module 2 · Communicate, collaborate and stay safe',
      L('Communication and collaboration', `Choose the right channel: **email** for formal or detailed messages, **chat** for quick questions, **video calls** for discussion.

Good **netiquette**: write clear subject lines, be polite and brief, do not write in ALL CAPS, think before you **Reply all**, and keep private information private.

**Cloud storage** (Google Drive, OneDrive) lets you work from any device and share files. Set **permissions** carefully:

- **Viewer**: can only read
- **Commenter**: can read and comment
- **Editor**: can change the file`, [
        mt('Match each permission to what it allows.', ['Viewer', 'Can only read the file'], ['Commenter', 'Can read and add comments'], ['Editor', 'Can change the file']),
        od('Put the steps for sharing a team document safely in order.', ['Upload the document to cloud storage', 'Choose who can access it', 'Set their permission (viewer, commenter or editor)', 'Send them the link']),
        ck('Practise collaborating.', ['Share a document with a friend as a commenter', 'Ask them to leave one comment and one suggestion', 'Check the version history to see the changes'])]),
      L('Privacy, security and your digital footprint', `Your **digital footprint** is the trail of data you leave online. Employers and schools can see public posts, so think before posting.

Protect yourself:

- use a **password manager** and **long unique passwords**
- turn on **two-step verification (2FA)** for email and social media
- review **privacy settings** and app permissions
- spot **phishing**: urgent language, strange sender addresses, links that do not match, requests for passwords or money
- keep software **updated** and **back up** important files`, [
        mc('Which message is most likely phishing?', ['"URGENT: your account is locked, send your password now"', '"Your class starts at 4 pm tomorrow"', '"Here are the notes you asked for"', '"See you at the library"'], 0),
        mt('Match each habit to the risk it reduces.', ['Two-step verification', 'Someone guessing or stealing your password'], ['Software updates', 'Attackers using known weaknesses'], ['Backups', 'Losing files'], ['Privacy settings', 'Strangers seeing your personal posts']),
        tf('Everything you post publicly can be seen by people you do not know.', true)]),
      L('AI and automation literacy', `**AI tools** can draft text, explain ideas and summarise. A fluent user:

- gives clear **prompts**: a role, a task, context and a format
- **checks** the answer, because AI can be confidently wrong
- never shares passwords or private details with a chatbot
- knows AI can be **biased** and should be used honestly, saying when you used it

**Automation** means setting rules so tasks happen by themselves, such as an email rule that moves newsletters to a folder, or a calendar reminder. Even simple automation saves hours.`, [
        mt('Match each good AI habit to why it matters.', ['Check important answers', 'AI can be wrong'], ['Do not share private details', 'Your data may be stored'], ['Say when you used AI', 'It keeps your work honest']),
        mc('Which is an example of automation?', ['An email rule that moves newsletters to a folder', 'Typing every email by hand', 'Printing a document', 'Switching off the computer'], 0),
        ck('Practise prompting.', ['Write a prompt with a role, a task, context and a format', 'Try it in an AI tool such as the STCA AI Tutor', 'Check the answer against a reliable source'])]),
      L('Capstone: your digital citizenship and portfolio', `A **digital citizen** behaves with respect, honesty and care online. That includes crediting sources and respecting **copyright**. **Creative Commons (CC)** licences tell you how you may reuse someone's work, usually with **attribution** (credit to the creator).

Finish the course by building your **digital portfolio**: one place that shows who you are and what you can do. For example a one-page profile, a simple CV, or a LinkedIn profile. Include a clear photo or logo, a short introduction, your skills, and 2 or 3 pieces of work.`, [
        mc('A picture has a Creative Commons licence that requires attribution. What must you do?', ['Credit the creator', 'Pay a fee', 'Remove the licence', 'Claim you made it'], 0), tf('You may always copy any image from the internet without checking its licence.', false),
        ck('Build your digital portfolio.', ['Write a 3-sentence introduction about yourself', 'List five skills you can show', 'Add two examples of your work (a document, a chart, a project)', 'Check every image and quote is credited', 'Ask a friend to review it and suggest one improvement'])])),
  ]),
  exam: [
    mc('Which pillar covers keeping your data and reputation safe?', ['Protect', 'Find', 'Create', 'Compete'], 0), mc('What does putting words in quotation marks do in a search?', ['Finds the exact phrase', 'Removes the words', 'Translates the words', 'Searches images only'], 0), mc('In SIFT, the first step is to…', ['Stop', 'Share', 'Search', 'Save'], 0),
    fl('A1 holds 40. What does =IF(A1>=50,"Pass","Fail") show?', 'Fail'), fl('Cells hold 10, 20 and 30. What does =AVERAGE show?', '20'), fl('Sales rose from 400 to 500. What is the percentage change? (number)', '25'),
    tf('A chart axis that does not start at zero can mislead readers.', true), mc('Which permission lets someone read and comment but not change a file?', ['Commenter', 'Viewer', 'Editor', 'Owner'], 0), mc('What should you turn on to protect your email account?', ['Two-step verification', 'Auto-share', 'Public profile', 'Location sharing'], 0),
    tf('AI answers should always be checked because AI can be confidently wrong.', true), mc('A picture is licensed Creative Commons with attribution. You must…', ['Credit the creator', 'Pay a fee', 'Hide the source', 'Edit the licence'], 0), mc('Which is a sign of a phishing message?', ['Urgent language asking for your password', 'A message from a known friend about homework', 'A class timetable', 'A polite greeting'], 0)],
}
