/**
 * 头部导航
 */
export const menuData = [
  {
    href: 'index.html',
    name: '首页'
  },
  {
    href: 'news.html',
    name: '嘉港新闻'
  },
  {
    href: 'vovage.html',
    name: '船期查询'
  },
  /* {
    href: '###',
    name: '物流跟踪',
    children: [
      {
        href: 'exportTrace.html',
        name: '出口跟踪'
      },
      {
        href: 'exportTrace.html',
        name: '进口跟踪'
      }
    ]
  }, */
  {
    href: 'exportTrace.html',
    name: '出口跟踪'
  },
  {
    href: 'importTrace.html',
    name: '进口跟踪'
  },
  {
    href: 'yard.html',
    name: '箱源查询'
  },
  /* {
    href: 'javascript:;',
    name: '公共查询',
    children: [
      {
        href: '',
        name: '干线船期查询'
      },
      {
        href: '',
        name: '支线船期查询'
      },
      {
        href: '',
        name: '空箱箱源查询'
      },
      {
        href: '',
        name: '进口物流通关跟踪'
      },
      {
        href: '',
        name: '出口物流通关跟踪'
      }
    ]
  } */
  /* {
    href: 'about.html',
    name: '关于我们'
  },
  {
    href: '###',
    name: '联系我们'
  }, */
  /* {
    href: '###',
    name: '帮助中心'
  } */
]

/**
 * 首页服务列表
 */
export const services = [
  {
    name: '查询',
    icon: 'filesearch',
    iconColor: '#52c41a',
    links: [
      {
        href: '###',
        name: '船期查询'
      },
      {
        href: '###',
        name: '空箱箱源查询'
      }
    ]
  },
  {
    name: '跟踪',
    icon: 'location',
    iconColor: '#faad14',
    links: [
      {
        href: '###',
        name: '进口物流通关跟踪'
      },
      {
        href: '###',
        name: '出口物流通关跟踪'
      }
    ]
  }
]

/**
 * 内页banner
 */
export const banner = {
  about: ''
}