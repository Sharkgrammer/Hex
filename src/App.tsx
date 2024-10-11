import Hex from "./components/core/Hex.tsx";
import posts from "./assets/data/posts.json";
import Draggable from 'react-draggable';
import {useEffect, useRef, useState} from "react";
import {buffer, pos} from "./index.ts";

function App() {

    const nodeRef = useRef(null);
    const [position, setPosition] = useState({x: 0, y: 0});

    const [bounds, setBounds] = useState({x1: 0, x2: 0, y1: 0, y2: 0});
    const [viewPort, setViewPort] = useState({x1: 0, x2: 0, y1: 0, y2: 0});

    const [hive, setHive] = useState([]);

    const [test, setTest] = useState({x: 0, y: 0});

    useEffect(() => {
        let b = getBounds();
        setViewPort(b);

        setHive(generateHive(b));
    }, [])

    function getBounds() {
        let b: pos = {x1: 0, x2: 0, y1: 0, y2: 0};

        b.x1 = -buffer;
        b.y1 = -buffer;

        b.x2 = window.innerWidth + buffer;
        b.y2 = window.innerHeight + buffer;

        setBounds(b);

        return b;
    }

    function handleDrag(e: any, ui: any) {
        setPosition(ui);

        let v: pos = {
            x1: bounds.x1 + ui.x,
            x2: bounds.x2 + ui.x,
            y1: bounds.y1 + ui.y,
            y2: bounds.y2 + ui.y
        };

        setViewPort(v);

        console.log(ui);

        setHive(generateHive(bounds));

        //console.log(nodeRef.current.children)
    }

    function generateHive(b) {
        let elements: any = [];

        //console.log(b)

        let x = b.x1 - position.x;
        let y = b.y1 + 100.8 + position.y;
        let counter = 0;
        let col = 0;
        let row = 0;

        console.log(x + ":" + y + " " + position.x + ":" + position.y + " " + hive.length);
        console.log(viewPort);

        while (x < b.x2){

            while (y < b.y2){
                elements.push((<Hex id={col + ':' + row} key={col + ':' + row} data={posts[counter]} pos={{x: x, y: y}}/>))
                y += 203;

                counter = (counter == posts.length - 1 ? 0 : counter + 1);

                row += 1;
            }

            x += 176;
            y = (col % 2 == 0) ? b.y1 : b.y1 + 100.8;

            col += 1;
            row = 0;
        }


        return elements;
    }

    return (
        <div className="select-none no-scroll bg-black h-screen w-screen">

            {/* Generated Hive Div */}
            <Draggable position={position} onDrag={handleDrag} nodeRef={nodeRef}>
                <div ref={nodeRef}
                     className="relative h-full w-full min-w-screen min-h-screen cursor-grab active:cursor-grabbing test">

                    {hive}

                </div>
            </Draggable>

        </div>
    )
}

export default App
