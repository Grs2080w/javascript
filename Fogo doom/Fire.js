const firePixelsArray = []
let fireWidth = 50
let fireHeight = 50 
let debug = false
var windDirection = 0
const lightnessColorsPalette = [0, 5.40, 8.10, 10.80, 13.50, 16.20, 18.90, 21.60, 24.30, 27, 29.70, 32.40, 35.10, 37.80, 40.50, 43.20, 45.90, 48.60, 51.30, 54, 56.70, 59.40, 62.10, 64.80, 67.50, 70.20, 72.90, 75.60, 78.30, 81, 83.70, 86.40, 89.10, 91.80, 94.50, 97.20, 100]

/* Original palette = [{"r":7,"g":7,"b":7},{"r":31,"g":7,"b":7},{"r":47,"g":15,"b":7},{"r":71,"g":15,"b":7},{"r":87,"g":23,"b":7},{"r":103,"g":31,"b":7},{"r":119,"g":31,"b":7},{"r":143,"g":39,"b":7},{"r":159,"g":47,"b":7},{"r":175,"g":63,"b":7},{"r":191,"g":71,"b":7},{"r":199,"g":71,"b":7},{"r":223,"g":79,"b":7},{"r":223,"g":87,"b":7},{"r":223,"g":87,"b":7},{"r":215,"g":95,"b":7},{"r":215,"g":95,"b":7},{"r":215,"g":103,"b":15},{"r":207,"g":111,"b":15},{"r":207,"g":119,"b":15},{"r":207,"g":127,"b":15},{"r":207,"g":135,"b":23},{"r":199,"g":135,"b":23},{"r":199,"g":143,"b":23},{"r":199,"g":151,"b":31},{"r":191,"g":159,"b":31},{"r":191,"g":159,"b":31},{"r":191,"g":167,"b":39},{"r":191,"g":167,"b":39},{"r":191,"g":175,"b":47},{"r":183,"g":175,"b":47},{"r":183,"g":183,"b":47},{"r":183,"g":183,"b":55},{"r":207,"g":207,"b":111},{"r":223,"g":223,"b":159},{"r":239,"g":239,"b":199},{"r":255,"g":255,"b":255}] */

function start() {
    createFireDataStructure()
    createFireSource()

    setInterval(calculateFirePropagation, 50)
}

function createFireDataStructure() {
    const numberOfPixels = fireWidth * fireHeight

    for (let i = 0; i < numberOfPixels; i++) {
        firePixelsArray[i] = 0
    }
}

function calculateFirePropagation() {
    for (let column = 0; column < fireWidth; column++) {
        for (let row = 0; row < fireHeight; row++) { 
            const pixelIndex = column + ( fireWidth * row )
            updateFireIntensityPerPixel(pixelIndex)
        }
    }
    renderFire()
}

function changeWindDirection(value) {
    windDirection = value
}

function updateFireIntensityPerPixel(currentPixelIndex) {
    
    const belowPixelIndex = currentPixelIndex + fireWidth

    if (belowPixelIndex >= fireWidth * fireHeight) {
        return
    }

    const decay = Math.floor(Math.random() * 3)
    const belowPixelFireIntensity = firePixelsArray[belowPixelIndex]
    const newFireIntensity = 
        belowPixelFireIntensity - decay >= 0 ? belowPixelFireIntensity - decay : 0

        switch(windDirection) {
            case 0:
        firePixelsArray[currentPixelIndex - decay] = newFireIntensity; break; //wind comes to the left
            case 1: firePixelsArray[currentPixelIndex] = newFireIntensity; break; //no wind (fire set to up)
            case 2: firePixelsArray[currentPixelIndex + decay] = newFireIntensity; break; //wind comes to the right
    }
}

function renderFire() {
    let html = '<table cellpadding=0 cellspacing=0>'

    for (let row = 0; row < fireHeight; row++) {
        html += '<tr>'

        for (let column = 0; column < fireWidth; column++) { 
            const pixelIndex = column + ( fireWidth * row )
            const fireIntensity = firePixelsArray[pixelIndex]
                function toHslString() {          
                    const hue = Number(document.getElementById('hueInput').value)
                    const lightness = lightnessColorsPalette[fireIntensity]
    
                    return "hsl(" + hue + ", 80%, " + lightness + "%)"
                }

            if (debug === true) {
                html += '<td>'
                html += `<div class="pixel-Index">${pixelIndex}</div>`
                html += `<div id="pixelColor" style="color: ${toHslString()}">${fireIntensity}</div>`
                html += '</td>'

            } else {
                html += `<td class="pixel" style="background-color: ${toHslString()}">`
                html += '</td>'
                }
        }

        html += '</tr>'
    }

    html += '</table>'

    document.querySelector('#fireCanvas').innerHTML = html
}

function createFireSource() {
    for (let column = 0; column <= fireWidth; column++) { 
        const overflowPixelIndex = fireWidth * fireHeight
        const pixelIndex = (overflowPixelIndex - fireWidth) + column

        firePixelsArray[pixelIndex] = 36
    }
}

function destroyFireSource() {
    for (let column = 0; column <= fireWidth; column++) {
        const overflowPixelIndex = fireWidth * fireHeight
        const pixelIndex = (overflowPixelIndex - fireWidth) + column 

        firePixelsArray[pixelIndex] = 0
    }
}

function increaseFireSource() {
    for (let column = 0; column <= fireWidth; column++) {
        const overflowPixelIndex = fireWidth * fireHeight
        const pixelIndex = (overflowPixelIndex - fireWidth) + column

        const currentFireIntensity = firePixelsArray[pixelIndex]

        if (currentFireIntensity < 36) {
            const increase = Math.floor(Math.random() * 14)
            const newFireIntensity =
            currentFireIntensity + increase >= 36 ? 36 : currentFireIntensity + increase

            firePixelsArray[pixelIndex] = newFireIntensity
        }
    }
}

function decreaseFireSource() {
    for (let column = 0; column <= fireWidth; column++) {
        const overflowPixelIndex = fireWidth * fireHeight
        const pixelIndex = (overflowPixelIndex - fireWidth) + column

        const currentFireIntensity = firePixelsArray[pixelIndex]

        if (currentFireIntensity > 0) {
            const decay = Math.floor(Math.random() * 14)
            const newFireIntensity =
            currentFireIntensity - decay >= 0 ? currentFireIntensity - decay : 0

            firePixelsArray[pixelIndex] = newFireIntensity
        }
    }
}

function toggleDebugMode() {
    if (debug === false) {
        fireWidth = 25
        fireHeight = 17
        debug = true
    } else {
        fireWidth = 60
        fireHeight = 50
        debug = false
    }

    createFireDataStructure()
    createFireSource()
}

start()