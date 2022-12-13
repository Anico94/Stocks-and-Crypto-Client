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
      },
    };
  },
};
</script>

<style scoped></style>
