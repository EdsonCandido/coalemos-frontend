import { numberForMoney } from '@/utils/mask';
import { useCallback, useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import { Flex } from '@chakra-ui/react';

type ReceitaDia = {
  dia: number;
  valor: number;
};
const GraficoReceitasDia = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const options = useCallback(() => {
    const receitas: ReceitaDia[] = [
      { dia: 2, valor: 150 },
      { dia: 5, valor: 320 },
      { dia: 9, valor: 180 },
      { dia: 13, valor: 250 },
    ];

    const dias = Array.from({ length: 31 }, (_, i) => i + 1);

    const mapaReceitas = new Map<number, number>();
    receitas.forEach((item) => mapaReceitas.set(item.dia, item.valor));

    const receitasCompletas = dias.map((dia) => mapaReceitas.get(dia) ?? 0);

    return {
      title: {
        text: 'Receitas por Dia',
        left: 'center',
      },
      tooltip: {
        trigger: 'axis',
        valueFormatter: (value: number) => numberForMoney(value),
      },
      xAxis: {
        type: 'category',
        data: dias.map(String),
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          formatter: (value: number) => numberForMoney(value),
        },
      },
      series: [
        {
          name: 'Receitas',
          type: 'line',
          smooth: true,
          symbol: 'circle',
          symbolSize: 8,
          lineStyle: { width: 3, color: '#2B6CB0' },
          itemStyle: { color: '#2B6CB0' },
          areaStyle: {
            opacity: 0.15,
            color: '#2B6CB0',
          },
          data: receitasCompletas,
          markLine: {
            data: [{ type: 'average', name: 'Média' }],
          },
        },
      ],
    };
  }, []);

  return (
    <Flex w="100%" h="350px" flex={1}>
      <ReactECharts
        notMerge={true}
        lazyUpdate={true}
        option={options()}
        style={{
          width: '100%',
          height: '100%',
        }}
        onChartReady={(chart) => {
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

export default GraficoReceitasDia;
