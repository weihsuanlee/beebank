# BeeBank Dashboard 🐝

A modern banking web application built with **Next.js 15**, **TypeScript**, and **Strapi CMS**. This project demonstrates a full-stack banking dashboard with secure user authentication, efficient account management, and a comprehensive transaction history.

---

## 🎯 Project Approach

### Frontend Architecture 🚀

- **Next.js 15** with App Router for server-side rendering (SSR) and optimized client-side navigation.
- **TypeScript** for robust type safety and an enhanced developer experience.
- **Material-UI** selectively used for complex components (forms, dialogs, date pickers) with custom wrapper components for flexibility.
- **React Hook Form** for lightweight, high-performance form validation with minimal re-renders.
- **Server Components** for improved initial load performance and reduced client-side JavaScript.
- **`classnames`** utility for elegantly managing conditional CSS classes.
- **Responsive Web Design (RWD)** implemented with a mobile-first approach, ensuring a great experience across all devices.

### Backend & Data 🗄️

- **Strapi CMS** serves as the headless backend for streamlined user management, account handling, and transaction data.
- **RESTful API** endpoints facilitate all data operations, ensuring clear communication between frontend and backend.
- **JWT authentication** provides secure user sessions, protecting sensitive financial data.
- **Deployed backend** on Strapi Cloud ensures a seamless and stable environment for frontend development and demonstration.

### Design System 🎨

- **Material-UI** is utilized for its robust, pre-built components like forms, dialogs, and date pickers.
- **Custom wrapper components** abstract Material-UI dependencies, offering crucial flexibility for potential future migrations to an in-house UI library.
- **Custom SCSS components** are crafted for simpler UI elements such as buttons, cards, and layouts, allowing for bespoke styling.
- **Responsive design** with a mobile-first philosophy guarantees an adaptive and consistent look and feel across various screen sizes.
- **Accessibility (A11y)** considerations are baked in with proper ARIA labels and keyboard navigation, ensuring the application is usable by everyone.

### Navigation & Performance ⚡

- **Server-side rendering (SSR)** with Next.js 15 App Router delivers optimal initial page load performance and SEO benefits.
- **Server Components** minimize client-side JavaScript bundle sizes, leading to faster loading times and improved performance.
- **Client-side routing** provides smooth and instant navigation between different sections of the dashboard.
- **Infinite scroll** with a "load more" functionality enhances the user experience for Browse extensive transaction history without performance bottlenecks.
- **Loading states** and error boundaries are implemented to provide clear user feedback and graceful degradation during data fetching or unexpected issues.

---

## 🚀 How to Run Locally

### Prerequisites

- Node.js 18+
- npm or yarn
- Git

### Frontend Only

Since the backend is already deployed on Strapi Cloud, you only need to set up and run the frontend:

```bash
# Install dependencies
npm install

# Start Next.js development server
npm run dev

# Application will be available at http://localhost:3000
```

---

## 🏗️ Project Structure

```
beebank/
├── src/
│   ├── app/                    # Next.js App Router routes
│   │   ├── dashboard/          # Dashboard page and layout
│   │   └── login/              # Login page
│   ├── components/             # Reusable UI components (client)
│   ├── configs/                # Application-wide configurations
│   │   ├── styles/             # Global style configurations
│   │   ├── font.config.ts      # Font settings
│   │   └── mui-theme.config.ts # Material-UI theme customization
│   ├── contexts/               # React Context API providers
│   ├── features/               # Feature-specific modules (can contain client/server components)
│   │   ├── dashboard/          # Components specific to the dashboard feature
│   │   └── login/              # Components specific to the login feature
│   ├── lib/                    # Core utilities and server-side logic
│   │   ├── api.ts              # Server Actions for data access (GET/POST accounts/transactions)
│   │   ├── strapi.ts           # Strapi API client setup and DTOs
│   │   ├── authActions.ts      # Server Actions for authentication (login, register, logout)
│   │   └── authUtils.ts        # Server-side utility to get token from HttpOnly cookies
│   └── types/                  # Centralized TypeScript type definitions
```

---

## 🎨 Key Features

### Authentication 🔐

- **Secure Login/Register** with email and password.
- **Protected routes** implemented with Next.js middleware, ensuring only authenticated users access sensitive areas.

### Dashboard 📊

- **Account overview** displaying current and savings accounts with their balances.
- **Comprehensive transaction history** featuring infinite scroll and "load more" functionality for efficient Browse.
- **Fully responsive design** optimized for both mobile and desktop experiences.

### Transaction Management 💸

- **Intuitive "Add new transactions" form** with robust validation powered by React Hook Form.
- **Seamless transfers** between a user's current and savings accounts.
- **Flexible transaction filtering** by date range, amount range, and categories (future enhancement).
- **Infinite scroll pagination** provides smooth, performant loading of transaction data.
- **"Load more" pagination** offers an additional, user-controlled method for Browse extensive history.

---

## 🔧 Technical Decisions & Tradeoffs

### Backend Choice

**Decision**: Strapi CMS instead of a custom Express API.

- **Rationale**: Enabled rapid development with built-in admin panel, authentication, and content management. Ideal for an MVP and technical demonstration.
- **Tradeoff**: Offers less ultimate flexibility than a fully custom API but significantly accelerated development and deployment.

### Form Validation

