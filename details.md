---
# All site content lives in this file. The front matter (between the --- lines)
# holds the structured data; the text below it is the bio shown at the top of
# the page, one paragraph per block, with [links](https://example.com) allowed.

profile:
  name: "Remiel"
  title: "Remiel — Software Engineer"
  description: "Software engineer building things for the web. Design-obsessed, full-stack, dabbling in ML."
  email: "work.remiel@gmail.com"
  resume: "https://drive.google.com/file/d/1hOtzjtt34a7LyY5NpjGxLxstWhnO4DXI/view"
  socials:
    - label: "github"
      href: "https://github.com/JaswanthRemiel"
    - label: "linkedin"
      href: "https://linkedin.com/in/jaswanthremiel"
    - label: "x"
      href: "https://twitter.com/jaswanthremiel"

projects:
  - title: "lazyfill"
    href: "https://github.com/JaswanthRemiel/lazyfill"
    dates: "November 2026 - Present"
    active: true
    description: "A Chrome extension that fills job applications from your saved profile, tracks every application, and drafts answers to screening questions with your own AI key. Imports your resume, remembers answers, and runs entirely on your own Firebase project, with no central server."
    technologies:
      - "TypeScript"
      - "React"
      - "Vite"
      - "Tailwind CSS"
      - "Firebase"
      - "Chrome Extension"
    links:
      - type: "Source"
        href: "https://github.com/JaswanthRemiel/lazyfill"
        icon: "Github"
    image: "/projects/lazyfill.jpg"
    video: "/videos/lazyfill.mp4"

  - title: "itsGOtime"
    href: "https://github.com/JaswanthRemiel/itsGOtime"
    dates: "November 2025 - Present"
    active: true
    description: "A lightweight, efficient uptime monitoring system built with Go and HTML. Monitor your websites, APIs, and services with automated checks, historical tracking, and a beautiful status page, all powered by GitHub Actions and GitHub Pages."
    technologies:
      - "GO"
      - "Github Actions"
      - "go/context"
      - "io/ioutil"
      - "net/http"
    links:
      - type: "Demo"
        href: "http://github.remiel.in/itsGOtime/"
        icon: "Globe"
      - type: "Source"
        href: "https://github.com/JaswanthRemiel/itsGOtime"
        icon: "Github"
    image: "/projects/itsgotime.jpg"
    video: "/videos/itsgotime.mp4"

  - title: "TrackCode"
    href: "https://github.com/JaswanthRemiel/TrackCode"
    dates: "June 2026 - Present"
    active: true
    description: "TrackCode helps you master LeetCode problems by organizing questions by company, tracking your daily streaks, and generating personalized study plans. With its intuitive interface and smart analytics, you'll be fully prepared for your next technical interview in no time."
    technologies:
      - "Next.js"
      - "Typescript"
      - "Firebase"
      - "Shadcn UI"
    links:
      - type: "Demo"
        href: "https://trackcode.remiel.in/"
        icon: "Globe"
      - type: "Source"
        href: "https://github.com/JaswanthRemiel/TrackCode"
        icon: "Github"
    image: "/projects/trackcode.jpg"
    video: "/videos/trackcode.mp4"

  - title: "NoteOS"
    href: "https://github.com/JaswanthRemiel/NoteOS"
    dates: "Sep 2024 - Feb 2025"
    active: true
    description: "a Notion-like productivity platform featuring draggable content blocks, inline editing, and persistent document storage powered by Appwrite for authentication, file uploads, and real-time state management. "
    technologies:
      - "Next.js"
      - "Typescript"
      - "Appwrite"
      - "OMDB API"
      - "Shadcn UI"
    links:
      - type: "Demo"
        href: "https://notes.remiel.in/"
        icon: "Globe"
      - type: "Source"
        href: "https://github.com/JaswanthRemiel/NoteOS"
        icon: "Github"
    image: "/projects/note.jpg"
    video: "/videos/note.mp4"

  - title: "MediaBar"
    href: "https://marketplace.visualstudio.com/items?itemName=jaswanthremiel.mediabar"
    dates: "Jan 2026 - Present"
    active: true
    description: "Control syste-wide media playback from your VS Code status bar. Works with Spotify, browsers, and any Windows media app."
    technologies:
      - "VScode"
      - "TypeScript"
      - "HTML/CSS"
    links:
      - type: "Website"
        href: "https://marketplace.visualstudio.com/items?itemName=jaswanthremiel.mediabar"
        icon: "Globe"
    image: "/projects/vsmediabar.jpg"
    video: "/videos/vsmediabar.mp4"



