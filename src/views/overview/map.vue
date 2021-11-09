<template>
  <div id="map"></div>
</template>

<script>
import { Scene } from '@antv/l7'
import { CityLayer } from '@antv/l7-district'
import { Mapbox } from '@antv/l7-maps'
import leshan from './leshan.json'
const colors = ['#B8E1FF', '#7DAAFF', '#3D76DD', '#0047A5', '#001D70']

export default {
  components: {},
  props: {
    MapData: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      areaMap: {
        市中区: 0,
        沙湾区: 1,
        峨眉山市: 2,
        马边彝族自治县: 3,
        沐川县: 4,
        井研县: 5,
        五通桥区: 6,
        夹江县: 7,
        犍为县: 8,
        金口河区: 9,
        峨边彝族自治县: 10
      },
      mapData: []
    }
  },
  watch: {
    MapData(data) {
      if (data !== null && data.length > 0) {
        data.forEach(item => {
          item.sumTypeTotal = item.sumTypeHighV + item.sumTypeLowV + item.sumTypeNormalV + item.sumTypeTingdian + item.sumTypeUltraHighV + item.sumTypeUltraLowV
          item.sumLineTotal = Math.round(Math.random() * (1200 - 800) + 800)
          item.sumTypeRate = ((10.0 * item.sumTypeNormalV) / item.sumTypeTotal).toFixed(2)
        })
        this.mapData = data
        this.initMap()
      }
    }
  },
  computed: {},
  methods: {
    async initMap() {
      const data = leshan.features.map(item => {
        const areaId = this.areaMap[item.properties.name]
        const md = this.mapData.filter(item => item.maintenanceCompanyGroup === areaId)
        return {
          code: item.properties.adcode,
          name: item.properties.name,
          pop: md !== null && md.length > 0 ? md[0].sumTypeTotal : 0,
          md: md !== null && md.length > 0 ? md[0] : {}
        }
      })
      const scene = new Scene({
        id: 'map',
        map: new Mapbox({
          center: [116.2825, 39.9],
          pitch: 0,
          style: 'blank',
          zoom: 3,
          minZoom: 3,
          maxZoom: 10
        })
      })
      scene.on('loaded', () => {
        const layer = new CityLayer(scene, {
          data,
          joinBy: ['adcode', 'code'],
          adcode: ['511100', '511102'],
          depth: 3,
          label: {
            field: 'NAME_CHN',
            textAllowOverlap: false
          },
          fill: {
            color: { field: 'pop', values: colors }
          }
        })
        layer.on('click', e => {
          const { sumTypeTotal, sumLineTotal, sumTypeRate } = e.feature.properties.md
          this.$store.commit('setMapData', { sumTypeTotal, sumLineTotal, sumTypeRate })
        })
      })
    }
  }
}
</script>
<style lang="less" scoped>
#map {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
