## 1. What is the difference between Component and PureComponent? Give an example where it might break my app.
Component and PureComponent are both React classes, but they have different behavior when it comes to re-rendering. The component will re-render whenever its props or state change, while PureComponent will only re-render if its props or state change and the new props or state are not equal to the old props or state. This can be useful for improving performance because it means that React doesn't have to re-render components unnecessarily. However, it can also break your app if you're not careful. For example, let's say you have a component that renders a list of items. If you use PureComponent, React will only re-render the component if the items in the list change. However, if you change the order of the items in the list, React will not re-render the component, because the items themselves have not changed. This can lead to unexpected behavior, such as the list not being updated when the user changes the order of the items.To avoid this problem, you should only use PureComponent for components that do not depend on the order of their props or state. If you're not sure whether a component is safe to use with PureComponent, you should use Component instead.

An example of how PureComponent can break your app:
```javascript
class List extends PureComponent {
  render() {
    const items = this. props.items;
    return (
      <ul>
        {items.map((item) => (
          <li key={item.id}>{item.name}</li>
         ))}
      </ul>
     );
    }
}
```
The List component renders a list of items. The items prop is an array of objects, and the key property of each object is the object's id. If the user changes the order of the items in the list, the items prop will not change, so the List component will not re-render. This will cause the list to not be updated when the user changes the order of the items. To fix this problem, you could use Component instead of PureComponent. This would force the List component to re-render whenever the items prop changes, regardless of whether the order of the items has changed.

```javascript
class List extends Component {
  render() {
    const items = this. props.items;
    return (
      <ul>
      {items.map((item) => (
         <li key={item.id}>{item.name}</li>
       ))}
      </ul>
     );
   }
}
```
Using Component instead of PureComponent will ensure that the List component is always up-to-date, even if the order of the items in the list changes.

## 2. Context + ShouldComponentUpdate might be dangerous. Why is that?
The problem with using Context and ShouldComponentUpdate together is that it can lead to components not being re-rendered when they should be. This is because Context updates are not subject to ShouldComponentUpdate. So, if a component's ShouldComponentUpdate method returns false, it will still be re-rendered if the context data changes. This can lead to unexpected behavior, such as components not being updated when the user changes a setting, or components being re-rendered unnecessarily. To avoid this problem, we should avoid using ShouldComponentUpdate with Context. To improve performance, we should use other techniques, such as memoization or lazy loading.An example of how using Context and ShouldComponentUpdate together can be dangerous:
```javascript
    class List extends Component {
      render() {
        const items = this.context.items;
        return (
          <ul>
            {items.map((item) => (
              <li key={item.id}>{item.name}</li>
            ))}
          </ul>
        );
      }

      shouldComponentUpdate(nextProps, nextState) {
        // This will always return false, even if the items context data has changed
        return false;
      }
    }
```
The List component renders a list of items. The items are stored in the items context. The shouldComponentUpdate method always returns false, so the List component will never be re-rendered, even if the items in the context change.

## 3. Describe 3 ways to pass information from a component to its PARENT.
Three ways to pass information from a component to its parent in React:
### 1.Props 
Props are the most common way to pass information from a parent component to a child component. Props are passed as arguments to the child component's constructor function, and they can be accessed by the child component using the this.props object.
```javascript
    const ParentComponent = () => {
      const data = {
        message: "Hello from the parent component!",
      };

      return (
        <ChildComponent data={data} />
      );
    };

    const ChildComponent = ({ data }) => {
      return (
        <div>
          <h1>{data.message}</h1>
        </div>
      );
    };
```
The ParentComponent passes a data object to the ChildComponent using props. The ChildComponent then accesses the data object using the this.props object and renders it as a heading.

### 2.State
State is another way to pass information from a parent component to a child component. State is data that is stored inside a component, and it can be updated by the component itself or by the parent component.
```javascript
    const ParentComponent = () => {
      const [data, setData] = useState({
        message: "Hello from the parent component!",
      });

      return (
        <ChildComponent data={data} onDataChange={setData} />
      );
    };

    const ChildComponent = ({ data, onDataChange }) => {
      return (
        <div>
          <h1>{data.message}</h1>
          <button onClick={() => onDataChange({ message: "New message!" })}>Change message</button>
        </div>
      );
    };
```
The ParentComponent uses the useState hook to create a state variable called data. The ChildComponent then receives the data state variable as a prop. The ChildComponent can then update the data state variable by calling the onDataChange prop.

