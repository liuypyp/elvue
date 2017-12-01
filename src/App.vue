<template>
  <div class="container_main" v-bind:style="{width:mainWidth+'px',height:mainHeight+'px'}">
    <div class="container_header"
         v-bind:style="{width:mainWidth+'px',height:bannerHeight+'px'}">
    </div>
    <div class="container_body" v-bind:style="{width:mainWidth+'px',height:bodyHeight+'px'}">
      <div class="container_menu"
           v-bind:style="{width:'200px',height:bodyHeight+'px',float:'left',backgroundColor:'rgb(84, 92, 100)'}">
        <el-menu
          default-active="/envList"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          router
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span>系统配置</span>
            </template>
            <el-menu-item index="/envList">环境列表</el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span>服务列表</span>
            </template>
            <el-submenu index="2-1">
              <template slot="title">darma床垫</template>
              <el-menu-item index="2-1-1">床垫列表</el-menu-item>
              <el-menu-item index="2-1-2">推送日志</el-menu-item>
              <el-menu-item index="2-1-3">离床推送日志</el-menu-item>
            </el-submenu>
            <el-submenu>
              <template slot="title">推送服务器</template>
              <el-menu-item index="/eps/messageList">消息列表</el-menu-item>
              <el-menu-item>链接日志列表</el-menu-item>
            </el-submenu>
            <el-menu-item index="2-2">环境列表</el-menu-item>
            <el-menu-item index="2-3">环境列表</el-menu-item>
            <el-menu-item index="2-4">环境列表</el-menu-item>
            <el-menu-item index="2-5">环境列表</el-menu-item>
            <el-menu-item index="2-6">环境列表</el-menu-item>
            <el-menu-item index="2-7">环境列表</el-menu-item>
            <el-menu-item index="2-8">环境列表</el-menu-item>
          </el-submenu>
        </el-menu>
      </div>
      <div class="container_content"
           v-bind:style="{width:contentWidth+'px',height:bodyHeight+'px',float:'left'}">
        <el-row>
          <el-col :span="24">
            <div class="grid-content bg-purple-dark">
              <el-breadcrumb separator-class="el-icon-arrow-right" v-bind:style="{marginLeft:'10px'}">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>活动管理</el-breadcrumb-item>
                <el-breadcrumb-item>活动列表</el-breadcrumb-item>
                <el-breadcrumb-item>活动详情</el-breadcrumb-item>
              </el-breadcrumb>
            </div>
          </el-col>
        </el-row>
        <div
          v-bind:style="{width:(contentWidth-4-20)+'px',height:(bodyHeight-40-20)+'px',float:'left',borderWidth:'2px',borderColor:'#99a9bf',borderStyle:'solid',padding:'10px',overflow:'scroll'}">
          <keep-alive>
            <router-view/>
          </keep-alive>
        </div>
      </div>
    </div>
    <div class="container_footer"
         v-bind:style="{width:mainWidth+'px',height:bannerHeight+'px'}">
      footer
    </div>
  </div>
</template>
<style scoped>
  .grid-content {
    border-radius: 5px 5px 0 0;
    height: 25px;
    padding-top: 11px;
  }

  .bg-purple-dark {
    background: #99a9bf;
  }
</style>
<script>
  export default {
    data: function () {
      let bannerHeight = 50
      return {
        bannerHeight: bannerHeight,
        mainWidth: window.innerWidth,
        mainHeight: window.innerHeight,
        bodyHeight: window.innerHeight - bannerHeight * 2,
        contentWidth: window.innerWidth - 200
      }
    },
    mounted: function () {
      const that = this
      window.onresize = () => {
        return (() => {
          window.screenWidth = window.innerWidth
          window.screenHeight = window.innerHeight
          if (window.screenWidth > 700) {
            that.mainWidth = window.screenWidth
            that.contentWidth = window.innerWidth - 200
          }
          if (window.screenHeight > 700) {
            that.mainHeight = window.screenHeight
            that.bodyHeight = window.innerHeight - that.bannerHeight * 2
          }
        })()
      }
    },
    watch: {
      mainWidth (val) {
        this.mainWidth = val
      },
      mainHeight (val) {
        this.mainHeight = val
      },
      bodyHeight (val) {
        this.bodyHeight = val
      },
      contentWidth (val) {
        this.contentWidth = val
      }
    }

  }
</script>

