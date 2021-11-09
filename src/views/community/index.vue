<template>
  <div class="powerWrapper">
    <div class="filterBox">
      <Row class-name="rowStyle">
        <Col span="6">
          <div class="inlineBlock formLable">小区名称：</div>
          <div class="inlineBlock">
            <Input v-model="lineParams.neighborhoodUnitName" placeholder="小区名称" style="width: 160px" />
          </div>
        </Col>
        <Col span="6">
          <div class="inlineBlock formLable">标准：</div>
          <div class="inlineBlock">
            <Select v-model="lineParams.standard" style="width:120px" transfer>
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
        </Col>
        <Col span="6">
          <div class="inlineBlock formLable">小区用电评估：</div>
          <div class="inlineBlock largeMarginRight">
            <Select v-model="lineParams.powerEvaluation" style="width:120px" transfer>
              <Option v-for="item in powerEvaluation" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
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
      <Table :loading="tableLoadingStatus" :columns="cellVoltageColumns" no-data-text="无匹配数据" stripe :data="cellVoltageListData">
        <template slot-scope="{ row }" slot="passRate">{{ (row.voltagePercentPass * 100).toFixed(2) + '%' }}</template>

        <template slot-scope="{ row }" slot="powerEvaluation">{{ formatPowerEvaluation(row.powerEvaluation) }}</template>
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
      powerEvaluation: [
        {
          value: '',
          label: '全部'
        },
        {
          value: 1,
          label: '优'
        },
        {
          value: 2,
          label: '良'
        },
        {
          value: 3,
          label: '差'
        }
      ],
      lineParams: {
        standard: 1, //标准
        intervalParam: 1, // 时间
        interval: 1,
        neighborhoodUnitName: '', // 小区名称
        powerEvaluation: '', // 用电评估
        page: 1,
        size: 20
      },
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
      ],
      cellVoltageListData: []
    }
  },
  mounted() {
    this.loadData()
    this.cellVoltage()
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
    loadData() {
      this.$nextTick(() => {
        if (this.$route.query.params) {
          console.log(JSON.parse(this.$route.query.params))
          this.lineParams = JSON.parse(this.$route.query.params)
          this.cellVoltage()
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
      this.cellVoltage()
    },
    // 分页
    changePage(v) {
      console.log(v)
      this.loadingStatus = true
      this.tableLoadingStatus = true
      this.cellVoltage()
    },
    // 重置搜索条件
    resetline() {
      this.lineParams = {
        standard: 1, //标准
        intervalParam: 1, // 时间
        interval: 1,
        neighborhoodUnitName: '', // 小区名称
        powerEvaluation: '' // 用电评估
      }
    },
    /* 小区用电 */
    cellVoltage() {
      Ajax.get(API_BASEURL + '/dwvoltageneighborhoodunitpowerinfo?' + this.objToStr(this.lineParams)).then(response => {
        if (response.status == 200) {
          if (response.data.meta.code == 1) {
            this.loadingStatus = false
            this.tableLoadingStatus = false
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
    }
  }
}
</script>
