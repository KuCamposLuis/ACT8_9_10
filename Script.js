class EliminacionGaussiana {
    constructor(matriz) {
        this.matriz = matriz;
        this.filas = matriz.length;
        this.columnas = matriz[0].length;
    }

    imprimirMatriz() {
        return this.matriz.map(row => row.join(' ')).join('\n');
    }

    gauss() {
        for (let i = 0; i < this.filas; i++) {
            let maxRow = i;
            for (let j = i + 1; j < this.filas; j++) {
                if (Math.abs(this.matriz[j][i]) > Math.abs(this.matriz[maxRow][i])) {
                    maxRow = j;
                }
            }

            [this.matriz[i], this.matriz[maxRow]] = [this.matriz[maxRow], this.matriz[i]];

            for (let j = i + 1; j < this.filas; j++) {
                const factor = this.matriz[j][i] / this.matriz[i][i];
                for (let k = i; k < this.columnas; k++) {
                    this.matriz[j][k] -= factor * this.matriz[i][k];
                }
            }
        }
        
        for (let i = this.filas - 1; i >= 0; i--) {
            for (let j = i - 1; j >= 0; j--) {
                const factor = this.matriz[j][i] / this.matriz[i][i];
                for (let k = i; k < this.columnas; k++) {
                    this.matriz[j][k] -= factor * this.matriz[i][k];
                }
            }
        }
        
        for (let i = 0; i < this.filas; i++) {
            const divisor = this.matriz[i][i];
            for (let j = i; j < this.columnas; j++) {
                this.matriz[i][j] /= divisor;
            }
        }
    }
}

document.getElementById('generarMatriz').addEventListener('click', function () {
    const tamaño = parseInt(document.getElementById('tamañoMatriz').value);
    const matrizValores = document.getElementById('matrizValores');
    matrizValores.innerHTML = '';

    for (let i = 0; i < tamaño; i++) {
        const fila = document.createElement('tr');
        for (let j = 0; j < tamaño; j++) {
            const celda = document.createElement('td');
            const input = document.createElement('input');
            input.type = 'number';
            input.min = '0';
            celda.appendChild(input);
            fila.appendChild(celda);
        }
        matrizValores.appendChild(fila);
    }

    document.getElementById('matrizInput').style.display = 'block';
});

document.getElementById('resolverGauss').addEventListener('click', function () {
    const tamaño = parseInt(document.getElementById('tamañoMatriz').value);
    const matriz = [];

    for (let i = 0; i < tamaño; i++) {
        matriz[i] = [];
        for (let j = 0; j < tamaño; j++) {
            const input = document.querySelector(`#matrizValores tr:nth-child(${i + 1}) td:nth-child(${j + 1}) input`);
            matriz[i][j] = parseFloat(input.value) || 0;
        }
    }

    const gaussSolver = new EliminacionGaussiana(matriz);
    gaussSolver.gauss();
    document.getElementById('matrizResultado').textContent = gaussSolver.imprimirMatriz();
});



const calculadora = new Calculadora();

function cambiarFormulario() {
    var figuraSeleccionada = document.getElementById("practica").value;
    document.getElementById("act8").style.display = "none";
    document.getElementById("act9").style.display = "none";
    document.getElementById("act10").style.display = "none";
    document.getElementById(figuraSeleccionada).style.display = "block";
}

function createMagicSquare() {
    const size = parseInt(document.getElementById("size").value);

    if (isNaN(size) || size < 2) {
        alert("Por favor, ingresa un tamaño válido (mínimo 2).");
        return;
    }

    const matrixContainer = document.getElementById("matrix-container");
    matrixContainer.innerHTML = "";

    const table = document.createElement("table");
    for (let i = 0; i < size; i++) {
        const row = document.createElement("tr");
        for (let j = 0; j < size; j++) {
            const cell = document.createElement("td");
            const input = document.createElement("input");
            input.type = "number";
            input.className = "matrix-input";
            cell.appendChild(input);
            row.appendChild(cell);
        }
        table.appendChild(row);
    }
    matrixContainer.appendChild(table);

    const result = document.getElementById("result");
    result.textContent = "";

    const analyzeButton = document.createElement("button");
    analyzeButton.textContent = "Analizar";
    analyzeButton.onclick = function () {
        analyzeMagicSquare(size);
    };
    matrixContainer.appendChild(analyzeButton);
}

function analyzeMagicSquare(size) {
    const matrixValues = [];
    const matrixInputs = document.getElementsByClassName("matrix-input");

    for (let i = 0; i < size; i++) {
        const row = [];
        for (let j = 0; j < size; j++) {
            const inputValue = parseInt(matrixInputs[i * size + j].value);
            if (isNaN(inputValue)) {
                alert("Por favor, ingresa valores numéricos en todas las celdas.");
                return;
            }
            row.push(inputValue);
        }
        matrixValues.push(row);
    }

    const magicSquare = new MagicSquare(size);
    magicSquare.fillMatrix(matrixValues);

    const result = document.getElementById("result");
    if (magicSquare.isMagicSquare()) {
        result.textContent = `Es un cuadro mágico con constante mágica: ${(size * (size * size + 1)) / 2}`;
    } else {
        result.textContent = "No es un cuadro mágico.";
    }
}

function realizarOperaciones() {
            // Leer valores de Matriz 1
            const m11 = parseFloat(document.getElementById("m11").value);
            const m12 = parseFloat(document.getElementById("m12").value);
            const m21 = parseFloat(document.getElementById("m21").value);
            const m22 = parseFloat(document.getElementById("m22").value);

            // Leer valores de Matriz 2
            const n11 = parseFloat(document.getElementById("n11").value);
            const n12 = parseFloat(document.getElementById("n12").value);
            const n21 = parseFloat(document.getElementById("n21").value);
            const n22 = parseFloat(document.getElementById("n22").value);

            // Realizar operaciones
            const suma = [
                [m11 + n11, m12 + n12],
                [m21 + n21, m22 + n22]
            ];

            const resta = [
                [m11 - n11, m12 - n12],
                [m21 - n21, m22 - n22]
            ];

            const producto = [
                [m11 * n11, m12 * n12],
                [m21 * n21, m22 * n22]
            ];

            const division = [
                [(m11 / n11).toFixed(2), (m12 / n12).toFixed(2)],
                [(m21 / n21).toFixed(2), (m22 / n22).toFixed(2)]
            ];

            // Mostrar resultados
            const resultadosDiv = document.getElementById("resultados");
            resultadosDiv.innerHTML = `
                <h3>Suma:</h3>
                ${suma[0][0]} ${suma[0][1]}<br>
                ${suma[1][0]} ${suma[1][1]}<br><br>

                <h3>Resta:</h3>
                ${resta[0][0]} ${resta[0][1]}<br>
                ${resta[1][0]} ${resta[1][1]}<br><br>

                <h3>Producto:</h3>
                ${producto[0][0]} ${producto[0][1]}<br>
                ${producto[1][0]} ${producto[1][1]}<br><br>

                <h3>División:</h3>
                ${division[0][0]} ${division[0][1]}<br>
                ${division[1][0]} ${division[1][1]}<br><br>
            `;
        }