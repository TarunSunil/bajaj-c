# Doctor Listing Application

A modern web application for listing and filtering doctors, built with Next.js, TypeScript, and Tailwind CSS.

## Features

- Autocomplete search for doctor names
- Filter doctors by:
  - Consultation type (Video/In-clinic)
  - Specialties (Multiple selection)
- Sort doctors by:
  - Fees (Low to High)
  - Experience
- Responsive design
- URL-based filtering (filters persist in URL)

## Prerequisites

- Node.js 18+ and npm

## Getting Started

1. Clone the repository:
```bash
git clone <repository-url>
cd doctor-listing
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/
│   ├── layout.tsx       # Root layout
│   ├── page.tsx        # Main page component
│   └── globals.css     # Global styles
├── components/
│   ├── DoctorCard.tsx  # Doctor card component
│   ├── FilterPanel.tsx # Filters component
│   └── SearchBar.tsx   # Search component
├── services/
│   └── api.ts         # API service
└── types/
    └── doctor.ts      # TypeScript types
```

## API

The application fetches doctor data from:
```
https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json
```

## Built With

- [Next.js](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [React Query](https://tanstack.com/query/latest) - Data fetching 