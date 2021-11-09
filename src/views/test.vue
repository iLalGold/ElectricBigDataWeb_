<template>
  <div class="wrapper">
    <div class="menu" v-if="this.$route.path !== '/' ? true : false">
      <div class="menuMain">
        <div @click="changeMenu(item)" :class="['menuItem', { activeMenu: activeMenu == item.sort }]" v-for="item in menu" :key="item.sort">{{ item.name }}</div>
        <div class="rightText">乐山</div>
      </div>
    </div>
    <div class="menus" v-else>
      <div class="leftMenuContainer">
        <div class="leftMenu">
          <div class="menuBtn">
            <Icon type="md-menu" class="menuIcon" @click="isShow = !isShow" v-show="isShow" />
            <Icon type="md-menu" class="menuIcon" @click="isShow = !isShow" v-show="!isShow" />
          </div>
          <div class="title">
            <span>乐山</span>
            <span>|</span>
            <span>供电合格</span>
          </div>
          <transition name="slide-fade">
            <div class="menuItemContainer" v-show="isShow">
              <div @click="changeMenu(item)" :class="['menuItem', { activeMenu: activeMenu == item.sort }]" v-for="item in menu" :key="item.sort">
                {{ item.name }}
              </div>
            </div>
          </transition>
        </div>
      </div>

      <div class="message">
        <ul>
          <li>
            <span>{{ mapData ? mapData.sumTypeTotal : 0 }}</span>
            <span>变压器数量</span>
          </li>
          <li>
            <span>{{ mapData ? mapData.sumLineTotal : 0 }}</span>
            <span>线路数量</span>
          </li>
          <li>
            <span>{{ mapData ? mapData.sumTypeRate : 0 }}%</span>
            <span>合格率</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="modle" v-show="isShow" @click="toggle"></div>
    <router-view />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      activeMenu: 0,
      menu: [
        {
          sort: 0,
          name: '概览',
          routerLink: '/'
        },
        {
          sort: 1,
          name: '变压器',
          routerLink: '/transformer'
        },
        {
          sort: 2,
          name: '线路',
          routerLink: '/line'
        },
        // {
        //   sort: 3,
        //   name: '台区电压精细化管理',
        //   routerLink: '/management'
        // },
        {
          sort: 4,
          name: '台区首末端电压',
          routerLink: '/voltage'
        },
        {
          sort: 5,
          name: '小区用电评估',
          routerLink: '/community'
        }
      ],
      isShow: false,
      mapData: {}
    }
  },
  created() {
    let routerOrder = this.menu.find(list => {
      return list.routerLink == this.$route.path
    }).sort
    this.activeMenu = routerOrder
  },
  mounted() {
    this.activeMenu = this.$route.meta.routerSort
  },
  methods: {
    changeMenu(item) {
      this.activeMenu = item.sort
      this.$router.push({ path: item.routerLink })
    },
    toggle() {
      this.isShow = false
    }
  },
  computed: {
    ...mapGetters(['md'])
  },
  watch: {
    md(data) {
      this.mapData = { ...data }
    },
    '$route.path': function(newVal, oldVal) {
      let routerOrder = this.menu.find(list => {
        return list.routerLink == newVal
      }).sort
      this.activeMenu = routerOrder
    }
  }
}
</script>
<style lang="less" scoped>
@import './test.less';
.menu {
  position: relative;
  height: 45px;
  background-color: #e1e6f1;
  .menuMain {
    height: 42px;
    background-color: #e9ebf1;
    padding: 0 10px;
    position: relative;
    .rightText {
      position: absolute;
      right: 24px;
      top: 0;
      height: 42px;
      line-height: 42px;
      font-size: 16px;
      font-weight: 700;
    }
  }
  .menuItem {
    display: inline-block;
    min-width: 100px;
    box-sizing: border-box;
    text-align: center;
    position: relative;
    height: 42px;
    padding: 0 20px;
    line-height: 42px;
    cursor: pointer;
    color: #666;
    font-weight: 700;
    &:hover {
      color: #5190dc;
    }
    &:after {
      position: absolute;
      content: '';
      background-color: #5190dc;
      height: 3px;
      bottom: -3px;
      left: 0;
      width: 100%;
      opacity: 0;
      transition: all 0.5s;
    }
    &:hover {
      background-color: rgba(81, 144, 220, 0.2);
      color: #5190dc;
      &:after {
        opacity: 1;
      }
    }
  }
  .activeMenu {
    background-color: rgba(81, 144, 220, 0.2);
    color: #5190dc;
    &:after {
      opacity: 1;
    }
  }
}
</style>
