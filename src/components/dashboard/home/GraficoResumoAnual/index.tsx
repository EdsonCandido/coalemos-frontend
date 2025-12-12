import { MESES } from '@/mocks/meses';
import { numberForMoney } from '@/utils/mask';
import { useCallback, useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import { Flex } from '@chakra-ui/react';
const GraficoResumoAnual = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);
  const options = useCallback(() => {
    const entradas = [1200, 1300, 900, 1600, 1400, 1800, 2000, 1900, 1500, 1700, 1800, 2100];
    const saidas = [800, 900, 700, 1000, 950, 1200, 1400, 1300, 1100, 1200, 1250, 1400];

    const saldo = entradas.map((e, i) => e - saidas[i]);

    return {
      title: {
        text: 'Resumo Anual',
        left: 'center',
      },
      tooltip: {
        trigger: 'axis',
        valueFormatter: (value: number) => numberForMoney(value),
      },
      legend: {
        data: ['Entrada', 'Saída', 'Saldo'],
        top: '12%',
        left: 'center',
      },

      xAxis: {
        type: 'category',
        data: MESES,
        // axisLabel: {
        //   rotate: -45,
        //   margin: 12,
        // },
      },

      yAxis: {
        type: 'value',
        axisLabel: {
          formatter: (value: number) => numberForMoney(value),
        },
      },

      series: [
        {
          name: 'Entrada',
          type: 'line',
          smooth: true,
          symbol: 'circle',
          symbolSize: 10,
          lineStyle: { width: 3, color: '#38A169' },
          itemStyle: { color: '#38A169' },
          data: entradas,
          markLine: {
            data: [{ type: 'average', name: 'Média Entrada' }],
          },
        },
        {
          name: 'Saída',
          type: 'line',
          smooth: true,
          symbol: 'circle',
          symbolSize: 10,
          lineStyle: { width: 3, color: '#E53E3E' },
          itemStyle: { color: '#E53E3E' },
          data: saidas,
          markLine: {
            data: [{ type: 'average', name: 'Média Saída' }],
          },
        },
        {
          name: 'Saldo',
          type: 'line',
          smooth: true,
          symbol: 'diamond',
          symbolSize: 12,
          lineStyle: { width: 4, color: '#1E88E5' },
          itemStyle: { color: '#1E88E5' },
          data: saldo,
          markLine: {
            data: [{ type: 'average', name: 'Média Saldo' }],
          },
        },
      ],
    };
  }, []);

  return (
    <Flex w="100%" h="350px">
      <ReactECharts
        notMerge={true}
        lazyUpdate={true}
        option={options()}
        style={{ display: 'block', height: '100%', width: '100%' }}
        opts={{ locale: 'pt-BR' }}
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
      />
    </Flex>
  );
};

export default GraficoResumoAnual;
