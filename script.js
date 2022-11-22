const mainTag = document.getElementsByTagName('main')[0];
const shapes = ['square', 'rectengular', 'triangle', 'trapezoid', 'parallelogram', 'rhombus', 'pentagon', 'hexagon', 'circle'];
let globalColors;
const randomShape = Math.floor(Math.random() * 9);
const randomColor = () => {
    let color = Math.floor(Math.random() * Math.pow(256, 3)).toString(16);
    while (color.length < 6) {
        color = "0" + color;
    }
    return "#" + color;
};
const colorArray = () => {
    const array = [];
    while (array.length < 6) {
        const newColor = randomColor();
        array.push(newColor);
    }
    return array;
};
const checkIfDarkColor = (color) => {
    const hex = color.replace('#', '');
    const c_r = parseInt(hex.substring(0, 0 + 2), 16);
    const c_g = parseInt(hex.substring(2, 2 + 2), 16);
    const c_b = parseInt(hex.substring(4, 4 + 2), 16);
    const brightness = ((c_r * 299) + (c_g * 587) + (c_b * 114)) / 1000;
    return brightness < 155;
};
const generateNewColors = () => {
    mainTag.textContent = '';
    colorRender();
};
const colorRender = () => {
    const colors = colorArray();
    globalColors = [...colors];
    colors.forEach(x => {
        const mainDiv = document.createElement('div');
        const childDiv = document.createElement('div');
        const p = document.createElement('p');
        const btn = document.createElement('button');
        const isDark = checkIfDarkColor(x);
        let pTagColor, btnBg, btnColor;
        if (isDark) {
            pTagColor = 'text-white';
            btnColor = 'text-black';
            btnBg = 'bg-white';
        } else {
            pTagColor = 'text-black';
            btnColor = 'text-white';
            btnBg = 'bg-black';
        }
        p.classList.add(pTagColor, "text-2xl", "text-center");
        p.innerText = x;
        btn.classList.add("px-3", "py-2", "rounded", "m-2", btnBg, btnColor);
        btn.innerText = "Copy ColorCode";
        btn.addEventListener('click', (e) => {
            navigator.clipboard.writeText(x);
            alert(`Color Code Copied : ${x}`);
        });
        childDiv.append(p, btn);
        mainDiv.classList.add('flex', 'items-center', 'justify-center', `bg-[${x}]`, 'w-[300px]', 'border-[3px]', randomShape === 1 ? 'h-[150px]' : 'h-[300px]', randomShape > 1 && shapes[randomShape], 'color-div');
        mainDiv.appendChild(childDiv);
        mainTag.appendChild(mainDiv);
    });
};
const generateNewShapes = () => {

    let i = 0;
    const randomIndex = Math.floor(Math.random() * 9);
    [...mainTag.children].forEach(divs => {
        divs.removeAttribute('class');
        divs.classList.add(`bg-[${globalColors[i]}]`, 'flex', 'items-center', 'justify-center', 'w-[300px]', 'border-[3px]', randomIndex === 1 ? 'h-[150px]' : 'h-[300px]', randomIndex > 1 && shapes[randomIndex]);
        i++;
    });
};
colorRender();
