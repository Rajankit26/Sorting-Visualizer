
import "./Navbar.css";

const Navbar = (
    {
        handleLength,
        handleSpeed,
        handleAlgo,
        generateRandomArray,
        handleSort,
        sorting,
        completed,
        len,
        speed,
        algo,
    }
) => {
    return (
        <nav>
            <div className="nav-brand">Sorting Visualizer</div>
            <div className="toolbox">
                <div>
                    <div className="group speed">
                        <label>Speed</label>
                        <input 
                            type="range"
                            onChange={handleSpeed}
                            min= "1"
                            max= "10"
                            value = {Math.ceil(400/speed)} 
                            disabled = {sorting}
                        />
                    </div>

                    <div className="group length">
                        <label >Length</label>
                        <input
                            type="range"
                            onChange={handleLength}
                            min= "5"
                            max={100}
                            step= "1"
                            disabled = {sorting}
                            value={len}
                         />
                    </div>

                    <select onChange={handleAlgo} disabled = {sorting} value={algo} style={{fontFamily:"serif",}}>
                        <option value= "bubbleSort">Bubble Sort</option>
                        <option value= "selectionSort">Selection Sort</option>
                        <option value= "insertionSort">Insertion Sort</option>
                        <option value= "mergeSort">Merge Sort</option>
                        <option value= "quickSort">Quick Sort</option>
                    </select>
                </div>
                <div>
                    <button onClick={generateRandomArray} disabled = {sorting}  style={{fontFamily:"serif",}}>Generate New Array</button>
                    <button onClick={handleSort} disabled = {sorting || completed} style={{fontFamily:"serif",}}>Sort</button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;