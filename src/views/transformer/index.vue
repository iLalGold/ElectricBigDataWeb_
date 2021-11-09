<template>
  <div class="powerWrapper">
    <div class="filterBox">
      <Row class-name="rowStyle">
        <Col span="6">
        <div class="inlineBlock formLable">配网变压器名称：</div>
        <div class="inlineBlock">
          <Input
            v-model="transformerParams.sbmcParam"
            placeholder="配网变压器名称"
            style="width: 160px"
          />
        </div>
        </Col>
        <Col span="5">
        <div class="inlineBlock formLable">时间粒度：</div>
        <div class="inlineBlock">
          <Select
            v-model="transformerParams.timeInterval"
            style="width:80px"
            transfer
          >
            <Option
              v-for="item in timeInterval"
              :value="item.value"
              :key="item.value"
            >{{ item.label }}</Option>
          </Select>
        </div>
        </Col>
        <Col span="8">
        <div class="inlineBlock formLable">选择时间：</div>
        <div class="inlineBlock">
          <DatePicker
            show-week-numbers
            :options="options"
            @on-change="changeStartTime"
            placement="bottom-end"
            placeholder="开始日期"
            style="width: 120px"
            :start-date="new Date(2019, 1, 1)"
            v-if="transformerParams.timeInterval=='day'"
          ></DatePicker>
          <DatePicker
            show-week-numbers
            :options="options"
            @on-change="changeEndTime"
            placement="bottom-end"
            placeholder="结束"
            style="width: 120px"
            :start-date="new Date(2019, 1, 1)"
            v-if="transformerParams.timeInterval=='day'"
          ></DatePicker>

          <DatePicker
            type="month"
            :options="options"
            @on-change="changeStartTimeMonth"
            placement="bottom-end"
            placeholder="开始月份"
            style="width: 100px"
            :start-date="new Date(2019, 1, 1)"
            v-if="transformerParams.timeInterval=='month'"
          ></DatePicker>

          <DatePicker
            type="month"
            :options="options"
            @on-change="changeEndTimeMonth"
            placement="bottom-end"
            placeholder="结束月份"
            style="width: 100px"
            :start-date="new Date(2019, 1, 1)"
            v-if="transformerParams.timeInterval=='month'"
          ></DatePicker>

          <DatePicker
            type="year"
            @on-change="changeStartTimeYear"
            placement="bottom-end"
            placeholder="开始年份"
            style="width: 100px"
            v-if="transformerParams.timeInterval=='year'"
          ></DatePicker>
          <DatePicker
            type="year"
            @on-change="changeEndTimeYear"
            placement="bottom-end"
            placeholder="结束年份"
            style="width: 100px"
            v-if="transformerParams.timeInterval=='year'"
          ></DatePicker>
        </div>
        </Col>
        <Col span="5">
        <div class="inlineBlock formLable">运维单位：</div>
        <div class="inlineBlock">
          <Select
            v-model="transformerParams.maintenanceCompanyGroup"
            style="width:120px"
            transfer
          >
            <Option
              v-for="item in operatingUnits"
              :value="item.value"
              :key="item.value"
            >{{ item.label }}</Option>
          </Select>
        </div>
        </Col>
      </Row>
      <Row class-name="rowStyle">
        <Col span="6">
        <div class="inlineBlock formLable">电压质量类型：</div>
        <div class="inlineBlock">
          <Select
            v-model="transformerParams.fenduanYichangType"
            style="width:160px"
            transfer
          >
            <Option
              v-for="item in fenduanYichangType"
              :value="item.value"
              :key="item.value"
            >{{ item.label }}</Option>
          </Select>
        </div>
        </Col>
        <Col span="5">
        <div class="inlineBlock formLable">电压质量排序：</div>
        <div class="inlineBlock">
          <Select
            v-model="transformerParams.voltageQualityOrder"
            style="width:80px"
            transfer
          >
            <Option
              v-for="item in voltageQualityOrder"
              :value="item.value"
              :key="item.value"
            >{{ item.label }}</Option>
          </Select>
        </div>
        </Col>
        <Col span="8">
        <div class="inlineBlock formLable">标准：</div>
        <div class="inlineBlock">
          <Select
            v-model="transformerParams.standard"
            style="width:160px"
            transfer
          >
            <Option
              v-for="(item,index) in standard"
              :value="parseInt(item.value)"
              :key="index"
            >{{ item.label }}</Option>
          </Select>
        </div>
        <div class="inlineBlock">
          <Tooltip
            placement="bottom"
            theme="light"
            transfer
          >
            <i class="icons helpIcon"></i>
            <div
              slot="content"
              class="tooltipContent"
            >
              <Row style="width:520px">
                <Col span="12">
                <h2>标准一</h2>
                <p class="tooltipItem tooltipItemPadding">
                  <i class="statusIcon tingdian"></i>停电：电压为0~10V
                </p>
                <p class="tooltipItem tooltipItemPadding">
                  <i class="statusIcon ultraLowV"></i>异常低压，电压为10~165V
                </p>
                <p class="tooltipItem tooltipItemPadding">
                  <i class="statusIcon lowV"></i>低电压：电压为165-198V
                </p>
                <p class="tooltipItem tooltipItemPadding">
                  <i class="statusIcon normalV"></i>正常：电压为198-235.4V，即合格
                </p>
                <p class="tooltipItem tooltipItemPadding">
                  <i class="statusIcon highV"></i>高电压：电压为235.4V-275V
                </p>
                <p class="tooltipItem tooltipItemPadding">
                  <i class="statusIcon ultraHighV"></i>异常高压：电压大于275V
                </p>
                </Col>
                <Col span="12">
                <h2>标准二</h2>
                <p class="tooltipItem tooltipItemPadding">
                  <i class="statusIcon tingdian"></i>停电：电压为0~10V
                </p>
                <p class="tooltipItem tooltipItemPadding">
                  <i class="statusIcon ultraLowV"></i>异常低压，电压为10~165V
                </p>
                <p class="tooltipItem tooltipItemPadding">
                  <i class="statusIcon lowV"></i>低电压：电压为165-198V
                </p>
                <p class="tooltipItem tooltipItemPadding">
                  <i class="statusIcon normalV"></i>正常：电压为198-250.8V，即合格
                </p>
                <p class="tooltipItem tooltipItemPadding">
                  <i class="statusIcon highV"></i>高电压：电压为250.8V-275V
                </p>
                <p class="tooltipItem tooltipItemPadding">
                  <i class="statusIcon ultraHighV"></i>异常高压：电压大于275V
                </p>
                </Col>
              </Row>
            </div>
          </Tooltip>
        </div>
        </Col>
        <Col span="5">
        <div class="inlineBlock formLable">电压风险类型：</div>
        <div class="inlineBlock">
          <Select
            v-model="transformerParams.powerQualityDayType"
            style="width:120px"
            transfer
          >
            <Option
              v-for="item in powerQualityDayType"
              :value="item.value"
              :key="item.value"
            >{{ item.label }}</Option>
          </Select>
        </div>
        </Col>
      </Row>
    </div>
    <div class="rowLine"></div>
    <div class="filterBtnGroup">
      <span class="btnBlock">
        <Button
          shape="circle"
          type="primary"
          :loading="loadingStatus"
          class="queryBtn"
          @click="queryTransformer"
        >
          <span v-if="!loadingStatus">查询</span>
          <span v-else>查询中…</span>
        </Button>
      </span>
      <span class="btnBlock">
        <Button
          shape="circle"
          class="queryBtn"
          @click="resetTransformer"
        >重置</Button>
      </span>
    </div>
    <div class="tableGrid">
      <Table
        :columns="transformerColumnsFilter"
        no-data-text="无匹配数据"
        stripe
        :loading="tableLoadingStatus"
        :data="transformerData"
      >
        <template
          slot-scope="{row}"
          slot="types"
        >
          {{row.typeTingdian?' 停电':''}}
          {{row.typeUltraLowV?' 异常低压':''}}
          {{row.typeLowV?' 低电压':''}}
          {{row.typeNormalV?' 正常电压':''}}
          {{row.typeHighV?' 高电压':''}}
          {{row.typeUltraHighV?' 异常高压':''}}
        </template>

