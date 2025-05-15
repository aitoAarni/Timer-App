# ⏳ Timer-App

**Timer-App** is a **Pomodoro-style productivity timer** designed to help users stay focused and track their work sessions efficiently. Built with **React Native and Expo** for the front end and **Node.js** for the back end, this app provides **local time log storage** for offline use and a **leaderboard** to compare productivity with other users.

## ✨ Features

-   **Pomodoro Timer** – Alternates between work and rest periods in a loop.
-   **Gesture Controls** –
    -   🏁 Tap the timer to start/stop.
    -   ⬅️ Swipe left to add one minute.
    -   ⬆️ Swipe up to reset the timer.
    -   ➡️ Swipe right to skip to the next period (work or rest).
-   **Customizable Durations** – Adjust work and rest times in **Settings**.
-   **Statistics View** – Track progress and view usage stats.
-   **User Accounts** – Sign up, log in, and view your profile.
-   **Offline Support** – Saves time logs locally.

## 📱 Navigation

-   Swipe gestures work for **Timer** and **Settings** screens.
-   Use the **top navigation** or **modal navigator** at the bottom left to access different views.

## ▶️ Demo of the app
(doesn't have all the newest features visible, like the leaderboard)
<img src="https://github.com/aitoAarni/Timer-App/blob/main/appDemo.gif" width="300" height="650">

## 🔗Links

[Download the mobile app preview build](https://expo.dev/accounts/isovertti/projects/timerFront/builds/41cb55ae-e422-4790-862d-5370c72b6c11) (can be used without expo app, or development server)

[Download the mobile app development build](https://expo.dev/accounts/isovertti/projects/timerFront/builds/2486d5b7-d816-455c-abb2-0e7f27bdc92d)

[Work hours](hours.md)

## Additional information

[E2E tests](timerFront/maestro/) uses maestro, which will need to be installed and can be used in timerFront. Before e2e tests can be run both front-end and back-end must have dependencies and be running on your local environment

```bash
cd backEnd
npm run test:e2e
```

open another console and run the commands

```bash
cd timerFront
npm run start:e2e
```

and finally open yet another console and run

```bash
cd timerFront
maestro test maestro
```
