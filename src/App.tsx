function App() {

    return (
        <div>
            <div className="flex p-2 pt-[120px]">

                <div className="flex gap-0.5 flex-col">

                    <div className="hexagon flex justify-center items-center h-full w-full bg-red-500">
                        <p>hello</p>
                    </div>

                    <div className="hexagon bg-red-500 flex justify-center items-center h-full w-full">
                        <p>test</p>
                    </div>
                </div>

                <div className="-ml-[56px] -mt-[101px] flex gap-0.5 flex-col">

                    <div className="hexagon bg-amber-500 flex justify-center items-center h-full w-full">
                        test2
                    </div>

                    <div className="hexagon bg-amber-500 flex justify-center items-center h-full w-full">
                        test3
                    </div>
                </div>

            </div>


            <div className="fixed top-[200px] left-[500px] hexagon bg-amber-500 flex justify-center items-center h-full w-full">
                test3
            </div>
        </div>
    )
}

export default App
