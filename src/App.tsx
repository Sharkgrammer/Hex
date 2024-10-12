import Hex from "./components/core/Hex.tsx";
import posts from "./assets/data/posts.json";
import Draggable from 'react-draggable';
import {useEffect, useRef, useState} from "react";
import {hexdata, buffer, hiveAdj, xJump, yJump, viewportAdj} from "./index.ts";

interface bound {
    maxCol: number,
    minCol: number,
    maxRow: number,
    minRow: number,
    deltaX: number,
    deltaY: number
}

function App() {

    const nodeRef = useRef(null);
    const [hive, setHive] = useState<hexdata[]>([]);
    const [bounds, setBounds] = useState<bound>({maxCol: 0, minCol: 0, maxRow: 0, minRow: 0, deltaX: 0, deltaY: 0});

    let post = 0;

    useEffect(() => {
        generateInitHive();
    }, [])


    function getPost() {
        post = (post == posts.length - 1 ? 0 : post + 1);

        return posts[post];
    }

    // @ts-ignore
    function handleDrag(e: any, ui: any) {
        let b: bound = bounds;

        console.log(hive.length)

        b.deltaX += ui.deltaX;
        b.deltaY += ui.deltaY;

        if (Math.abs(b.deltaX) > buffer) {
            if (b.deltaX > 0) {
                generate(b.minCol - hiveAdj, b.minCol, b.minRow, b.maxRow);

                b.minCol -= hiveAdj;
                b.maxCol -= hiveAdj;
            } else {
                generate(b.maxCol, b.maxCol + hiveAdj, b.minRow, b.maxRow);

                b.minCol += hiveAdj;
                b.maxCol += hiveAdj;
            }

            b.deltaX = 0;
        } else if (Math.abs(b.deltaY) > buffer) {
            if (b.deltaY > 0) {
                generate(b.minCol, b.maxCol, b.minRow - hiveAdj, b.minRow);

                b.minRow -= hiveAdj;
                b.maxRow -= hiveAdj;
            } else {
                generate(b.minCol, b.maxCol, b.maxRow, b.maxRow + hiveAdj);

                b.minRow += hiveAdj;
                b.maxRow += hiveAdj;
            }

            b.deltaY = 0;
        }

        setBounds(b);
    }

    function generate(minCol: number, maxCol: number, minRow: number, maxRow: number) {
        let elements = removeHives();

        for (let col = minCol; col < maxCol; col++) {
            for (let row = minRow; row < maxRow; row++) {

                let data: hexdata = {
                    data: getPost(),
                    grid: {row: row, col: col}
                }

                elements.push(data);
            }
        }

        setHive(elements);
    }

    function removeHives() {
        return hive.filter((hive: hexdata) => {
                return (
                    hive.grid.row <= bounds.maxRow + viewportAdj &&
                    hive.grid.row >= bounds.minRow - viewportAdj &&
                    hive.grid.col <= bounds.maxCol + viewportAdj &&
                    hive.grid.col >= bounds.minCol - viewportAdj
                );
            }
        )
    }

    function generateInitHive() {

        let bounds = {
            maxCol: Math.ceil(window.innerWidth / xJump) + viewportAdj,
            maxRow: Math.ceil(window.innerHeight / yJump) + viewportAdj,
            minCol: -viewportAdj,
            minRow: -viewportAdj,
            deltaX: 0,
            deltaY: 0
        };

        setBounds(bounds);
        generate(bounds.minCol, bounds.maxCol, bounds.minRow, bounds.maxRow);
    }

    return (
        <div className="select-none no-scroll bg-main-light h-screen w-screen">

            {/* Generated Hive Div */}
            <Draggable onDrag={handleDrag} nodeRef={nodeRef}>
                <div ref={nodeRef}
                     className="relative cursor-grab active:cursor-grabbing test">

                    {hive.map((hex, index) => (
                        <Hex data={hex} key={index}/>
                    ))}

                </div>
            </Draggable>

        </div>
    )
}

export default App
