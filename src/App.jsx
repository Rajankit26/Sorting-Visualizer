import { useEffect, useState } from 'react'
import './App.css'
import Bars from './components/Bars.jsx';
import Navbar from './components/Navbar.jsx';
import bubbleSort from './algorithms/BubbleSort.jsx';
import insertionSort from './algorithms/InsertionSort.jsx';
import mergeSort from './algorithms/MergeSort.jsx';
import quickSort from './algorithms/QuickSort.jsx';
import selectionSort from './algorithms/SelectionSort.jsx';

function App() {

  const generateRandomArray = (len) => {
    setCompleted(false)
    setSorting(false)
    setSortedIndex([])

    const randomArray = Array.from(Array(len + 1).keys()).slice(1)

    // randomly shuffle the array
    for(let i = randomArray.length - 1; i > 0; i--)
    {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      const temp = randomArray[i];
      randomArray[i] = randomArray[randomIndex];
      randomArray[randomIndex] = temp;
    }

    setBlocks(randomArray);
  }
  
  const [algo, setAlgo] = useState('bubbleSort');
  const [len, setLength] = useState(30);
  const [blocks, setBlocks] = useState([]);//*
  const [sorting, setSorting] = useState(false);
  const [completed, setCompleted] = useState(true);//*
  const [speed, setSpeed] = useState(250);
  const [compare, setCompare] = useState([]);//*
  const [swap, setSwap] = useState([]);//*
  const [sortedIndex, setSortedIndex] = useState([]);//*

  // Generate random array every time the length is changed by the user
  useEffect( () => {
    generateRandomArray(len)
  }, [len, algo]);

  // // Setting the selected algorithm
  const handleAlgo = (e) => {
    setAlgo(e.target.value)
  }

  // // Handle the length of the array
  const handleLength = (e) => {
    setLength(Number(e.target.value))
  }

  // // Handle the speed of sorting
  const handleSpeed = (e) => {
    setSpeed(Math.ceil(400/Number(e.target.value)))
  }

  // Sorting according to the algorithm
  const handleSort = () => {
    const sortAccOrder = (order) => {
      // IIFE
      (function loop(i) {
        setTimeout(function () {
          const [j, k, arr, index] = order[i]
          setCompare([j, k])
          setSwap([])

          if(index !== null)
          {
            setSortedIndex( (prevState) => [...prevState, index])
          }

          if(arr) {
            setBlocks(arr)
            if(j !== null || k != null)setSwap([j, k])
          }

          if(++i < order.length)
          {
            loop(i)
          }
          else{
            setSorting(false)
            setCompleted(true)
          }
        }, speed)
      })(0)
    }

    setSorting(true)

    algo === 'bubbleSort'
      ? sortAccOrder(bubbleSort(blocks))
      : algo === 'selectionSort'
      ? sortAccOrder(selectionSort(blocks))
      : algo === 'insertionSort'
      ? sortAccOrder(insertionSort(blocks))
      : algo === 'mergeSort'
      ? sortAccOrder(mergeSort(blocks))
      : algo === 'quickSort'
      ?sortAccOrder(quickSort(blocks))
      : ( () => {
        setSorting(false)
        setCompleted(true)
      })()
  }

  return (
    <div className='App'>
      <Navbar 
      generateRandomArray={ () => generateRandomArray(len)}
      handleLength={handleLength}
      handleSpeed={handleSpeed}
      handleAlgo={handleAlgo}
      handleSort={handleSort}
      sorting={sorting}
      completed={completed}
      len={len}
      speed={speed}
      algo={algo}
      />
      <Bars 
        blocks={blocks}
        compare={sorting && compare}
        swap={sorting && swap}
        sorted={sortedIndex}
      />
    </div>
  )
}

export default App
