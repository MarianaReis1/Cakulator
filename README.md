# Cakulator

Cakulator is a Nuxt.js application designed to help users save cake recipes and generate a grocery list of ingredients necessary to bake those cakes. This project leverages Quasar for its pre-defined components, Tailwind CSS for quick and bespoke design, and TypeScript for type safety and better development experience. This project was developed as part of an interview process.

## Features

- **Add Cakes**: Add your favorite cake recipes.
- **View List of Cakes**: Easily view a list of all added cake recipes.
- **Print Ingredients List**: Easily print a grocery list of ingredients needed for all added cakes.

## Future Features

- **Database Connection**: Persist data by connecting to a database.
- **User Authentication**: Add user authentication features.
- **User Power**: Allow users to view and edit each cake recipe.
- **Selective Cake Baking**: Select specific cakes to bake and print the corresponding grocery list.
- **Improve Ingredient Lists**: Ensure the ingredients list includes the units and allow users to add more ingredients with their units to the list.
- **Ingredient Selection**: Allow users to only select predefined ingredients.

## Technologies Used

- **Nuxt.js**: The framework for building the application.
  - My experience: Although I don't have much experience with Nuxt, working with it was a pleasure. It offers a lot of advanced features compared to Next.js, making it a powerful tool for server-side rendered applications.
- **Quasar**: For pre-defined components and rich feature set.
  - My experience: This was my first time using Quasar components. I found them to be highly versatile and feature-rich, which greatly accelerated the development process. Although it was tricky to integrate it with Vitest initially.
- **Tailwind CSS**: For creating bespoke designs quickly and simply.
  - My experience: I am well-versed in Tailwind CSS and absolutely love working with it. It allows for rapid, bespoke, and responsive design without writing much custom CSS.
- **TypeScript**: For type safety and enhanced development experience.
  - My experience: I have worked with TypeScript before and enjoy using it. It enhances the development experience by providing type safety and catching errors early in the development cycle.
- **Canva**: For generating a quick and nice design wireframe.
  - My experience: I used Canva to generate the wireframe. I found a nice template and modified it according to my taste. Canva made it quick and easy to find a visually appealing template, fonts, and images, and it was simple to customize it.
  - Screenshots are available under `~/assets/wireframes`

## Testing

The testing strategy includes unit and integration tests to ensure the reliability and functionality of the application. I use a combination of **Vue Test Utils** and **Vitest** for my testing framework.

### Tools

- **Vue Test Utils**: This library provides utilities to test Vue.js components effectively.
- **Vitest**: A fast and lightweight test runner and assertion library.

**Current Progress**

I have implemented few tests for the components. However, there are still some tests to be added in the future to achieve full coverage.

**Challenges**

Testing certain components, such as dialog content, presented unique challenges. Due to the way these components are set up and rendered (often using Vue's teleport feature), special handling and setup were required to properly test their behavior and interactions.

**Future Work**

- Add more comprehensive tests for dialog interactions and edge cases.
- Continue expanding the test coverage to cover all critical paths and user interactions.
- Refine and improve existing tests to ensure they are robust and reliable.

## Project Background

This project was developed as part of an interview process, demonstrating skills in using Nuxt.js, Quasar, Tailwind CSS, and TypeScript to build a functional and user-friendly application.

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
