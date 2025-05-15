const shapeSelect = document.getElementById("shape");
const inputsDiv = document.getElementById("inputs");
const resultDiv = document.getElementById("result");

// Define input fields needed per shape
const shapeInputs = {
  circle: [{ label: "Radius (r)", id: "r" }],
  triangle: [
    { label: "Side a", id: "a" },
    { label: "Side b", id: "b" },
    { label: "Side c", id: "c" },
    { label: "Base", id: "base" },
    { label: "Height", id: "height" }
  ],
  square: [{ label: "Side", id: "side" }],
  rectangle: [
    { label: "Length", id: "length" },
    { label: "Width", id: "width" }
  ],
  pentagon: [{ label: "Side (regular pentagon)", id: "side" }],
  hexagon: [{ label: "Side (regular hexagon)", id: "side" }],
  octagon: [{ label: "Side (regular octagon)", id: "side" }],
  ellipse: [
    { label: "Semi-major axis (a)", id: "a" },
    { label: "Semi-minor axis (b)", id: "b" }
  ],
  sphere: [{ label: "Radius (r)", id: "r" }],
  cube: [{ label: "Side", id: "side" }],
  cuboid: [
    { label: "Length", id: "length" },
    { label: "Width", id: "width" },
    { label: "Height", id: "height" }
  ],
  cylinder: [
    { label: "Radius (r)", id: "r" },
    { label: "Height (h)", id: "h" }
  ],
  cone: [
    { label: "Radius (r)", id: "r" },
    { label: "Height (h)", id: "h" },
    { label: "Slant height (l)", id: "l" }
  ],
  pyramid: [
    { label: "Base side", id: "baseSide" },
    { label: "Slant height", id: "slantHeight" },
    { label: "Height", id: "height" }
  ],
};

function renderInputs() {
  const shape = shapeSelect.value;
  inputsDiv.innerHTML = "";
  resultDiv.innerHTML = "";

  if (!shape || !shapeInputs[shape]) return;

  shapeInputs[shape].forEach(({ label, id }) => {
    const labelEl = document.createElement("label");
    labelEl.setAttribute("for", id);
    labelEl.textContent = label;

    const inputEl = document.createElement("input");
    inputEl.type = "number";
    inputEl.min = "0";
    inputEl.id = id;
    inputEl.placeholder = `Enter ${label.toLowerCase()}`;
    inputEl.required = true;

    inputsDiv.appendChild(labelEl);
    inputsDiv.appendChild(inputEl);
  });
}

function calculate() {
  const shape = shapeSelect.value;
  resultDiv.innerHTML = "";

  if (!shape) {
    resultDiv.textContent = "Please select a shape.";
    return;
  }

  const values = {};
  for (const { id } of shapeInputs[shape]) {
    const input = document.getElementById(id);
    if (!input || input.value === "" || Number(input.value) <= 0) {
      resultDiv.textContent = `Please enter valid positive number for ${id}.`;
      return;
    }
    values[id] = parseFloat(input.value);
  }

  let resText = "";

  const π = Math.PI;

  switch (shape) {
    case "circle": {
      const r = values.r;
      const area = π * r * r;
      const circumference = 2 * π * r;
      resText = `Area: ${area.toFixed(2)}\nCircumference: ${circumference.toFixed(2)}`;
      break;
    }
    case "triangle": {
      const { a, b, c, base, height } = values;
      const areaBaseHeight = 0.5 * base * height;
      const s = (a + b + c) / 2;
      let areaHeron;
      if (a + b > c && b + c > a && a + c > b) {
        areaHeron = Math.sqrt(s * (s - a) * (s - b) * (s - c));
      } else {
        areaHeron = NaN;
      }
      resText = `Area (base & height): ${areaBaseHeight.toFixed(2)}\n`;
      resText += isNaN(areaHeron) ? "Invalid triangle sides for Heron's formula." : `Area (Heron's formula): ${areaHeron.toFixed(2)}`;
      break;
    }
    case "square": {
      const side = values.side;
      const area = side * side;
      const perimeter = 4 * side;
      resText = `Area: ${area.toFixed(2)}\nPerimeter: ${perimeter.toFixed(2)}`;
      break;
    }
    case "rectangle": {
      const { length, width } = values;
      const area = length * width;
      const perimeter = 2 * (length + width);
      resText = `Area: ${area.toFixed(2)}\nPerimeter: ${perimeter.toFixed(2)}`;
      break;
    }
    case "pentagon": {
      const side = values.side;
      const area = (5 / 4) * side * side * (1 / Math.tan(π / 5));
      const perimeter = 5 * side;
      resText = `Area: ${area.toFixed(2)}\nPerimeter: ${perimeter.toFixed(2)}`;
      break;
    }
    case "hexagon": {
      const side = values.side;
      const area = (3 * Math.sqrt(3) / 2) * side * side;
      const perimeter = 6 * side;
      resText = `Area: ${area.toFixed(2)}\nPerimeter: ${perimeter.toFixed(2)}`;
      break;
    }
    case "octagon": {
      const side = values.side;
      const area = 2 * (1 + Math.sqrt(2)) * side * side;
      const perimeter = 8 * side;
      resText = `Area: ${area.toFixed(2)}\nPerimeter: ${perimeter.toFixed(2)}`;
      break;
    }
    case "ellipse": {
      const { a, b } = values;
      const area = π * a * b;
      const perimeter = π * (3 * (a + b) - Math.sqrt((3 * a + b) * (a + 3 * b)));
      resText = `Area: ${area.toFixed(2)}\nPerimeter (approx.): ${perimeter.toFixed(2)}`;
      break;
    }
    case "sphere": {
      const r = values.r;
      const surfaceArea = 4 * π * r * r;
      const volume = (4 / 3) * π * r * r * r;
      resText = `Surface Area: ${surfaceArea.toFixed(2)}\nVolume: ${volume.toFixed(2)}`;
      break;
    }
    case "cube": {
      const side = values.side;
      const surfaceArea = 6 * side * side;
      const volume = side * side * side;
      resText = `Surface Area: ${surfaceArea.toFixed(2)}\nVolume: ${volume.toFixed(2)}`;
      break;
    }
    case "cuboid": {
      const { length, width, height } = values;
      const surfaceArea = 2 * (length * width + length * height + width * height);
      const volume = length * width * height;
      resText = `Surface Area: ${surfaceArea.toFixed(2)}\nVolume: ${volume.toFixed(2)}`;
      break;
    }
    case "cylinder": {
      const { r, h } = values;
      const surfaceArea = 2 * π * r * (r + h);
      const volume = π * r * r * h;
      resText = `Surface Area: ${surfaceArea.toFixed(2)}\nVolume: ${volume.toFixed(2)}`;
      break;
    }
    case "cone": {
      const { r, h, l } = values;
      const surfaceArea = π * r * (r + l);
      const volume = (1 / 3) * π * r * r * h;
      resText = `Surface Area: ${surfaceArea.toFixed(2)}\nVolume: ${volume.toFixed(2)}`;
      break;
    }
    case "pyramid": {
      const { baseSide, slantHeight, height } = values;
      const baseArea = baseSide * baseSide;
      const perimeter = 4 * baseSide;
      const surfaceArea = baseArea + 0.5 * perimeter * slantHeight;
      const volume = (1 / 3) * baseArea * height;
      resText = `Surface Area: ${surfaceArea.toFixed(2)}\nVolume: ${volume.toFixed(2)}`;
      break;
    }
    default:
      resText = "Calculation not available.";
  }

  resultDiv.textContent = resText;
}
