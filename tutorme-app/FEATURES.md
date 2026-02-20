# TutorMekimi — Course Builder Feature Guide

> **Who is this for?** Tutors and administrators who want to understand every feature available in the Course Builder — no technical background needed. Each section explains what the feature does, why it's useful, and walks through exactly how to use it.

---

## Table of Contents

1. [Course Builder Overview](#1-course-builder-overview)
2. [Creating Tasks, Homework & Quizzes](#2-creating-tasks-homework--quizzes)
3. [Question Editor](#3-question-editor)
4. [AI Question Import](#4-ai-question-import)
5. [Preview as Student](#5-preview-as-student)
6. [Lesson & Module Preview](#6-lesson--module-preview)
7. [Publish & Assign to Students](#7-publish--assign-to-students)
8. [Task List Page](#8-task-list-page)
9. [Time Limit & Due Date Enforcement](#9-time-limit--due-date-enforcement)
10. [Attempt Limits (Retry Control)](#10-attempt-limits-retry-control)
11. [Student Notifications](#11-student-notifications)
12. [Task Analytics Dashboard](#12-task-analytics-dashboard)
13. [Batch-Level Analytics Filter](#13-batch-level-analytics-filter)
14. [Per-Student Report & PDF Export](#14-per-student-report--pdf-export)
15. [Automatic Performance Tracking](#15-automatic-performance-tracking)
16. [XP & Gamification](#16-xp--gamification)
17. [AI Grading for Written Answers](#17-ai-grading-for-written-answers)
18. [One-Step Database Setup](#18-one-step-database-setup)

---

## 1. Course Builder Overview

The **Course Builder** is the central workspace where tutors design their entire curriculum — modules, lessons, tasks, homework, and quizzes — all in one place.

Think of it like a digital lesson planner:
- The **left panel** shows your course tree (modules → lessons → items inside each lesson).
- The **center panel** shows a detailed preview of whatever you click on.
- The **right panel** is where you edit details or build questions.

### How to access it
1. Log in as a tutor.
2. Go to **My Courses** from the sidebar.
3. Click on any course → click **Open Builder**.

---

## 2. Creating Tasks, Homework & Quizzes

Every lesson can have three types of assessed items:

| Type | When to use |
|------|------------|
| **Task** | In-class or practice exercises — usually done during the lesson |
| **Homework** | Work students complete between lessons, often with a due date |
| **Quiz** | Timed assessments with a pass/fail score, often with a strict time limit |

### How to create one
1. In the Course Builder, expand a **Module** in the left panel.
2. Click on a **Lesson**.
3. Inside the lesson editor (right panel), scroll down to **Tasks**, **Homework**, or **Quizzes**.
4. Click **+ Add Task** (or Homework / Quiz).
5. Fill in the title, description, and settings.
6. Click **Save**.

> **Example:** For a lesson called "Introduction to Fractions", you might create:
> - A **Task** called "Fraction Matching" for use during the lesson.
> - A **Homework** called "Fraction Practice Sheet" due Friday.
> - A **Quiz** called "Fractions Quiz" with a 15-minute time limit.

---

## 3. Question Editor

The **Question Editor** is the tool you use to write the actual questions inside any task, homework, or quiz. It supports four question types:

| Type | Description | Example |
|------|-------------|---------|
| **Multiple Choice (MCQ)** | Student picks one answer from a list of options | "Which planet is closest to the sun? A) Earth  B) Mercury  C) Mars" |
| **True / False** | Student picks True or False | "The Earth is flat. True / False" |
| **Short Answer** | Student types a brief response | "What is 7 × 8?" |
| **Essay** | Student writes a longer response | "Explain the causes of World War I in your own words." |

### How to use it
1. When editing a task/homework/quiz, click the **Questions** tab.
2. Click one of the **+ Multiple Choice**, **+ True / False**, **+ Short Answer**, or **+ Essay** buttons at the bottom.
3. Type your question in the text box.
4. **For MCQ:** type each answer option, then click the circular button next to the correct answer to mark it green (✓).
5. **For True / False:** click either "True" or "False" to mark which is correct.
6. **For Short Answer:** type the expected correct answer in the "Expected Answer" box.
7. Add an **Explanation** (optional but recommended) — this is shown to students after grading so they understand why an answer was right or wrong.
8. Set the **Points** value for each question.
9. Click **Preview** (top right of the Question Editor) to see exactly what students will see.
10. Use the **↑ ↓ arrows** to reorder questions, or click the **copy icon** to duplicate a question.

> **Tip:** You can mix question types in a single quiz. For example: 5 MCQ questions worth 2 points each + 1 essay worth 10 points = 20 points total.

---

## 4. AI Question Import

Don't want to write questions from scratch? The **AI Import** feature generates questions automatically based on any topic you type.

### How to use it
1. Inside the Question Editor, click **AI Import** (top right, wand icon ✨).
2. A small panel appears. Type your topic — e.g. `"The Water Cycle"` or `"Quadratic Equations"`.
3. Click **Generate**.
4. The AI creates 5 questions (multiple choice and short answer) and adds them directly to your question list.
5. Review each question, adjust wording if needed, mark correct answers, and set points.

> **Example:** Topic: `"Photosynthesis"` → AI might generate:
> - "What gas do plants absorb during photosynthesis?" (Short Answer)
> - "Which organelle is responsible for photosynthesis?" (MCQ with 4 options)

> ⚠️ **Always review AI-generated questions for accuracy before assigning to students.** They are a helpful starting point, not a finished product.

---

## 5. Preview as Student

Before assigning anything to students, you can experience the quiz exactly as a student would — question by question, with live answer selection and a results screen at the end.

### How to use it
1. In the Course Builder, click on any **Task**, **Homework**, or **Quiz** in the left panel.
2. The center panel shows a preview card for that item.
3. Click the **"Preview as Student"** button (eye icon 👁).
4. A full-screen modal opens — work through each question as if you were a student.
5. Use **Next / Previous** to navigate between questions.
6. Click **Finish** to see a results screen showing which questions were correct/incorrect.
7. Click **Close Preview** when done.

> 💡 **This does not save any results** — it is purely for your review. No submission is recorded anywhere.

---

## 6. Lesson & Module Preview

Clicking on a **Lesson** or **Module** in the left panel now shows a rich overview in the center panel instead of a blank space.

### What you see for a Lesson
- Lesson title and whether it's published or still in draft
- Duration (in minutes)
- Number of tasks, homework assignments, and quizzes inside
- List of all content items (videos, documents, readings, etc.)
- Any prerequisite lessons students must complete first

### What you see for a Module
- Module title and description
- Number of lessons inside it
- Number of module-level quizzes
- Total count of all assignable items across all lessons

This gives you a quick high-level view of your course structure without opening every single item.

---

## 7. Publish & Assign to Students

When you're happy with a task, homework, or quiz, you can **Publish & Assign** it directly from the center panel. Publishing means students can now see and complete it.

### How to use it
1. Click on any task/homework/quiz in the left panel.
2. In the center panel, click the **"Publish & Assign"** button (send icon →).
3. The system will:
   - Convert the draft item into a real live assignment.
   - Assign it to **all students enrolled in the course**.
   - Send a **notification** to every student letting them know a new assignment is waiting.
4. A green success message confirms how many students were assigned.

> **What if I only want to assign to one group?** Use the Task List page to publish with a specific batch filter (see Section 8 and 13).

> **Can I publish multiple items at once?** Yes — use the **Task List page** to publish drafts in bulk.

---

## 8. Task List Page

The **Task List** gives you a bird's-eye view of every task, homework, and quiz for a course — all in one organised table.

### How to access it
```
My Courses → [Course Name] → Tasks tab
```

### What the table shows
For each item:

| Column | Meaning |
|--------|---------|
| **Title** | Name of the task and its type (quiz / assignment) |
| **Status** | Draft (not assigned yet) or Assigned (students can see it) |
| **Difficulty** | Easy, Medium, or Hard |
| **Submissions** | e.g. "12 / 20" (12 students submitted out of 20 assigned) |
| **Completion Rate** | Percentage who completed it |
| **Average Score** | Class average so far |
| **Created** | When you created it |

### Actions you can take
- 🟢 **Publish** — assign a draft to all students with one click
- 📊 **Analytics** — view the detailed analytics dashboard for that item
- 🗑 **Delete** — permanently remove the task (cannot be undone)

> **Example:** You created 8 quizzes. The Task List shows 3 are drafts, 5 are assigned, and one quiz has an average score of 42% — that's a red flag to investigate in Analytics.

---

## 9. Time Limit & Due Date Enforcement

You can set time limits and due dates on any quiz or task. As a tutor, **you choose whether these limits are strictly enforced or merely advisory** — giving you full flexibility.

### The four settings

| Setting | Effect |
|---------|--------|
| **Time Limit (advisory)** | Student sees a countdown timer but can submit after time runs out |
| **Enforce Time Limit: ON** | Submission is automatically **rejected** if the student goes over the time limit (a 5% grace buffer is applied automatically) |
| **Due Date (advisory)** | Student sees the due date but can still submit late |
| **Enforce Due Date: ON** | Submissions after the due date are automatically **rejected** |

### How to set them
When filling in the settings tab for a quiz or homework:
1. Enter a **Time Limit** in minutes (or leave blank for no limit).
2. Toggle **"Enforce Time Limit"** on or off.
3. Pick a **Due Date** from the date/time picker.
4. Toggle **"Enforce Due Date"** on or off.

> **Example (Exam):** 45-minute quiz, Enforce Time Limit: **ON**, Due Date: Friday 5pm, Enforce Due Date: **ON**. Strict exam conditions.

> **Example (Homework):** Homework due Sunday, Enforce Due Date: **OFF**. Late students can still submit but you can see who was late.

---

## 10. Attempt Limits (Retry Control)

You control how many times a student can submit a quiz or task. This supports both strict exams and open practice.

### How it works
- **Default:** 1 attempt (one-shot, no retries — standard exam behaviour).
- **Set Max Attempts** to any number in the task settings.
- If a student hits their limit and tries again, they'll see a clear message: *"Maximum attempts reached."*
- On a retry (within their limit), the student's **latest submission replaces their previous one** and their score is updated.

> **Example — Practice Quiz:** Set Max Attempts to **Unlimited** (or a high number like 10). Students can retry after reviewing their mistakes, building confidence through repetition.

> **Example — Final Exam:** Set Max Attempts to **1**. One shot, no second chances.

---

## 11. Student Notifications

Every time you publish and assign a task, **every assigned student automatically receives a notification** inside the app — no manual action needed.

### What students receive
- **Title:** "New Assignment" (or "3 New Assignments" if you publish multiple at once)
- **Message:** "You have a new assignment: [Task Name]"
- **Link:** Tapping the notification takes the student directly to their Assignments page

Notifications appear in the student's **notification bell** (🔔 top right corner of the app).

> **You don't need to do anything extra.** Notifications fire automatically the moment you click Publish & Assign.

---

## 12. Task Analytics Dashboard

After students submit, you can view detailed analytics for any task — understand exactly how the class performed, which questions tripped them up, and who needs extra help.

### How to access it
```
My Courses → [Course] → Tasks → click "Analytics" next to any task
```

### What's inside

#### 📊 Overview Tab
- **Average Score** — class mean across all submissions
- **Completion Rate** — percentage of students who submitted
- **Score Distribution Chart** — bar chart showing how many students scored in each band (0–20%, 20–40%, etc.)
- **Answer Accuracy Pie Chart** — overall split of correct vs. incorrect answers

#### ❓ Per-Question Tab
- A bar chart showing each question's **correct rate** (what % of students got it right)
- 🚩 **Red flags** — questions where more than 60% of students answered incorrectly are highlighted, with a note: *"Consider re-teaching this topic"*
- Expandable detail cards showing the **most common wrong answers** — revealing exactly what students are misunderstanding

#### 👥 Students Tab
- A sortable table listing every student's score
- Click any student's name to jump to their full individual report

> **Example:** Your Algebra quiz shows Question 4 ("Solving for X using division") was only answered correctly by 28% of students. The most common wrong answer used subtraction. This tells you the whole class needs a targeted lesson on that specific step.

---

## 13. Batch-Level Analytics Filter

If you run the same course with multiple groups (e.g. "Morning Batch" and "Evening Batch"), you can filter the analytics to see how a **specific group** performed — side by side if you wish.

### How to use it
1. Open any Task Analytics page.
2. Find the **"Filter by Batch"** dropdown near the top.
3. Select the batch you want to view.
4. All charts, stats, and the student table instantly update to show only that group.

> **Example:** You teach the same Maths course to two groups. Batch A averaged 78% on the fractions quiz; Batch B averaged 54%. Batch B needs extra support before moving to the next topic.

---

## 14. Per-Student Report & PDF Export

Every student has a detailed individual performance report summarising their progress across all tasks in a course.

### How to access it
```
Dashboard → Students → click a student's name → View Report
```
Or from the Analytics dashboard → **Students tab** → click any name.

### What the report shows
- **Overall average score** across all tasks
- **Performance trend** over time (improving / stable / declining)
- **Strengths** — topics and question types they consistently excel at
- **Weaknesses** — topics they consistently struggle with (scoring below 50%)
- **Common Mistakes** — specific patterns detected in their wrong answers
- **Task-by-task breakdown** — individual score and time taken for every quiz/homework

### Exporting as a PDF
1. Open the student's report page.
2. Click **"Export PDF"** (top right corner).
3. A clean, print-ready version opens in a new browser tab.
4. Press **Ctrl+P** (Windows) or **Cmd+P** (Mac) → set destination to **"Save as PDF"**.
5. Save the file — it's named with the student's name and today's date.

> **Example:** At the end of term, export PDF reports for all students to email to parents as a formal progress summary, or attach to report cards.

---

## 15. Automatic Performance Tracking

Every time a student submits a task, their performance profile updates **automatically in the background**. You never need to manually update any scores or records.

### What gets updated automatically

| What updates | What it means |
|--------------|--------------|
| **Average Score** | Rolling average across all their submissions |
| **Completion Rate** | % of assigned tasks they've finished |
| **Strengths** | Topics where they score above 80% consistently |
| **Weaknesses** | Topics where they score below 50% consistently |
| **Common Mistakes** | Wrong answer patterns detected across multiple submissions |
| **Lesson Progress** | If a lesson-linked task is passed (score ≥ 70%), the lesson is automatically marked **Completed** |

This data powers the student report, the analytics dashboard, and (in future) personalised learning recommendations.

---

## 16. XP & Gamification

Students earn **Experience Points (XP)** every time they submit a task. XP accumulates over time to increase their **level** — creating a motivating, game-like progression system that rewards effort and achievement.

### How XP is calculated

The XP formula rewards both effort (longer quizzes) and performance (higher scores on harder tasks):

```
XP = (10 × number of questions) × score bonus × difficulty bonus
```

**Score bonus:**
| Score | Bonus |
|-------|-------|
| 90% or above | 1.5× |
| 70% – 89% | 1.2× |
| 50% – 69% | 1.0× |
| Below 50% | 0.5× |

**Difficulty bonus:**
| Difficulty | Bonus |
|------------|-------|
| Hard | 1.5× |
| Medium | 1.2× |
| Easy | 1.0× |

**Levelling up:** Every **1,000 XP = 1 level**. The system automatically tracks and upgrades the student's level.

> **Example:** A student scores 85% on a medium-difficulty 10-question quiz:
> Base = 10 × 10 = 100 XP
> Score bonus (85%) = × 1.2
> Difficulty (medium) = × 1.2
> **Total = 144 XP earned**

---

## 17. AI Grading for Written Answers

Multiple Choice and True/False questions are graded instantly and exactly. But Short Answer and Essay questions require understanding — so the system uses **AI to assess written responses**.

### How it works
1. A student submits a short answer or essay.
2. The AI reads their response alongside the expected answer (or rubric you provided).
3. Within seconds, the AI produces:
   - A **score**
   - **Feedback** — specific comments on what was good and what was missing
   - **Suggestions** — concrete advice for improvement
4. The AI grade is saved. You can review it and override it before it's finalised.

### When you should manually review AI grades
- For **high-stakes assessments** (final exams, important coursework).
- When a student **disputes their grade**.
- For highly **subjective essay topics** where the AI may not fully grasp the nuance.

> ⚠️ The AI is a helpful first pass, not a replacement for your professional judgement.

---

## 18. One-Step Database Setup

> **For the person who manages the server or app installation only.** Tutors can skip this section entirely.

After these updates, one database migration is needed to activate the new enforcement and attempt-limit fields. Run this command once from the project folder in a terminal:

```bash
npx prisma migrate dev --name add-enforcement-fields
```

This takes about 10–15 seconds, requires no downtime, and is a one-time-only step.

---

## Quick Reference — Where to Find Everything

| What you want to do | Where to go |
|---------------------|------------|
| Build a quiz with questions | Course Builder → Lesson → Quizzes → + Add Quiz |
| Generate questions with AI | Question Editor → AI Import button (✨) |
| Experience the quiz as a student | Course Builder → click item → Preview as Student (👁) |
| Assign a quiz to your class | Course Builder → click item → Publish & Assign (→) |
| See all tasks for a course | My Courses → [Course] → Tasks tab |
| See how the whole class performed | Tasks tab → click Analytics next to any task |
| Filter analytics to one group | Task Analytics page → Filter by Batch dropdown |
| See one student's full history | Students → click student name → View Report |
| Export a student's report as PDF | Student Report page → Export PDF button |
| Find which questions were hardest | Task Analytics → Per-Question tab (look for 🚩 flags) |

---

## Frequently Asked Questions

**Q: Can I edit a quiz after publishing it?**
A: Yes, but changes won't affect students who already submitted. It's best to finalise questions before publishing.

**Q: What happens if a student loses internet during a timed quiz?**
A: If time limit enforcement is on, their submission will be rejected if they reconnect after the limit has passed. For lower-stakes quizzes, keep enforcement **off** to avoid penalising students for connection issues.

**Q: Can students see their score and feedback immediately after submitting?**
A: Yes — MCQ and True/False scores are shown instantly. Written answer scores appear once AI grading completes (usually within seconds).

**Q: Can I use the same quiz for two different courses?**
A: Duplicate the item using the Duplicate button in the center panel, then adjust as needed. Cross-course templates are on the roadmap.

**Q: Will students know if I change the due date after publishing?**
A: Currently, notifications fire only when a task is first assigned. A "notify students of changes" feature is planned for a future update.

**Q: What does "Draft" status mean on the Task List?**
A: The task exists but hasn't been assigned to students yet. Students cannot see it until you click Publish.

**Q: Can I assign a task to just one student?**
A: Currently the system assigns to all enrolled students (or all in a batch). Targeted individual assignment is on the roadmap.

---

*Last updated: February 2026 — TutorMekimi Course Builder v2.0*