**Decision**: React Hook Form instead of Formik or native validation.

- **Rationale**: Delivers a lightweight bundle size (\~25kb vs \~100kb for Formik), ensures excellent performance with fewer re-renders, and boasts great TypeScript support.
- **Tradeoff**: Has fewer ecosystem plugins compared to Formik, but proved more than sufficient for the project's current requirements.

### UI Component Strategy

**Decision**: Hybrid approach using Material-UI for complex components and custom SCSS for simpler ones.

- **Rationale**: Material-UI provides robust components (forms, dialogs, date pickers) with inherent accessibility, while custom wrappers (Menu, Skeleton, LetterAvatar) prevent tight coupling and facilitate future migration to an in-house UI library.
- **Tradeoff**: Introduces an additional abstraction layer but offers superior flexibility for future UI library changes, balancing development speed with customization needs.

### State Management

**Decision**: React Context and Server Components instead of external state management libraries (e.g., Redux).

- **Rationale**: Server Components drastically reduce client-side JavaScript, and React Context is fully sufficient for the application's current complexity. This approach maintains a simpler architecture.
- **Tradeoff**: Provides less sophisticated caching compared to specialized solutions like React Query but results in a significantly simpler overall architecture.

### Pagination Strategy

**Decision**: Infinite scroll with a loading spinner.

- **Rationale**: Offers a superior user experience, especially on mobile devices, by reducing initial load times and providing a seamless Browse experience.
- **Tradeoff**: Requires a more complex implementation but yields notable improvements in both performance and user experience.

### Navigation Strategy

**Decision**: Server-side rendering (SSR) for initial loads, client-side routing for subsequent navigation.

- **Rationale**: Ensures optimal initial load performance with SSR and provides smooth, instantaneous navigation between dashboard sections, alongside improved SEO.
- **Tradeoff**: Involves a more complex initial setup but ultimately delivers a significantly better user experience.

### Error Handling

**Decision**: Basic console logging for development, and a general Error Boundary for production.

- **Rationale**: Given the project's time constraints, implementing comprehensive error logging (e.g., Sentry, LogRocket) was deemed beyond the scope for this assignment.
- **Tradeoff**: Offers basic error handling, which is sufficient for demonstration purposes, but would need scaling for a production environment.

### Next.js API Routes

**Decision**: Not utilizing Next.js API routes; direct Strapi integration.

- **Rationale**: Strapi provides all necessary backend functionality, making Next.js API routes an unnecessary layer of complexity for this project's requirements.
- **Tradeoff**: Results in fewer server-side data transformations, but maintains a cleaner separation of concerns between the frontend and the external CMS backend.

---

## ⏱️ Time Breakdown

- **Strapi Setup & Configuration**: 1 hour ⚙️
- **Frontend Development**: 2.5 hours 💻
  - Project setup: 0.5 hour
  - Authentication integration: 0.5 hour
  - UI components & design: 1.5 hours
- **README Documentation**: 20 minutes 📄
- **Total**: \~4 hours ⏰

---

## 🔮 Future Enhancements

If given more time, I would implement:

- **Error logging** with Sentry or similar service to capture and monitor exceptions in real-time. 🐛
- **Unit tests** with Jest and React Testing Library to ensure individual components and functions are robust. ✅
- **End-to-End (E2E) tests** with Playwright/Cypress to validate critical user flows across the entire application. 🧪
- **PWA features** for offline functionality and an enhanced native-app-like experience. 📱
- **Real-time updates in balance and transactions** using WebSockets, ensuring the UI reflects changes instantly as they occur in the backend. 🔄
- **Advanced filtering** with additional options like transaction categories for more granular data analysis. 🔍
- **Data visualization** with charts and graphs to provide insightful overviews of financial trends. 📈
- **Real-time notifications** with WebSockets for instant alerts on new transactions or important account activities. 🔔
- **Advanced caching** strategies with React Query or SWR for improved data fetching performance and better user experience. 🚀

---

## 📝 Assumptions & Limitations

### Assumptions Made

1.  **Transaction Amount**: A maximum transaction amount of $10,000 is assumed for security and scope.
2.  **Account Types**: Only current and savings accounts are supported in this version.
3.  **Transaction Types**: Transactions are simplified to transfers solely between a user's own current and savings accounts.
4.  **User Authentication**: Basic email/password authentication is considered sufficient for demonstration purposes.
5.  **Data Volume**: The transaction history is not expected to exceed 1000+ items per user, allowing for current pagination strategy.
6.  **Browser Support**: The application targets modern browsers (ES2020+).
7.  **Mobile Usage**: While responsive design is a core requirement, highly specific mobile-only features are not implemented.
8.  **Security**: Basic JWT authentication is deemed sufficient for a demo, with awareness that production applications require more rigorous security audits.

### Known Limitations

1.  **Sender/Receiver List**: Due to time constraints, a comprehensive sender/receiver list for transactions was not implemented; transactions currently demonstrate transfers only between the user's current and savings accounts.
2.  **Balance Updates**: The backend does not automatically adjust account balances upon transaction creation, meaning balance updates currently require a manual refresh.
3.  **Real-time Balance**: Account balances do not update in real-time; instant reflection of changes would be a future enhancement.
4.  **Error Handling**: Only basic error handling is implemented; a production application would necessitate comprehensive error logging and more detailed user feedback for various error states.