### 3.Events
Events are a way for components to communicate with each other. When a component emits an event, it sends a message to all of its listeners. The listeners can then respond to the event by performing an action.
```javascript
    const ParentComponent = () => {
      const handleClick = () => {
        alert("Hello from the parent component!");
      };

      return (
        <button onClick={handleClick}>Click here</button>
      );
    };

    const ChildComponent = ({ handleClick }) => {
      return (
        <div>
          <h1>I am the child component</h1>
          <button onClick={handleClick}>Click here to alert from the parent</button>
        </div>
      );
    };
```
The ParentComponent has a handleClick function that will alert a message when it is called. The ChildComponent receives the handleClick function as a prop. The ChildComponent can then call the handleClick function when the user clicks on a button.

## 4. Give 2 ways to prevent components from re-rendering.
The 2 ways to prevent components from re-rendering:

### 1. useMemo hook: 
The useMemo hook is a React hook that can be used to create a memoized function. A memoized function is a function that only runs when its inputs change. This can be useful for preventing components from re-rendering when their props or state do not change.
```javascript
    const MyComponent = () => {
      const [count, setCount] = useState(0);
      const greeting = useMemo(() => `Hello, ${count}`, [count]);

      return (
        <div>
          <h1>{greeting}</h1>
          <button onClick={() => setCount(count + 1)}>Click me</button>
        </div>
      );
    };
```
The greeting variable is a memoized function that returns the string Hello, ${count}. The greeting variable only runs when the count variable changes. This means that the MyComponent component will only re-render when the count variable changes.

### 2. PureComponent class: 
The PureComponent class is a React class that can be used to create a pure component. A pure component is a component that only re-renders when its props or state change. This can be useful for preventing components from re-rendering when their props or state do not change.
```javascript
    class MyComponent extends PureComponent {
      render() {
        const [count, setCount] = useState(0);
        return (
          <div>
            <h1>Hello, {count}</h1>
            <button onClick={() => setCount(count + 1)}>Click me</button>
          </div>
        );
      }
    }
```
The MyComponent class extends the PureComponent class. The PureComponent class will only re-render the component when its props or state change. This means that the MyComponent component will only re-render when the count variable changes.

## 5. What is a fragment and why do we need it? Give an example where it might break my app.
A fragment is a special type of component in React that allows you to group multiple elements without creating a new DOM node. This can be useful for improving performance and readability.
Let's say you have a component that renders a list of items. It will look something like this:
```javascript
const List = () => {
  const items = [1, 2, 3];
  return (
    <ul>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
};
```
This code will create a new DOM node for each item in the list. This can be inefficient, especially if the list is long.
Instead, you could use a fragment like this:
```javascript
const List = () => {
  const items = [1, 2, 3];
  return (
    <ul>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
};
```
This code will create a single DOM node for the entire list. This can improve performance, especially if the list is long.
Fragments can also break your app if they are used incorrectly. For example, if you use a fragment to wrap a component that has its own state, the state will not be accessible from the parent component. This can lead to unexpected behavior, such as the component not updating when its state changes.To avoid this problem, you should only use fragments to wrap components that do not have their own state.

## 6. Give 3 examples of the HOC pattern.
Three examples of the Higher-Order Component (HOC) pattern in React:
### 1. Logging HOC
This HOC can be used to log the props and state of a component to the console. This can be useful for debugging or for tracking the flow of data through your app.
```javascript
const Logger = ({ children }) => {
  const logProps = () => {
    console.log("Props:", this.props);
  };

  const logState = () => {
    console.log("State:", this.state);
  };

  return (
    <div>
      <h1>Logging HOC</h1>
      <p>Props: {logProps()}</p>
      <p>State: {logState()}</p>
      {children}
    </div>
  );
};

const MyComponent = () => {
  const [count, setCount] = useState(0);
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
};

const App = () => {
  return (
    <Logger>
      <MyComponent />
    </Logger>
  );
};
```
This code will log the props and state of the MyComponent component to the console.

