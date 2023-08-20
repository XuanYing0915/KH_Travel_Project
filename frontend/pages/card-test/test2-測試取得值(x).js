import { useState, useEffect } from "react";


export default function Counter() {
    const [circles, setCircles] = useState([]);

    const get = (event) => {
        console.log(event.currentTarget.getAttribute('data-value'));//可拿來取值
        // 轉成canvas 可否
    }

    const getClickCoords = (event) => {
        // from: https://stackoverflow.com/a/29296049/14198287
        var e = event.target;
        var dim = e.getBoundingClientRect();
        var x = event.clientX - dim.left;
        var y = event.clientY - dim.top;
        return [x, y];
    };

    const addCircle = (event) => {
        // get click coordinates
        let [x, y] = getClickCoords(event);

        // make new svg circle element
        // more info here: https://www.w3schools.com/graphics/svg_circle.asp
        let newCircle = (
            <circle
                key={circles.length + 1}
                cx={x}
                cy={y}
                r="20"
                stroke="black"
                strokeWidth="1"
                fill="red"
            />
        );

        // update the array of circles; you HAVE to spread the current array
        // as 'circles' is immutible and will not accept new info
        let allCircles = [...circles, newCircle];

        // update 'circles'
        setCircles(allCircles);
    };

    console.log(circles);



    return (<>
        <div className="Container ">
            <h1>Big Pythagoras Pizza</h1>
            <h2>Click to add pepperoni:</h2>
            <svg className="svg" onClick={get} data-value={'喔喔'}>
                {/* This loads your circles in the circles hook here */}
                {circles}
            </svg>
        </div>
        <style jsx>{`
            .Container{
            width: 100%;
            hieght: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            }
            .svg{
            width: 500px;
            height: 500px;
            background-image: url('https://storage.pizzapizza.ca/phx2/ppl_images/category/en/2x/create_your_own_5.png');
            & * {
            /* Block your circles from triggering 'add circle' */
            pointer-events: none;
            }
            `}</style>
    </>

    );
}




