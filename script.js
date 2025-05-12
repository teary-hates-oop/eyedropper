
const colorInput = document.getElementById("favcolor");
const radios = document.querySelectorAll('input[name="color"]');
const outputDiv = document.getElementById("output");

const defaultColor = "#ff0000";

function copyColor() {
    const selectedFormat = document.querySelector('input[name="color"]:checked').id;
    const hex = colorInput.value;

    if (hex.toLowerCase() === defaultColor) {
        outputDiv.textContent = ""; // Clear output
        return; // Don't copy default red
    }

    let result = "";

    if (selectedFormat === "hex") {
        result = hex;
    } else if (selectedFormat === "rgb") {
        const rgb = hexToRgb(hex);
        result = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
    } else if (selectedFormat === "hsl") {
        const rgb = hexToRgb(hex);
        const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
        result = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
    }

    navigator.clipboard.writeText(result)
        .then(() => {
            outputDiv.textContent = `Copied: ${result}`;
        })
        .catch(err => {
            console.error("Failed to copy: ", err);
        });
}

// Convert HEX to RGB
function hexToRgb(hex) {
    let r = parseInt(hex.slice(1, 3), 16);
    let g = parseInt(hex.slice(3, 5), 16);
    let b = parseInt(hex.slice(5, 7), 16);
    return { r, g, b };
}

// Convert RGB to HSL
function rgbToHsl(r, g, b) {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0;
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h *= 60;
    }

    return {
        h: Math.round(h),
        s: Math.round(s * 100),
        l: Math.round(l * 100)
    };
}

// Listeners
radios.forEach(radio => {
    radio.addEventListener("change", copyColor);
});
colorInput.addEventListener("input", copyColor);

// Don't auto-copy on page load
outputDiv.textContent = `Copied: ${result}`;
outputDiv.style.color = hex;

