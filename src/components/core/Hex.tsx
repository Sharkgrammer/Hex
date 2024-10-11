function Hex({data, pos, className, id}: { data: any, pos: any, className?: string, id?: string }) {

    //TODO The hex comp should support text, images and video
    // It should take in all the data it needs from data to streamline creation

    return (
        <div id={id} className={`absolute ${className} ${pos.even && "text-white"}`} style={{left: pos.x, top: pos.y}}>
            <div className="hexagon bg-main flex justify-center items-center h-full w-full">
                <p>{data.title}</p>
            </div>
        </div>
    )
}

export default Hex
