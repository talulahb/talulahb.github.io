// Animazione numeri in crescita
document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".number");

  counters.forEach(counter => {
    const target = +counter.getAttribute("data-value");
    const duration = 3000;
    const step = Math.ceil(target / (duration / 16));

    let count = 0;

    const update = () => {
      count += step;
      if (count > target) count = target;
      counter.textContent = count.toLocaleString();
      if (count < target) requestAnimationFrame(update);
    };

    update();
  });
});

// Emissioni CO₂ - grafico a linee
const ctx = document.getElementById('co2Chart').getContext('2d');

const co2Chart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: [
      '2010', '2012', '2014', '2016', '2018', '2020', '2021', '2022', '2023'
    ],
    datasets: [{
      label: 'Emissioni CO₂ (in milioni di tonnellate)',
      data: [390, 400, 420, 430, 460, 490, 510, 530, 560],
      backgroundColor: 'rgba(220, 20, 60, 0.2)',
      borderColor: 'crimson',
      borderWidth: 2,
      fill: true,
      tension: 0.4,
      pointRadius: 4,
      pointBackgroundColor: 'crimson'
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      },
      tooltip: {
        callbacks: {
          label: ctx => ctx.raw + ' Mt CO₂'
        }
      }
    },
    scales: {
      y: {
        title: {
          display: true,
          text: 'Milioni di tonnellate'
        },
        beginAtZero: false
      },
      x: {
        title: {
          display: true,
          text: 'Anno'
        }
      }
    }
  }
});
