### Conceptual Exercise

Answer the following questions below:

- What is the purpose of the React Router?
  - The purpose of react router is to create single-page web apps and have app run fully within the browser.

- What is a single page application?
  - A single page web app is rendered entirely on one web page. The app uses javascript to update and render items within this page without having to reload, or get data from a server. 

- What are some differences between client side and server side routing?
  - Client side routing: 
      - page does not refresh
      -  data kept in browser
      -  heavy javascript
  - server side routing:
      - page refeshes to load new
      - data stored in server
      - more heavy HTML

- What are two ways of handling redirects with React Router? When would you use each?
  - useNavigate() hook and Navigate component
  - should use useNavigate() after some other code that has run. For in example a function on a form component - after you submit the form the state is updated then call navigate('/newpage')
  - should use <Navigate/> before other code has run. For example rendering <Navigate to="/home"/> when some state info is wrong and otherwise rendering the actual compoenent. 

- What are two different ways to handle page-not-found user experiences using React Router? 
  - Within <BrowserRouter> and <Routes>, the last route can have path = '*' to catch anything that didnt match any of the defined routes. This can then render a compoenent that displays some not found message (element - {<NotFound/>}) OR it can render a <Navigate/> that simply redirects the user

- How do you grab URL parameters from within a component using React Router?
  - the useParams hook will return a params object, with will contain the params in the url. These values can then be used within the component

- What is context in React? When would you use it?
  - Context is a way to create universal data for an app. Instead of prop drilling to get a piece of data from the state of a parent all the way down to some n'th degree child, the child can be wrapped in a <context.Provider> element with a certain value (usually a state variable) and the the useContext(someContext) hook can be used on the child to return that value.

- Describe some differences between class-based components and function
  components in React.
  - class based components do not have access to hooks, which means that it can be difficult to share functionality between components, using methods like higher order components. functional components use closure to have data persist between renders and this can be leveraged to extract pieces of functionality to separate modules. 
  - class bsed component are also javasript classes, so they need things like the "this" keyword to reference component specific variables and a constructer method to initialize the component. 

- What are some of the problems that hooks were designed to solve?
  - hooks solve the difficulty in having data persistence between renders and extracting and sharing functionality between compoenents.