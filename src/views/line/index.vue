<template>
  <div class="powerWrapper">
    <div class="filterBox">
      <Row class-name="rowStyle">
        <Col span="6">
          <div class="inlineBlock formLable">配网线路名称：</div>
          <div class="inlineBlock">
            <Input v-model="lineParams.sbmc" placeholder="配网线路名称" style="width: 160px" />
          </div>
        </Col>
        <Col span="5">
          <div class="inlineBlock formLable">时间粒度：</div>
          <div class="inlineBlock">
            <Select v-model="lineParams.timeInterval" style="width:80px" transfer>
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

              v-if="lineParams.timeInterval=='day'"
            ></DatePicker>
            <DatePicker
              show-week-numbers
              :options="options"
              @on-change="changeEndTime"
              placement="bottom-end"
              placeholder="结束"
              style="width: 120px"

              v-if="lineParams.timeInterval=='day'"
            ></DatePicker>

            <DatePicker
              type="month"
              :options="options"
              @on-change="changeStartTimeMonth"
              placement="bottom-end"
              placeholder="开始月份"
              style="width: 100px"

              v-if="lineParams.timeInterval=='month'"
            ></DatePicker>

            <DatePicker
              type="month"
              :options="options"
              @on-change="changeEndTimeMonth"
              placement="bottom-end"
              placeholder="结束月份"
              style="width: 100px"

              v-if="lineParams.timeInterval=='month'"
            ></DatePicker>

            <DatePicker
              type="year"
              @on-change="changeStartTimeYear"
              placement="bottom-end"
              placeholder="开始年份"
              style="width: 100px"
              v-if="lineParams.timeInterval=='year'"
            ></DatePicker>
            <DatePicker
              type="year"
              @on-change="changeEndTimeYear"
              placement="bottom-end"
              placeholder="结束年份"
              style="width: 100px"
              v-if="lineParams.timeInterval=='year'"
            ></DatePicker>
          </div>
        </Col>
        <Col span="5">
          <div class="inlineBlock formLable">运维单位：</div>
          <div class="inlineBlock">
            <Select v-model="lineParams.maintenanceCompanyGroup" style="width:120px" transfer>
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
            <Select v-model="lineParams.fenduanYichangType" style="width:160px" transfer>
              <Option
                v-for="item in fenduanYichangType"
                :value="item.value"
                :key="item.value"
              >{{ item.label }}</Option>
            </Select>
          </div>
        </Col>
        <Col span="5">
          <div class="inlineBlock formLable">线路风险率排序：</div>
          <div class="inlineBlock">
            <Select v-model="lineParams.lineRiskRateOrder" style="width:80px" transfer>
              <Option
                v-for="item in lineRiskRateOrder"
                :value="item.value"
                :key="item.value"
              >{{ item.label }}</Option>
            </Select>
          </div>
        </Col>
        <Col span="8">
          <div class="inlineBlock formLable">标准：</div>
          <div class="inlineBlock">
            <Select v-model="lineParams.standard" style="width:160px" transfer>
              <Option
                v-for="item in standard"
                :value="item.value"
                :key="item.value"
              >{{ item.label }}</Option>
            </Select>
          </div>
          <div class="inlineBlock">
            <Tooltip placement="bottom" theme="light">
              <i class="icons helpIcon"></i>
              <div slot="content" style="width:240px" class="tooltipContent">
                <p class="tooltipItem">标准1：电压为198-235.4的为合格</p>
                <p class="tooltipItem">标准2：电压为198-250.8的为合格</p>
              </div>
            </Tooltip>
          </div>
        </Col>
        <Col span="5">
          <div class="inlineBlock formLable">风险类型：</div>
          <div class="inlineBlock">
            <Select v-model="lineParams.riskType" style="width:120px" transfer>
              <Option
                v-for="item in riskType"
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
          @click="queryline"
        >
          <span v-if="!loadingStatus">查询</span>
          <span v-else>查询中…</span>
        </Button>
      </span>
      <span class="btnBlock">
        <Button shape="circle" class="queryBtn" @click="resetline">重置</Button>
      </span>
    </div>
    <div class="tableGrid">
      <Table
        :columns="lineColumnsFilter"
        no-data-text="无匹配数据"
        stripe
        :loading="tableLoadingStatus"
        :data="lineData"
      >
        <template
          slot-scope="{row}"
          slot="fliterDate"
        >{{$moment(row.dataDate).format("YYYY-MM-DD")}}</template>

        <template slot-scope="{row}" slot="fliterMonth">
          <span>{{row.dataMonth}}</span>
        </template>

        <template slot-scope="{row}" slot="fliterYear">
          <span>{{row.dataYear}}</span>
        </template>

        <template
          slot-scope="{ row }"
          slot="qualifyRateAvg"
        >{{(row.qualifyRateAvg * 100).toFixed(2) + '%'}}</template>
        <template
          slot-scope="{ row }"
          slot="lineLoadRate"
        >{{(row.lineLoadRate * 100).toFixed(2) + '%'}}</template>
        <template
          slot-scope="{ row }"
          slot="riskRate"
        >{{((row.riskRate || 0) * 100).toFixed(2) + '%'}}</template>
        <template slot-scope="{ row }" slot="riskType">
          <!-- <span class="colorLine">
            <span class="tingdian" v-if="lineRiskTypeFormat(row.riskType) == '高风险'"></span>
            <span class="tingdian" v-if="lineRiskTypeFormat(row.riskType) == '中风险'"></span>
            <span class="tingdian" v-if="lineRiskTypeFormat(row.riskType) == '低风险'"></span>
          </span>-->
          {{lineRiskTypeFormat(row.riskRate)}}
        </template>
        <template slot-scope="{ row }" slot="voltageQualityType">
          {{row.typeTingdian?' 停电':''}}
          {{row.typeUltraLowV?' 异常低压':''}}
          {{row.typeLowV?' 低电压':''}}
          {{row.typeNormalV?' 正常电压':''}}
          {{row.typeHighV?' 高电压':''}}
          {{row.typeUltraHighV?' 异常高压':''}}
        </template>
      </Table>
    </div>
    <div class="pagination">
      <Page
        show-total
        :current="lineParams.page"
        @on-change="changePage"
        :total="total"
        :page-size="lineParams.size"
      />
    </div>
  </div>
