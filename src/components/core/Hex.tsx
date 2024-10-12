import {hexdata, yAdj, getWidth, getHeight} from "../../index.ts";
import ReactPlayer from 'react-player/youtube';

function Hex({data, className, id}: { data: hexdata, className?: string, id?: string }) {

    //TODO The hex comp should support text, images and video
    // It should take in all the data it needs from data to streamline creation

    if (data.data.link) console.log(data.data.link)

    return (
        <div id={id} className={`absolute ${className}`}
             style={{
                 left: getWidth(data.grid.col),
                 top: getHeight(data.grid.row) + (data.grid.col % 2 != 0 ? yAdj : 0)
             }}>

            <div className="hexagon bg-main-dark flex justify-center items-center h-full w-full">

                <div className="inner-hexagon text-center bg-main flex justify-center items-center">
                    {data.data.type == "text" && (
                        <p className="w-[160px]">{data.data.title}</p>
                    ) || data.data.type == "video" && (
                        <div>
                            <ReactPlayer url={data.data.link} pip={false} width="220px" height="200px"/>
                        </div>
                    ) || data.data.type == "image" && (
                        <div>
                            <img src={data.data.link} className="" alt="Image"/>
                        </div>
                    )}
                </div>


            </div>

        </div>
    )
}

export default Hex
