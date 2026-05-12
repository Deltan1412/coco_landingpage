export type WeekTone = 'paper' | 'lime' | 'dark';

export interface RoadmapWeek {
  n: string;
  label: string;
  title: string;
  sub: string;
  desc: string;
  deliverable: string;
  tone: WeekTone;
}

export const ROADMAP: RoadmapWeek[] = [
  {
    n: '01',
    label: 'Week 1',
    title: 'Prompting techniques',
    sub: 'From idea to MVP',
    desc: 'Learn how to talk to AI like a builder, not a tourist. Structure prompts that turn rough ideas into working drafts.',
    deliverable: '↪ Your first MVP prompt',
    tone: 'paper',
  },
  {
    n: '02',
    label: 'Week 2',
    title: 'Fundamentals',
    sub: 'Advantages & limitations of AI',
    desc: "Know when AI is the right tool, and when it isn't. Build mental models that age well as the tools change.",
    deliverable: '↪ Working knowledge map',
    tone: 'lime',
  },
  {
    n: '03',
    label: 'Week 3',
    title: 'MVP + AI Agents',
    sub: 'Give your AI tools to work with',
    desc: 'Connect your AI to spreadsheets, emails and APIs. Move from chatbot to coworker that actually does the task.',
    deliverable: '↪ A small, working agent',
    tone: 'dark',
  },
  {
    n: '04',
    label: 'Week 4',
    title: 'Ship your project',
    sub: 'Your first personal, functional product',
    desc: 'Polish, test and demo your build to the cohort. Walk away with one real thing you made, and the muscle to make the next one.',
    deliverable: '↪ Demo day',
    tone: 'paper',
  },
];
