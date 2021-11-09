<template>
  <div class="powerWrapper">
    <div class="filterBox">
      <div class="inlineBlock">标准：</div>
      <div class="inlineBlock">
        <Select v-model="standardParams" @on-change="changeStandard" style="width:160px" transfer>
          <Option v-for="item in standard" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </div>
      <div class="inlineBlock">
        <Tooltip placement="bottom-start" width="680px" theme="light">
          <i class="icons helpIcon"></i>
          <div slot="content" class="tooltipContent">
            <h2>标准一</h2>
            <p class="tooltipItem">停电：电压为0~10V</p>
            <p class="tooltipItem">异常低压，电压为10~165V</p>
            <p class="tooltipItem">低电压：电压为165-198V</p>
            <p class="tooltipItem">正常：电压为198-235.4V，即合格</p>
            <p class="tooltipItem">高电压：电压为235.4V-275V</p>
            <p class="tooltipItem">异常高压：电压大于275V</p>
            <h2>标准二</h2>
            <p class="tooltipItem">停电：电压为0~10V</p>
            <p class="tooltipItem">异常低压，电压为10~165V</p>
            <p class="tooltipItem">低电压：电压为165-198V</p>
            <p class="tooltipItem">正常：电压为198-250.8V，即合格</p>
            <p class="tooltipItem">高电压：电压为250.8V-275V</p>
            <p class="tooltipItem">异常高压：电压大于275V</p>
          </div>
        </Tooltip>
      </div>
    </div>
    <Row :gutter="10" class-name="rowStyle">
      <Col span="12">
        <div class="charts">
          <div class="chartsMain">
            <div class="chartsTitle">
              总体电压合格率
              <div class="inlineBlock"></div>
            </div>
            <div class="chartWrapper" ref="allVoltageQualificationRate"></div>
          </div>
        </div>
      </Col>
      <Col span="12">
        <div class="charts">
          <div class="chartsMain">
            <div class="chartsTitle">
              异常变压器一览<Tooltip placement="bottom" width="180" theme="light">
                <i class="icons helpIcon"></i>
                <div slot="content" class="tooltipContent">
                  <p class="tooltipItem">异常变压器指经常发生停电、异常电压、低电压、异常高压的变压器器。本图表显示最近一个月的异常变压器情况。</p>
                </div>
              </Tooltip>
            </div>
            <div class="chartWrapper" ref="abnormalVoltageTransformer"></div>
          </div>
        </div>
      </Col>
    </Row>
    <Row :gutter="10" class-name="rowStyle">
      <Col span="12">
        <div class="charts">
          <div class="chartsMain">
            <div class="chartsTitle">合格率分析</div>
            <div class="filterBox textCenter">
              <div class="inlineBlock">时间口径：</div>
              <div class="inlineBlock largeMarginRight">
                <Select v-model="passRateAnalysisParams.interval" @on-change="changePassRateAnalysisParams" style="width:120px" transfer>
                  <Option v-for="item in timeInterval" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </div>
            </div>
            <div class="chartWrapper" ref="passRatebox"></div>
          </div>
        </div>
      </Col>
      <Col span="12">
        <div class="charts">
          <div class="chartsMain">
            <div class="chartsTitle">
              电压时长分布<Tooltip placement="bottom" width="240px" theme="light">
                <i class="icons helpIcon"></i>
                <div slot="content" class="tooltipContent">
                  <p class="tooltipItem">描述指定时间范围内，各公司所属变压器的停电、异常电压、低电压、异常高压的时长分布。</p>
                </div>
              </Tooltip>
            </div>
            <div class="filterBox textCenter">
              <div class="inlineBlock">时间口径：</div>
              <div class="inlineBlock largeMarginRight">
                <Select @on-change="changeVoltageDuration" v-model="voltageDurationParams.interval" style="width:120px" transfer>
                  <Option v-for="item in timeInterval" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </div>
            </div>
            <div class="chartWrapper" ref="voltageDuration"></div>
          </div>
        </div>
      </Col>
    </Row>
    <Row :gutter="10" class-name="rowStyle">
      <Col>
        <div class="charts">
          <div class="chartsMain">
            <div class="chartsTitle">
              电压台数分布<Tooltip placement="bottom" width="240px" theme="light">
                <i class="icons helpIcon"></i>
                <div slot="content" class="tooltipContent">
                  <p class="tooltipItem">描述指定时间范围内，各公司异常变压器的台数分布。</p>
                </div>
              </Tooltip>
            </div>
            <div class="filterBox textCenter">
              <div class="inlineBlock">时间口径：</div>
              <div class="inlineBlock largeMarginRight">
                <Select v-model="voltageNumberParams.interval" style="width:120px" @on-change="changeVoltageNumberParams" transfer>
                  <Option v-for="item in timeInterval" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </div>
            </div>

            <Row>
              <Col span="6">
                <div class="subTitle">
                  停电<Tooltip placement="bottom-start" width="680px" theme="light">
                    <i class="icons helpIcon"></i>
                    <div slot="content" class="tooltipContent">
                      <h2>标准一</h2>
                      <p class="tooltipItem">停电：电压为0~10V</p>
                      <h2>标准二</h2>
                      <p class="tooltipItem">停电：电压为0~10V</p>
                    </div>
                  </Tooltip>
                </div>
                <div class="chartWrapper" ref="powerCut"></div>
              </Col>
              <Col span="6">
                <div class="subTitle">
                  异常低压<Tooltip placement="bottom-start" width="680px" theme="light">
                    <i class="icons helpIcon"></i>
                    <div slot="content" class="tooltipContent">
                      <h2>标准一</h2>
                      <p class="tooltipItem">异常低压，电压为10~165V</p>
                      <h2>标准二</h2>
                      <p class="tooltipItem">异常低压，电压为10~165V</p>
                    </div>
                  </Tooltip>
                </div>
                <div class="chartWrapper" ref="ultraLow"></div>
              </Col>
              <Col span="6">
                <div class="subTitle">
                  低电压<Tooltip placement="bottom-start" width="680px" theme="light">
                    <i class="icons helpIcon"></i>
                    <div slot="content" class="tooltipContent">
                      <h2>标准一</h2>
                      <p class="tooltipItem">低电压：电压为165-198V</p>
                      <h2>标准二</h2>
                      <p class="tooltipItem">低电压：电压为165-198V</p>
                    </div>
                  </Tooltip>
                </div>
                <div class="chartWrapper" ref="lowVoltage"></div>
              </Col>
              <Col span="6">
                <div class="subTitle">
                  异常高压<Tooltip placement="bottom-start" width="680px" theme="light">
                    <i class="icons helpIcon"></i>
                    <div slot="content" class="tooltipContent">
                      <h2>标准一</h2>
                      <p class="tooltipItem">异常高压：电压大于275V</p>
                      <h2>标准二</h2>
                      <p class="tooltipItem">异常高压：电压大于275V</p>
                    </div>
                  </Tooltip>
                </div>
                <div class="chartWrapper" ref="ultraHigh"></div>
              </Col>
            </Row>
          </div>
        </div>
      </Col>
    </Row>
    <Row :gutter="10" class-name="rowStyle">
      <Col>
        <div class="charts">
          <div class="chartsMain">
            <div class="chartsTitle">
              变压器风险预警<Tooltip placement="bottom" width="240px" theme="light">
                <i class="icons helpIcon"></i>
                <div slot="content" class="tooltipContent">
                  <p class="tooltipItem">描述所选公司（运维单位）的变压器电压质量风险情况，电压质量越低，其风险越高。</p>
                </div>
              </Tooltip>
            </div>
            <div class="filterBox textCenter">
              <div class="inlineBlock">运维单位：</div>
              <div class="inlineBlock largeMarginRight">
                <Select v-model="transformerDangerParams.maintenanceCompanyGroupParam" style="width:120px" @on-change="changeTransformerDanger" transfer>
                  <Option v-for="item in operatingUnits" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </div>
            </div>
            <Row>
              <Col span="6">
                <div class="chartWrapper leftChartWrapper" ref="transformerDanger"></div>
              </Col>
              <Col span="18">
                <div class="subTitle leftText">变压器预警清单</div>
                <div class="tableGrid lightGrid minTableGrid">
                  <Table :columns="transformerDangerColumns" no-data-text="无匹配数据" stripe :data="transformerDangerListData">
                    <template slot-scope="{ row }" slot="riskType">
                      <span>
                        {{ transformerRiskTypeFormat(row.power_quality_day) }}
                      </span>
                    </template>
                    <template slot-scope="{ row }" slot="maintenanceCompany">{{ companyGroup(row.maintenance_company_group) }}</template>
                    <template slot-scope="{ row }" slot="registration_time">{{ $moment(row.registration_time).format('YYYY-MM-DD') }}</template>
                  </Table>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </Col>
    </Row>
    <Row :gutter="10" class-name="rowStyle">
      <Col>
        <div class="charts">
          <div class="chartsMain">
            <div class="chartsTitle">
              线路风险预警<Tooltip placement="bottom" width="240px" theme="light">
                <i class="icons helpIcon"></i>
                <div slot="content" class="tooltipContent">
                  <p class="tooltipItem">描述所选公司（运维单位）所属的线路风险情况，综合线路负荷情况、投运时长、挂接变压器数量及其电压质量等因素计算得到线路风险率，线路风险率越高，线路整体的风险就越大。</p>
                </div>
              </Tooltip>
            </div>
            <div class="filterBox textCenter">
              <div class="inlineBlock">运维单位：</div>
              <div class="inlineBlock largeMarginRight">
                <Select v-model="lineDangerParams.maintenanceCompanyGroupParam" style="width:120px" @on-change="changeLineDanger" transfer>
                  <Option v-for="item in operatingUnits" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </div>
            </div>

            <Row>
              <Col span="6">
                <div class="chartWrapper leftChartWrapper" ref="lineDanger"></div>
              </Col>
              <Col span="18">
                <div class="subTitle leftText">线路预警清单</div>
                <div class="tableGrid lightGrid minTableGrid">
                  <Table :columns="lineDangerColumns" no-data-text="无匹配数据" stripe :data="lineDangerListData">
                    <template slot-scope="{ row }" slot="riskRate">{{ lineRiskTypeFormat(row.risk_rate) }}</template>
                    <template slot-scope="{ row }" slot="maintenanceCompany">{{ companyGroup(row.maintenance_company_group) }}</template>
                    <template slot-scope="{ row }" slot="lineTotalLength">{{ (row.line_total_length || 0).toFixed(2) + '%' }}</template>
                    <template slot-scope="{ row }" slot="risk_rate">{{ (row.risk_rate * 100 || 0).toFixed(2) + '%' }}</template>
                    <template slot-scope="{ row }" slot="commissioning_date">{{ $moment(row.commissioning_date).format('YYYY-MM-DD') }}</template>
                  </Table>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </Col>
    </Row>
  </div>
