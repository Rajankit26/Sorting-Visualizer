import { useState, useEffect } from "react";
import './Bars.css'

const Bars = ({ blocks, compare, sorted, swap}) =>{

    // creates state variable width that controls how wide each bar should be
    const [width, setWidth] = useState(
        Math.min(20, Math.ceil(window.innerWidth / blocks.length) - 5) //-5 gives margin between the bars
        // Math.min(20,....)ensures that width never exceed 20px
    )

    const color = blocks.length <= 50 && width > 14 ? 'black' : 'transparent'

    // This ensures bar width stays responsive when screen shrinks or grows, bars adjust with their width accordingly.
    useEffect( () => {
        const handleResize = () => 
        {
            setWidth(Math.min(20, Math.ceil(window.innerWidth / blocks.length) - 8))
        }

        window.addEventListener('resize', handleResize)

        // This line runs immediately once to set initial width
        setWidth(Math.min(20, Math.ceil(window.innerWidth / blocks.length) - 8))
    }, [blocks.length])
    return (
        <div className="listBlocks">

            {
                blocks.map( (block, i) => {
                    // for each block(which is a number) and its index i we create a bar
                    // dividing by blocks.length -> keeps it scaled
                    const height = (block * 500) / blocks.length;
                    let bg = 'turqoise'

                    // ith element is being compared with the other element

                    if(compare && (i === compare[0] || i === compare[1]))
                    {
                        bg = '#ffff50'
                    }

                    if(swap && (i === swap[0] || i === swap[1]))
                    {
                        bg = '#ff0000'
                    }
                    // ith element is in sorted position
                    if(sorted && sorted.includes(i))
                    {
                        bg = '#4bc52e'
                    }

                    const style = 
                    {
                        backgroundColor : bg,
                        color: color,
                        height: height,
                        width: width,
                    }
                    return(
                        <div key= {i} className="block" style={style}>
                            {block}
                        </div>
                    )
                })
            }

        </div>
    )
}

export default Bars;