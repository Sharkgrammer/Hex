import {hexdata, yAdj, getWidth, getHeight} from "../../index.ts";
import ReactPlayer from 'react-player/youtube';

function Hex({data, className, id, modal}: { data: hexdata, className?: string, id?: string, modal?: boolean }) {

    return (
        <div id={id} className={`absolute ${className}`}
             style={{
                 left: modal ? 0 : getWidth(data.grid.col),
                 top: modal ? 0 : getHeight(data.grid.row) + (data.grid.col % 2 != 0 ? yAdj : 0)
             }}>

            <div className="hexagon bg-main-dark flex justify-center items-center h-full w-full">

                <div className="inner-hexagon text-center font-semibold bg-main flex justify-center items-center">
                    {data.post.type == "text" && (
                        <p className="w-[160px]">{data.post.text}</p>
                    ) || data.post.type == "video" && (
                        <div>
                            <ReactPlayer url={data.post.link} pip={false} width="220px" height="200px"/>
                        </div>
                    ) || data.post.type == "image" && (
                        <div>
                            <img src={data.post.link} className="pointer-events-none" alt="Image"/>
                        </div>
                    )}
                </div>


            </div>

        </div>
    )
}

export default Hex