### 2. Error Handling HOC
This HOC can be used to handle errors that occur in a component. This can be useful for preventing errors from crashing your app or for displaying custom error messages to the user.
```javascript
const ErrorBoundary = ({ children }) => {
  try {
    return children;
  } catch (error) {
    return (
      <div>
        <h1>Error Occurred</h1>
        <p>Error: {error.message}</p>
      </div>
    );
  }
};

const MyComponent = () => {
  throw new Error("An error has occurred");
};

const App = () => {
  return (
    <ErrorBoundary>
      <MyComponent />
    </ErrorBoundary>
  );
};
```
This code will prevent the MyComponent component from crashing your app if an error occurs. Instead, the error message will be displayed to the user.

### 3. Authentication HOC
This HOC can be used to ensure that a user is authenticated before they can access a component. This can be useful for protecting sensitive data or for preventing unauthorized users from accessing your app.
```javascript
const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <div>
      <h1>Authentication HOC</h1>
      {isAuthenticated ? (
        <div>
          <p>You are logged in</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <p>You are not logged in</p>
          <button onClick={handleLogin}>Login</button>
        </div>
      )}
      {children}
    </div>
  );
};

const MyComponent = () => {
  return (
    <div>
      <h1>My Component</h1>
      <p>This component is only accessible to authenticated users</p>
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <MyComponent />
    </AuthProvider>
  );
};
```
This code will only render the MyComponent component if the user is authenticated. If the user is not authenticated, they will be redirected to the login page.

## 7. What's the difference in handling exceptions in promises, callbacks, and async...await?
The difference in handling exceptions in promises, callbacks, and async/await:

### 1. Promises
Promises are a way of representing asynchronous operations. They allow you to chain together multiple asynchronous operations and to handle errors that occur during those operations.
To handle an exception in a promise, you can use the catch method. The catch method takes a function as its argument. This function will be called if an exception occurs. The function can then be used to handle the exception.
The following code shows how to handle an exception in a promise:
```javascript
const promise = fetch("https://example.com/api/data");

promise.catch(error => {
  // Handle the error
});
```
### 2.Callbacks
Callbacks are a way of passing a function as an argument to another function. They are often used to handle asynchronous operations.
To handle an exception in a callback, you can use the try/catch statement. The try/catch statement allows you to execute code in a try block and to handle any exceptions that occur in a catch block.
The following code shows how to handle an exception in a callback:
```javascript
function fetchData(url, callback) {
  try {
    const response = fetch(url);
    const data = await response.json();
    callback(data);
  } catch (error) {
    // Handle the error
  }
}

fetchData("https://example.com/api/data", data => {
  // Do something with the data
});
```
### 3. Async...await
Async/await is a new feature in JavaScript that allows you to write asynchronous code in a more concise way. Async/await uses promises to represent asynchronous operations.
To handle an exception in async/await, you can use the try/catch statement. The try/catch statement works the same way as it does with callbacks.
The following code shows how to handle an exception in async/await:

```javascript
async function fetchData() {
  try {
    const response = await fetch("https://example.com/api/data");
    const data = await response.json();
    return data;
  } catch (error) {
    // Handle the error
  }
}

const data = await fetchData();
// Do something with the data
```

## 8. How many arguments does setState take and why is it async?
setState takes exactly one argument, which is the new state value. It is asynchronous because it does not immediately update the UI. Instead, it schedules a state update to be performed later, during the next render cycle. This allows React to batch together multiple state updates and to perform them more efficiently.
Example:
```javascript
const MyComponent = () => {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={handleClick}>Click me</button>
    </div>
  );
};
```
When the user clicks on the button, the handleClick function will be called. The handleClick function will then call setCount with the new state value, which is count + 1. setState will then schedule a state update to be performed during the next render cycle. During the next render cycle, React will update the UI to reflect the new state value.

