import Mock from 'mockjs'

const data = Mock.mock([{ 'lng': -110.884377, 'lat': 57.233818 }, { 'lng': -110.882168, 'lat': 57.233805 }, { 'lng': -110.828147, 'lat': 57.218554 }, { 'lng': -110.820463, 'lat': 57.21981 }, { 'lng': -110.905546, 'lat': 57.228018 }, { 'lng': -110.907361, 'lat': 57.215264 }, { 'lng': -110.917818, 'lat': 57.222927 }, { 'lng': -110.84435, 'lat': 57.212078 }, { 'lng': -110.884423, 'lat': 57.224544 }, { 'lng': -110.882222, 'lat': 57.224495 }])

export default [
  {
    url: '/wells/data',
    type: 'get',
    response: config => {
      const data1 = data
      return {
        code: 20000,
        data: {
          position: data1
        }
      }
    }
  }
]