<template slot-scope="{row,index}" slot="chartImg">
  <div
    class="chartsBlock"
    :id="'chartsBlock' + index"
  >
  </div>
  <div class="showChartImg">
    <Dropdown
      transfer-class-name="dropdownBox"
      trigger="custom"
      transfer
      placement="bottom-end"
      :visible="row.showDetail"
    >
      <span v-if="row.odsPmsPublicVoltageInfo" style="color:#5190dc;display:inline-block; position:relative; padding-right:24px" @click.stop="showChart(row, index)">详情<i class="ivu-icon ivu-icon-ios-arrow-down ivu-select-arrow"></i></span>
      <DropdownMenu slot="list" v-if="row.odsPmsPublicVoltageInfo">
        <div
          class="chartsBlock"
          :id="'bigChartsBlock' + index"
        ></div>
        <div
          class="closeBtn"
          @click="handleClose(index)"
        >
          <i></i>
        </div>
      </DropdownMenu>
    </Dropdown>
  </div>
</template>

<template slot-scope="{row}" slot="countColor">
  <Tooltip
    :content="setCountTip(row)"
    transfer
    placement="top"
  >
    <div class="colorLine">
      <span
        class="colorLineItem tingdian"
        :style="'width:'+ (row.countTingdianRate * 100)+'%'"
      ></span>
      <span
        class="colorLineItem ultraLowV"
        :style="'width:'+ (row.countUltraLowVRate * 100)+'%'"
      ></span>
      <span
        class="colorLineItem lowV"
        :style="'width:'+ (row.countLowVRate * 100)+'%'"
      ></span>
      <span
        class="colorLineItem normalV"
        :style="'width:'+ (row.countNormalVRate * 100)+'%'"
      ></span>
      <span
        class="colorLineItem highV"
        :style="'width:'+ (row.countHighVRate * 100)+'%'"
      ></span>
      <span
        class="colorLineItem ultraHighV"
        :style="'width:'+ (row.countUltraHighVRate * 100)+'%'"
      ></span>
    </div>
  </Tooltip>