## 9. List the steps needed to migrate a Class to a Function Component.
The steps needed to migrate a Class to a Function Component:
1. Remove the class keyword. The first step is to remove the class keyword from the component definition.
2. Replace the this keyword with props and state. The this keyword refers to the current instance of the component. In a function component, you can access the props and state using the props and state variables, respectively.
3. Use the useState hook to create state. The useState hook is a React hook that can be used to create state. The useState hook takes two arguments, the initial state value and a function that is called to update the state.
4. Use the useEffect hook to perform side effects. The useEffect hook is a React hook that can be used to perform side effects. Side effects are actions that affect the state of the component or the outside world.
5. Call super() if you need to access the lifecycle methods. If you need to access the lifecycle methods, such as componentDidMount or componentWillUnmount, you can call super().

Example:
```javascript
// Original Class Component
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  handleClick = () => {
    this.setState({
      count: this.state.count + 1,
    });
  };

  render() {
    return (
      <div>
        <h1>Count: {this.state.count}</h1>
        <button onClick={this.handleClick}>Click me</button>
      </div>
    );
  }
}

// Function Component
const MyComponent = () => {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={handleClick}>Click me</button>
    </div>
  );
};
```
## 10. List a few ways styles can be used with components.
Few ways styles can be used with components:
### 1. Inline styles
Inline styles are defined directly on the component element. They are the simplest way to style a component, but they can be difficult to maintain and scale.
```javascript
const MyComponent = () => {
  return (
    <div style={{ color: "red" }}>
      Hello, world!
    </div>
  );
};
```
### 2. CSS classes
CSS classes are a more structured way to style components. They can be reused across multiple components, and they can be imported from external stylesheets.
```javascript
const MyComponent = () => {
  return (
    <div className="my-component">
      Hello, world!
    </div>
  );
};

const styles = {
  "my-component": {
    color: "red",
  },
};

export default MyComponent;
```
### 3. Styled Components
Styled Components is a library that allows you to create custom components that encapsulate both their markup and styles. This makes it easier to maintain and reuse styles.
```javascript
import styled from "styled-components";

const MyComponent = styled.div`
  color: red;
`;

export default MyComponent;
```
### 4. Themes
Themes are a way of defining a consistent set of styles that can be applied to multiple components. This can be useful for creating a unified look and feel for your app.
```javascript
import { ThemeProvider } from "styled-components";

const theme = {
  colors: {
    primary: "red",
  },
};

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <MyComponent />
    </ThemeProvider>
  );
};

export default App;
```

## 11. How to render an HTML string coming from the server.

### 1. dangerouslySetInnerHTML prop
One way is to use the dangerouslySetInnerHTML prop. The dangerouslySetInnerHTML prop allows you to set the HTML content of an element directly, without any sanitization. This can be dangerous, as it allows you to inject arbitrary HTML into your app. However, it can be useful for rendering HTML that is generated by the server.
```javascript
const MyComponent = () => {
  const htmlString = `
    <h1>Hello, world!</h1>
  `;

  return (
    <div dangerouslySetInnerHTML={{ __html: htmlString }} />
  );
};
```
### 2. ReactDOM.render() function
The ReactDOM.render() function takes two arguments: the element to render and the container element. The container element is the element that will contain the rendered element.
To render an HTML string using ReactDOM.render(), you need to first create a DOM element from the HTML string.
```javascript
const htmlString = `
    <h1>Hello, world!</h1>
  `;

const div = document.createElement("div");

ReactDOM.render(div, htmlString);
```
### 3. ReactDOM.hydrate() function
the ReactDOM.hydrate() function to hydrate an HTML string that has already been rendered by the browser. The ReactDOM.hydrate() function takes two arguments: the element to hydrate and the HTML string.
To hydrate an HTML string using ReactDOM.hydrate(), you need to first create a DOM element from the HTML string. You can do this using the document.createElement() function.
```javascript
const htmlString = `
    <h1>Hello, world!</h1>
  `;

const div = document.createElement("div");

ReactDOM.hydrate(div, htmlString);
```
If you need to inject arbitrary HTML into your app, then you should use the dangerouslySetInnerHTML prop. If you need to render HTML that is generated by the server, then you can use either ReactDOM.render() or ReactDOM.hydrate().