</template>
<script>
import Ajax from "@/api/tools/customajax";
import { API_BASEURL, API_TIMEOUT } from "@/utils/config";
export default {
  data() {
    return {
      options: {
      },
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
      lineRiskRateOrder: [
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
      riskType: [
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
      lineParams: {
        sbmc: "", //设备名称
        fenduanYichangType: "", //电压质量类型（0=停电 1=异常低压 2=低电压 3=正常 4=高电压 5=异常高压）
        startTime: "", //开始时间
        timeInterval: "day", //时间粒度
        endTime: "", //结束时间
        startTimeStr: "", //开始时间
        endTimeStr: "", //结束时间
        lineRiskRateOrder: "", //电压质量排序（1=正序 2=逆序）
        standard: 1, //标准（1=标准1 2=标准2）
        maintenanceCompanyGroup: "", //运维单位分组：0为市中区 1.沙湾 2.峨眉 3.马边 4.沐川 5.井研 6.五通 7.夹江
        riskType: "", //电压风险类型(0=高 1=中 2=低)
        page: 1,
        size: 20
      },
      lineColumns: [
        {
          title: "日期",
          key: "date",
          filterKey: "day",
          slot: "fliterDate",
          width:120
        },
        {
          title: "月份",
          key: "month",
          filterKey: "month",
          slot: "fliterMonth",
          width:120
        },
        {
          title: "年份",
          key: "year",
          filterKey: "year",
          slot: "fliterYear",
          width:120
        },
        {
          title: "配网线路名称",
          key: "lineName",
          tooltip: true,
          width:240
        },
        {
          title: "运维单位",
          key: "operationAndMaintenanceCompany",
          tooltip: true
        },
        {
          title: "平均合格率",
          key: "qualifyRateAvg",
          slot: "qualifyRateAvg",
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
                "平均合格率"
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
                      },"指线路下挂接变压器的合格率均值。")

                    ]
                  )
                ]
              )
            ]);
          }
        },
        {
          title: "挂接变压器数量",
          key: "transformerNumber"
        },
        {
          title: "线路负荷率",
          key: "lineLoadRate",
          slot: "lineLoadRate"
        },
        {
          title: "电压质量类型",
          key: "voltageQualityType",
          slot: "voltageQualityType",
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
          title: "线路风险率",
          key: "riskRate",
          slot: "riskRate",
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
                "线路风险率"
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
                      },"根据线路下挂接变压器的电压风险类型评估，描述线路下挂接变压器的高风险类型占比。")

                    ]
                  )
                ]
              )
            ]);
          }
        },
        {
          //根据线路风险率分类
          // 高风险：线路风险率>50%；
          // 中风险：线路风险率>20%且≤50%；
          // 低风险：线路风险率≤20%。
          title: "风险类型",
          key: "name",
          slot: "riskType",
          tooltip: true,
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
                "线路风险类型"
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
                      },"根据电压质量和设备要素信息综合研判得到，风险高低指设备的异常易发概率，高风险需要重点关注。")

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
        }
      ],
      lineData: [],
      lineColumnsFilter: []
    };
  },
  mounted() {
    this.loadData();
    this.dwvoltagequalityline();
  },
  methods: {
    loadData() {
      this.$nextTick(() => {
        if (this.$route.query.params) {
          console.log(JSON.parse(this.$route.query.params));
          this.lineParams = JSON.parse(this.$route.query.params);
          this.dwvoltagequalityline();
        }
      });
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
    lineRiskTypeFormat(value) {
      // 高风险：线路风险率>50%；
      // 中风险：线路风险率>20%且≤50%；
      // 低风险：线路风险率≤20%。
      value = value * 100;
      if (value <= 20) {
        return "低风险";
      } else if (20 < value && value <= 50) {
        return "中风险";
      } else {
        return "高风险";
      }
    },
    changeStartTime(d) {
      this.lineParams.startTime = d;
    },
    changeEndTime(d) {
      this.lineParams.endTime = d;
    },
    changeStartTimeMonth(d) {
      this.lineParams.startTime = d + "-01";
    },
    changeEndTimeMonth(d) {
      this.lineParams.endTime = d + "-01";
    },
    changeStartTimeYear(d) {
      this.lineParams.startTime = d + "-01" + "-01";
    },
    changeEndTimeYear(d) {
      this.lineParams.endTime = d + "-01" + "-01";
    },
    dwvoltagequalityline() {
      this.tableLoadingStatus = true;
      let newColumns = this.lineColumns.filter(item => {
        return (
          !item.filterKey || item.filterKey == this.lineParams.timeInterval
        );
      });
      this.lineColumnsFilter = newColumns;

      Ajax.get(
        API_BASEURL +
          "/dwvoltagequalityline/" +
          this.lineParams.timeInterval +
          "/list?" +
          this.objToStr(this.lineParams)
      ).then(response => {
        if (response.status == 200) {
          if (response.data.meta.code == 1) {
            this.loadingStatus = false;
            this.lineData = response.data.data;
            this.total = response.data.total;
            this.tableLoadingStatus = false;
          } else {
            this.loadingStatus = false;
            this.tableLoadingStatus = false;
            this.$Message.error({
              content: response.data.meta.message
            });
          }
        }
      }).catch(response => {
          this.loadingStatus = false;
          this.tableLoadingStatus = false;
          // this.$Message.error({
          //   content: "获取数据失败！"
          // });
        });;
    },
    queryline() {
      this.lineParams.page = 1;
      this.loadingStatus = true;
      this.dwvoltagequalityline();
    },
    // 分页
    changePage(v) {
      this.lineParams.page = v;
      this.dwvoltagequalityline();
    },
    // 重置搜索条件
    resetline() {
      this.lineParams = {
        sbmc: "", //设备名称
        fenduanYichangType: "", //电压质量类型（0=停电 1=异常低压 2=低电压 3=正常 4=高电压 5=异常高压）
        startTime: "", //开始时间
        timeInterval: "day", //时间粒度
        endTime: "", //结束时间
        startTimeStr: "", //开始时间
        endTimeStr: "", //结束时间
        lineRiskRateOrder: "", //电压质量排序（1=正序 2=逆序）
        standard: "", //标准（1=标准1 2=标准2）
        maintenanceCompanyGroup: "", //运维单位分组：0为市中区 1.沙湾 2.峨眉 3.马边 4.沐川 5.井研 6.五通 7.夹江
        riskType: "" //电压风险类型(0=高 1=中 2=低)
      };
    }
  }
};
</script>
