import Hex from "./components/core/Hex.tsx";
import posts from "./assets/data/posts.json";
import Draggable from 'react-draggable';

function App() {

    const width = 230;
    const height = 200;

    function temp() {
        let genH = Math.ceil(window.innerHeight / height) * 1.2;
        let genW = Math.ceil(window.innerWidth / width) * 1.5;

        let elements: any = [];

        console.log(genH + " " + genW);

        let x = -115;
        let y = 0;
        let counter = 0;

        console.log(posts);

        for (let w = 0; w < genW; w++) {
            for (let h = 0; h < genH; h++) {
                elements.push((<Hex key={h + '' + w} data={posts[counter]} pos={{x: x, y: y}}/>))
                y += 203;

                counter = (counter == posts.length - 1 ? 0 : counter + 1);
            }

            x += 176;
            y = (w % 2 == 0) ? -100.8 : 0;
        }


        return elements;
    }

    return (
        <div className="h-full w-full select-none test">

            {/* TODO control div, somehow */}
            <div>

            </div>

            {/* Generated Hive Div */}

            <Draggable>
                <div className="relative h-full w-full min-w-screen min-h-screen cursor-grab active:cursor-grabbing test">
                    {temp()}
                </div>
            </Draggable>

        </div>
    )
}

export default App
