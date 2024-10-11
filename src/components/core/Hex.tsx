import {hexdata, yAdj} from "../../index.ts";

function Hex({data, className, id}: { data: hexdata, className?: string, id?: string }) {

    //TODO The hex comp should support text, images and video
    // It should take in all the data it needs from data to streamline creation

    return (
        <div id={id} className={`absolute ${className}`}
             style={{left: data.pos.x1, top: data.pos.y1 + (data.grid.col % 2 != 0 ? yAdj : 0)}}>

            <div className="hexagon bg-main flex justify-center items-center h-full w-full">
                <p>{data.data.title}</p>
            </div>

        </div>
    )
}

export default Hex