</template>

<template slot-scope="{row}" slot="fliterDate">
  {{$moment(row.dataDate).format("YYYY-MM-DD")}}
</template>

<template slot-scope="{row}" slot="fliterMonth">
  <span>{{row.dataMonth}}</span>
</template>

<template slot-scope="{row}" slot="fliterYear">
  <span>{{row.dataYear}}</span>
</template>

<template slot-scope="{ row }" slot="powerQualityDayType">
  <span>{{transformerRiskTypeFormat(row.powerQualityDay)}}</span>
</template>

<template slot-scope="{ row }" slot="powerQualityDay">
  <span>{{row.powerQualityDay}}</span>
</template>

<template slot-scope="{ row }" slot="riskRate">
  <span>{{((row.riskRate || 0)*100).toFixed(2)+'%'}}</span>
</template>
<template slot-scope="{ row }" slot="errorType">
  <span>{{errorType(row.fenduanYichangType)}}</span>
</template>

<template slot-scope="{ row }" slot="monthDetail">
  <span
    class="icons detailIcon"
    @click.stop="showMonthDetail(row)"
  ></span>
</template>
<template slot-scope="{ row }" slot="yearDetail">
  <span
    class="icons detailIcon"
    @click.stop="showYearDetail(row)"
  ></span>
</template>
<template slot-scope="{ row }" slot="nationnalStandardQualifyRate">
  <span>
    {{(row.nationnalStandardQualifyRate* 100).toFixed(2) + '%'}}</span>
</template>


      </Table>
    </div>
    <div class="pagination">
      <Page
        show-total
        @on-change="changePage"
        :current="transformerParams.page"
        :total="total"
        :page-size="transformerParams.size"
      />
    </div>
  </div>
</template>

<script>
import Ajax from "@/api/tools/customajax";
import { API_BASEURL, API_TIMEOUT } from "@/utils/config";
import { TinyLine } from "@antv/g2plot";
import { Chart } from "@antv/g2";

