# System Design

RADIO framework

- **Requirements Exploration**: Understand the problem thoroughly and determine the scope by asking a number of clarifying questions.
- **Architecture/High-level Design**: Identify the key components of the product and how they are related to each other.
- **Data Model**: Describe the various data entities, the fields they contain and which component(s) they belong to.
- **Interface Definition (API)**: Define the interface (API) between components in the product, functionality of each API, their parameters and responses.
- **Optimizations and Deep Dive**: Discuss about possible optimization opportunities and specific areas of interest when building the product.- Requirements

## Requirements Exploration

It's expected to clarify the scope and requirements needed in the discussion

- Mindset: Treat your interview as product manager and engineering manager: asking question to clarify the problem
- Behavior: Ask the questions and take notes
- What's the feature: the define the scope and the problem | the the limits of the feature
- What's the user flow we need to cover
- Understand different requirements
  - Functional requirements: how will it work
    - Core functionality: Think about the core flow the user will use the product
    - High level estimation: data volumn, peak traffic
  - Non-functional requirements:
    - Different devices: desktop, mobile, tablets - think of SSR (can't use window, should use CSS media queries)
    - Which browsers should we support?
    - SEO: different content, SSR, fast (core web vitals - metrics - small bundles - lazy load)
    - Localized: how to use internationalization
    - UX: smooth experience (rendering page and navigation), animation, handle requests (loading, errors, success, try again)

## High-Level Architecture

Identify the key components of the product and how they are related to each other

- Separation of Concerns: draw the rectangles and the interactions between them
  - Client
    - User interface, design system components
    - "Controller" (performs the request, 'store' data in the client, provide the data to the UI)
    - Store: states and data from the server
  - Server: API (HTTP/WebSocket)
  - Interaction between components: show the interaction with arrows
- Managing state / Data model
  - What are the states involved in the problem?
  - Where do we store the client state?
  - User behavior: e.g. Open dialog, click buttons, click a link, comment, create a post
  - Managing URL: depending on the url, it will fetch something else
- Rendering Architecture
  - Client side rendering
  - Server side rendering
  - Streaming SSR

## Data Model

Describe the various data entities, the fields they contain and which component(s) they belong to

- Server data: usually from a database
- Client data
  - Persistent data: it has to be sent to the server and saved into a database
    - Real database - request
  - Ephemeral data: temporary state that lasts for a short time
    - URL:
      - Good for current page's state, storing page number, filter settings
      - Very fragile, unsafe: visible through the URL
    - Cookies
      - Easy to use, easy to support.
      - Don't trigger a re-render for a component when changing the cookie. Should do extra work
      - Good for session management (user session, tracking user behavior, personalization - e.g. language preference)
      - Can increase HTTP overhead (storage capacity: 4kb per origin)
    - Local storage
      - Persistent storage but only for the specific device
      - Slow synchronous API
      - Only strings (encode, decode each time if data is not string)
      - Good for offline usage, saving drafts
    - Session storage
      - The session is finished when the tab is closed
    - Cache API
      - Storage inside service workers
      - Good for offline mode, cache of assets like HTML, CSS, and JS
    - Indexed DB: more complex DB
      - Large capacity, it's fast, available in service workers
      - Not a long term data storage (ITP - data deleted after 7 days)
      - Good for large amount of data, complex data

## Interface Definition (API)

- API requests it should handle
  - HTTP methods: put, post, get
  - WebSockets
  - Basic payload
    - Data contract

## Interface Definition (UI)

- UI / mockup for the problem
  - UI
  - Component Tree
- User interaction / behavior

## Going in-depth

- Components
  - Think about small reusable components
  - Think about if it could also be part of a design system
- API
  - HTTP methods
  - API payload
  - headers: cookie / jwt / auth token
  - GraphQL / Rest API / BFF architecture / WebSockets / Long Poling / Server-Sent Event
- Rendering
  - Partially render
  - Loading indicator
    - Loading Spinner or Skeleton
  - Error handling
    - Show the error in the content part
    - Show a dialog/modal with the error description and the possibility to retry the request
    - 401 - unauthorized: clean the cookies and redirect to the login page
    - 403 - forbidden: redirect to a forbidden page

## Going even deeper

- Performance
  - In front end, performance typically refers to a few things - loading speed, how fast the UI responds to user interactions and memory space (heap) required by the component.
  - Network performance > Bundles
    - Small bundles / LazyLoading: vendor, page1, page2
    - Pre-fetching for other parts of the flow
    - Gzip / Brotli to compress the bundle and make it very small
    - Cache requests
      - Service workers/web workers
      - libraries like react-query / swr to get the data from cache and revalidate when it is stale
  - Infinite scroll / Long list: Sliding Window
    - Render the nodes that are only showing in the window
  - Page Stack: when clicking the back button | the bad part: the stack can be very big, we need to manage the stack size to not use too much memory in the browser
  - Small images/images size based on the device
  - Rendering performance > SSR
  - Loading speed - The less JavaScript the component contains, the less JavaScript the browser has to download to load the component and the lower the network request time. It's also important to modularize components and allow users to download only the necessary JavaScript modules needed for their use case.
  - Responsiveness to user interactions
    - If a user interaction results in displaying of data that has to be loaded over the network, there will be a delay between the user interaction and updating of the UI. Minimizing that delay or removing it entirely is the key to improving responsiveness.
    - JavaScript in a browser is single-threaded. The browser can only do execute one line of code at any one time. The less work (JavaScript executed, DOM updates) the component has to do when a user does something on the page, the faster the component can update the UI to respond to the changes.
    - Tracking events: postpone events and run them only on the browser's idle time
  - Memory space - The more memory your component takes up on the page, the slower the browser performs and the experience will feel sluggish/janky. If your component has to render hundreds/thousands of items (e.g. number of images in a carousel, number of items in a selector), memory space might become significant.
- User Experience
  - UX might not fall squarely under engineering but good front end engineers have a good understanding of UX and build UI with great UX. There are too many UX practices to be aware of, but the most common ones/low hanging fruits are:
  - Reflect the state of the component to the user - If there's a pending background request, show a spinner. If there's an error, make sure to display it instead of silently failing.
  - Display an empty state if there are no items in a list, instead of not rendering anything.
  - Destructive actions should have a confirmation step, especially irreversible ones.
  - Disable interactive elements if they trigger an async request! Prevents double firing of events in the case of accidental double-clicking (possible for people with motor disabilities).
  - If there are search inputs involved, each keystroke should not fire a network request.
  - Handle extreme cases
    - Strings can be really long/short and your UI should not look weird in either case. For long strings, they can have their contents truncated and hidden behind a "View more" button.
    - If there are many items to display within a component, they shouldn't all be displayed on the screen at once and making the page extremely long/wide. Paginate the items or contain them within a maximum width/height container.
  - Keyboard friendliness - This involves making sure the component is keyboard-friendly
    - Add shortcuts to make the component more usable by keyboard-only users
    - Ensure that elements can be focused and tab order within the component is correct
  - Accessibility is part of UX but will be covered in a later section
- SEO
  - Friendly URL
    - Index URL for the search with pre-selected filters: the user when clicking the link, it renders the search page with the pre-selected filters
- Accessibility
