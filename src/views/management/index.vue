<template>
  <div class="powerWrapper">
    <div class="dataWrapper">
      <Row :gutter="10" class-name="rowStyle">
        <Col>
          <div class="charts">
            <div class="chartsMain">
              <div class="chartsTitle">
                台区首末端电压对比
                <Tooltip placement="bottom" width="240px" theme="light">
                  <i class="icons helpIcon"></i>
                  <div slot="content" class="tooltipContent">
                    <p class="tooltipItem">描述台区首端变压器和末端电压监测设备的电压对比。</p>
                  </div>
                </Tooltip>
              </div>
              <div class="filterBox textCenter">
                <div class="inlineBlock">选择时间：</div>
                <div class="inlineBlock largeMarginRight">
                  <Select v-model="voltageComparisonParams.intervalParam" style="width:120px" @on-change="changeVoltageComparisonInterval" transfer>
                    <Option v-for="item in timeInterval" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </div>
              </div>
              <div class="subChartWrapper">
                <Row>
                  <Col span="8">
                    <div class="chartWrapper" ref="voltageComparison"></div>
                  </Col>
                  <Col span="16">
                    <div class="tableGrid lightGrid minTableGrid">
                      <Table :columns="voltageComparisonColumns" no-data-text="无匹配数据" stripe :data="voltageComparisonListData">
                        <template slot-scope="{ row }" slot="attrition">{{ (row.attritionRate * 100).toFixed(2) + '%' }}</template>

                        <!-- <template slot-scope="{ row }" slot="powerEvaluations">
                          {{formatPowerEvaluation(row.powerEvaluation)}}
                        </template>-->
                      </Table>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          </div>
        </Col>
      </Row>
      <Row :gutter="10" class-name="rowStyle">
        <Col>
          <div class="charts">
            <div class="chartsMain">
              <div class="chartsTitle">
                小区供电电压质量评估<Tooltip placement="bottom" width="240px" theme="light">
                  <i class="icons helpIcon"></i>
                  <div slot="content" class="tooltipContent">
                    <p class="tooltipItem">描述指定时间范围内小区的电压质量评估，根据小区配变的电压质量、合格率等综合计算得出。</p>
                  </div>
                </Tooltip>
              </div>
              <div class="filterBox textCenter">
                <div class="inlineBlock">标准：</div>
                <div class="inlineBlock">
                  <Select v-model="cellVoltageParams.standard" @on-change="changeCellVoltageStandard" style="width:120px" transfer>
                    <Option v-for="item in standard" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </div>
                <div class="inlineBlock largeMarginRight">
                  <Tooltip placement="bottom" theme="light">
                    <i class="icons helpIcon"></i>
                    <div slot="content" style="width:240px" class="tooltipContent">
                      <p class="tooltipItem">标准1：电压为198-235.4的为合格</p>
                      <p class="tooltipItem">标准2：电压为198-250.8的为合格</p>
                    </div>
                  </Tooltip>
                </div>
                <div class="inlineBlock">选择时间：</div>
                <div class="inlineBlock largeMarginRight">
                  <Select v-model="cellVoltageParams.intervalParam" @on-change="changeCellVoltageInterval" style="width:120px" transfer>
                    <Option v-for="item in timeInterval" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </div>
              </div>
              <div class="chartWrapper">
                <Row>
                  <Col span="8">
                    <div class="chartWrapper" ref="cellVoltage"></div>
                  </Col>
                  <Col span="16">
                    <div class="tableGrid lightGrid minTableGrid">
                      <Table :columns="cellVoltageColumns" no-data-text="无匹配数据" stripe :data="cellVoltageListData">
                        <template slot-scope="{ row }" slot="passRate">{{ (row.voltagePercentPass * 100).toFixed(2) + '%' }}</template>

                        <template slot-scope="{ row }" slot="powerEvaluation">{{ formatPowerEvaluation(row.powerEvaluation) }}</template>
                      </Table>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  </div>