</template>

<script>
import Ajax from '@/api/tools/customajax'
import { API_BASEURL, API_TIMEOUT } from '@/utils/config'
import { registerShape, Chart } from '@antv/g2'
import DataSet from '@antv/data-set'
export default {
  data() {
    return {
      standardParams: 2,
      // 标准---初始化
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
      // 运维单位---初始化
      operatingUnits: [
        {
          value: -1,
          label: '全部'
        },
        {
          value: 0,
          label: '市中区'
        },
        {
          value: 1,
          label: '沙湾'
        },
        {
          value: 2,
          label: '峨眉'
        },
        {
          value: 3,
          label: '马边'
        },
        {
          value: 4,
          label: '沐川'
        },
        {
          value: 5,
          label: '井研'
        },
        {
          value: 6,
          label: '五通'
        },
        {
          value: 7,
          label: '夹江'
        }
      ],
      // 时间口径--初始化
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
      // 总体电压合格率
      overallVoltageChart: null,
      overallVoltageQualificationRateData: 0,
      // 异常变压器一览
      abnormalVoltageTransformerChart: null,
      abnormalVoltageTransformerData: [],

      // 合格率分析
      passRateAnalysisChart: null,
      passRateAnalysisParams: {
        interval: 1
      },
      passRateAnalysisData: [],
      // 电压时长分布
      voltageDurationChart: null,
      voltageDurationParams: {
        interval: 1
      },
      voltageDurationData: [],
      // 电压台数分布
      voltageNumberParams: {
        interval: 1
      },
      powerCutChart: null,
      ultraLowChart: null,
      lowChart: null,
      ultraHighChart: null,
      voltageNumberData: {
        cut: [],
        ultraLowV: [],
        low: [],
        ultraHigh: []
      },
      // 变压器风险预警
      transformerDangerChart: null,
      transformerDangerParams: {
        maintenanceCompanyGroup: 0,
        maintenanceCompanyGroupParam: 0,
        dataMonth: '2019-10'
      },
      transformerDangerData: [],
      transformerDangerListData: [],
      transformerDangerColumns: [
        {
          key: 'sbmc',
          title: '变压器名称',
          tooltip: true,
          width: 220
        },
        {
          key: 'power_quality_day',
          title: '电压质量'
        },
        {
          // 根据电压质量计算
          // 高风险：电压质量<=30
          // 中风险：电压质量>30,<=50
          // 低风险：电压质量>50
          key: 'power_quality_day',
          title: '风险类型',
          slot: 'riskType'
        },
        {
          key: 'pms_transformer_id',
          title: '设备编码',
          tooltip: true
        },
        {
          key: 'maintenance_company_group_name',
          title: '运维单位',
          // slot:"maintenanceCompany",
          tooltip: true
        },
        {
          key: 'use_nature',
          title: '使用性质',
          tooltip: true
        },
        {
          key: 'standard_home_line_name',
          title: '所属线路',
          tooltip: true
        },
        {
          key: 'registration_time',
          title: '投运时间',
          slot: 'registration_time'
        }
      ],
      // 线路风险预警--查询条件
      lineDangerChart: null,
      lineDangerParams: {
        maintenanceCompanyGroup: 0,
        maintenanceCompanyGroupParam: 0,
        dataMonth: '2019-10'
      },
      lineDangerData: [],
      lineDangerListData: [],
      lineDangerColumns: [
        {
          key: 'device_name',
          title: '线路名称',
          tooltip: true,
          width: 180
        },
        {
          key: 'risk_rate',
          title: '风险率',
          slot: 'risk_rate',
          tooltip: true
        },
        {
          // 高风险：线路风险率>50%；
          // 中风险：线路风险率>20%且≤50%；
          // 低风险：线路风险率≤20%。
          key: 'risk_rate',
          title: '风险类型',
          slot: 'riskRate'
        },
        {
          key: 'pms_line_id',
          title: '设备编码',
          tooltip: true
        },
        {
          key: 'trans_count',
          title: '挂接变压器',
          tooltip: true
        },
        {
          key: 'maintenance_company_group_name',
          title: '运维单位',
          slot: 'maintenanceCompany',
          tooltip: true
        },
        {
          key: 'line_type',
          title: '线路性质',
          tooltip: true
        },
        {
          key: 'line_total_length',
          title: '电缆化率',
          slot: 'lineTotalLength'
        },
        {
          key: 'starting_point_power_station',
          title: '起点电站',
          tooltip: true
        },
        {
          key: 'commissioning_date',
          slot: 'commissioning_date',
          title: '投运时间'
        }
      ],
      transformerParams: {
        sbmc: '', //设备名称
        fenduanYichangType: -1, //电压质量类型（0=停电 1=异常低压 2=低电压 3=正常 4=高电压 5=异常高压）
        startTime: '', //开始时间
        timeInterval: 'day', //时间粒度
        endTime: '', //结束时间
        startTimeStr: '', //开始时间
        endTimeStr: '', //结束时间
        voltageQualityOrder: -1, //电压质量排序（1=正序 2=逆序）
        standard: -1, //标准（1=标准1 2=标准2）
        maintenanceCompanyGroup: -1, //运维单位分组：0为市中区 1.沙湾 2.峨眉 3.马边 4.沐川 5.井研 6.五通 7.夹江
        powerQualityDayType: -1, //电压风险类型(0=高 1=中 2=低)
        page: 1,
        size: 20
      },
      lineParams: {
        sbmc: '', //设备名称
        fenduanYichangType: '', //电压质量类型（0=停电 1=异常低压 2=低电压 3=正常 4=高电压 5=异常高压）
        startTime: '', //开始时间
        timeInterval: 'day', //时间粒度
        endTime: '', //结束时间
        startTimeStr: '', //开始时间
        endTimeStr: '', //结束时间
        lineRiskRateOrder: '', //电压质量排序（1=正序 2=逆序）
        standard: '', //标准（1=标准1 2=标准2）
        maintenanceCompanyGroup: '', //运维单位分组：0为市中区 1.沙湾 2.峨眉 3.马边 4.沐川 5.井研 6.五通 7.夹江
        riskType: '', //电压风险类型(0=高 1=中 2=低)
        page: 1,
        size: 20
      }
    }
  },
  fliter: {
    companyGroup(value) {
      let companyGroupValue = ''
      switch (value) {
        case '0':
          companyGroupValue = '市中区'
          break
      }
      return companyGroupValue
    }
  },
  mounted() {
    // 总体电压合格率
    this.$nextTick(() => {
      this.overallVoltageQualificationRate()
      this.queryVoltageOverview3TimeFrameData()
      this.queryVoltageOverview456TimeFrameData()

      //变压器风险预警
      this.queryVoltageTransformerRiskData()
      this.queryVoltageTransformerRiskListData()
      // 线路风险预警
      this.queryVoltageOverviewLine8LastMonthData()
      this.queryVoltageLineRiskListData()
      // 电压台数分布
      this.queryVoltageNumbers()
      this.setMonth()
    })
  },
  methods: {
    setMonth() {
      var date = new Date()
      let currowYear = date.getFullYear()
      let currowDate = currowYear - 2020
      if (currowDate > 0) {
        return Number(currowYear - 2020) * 12 + date.getMonth() + 2
      } else {
        return date.getMonth() + 2
      }
    },
    transformerRiskTypeFormat(value) {
      // 根据电压质量计算
      // 高风险：电压质量<=30
      // 中风险：电压质量>30,<=50
      // 低风险：电压质量>50
      if (value <= 30) {
        return '高风险'
      } else if (30 < value && value <= 50) {
        return '中风险'
      } else {
        return '低风险'
      }
    },

    lineRiskTypeFormat(value) {
      // 高风险：线路风险率>50%；
      // 中风险：线路风险率>20%且≤50%；
      // 低风险：线路风险率≤20%。
      value = value * 100
      if (value <= 20) {
        return '低风险'
      } else if (20 < value && value <= 50) {
        return '中风险'
      } else {
        return '高风险'
      }
    },
    companyGroup(value) {
      let companyGroupValue = ''
      switch (value) {
        case 0:
          companyGroupValue = '市中区'
          break
        case 1:
          companyGroupValue = '沙湾'
          break
        case 2:
          companyGroupValue = '峨眉'
          break
        case 3:
          companyGroupValue = '马边'
          break
        case 4:
          companyGroupValue = '沐川'
          break
        case 5:
          companyGroupValue = '井研'
          break
        case 6:
          companyGroupValue = '五通'
          break
        case 7:
          companyGroupValue = '夹江'
          break
      }
      return companyGroupValue
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
    // -------------数据
    // 总体电压合格率,异常变压器一览  [完成]
    overallVoltageQualificationRate() {
      Ajax.get(API_BASEURL + '/queryVoltageOverview12MonthData/' + this.standardParams).then(response => {
        if (response.status == 200) {
          if (response.data.meta.code == 1) {
            console.log(response.data)
            // 总体电压合格率
            if (response.data.data.length > 0) {
              this.overallVoltageQualificationRateData = parseInt(response.data.data[0].avgQualifyRate * 10000) / 100
            }
            if (response.data.data.length > 0) {
              let voltageData = response.data.data[0]
              this.abnormalVoltageTransformerData = [
                // {
                //       item: "停电",
                //       typeid: 0,
                //       count: voltageData.sumTypeTingdian,
                //       percent:voltageData.sumTypeTingdian
                //   },
                {
                  item: '异常低压',
                  typeid: 1,
                  count: voltageData.sumTypeUltraLowV,
                  percent: voltageData.sumTypeUltraLowV
                },
                {
                  item: '低电压',
                  typeid: 2,
                  count: voltageData.sumTypeLowV,
                  percent: voltageData.sumTypeLowV
                },
                {
                  item: '异常高压',
                  typeid: 5,
                  count: voltageData.sumTypeUltraHighV,
                  percent: voltageData.sumTypeUltraHighV
                }
              ]
            }

            if (this.overallVoltageChart) {
              this.overallVoltageChart.destroy()
            }
            this.creatAllVoltageQualificationRate()
            if (this.abnormalVoltageTransformerChart) {
              this.abnormalVoltageTransformerChart.changeData(this.abnormalVoltageTransformerData)
            } else {
              this.creatAbnormalVoltageTransformer()
            }
          } else {
            this.$Message.error({
              content: response.data.meta.message
            })
          }
        }
      })
    },
    // 合格率分析
    queryVoltageOverview3TimeFrameData() {
      Ajax.get(API_BASEURL + '/queryVoltageOverview3TimeFrameData?standard=' + this.standardParams + '&' + this.objToStr(this.passRateAnalysisParams)).then(response => {
        if (response.status == 200) {
          if (response.data.meta.code == 1) {
            this.passRateAnalysisData = []
            response.data.data.forEach(item => {
              if (item.isNongwang) {
                this.passRateAnalysisData.push({
                  name: item.maintenanceCompanyGroupName,
                  type: '城网',
                  value: item.avgQualifyRate
                })
              } else {
                this.passRateAnalysisData.push({
                  name: item.maintenanceCompanyGroupName,
                  type: '农网',
                  value: item.avgQualifyRate
                })
              }
            })
            if (this.passRateAnalysisChart) {
              this.passRateAnalysisChart.changeData(this.passRateAnalysisData)
            } else {
              this.creatVoltageOverview3TimeFrameData()
            }
            // this.creatVoltageOverview3TimeFrameData();
          }
        } else {
          this.$Message.error({
            content: response.data.meta.message
          })
        }
      })
    },
    // 电压时长分布
    queryVoltageOverview456TimeFrameData() {
      // 近一年和近三个月使用的接口不一样
      Ajax.get(API_BASEURL + '/queryVoltageOverview456TimeFrameData?standard=' + this.standardParams + '&' + this.objToStr(this.voltageDurationParams)).then(response => {
        if (response.status == 200) {
          if (response.data.meta.code == 1) {
            let datas = response.data.data
            this.voltageDurationData = []
            datas.forEach(item => {
              this.voltageDurationData.push(
                {
                  name: this.companyGroup(item.maintenanceCompanyGroup),
                  type: '停电',
                  value: parseInt(item.voltageDurationDistributionTingdian / 60)
                },
                {
                  name: this.companyGroup(item.maintenanceCompanyGroup),
                  type: '异常低压',
                  value: parseInt(item.voltageDurationDistributionUltraLow / 60)
                },
                {
                  name: this.companyGroup(item.maintenanceCompanyGroup),
                  type: '低电压',
                  value: parseInt(item.voltageDurationDistributionLow / 60)
                },
                {
                  name: this.companyGroup(item.maintenanceCompanyGroup),
                  type: '异常高压',
                  value: parseInt(item.voltageDurationDistributionUltraHigh / 60)
                }
              )
            })

            if (this.voltageDurationChart) {
              this.voltageDurationChart.changeData(this.voltageDurationData)
            } else {
              this.creatVoltageDuration()
            }
            // this.creatVoltageDuration();
          }
        }
      })
    },
    // 电压台数分布
    queryVoltageNumbers() {
      Ajax.get(API_BASEURL + '/queryVoltageOverview5TimeFrameData?standard=' + this.standardParams + '&' + this.objToStr(this.voltageNumberParams)).then(response => {
        if (response.status == 200) {
          if (response.data.meta.code == 1) {
            this.voltageNumberData = {
              cut: [],
              ultraLowV: [],
              low: [],
              ultraHigh: []
            }
            response.data.data.forEach(item => {
              if (item.sumTypeTingdian) {
                this.voltageNumberData.cut.push({
                  name: this.companyGroup(item.maintenanceCompanyGroup),
                  groupId: item.maintenanceCompanyGroup,
                  value: item.sumTypeTingdian
                })
              }
              if (item.sumTypeUltraLowV) {
                this.voltageNumberData.ultraLowV.push({
                  name: this.companyGroup(item.maintenanceCompanyGroup),
                  groupId: item.maintenanceCompanyGroup,
                  value: item.sumTypeUltraLowV
                })
              }
              if (item.sumTypeLowV) {
                this.voltageNumberData.low.push({
                  name: this.companyGroup(item.maintenanceCompanyGroup),
                  groupId: item.maintenanceCompanyGroup,
                  value: item.sumTypeLowV
                })
              }
              if (item.sumTypeUltraHighV) {
                this.voltageNumberData.ultraHigh.push({
                  name: this.companyGroup(item.maintenanceCompanyGroup),
                  groupId: item.maintenanceCompanyGroup,
                  value: item.sumTypeUltraHighV
                })
              }
            })
            if (this.powerCutChart && this.ultraLowChart && this.lowChart && this.ultraHighChart) {
              this.powerCutChart.changeData(this.voltageNumberData.cut)
              this.ultraLowChart.changeData(this.voltageNumberData.ultraLowV)
              this.lowChart.changeData(this.voltageNumberData.low)
              this.ultraHighChart.changeData(this.voltageNumberData.ultraHigh)
            } else {
              this.creatCutVoltage()
              this.creatUltraLowVoltage()
              this.creatLowVoltage()
              this.creatUltraHighVoltage()
            }
          }
        }
      })
    },
    //变压器风险预警
    queryVoltageTransformerRiskData() {
      if (this.transformerDangerParams.maintenanceCompanyGroupParam == -1) {
        this.transformerDangerParams.maintenanceCompanyGroup = ''
      } else {
        this.transformerDangerParams.maintenanceCompanyGroup = this.transformerDangerParams.maintenanceCompanyGroupParam
      }
      Ajax.get(API_BASEURL + '/queryVoltageTransformerRiskData?standard=' + this.standardParams + '&' + this.objToStr(this.transformerDangerParams)).then(response => {
        if (response.status == 200) {
          if (response.data.meta.code == 1) {
            if (response.data.data.length > 1) {
              let high = 0
              let medium = 0
              let low = 0
              response.data.data.forEach(item => {
                high += item.sum_voltage_risk_type_high
                medium += item.sum_voltage_risk_type_medium
                low += item.sum_voltage_risk_type_low
              })
              this.transformerDangerData = []
              if (high) {
                this.transformerDangerData.push({
                  name: '全部',
                  type: '高风险',
                  typeParam: 0,
                  value: high
                })
              }
              if (medium) {
                this.transformerDangerData.push({
                  name: '全部',
                  type: '中风险',
                  typeParam: 1,
                  value: medium
                })
              }
              if (high && medium && low) {
              } else {
                if (low) {
                  this.transformerDangerData.push({
                    name: '全部',
                    type: '低风险',
                    typeParam: 2,
                    value: low
                  })
                }
              }
            } else {
              let dataObj = response.data.data[0]
              this.transformerDangerData = []
              if (dataObj.sum_voltage_risk_type_high) {
                this.transformerDangerData.push({
                  name: this.companyGroup(dataObj.maintenance_company_group),
                  type: '高风险',
                  typeParam: 0,
                  value: dataObj.sum_voltage_risk_type_high
                })
              }
              if (dataObj.sum_voltage_risk_type_medium) {
                this.transformerDangerData.push({
                  name: this.companyGroup(dataObj.maintenance_company_group),
                  type: '中风险',
                  typeParam: 1,
                  value: dataObj.sum_voltage_risk_type_medium
                })
              }
              if (dataObj.sum_voltage_risk_type_high && dataObj.sum_voltage_risk_type_medium && dataObj.sum_voltage_risk_type_low) {
              } else {
                if (dataObj.sum_voltage_risk_type_low) {
                  this.transformerDangerData.push({
                    name: this.companyGroup(dataObj.maintenance_company_group),
                    type: '低风险',
                    typeParam: 2,
                    value: dataObj.sum_voltage_risk_type_low
                  })
                }
              }
            }
            // 渲染图形
            if (this.transformerDangerChart) {
              this.transformerDangerChart.changeData(this.transformerDangerData)
            } else {
              this.creatTransformerDanger()
            }
          }
        }
      })
    },
    // 变压器预警清单
    queryVoltageTransformerRiskListData() {
      Ajax.get(API_BASEURL + '/queryVoltageTransformerRiskListData?standard=' + this.standardParams + '&' + this.objToStr(this.transformerDangerParams)).then(response => {
        if (response.status == 200) {
          if (response.data.meta.code == 1) {
            console.log(response.data.data)
            this.transformerDangerListData = response.data.data.slice(0, 10)
            // this.creatTransformerDanger()
          }
        }
      })
    },
    // 线路风险预警
    queryVoltageOverviewLine8LastMonthData() {
      if (this.lineDangerParams.maintenanceCompanyGroupParam == -1) {
        this.lineDangerParams.maintenanceCompanyGroup = ''
      } else {
        this.lineDangerParams.maintenanceCompanyGroup = this.lineDangerParams.maintenanceCompanyGroupParam
      }
      Ajax.get(API_BASEURL + '/queryVoltageOverviewLine8LastMonthData?standard=' + this.standardParams + '&' + this.objToStr(this.lineDangerParams)).then(response => {
        if (response.status == 200) {
          if (response.data.meta.code == 1) {
            if (response.data.data.length > 1) {
              let high = 0
              let medium = 0
              let low = 0
              response.data.data.forEach(item => {
                high += item.sumRiskTypeHigh
                medium += item.sumRiskTypeMedium
                low += item.sumRiskTypeLow
              })
              this.lineDangerData = []
              if (high) {
                this.lineDangerData.push({
                  name: '全部',
                  type: '高风险',
                  typeid: 0,
                  value: high
                })
              }
              if (medium) {
                this.lineDangerData.push({
                  name: '全部',
                  type: '中风险',
                  typeid: 1,
                  value: medium
                })
              }
              if (low) {
                this.lineDangerData.push({
                  name: '全部',
                  type: '低风险',
                  typeid: 2,
                  value: low
                })
              }
            } else {
              this.lineDangerData = []
              let dataObj = response.data.data[0]
              if (dataObj.sumRiskTypeHigh) {
                this.lineDangerData.push({
                  name: this.companyGroup(dataObj.maintenanceCompanyGroupName),
                  type: '高风险',
                  typeid: 0,
                  value: dataObj.sumRiskTypeHigh
                })
              }
              if (dataObj.sumRiskTypeMedium) {
                this.lineDangerData.push({
                  name: this.companyGroup(dataObj.maintenanceCompanyGroupName),
                  type: '中风险',
                  typeid: 1,
                  value: dataObj.sumRiskTypeMedium
                })
              }
              if (dataObj.sumRiskTypeLow) {
                this.lineDangerData.push({
                  name: this.companyGroup(dataObj.maintenanceCompanyGroupName),
                  type: '低风险',
                  typeid: 2,
                  value: dataObj.sumRiskTypeLow
                })
              }
            }
            if (this.lineDangerChart) {
              this.lineDangerChart.changeData(this.lineDangerData)
            } else {
              this.creatLineformerDanger()
            }
          }
        }
      })
    },
    // 线路预警清单
    queryVoltageLineRiskListData() {
      Ajax.get(API_BASEURL + '/queryVoltageLineRiskListData?standard=' + this.standardParams + '&' + this.objToStr(this.lineDangerParams)).then(response => {
        if (response.status == 200) {
          if (response.data.meta.code == 1) {
            this.lineDangerListData = response.data.data.slice(0, 10)
          }
        }
      })
    },
    // -----------图形
    // 总体电压合格率
    creatAllVoltageQualificationRate() {
      registerShape('point', 'pointer', {
        draw(cfg, container) {
          const group = container.addGroup()
          const center = this.parsePoint({ x: 0, y: 0 }) // 获取极坐标系下画布中心点
          // 绘制指针
          group.addShape('line', {
            attrs: {
              x1: center.x,
              y1: center.y,
              x2: cfg.x,
              y2: cfg.y,
              stroke: cfg.color,
              lineWidth: 5,
              lineCap: 'round'
            }
          })
          group.addShape('circle', {
            attrs: {
              x: center.x,
              y: center.y,
              r: 9.75,
              stroke: cfg.color,
              lineWidth: 5,
              fill: '#fff'
            }
          })
          return group
        }
      })
      const data = [{ value: this.overallVoltageQualificationRateData }]
      let chart = new Chart({
        container: this.$refs.allVoltageQualificationRate,
        autoFit: true,
        height: this.$refs.allVoltageQualificationRate.clientHeight,
        padding: [0, 0, 30, 0]
      })

      chart.data(data)
      this.overallVoltageChart = chart
      chart.scale('value', {
        min: 0,
        max: 100,
        tickInterval: 10
      })
      chart.coordinate('polar', {
        startAngle: (-9 / 8) * Math.PI,
        endAngle: (1 / 8) * Math.PI,
        radius: 0.8
      })

      chart.axis('1', false)
      chart.axis('value', {
        line: null,
        label: {
          offset: -36,
          style: {
            fontSize: 12,
            fill: '#666666',
            textAlign: 'center',
            textBaseline: 'middle'
          }
        },
        subTickLine: {
          count: 4,
          length: -16,
          style: {
            stroke: '#cccccc'
          }
        },
        tickLine: {
          length: -20,
          style: {
            stroke: '#999999'
          }
        },
        grid: null
      })
      chart.legend(false)
      chart
        .point()
        .position('value*10')
        .shape('pointer')
        .color('#f58020')
        .animate({
          appear: {
            animation: 'fade-in'
          }
        })

      // 绘制仪表盘背景
      chart.annotation().arc({
        top: false,
        start: [0, 1],
        end: [100, 1],
        style: {
          // 底灰色
          stroke: '#e9ebf1',
          lineWidth: 24,
          lineDash: null
        }
      })

      // 绘制指标
      chart.annotation().arc({
        start: [0, 1],
        end: [data[0].value, 1],
        style: {
          stroke: '#f58020',
          lineWidth: 24,
          lineDash: null
        }
      })
      // 绘制指标数字
      chart.annotation().text({
        position: ['50%', '85%'],
        content: '合格率',
        style: {
          fontSize: 13,
          fill: '#666666',
          textAlign: 'center'
        }
      })
      chart.annotation().text({
        position: ['50%', '90%'],
        content: `${data[0].value * 1} %`,
        style: {
          fontSize: 16,
          fill: '#333',
          textAlign: 'center'
        },
        offsetY: 16
      })

      chart.render()
    },
    // 异常变压器一览
    creatAbnormalVoltageTransformer() {
      let chart = new Chart({
        container: this.$refs.abnormalVoltageTransformer,
        autoFit: true,
        height: this.$refs.allVoltageQualificationRate.clientHeight,
        padding: [0, 0, 30, 0]
      })

      chart.coordinate('theta', {
        radius: 0.75
      })

      chart.data(this.abnormalVoltageTransformerData)
      this.abnormalVoltageTransformerChart = chart
      chart.scale(
        'percent'
        // , {
        //     formatter: val => {
        //         val = val * 100 + "%";
        //         return val;
        //     }
        // }
      )
      chart.legend('count', {
        position: 'right'
      })
      // chart.tooltip({
      //     showTitle: false,
      //     showMarkers: false
      // });
      chart.on('click', ev => {
        // const target = ev.gEvent.shape; // 可以直接获取

        this.transformerParams.standard = this.standardParams
        this.transformerParams.timeInterval = 'month'
        if (ev.data && ev.data.data) {
          this.transformerParams.fenduanYichangType = ev.data.data.typeid
          // this.transformerParams.maintenanceCompanyGroup = 0;
          this.$router.push({
            path: '/transformer',
            query: { params: JSON.stringify(this.transformerParams) }
          })
        }
      })

      chart
        .interval()

        .adjust('stack')
        .position('percent')
        .label('count', {
          content: data => {
            return `${data.item}: ${data.count}`
          },
          style: {
            fill: '#000000'
          }
        })
        .color('item', ['#5190dc', '#f4be20', '#40d8e1', '#f6a563', '#51dc51', '#e96c5b', '#9967bd', '#657798'])

        .tooltip('item*count', (item, count) => {
          // percent = percent * 100 + "%";
          return {
            name: item,
            value: count
          }
        })

      chart.render()
    },
    // 合格率分析图形
    creatVoltageOverview3TimeFrameData() {
      let chart = new Chart({
        container: this.$refs.passRatebox,
        autoFit: true,
        height: this.$refs.passRatebox.clientHeight
      })

      chart.data(this.passRateAnalysisData)
      chart.scale('avgQualifyRate', {
        nice: true
      })
      this.passRateAnalysisChart = chart
      chart.tooltip({
        showMarkers: false,
        shared: true
      })
      chart.scale('value', {
        //  ticks: [0, 20, 40, 60, 80, 100, 120, 140, 160, 180, 200],
        formatter: val => val * 100 + '%'
      })
      chart
        .interval()
        .position('name*value')
        .color('type', ['#5190dc', '#f4be20', '#40d8e1', '#f6a563', '#51dc51', '#e96c5b', '#9967bd', '#657798'])
        .tooltip('name*type*value', (name, type, value) => {
          // percent = percent * 100 + "%";
          return {
            name: type,
            value: Number(value * 100).toFixed(2) + '%'
          }
        })
        .adjust([
          {
            type: 'dodge',
            marginRatio: 0
          }
        ])
      chart.interaction('active-region')
      chart.render()
    },
    // 电压时长分布
    creatVoltageDuration() {
      let chart = new Chart({
        container: this.$refs.voltageDuration,
        autoFit: true,
        height: this.$refs.voltageDuration.clientHeight
      })
      this.voltageDurationChart = chart
      chart.data(this.voltageDurationData)
      chart.scale('type', {
        nice: true
      })
      chart.tooltip({
        showMarkers: false,
        shared: true
      })
      chart
        .interval()
        .position('name*value')
        .color('type', ['#5190dc', '#f4be20', '#40d8e1', '#f6a563', '#51dc51', '#e96c5b', '#9967bd', '#657798'])
        .tooltip('name*type*value', (name, type, value) => {
          // percent = percent * 100 + "%";
          return {
            name: type,
            value: value + '小时'
          }
        })
        .adjust([
          {
            type: 'dodge',
            marginRatio: 0
          }
        ])

      chart.interaction('active-region')

      chart.render()
    },
    changeVoltageDuration(v) {
      this.voltageDurationParams.interval = v
      this.queryVoltageOverview456TimeFrameData()
    },
    //变压器风险预警-图形
    creatTransformerDanger() {
      let chart = new Chart({
        container: this.$refs.transformerDanger,
        autoFit: true,
        height: this.$refs.transformerDanger.clientHeight,
        padding: 30
      })

      chart.coordinate('theta', {
        radius: 0.6
      })
      this.transformerDangerChart = chart
      chart.data(this.transformerDangerData)
      chart.scale('value')
      chart.tooltip({
        showTitle: false,
        showMarkers: false
      })

      chart
        .interval()
        .adjust('stack')
        .position('value')
        .label('type', {
          offset: 20,
          content: data => {
            return `${data.type}: ${data.value}`
          },
          style: {
            fontSize: 12,
            lfill: '#000000'
          }
        })
        .color('type', ['#5190dc', '#f4be20', '#40d8e1', '#f6a563', '#51dc51', '#e96c5b', '#9967bd', '#657798'])

        .tooltip('type*value', (item, count) => {
          return {
            name: item,
            value: count
          }
        })
      chart.on('click', ev => {
        const target = ev.gEvent.shape // 可以直接获取 shape
        console.log(ev)

        this.transformerParams.standard = this.standardParams
        if (ev.data && ev.data.data) {
          this.transformerParams.powerQualityDayType = ev.data.data.typeParam
          this.transformerParams.maintenanceCompanyGroup = this.transformerDangerParams.maintenanceCompanyGroupParam
          this.transformerParams.timeInterval = 'month'
          this.$router.push({
            path: '/transformer',
            query: { params: JSON.stringify(this.transformerParams) }
          })
        }
      })

      chart.render()
    },
    //线路风险预警-图形
    creatLineformerDanger() {
      // if(this.lineDangerChart){
      //   this.lineDangerChart.destroy()
      // }
      let chart = new Chart({
        container: this.$refs.lineDanger,
        autoFit: true,
        height: this.$refs.lineDanger.clientHeight,
        padding: 30
      })

      chart.coordinate('theta', {
        radius: 0.6
      })
      this.lineDangerChart = chart
      chart.data(this.lineDangerData)
      chart.scale('value')
      chart.tooltip({
        showTitle: false,
        showMarkers: false
      })
      chart
        .interval()
        .adjust('stack')
        .position('value')
        .label('type', {
          offset: 20,
          content: data => {
            return `${data.type}: ${data.value}`
          },
          style: {
            fontSize: 12,
            lfill: '#000000'
          }
        })
        .color('type', ['#5190dc', '#f4be20', '#40d8e1', '#f6a563', '#51dc51', '#e96c5b', '#9967bd', '#657798'])

        .tooltip('type*value', (item, count) => {
          // percent = percent * 100 + "%";
          return {
            name: item,
            value: count
          }
        })
      chart.on('click', ev => {
        // const target = ev.gEvent.shape; // 可以直接获取

        this.lineParams.standard = this.standardParams
        this.lineParams.timeInterval = 'month'
        if (ev.data && ev.data.data) {
          this.lineParams.riskType = ev.data.data.typeid
          this.lineParams.maintenanceCompanyGroup = this.lineDangerParams.maintenanceCompanyGroup
          this.$router.push({
            path: '/line',
            query: { params: JSON.stringify(this.lineParams) }
          })
        }
      })
      chart.render()
    },
    changeTransformerDanger(v) {
      this.transformerDangerParams.maintenanceCompanyGroup = v
      this.queryVoltageTransformerRiskData()
      this.queryVoltageTransformerRiskListData()
    },
    changeLineDanger(v) {
      this.lineDangerParams.maintenanceCompanyGroup = v
      this.queryVoltageOverviewLine8LastMonthData()
      this.queryVoltageLineRiskListData()
    },
    // 停电
    creatCutVoltage() {
      let chart = new Chart({
        container: this.$refs.powerCut,
        autoFit: true,
        height: this.$refs.powerCut.clientHeight,
        padding: [0, 0, 30, 0]
      })

      chart.coordinate('theta', {
        radius: 0.6
      })
      this.powerCutChart = chart
      chart.data(this.voltageNumberData.cut)
      chart.scale('value', {
        // formatter: val => {
        //   val = val * 100 + "%";
        //   return val;
        // }
      })
      // chart.legend("type", {
      //   position: "center"
      // });
      chart.tooltip({
        showTitle: false,
        showMarkers: false
      })

      chart
        .interval()
        .adjust('stack')
        .position('value')
        .label('name', {
          offset: 20,
          content: data => {
            return `${data.name}: ${data.value}`
          },
          style: {
            fontSize: 12,
            lfill: '#000000'
          }
        })
        .color('name', ['#5190dc', '#f4be20', '#40d8e1', '#f6a563', '#51dc51', '#e96c5b', '#9967bd', '#657798'])

        .tooltip('name*value', (item, count) => {
          // percent = percent * 100 + "%";
          return {
            name: item,
            value: count
          }
        })
      chart.on('click', ev => {
        const target = ev.gEvent.shape // 可以直接获取 shape
        this.transformerParams.fenduanYichangType = 0
        this.transformerParams.standard = this.standardParams
        if (ev.data && ev.data.data) {
          console.log(ev.data.data)
          this.transformerParams.maintenanceCompanyGroup = ev.data.data.groupId
          this.transformerParams.timeInterval = 'month'
          this.$router.push({
            path: '/transformer',
            query: { params: JSON.stringify(this.transformerParams) }
          })
        }
      })
      chart.render()
    },
    // 异常低压
    creatUltraLowVoltage() {
      let chart = new Chart({
        container: this.$refs.ultraLow,
        autoFit: true,
        height: this.$refs.ultraLow.clientHeight,
        padding: [0, 0, 30, 0]
      })

      chart.coordinate('theta', {
        radius: 0.6
      })
      this.ultraLowChart = chart
      chart.data(this.voltageNumberData.ultraLowV)
      chart.scale('value', {
        // formatter: val => {
        //   val = val * 100 + "%";
        //   return val;
        // }
      })
      // chart.legend("type", {
      //   position: "center"
      // });
      chart.tooltip({
        showTitle: false,
        showMarkers: false
      })
      chart.on('click', ev => {
        const target = ev.gEvent.shape // 可以直接获取 shape
        this.transformerParams.fenduanYichangType = 1
        this.transformerParams.standard = this.standardParams
        if (ev.data && ev.data.data) {
          this.transformerParams.maintenanceCompanyGroup = ev.data.data.groupId
          this.transformerParams.timeInterval = 'month'
          this.$router.push({
            path: '/transformer',
            query: { params: JSON.stringify(this.transformerParams) }
          })
        }
      })
      chart
        .interval()
        .adjust('stack')
        .position('value')
        .label('name', {
          offset: 20,
          content: data => {
            return `${data.name}: ${data.value}`
          },
          style: {
            fontSize: 12,
            lfill: '#000000'
          }
        })
        .color('name', ['#5190dc', '#f4be20', '#40d8e1', '#f6a563', '#51dc51', '#e96c5b', '#9967bd', '#657798'])

        .tooltip('name*value', (item, count) => {
          // percent = percent * 100 + "%";
          return {
            name: item,
            value: count
          }
        })

      chart.render()
    },
    // 低电压
    creatLowVoltage() {
      let chart = new Chart({
        container: this.$refs.lowVoltage,
        autoFit: true,
        height: this.$refs.lowVoltage.clientHeight,
        padding: [0, 0, 30, 0]
      })

      chart.coordinate('theta', {
        radius: 0.6
      })
      this.lowChart = chart
      chart.data(this.voltageNumberData.low)
      chart.scale('value', {
        // formatter: val => {
        //   val = val * 100 + "%";
        //   return val;
        // }
      })
      // chart.legend("type", {
      //   position: "center"
      // });
      chart.tooltip({
        showTitle: false,
        showMarkers: false
      })

      chart
        .interval()
        .adjust('stack')
        .position('value')
        .label('name', {
          offset: 20,
          content: data => {
            return `${data.name}: ${data.value}`
          },
          style: {
            fontSize: 12,
            lfill: '#000000'
          }
        })
        .color('name', ['#5190dc', '#f4be20', '#40d8e1', '#f6a563', '#51dc51', '#e96c5b', '#9967bd', '#657798'])

        .tooltip('name*value', (item, count) => {
          // percent = percent * 100 + "%";
          return {
            name: item,
            value: count
          }
        })
      chart.on('click', ev => {
        const target = ev.gEvent.shape // 可以直接获取 shape
        this.transformerParams.fenduanYichangType = 2
        this.transformerParams.standard = this.standardParams
        if (ev.data && ev.data.data) {
          this.transformerParams.maintenanceCompanyGroup = ev.data.data.groupId
          this.transformerParams.timeInterval = 'month'
          this.$router.push({
            path: '/transformer',
            query: { params: JSON.stringify(this.transformerParams) }
          })
        }
      })
      chart.render()
    },
    // 异常高压
    creatUltraHighVoltage() {
      let chart = new Chart({
        container: this.$refs.ultraHigh,
        autoFit: true,
        height: this.$refs.ultraHigh.clientHeight,
        padding: [0, 0, 30, 0]
      })

      chart.coordinate('theta', {
        radius: 0.6
      })
      this.ultraHighChart = chart
      chart.data(this.voltageNumberData.ultraHigh)
      chart.scale('value', {
        // formatter: val => {
        //   val = val * 100 + "%";
        //   return val;
        // }
      })
      // chart.legend("type", {
      //   position: "center"
      // });
      chart.tooltip({
        showTitle: false,
        showMarkers: false
      })
      chart.on('click', ev => {
        const target = ev.gEvent.shape // 可以直接获取 shape
        this.transformerParams.fenduanYichangType = 5
        this.transformerParams.standard = this.standardParams
        if (ev.data && ev.data.data) {
          this.transformerParams.maintenanceCompanyGroup = ev.data.data.groupId
          this.transformerParams.timeInterval = 'month'
          this.$router.push({
            path: '/transformer',
            query: { params: JSON.stringify(this.transformerParams) }
          })
        }
      })
      chart
        .interval()
        .adjust('stack')
        .position('value')
        .label('name', {
          offset: 20,
          content: data => {
            return `${data.name}: ${data.value}`
          },
          style: {
            fontSize: 12,
            lfill: '#000000'
          }
        })
        .color('name', ['#5190dc', '#f4be20', '#40d8e1', '#f6a563', '#51dc51', '#e96c5b', '#9967bd', '#657798'])

        .tooltip('name*value', (item, count) => {
          // percent = percent * 100 + "%";
          return {
            name: item,
            value: count
          }
        })

      chart.render()
    },

    changePassRateAnalysisParams(v) {
      this.passRateAnalysisParams.interval = v
      this.queryVoltageOverview3TimeFrameData()
    },
    changeVoltageNumberParams(v) {
      this.voltageNumberParams.interval = v
      this.queryVoltageNumbers()
    },
    changeStandard() {
      // 总体电压合格率
      this.overallVoltageQualificationRate()
      this.queryVoltageOverview3TimeFrameData()
      this.queryVoltageOverview456TimeFrameData()

      //变压器风险预警
      this.queryVoltageTransformerRiskData()
      this.queryVoltageTransformerRiskListData()
      // 线路风险预警
      this.queryVoltageOverviewLine8LastMonthData()
      this.queryVoltageLineRiskListData()
      // 电压台数分布
      this.queryVoltageNumbers()
    }
  }
}
</script>
