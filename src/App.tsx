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
    const isDragging = useRef<boolean>(false);
    const bounds = useRef<bound>({maxCol: 0, minCol: 0, maxRow: 0, minRow: 0, deltaX: 0, deltaY: 0});
    const post = useRef<number>(0);

    const [hive, setHive] = useState<hexdata[]>([]);
    // @ts-ignore
    const [modalHive, setModalHive] = useState<hexdata>(null);

    useEffect(() => {
        generateInitHive();
    }, [])

    // @ts-ignore
    function handleDrag(e: any, ui: any) {
        dragStart();

        let b: bound = bounds.current;

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

        bounds.current = b;
    }

    function generate(minCol: number, maxCol: number, minRow: number, maxRow: number) {
        let elements = removeHives();

        for (let col = minCol; col < maxCol; col++) {
            for (let row = minRow; row < maxRow; row++) {

                let postData = posts[post.current];

                let data: hexdata = {
                    post: postData,
                    grid: {row: row, col: col}
                }

                elements.push(data);

                post.current = (post.current == posts.length - 1 ? 0 : post.current + 1);
            }
        }

        setHive(elements);
    }

    function removeHives() {
        return hive.filter((hive: hexdata) => {
                return (
                    hive.grid.row <= bounds.current.maxRow + viewportAdj &&
                    hive.grid.row >= bounds.current.minRow - viewportAdj &&
                    hive.grid.col <= bounds.current.maxCol + viewportAdj &&
                    hive.grid.col >= bounds.current.minCol - viewportAdj
                );
            }
        )
    }

    function generateInitHive() {

        let b = {
            maxCol: Math.ceil(window.innerWidth / xJump) + viewportAdj,
            maxRow: Math.ceil(window.innerHeight / yJump) + viewportAdj,
            minCol: -viewportAdj,
            minRow: -viewportAdj,
            deltaX: 0,
            deltaY: 0
        };

        bounds.current = b;
        generate(b.minCol, b.maxCol, b.minRow, b.maxRow);
    }

    function dragStart() {
        isDragging.current = true;
    }

    function dragStop() {
        setTimeout(() => {
            isDragging.current = false;
        }, 10);
    }

    function showModal(hex: hexdata) {
        if (!isDragging.current) setModalHive(hex);
    }

    function hideModal(){
        // @ts-ignore
        setModalHive(null);
    }

    return (
        <div className="select-none no-scroll bg-main-light h-screen w-screen">

            <div className={`${modalHive && "animate-op-fade opacity-50"}`}>
                {/* Generated Hive Div */}
                <Draggable onDrag={handleDrag} nodeRef={nodeRef} onStop={dragStop}>
                    <div ref={nodeRef} className="relative cursor-grab active:cursor-grabbing test">

                        {hive.map((hex, index) => (
                            <div key={index} onClick={() => showModal(hex)} onTouchEnd={() => showModal(hex)}>
                                <Hex data={hex}/>
                            </div>
                        ))}

                    </div>
                </Draggable>
            </div>

            {modalHive && (
                <div
                    className="absolute h-screen w-screen  flex justify-center items-center cursor-pointer animate-fade-in touch-none"
                    onClick={hideModal}>

                    <div className="w-[230px] h-[200px] scale-150 xs:scale-175 md:scale-200 opacity-100 flex items-center justify-center">

                        {hive.length > 0 && (
                            <Hex data={modalHive} modal={true}/>
                        )}

                    </div>
                </div>
            )}
        </div>
    )
}

export default App