</template>
<script>
import Ajax from '@/api/tools/customajax'
import { API_BASEURL, API_TIMEOUT } from '@/utils/config'
import { registerShape, Chart } from '@antv/g2'
export default {
  data() {
    return {
      standard: [
        {
          value: 1,
          label: '标准一'
        },
        {
          value: 2,
          label: '标准二'
        }
      ],
      timeInterval: [
        {
          value: 1,
          label: '近一个月'
        },
        {
          value: 3,
          label: '近三个月'
        },
        {
          value: 12,
          label: '近一年'
        }
      ],
      // 台区首末端电压对比
      voltageComparisonParams: {
        interval: 1,
        intervalParam: 1
      },
      voltageComparisonChart: null,
      voltageComparisonData: [],
      voltageComparisonListData: [],
      voltageComparisonColumns: [
        {
          key: 'pmsTransformerName',
          title: '变压器名称',
          tooltip: true,
          width: 240
        },
        // 修改
        {
          key: 'platformName',
          title: '所属台区',
          tooltip: true,
          width: 240
        },
        // {
        //   key: "dataMonth",
        //   title: "时间"
        // },
        {
          key: 'avgVoltage',
          title: '首端平均电压'
        },
        {
          key: 'avgDeviceVoltage',
          title: '末端平均电压'
        },
        {
          key: 'attritionRate',
          title: '损耗率',
          slot: 'attrition'
        }
      ],
      // 小区电压概况
      cellVoltageParams: {
        interval: 1,
        intervalParam: 1,
        standard: 1
      },
      cellVoltageChart: null,
      cellVoltageData: [],
      cellVoltageListData: [],
      cellVoltageColumns: [
        {
          key: 'neighborhoodUnitName',
          title: '小区名称',
          width: 180
        },
        {
          key: 'pmsTransformerNum',
          title: '配变数量'
        },
        {
          key: 'voltagePercentPass',
          title: '电压合格率',
          slot: 'passRate'
        },
        {
          key: 'powerEvaluation',
          title: '小区用电评估',
          slot: 'powerEvaluation'
        }
      ]
    }
  },
  mounted() {
    this.queryVoltageComparison()
    this.cellVoltage()
    this.dwvoltageneighborhoodunitpowergraph()
    this.dwvoltageplatformvoltageTransformergraph()
  },
  methods: {
    formatPowerEvaluation(value) {
      let powerEvaluation = ''
      switch (value) {
        case '1':
          powerEvaluation = '优'
          break
        case '2':
          powerEvaluation = '良'
          break
        case '3':
          powerEvaluation = '差'
          break
      }
      return powerEvaluation
    },
    objToStr(obj) {
      let paramArr = Object.keys(obj).reduce((acc, cur) => {
        if (obj[cur] !== -1 && obj[cur] !== '' && obj[cur] != undefined) {
          acc.push(cur + '=' + obj[cur])
        }
        return acc
      }, [])
      return paramArr.join('&')
    },
    // 台区首末端电压对比
    queryVoltageComparison() {
      this.voltageComparisonParams.interval = this.voltageComparisonParams.intervalParam
      Ajax.get(API_BASEURL + '/dwvoltageplatformvoltageTransformerInfo?' + this.objToStr(this.voltageComparisonParams)).then(response => {
        if (response.status == 200) {
          if (response.data.meta.code == 1) {
            this.voltageComparisonListData = response.data.data.slice(0, 10)
          }
        }
      })
    },
    dwvoltageplatformvoltageTransformergraph() {
      this.voltageComparisonParams.interval = this.voltageComparisonParams.intervalParam
      Ajax.get(API_BASEURL + '/dwvoltageplatformvoltageTransformergraph?' + this.objToStr(this.voltageComparisonParams)).then(response => {
        if (response.status == 200) {
          if (response.data.meta.code == 1) {
            this.voltageComparisonData = response.data.data
            this.voltageComparisonData.forEach(item => {
              switch (item.type) {
                case 'less':
                  this.$set(item, 'type', '首端<末端')
                  break
                case 'equal':
                  this.$set(item, 'type', '首端=末端')
                  break
                case 'greater':
                  this.$set(item, 'type', '首端>末端')
                  break
              }
            })
            //setTimeout(() => {
            if (this.voltageComparisonChart) {
              this.voltageComparisonChart.changeData(this.voltageComparisonData)
            } else {
              this.creatVoltageComparison()
            }
            //}, 500);
          }
        }
      })
    },
    creatVoltageComparison() {
      const chart = new Chart({
        container: this.$refs.voltageComparison,
        autoFit: true,
        height: this.$refs.voltageComparison.clientHeight
      })
      chart.coordinate('theta', {
        radius: 0.75
      })
      this.voltageComparisonChart = chart
      chart.data(this.voltageComparisonData)

      chart.scale('value')

      chart.tooltip({
        showTitle: false,
        showMarkers: false
      })

      chart
        .interval()
        .adjust('stack')
        .position('value')
        .color('type', ['#5190dc', '#f4be20', '#40d8e1', '#f6a563', '#51dc51', '#e96c5b', '#9967bd', '#657798'])
        .label('type', {
          style: {
            textAlign: 'center',
            fontSize: 13
          },
          content: data => {
            return `${data.type}: ${data.value}`
          }
        })
      chart.render()
    },
    // 小区电压概况
    dwvoltageneighborhoodunitpowergraph() {
      this.cellVoltageParams.interval = this.cellVoltageParams.intervalParam
      Ajax.get(API_BASEURL + '/dwvoltageneighborhoodunitpowergraph?' + this.objToStr(this.cellVoltageParams)).then(response => {
        if (response.status == 200) {
          if (response.data.meta.code == 1) {
            this.cellVoltageData = response.data.data
            for (let i = 0; i < this.cellVoltageData.length; i++) {
              if (this.cellVoltageData[i].type == 'bad') {
                this.cellVoltageData[i].type = '差'
              } else if (this.cellVoltageData[i].type == 'excellent') {
                this.cellVoltageData[i].type = '优'
              } else {
                this.cellVoltageData[i].type = '良'
              }
            }
            if (this.cellVoltageChart) {
              this.cellVoltageChart.changeData(this.cellVoltageData)
            } else {
              this.creatCellVoltage()
            }
          }
        }
      })
    },
    cellVoltage() {
      Ajax.get(API_BASEURL + '/dwvoltageneighborhoodunitpowerinfo?' + this.objToStr(this.cellVoltageParams)).then(response => {
        if (response.status == 200) {
          if (response.data.meta.code == 1) {
            this.cellVoltageListData = response.data.data.slice(0, 10)
            // 更新数据完后，重新加载数据
            // this.creatCellVoltage()
            // if(this.cellVoltageChart){
            //   this.cellVoltageChart.changeData(this.cellVoltageData)
            // }else{
            //   this.creatCellVoltage()
            // }
          }
        }
      })
    },
    creatCellVoltage() {
      const chart = new Chart({
        container: this.$refs.cellVoltage,
        autoFit: true,
        height: this.$refs.cellVoltage.clientHeight
      })
      chart.coordinate('theta', {
        radius: 0.75
      })
      this.cellVoltageChart = chart
      chart.data(this.cellVoltageData)

      chart.scale('value')

      chart.tooltip({
        showTitle: false,
        showMarkers: false
      })

      chart
        .interval()
        .adjust('stack')
        .position('value')
        .color('type', ['#5190dc', '#f4be20', '#40d8e1', '#f6a563', '#51dc51', '#e96c5b', '#9967bd', '#657798'])
        .label('type', {
          style: {
            textAlign: 'center',
            fontSize: 13
          },
          content: data => {
            return `${data.type}: ${data.value}`
          }
        })
      chart.render()
    },
    changeCellVoltageStandard(v) {
      this.dwvoltageneighborhoodunitpowergraph()
      this.cellVoltage()
    },
    changeCellVoltageInterval(v) {
      this.dwvoltageneighborhoodunitpowergraph()
      this.cellVoltage()
    },
    changeVoltageComparisonInterval() {
      this.queryVoltageComparison()
      this.dwvoltageplatformvoltageTransformergraph()
    }
  }
}
</script>