# Grouped under a year heading on the Experience tab, newest first.
experience:
  - year: "2025"
    title: "SDE-1"
    company: "NCompass"
    href: ""
    dates: "Present"
    description: "Collaborating with a tight-knit team, blending tech skills with creativity and shipping features that power real business results."
    photos:
      - src: "/experience/ncompass.jpg"
        alt: "At work at NCompass"

  - year: "2025"
    title: "Design Jury"
    company: "Awwwards"
    href: "https://www.awwwards.com/jury-member/jaswanth-remiel"
    dates: "Present"
    description: "Serving as a design jury member, judging websites submitted to Awwwards."
    photos:
      - src: "/experience/awwwards.jpg"
        alt: "Awwwards jury"
      - src: "/experience/awwwards2.jpg"
        alt: "Awwwards event"

  - year: "2024"
    title: "Research & AI Intern"
    company: "Samsung R&D India"
    href: ""
    dates: "Mar 2024"
    description: "Worked on AI research and machine learning implementations alongside the research teams."
    photos: []

  - year: "2024"
    title: "Summer Intern"
    company: "IIT Palakkad Technology IHub Foundation"
    href: ""
    dates: "May 2024"
    description: "Contributed to technology innovation and R&D projects in collaboration with IIT Palakkad."
    photos: []

  - year: "2024"
    title: "Ambassador"
    company: "Microsoft"
    href: ""
    dates: "Early 2024"
    description: "Represented Microsoft technologies and engaged with the developer community."
    photos:
      - src: "/experience/microsoft1.jpg"
        alt: "Microsoft ambassador"
      - src: "/experience/microsoft2.jpg"
        alt: "Microsoft event"

blog:
  - title: "I Judged 100+ Websites for Awwwards. AI is Winning the Wrong Race."
    dates: "Jun 7, 2026"
    image: "/blog/post1.jpg"
    href: "https://medium.com/design-bootcamp/i-judged-100-websites-for-awwwards-ai-is-winning-the-wrong-race-38efd7f3e3cc"
  - title: "How to Become the Software Engineer Your Team Can’t Live Without"
    dates: "May 24, 2026"
    image: "/blog/post2.jpg"
    href: "https://medium.com/design-bootcamp/how-to-become-the-software-engineer-your-team-cant-live-without-31c1684705c9"
  - title: "You won’t believe how easy Machine Learning actually is"
    dates: "May 24, 2026"
    image: "/blog/post3.jpg"
    href: "https://medium.com/design-bootcamp/you-wont-believe-how-easy-machine-learning-actually-is-da6c876ea62b"
  - title: "Stop Calling Yourself a Frontend Developer. It’s Killing Your Career."
    dates: "Aug 25, 2025"
    image: "/blog/post4.jpg"
    href: "https://uxplanet.org/stop-calling-yourself-a-frontend-developer-its-killing-your-career-9e0150196b99"
  - title: "How being a Designer made me a better Backend dev"
    dates: "Aug 6, 2025"
    image: "/blog/post5.jpg"
    href: "https://medium.com/design-bootcamp/how-being-a-designer-made-me-a-better-backend-dev-d41bb3ed0da3"
  - title: "Future-Proof Your Career: A Guide to Breaking Into UX/UI Design in 2023"
    dates: "Mar 7, 2023"
    image: "/blog/post6.jpg"
    href: "https://uxplanet.org/future-proof-your-career-a-guide-to-breaking-into-ux-ui-design-in-2023-6222fa231964"

