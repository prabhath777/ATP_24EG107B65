import { createContext, useState, useContext } from "react";

// Create the Counter Context
export const CounterContext = createContext();

// Create the Provider Component
export function CounterProvider({ children }) {
    const [counter, setCounter] = useState(0);

    // Increment counter
    const increment = () => {
        setCounter(counter + 1);
    };

    // Decrement counter
    const decrement = () => {
        setCounter(counter - 1);
    };

    // Reset counter
    const reset = () => {
        setCounter(0);
    };

    // Custom increment by value
    const incrementBy = (value) => {
        setCounter(counter + value);
    };

    const value = {
        counter,
        increment,
        decrement,
        reset,
        incrementBy,
    };

    return (
        <CounterContext.Provider value={value}>
            {children}
        </CounterContext.Provider>
    );
}

// Custom Hook to use Counter Context
export function useCounter() {
    const context = useContext(CounterContext);
    if (!context) {
        throw new Error("useCounter must be used within CounterProvider");
    }
    return context;
}