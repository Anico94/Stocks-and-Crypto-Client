<template>
  <div class="chart">
    <Line id="my-chart-id" :options="chartOptions" :data="chartValues" />
  </div>
</template>

<script>
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "vue-chartjs";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
export default {
  name: "LineChart",
  props: {
    chartValues: {
      type: Object,
    },
  },
  components: { Line },
  data() {
    return {
      chartOptions: {
        responsive: true,
        elements: {
          point: {
            pointStyle: "circle",
            radius: 2,
            hitRadius: 4,
          },
          line: {
            backgroundColor: "#2E1DF0",
            borderColor: "#2E1DF0",
          },
        },
        scales: {
          y: {
            ticks: {
              // Include a dollar sign in the ticks
              callback: function (value) {
                return "$" + value;
              },
            },
          },
        },
      },
    };
  },
};
</script>

<style scoped></style>
