<template>
  <div class="powerWrapper">
    <div class="filterBox">
      <Row class-name="rowStyle">
        <Col span="6">
          <div class="inlineBlock formLable">配网变压器名称：</div>
          <div class="inlineBlock">
            <Input v-model="lineParams.pmsTransformerName" placeholder="配网变压器名称" style="width: 160px" />
          </div>
        </Col>
        <Col span="6">
          <div class="inlineBlock formLable">所属台区：</div>
          <div class="inlineBlock">
            <Input v-model="lineParams.platformName" placeholder="所属台区" style="width: 160px" />
          </div>
        </Col>
        <Col span="6">
          <div class="inlineBlock formLable">选择时间：</div>
          <div class="inlineBlock largeMarginRight">
            <Select v-model="lineParams.intervalParam" style="width:120px" transfer>
              <Option v-for="item in timeInterval" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </div>
        </Col>
        <Col span="6">
          <div class="inlineBlock formLable">运维单位：</div>
          <div class="inlineBlock">
            <Select v-model="lineParams.Units" style="width:120px" transfer>
              <Option v-for="item in Units" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </div>
        </Col>
      </Row>
      <Row class-name="rowStyle">
        <Col span="6">
          <div class="inlineBlock formLable">首末端电压对比：</div>
          <div class="inlineBlock">
            <Select v-model="lineParams.contrasting" style="width:120px" transfer>
              <Option v-for="item in contrasting" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </div>
        </Col>
      </Row>
    </div>
    <div class="rowLine"></div>
    <div class="filterBtnGroup">
      <span class="btnBlock">
        <Button shape="circle" type="primary" :loading="loadingStatus" class="queryBtn" @click="queryline">
          <span v-if="!loadingStatus">查询</span>
          <span v-else>查询中…</span>
        </Button>
      </span>
      <span class="btnBlock">
        <Button shape="circle" class="queryBtn" @click="resetline">重置</Button>
      </span>
    </div>
    <div class="tableGrid">
      <Table :loading="tableLoadingStatus" :columns="voltageComparisonColumns" no-data-text="无匹配数据" stripe :data="voltageComparisonListData">
        <template slot-scope="{ row }" slot="attrition">{{ (row.attritionRate * 100).toFixed(2) + '%' }}</template>

        <!-- <template slot-scope="{ row }" slot="powerEvaluations">
                          {{formatPowerEvaluation(row.powerEvaluation)}}
                        </template>-->
      </Table>
    </div>
    <div class="pagination">
      <Page show-total :current="lineParams.page" @on-change="changePage" :total="total" :page-size="lineParams.size" />
    </div>
  </div>
</template>
<script>
import Ajax from '@/api/tools/customajax'
import { API_BASEURL, API_TIMEOUT } from '@/utils/config'
export default {
  data() {
    return {
      options: {},
      loadingStatus: false,
      tableLoadingStatus: false,
      total: 0,
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
      Units: [
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
      fenduanYichangType: [
        {
          value: -1,
          label: '全部'
        },
        {
          value: 0,
          label: '停电'
        },
        {
          value: 1,
          label: '异常低压'
        },
        {
          value: 2,
          label: '低电压'
        },
        {
          value: 3,
          label: '正常'
        },
        {
          value: 4,
          label: '高电压'
        },
        {
          value: 5,
          label: '异常高压'
        }
      ],
      lineRiskRateOrder: [
        {
          value: -1,
          label: '无排序'
        },
        {
          value: 1,
          label: '正序'
        },
        {
          value: 2,
          label: '逆序'
        }
      ],
      riskType: [
        {
          value: -1,
          label: '全部'
        },
        {
          value: 0,
          label: '高'
        },
        {
          value: 1,
          label: '中'
        },
        {
          value: 2,
          label: '低'
        }
      ],
      lineParams: {
        pmsTransformerName: '', //设备名称
        page: 1,
        size: 20,
        Units: '', //运维单位
        contrasting: '', // 首末端电压对比
        intervalParam: 1, // 时间
        interval: 1,
        platformName: '' // 所属台区
      },
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
      voltageComparisonListData: [],
      contrasting: [
        {
          value: 1,
          label: '首端<末端'
        },
        {
          value: 2,
          label: '首端>末端'
        },
        {
          value: 3,
          label: '首端=末端'
        }
      ]
    }
  },
  mounted() {
    this.loadData()
    this.queryVoltageComparison()
  },
  methods: {
    loadData() {
      this.$nextTick(() => {
        if (this.$route.query.params) {
          console.log(JSON.parse(this.$route.query.params))
          this.lineParams = JSON.parse(this.$route.query.params)
          this.queryVoltageComparison()
        }
      })
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
    queryline() {
      /* 查询参数 */
      console.log(this.lineParams)
      this.lineParams.interval = this.lineParams.intervalParam
      this.loadingStatus = true
      this.tableLoadingStatus = true
      this.queryVoltageComparison()
    },
    // 分页
    changePage(v) {
      console.log(v)
      this.loadingStatus = true
      this.tableLoadingStatus = true
      this.queryVoltageComparison()
    },
    // 重置搜索条件
    resetline() {
      this.lineParams = {
        pmsTransformerName: '', //设备名称
        Units: '', //运维单位
        contrasting: '', // 首末端电压对比
        intervalParam: 1, // 时间
        interval: 1,
        platformName: '' // 所属台区
      }
    },
    // 台区首末端电压对比
    queryVoltageComparison() {
      Ajax.get(API_BASEURL + '/dwvoltageplatformvoltageTransformerInfo?' + this.objToStr(this.lineParams)).then(response => {
        if (response.status == 200) {
          if (response.data.meta.code == 1) {
            this.loadingStatus = false
            this.tableLoadingStatus = false
            this.voltageComparisonListData = response.data.data.slice(0, 10)
          }
        }
      })
    }
  }
}
</script>
