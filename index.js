const wheel = document.getElementById("wheel"),
    spinBtn = document.getElementById("spin-btn"),
    finalValue = document.getElementById("final-value");

// Valores de ângulo mínimo e máximo para um valor
const rotationValues = [
    { minDegree: 0, maxDegree: 30, value: 2 },
    { minDegree: 31, maxDegree: 90, value: 1 },
    { minDegree: 91, maxDegree: 150, value: 6 },
    { minDegree: 151, maxDegree: 210, value: 5 },
    { minDegree: 211, maxDegree: 270, value: 4 },
    { minDegree: 271, maxDegree: 330, value: 3 },
    { minDegree: 331, maxDegree: 360, value: 2 },
];

// Tamanho das partes
const data = [16, 16, 16, 16, 16, 16];

// Cor de fundo das partes
var pieColors = [
    "#1565c0",
    "#2196f3",
    "#1565c0",
    "#2196f3",
    "#1565c0",
    "#2196f3",
];

// Usamos gráfico de pizza para a roda, então vamos criá-lo
let myChart = new Chart(wheel, {
    // Exibir texto no gráfico de pizza
    plugins: [ChartDataLabels],
    type: "pie",
    data: {
        // Valores no gráfico
        labels: [1, 2, 3, 4, 5, 6],
        datasets: [
            {
                backgroundColor: pieColors,
                data: data,
            },
        ],
    },
    options: {
        // Design responsivo do gráfico
        responsive: true,
        animation: { duration: 0 },
        plugins: {
            tooltip: false,
            legend: {
                display: false,
            },
            // Mostrar rótulos dentro do gráfico de pizza
            datalabels: {
                color: "#ffffff",
                formatter: (_, context) => context.chart.data.labels[context.dataIndex],
                font: { size: 24 },
            },
        },
    },
});

// Exibir valor com base em randomAngle
const valueGenerator = (angleValue) => {
    for (let i of rotationValues) {
        if (angleValue >= i.minDegree && angleValue <= i.maxDegree) {
            finalValue.innerHTML = `<p>Valor: ${i.value}</p>`;
            spinBtn.disabled = false;
            break;
        }
    }
};

// Contador de Girada
let count = 0;
// 100 rotações para animação e última rotação para resultado
let resultValue = 101;
// Iniciar girar
spinBtn.addEventListener("click", () => {
    spinBtn.disabled = true;
    finalValue.innerHTML = `<p>Boa sorte!</p>`;
    // Gerar grau aleatório para parar
    let randomDegree = Math.floor(Math.random() * (355 - 0 + 1) + 0);
    // Intervalo para animação de rotação
    let rotationInterval = window.setInterval(() => {
        myChart.options.rotation = myChart.options.rotation + resultValue;
        myChart.update();
        // se rotação > 360, resete para 0
        if (myChart.options.rotation >= 360) {
            count += 1;
            resultValue -= 5;
            myChart.options.rotation = 0;
        } else if (count > 15 && myChart.options.rotation == randomDegree) {
            valueGenerator(randomDegree);
            clearInterval(rotationInterval);
            count = 0;
            resultValue = 101;
        }
    }, 10);
});