export default {
  data() {
    return {
      options: {
        // disabledDate(date) {
        //   return date.valueOf();
        // }
      },
      visible: false,
      tableLoadingStatus: false,
      loadingStatus: false,
      total: 0,
      standard: [
        {
          value: 1,
          label: "标准一"
        },
        {
          value: 2,
          label: "标准二"
        }
      ],
      timeInterval: [
        {
          value: "day",
          label: "天"
        },
        {
          value: "month",
          label: "月"
        },
        {
          value: "year",
          label: "年"
        }
      ],
      operatingUnits: [
        {
          value: -1,
          label: "全部"
        },
        {
          value: 0,
          label: "市中区"
        },
        {
          value: 1,
          label: "沙湾"
        },
        {
          value: 2,
          label: "峨眉"
        },
        {
          value: 3,
          label: "马边"
        },
        {
          value: 4,
          label: "沐川"
        },
        {
          value: 5,
          label: "井研"
        },
        {
          value: 6,
          label: "五通"
        },
        {
          value: 7,
          label: "夹江"
        }
      ],
      fenduanYichangType: [
        {
          value: -1,
          label: "全部"
        },
        {
          value: 0,
          label: "停电"
        },
        {
          value: 1,
          label: "异常低压"
        },
        {
          value: 2,
          label: "低电压"
        },
        {
          value: 3,
          label: "正常"
        },
        {
          value: 4,
          label: "高电压"
        },
        {
          value: 5,
          label: "异常高压"
        }
      ],
      voltageQualityOrder: [
        {
          value: -1,
          label: "无排序"
        },
        {
          value: 1,
          label: "正序"
        },
        {
          value: 2,
          label: "逆序"
        }
      ],
      powerQualityDayType: [
        {
          value: -1,
          label: "全部"
        },
        {
          value: 0,
          label: "高"
        },
        {
          value: 1,
          label: "中"
        },
        {
          value: 2,
          label: "低"
        }
      ],
      transformerParams: {
        sbmc: "", //设备名称
        fenduanYichangType: -1, //电压质量类型（0=停电 1=异常低压 2=低电压 3=正常 4=高电压 5=异常高压）
        startTime: "", //开始时间
        timeInterval: "month", //时间粒度
        endTime: "", //结束时间
        startTimeStr: "", //开始时间
        endTimeStr: "", //结束时间
        voltageQualityOrder: -1, //电压质量排序（1=正序 2=逆序）
        standard: 1, //标准（1=标准1 2=标准2）
        maintenanceCompanyGroup: -1, //运维单位分组：0为市中区 1.沙湾 2.峨眉 3.马边 4.沐川 5.井研 6.五通 7.夹江
        powerQualityDayType: -1, //电压风险类型(0=高 1=中 2=低)
        page: 1,
        size: 20,
        sbmcParam: "",
      },
      transformerColumns: [
        {
          title: "日期",
          key: "date",
          filterKey: "day",
          slot: "fliterDate",
          width: 120
        },
        {
          title: "月份",
          key: "month",
          filterKey: "month",
          slot: "fliterMonth",
          width: 120
        },
        {
          title: "年份",
          key: "year",
          filterKey: "year",
          slot: "fliterYear",
          width: 120
        },
        {
          title: "配网变压器名称",
          ellipsis: true,
          key: "sbmc",
          tooltip: true,
          width:240
        },
        {
          // 格式化%
          title: "合格率",
          key: "nationnalStandardQualifyRate",
          slot: "nationnalStandardQualifyRate",
          width: 90
        },
        {
          title: "运维单位",
          key: "operationAndMaintenanceCompany",
          tooltip: true
        },
        {
          title: "所属线路",
          key: "pmsLineName",
          tooltip: true
        },
        {
          title: "所属线路风险率",
          key: "riskRate",
          ellipsis: true,
          slot: "riskRate"
        },
        {
          // "countTingdianRate": 0,
          // "countUltraLowVRate": 0,
          // "countLowVRate": 0,
          // "countNormalVRate": 1,
          // "countHighVRate": 0,
          // "countUltraHighVRate": 0,
          title: "电压分布",
          key: "name",
          slot: "countColor"
        },
        {
          // 遗留
          title: "电压走势",
          key: "voltageTrend",
          filterKey: "day",
          slot: "chartImg",
          width: 220
        },
        {
          // "type_tingdian" IS '电压质量类型-停电（1为是该类型，0为非此类型）';
          // "type_ultra_low_v" IS '电压质量类型-异常低压（1为是该类型，0为非此类型）';
          // "type_low_v" IS '电压质量类型-低电压（1为是该类型，0为非此类型）';
          // "type_normal_v" IS '电压质量类型-正常电压（1为是该类型，0为非此类型）';
          // "type_high_v" IS '电压质量类型-高电压（1为是该类型，0为非此类型）';
          // "type_ultra_high_v" IS '电压质量类型-异常高压（1为是该类型，0为非此类型）';
          title: "电压质量类型",
          ellipsis: true,
          key: "rows",
          slot: "types",
          width: 160,
          renderHeader: (h, params) => {
            return h("div", [
              h(
                "span",
                {
                  attrs: {
                    class: "inlineBlockMin"
                  }
                },
                "电压质量类型"
              ),
              h(
                "Tooltip",
                {
                  props: {
                    placement: "bottom",
                    theme: "light",
                    transfer: true,
                    wordWrap: true
                  }
                },
                 [
                  h(
                    "span",
                    {
                      attrs: {
                        class: "iconsMin helpIcon"
                      }
                    },
                    ""
                  ),
                  h(
                    "div",
                    {
                      attrs: {
                        class: "tooltipContent tooltipContentMin"
                      },
                      slot: "content"
                    },
                    [
                      h("p", {
                        attrs: {
                          class: "tooltipItem"
                        }
                      },"电压质量类型描述设备在当前时间粒度下（天、月、年），根据设备的电压情况与电压分布的权重系数相结合，计算出的设备电压质量类型。")

                    ]
                  )
                ]
              )
            ]);
          }
        },
        {
          title: "电压质量",
          key: "powerQualityDay",
          slot: "powerQualityDay",
          width: 120,
          renderHeader: (h, params) => {
            return h("div", [
              h(
                "span",
                {
                  attrs: {
                    class: "inlineBlockMin"
                  }
                },
                "电压质量"
              ),
              h(
                "Tooltip",
                {
                  props: {
                    placement: "bottom",
                    theme: "light",
                    transfer: true,
                    wordWrap: true
                  }
                },
                [
                  h(
                    "span",
                    {
                      attrs: {
                        class: "iconsMin helpIcon"
                      }
                    },
                    ""
                  ),
                  h(
                    "div",
                    {
                      attrs: {
                        class: "tooltipContent tooltipContentMin"
                      },
                      slot: "content"
                    },
                    [
                      h(
                        "p",
                        {
                          attrs: {
                            class: "tooltipItem"
                          }
                        },
                        "根据设备当天（当月或当年，根据所选时间粒度而定）电压数据进行偏差度计算，数值越大电能质量越好越稳定。"
                      )
                    ]
                  )
                ]
              )
            ]);
          }
        },
        {
          // 前端根据电压质量分类
          // 高风险：电压质量<=30
          // 中风险：电压质量>30,<=50
          // 低风险：电压质量>50
          title: "电压风险类型",
          key: "name",
          ellipsis: true,
          width: 160,
          slot: "powerQualityDayType",
          renderHeader: (h, params) => {
            return h("div", [
              h(
                "span",
                {
                  attrs: {
                    class: "inlineBlockMin"
                  }
                },
                "电压风险类型"
              ),
              h(
                "Tooltip",
                {
                  props: {
                    placement: "bottom",
                    theme: "light",
                    transfer: true,
                    wordWrap: true
                  }
                },
                [
                  h(
                    "span",
                    {
                      attrs: {
                        class: "iconsMin helpIcon"
                      }
                    },
                    ""
                  ),
                  h(
                    "div",
                    {
                      attrs: {
                        class: "tooltipContent tooltipContentMin"
                      },
                      slot: "content"
                    },
                    [
                      h(
                        "p",
                        {
                          attrs: {
                            class: "tooltipItem"
                          }
                        },
                        "根据电压质量和设备要素信息综合判断得到，风险高低指设备的异常易发概率，高风险需重点关注。"
                      )
                    ]
                  )
                ]
              )
            ]);
          }
        },
        {
          title: '数据异常',
          key: 'dataError',
          render: (h, params) => {
            return h('span', '否')
          }
        },
        {
          title: "异常分析",
          key: "anomalyAnalysis",
          filterKey: "year",
          slot: "errorType"
        },
        {
          title: "异常分析",
          key: "anomalyAnalysis",
          filterKey: "month",
          slot: "errorType"
        },
        {
          // 遗留
          title: "当年详情",
          key: "detail",
          slot: "yearDetail",
          filterKey: "year",
          align: "center"
        },
        {
          // 遗留
          title: "当月详情",
          key: "detail",
          slot: "monthDetail",
          filterKey: "month",
          align: "center"
        }
      ],
      transformerColumnsFilter: [],
      transformerData: [],
      chartCtrl: null,
      miniChartList: []
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    showMonthDetail(row) {
      this.resetTransformer()
      this.transformerParams.sbmcParam = row.sbmc
      // this.transformerParams.sbmc = encodeURIComponent(row.sbmc);
      this.transformerParams.timeInterval = "day";
      this.transformerParams.startTime = this.$moment(row.dataMonth).format("YYYY-MM-DD")
      this.transformerParams.endTime = this.$moment(row.dataMonth).add(1,"months").subtract(1,"day").format("YYYY-MM-DD")
      this.transformerParams.page = 1;
      this.transformerParams.size = 20;
      this.dwvoltagequalitytransformer();
    },
    showYearDetail(row) {
      this.resetTransformer()
      this.transformerParams.sbmcParam = row.sbmc
      // this.transformerParams.sbmc = encodeURIComponent(row.sbmc);
      this.transformerParams.timeInterval = "month";
      this.transformerParams.startTime = this.$moment(row.dataYear).format("YYYY-MM")
      this.transformerParams.endTime = this.$moment(row.dataYear).year(this.$moment(row.dataMonth).year()).endOf('year').format("YYYY-MM")
      // this.$moment(row.dataMonth).add(1,"years").format("YYYY-MM")
      console.log(this.transformerParams.endTime)
      this.transformerParams.page = 1;
      this.transformerParams.size = 20;
      this.dwvoltagequalitytransformer();
    },
    errorType(value) {
      let errorValue = "";
      switch (value) {
        case -1:
          errorValue = "无异常";
          break;
        case 0:
          errorValue = "总体异常";
          break;
        case 1:
          errorValue = "凌晨异常";
          break;
        case 2:
          errorValue = "早上异常";
          break;
        case 3:
          errorValue = "中午异常";
          break;
        case 4:
          errorValue = "下午异常";
          break;
        case 5:
          errorValue = "晚上异常";
          break;
      }
      return errorValue;
    },
    loadData() {
      this.$nextTick(() => {
        if (this.$route.query.params) {
          this.transformerParams = JSON.parse(this.$route.query.params);
          this.queryTransformer();
        } else {
          this.queryTransformer();
        }
      });
    },
    filterTransformerColumns() {
      if (this.transformerParams.timeInterval != "day") {
        let newColumns = this.transformerColumns.filter(item => {
          return item.key != "voltageTrend";
        });
        return newColumns;
      } else {
        return this.transformerColumns;
      }
    },
    handleClose(index) {
      if (index > -1) {
        if (this.chartCtrl) {
          this.chartCtrl.destroy();
          this.chartCtrl = null;
        }
        let nodeData = this.transformerData[index];
        nodeData.showDetail = false;
        this.$set(this.transformerData, index, nodeData);
      }
    },
    showChart(item, index) {
      if (this.chartCtrl) {
        this.chartCtrl.destroy();
        this.chartCtrl = null;
      }
      this.createChart(item, index);
      // 图形创建
      if (index > -1) {
        let nodeData = this.transformerData[index];
        nodeData.showDetail = true;

        this.$set(this.transformerData, index, nodeData);
      }
    },
    getTicks(scale) {
      const ticks = [];
      for (let i = 0; i < 96; i++) {
        if (i % 16 == 0 || i == 95) ticks.push(i);
      }
      return ticks;
    },
    createChart(item, index) {
      let self = this;
      let chartDataGroup = [];
      if(item.odsPmsPublicVoltageInfo){
let chartData = item.odsPmsPublicVoltageInfo.u_points;
chartData.forEach((item, idx) => {
        chartDataGroup.push({
          index: String(idx),
          value: item
        });
      });
      const chartContainer = document.getElementById("bigChartsBlock" + index);
      const chart = new Chart({
        container: chartContainer,
        autoFit: true,
        height: 260,
        width: 500
      });

      chart.data(chartDataGroup);
      this.chartCtrl = chart;
      chart.scale("index", {
        tickMethod: self.getTicks,
        formatter(value) {
          let timeText = "";
          let time = (value * 15) / 60;
          if (time % 1 == 0) timeText = time + ":00";
          else if (value == 95) timeText = "24:00";
          else
            timeText =
              parseInt(time) + ":" + parseInt((time - parseInt(time)) * 60);
          return timeText;
        }
      });
      // chart.tooltip({
      //   showCrosshairs: true, // 展示 Tooltip 辅助线
      //   shared: true
      // });

      chart
        .line()
        .position("index*value")
        .tooltip("index*value", (name, value) => {
          // percent = percent * 100 + "%";
          return {
            name: "电压",
            value: value
          };
        });
      // chart.point().position('index*value');
      chart.render();
      }


    },
    objToStr(obj) {
      let paramArr = Object.keys(obj).reduce((acc, cur) => {
        if (obj[cur] !== -1 && obj[cur] !== "" && obj[cur] != undefined) {
          acc.push(cur + "=" + obj[cur]);
        }
        return acc;
      }, []);
      return paramArr.join("&");
    },
    transformerRiskTypeFormat(value) {
      // 根据电压质量计算
      // 高风险：电压质量<=30
      // 中风险：电压质量>30,<=50
      // 低风险：电压质量>50
      if (value <= 30) {
        return "高风险";
      } else if (30 < value && value <= 50) {
        return "中风险";
      } else {
        return "低风险";
      }
    },
    setCountTip(row) {
      let tipsText = "";
      if (row.countTingdianRate > 0) {
        tipsText += " 停电:" + (row.countTingdianRate * 100).toFixed(2) + "%";
      }
      if (row.countUltraLowVRate > 0) {
        tipsText +=
          " 异常低压:" + (row.countUltraLowVRate * 100).toFixed(2) + "%";
      }

      if (row.countLowVRate > 0) {
        tipsText += " 低电压:" + (row.countLowVRate * 100).toFixed(2) + "%";
      }

      if (row.countNormalVRate > 0) {
        tipsText += " 正常:" + (row.countNormalVRate * 100).toFixed(2) + "%";
      }

      if (row.countHighVRate > 0) {
        tipsText += " 高电压:" + (row.countHighVRate * 100).toFixed(2) + "%";
      }

      if (row.countUltraHighVRate > 0) {
        tipsText +=
          " 异常高压:" + (row.countUltraHighVRate * 100).toFixed(2) + "%";
      }
      return tipsText;
    },
    changeStartTime(d) {
      this.transformerParams.startTime = d;
    },
    changeEndTime(d) {
      this.transformerParams.endTime = d;
    },
    changeStartTimeMonth(d) {
      this.transformerParams.startTime = d + "-01";
    },
    changeEndTimeMonth(d) {
      this.transformerParams.endTime = d + "-01";
    },
    changeStartTimeYear(d) {
      this.transformerParams.startTime = d + "-01" + "-01";
    },
    changeEndTimeYear(d) {
      this.transformerParams.endTime = d + "-01" + "-01";
    },

    dwvoltagequalitytransformer() {
      this.tableLoadingStatus = true;
      // if (this.transformerParams.timeInterval == "day") {
      //   let newColumns = this.transformerColumns.filter(item => {
      //     return item.key == "month";
      //   });
      //   this.transformerColumnsFilter = newColumns;
      // } else if(this.transformerParams.timeInterval == "month") {
      //   this.transformerColumnsFilter = this.transformerColumns;
      // }
      // else{
      //   this.transformerColumnsFilter = this.transformerColumns;
      // }

      let newColumns = this.transformerColumns.filter(item => {
        return (
          !item.filterKey ||
          item.filterKey == this.transformerParams.timeInterval
        );
      });
      this.transformerColumnsFilter = newColumns;
      this.transformerData = [];
      // 当输入值时，用输入的值替换
      if(this.transformerParams.sbmcParam){
this.transformerParams.sbmc = encodeURIComponent(this.transformerParams.sbmcParam)
      }else{
        this.transformerParams.sbmc = ""
      }
      let {sbmcParam,...transformerParamsFilter} = this.transformerParams
      transformerParamsFilter.startTime = transformerParamsFilter.startTime?this.$moment(transformerParamsFilter.startTime).format("YYYY-MM-DD"):""
      transformerParamsFilter.endTime = transformerParamsFilter.endTime?this.$moment(transformerParamsFilter.endTime).format("YYYY-MM-DD"):""
      Ajax.get(
        API_BASEURL +
          "/dwvoltagequalitytransformer/" +
          this.transformerParams.timeInterval +
          "/list?" +
          this.objToStr(transformerParamsFilter)
      )
        .then(response => {
          if (response.status == 200) {
            if (response.data.meta.code == 1) {
              this.loadingStatus = false;

              this.transformerData = response.data.data;
              this.transformerData.forEach(item => {
                let countAll = 0;
                countAll += item.countHighV;
                countAll += item.countLowV;
                countAll += item.countNormalV;
                countAll += item.countTingdian;
                countAll += item.countUltraHighV;
                countAll += item.countUltraLowV;

                item.countHighVRate = Number(
                  item.countHighV / countAll
                ).toFixed(4);
                item.countLowVRate = Number(item.countLowV / countAll).toFixed(
                  4
                );
                item.countNormalVRate = Number(
                  item.countNormalV / countAll
                ).toFixed(4);
                item.countTingdianRate = Number(
                  item.countTingdian / countAll
                ).toFixed(4);
                item.countUltraHighVRate = Number(
                  item.countUltraHighV / countAll
                ).toFixed(4);
                item.countUltraLowVRate = Number(
                  item.countUltraLowV / countAll
                ).toFixed(4);
                // countHighV: 2291
                // countLowV: 0
                // countNormalV: 371
                // countTingdian: 26
                // countUltraHighV: 0
                // countUltraLowV: 0
              });
              this.total = response.data.total;
              this.tableLoadingStatus = false;
              if (this.transformerParams.timeInterval == "day") {
                setTimeout(()=>{
                  this.creatMinChart(0);
                },500)

              }
            } else {
              this.loadingStatus = false;
              this.tableLoadingStatus = false;
              this.$Message.error({
                content: response.data.meta.message
              });
            }
          }
        })
        .catch(response => {
          this.loadingStatus = false;
          this.tableLoadingStatus = false;
          // this.$Message.error({
          //   content: "获取数据失败！"
          // });
        });
    },
    queryTransformer() {
      this.transformerParams.page = 1;
      this.loadingStatus = true;
      this.dwvoltagequalitytransformer();
    },
    // 分页
    changePage(v) {
      this.transformerParams.page = v;
      this.dwvoltagequalitytransformer();
    },
    // 重置搜索条件
    resetTransformer() {
      this.loadingStatus = false;
      this.tableLoadingStatus = false;
      this.transformerParams = {
        sbmc: "", //设备名称
        fenduanYichangType: -1, //电压质量类型（0=停电 1=异常低压 2=低电压 3=正常 4=高电压 5=异常高压）
        startTime: "", //开始时间
        timeInterval: "month", //时间粒度
        endTime: "", //结束时间
        startTimeStr: "", //开始时间
        endTimeStr: "", //结束时间
        voltageQualityOrder: -1, //电压质量排序（1=正序 2=逆序）
        standard: 1, //标准（1=标准1 2=标准2）
        maintenanceCompanyGroup: -1, //运维单位分组：0为市中区 1.沙湾 2.峨眉 3.马边 4.沐川 5.井研 6.五通 7.夹江
        powerQualityDayType: -1, //电压风险类型(0=高 1=中 2=低)
        page: 1,
        size: 20,
        sbmcParam: "",
      };
    },
    creatMinChart() {
      this.transformerData.forEach((item, index) => {
        const tinyLineContainer = document.getElementById(
          "chartsBlock" + index
        );
        let chartIndex = this.miniChartList.findIndex(el => {
          return el.id == "chartsBlock" + index;
        });
        if (chartIndex > -1) {
          this.miniChartList[chartIndex].ctrl.destroy();
          this.miniChartList.splice(chartIndex, 1);
        }
        // tinyLineContainer.innerHTML = "";
        let chartDataGroup = [];
        if(item.odsPmsPublicVoltageInfo){
let chartData = item.odsPmsPublicVoltageInfo.u_points;
        chartData.forEach((item, idx) => {
          chartDataGroup.push({
            index: String(idx),
            value: item
          });
        });
        const tinyLine = new TinyLine(tinyLineContainer, {
          width: 100,
          height: 30,
          data: chartDataGroup,
          xField: "index",
          yField: "value",
          smooth: true
        });
        tinyLine.render();
        this.miniChartList.push({ id: "chartsBlock" + index, ctrl: tinyLine });
        }

      });
    }
  }
};
</script>
