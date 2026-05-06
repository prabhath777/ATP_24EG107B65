import { useCounter } from "./context";

function Counter() {
  const { counter, increment, decrement, reset, incrementBy } = useCounter();

  return (
    <div className="bg-blue-400 p-6 rounded-2xl text-white">
      <h2 className="text-lg font-semibold mb-4">Global Counter: {counter}</h2>

      <div className="flex gap-2">
        <button onClick={increment} className="px-3 py-1 bg-white/20 rounded">+ 1</button>
        <button onClick={decrement} className="px-3 py-1 bg-white/20 rounded">- 1</button>
        <button onClick={() => incrementBy(5)} className="px-3 py-1 bg-white/20 rounded">+ 5</button>
        <button onClick={reset} className="px-3 py-1 bg-white/20 rounded">Reset</button>
      </div>
    </div>
  );
}

export default Counter;
