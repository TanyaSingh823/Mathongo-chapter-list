# MathonGo Chapter List - JEE PYQ Management System

A modern, responsive web application for managing JEE (Joint Entrance Examination) Previous Year Questions (PYQs) built with Next.js, TypeScript, and Tailwind CSS.

## ✨ Features

- **Subject Navigation**: Switch between Physics, Chemistry, and Mathematics
- **Advanced Filtering**: Filter by Class, Units, Status, and Weak Chapters
- **Smart Sorting**: Sort chapters alphabetically (A-Z or Z-A)
- **Progress Tracking**: Visual progress bars and completion statistics
- **Responsive Design**: Optimized for mobile, tablet, and desktop
- **Dark Mode Support**: System-preferred theme with manual toggle
- **Real-time Counts**: Dynamic chapter counts based on active filters

## 🛠 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Phosphor Icons & Lucide React
- **State Management**: Redux Toolkit

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone <your-repo-url>
   cd mathongo-chapter-list
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Run the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

\`\`\`bash
npm run build
npm start
\`\`\`

## 📱 Key Features

### Chapter Management
- View chapters organized by subject (Physics, Chemistry, Mathematics)
- Track progress with visual indicators
- Identify weak chapters that need more attention
- Monitor year-wise question trends (2024 vs 2025)

### Filtering & Sorting
- Filter by class (Class 11, Class 12)
- Filter by units within each subject
- Quick filters for "Not Started" and "Weak Chapters"
- Sort chapters alphabetically in ascending or descending order

### Responsive Design
- **Mobile**: Collapsible filter sheet, compact subject tabs
- **Desktop**: Sidebar filter panel, multi-column layouts
- **Touch-friendly**: Optimized for mobile interactions

### Dark Mode
- Automatic system preference detection
- Manual toggle in header
- Smooth theme transitions

## 🎯 Usage

1. **Select Subject**: Click on Physics, Chemistry, or Mathematics tabs
2. **Apply Filters**: Use the filter controls to narrow down chapters
3. **Sort Results**: Toggle between A-Z and Z-A sorting
4. **Track Progress**: View completion status and progress bars
5. **Identify Weak Areas**: Use "Weak Chapters" filter to focus on challenging topics

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect repository to Vercel
3. Deploy automatically

### Other Platforms
1. Run `npm run build`
2. Deploy the `out` folder to your hosting provider

## 📊 Data Structure

The application uses mock data with the following structure:
- **Subjects**: Physics, Chemistry, Mathematics
- **Classes**: Class 11, Class 12
- **Units**: Subject-specific units (e.g., Mechanics, Algebra)
- **Status**: Not Started, In Progress, Completed
- **Year-wise Data**: Question counts from 2019-2025
