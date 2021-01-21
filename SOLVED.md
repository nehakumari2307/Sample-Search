# Architecture

Each component should have the following structure:

- Components: All functional components required to operate this feature
- Styles: Styles required for UI
- Types: Define all typescript interfaces, enum, etc solely required for this feature
- Redux: Reducer's component specific and any related

# Amended

Redux is included as part of the React application, considering the following flow:

- /Redux: includes the Application Centralized Store, Action Types, and Centralized Reducer
- /Redux/Reducer: Combines the reducers from different feature spread through the application
- /Redux/Store: The application centrailzed store.
- <Feature-Name>Reducer.ts: Includes the logic for the reducer that specific for this feature
- common Enum status is added on Constant.ts; for search result status.
- .env.development file include environment properties

# Recommendations

- Unless it is not needed, it is good to have Server Side Rendering that affords many benefits include:

* Website index and avaliable to crawlable that's required for SEO
* Out of box WebPack configuration
* Afford faster page rendering.
* Automatic code splitting for CSS and Javascript

- Avoid multiple ../../../ instead use a full path for readability
