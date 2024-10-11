import Hex from "./components/core/Hex.tsx";
import posts from "./assets/data/posts.json";
import Draggable from 'react-draggable';
import {useEffect, useRef, useState} from "react";
import {buffer, hexdata, pos, xJump, yAdj, yJump} from "./index.ts";

function App() {

    const nodeRef = useRef(null);
    const [position, setPosition] = useState({x: 0, y: 0});

    const [bounds, setBounds] = useState({x1: 0, x2: 0, y1: 0, y2: 0});
    const [maxMin, setMaxMin] = useState({maxX: 0, minX: 0, maxY: 0, minY: 0});

    const [hive, setHive] = useState<hexdata[]>([]);

    let post = 0;

    useEffect(() => {
        let b = getBounds();

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

    function getPost() {
        post = (post == posts.length - 1 ? 0 : post + 1);

        return posts[post];
    }

    function handleDrag(e: any, ui: any) {
        setPosition(ui);

        //console.log(ui.x * -1 + " " + ui.y * -1);

        let v: pos = {
            x1: bounds.x1 - ui.x,
            x2: bounds.x2 - ui.x,
            y1: bounds.y1 - ui.y,
            y2: bounds.y2 - ui.y
        }

        let h = removeHives(v);
        //addHives(v);
        generateCol(h, v);

        //setHive(generateHive(v));
        //console.log(nodeRef.current.children)
    }


    function removeHives(b: pos) {
        return hive.filter((hive: hexdata) => {
                return (
                    hive.pos.x1 >= b.x1 &&
                    hive.pos.x2 <= b.x2 &&
                    hive.pos.y1 >= b.y1 &&
                    hive.pos.y2 <= b.y2
                );
            }
        );
    }

    function addHives(b: pos) {

    }

    function generateCol(h:hexdata[], b:pos){

        let y = b.y1;

        while (y < b.y2) {
            let data: hexdata = {
                data: getPost(),
                pos: {x1: maxMin.maxX, y1: y, x2: maxMin.maxX + 230, y2: y + 200}
            }

            h.push(data);

            y += yJump;
        }

        setHive(h);
        maxMin.maxX += xJump;
        setMaxMin(maxMin);

    }

    function generateHive(b: pos) {
        let elements: any = [];

        let x = b.x1;
        let y = b.y1 + yAdj;

        let maxContainer: any = {minX: x, minY: y};

        let col = 0;
        let row = 0;

        //console.log(x + ":" + y + " " + position.x + ":" + position.y + " " + hive.length);

        while (x < b.x2) {

            while (y < b.y2) {
                let data: hexdata = {
                    data: getPost(),
                    pos: {x1: x, y1: y, x2: x + 230, y2: y + 200}
                }

                elements.push(data)

                y += yJump;
                row += 1;
            }

            if (col == 1) maxContainer.maxY = y;

            x += xJump;
            y = (col % 2 == 0) ? b.y1 : b.y1 + yAdj;

            col += 1;
            row = 0;
        }

        maxContainer.maxX = x;

        console.log(maxContainer);
        setMaxMin(maxContainer)

        return elements;
    }

    return (
        <div className="select-none no-scroll bg-black h-screen w-screen">

            {/* Generated Hive Div */}
            <Draggable position={position} onDrag={handleDrag} nodeRef={nodeRef}>
                <div ref={nodeRef}
                     className="relative bg-red-500 h-full w-full min-w-screen min-h-screen cursor-grab active:cursor-grabbing test">

                    {hive.map((hex, index) => (
                        <Hex data={hex} key={index}/>
                    ))}

                </div>
            </Draggable>

        </div>
    )
}

export default App
