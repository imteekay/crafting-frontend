<samp>

# Architecture

## Storage

- Cookies: The main method of local storage before HTML5, the size is only 4k, the HTTP request header will automatically bring cookies, and the compatibility is good
- LocalStorage: a new feature of HTML5, persistent storage, even if the page is closed, it will not be cleared, stored in the form of key-value pairs, the size is 5M
- SessionStorage: a new feature in HTML5, the operation and size are the same as localStorage, and the difference from localStorage is that sessionStorage is cleared when a tab (page) is closed, and sessionStorage between different tabs is not interoperable
- IndexedDB: NoSQL database, analogous to MongoDB, uses key-value pairs for storage, operates the database asynchronously, supports transactions, and can store more than 250MB of storage space, but IndexedDB is limited by the same-origin policy
- Web SQL: it is a relational database simulated on the browser. Developers can operate Web SQL through SQL statements. It is a set of independent specifications other than HTML5 and has poor compatibility.

## Infrastructure

- Browser cache
- DNS
- HTTP, HTTPS, HTTP/2, HTTP/3

## IO

- HTTP/Fetch request
- Web Sockets
- Service Workers
- Server-Sent Events

## UI / State

- State Management
- App State Data Structure
- Component Tree

## Scalability

- State structure: fast access, fast update
- Reduce request to backend, cache
- Web performance: ship less JavaScript, bundle size optimization, runtime performance optimization
- Image optimization: srcset for (responsive) images, intersection observer, download low-quality images and smoothly change to a better quality image
- Background operation and caching with service workers
- Code splitting and browser caching

</samp>