research:
  - title: "Multimodal Deep Learning: Bridging Text and Image Classification with Advanced Architecture"
    href: ""
    dates: "2025"
    description: "Co-authored a Springer Nature book chapter on multimodal machine learning integrating text and image representations for classification tasks. Designed a hybrid architecture combining transformer-based NLP models and CNN-based image models using feature-level fusion. Implemented and evaluated models using multiple performance metrics including accuracy, precision, recall, and F1-score."
    technologies:
      - "Python"
      - "TensorFlow"
      - "PyTorch"
      - "CNN"
      - "Transformers"
      - "Multimodal Learning"
      - "Machine Learning"
    links: ["https://link.springer.com/chapter/10.1007/978-3-031-96871-6_5"]
    images: []
    image: ""
    video: ""

  - title: "Quantum-AI Enhanced Biosensor for Environmental Toxin Detection"
    href: ""
    dates: "Ongoing"
    description: "Conducting research on AI-driven biosensor frameworks for environmental toxin detection using synthetic data generation and hybrid machine learning models. Developing simulation-based training pipelines to address data scarcity and improve model generalization."
    technologies:
      - "Python"
      - "Machine Learning"
      - "Synthetic Data"
      - "AI Research"
      - "Simulation"
      - "Hybrid ML"
    links: []
    images: []
    image: ""
    video: ""

certifications:
  - issuer: "Google Cloud"
    title: "Associate Cloud Engineer"
    href: "https://www.credly.com/badges/cb559ec6-3f03-45b9-9e19-51399b3dfbf5"
    image: "/badges/gcloud-ace.png"
  - issuer: "Microsoft"
    title: "Azure AI Engineer Associate"
    href: "https://learn.microsoft.com/en-us/users/jaswanthremielag/credentials/42ce423540f3603"
    image: "/badges/ms-azure-ai-engineer.svg"
  - issuer: "Microsoft"
    title: "Azure Fundamentals"
    href: "https://learn.microsoft.com/en-us/users/jaswanthremielag/credentials/958cf5b248cc58bf"
    image: "/badges/ms-azure-fundamentals.svg"
  - issuer: "Microsoft"
    title: "Azure AI Fundamentals"
    href: "https://learn.microsoft.com/en-us/users/jaswanthremielag/credentials/7daaea6acef4ae7a"
    image: "/badges/ms-azure-fundamentals.svg"
  - issuer: "AWS"
    title: "Introduction to Cloud 101"
    href: "https://www.credly.com/badges/4c59eb9e-7873-4283-b9f1-4695305787ee"
    image: "/badges/aws-cloud101.png"
  - issuer: "AWS"
    title: "Machine Learning Foundations"
    href: "https://www.credly.com/badges/f2c5f5a6-f961-4b6e-8679-32ae818727a5"
    image: "/badges/aws-ml.png"
  - issuer: "Meta / Coursera"
    title: "Front-End Developer Certificate"
    href: "https://www.credly.com/badges/f505302d-f3fe-4ebb-8367-e9ff3ba6c8de"
    image: "/badges/meta-frontend.png"
  - issuer: "Google / Coursera"
    title: "UX Design Professional Certificate"
    href: "https://www.credly.com/badges/efeb73cf-3ff1-4bbe-b38c-dd1de62051c8"
    image: "/badges/google-ux.png"
---

I'm a software engineer who's design-obsessed, full-stack, and dabbling in ML. I'm an SDE-1 at NCompass and sit on the design jury at [Awwwards](https://www.awwwards.com/jury-member/jaswanth-remiel).

I previously did AI research at Samsung R&D India and interned at IIT Palakkad's Technology IHub Foundation. Along the way, I co-authored a [Springer Nature chapter](https://link.springer.com/chapter/10.1007/978-3-031-96871-6_5) on multimodal deep learning. These days I build things for the web that sit where engineering meets design.

Curioso? Here's my [résumé](/resume).
