import { MESES } from '@/mocks/meses';
import { numberForMoney } from '@/utils/mask';
import { useCallback, useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';

const GraficoResumoUltimosTresMeses = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);
  const options = useCallback(() => {
    const hoje = new Date();
    const mesAtualIndex = hoje.getMonth();

    const mesesComparacao = [MESES[(mesAtualIndex - 2 + 12) % 12], MESES[(mesAtualIndex - 1 + 12) % 12], MESES[mesAtualIndex]];

    const entradas = [1000, 1200, 1500];
    const saidas = [700, 800, 950];

    const saldos = entradas.map((e, i) => e - saidas[i]);

    return {
      title: {
        text: 'Resumo ',
        // subtext: '',
        left: 'center',
        // textStyle: {
        //   fontSize: 20,
        // },
        // subtextStyle: {
        //   color: '#175ce5',
        //   fontSize: 15,
        //   fontWeight: 'bold',
        // },
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        valueFormatter: (value: number) => numberForMoney(value),
      },

      legend: {
        data: ['Entrada', 'Saída', 'Saldo'],
        top: '12%',
        left: 'center',
      },

      xAxis: {
        type: 'category',
        data: mesesComparacao,
        axisTick: { alignWithLabel: true },
      },

      yAxis: [
        {
          type: 'value',
          name: 'Valores',
          axisLabel: {
            formatter: (value: number) => numberForMoney(value),
          },
        },
        {
          type: 'value',
          name: 'Saldo',
          position: 'right',
          axisLine: { show: false },
          axisLabel: {
            formatter: (value: number) => numberForMoney(value),
          },
        },
      ],

      series: [
        {
          name: 'Entrada',
          type: 'bar',
          itemStyle: { color: '#38A169' }, // verde
          // barWidth: 35,
          // barGap: '20%',
          // barCategoryGap: '35%',
          data: entradas,
        },
        {
          name: 'Saída',
          type: 'bar',
          itemStyle: { color: '#E53E3E' }, // vermelho
          // barWidth: 35,
          // barGap: '20%',
          barCategoryGap: '35%',
          data: saidas,
        },
        {
          name: 'Saldo',
          type: 'line',
          yAxisIndex: 1,
          smooth: true,
          symbol: 'circle',
          symbolSize: 8,
          lineStyle: {
            color: '#1E88E5',
            // width: 4,
          },
          itemStyle: {
            color: '#1E88E5',
          },
          data: saldos,
        },
      ],
    };
  }, []);
  return (
    <ReactECharts
      onChartReady={(chart) => {
        window.addEventListener('resize', () => chart.resize());
        if (loading) {
          chart.showLoading('default', {
            text: 'Carregando...',
            maskColor: 'rgba(255, 255, 255, 0.6)',
          });
        } else {
          chart.hideLoading();
        }
      }}
      option={options()}
      style={{ height: '295px', width: '100%' }}
      opts={{ locale: 'pt-BR' }}
      notMerge={true}
      lazyUpdate={true}
    />
  );
};

export default GraficoResumoUltimosTresMeses;
