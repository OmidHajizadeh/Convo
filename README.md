# Convo
#### Video Demo : <https://youtu.be/jJJFe_IHRSw>
#### Description: A beautiful SPA chat application created via React and NextJS framework!

This is a robust and efficient chat application developed using Next.js 13, designed to offer seamless real-time communication functionalities leveraging WebSockets. With its progressive web app (PWA) features, users can experience a native app-like interface while enjoying the flexibility of web-based access.

We utilized the versatile Redis database to comprehensively store Convo's data, encompassing messages, friend lists, chats, and more. Additionally, by integrating our app with Cloudinary, users can effortlessly upload new images to personalize their avatars.

Furthermore, we implemented highly secure Route APIs that meticulously validate types and authenticate users sending requests. This stringent process ensures that our app functions as seamlessly and reliably as the most renowned chat messengers in the industry.

## Folder Details
As this is a React-based project, it includes familiar files like `package.json`, `package-lock.json`, and others. Additionally, files such as `tailwind.config.ts` hold configurations for the TailwindCSS library, primarily responsible for our styling and layouts.

The crux of this project lies within the src folder, housing the laid-out source code.

Convo, built with Next.js 13, leverages the recently added App Router feature for its routes. In the `app` folder, the Route APIs, serving as endpoints for receiving requests, reside within the `api` folder. Other routes accessible via the app's sidebar are categorized as normal routes. Most of these routes are sub-routes within the chat folder, utilizing Next.js' Server Components, rendering server-side (SSR). Each route's entry point is located in respective `page.tsx` files, paired with a `loading.tsx` file responsible for displaying a skeleton loader before fully fetching the page from the server. Additionally, each route houses a `_components` folder containing route-specific components, primarily responsible for handling user interactions, such as form submissions.

Adjacent to the app folder, the components folder stores reusable components shared across all our routes.

The utils folder includes several files: `helpers.ts` exports various helper functions utilized across different components, `serverInteractions.ts` exports functions predominantly used for fetching information from our database, and `fetchRedis.ts` exports a function serving two purposes: facilitating general interactions with the Redis database and mitigating Next.js' consistent caching of content.

Within `utils/subscribers`, five subscriber components exist. Although they don't render content within our app, they orchestrate real-time functionalities by establishing connections with our `Pusher` service, notifying users of new updates. These subscriber components are utilized within the `app/layout.tsx` file and persist throughout the app's lifecycle, remaining mounted after initialization.

Lastly, the `public` folder hosts all static contents, such as images and SVG files.

## Features

- PWA Support: Provides an engaging and responsive experience across devices, offering offline access and quick load times.
- Real-time Communication: Utilizing WebSockets for instant message delivery and updates.
- Adding friends and strangers to friend list
- User Blocking: Empowering users to manage their interactions by blocking other users when necessary.
- Profile Editing: Users can personalize their profiles post-creation, allowing for customization and updates.
- OAuth Integration: Seamless login options using Google and GitHub accounts for user authentication and authorization.
- ...

## Installation
1. Download the project folder.
2. Run the following commands:
```sh
npm install
npm run dev
```